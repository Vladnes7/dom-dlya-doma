import { ADDRESS, ADDRESS_NOTE, EMAIL, PHONE_DISPLAY, PHONE_HREF, VK_HREF } from "@/data/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-ink-line bg-ink pt-16 pb-28 sm:pb-12">
      <div className="wrap grid gap-10 md:grid-cols-12">
        <div className="flex items-center gap-5 md:col-span-5">
          <Logo className="size-20" />
          <p className="display text-[1.75rem] leading-tight">
            Ждём вас
            <br />
            <em className="text-brass">в гости</em>
          </p>
        </div>
        <address className="text-[0.95rem] not-italic text-ink-soft md:col-span-4">
          <span className="text-cream">{ADDRESS}</span>
          <br />
          {ADDRESS_NOTE}
        </address>
        <ul className="space-y-1.5 text-[0.95rem] md:col-span-3">
          <li>
            <a href={PHONE_HREF} className="tabular link-underline">
              {PHONE_DISPLAY}
            </a>
          </li>
          <li>
            <a href={`mailto:${EMAIL}`} className="link-underline">
              {EMAIL}
            </a>
          </li>
          <li>
            <a href={VK_HREF} target="_blank" rel="noopener noreferrer" className="link-underline">
              ВКонтакте
            </a>
          </li>
        </ul>
      </div>
      <div className="wrap mt-14 text-sm text-ink-soft">© Кафе «Дом для дома», Обнинск</div>
    </footer>
  );
}
