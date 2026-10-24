import { useLayoutEffect, useRef } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, AudioLines, Disc3, Headphones } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import GenrePlanet from '../components/GenrePlanet'
import GenreArtwork from '../components/GenreArtwork'
import { SubgenreCard } from '../components/GenreCard'
import { genres } from '../data/genres'

gsap.registerPlugin(ScrollTrigger)

function GenrePage({ genre }) {
  const pageRef = useRef(null)
  const currentIndex = genres.findIndex((item) => item.slug === genre.slug)
  const nextGenre = genres[(currentIndex + 1) % genres.length]

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.fromTo('.genre-hero__copy > *', { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: 'power3.out',
      })
      gsap.fromTo('.genre-planet, .genre-art--hero', { opacity: 0 }, {
        opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.15,
      })
      gsap.fromTo('.subgenre-card', { y: 24, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: '.subgenre-grid', start: 'top 86%', once: true },
      })
      gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        gsap.fromTo(item, { x: -18, opacity: 0 }, {
          x: 0,
          opacity: 1,
          duration: 0.65,
          delay: index * 0.04,
          ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 88%', once: true },
        })
      })
      gsap.fromTo('.track-row', { x: 18, opacity: 0 }, {
        x: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.09,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.listening-section', start: 'top 82%', once: true },
      })
      gsap.fromTo('.story-quote', { y: 20, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.story-quote', start: 'top 88%', once: true },
      })
      gsap.to('.genre-parallax-orb--one', {
        y: 300,
        x: -36,
        ease: 'none',
        scrollTrigger: { trigger: pageRef.current, start: 'top top', end: 'bottom bottom', scrub: 1 },
      })
      gsap.to('.genre-parallax-orb--two', {
        y: -220,
        x: 24,
        ease: 'none',
        scrollTrigger: { trigger: pageRef.current, start: 'top top', end: 'bottom bottom', scrub: 1 },
      })
    }, pageRef)
    return () => context.revert()
  }, [genre.slug])

  return (
    <main ref={pageRef} className="genre-page" style={{ '--genre-accent': genre.accent, '--genre-pale': genre.pale }}>
      <div className="genre-ambience" aria-hidden="true">
        <span className="genre-parallax-orb genre-parallax-orb--one" />
        <span className="genre-parallax-orb genre-parallax-orb--two" />
      </div>
      <section className="genre-hero page-shell relative grid min-h-133.75 grid-cols-[1fr_.9fr] items-center pb-20 pt-14.5 max-[900px]:grid-cols-[1fr_.85fr] max-[600px]:min-h-0 max-[600px]:grid-cols-1 max-[600px]:pb-19.25 max-[600px]:pt-27.75" id="top">
        <div className="genre-hero__copy relative z-2 flex flex-col items-start pb-4.25 pt-3.75 max-[600px]:pb-0">
          <Link className="mb-10 inline-flex items-center gap-2 text-[10px] text-[#85847c] hover:text-ink md:text-xs max-[600px]:mb-7.25" to="/"><ArrowLeft size={14} /> Semua genre</Link>
          <span className="genre-hero__kicker eyebrow inline-flex items-center gap-2.25 max-[600px]:flex-wrap"><span className="size-1.5 rounded-full bg-(--genre-accent)" /> {genre.era} <span className="text-[#c2c0b8]">/</span> {genre.origin}</span>
          <h1 className="mb-4.5 mt-5 text-[clamp(68px,8vw,104px)] font-medium leading-[.96] tracking-[-.075em] text-ink max-[600px]:mt-5.25 max-[600px]:text-[clamp(62px,16vw,84px)]">{genre.name}<span className="text-(--genre-accent)">.</span></h1>
          <p className="max-w-92.5 text-[15px] leading-[1.75] text-muted max-[600px]:max-w-82.5 max-[600px]:text-[13px]">{genre.description}</p>
          <div className="mt-7.25 flex items-center gap-5.5 max-[600px]:mt-5.5 max-[600px]:flex-wrap max-[600px]:gap-3.75">
            <a className="inline-flex min-h-10.75 items-center justify-center gap-3.25 bg-ink px-4 text-[11px] text-white transition hover:-translate-y-0.5 hover:bg-[#4c4c43] md:text-[13px]" href="#story">Start <ArrowDown size={15} /></a>
            <span className="inline-flex items-center gap-1.75 text-[10px] text-[#88877f] md:text-xs"><Headphones size={15} /> Dengarkan konteksnya</span>
          </div>
          <div className="mt-11.75 flex items-center gap-4.75 text-[10px] text-[#89887f] md:text-xs max-[600px]:mt-7.5"><span><strong className="mr-1.25 font-mono text-[11px] font-normal text-ink md:text-xs">04</strong> segmen untuk dijelajahi</span></div>
        </div>

        <div className="genre-hero__art relative mt-5.5 h-90.5 w-full max-w-110 justify-self-end max-[600px]:mx-auto max-[600px]:mt-8.75 max-[600px]:h-72.5 max-[600px]:w-[calc(100%-12px)]">
          <GenrePlanet accent={genre.accent} pale={genre.pale} />
          <GenreArtwork className="genre-art--dotted-icon genre-art--hero" genre={genre} />
          <span className="absolute right-[-3%] top-[17%] bg-paper px-2.75 py-2.25 font-mono text-[8px] leading-[1.7] tracking-[.14em] text-[color-mix(in_srgb,var(--genre-accent)_78%,#39352d)] transform-[rotate(5deg)] md:text-xs max-[600px]:top-[12%]">SOUND<br />ARCHIVE<br /><small className="text-[7px] text-[#929087] md:text-xs">No. 0{currentIndex + 1}</small></span>
          <span className="absolute -bottom-6.25 right-0 inline-flex items-center gap-1.75 font-mono text-[8px] tracking-widest text-[#85847c] md:text-xs"><AudioLines size={13} /> POTRET SEBUAH GENRE</span>
        </div>
        <a href="#story" className="absolute bottom-5.75 left-0 inline-flex items-center gap-3 font-mono text-[8px] tracking-[.13em] text-[#89887f] md:text-xs max-[600px]:bottom-5" aria-label="Gulir ke cerita">
          <span>SCROLL UNTUK MEMULAI</span><ArrowDown size={14} />
        </a>
      </section>

      <section className="page-shell grid min-h-78.75 grid-cols-[.8fr_1.35fr_.9fr] items-start gap-10.5 border-t border-line py-18 max-[900px]:grid-cols-[.6fr_1.4fr] max-[900px]:gap-6.25 max-[600px]:grid-cols-1 max-[600px]:gap-5.5 max-[600px]:py-13" id="story">
        <span className="section-index text-black max-[600px]:text-[10px]">01 / AWAL MULA</span>
        <div>
          <span className="eyebrow">DARI MANA SUARANYA BERASAL?</span>
          <h2 className="mb-0 mt-3.5 max-w-110 text-[35px] font-medium leading-[1.08] tracking-[-.065em] text-ink max-[600px]:mt-2.5 max-[600px]:text-[31px]">{genre.name} tidak muncul begitu saja.</h2>
          <p className="mt-4.25 max-w-122.5 text-[13px] leading-[1.85] text-muted max-[600px]:text-xs">{genre.intro}</p>
        </div>
        <div className="story-quote relative min-h-42.5 border-l border-[color-mix(in_srgb,var(--genre-accent)_45%,var(--color-line))] pl-5.25 pt-5.75 max-[900px]:col-start-2 max-[600px]:col-start-1 max-[600px]:min-h-0 max-[600px]:pt-4.5">
          <span className="absolute left-4.25 -top-2 -mb-8 -translate-y-2 font-editorial text-[51px] text-(--genre-accent) opacity-60">“</span>
          <p className="relative z-1 mb-2 font-editorial text-[17px] italic leading-[1.55] text-[#4a4942]">{genre.distinction}</p>
          <span className="eyebrow">YANG MEMBUATNYA BERBEDA</span>
        </div>
      </section>

      <section className="page-shell border-t border-line pb-21.5 pt-18.75 max-[600px]:pb-15 max-[600px]:pt-13.5">
        <div className="mb-10.5 flex items-end justify-between gap-8.75 max-[600px]:mb-7.25 max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-3.75">
          <div><span className="section-index text-black max-[600px]:text-[10px]">02 / GARIS WAKTU</span><h2 className="mb-0 mt-4.25 text-[43px] font-medium leading-[1.08] tracking-[-.065em] text-ink max-[600px]:mt-2.75 max-[600px]:text-[38px]">Terus <span className="serif-italic">berubah.</span></h2></div>
          <p className="mb-1.25 max-w-78.75 text-xs leading-[1.8] text-[#85847c] md:text-[13px] max-[600px]:mb-0 max-[600px]:max-w-87.5 max-[600px]:text-[13px]">Sebuah sketsa perjalanan, bukan garis yang lurus. Tiap era saling meninggalkan jejak.</p>
        </div>
        <div className="ml-2.5 max-[600px]:ml-1">
          {genre.timeline.map((moment, index) => (
            <article className={`timeline-item relative grid min-h-29.75 grid-cols-[180px_1fr] gap-6 border-l border-[color-mix(in_srgb,var(--genre-accent)_35%,var(--color-line))] pb-6 pl-7.25 pt-0.5 max-[600px]:min-h-0 max-[600px]:grid-cols-1 max-[600px]:gap-1.75 max-[600px]:pb-6 max-[600px]:pl-5 ${index === genre.timeline.length - 1 ? 'min-h-20 border-l-transparent pb-0' : ''}`} key={moment.year}>
              <span className="absolute -left-1 top-1.25 size-1.75 rounded-full bg-(--genre-accent)" />
              <div className="font-mono text-[10px] text-(--genre-accent) md:text-xs max-[600px]:text-[11px]">{moment.year}</div>
              <div>
                <span className="eyebrow text-[#a19f96] max-[600px]:text-[10px]">0{index + 1} — MOMEN</span>
                <h3 className="mb-1 mt-1.25 text-[17px] font-medium tracking-[-.03em] text-ink max-[600px]:text-[18px]">{moment.title}</h3>
                <p className="max-w-142.5 text-[11px] leading-[1.75] text-[#85847c] md:text-[13px] max-[600px]:text-[12px]">{moment.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell border-t border-line pb-22 pt-19 max-[600px]:pb-15 max-[600px]:pt-13.5">
        <div className="mb-10.5 flex items-end justify-between gap-8.75 max-[600px]:mb-7.25 max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-3.75">
          <div><span className="section-index text-black max-[600px]:text-[10px]">03 / CABANG SUARA</span><h2 className="mb-0 mt-4.25 text-[43px] font-medium leading-[1.08] tracking-[-.065em] text-ink max-[600px]:mt-2.75 max-[600px]:text-4xl">Satu akar,<br /><span className="serif-italic">banyak arah.</span></h2></div>
          <p className="mb-1.25 max-w-78.75 text-xs leading-[1.8] text-[#85847c] md:text-[13px] max-[600px]:mb-0 max-[600px]:max-w-87.5 max-[600px]:text-[11px]">Subgenre saling tumpang tindih dan terus berevolusi. Ini beberapa jalur untuk mulai mendengar lebih dekat.</p>
        </div>
        <div className="subgenre-grid grid grid-cols-4 gap-3.5 perspective-[1000px] max-[900px]:grid-cols-2 max-[600px]:gap-2.5">
          {genre.subgenres.map((item, index) => (
            <SubgenreCard key={item.name} item={item} index={index} />
          ))}
        </div>
      </section>

      <section className="listening-section page-shell grid grid-cols-[.72fr_1.5fr] gap-17.5 border-t border-line pb-20.75 pt-19 max-[900px]:grid-cols-[.7fr_1.3fr] max-[900px]:gap-8.75 max-[600px]:grid-cols-1 max-[600px]:gap-6 max-[600px]:pb-14.5 max-[600px]:pt-13.75">
        <div>
          <span className="section-index text-black max-[600px]:text-[10px]">04 / PLAY THE MUSIC</span>
          <h2 className="mb-0 mt-3.75 text-[43px] font-medium leading-[1.08] tracking-[-.065em] text-ink max-[600px]:text-[38px]">Mulai dari <span className="serif-italic">sini.</span></h2>
          <p className="mt-3.75 max-w-78.75 text-[11px] leading-[1.8] text-[#85847c] md:text-[13px] max-[600px]:mt-2.5 max-[600px]:text-[13px]">Tiga rekaman sebagai teman perjalanan. Dengarkan bagaimana kisah tadi mengambil bentuk.</p>
        </div>
        <div className="border-t border-line">
          {genre.tracks.map((track, index) => (
            <article className="track-row grid min-h-19.25 grid-cols-[25px_34px_minmax(150px,1fr)_minmax(110px,.8fr)_40px] items-center gap-3.5 border-b border-line max-[900px]:grid-cols-[20px_30px_minmax(110px,1fr)_34px] max-[900px]:gap-2.5 max-[600px]:min-h-17.75 max-[600px]:grid-cols-[18px_28px_minmax(100px,1fr)_32px] max-[600px]:gap-2" key={track.title}>
              <span className="font-mono text-[9px] text-[#99978e] md:text-xs max-[600px]:text-[10px]">0{index + 1}</span>
              <span className="grid size-7.75 place-items-center rounded-full bg-(--genre-pale) text-(--genre-accent) transition-transform duration-300 hover:rotate-45"><Disc3 size={20} strokeWidth={1.4} /></span>
              <div><h3 className="mb-0.75 text-xs font-medium text-ink max-[600px]:text-[12px]">{track.title}</h3><span className="text-[9px] text-[#8b8981] md:text-xs max-[600px]:text-[10px]">{track.artist}</span></div>
              <span className="text-[9px] text-[#8b8981] md:text-xs max-[900px]:hidden">{track.note}</span>
              <span className="justify-self-end font-mono text-[9px] text-[#99978e] md:text-xs max-[600px]:text-[10px]">{track.year}</span>
            </article>
          ))}
        </div>
        <span className="col-start-2 -mt-13 text-[9px] text-[#9b9990] md:text-xs max-[600px]:col-start-1 max-[600px]:-mt-3.75 max-[600px]:text-[11px]">Cari judul-judul ini di layanan musik favoritmu.</span>
      </section>

      <section className="genre-sources page-shell flex items-center gap-5 border-t border-line py-5.5 max-[600px]:items-start max-[600px]:flex-col max-[600px]:gap-2.75">
        <span className="eyebrow shrink-0 max-[600px]:text-[10px]">BACA LEBIH LANJUT</span>
        <div className="flex flex-wrap gap-x-4.25 gap-y-2.25">
          {genre.sources.map((source) => (
            <a className="inline-flex items-center gap-1.25 text-[9px] text-[#727169] hover:text-ink md:text-xs max-[600px]:text-[11px]" key={source.label} href={source.href} target="_blank" rel="noreferrer">
              {source.label}<ArrowRight size={13} />
            </a>
          ))}
        </div>
      </section>

      <section className="page-shell border-t border-line pb-11.5 pt-7.75">
        <Link to={`/genre/${nextGenre.slug}`} className="group mt-3.25 flex items-center justify-between text-ink">
          <span className="flex flex-col gap-1 text-4xl tracking-[-.06em] max-[600px]:text-[30px]"><small className="font-mono text-[10px] tracking-widest text-[#89877f] md:text-xs">BERIKUTNYA · 0{(currentIndex + 1) % genres.length + 1}</small>{nextGenre.name}</span>
          <span className="grid size-11.5 shrink-0 place-items-center rounded-full border border-[color-mix(in_srgb,var(--genre-accent)_38%,var(--genre-pale))] bg-[color-mix(in_srgb,var(--genre-pale)_55%,transparent)] text-(--genre-accent) transition-[background-color,border-color,color,transform] duration-300 group-hover:translate-x-1 group-hover:border-(--genre-accent) group-hover:bg-(--genre-accent) group-hover:text-white group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-(--genre-accent)">
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" size={21} />
          </span>
        </Link>
      </section>
    </main>
  )
}

export default GenrePage
