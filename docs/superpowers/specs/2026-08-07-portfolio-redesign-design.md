# Redesign Portofolio — Spec Desain

**Tanggal:** 2026-08-07
**Constraint utama dari pemilik:** _"yang terpenting web saya jangan sampai berat, sekarang berat bgt"_
**Mandat:** pemilik mendelegasikan seluruh keputusan desain.

---

## 1. Titik awal (terukur, bukan opini)

Semua angka di bawah dari build produksi `next build` pada commit `a669214`.

| Metrik | Nilai sekarang |
|---|---|
| HTML homepage (`/id`) | **459.344 B**, 905 node |
| HTML `/id/projects` | 220.029 B (142.960 B inline script) |
| First Load JS homepage | 142 kB |
| Shared chunk | 87,2 kB |
| Font | 8 file, **244 KB** |
| `.next/static` | 1,2 MB |
| Elemen ber-`backdrop-filter` di homepage | **70** |
| Utility Tailwind yang gagal compile | **44** |

### Diagnosis: yang bikin berat

Berat di situs ini **bukan** JS bundle. 142 kB itu wajar. Beratnya dari tiga sumber:

1. **Scroll dicabut dari compositor.** Lenis (`components/SmoothScroll.js:11`) memasang wheel listener `{passive:false}` + `preventDefault()`. Setiap frame scroll harus menunggu main thread. Ini amplifier — semua biaya kecil di bawah baru terasa sebagai stutter karena ini.
2. **Compositing permanen tanpa input.** `.bg-aurora::before` (fixed, `will-change:transform`, animasi 26s infinite) + `.noise-overlay` (fixed, full-viewport, `mix-blend-mode:overlay`) + 70 `backdrop-filter`. GPU tidak pernah idle.
3. **DOM homepage 459 KB.** 6 mockup DOM hidup dirender penuh 800×500 lalu di-scale, plus 122 KB inline SVG marquee.

Ditambah 1,9 megapiksel blur di jalur LCP (dua orb hero `blur-[100px]`/`[120px]`), `images.unoptimized:true`, dan 81,7 KB Fraunces `normal` yang tidak pernah dirender.

### Diagnosis: yang bikin tampilannya lemah

1. **Bug render, bukan selera.** 44 utility pakai opacity di luar skala kelipatan-5 Tailwind 3.3+ (`/8`, `/6`, `/12`). Tailwind tidak membuat rule-nya. Akibatnya `border border-white/8` (40×) jatuh ke preflight `border:0 solid #e5e7eb` → **garis abu-abu terang** di atas `#080a12`, dan `ring-white/8` jatuh ke `rgba(59,130,246,.5)` → **cincin biru** di thumbnail proyek. Semua 44 ada di elemen non-glass; elemen `.glass` selamat karena `globals.css:51` menetapkan bordernya sendiri.
2. **Tidak ada point of view.** Aurora + grid 56px + grain + glass + spotlight + gradient text + marquee + nav pill `layoutId` jalan bersamaan. Banyak efek, nol identitas.
3. **Satu material untuk segalanya.** `.glass` dipakai 38× dari navbar sampai kartu konten. Hierarki hilang total setelah hero.
4. **Skala tipe kosong.** Tidak ada `fontSize` di theme; 12 ukuran arbitrer (`text-[11px]`…`text-[13.5px]`) dan 7 radius hidup bersamaan.
5. **Aset mati.** `About.js` di-import di `page.js:8` tapi tidak pernah dirender. `animate-shimmer` dan `bg-grid-faint` nol pemakaian. Homepage tidak punya `<main>`.

---

## 2. Arah desain: **Editorial-technical**

Keputusan pengarah: **berhenti menambah efek, mulai membangun sistem.**

Palet sekarang tidak diganti — audit mengonfirmasi setiap token bernama lolos kontras AAA di atas `#080a12`, dan periwinkle `iris` bukan biru-tech generik. Masalahnya bukan warnanya; masalahnya tidak ada hierarki, tidak ada skala, dan efek menutupi ketiadaan struktur.

Yang jadi tanda tangan situs ini: **tipografi mono untuk seluruh metadata.** Setiap angka, label, eyebrow, tag tech, status, dan timestamp diset mono; seluruh prosa tetap Sora. Ini jujur pada profesi pemiliknya, tidak ada di situs sekarang, dan biayanya satu file font — sementara efek yang digantikannya berbiaya frame.

### Prinsip

| Prinsip | Konsekuensi konkret |
|---|---|
| Struktur mengalahkan efek | Hierarki dari skala tipe + whitespace + garis rambut, bukan dari blur dan gradient |
| Satu aksen, dipakai pelit | `iris` hanya untuk: CTA primer, state aktif, satu angka penting per section |
| Material punya arti | `backdrop-filter` = "melayang di atas konten". Hanya Navbar + ChatWidget. Konten pakai permukaan solid |
| Gerak hanya untuk orientasi | Entrance reveal saja. Nol animasi idle infinite di viewport konten |
| Mono = mesin, Sans = manusia | Angka/label/tag mono; kalimat Sora |

### Kill list

Semuanya menang di dua sisi sekaligus — performa **dan** desain:

| Dibuang | Alasan desain | Alasan performa |
|---|---|---|
| **Lenis** (`SmoothScroll.js`, dep `lenis`) | Inersia scroll adalah tell template, bukan kualitas | Mengembalikan scroll ke compositor. Fix "terasa berat" terbesar |
| **`Spotlight`** + `.glass::after` | Mouse-follow glow = tell template 2023 | −1 pointermove listener, −54 pseudo-element, −54 stacking context |
| **`.noise-overlay`** | Opacity 0,045 di atas `#080a12` praktis tak terlihat | Buang blend pass full-viewport tiap frame |
| **Fraunces** | 8 pemakaian, selalu satu kata italic. Serif dekoratif tanpa peran sistemik | −81,7 KB mati + −45,6 KB subset italic |
| **`.text-gradient`** | Gradient pada heading adalah tell template paling kentara | — |
| **Orb blur hero** | Digantikan `radial-gradient` yang identik secara visual | −1,9 Mpx blur pass dari jalur LCP |
| **Animasi aurora** | Drift 26s tidak pernah disadari pengunjung | Menghentikan compositing permanen. Gradient statis gratis setelah first paint |
| **`animate-shimmer`, `bg-grid-faint`** | Nol pemakaian | Token mati |
| **Import `About` di `page.js:8`** | Tidak pernah dirender | Kode mati |

Aurora **tetap ada** sebagai gradient statis — itu atmosfer yang membuat latar tidak mati, dan setelah animasinya dicabut biayanya nol.

### Add list

| Ditambah | Peran |
|---|---|
| **Font mono** (`--font-mono`, weight di-pin) | Tanda tangan. Semua metadata |
| `theme.fontSize` penuh | Menggantikan 12 ukuran arbitrer dengan skala nyata |
| `theme.borderRadius` | Menggantikan 7 radius liar dengan 3 |
| Token `line`/`surface` | Menggantikan `border-white/8` yang rusak dengan token yang compile |
| `<MotionConfig reducedMotion="user">` | Menutup kebocoran a11y di 11 bar framer-motion |
| `<main>` di tiap route | Landmark yang hilang |

---

## 3. Anggaran performa (hard limit, bukan saran)

Diturunkan dari angka terukur. Redesign yang melanggar ini ditolak, seindah apa pun.

| Anggaran | Batas | Sekarang |
|---|---|---|
| HTML homepage | ≤ 150 KB | 459 KB |
| DOM node homepage | ≤ 600 | 905 |
| First Load JS homepage | ≤ 120 kB | 142 kB |
| Shared chunk | ≤ 87 kB (jangan tambah dep runtime) | 87,2 kB |
| CSS | ≤ 38 KB | 38 KB |
| `backdrop-filter` terlihat bersamaan | ≤ 2, radius ≤ 14px | 70 |
| `filter: blur()` di atas fold | 0 | 2 (1,9 Mpx) |
| Elemen animasi simultan per viewport | ≤ 8 | 22–27 |
| Properti yang boleh dianimasikan | `transform`, `opacity` saja | ada `height`, `width` |
| Animasi idle infinite di viewport konten | 0 | aurora + 11 bar + marquee |
| Font | ≤ 2 family, ≤ 4 file, ≤ 120 KB | 2 family, 8 file, 244 KB |
| Gambar | `unoptimized` dilarang, ≤ 100 KB terkirim | 259 KB mentah |

Marquee dipertahankan tapi dipindah keluar dari "idle infinite" dengan `animation-play-state` — atau dipangkas jumlah pill-nya agar masuk anggaran 8 elemen animasi.

---

## 4. Urutan eksekusi

Berurutan, tiap fase diverifikasi sebelum lanjut. Perbaikan berat **mendahului** estetika — supaya redesign dikerjakan di atas basis yang sudah sehat, dan tiap file cukup disentuh sekali.

1. **Token** — `tailwind.config.js` (skala tipe, radius, mono, token `line`/`surface`) + `globals.css` (`@layer components`, aurora statis, hapus noise/spotlight).
2. **Perf** — hapus Lenis + Spotlight + noise-overlay; orb → radial-gradient; font 2 family pinned; `images.unoptimized:false`; `height`→`scaleY`; `MotionConfig`.
3. **Bug render** — 44 utility off-scale → token yang compile.
4. **Redesign** — tipografi mono untuk metadata; `.glass` → permukaan solid kecuali Navbar + ChatWidget; ritme section; hero.
5. **Berat HTML** — mockup DOM hidup keluar dari grid homepage; hanya bertahan di `/projects/[slug]`.

Verifikasi: `next build` bersih + tabel before/after untuk tiap angka di §3.

---

## 4b. Hasil terukur

Baseline dibangun dari commit `a669214` di git worktree terpisah dengan `npm ci` sendiri, jadi perbandingan ini apple-to-apple, bukan estimasi.

### Bytes yang dikirim (gzip -9)

| Halaman | Sebelum | Sesudah | |
|---|---:|---:|---:|
| Homepage | 78.931 B | **29.116 B** | −63% |
| `/about` | 70.356 B | **24.625 B** | −64% |
| `/projects` | 31.086 B | **21.780 B** | −29% |
| `/projects/[slug]` | 23.131 B | 22.889 B | −1% |
| `/services` | 26.364 B | 26.419 B | 0% |
| **Total semua halaman ID** | **245.226 B** | **139.807 B** | **−43%** |

### First Load JS

| Route | Sebelum | Sesudah |
|---|---:|---:|
| Homepage | 142 kB | **102 kB** |
| `/projects` | 136 kB | **99,6 kB** |
| `/services` | 134 kB | **96,4 kB** |
| `/about` | 131 kB | **95 kB** |
| `/blog`, `/projects/[slug]` | 131 kB | **94,5 kB** |
| `/contact` | 126 kB | **89,2 kB** |
| Shared | 87,2 kB | 87,2 kB |

### Anggaran §3 — status akhir

| Anggaran | Batas | Sebelum | Sesudah | |
|---|---|---:|---:|:--|
| First Load JS homepage | ≤ 120 kB | 142 kB | 102 kB | ✅ |
| Shared chunk | ≤ 87 kB | 87,2 kB | 87,2 kB | ✅ |
| DOM node homepage | ≤ 600 | 1.185 | 629 | ⚠️ nyaris |
| HTML homepage (raw) | ≤ 150 KB | 459 KB | 169 KB | ❌ lihat catatan |
| CSS | ≤ 38 KB | 38,5 KB | 36,5 KB | ✅ |
| `backdrop-filter` bersamaan | ≤ 2 | 70 | 2 | ✅ |
| `blur()` di atas fold | 0 | 2 (1,9 Mpx) | 0 | ✅ |
| Animasi idle infinite | 0 di konten | aurora + 2 marquee + 11 bar | 1 (titik status) | ✅ |
| Properti dianimasikan | transform/opacity | ada `height`, `width` | hanya transform/opacity | ✅ |
| Font | ≤ 2 family, ≤ 120 KB | 2, 240 KB | 2, 144 KB | ⚠️ lihat catatan |
| Gambar | `unoptimized` dilarang | aktif | dimatikan | ✅ |
| Utility gagal compile | 0 | 44 | 0 | ✅ |
| Dependensi runtime | — | 8 | 5 | ✅ |

**Catatan HTML 169 KB vs anggaran 150 KB.** Anggaran itu diturunkan saat 30% dokumen adalah SVG dekoratif. Setelah itu hilang, sisanya hampir seluruhnya teks konten dua bahasa — yang mengompres 5,8×. Angka yang benar-benar dikirim adalah 29 KB. Menekan lebih jauh berarti memangkas konten, bukan mengoptimalkan; itu keputusan bisnis, bukan teknis. Anggaran di README direvisi ke ≤ 180 KB raw / ≤ 700 node supaya jadi pagar yang jujur.

**Catatan font 144 KB vs 120 KB.** 8 file itu subset unicode-range dari 2 variable family. Hanya dua file `.p.woff2` (74 KB) yang benar-benar diambil untuk halaman berbahasa latin; sisanya baru diminta kalau ada karakter di luar subset. Yang terkirim nyata: ~74 KB.

**`/services` tidak berubah** (26,4 KB gz). Isinya 6 layanan + 4 paket harga + FAQ + proses — hampir murni teks. Tidak ada yang bisa dipangkas tanpa menghapus konten.

### Temuan review yang diperbaiki

Review adversarial 4 dimensi (24 agen) mengonfirmasi 19 temuan, 1 dipatahkan. Yang paling merugikan justru dari perubahan ini sendiri:

- **`CountUp` merender `0` di HTML server.** `useState` diseed nol, jadi HTML yang diprerender benar-benar berbunyi `0+ years exp. / 0+ projects / ~0 users` — itu yang dibaca crawler dan pengunjung tanpa JS. Sekarang state awal adalah nilai sebenarnya; hitung-dari-nol jadi efek klien murni di atas markup yang sudah benar.
- **Sapuan opacity melewatkan 16 lokasi** pada palet standar (`bg-emerald-500/12`, `bg-amber-500/12`, `bg-rose-500/12`, `bg-amber-500/8`) — kelas bug yang sama persis dengan 44 yang diperbaiki. Sekarang nol di seluruh repo, semua warna.
- **Kontras.** Memindahkan metadata ke mono 11px memperbesar masalah yang sudah ada: `text-mist/45` = 3,2:1, `/50` = 3,7:1, `/55` = 4,3:1 — semuanya gagal AA. Digeser ke `/60` (4,91:1), `/65`, `/70`, hierarki tiga tingkat tetap utuh. Mockups.js dan cv/page.js dikecualikan.
- **`prefers-reduced-motion` tidak menolkan `animation-delay`,** jadi `.rise` (fill-mode `both`) menahan keyframe `from` — hero tak terlihat sampai 340ms.
- **`<dd>` sebelum `<dt>`** di statistik hero — HTML tidak valid. Diperbaiki dengan `flex-col-reverse`.
- **Panel FAQ tertutup masih di pohon aksesibilitas** — `grid-rows-[0fr]` memotong secara visual tapi tidak menyembunyikan; pembaca layar membacakan semua jawaban seolah terbuka.
- **`tracking-tight` membatalkan tracking optis** yang baru diberikan ke ukuran display, di 8 heading.
- Ditambah: label form asli (placeholder bukan label), focus ring yang terlihat, `role="log"` pada chat yang streaming, `role="dialog"` + `aria-expanded` pada widget, README yang masih menyebut Framer Motion dan Fraunces.

## 4c. Pass kedua — konsistensi sistem desain (2026-08-08)

Pass pertama memindahkan Hero dan TechIndex ke bahasa editorial tapi meninggalkan sisanya sebagai grid kartu identik — celah yang saya buat sendiri. Dimensi "design-system consistency" dari review menemukan 17 hal; semuanya dikerjakan.

**Bug yang terlihat pengunjung:**

- **`/services` mencetak judulnya sendiri dua kali, tiga kali.** `<SectionHeading eyebrow={s.pricing.title} title={s.pricing.title} />` mengirim string yang sama ke dua slot, jadi "Paket jasa pembuatan website" muncul sebagai eyebrow mono lalu langsung lagi sebagai heading 48px. Sama untuk `howTitle` dan `faqTitle`. Halaman itu juga punya **empat heading tingkat-1** yang saling bersaing.
- **Gradient dekoratif di panel Contact `-z-10` di belakang `.surface` opaque** — tidak pernah terlihat sama sekali. Dihapus, bukan diselamatkan.
- **Form kontak adalah `.surface` di dalam `.surface` identik** — terbaca seperti kesalahan render. Diganti garis rambut pemisah.

**Perbaikan sistem:**

- `SectionHeading` sekarang punya dua tingkat (`level={1|2}`), prop `as` untuk tag yang benar, dan slot `trailing`. Subseksi memakai nomornya sebagai label — tidak ada lagi duplikasi, dan `/services` punya satu `h1` dengan tiga `h2`.
- **Tag stack seragam.** Data `project.stack` yang sama dulu dirender mono 11px di kartu dan Sora 12px di case study.
- **Metadata Experience ke mono** dan tint iris dilepas dari tanggal — tanggal bukan aksen.
- **Blog: satu suara.** Baris metadata dulu campur tanggal Sora dan tag mono di baris yang sama.
- **About memakai pola garis rambut Hero** untuk statistik, dan `coreExpertise` jadi daftar bernomor, bukan tumpukan kartu.
- **Iris dinetralkan dari pemakaian dekoratif** — 6 tile ikon layanan dan ~40 ikon centang. Aksen sekarang hanya untuk CTA, state aktif, badge "populer", nomor urut, dan kata aksen di heading.
- **Offset konten pertama seragam** 112px / 144px di semua route (dulu bervariasi 160–192px). Hack `-mt-8` di `/projects` diganti prop `flush` — ritme diungkapkan di komponen, bukan ditambal di pemanggil.
- Tahun copyright jadi dinamis (dulu hardcoded `2026`), link Blog ditambahkan ke footer, `LangToggle` ke mono, dan sisa utility `white/N` mentah diganti token `line`/`veil` kecuali di dalam `Mockups.js`.

Semua angka §4b tidak berubah — pass ini murni konsistensi, nol biaya berat.

## 5. Yang sengaja TIDAK dikerjakan

Audit menemukan hal-hal ini; semuanya nyata, tapi di luar cakupan "bikin lebih bagus + jangan berat" dan butuh keputusan bisnis pemilik:

- **Positioning tiga pembeli** (recruiter / UMKM Rp99rb / klien AI enterprise) dalam satu situs. Tier Rp99rb menurunkan kredibilitas yang dibangun 4.000 baris konten lain — tapi memangkasnya adalah keputusan bisnis.
- **Bukti terbalik**: OprexDuit (live, ±2.000 user, satu-satunya screenshot asli) tidak punya case study, sementara 9 case study rekonstruksi dapat 5 blok penuh + disclaimer 5×. Memperbaikinya butuh aset dan izin klien.
- **Light theme** — hex hardcoded di config + ~20 `rgba()` di CSS + `LIGHT` di `lib/techIcons.js`.
- **Form/booking nyata** — belum ada endpoint; semua jalur berakhir di `wa.me` berbahasa Indonesia bahkan di `/en`.
- **Mengganti treatment heading** — judul terkunci sebagai `{eyebrow, title, accent}` di dua kamus (~632 unit terjemahan).

Dicatat di sini supaya tidak hilang.

### Yang sudah diperiksa dan ternyata BUKAN masalah

Supaya tidak ada usaha terbuang: `ScrollProgress` (urutan read→write benar), `Spotlight`'s `getBoundingClientRect` (dicoalesce 1/frame — dihapus karena alasan desain, bukan performa), `Navbar transition-all` (boolean bail-out), 122 KB inline SVG marquee (dedupe cuma hemat 189 B setelah brotli), `react-icons` (0 KB di client chunk), dan build itu sendiri (exit 0, 0 warning, 42/42 static).
