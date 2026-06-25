import { profile } from '../data/profile'
import Reveal from './Reveal'
import { SectionHeading } from './ui'

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 mt-28 pb-24 sm:mt-36">
      <Reveal>
        <SectionHeading n="07" title="Contact" />
        <p className="max-w-xl font-display text-2xl font-normal leading-snug text-ink sm:text-3xl">
          Building something that needs to do more with less?{' '}
          <a
            href={`mailto:${profile.email}`}
            className="font-medium text-accent underline decoration-2 underline-offset-4 transition hover:opacity-70"
          >
            Let’s talk.
          </a>
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[14px] text-muted">
          <a
            href={profile.cvHref}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-ink"
          >
            Résumé (PDF) ↗
          </a>
          {profile.social.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-ink"
            >
              {s.label} ↗
            </a>
          ))}
          <a href={`mailto:${profile.email}`} className="transition hover:text-ink">
            Email ↗
          </a>
        </div>
      </Reveal>
    </section>
  )
}
