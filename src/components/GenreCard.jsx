import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import GenreArtwork from './GenreArtwork'

function GenreCard({ genre, index }) {
  return (
    <Link className="genre-card group block min-w-0" to={`/genre/${genre.slug}`} style={{ '--card-accent': genre.accent, '--genre-pale': genre.pale }}>
      <div className="relative h-57.25 overflow-hidden bg-(--genre-pale) max-[900px]:h-47.5 max-[600px]:h-36.25">
        <GenreArtwork className="transition-transform duration-550 group-hover:scale-[1.045]" genre={genre} />
        <span className="absolute left-3.75 top-3.5 z-2 font-mono text-[9px] text-[color-mix(in_srgb,var(--card-accent)_75%,#554f45)] md:text-xs max-[600px]:left-2.5 max-[600px]:top-2.25 max-[600px]:text-[9px]">0{index + 1}</span>
        <span className="absolute bottom-3.25 right-3.25 z-2 grid size-7.25 place-items-center rounded-full border border-[color-mix(in_srgb,var(--card-accent)_20%,transparent)] bg-[rgba(248,247,243,.56)] text-(--card-accent) transition-all group-hover:rotate-45 group-hover:bg-(--card-accent) group-hover:text-white max-[600px]:bottom-2 max-[600px]:right-2 max-[600px]:size-6.25"><ArrowUpRight size={17} /></span>
      </div>
      <div className="px-0.5 pt-4 max-[600px]:pt-3">
        <span className="eyebrow md:text-xs max-[600px]:text-[9px]">{genre.era}</span>
        <h3 className="mb-1.25 mt-1.75 text-[21px] font-medium tracking-[-.04em] text-ink max-[600px]:text-[19px]">{genre.name}</h3>
        <p className="max-w-[320px] text-[11px] leading-[1.7] text-[#85847c] md:text-[13px] max-[600px]:text-[11px] max-[600px]:leading-[1.6]">{genre.description}</p>
      </div>
    </Link>
  )
}

export function SubgenreCard({ item, index }) {
  function tiltCard(event) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    gsap.to(event.currentTarget.querySelector('.subgenre-card__inner'), {
      rotateY: (x - 0.5) * 8,
      rotateX: (0.5 - y) * 8,
      duration: 0.35,
      ease: 'power2.out',
      transformPerspective: 800,
      overwrite: 'auto',
    })
  }

  function resetCard(event) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = prefersReducedMotion ? 0 : 0.4

    if (!prefersReducedMotion) {
      gsap.to(event.currentTarget.querySelector('.subgenre-card__inner'), {
        rotateX: 0,
        rotateY: 0,
        duration: 0.65,
        ease: 'elastic.out(1, 0.55)',
      })
    }

    gsap.to(event.currentTarget.querySelector('.subgenre-card__title'), {
      color: '#292923',
      duration,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  function highlightTitle(event) {
    gsap.to(event.currentTarget.querySelector('.subgenre-card__title'), {
      color: item.color,
      duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.45,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  return (
    <article
      className="subgenre-card relative min-h-56.25 min-w-0 cursor-default bg-[#f1f0eb] nth-[2n]:bg-[#f2f0e9] max-[900px]:min-h-47.5 max-[600px]:min-h-48"
      onMouseMove={tiltCard}
      onMouseEnter={highlightTitle}
      onMouseLeave={resetCard}
      style={{ '--subgenre-accent': item.color }}
    >
      <div className="subgenre-card__inner relative flex min-h-56.25 flex-col justify-between overflow-hidden p-4.5 max-[900px]:min-h-47.5 max-[600px]:min-h-48 max-[600px]:p-3.25">
        <div className="relative flex items-center justify-between">
          <span className="font-mono text-[9px] text-(--subgenre-accent) md:text-xs">0{index + 1}</span>
          <span className="size-1.75 rounded-full bg-(--subgenre-accent) opacity-75" />
        </div>
        <div className="relative">
          <span className="eyebrow text-[#929087] max-[600px]:text-[10px]">{item.origin}</span>
          <h3 className="subgenre-card__title my-1.75 text-[18px] font-medium tracking-[-.045em] text-[#292923] max-[600px]:text-[18px]">{item.name}</h3>
          <p className="max-w-57.5 text-[10px] leading-[1.65] text-[#85847c] md:text-[13px] max-[600px]:text-[11px]">{item.detail}</p>
        </div>
        <div className="relative h-px w-8.75 bg-(--subgenre-accent) opacity-70" />
      </div>
    </article>
  )
}

export default GenreCard
