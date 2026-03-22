interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export const SectionHeading = ({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) => (
  <div className="max-w-2xl">
    <p className="text-sm uppercase tracking-[0.4em] text-champagne/80">{eyebrow}</p>
    <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
      {title}
    </h2>
    <p className="mt-3 text-base leading-7 text-mist">{description}</p>
  </div>
);
