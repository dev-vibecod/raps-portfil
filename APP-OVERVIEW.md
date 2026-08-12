# Portofolio Rafif — Dokumen Tinjauan Menyeluruh

Dokumen ini menjelaskan situs apa adanya: layanan, fungsi, sistem desain, dan visual. Semua angka diambil dari kode dan dari `next build` yang benar-benar berjalan — bukan dari perkiraan. Bagian **§9 Cacat yang perlu keputusanmu** berisi hal-hal yang saya temukan dan **belum** diperbaiki.

Terakhir diverifikasi: build Next.js 14.2.15, `buildId ugJkEaC4XaeA8-QW7JdI3`, exit 0, 41 route statis terprerender.

> **Batas kepercayaan.** Saya belum pernah melihat situs ini dirender di browser — sesi ini tidak punya tool browser. Semua di bawah berasal dari membaca kode, HTML hasil build, dan CSS terkompilasi. Pernyataan tentang *perilaku runtime* (hover, scroll, animasi berjalan) diturunkan dari kode, bukan diamati.

---

## 1. Ringkasan

Situs portofolio + lead-gen **bilingual (ID/EN)** untuk Rafif Ayyassar Wicaksono, Backend & AI/ML Engineer di Bekasi. Berfungsi sekaligus sebagai etalase jasa pembuatan website/aplikasi/AI.

| | |
|---|---|
| Framework | Next.js 14.2.15, App Router, JavaScript (bukan TypeScript) |
| Rendering | Seluruhnya SSG kecuali `/api/chat`, `opengraph-image`, dan catch-all 404 |
| Styling | Tailwind CSS 3, satu file `app/globals.css` |
| Dependensi runtime | **5**: `next`, `react`, `react-dom`, `lucide-react`, `@vercel/analytics` |
| Font | Sora (prosa) + JetBrains Mono (metadata), keduanya variable, via `next/font/google` |
| Backend | Tidak ada, kecuali satu route AI chat ke Groq |
| Gambar raster di seluruh repo | **1** (`public/projects/oprexduit.png`, 259.287 B) |

**Tidak ada** framer-motion, react-icons, atau Lenis — ketiganya pernah ada dan dilepas. Tidak ada pustaka animasi sama sekali.

---

## 2. Peta route

| Route | File | Mode | Path terprerender |
|---|---|---|---|
| `/[lang]` | `app/[lang]/page.js` | SSG | `/id`, `/en` |
| `/[lang]/services` | `services/page.js` | SSG | 2 |
| `/[lang]/projects` | `projects/page.js` | SSG | 2 |
| `/[lang]/projects/[slug]` | `projects/[slug]/page.js` | SSG | **20** (10 slug × 2 locale) |
| `/[lang]/blog` | `blog/page.js` | SSG | 2 |
| `/[lang]/blog/[slug]` | `blog/[slug]/page.js` | SSG | 4 |
| `/[lang]/about` | `about/page.js` | SSG | 2 |
| `/[lang]/contact` | `contact/page.js` | SSG | 2 |
| `/[lang]/cv` | `cv/page.js` | SSG | 2 |
| `/[lang]/[...rest]` | `[...rest]/page.js` | Dinamis | — (hanya `notFound()`) |
| `/api/chat` | `api/chat/route.js` | Dinamis | — (`runtime: nodejs`, `force-dynamic`) |
| `/[lang]/opengraph-image` | `opengraph-image.js` | Dinamis | — (1200×630 PNG saat diminta) |
| `/sitemap.xml`, `/robots.txt`, `/icon.svg` | — | Statis | 3 |

**Skema i18n:** `locales = ["id","en"]`, default `id`. `dynamicParams = false` — segmen pertama selain `id`/`en` menghasilkan 404 sungguhan, bukan render lunak. Pergantian bahasa di klien: `LangToggle` menukar prefiks lewat `pathname.replace(/^\/(id|en)(?=\/|$)/, "")`.

---

## 3. Anatomi halaman

### 3.1 Beranda `/id` — 7 blok

| # | Blok | Komponen | Lebar | Material | Padding vertikal | Isi visual |
|---|---|---|---|---|---|---|
| 1 | Hero | `Hero.js` | 72rem | ground | `pt-28 pb-16`, `min-h-100svh` | teks + 4 ikon vektor; panel "Skill stack" (`.surface`); 3 angka `CountUp` |
| 2 | Produk unggulan | `FeaturedProduct.js` | 72rem | **card** | `py-16 md:py-20` | **satu-satunya `<img>` di halaman** — screenshot OprexDuit |
| 3 | Layanan (ringkas) | `Services.js` | 72rem (`.shell`) | ground | `py-28 md:py-40` | 6 kartu, tiap satu tile ikon 44px + judul + blurb |
| 4 | Indeks teknologi | `TechIndex.js` | 72rem | **band** | `py-16 md:py-20` | murni teks, 6 baris garis rambut |
| 5 | Proyek | `Projects.js` | **88rem** (`.shell-wide`) | ground | `py-28 md:py-40` | 6 plate proyek (CSS+SVG, bukan raster) |
| 6 | Teaser About | inline di `page.js` | 72rem (`.shell`) | ground | `py-16 md:py-20` | garis rambut, sengaja bukan kartu |
| 7 | Kontak | `Contact.js` | 72rem (`.shell`) | **band** | `py-24 md:py-32` | judul + 1 CTA + 4 tile kontak |

Tiga lebar berbeda (72rem / 88rem / full-bleed band), dua band, empat ritme vertikal. Blok 5 sengaja lebih lebar dari yang lain supaya tidak terbaca sebagai pengulangan blok 3.

### 3.2 Halaman lain

| Halaman | Lebar `<main>` | Struktur |
|---|---|---|
| `/services` | `.shell` 72rem | Heading L1 → 6 kartu layanan **dengan** checklist → 4 kartu harga + 1 kartu enterprise → 4 langkah proses → FAQ akordeon. **77 `<svg>`, terbanyak di situs. Nol gambar.** |
| `/projects` | 72rem, grid 88rem | h1 → kartu produk unggulan → 9 plate proyek (`flush`, tanpa padding atas) |
| `/about` | `pt-4` | h1 + tombol CV → About (nol `.surface`, murni tipografis) → Skills (12 kartu, 93 chip) → Experience (**linimasa Gantt** + daftar peran + 2 kartu) |
| `/contact` | `pt-4` | section pertama **hanya `<h1 class="sr-only">`** — tidak ada yang terlihat → band kontak dengan form |
| `/cv` | tanpa max-width | Kartu **putih** `max-w-3xl` di atas latar gelap; dunia warna `zinc` terpisah; `@media print` melucuti bayangan dan set `padding: 14mm 16mm` |
| `/blog` | **56rem** (satu-satunya `max-w-4xl`) | h1 + 2 kartu artikel |
| `/blog/[slug]` | 48rem | header → artikel 5 `<h2>` → kartu CTA |
| `/projects/oprexduit` | 64rem | **Template produk live**: screenshot asli (`fetchPriority="high"`), 3 metrik, 1 blok ringkas. Tanpa disclaimer. |
| `/projects/[9 lainnya]` | 64rem | **Template rekonstruksi**: banner disclaimer amber → 01 Frontend (mockup penuh) → 02 Arsitektur (`ArchFlow`) → 03 Backend (tabel endpoint) → 04 Ringkas → 05 Engineering |

---

## 4. Sistem desain

### 4.1 Warna

Latar halaman `#080a12`. Rasio kontras dihitung terhadap latar itu.

**Elevasi (opaque):**

| Token | Hex | Rasio | Peran |
|---|---|---|---|
| `surface.band` | `#0d111c` | 1,049:1 | latar section full-bleed |
| `surface.card` | `#141926` | **1,126:1** | objek yang bisa diklik |
| `surface.raised` | `#1e2537` | 1,294:1 | hover, dan satu elemen klimaks |

**Garis & selubung (translusen, dikomposit):**

| Token | Nilai | Rasio |
|---|---|---|
| `veil.DEFAULT` | `rgba(255,255,255,.03)` | 1,052:1 |
| `veil.strong` / `line.soft` | `rgba(255,255,255,.06)` | 1,123:1 |
| `line.DEFAULT` | `rgba(255,255,255,.09)` | 1,217:1 |
| `line.strong` | `rgba(255,255,255,.16)` | 1,528:1 |

**Aksen** — `iris.300 #c3c8ff` · `400 #a9b0ff` · `500 #8b93ff` · `600 #6f78f5`. **Teks** — `mist #c7cbe6` (12,34:1 pada opasitas penuh), teks body `#e7e9f5` (16,35:1).

**Warna kedua** (`emerald` / `amber` / `rose`) hanya masuk lewat **data**: `statusStyles` di `lib/mockupTone.js` memetakan status proyek (`High`, `Open`, `Active`, `Allow`, …) ke warna. Bukan keputusan dekorasi — kalau data proyek berubah, warnanya ikut.

`ink.800/700/600` **sengaja dipertahankan terpisah** dari grup `surface` karena `Mockups.js`, `ArchFlow`, dan `BackendInfo` memakainya sebagai warna interior mockup, bukan sebagai elevasi. Menomori ulang `ink` akan diam-diam mengubah ~20 tempat.

### 4.2 Tipografi

Dua family, keduanya variable (`font-weight: 100 800`), self-hosted, `display: swap`, dengan fallback metrik ke Arial.

- **Sora** → prosa, judul, tombol
- **JetBrains Mono** → **setiap angka, label, tag, URL, periode, dan status**

Kontras itulah identitas situs ini.

**Skala** (yang dipakai, bukan yang tersedia):

| Token | px | Peran |
|---|---|---|
| `2xs` | 11 | metadata mono — label, chip, URL |
| `xs` | 12 | teks sekunder |
| `sm` | 14 | teks isi kartu |
| `base` | 16 | prosa |
| `lg` | 18 | sub-judul section |
| `xl` | 20 | KPI di plate proyek |
| `2xl` | 24 | judul subseksi |
| `3xl → 7xl` | 30–72 | heading, dengan tracking optis negatif |

Distribusi nyata di beranda hasil build: `text-2xs` 87 · `text-sm` 55 · `text-lg` 14 · `text-3xl` 9 · `text-xl` 2. `font-mono` muncul **92 kali**.

Bobot yang dipakai hanya tiga: `font-semibold` (65), `font-medium` (49), `font-bold` (9).

### 4.3 Material

Didefinisikan di `app/globals.css` dalam `@layer components`.

| Kelas | Isi | Dipakai |
|---|---|---|
| `.glass` | `rgba(12,15,26,.72)` + `backdrop-filter: blur(14px)` | **Hanya 3**: navbar saat scroll, menu mobile, panel chat. Artinya "melayang di atas konten". |
| `.surface` | `#141926` + garis rambut 9% | 12 lokasi sumber, 14 elemen di beranda |
| `.surface-hover` | hover → `#1e2537`, border iris, `translateY(-3px)` | 7 lokasi |
| `.band` | `#0d111c` + garis atas-bawah 6% | 2 (TechIndex, Contact) |
| `.shell` / `.shell-wide` | 72rem / 88rem, `margin-inline: auto` | Max-width pindah dari `<section>` ke div dalam, supaya section bebas membawa latar full-bleed |
| `.eyebrow` | mono 11px, `letter-spacing .14em`, uppercase, iris-400 | 18 lokasi |
| `.meta` | mono, `tabular-nums`, `letter-spacing -.01em` | 10 lokasi — semua angka |
| `.reveal` / `.rise` | animasi masuk | 21 / 7 elemen di beranda |

**Latar atmosfer** — `body.bg-aurora` punya dua lapisan pseudo-element **statis**: tiga radial gradient (`z-index: -2`) dan grid 64px pada alpha 2,2% yang di-mask ke atas halaman (`z-index: -1`). Sengaja tidak dianimasikan.

### 4.4 Gerak

Tidak ada pustaka animasi. Semua CSS, kecuali dua komponen yang butuh observer.

| Efek | Pemicu | Properti | Durasi |
|---|---|---|---|
| `.reveal` | IntersectionObserver `-80px`, plus jaring pengaman `setTimeout` 900 ms | `opacity`, `transform` | 0,6s |
| `.rise` | sekali saat mount, CSS murni, `fill-mode: both` | `opacity`, `translateY` | 0,7s |
| `.surface-hover` | hover | `border-color`, `transform`, `background-color` | 0,25s |
| Akordeon FAQ | klik | `grid-template-rows` `0fr→1fr` | 0,3s |
| `ScrollProgress` | scroll, dikoalesir rAF | `transform: scaleX()` ditulis langsung ke node, **tanpa re-render React** | per frame |
| `CountUp` | IntersectionObserver `-40px`, batal setelah 2500 ms | isi teks | 1,1s |

**Animasi idle tak berujung di konten: tepat satu** — titik "available for work" di hero (`animate-ping`). Sisanya transien (layar loading) atau kondisional (titik mengetik di chat).

`prefers-reduced-motion` menolkan `animation-duration`, `iteration-count`, `transition-duration`, **dan `animation-delay`/`transition-delay`** — yang terakhir wajib, karena `.rise` ber-`fill-mode: both` akan menahan hero tak terlihat hingga 340 ms tanpa itu. `CountUp` opt-out terpisah lewat `matchMedia`.

### 4.5 Ritme vertikal

Empat langkah di beranda: **160px** (Services, Projects — di atas ground), **128px** (Contact — band), **80px** (Featured, TechIndex, About teaser), dan hero yang asimetris 112/64.

Aturannya: section yang punya band memakai langkah lebih kecil, karena **tepi band itu sendiri yang jadi pemisah**.

---

## 5. Konten bisnis

### 5.1 Enam layanan

| Slug | Judul | Contoh terkait |
|---|---|---|
| `web` | Pembuatan Website | `complaint-management` |
| `apps` | Aplikasi & Sistem Manajemen | `hr-data-api` |
| `ai` | AI, Chatbot & LLM | `insurance-chatbot` |
| `data` | Data & ML Engineering | `claim-fraud-detection` |
| `iot` | IoT & Computer Vision | `smart-parking-detection` |
| `cloud` | Cloud & Deployment | `hr-data-api` |

Tiap layanan punya 4 poin "yang termasuk". Area layanan: Bekasi, remote ke seluruh dunia.

### 5.2 Paket harga

| Paket | Harga | Waktu | Revisi |
|---|---|---|---|
| Landing Page Basic | **Rp99rb** | 2–3 hari | 1× |
| Company Profile *(paling laris)* | **Rp499rb** | ± 1 minggu | 2× |
| Bisnis + CMS | **Rp1,5jt** | 2–3 minggu | 3× |
| Aplikasi Web / Sistem | **Rp5jt** | 4–6 minggu | garansi bugfix 1 bulan |
| AI, Otomasi & Enterprise | **Custom** | setelah sesi discovery gratis | — |

Semua CTA paket membuka WhatsApp dengan pesan terisi otomatis, **dilokalkan** — pengunjung `/en` dapat pesan bahasa Inggris.

### 5.3 Sepuluh proyek

| Slug | Sifat | Arketipe mockup |
|---|---|---|
| `oprexduit` | **LIVE & nyata** — `~2.000 pengguna`, gratis, di produksi | screenshot asli |
| `insurance-chatbot` | rekonstruksi | chat |
| `claim-fraud-detection` | rekonstruksi | dashboard |
| `finance-analyzer` | rekonstruksi | dashboard |
| `telco-helpdesk-chatbot` | rekonstruksi | chat |
| `ask-your-data` | rekonstruksi | query (NL2SQL) |
| `complaint-management` | rekonstruksi | dashboard |
| `internal-helpdesk-chatbot` | rekonstruksi | chat |
| `hr-data-api` | rekonstruksi | dashboard |
| `smart-parking-detection` | rekonstruksi, **akademik** (skripsi) | detection |

Sebaran arketipe **4 dashboard / 3 chat / 1 query / 1 detection**. `spreadByArchetype()` menyusun ulang urutan tampilan supaya tidak ada dua arketipe sama yang bersebelahan di grid 3 kolom — **tanpa** menyentuh `allSlugs`, jadi rantai "Berikutnya:" dan sitemap tetap utuh.

### 5.4 Karier — tujuh peran bertanggal

| Peran | Organisasi | Periode |
|---|---|---|
| Software Engineer — AI/ML & GenAI | Freelance | **Jun 2022 – sekarang** |
| Data Engineer — ETL | Alfagift | Aug 2025 – Apr 2026 |
| Machine Learning Engineer | Insignia × Telkomsel | Dec 2024 – Mar 2025 |
| Data Engineer — Operations | Insignia × Telkomsel | Aug 2024 – Aug 2025 |
| Product Development (Kontrak) | FIF Group | Apr 2024 – Jul 2024 |
| Product Development Intern | Adira Finance | Sep 2023 – Mar 2024 |
| Data Analyst & Entry Intern | BCA | Dec 2022 – Sep 2023 |

Pendidikan: Universitas Negeri Jakarta, S.Tr. Teknologi Rekayasa Otomasi, 2020–2024, IPK 3,52.

`CareerTimeline` mem-parse string `period` ini jadi bagan Gantt. Yang jadi terlihat: **freelance berjalan terus-menerus di bawah setiap peran karyawan**, dan dua peran Insignia tumpang tindih.

### 5.5 Skills & blog

93 item dalam 12 grup, dirender sebagai chip mono tanpa logo. Dua artikel blog (Juni 2026).

---

## 6. Fitur

### 6.1 Asisten AI

Chat mengambang di setiap halaman. Route `app/api/chat/route.js`:

- Provider **Groq**, model `openai/gpt-oss-120b`
- **Rotasi pool kunci** — `GROQ_API_KEYS` (maks 5, dipisah koma); kunci yang kena 429 dibangku-cadangkan sampai `retry-after` lewat, 401/403 dibangku lebih lama
- Batas ukuran body 20.000 byte
- Rate limit per-IP di memori
- **Respons di-stream** ke klien
- Cakupan dibatasi lewat `lib/aiKnowledge.js` — basis pengetahuan disusun dari konten situs sendiri, dan system prompt menolak pertanyaan di luar topik
- Kunci API **tidak pernah** sampai ke browser; tanpa kunci, route mengembalikan 503 dan sisa situs tidak terpengaruh

### 6.2 Halaman CV

Kartu putih di atas latar gelap, `max-w-3xl`, dunia warna `zinc` terpisah dari sistem utama. `@media print` melucuti bayangan, margin, dan radius lalu menetapkan `padding: 14mm 16mm` — jadi Ctrl+P menghasilkan dokumen bersih. Tombol unduh menunjuk ke PDF statis per bahasa.

### 6.3 SEO

Sitemap 38 URL, `robots.txt` tanpa larangan, JSON-LD `Person` + `ProfessionalService` di beranda dan `/services`, JSON-LD `Article` di tiap artikel, hreflang `id`/`en`/`x-default`, dan OG image 1200×630 yang digenerate saat runtime.

---

## 7. Arsitektur kode

### 7.1 Komponen — 28 file

**Server (18)** — `About`, `CareerTimeline`, `Contact`, `Experience`, `FeaturedProduct`, `Footer`, `Hero`, `JsonLd`, `Projects`, `SectionHeading`, `Services`, `Skills`, `TechIndex`, `detail/ArchFlow`, `detail/BackendInfo`, `mockups/Mockups`, `mockups/ProjectMockup`, `mockups/ProjectPlate`.

**Klien (10)** — dengan alasan tepatnya:

| Komponen | Kenapa harus klien |
|---|---|
| `ChatWidget` | `useState`, `fetch`, `res.body.getReader()`, `TextDecoder` |
| `ContactForm` | 3 field terkontrol |
| `CountUp` | `IntersectionObserver`, `requestAnimationFrame`, `matchMedia` |
| `FaqAccordion` | `useState` untuk panel terbuka |
| `LangToggle` | `usePathname`, `useRouter` |
| `Navbar` | `window.scrollY`, `usePathname` |
| `Reveal` | `IntersectionObserver` |
| `ScrollProgress` | `requestAnimationFrame`, tulis langsung ke `style.transform` |
| `ScaledMockup` | `useLayoutEffect` + `ResizeObserver` — harus mengukur sebelum paint |
| `CvActions` | **Tidak ada alasan.** Lihat §9.8 |

### 7.2 Alur data

```
data/content.js  ──localize()──►  getContent(lang)  ──props──►  komponen server
   {en, id} objek                  string biasa

data/dictionaries/{id,en}.js  ──getDict(lang)──►  dict  ──props──►  komponen
   sudah monolingual                              (tanpa langkah lokalisasi)
```

`pick(field, lang)` menyelesaikan satu field; `localize(value, lang)` rekursif — array di-map, objek ber-key `id`/`en` diperlakukan sebagai daun. Itu yang memungkinkan `data/content.js` mencampur objek bilingual (`tagline`) dan string bersama (`stack: ["Python", …]`) dalam satu pohon.

**Tidak ada kamus yang pernah diimpor ke komponen klien** — semuanya diterima sebagai props dari induk server.

`allSlugs` menyetir tiga hal: `generateStaticParams` (20 halaman proyek), rantai "Berikutnya:" yang melingkar, dan entri sitemap.

### 7.3 Sistem mockup

| | `ProjectPlate` (kartu grid) | `ProjectMockup` (halaman detail) |
|---|---|---|
| Render | server, nol JS | membungkus `ScaledMockup` yang klien |
| Ukuran | `aspect-16/10` fluid | 800×500 tetap, di-scale |
| Chart | **satu `<path>` SVG** | tumpukan `<div>` dengan `style.height` |
| Batas node | ≤ 22 elemen | tanpa batas |
| Isi | 4 badan terkompresi, teks dipotong di JS | 4 layar penuh |

`barsPath()` di `lib/mockupTone.js` mengubah array angka jadi satu string path. Alasannya spesifik: **66% HTML beranda adalah payload RSC**, jadi tiap elemen dibayar dua kali (~200 B). Chart 10 batang = ~2 KB sebagai div, ~400 B sebagai satu path.

---

## 8. Angka nyata

### 8.1 Berat halaman

Node DOM = tag pembuka di dalam `<body>` setelah `<script>` dan `<style>` dibuang.

| Halaman | Mentah | gzip | Node DOM | `<img>` | `<svg>` |
|---|---:|---:|---:|---:|---:|
| `/id` | 166.263 B | **30.593 B** | 525 | 1 | 32 |
| `/id/services` | 165.212 B | 25.675 B | 503 | 0 | 77 |
| `/id/about` | 132.527 B | 26.004 B | 436 | 0 | 3 |
| `/id/projects` | 129.757 B | 24.081 B | 380 | 1 | 19 |
| `/id/projects/insurance-chatbot` | 103.228 B | 22.986 B | 296 | 0 | 10 |
| `/id/cv` | 99.567 B | 20.722 B | 252 | 0 | 10 |
| `/id/projects/oprexduit` | 67.455 B | 13.034 B | 115 | 1 | 6 |
| `/id/contact` | 62.301 B | 12.509 B | 118 | 0 | 8 |
| `/id/blog` | 59.499 B | 12.002 B | 89 | 0 | 6 |

CSS seluruh situs: **37.838 B mentah, 8.289 B gzip** — satu file.

Cara mereproduksi:

```bash
npm run build
wc -c .next/server/app/id.html
gzip -9 -c .next/server/app/id.html | wc -c
```

### 8.2 First Load JS

| Route | JS |
|---|---:|
| `/[lang]` | **102 kB** |
| `/[lang]/projects/[slug]` | 99,8 kB |
| `/[lang]/projects` | 99,6 kB |
| `/[lang]/services` | 96,4 kB |
| `/[lang]/cv` | 95,2 kB |
| `/[lang]/about` | 95 kB |
| `/[lang]/blog` | 94,5 kB |
| `/[lang]/contact` | 89,2 kB |
| **Shared** | **87,2 kB** |

Middleware 26,5 kB.

### 8.3 Anggaran performa yang berlaku

| Aturan | Batas | Sekarang |
|---|---|---|
| First Load JS beranda | ≤ 120 kB | 102 kB ✅ |
| Shared chunk | ≤ 87 kB, tanpa dependensi baru | 87,2 kB ✅ |
| HTML beranda | ≤ 184.000 B | 166.263 ✅ |
| Node DOM beranda | ≤ 700 | 525 ✅ |
| `backdrop-filter` terlihat bersamaan | ≤ 2 | 2 ✅ |
| `blur()` di atas fold | 0 | 0 ✅ |
| Animasi idle tak berujung di konten | ≤ 1 | 1 ✅ |
| Properti yang boleh dianimasikan | `transform` + `opacity` | ✅ |
| Family font | ≤ 2 | 2 ✅ |
| `images.unoptimized` | dilarang | mati ✅ |

---

## 9. Cacat yang perlu keputusanmu

Semua di bawah **belum diperbaiki**. Diurut dari yang paling merugikan.

### 9.1 Middleware praktis tidak pernah jalan — regex-nya rusak

`middleware.js:21` menulis matcher sebagai string JS biasa:

```js
matcher: ["/((?!_next|api|.*\..*).*)"]
```

Dalam string JS, `\.` runtuh jadi `.`. Jadi yang sampai ke regex adalah `.*..*`, yang cocok dengan **string apa pun sepanjang ≥1 karakter** — sehingga lookahead negatifnya menolak setiap path tidak kosong. Terkonfirmasi dari `middleware-manifest.json`.

Akibatnya: `/` masih dialihkan ke `/id` (kasus terpenting, masih aman), tapi `/about`, `/services`, `/projects/oprexduit` **tidak dialihkan**. Karena `dynamicParams = false`, semuanya berakhir 404 sungguhan. Perbaikannya satu karakter: `\\.`.

### 9.2 `/cv` mendeklarasikan canonical ke beranda

`generateMetadata` di `cv/page.js` hanya mengembalikan title + robots, jadi canonical dan alternates diwarisi dari layout. Hasilnya `/id/cv` menyatakan `<link rel="canonical" href=".../id">` — menunjuk halaman lain — sambil membawa `noindex`. Dan halaman itu tetap terdaftar di sitemap dengan prioritas 0,8.

### 9.3 Sebagian besar halaman tidak punya `og:image`

Hanya `/id`, `/en`, dan `/id/cv` yang menghasilkan `og:image`. `/services`, `/projects`, `/blog`, `/about`, `/contact`, halaman detail proyek, dan artikel blog **tidak punya sama sekali** — jadi share ke WhatsApp/LinkedIn tampil tanpa gambar. Output-nya terkonfirmasi; aturan merge Next.js yang menyebabkannya belum saya telusuri.

### 9.4 Halaman 404 bergaya tidak pernah terprerender

`app/[lang]/not-found.js` berisi 404 bilingual yang rapi, tapi `.next/server/app/_not-found.html` adalah halaman putih bawaan Next ("404 | This page could not be found", 13 elemen, 0 link). Yang bergaya hanya muncul lewat route dinamis `[...rest]`.

### 9.5 Dua domain berbeda di situs yang sama

`cv/page.js:46` mencetak `raps-portofolio.vercel.app`. Semua tempat lain (robots, sitemap, canonical, OG) memakai `rafif-portfolio.vercel.app`. Salah satunya salah.

### 9.6 `twitter:title` di halaman detail jatuh ke teks beranda

Halaman proyek dan artikel blog menetapkan `og:title`/`og:description` dengan benar, tapi tidak mendefinisikan blok `twitter`, sehingga `twitter:title` dan `twitter:description` mewarisi string **beranda**. Share ke X/Twitter menampilkan judul yang salah.

### 9.7 Nama framework masih bocor di dua tempat

Keputusan "jangan sebut tech stack di halaman jasa" **berlaku untuk teks yang terlihat** — nol nama build tool di seluruh `/services`. Tapi:

- `JsonLd.js` menaruh `"FastAPI"` di `knowsAbout`, dan JSON-LD itu dirender **di halaman `/services`**. Tidak terlihat mata, tapi ada di sumber.
- Beranda menampilkan `TechIndex` yang menyebut React, Next.js, Supabase, FastAPI, LangChain, Docker, Kubernetes, Terraform.

Beranda melayani audiens berbeda (recruiter, klien teknis), jadi menurut saya ini benar — tapi kalau kekhawatiranmu berlaku menyeluruh, dua tempat ini yang tersisa.

### 9.8 Kode mati

| Hal | Status |
|---|---|
| `.surface-raised` (kelas komponen) | Nol pemakaian — **dipurge dari CSS terkompilasi**. Hanya utility `bg-surface-raised` yang dipakai (`CareerTimeline`) |
| `.shell-narrow` | Nol pemakaian, dipurge |
| `techLabel` di kedua kamus | Copy mati sejak chip tech dilepas |
| `"use client"` di `CvActions.js` | Tidak ada hook, tidak ada API browser, tidak ada handler. Bisa jadi server component |
| Komentar `globals.css:127` | Menyebut `.eyebrow` "muncul 33 kali" — sebenarnya 18. Basi |

### 9.9 `/contact` punya section kosong

Section pertama `/id/contact` hanya berisi `<h1 class="sr-only">`. Secara aksesibilitas benar (halaman butuh h1), tapi menghasilkan section yang tidak menampilkan apa pun sebelum band kontak.

---

## 10. Keputusan yang sudah diambil, dan alasannya

Dicatat supaya tidak dibatalkan tanpa sengaja.

| Keputusan | Alasan |
|---|---|
| Tidak ada pustaka animasi | framer-motion memakan ~40 kB di **setiap** route untuk fade + geser 24px — dua properti yang dianimasikan compositor secara native |
| Tidak ada smooth-scroll library | Lenis memasang wheel listener `{passive:false}` + `preventDefault()`, mencabut scroll dari compositor. Itu penyebab utama rasa "berat" |
| Marquee logo → indeks teks | 54 SVG inline = 116 KB, 30% dokumen beranda, untuk logo yang lewat lebih cepat dari yang bisa dibaca |
| Grid proyek pakai plate, bukan mockup hidup | 6 mockup 800×500 di-scale ke ~300px = HTML beranda 456 KB untuk teks yang tak terbaca. Mockup penuh tetap ada di halaman detail |
| Warna hanya dari token bernama, bukan `white/8` | Tailwind 3.3+ hanya punya opasitas kelipatan 5. `border-white/8` **tidak menghasilkan CSS** dan jatuh ke preflight `#e5e7eb` — garis abu terang di atas latar hampir hitam. 44 utility pernah rusak begitu |
| `backdrop-filter` dijatah 2 elemen | Properti termahal di situs. Artinya "melayang di atas konten" |
| Disclaimer rekonstruksi diucapkan sekali | Pernah muncul 5× dalam satu kunjungan. Sesering itu berhenti terdengar jujur dan mulai terdengar minta maaf |
| Tidak ada strip angka besar di beranda | Angka yang tersedia (142 ms, 0.91 AUC, 99,9%) semuanya **isi mockup ilustratif**, bukan hasil terukur. Angka setinggi 60px terbaca sebagai fakta |
| Geometri di `path` SVG, bukan `<div>` | 66% HTML adalah payload RSC — tiap node dibayar dua kali |
| Teks mockup tetap Inggris di kedua bahasa | Kontrak yang sudah berjalan: `lib/content.js` menyatakan "mockup data stays shared" |

---

## 11. Yang berada di luar cakupan teknis

Butuh keputusan bisnismu, bukan keputusan desain:

- **Tiga pembeli dalam satu situs** — recruiter full-time, UMKM paket Rp99rb, klien AI enterprise. Tier Rp99rb berdampingan dengan positioning engineer senior.
- **Endpoint form sungguhan** — belum ada backend; semua jalur berakhir di `wa.me` atau `mailto`.
- **Light theme** — hex ter-hardcode di config, ~20 `rgba()` di CSS, dan dunia `zinc` terpisah di halaman CV.
- **Angka hasil terukur** — kalau ada yang boleh dipublikasikan, itu akan jadi tambahan paling kuat untuk situs ini.
