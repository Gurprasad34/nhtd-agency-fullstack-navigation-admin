import { LockKeyhole } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-site grid gap-10 py-14 md:grid-cols-4">
        <div>
          <h3 className="text-xl font-bold">Independent Pathways</h3>
          <p className="mt-3 text-sm text-white/70">
            Helping New Yorkers live safely, confidently, and independently in
            their communities.
          </p>
        </div>

        <div>
          <h4 className="font-bold">Explore</h4>
          <div className="mt-3 space-y-2 text-sm text-white/70">
            <Link className="block transition hover:text-white" href="/about">
              About
            </Link>
            <Link className="block transition hover:text-white" href="/services">
              Services
            </Link>
            <Link
              className="block transition hover:text-white"
              href="/nhtd-waiver"
            >
              NHTD Waiver
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-bold">Connect</h4>
          <div className="mt-3 space-y-2 text-sm text-white/70">
            <Link className="block transition hover:text-white" href="/careers">
              Careers
            </Link>
            <Link className="block transition hover:text-white" href="/contact">
              Contact
            </Link>
            <span className="block">(555) 123-4567</span>
            <span className="block">info@example.com</span>
          </div>
        </div>

        <div>
          <h4 className="font-bold">Important</h4>
          <p className="mt-3 text-sm text-white/70">
            Do not submit medical records or sensitive health details through
            public forms.
          </p>
          <Link
            href="/admin"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition hover:text-white"
          >
            <LockKeyhole className="h-4 w-4" aria-hidden="true" />
            Staff Login
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © 2026 Independent Pathways. Placeholder business information.
      </div>
    </footer>
  );
}
