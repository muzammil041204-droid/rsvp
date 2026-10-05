import { studio } from "../data/wedding";
import { ArrowUpRightIcon, HeartIcon } from "../components/Icons";

export function Footer() {
  return (
    <footer className="border-t border-hairline px-5 pt-8 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-center">
      <p className="flex items-center justify-center gap-1.5 text-[0.8125rem] text-muted">
        Made with
        <HeartIcon className="size-3.5 text-wine" />
        <span className="sr-only">love</span>
        by <span className="font-bold tracking-[0.24em] text-charcoal">{studio.name}</span>
      </p>
      <a
        href={studio.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex min-h-11 items-center justify-center gap-2.5 rounded-[2px] border border-wine/35 px-5 text-[0.6875rem] font-bold tracking-[0.2em] text-wine uppercase transition-colors duration-300 hover:border-wine hover:bg-wine hover:text-cream"
      >
        {studio.cta}
        <ArrowUpRightIcon className="size-3.5" />
      </a>
    </footer>
  );
}
