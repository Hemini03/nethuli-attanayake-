import { getTranslations } from "next-intl/server";
import { RevealText } from "@/components/motion/RevealText";
import { loc, type Locale, type SiteContent } from "@/lib/content/types";

type Props = {
  content: SiteContent;
  locale: Locale;
};

export async function Manifesto({ content, locale }: Props) {
  const t = await getTranslations("manifesto");

  return (
    <section className="grid gap-12 border-b border-hairline px-5 py-24 md:grid-cols-12 md:px-8 md:py-32">
      <p className="text-[11px] uppercase tracking-[0.32em] text-oxblood md:col-span-3">
        {t("label")}
      </p>
      <div className="md:col-span-9">
        <RevealText
          as="p"
          className="font-display text-3xl leading-[1.2] italic md:text-5xl md:leading-[1.15]"
        >
          {loc(content.manifesto, locale)}
        </RevealText>
      </div>
    </section>
  );
}
