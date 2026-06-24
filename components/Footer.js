import { profile } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-white/8 px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-mist/45 sm:flex-row">
        <p>© 2026 {profile.name}. All rights reserved.</p>
        <p className="text-center sm:text-right">{profile.note}</p>
      </div>
    </footer>
  );
}
