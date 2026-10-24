import { useLayoutEffect, useRef } from 'react'
import { ArrowDown, ArrowRight, AudioLines, Headphones } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import GenreArtwork from '../components/GenreArtwork'
import GenreCard from '../components/GenreCard'
import { genres } from '../data/genres'

gsap.registerPlugin(ScrollTrigger)

function HomePage() {
  const pageRef = useRef(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.fromTo('.home-intro > *', { y: 24, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.09, ease: 'power3.out',
      })
      gsap.fromTo('.home-artwork', { scale: 0.92, opacity: 0, rotate: 4 }, {
        scale: 1, opacity: 1, rotate: 0, duration: 1.1, ease: 'power3.out', delay: 0.2,
      })
      gsap.fromTo('.intro-strip > *', { y: 16, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.intro-strip', start: 'top 84%', once: true },
      })
      gsap.fromTo('.genre-card', { y: 26, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.09,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.genre-grid', start: 'top 86%', once: true },
      })
      gsap.fromTo('.closing-note > *', { y: 16, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.closing-note', start: 'top 88%', once: true },
      })
    }, pageRef)
    return () => context.revert()
  }, [])

  return (
    <main ref={pageRef}>
      <section className="page-shell relative grid min-h-153.5 grid-cols-[1fr_.92fr] items-center pb-20 pt-14.5 max-[900px]:min-h-137.5 max-[900px]:grid-cols-[1fr_.85fr] max-[600px]:min-h-0 max-[600px]:grid-cols-1 max-[600px]:pb-19.25 max-[600px]:pt-26.75" id="top">
        <div className="home-intro relative z-2 pb-4.25 max-[600px]:pb-0">
          <h1 className="mb-4.5 mt-6.75 text-[clamp(58px,6.8vw,88px)] font-medium leading-[.96] tracking-[-.075em] text-ink max-[600px]:mt-5.25 max-[600px]:text-[clamp(62px,16vw,84px)]">Setiap bunyi<br />punya <span className="serif-italic">cerita.</span></h1>
          <p className="max-w-97.5 text-[15px] leading-[1.75] text-muted max-[600px]:max-w-82.5 max-[600px]:text-[13px]">Telusuri jejak genre dari akar, perubahan, hingga lagu yang membuatnya hidup.</p>
          <div className="mt-7.25 flex items-center gap-5.5 max-[600px]:mt-5.5 max-[600px]:flex-wrap max-[600px]:gap-3.75">
            <a className="inline-flex min-h-10.75 items-center justify-center gap-3.25 bg-ink px-4 text-[11px] text-white transition hover:-translate-y-0.5 hover:bg-[#4c4c43] md:text-[13px] max-[600px]:text-[13px]" href="#genres">Jelajahi <ArrowDown size={16} /></a>
            <span className="inline-flex items-center gap-1.75 text-[10px] text-[#88877f] md:text-xs"><Headphones size={15} /> Baca sambil mendengar</span>
          </div>
        </div>

        <div className="relative -ml-2 grid min-h-111.25 place-items-center max-[900px]:min-h-90 max-[600px]:my-5 max-[600px]:mx-0 max-[600px]:min-h-78.75">
          <GenreArtwork className="home-artwork h-102.5 min-h-0 w-full max-w-112.5 rotate-2 transition-transform duration-500 max-[900px]:h-82.5 max-[600px]:h-75 max-[600px]:w-full max-[600px]:max-w-87.5" genre={genres[0]} />
          <div className="absolute right-[-8%] top-[29%] flex items-center gap-2.5 font-editorial text-md leading-normal text-muted transform-[rotate(5deg)] max-[600px]:right-[-1%] max-[600px]:top-[24%] max-[600px]:text-[10px]"><span className="h-px w-6 bg-[#a7a398]" /><em>the sound of then,<br />the feeling of now</em></div>
        </div>
      </section>

      <section className="intro-strip page-shell grid min-h-32 grid-cols-[1fr_2.3fr_40px] items-center gap-6 border-y border-line max-[600px]:grid-cols-[1fr_35px] max-[600px]:gap-2.25">
        <span className="section-index max-[600px]:self-end">01 / MULAI DARI MANA SAJA</span>
        <p className="max-w-155 text-xl leading-normal tracking-[-.035em] text-[#46463f] max-[600px]:col-start-1 max-[600px]:row-start-2 max-[600px]:self-start max-[600px]:text-[17px]">Musik tidak berdiri sendiri. Ia bergerak bersama <em className="font-editorial text-[1.05em] text-[#818077]">orang, tempat, dan waktu.</em></p>
        <span className="grid size-8.75 place-items-center rounded-full border border-line text-muted max-[600px]:col-start-2 max-[600px]:row-span-2 max-[600px]:row-start-1 max-[600px]:size-7.75"><AudioLines size={19} /></span>
      </section>

      <section className="page-shell pb-29.25 pt-24.75 max-[600px]:pb-19.25 max-[600px]:pt-17.5" id="genres">
        <div className="mb-10.25 flex items-end justify-between gap-10 max-[600px]:mb-7.25 max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-3.75">
          <div>
            <span className="eyebrow max-[600px]:text-[10px]">PILIH JALUR DENGARMU</span>
            <h2 className="mb-0 mt-4.25 text-[clamp(35px,4vw,48px)] font-medium leading-[1.08] tracking-[-.065em] text-ink max-[600px]:mt-2.75 max-[600px]:text-[38px]">Enam genre,<br /><span className="serif-italic">tak terhitung</span> kemungkinan.</h2>
          </div>
          <p className="mb-1.25 max-w-78.75 text-xs leading-[1.8] text-[#85847c] md:text-[13px] max-[600px]:mb-0 max-[600px]:max-w-87.5 max-[600px]:text-[13px]">Mulai dari satu genre, ikuti cabangnya, dan temukan bagaimana satu suara memengaruhi suara yang lain.</p>
        </div>
        <div className="genre-grid grid grid-cols-3 gap-x-6 gap-y-7.25 max-[600px]:grid-cols-2 max-[600px]:gap-x-3.25 max-[600px]:gap-y-6">
          {genres.map((genre, index) => (
            <GenreCard key={genre.slug} genre={genre} index={index} />
          ))}
        </div>
      </section>

      <section className="closing-note page-shell grid min-h-38.5 grid-cols-[1fr_2fr_40px] items-center gap-6 border-t border-line max-[600px]:min-h-33.75 max-[600px]:grid-cols-[1fr_35px] max-[600px]:gap-2.5">
        <span className="eyebrow max-[600px]:self-end">CATATAN PENGINGAT</span>
        <p className="max-w-155 text-[21px] leading-normal tracking-[-.04em] text-[#42423b] max-[600px]:col-start-1 max-[600px]:row-start-2 max-[600px]:self-start max-[600px]:text-[17px]">Genre hanyalah peta. <em className="font-editorial text-[1.05em] text-[#818077]">Rasa ingin tahu adalah cara kita mendengarkan.</em></p>
        <Link className="grid size-8.75 place-items-center rounded-full border border-line transition-colors hover:bg-ink hover:text-white max-[600px]:col-start-2 max-[600px]:row-span-2 max-[600px]:row-start-1 max-[600px]:size-7.75" to="/genre/jazz" aria-label="Mulai kisah jazz"><ArrowRight size={19} /></Link>
      </section>
    </main>
  )
}

export default HomePage
