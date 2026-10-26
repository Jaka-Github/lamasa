import { useLayoutEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { Link, useNavigate } from 'react-router-dom'

function NextGenreLink({ currentAccent, nextGenre, index }) {
  const navigate = useNavigate()
  const fillRef = useRef(null)
  const arrowButtonRef = useRef(null)
  const progressRef = useRef(null)
  const progressFillRef = useRef(null)
  const pointerIdRef = useRef(null)
  const holdTimelineRef = useRef(null)
  const holdCompleteRef = useRef(false)
  const suppressClickRef = useRef(false)

  function animateFill(scale, duration, ease) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.to(fillRef.current, { scaleX: scale, duration, ease, overwrite: true })
  }

  function animateArrowButton(active, duration, ease) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.to(arrowButtonRef.current, {
      backgroundColor: active ? '#ffffff' : 'rgba(255, 255, 255, 0)',
      borderColor: active ? '#ffffff' : currentAccent,
      color: active ? nextGenre.accent : currentAccent,
      duration,
      ease,
      overwrite: true,
    })
  }

  function showProgress() {
    const progress = progressRef.current
    const progressFill = progressFillRef.current
    if (!progress || !progressFill) return

    holdTimelineRef.current?.kill()
    gsap.set(progress, { autoAlpha: 1 })
    gsap.set(progressFill, { scaleX: 0 })
    holdTimelineRef.current = gsap.timeline({
      onComplete: () => {
        holdCompleteRef.current = true
        suppressClickRef.current = true
        navigate(`/genre/${nextGenre.slug}`)
      },
    })
      .to(progressFill, { scaleX: 1, duration: 2, ease: 'none' }, 0)
      .to(fillRef.current, { scaleX: 1, duration: 2, ease: 'none' }, 0)
      .to(arrowButtonRef.current, {
        backgroundColor: '#ffffff',
        borderColor: '#ffffff',
        color: nextGenre.accent,
        duration: 2,
        ease: 'none',
      }, 0)
  }

  function hideProgress(resetFill = false) {
    const progress = progressRef.current
    const progressFill = progressFillRef.current
    if (!progress || !progressFill) return

    holdTimelineRef.current?.kill()
    holdTimelineRef.current = null
    gsap.killTweensOf([progress, progressFill])
    if (resetFill) {
      gsap.killTweensOf(fillRef.current)
      gsap.to(fillRef.current, { scaleX: 0, duration: 0.2, ease: 'power2.out' })
      animateArrowButton(false, 0.2, 'power2.out')
    }
    gsap.to(progress, {
      autoAlpha: 0,
      duration: 0.15,
      onComplete: () => gsap.set(progressFill, { scaleX: 0 }),
    })
  }

  function handlePointerDown(event) {
    if (
      event.pointerType !== 'touch'
      || window.matchMedia('(min-width: 601px)').matches
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return
    pointerIdRef.current = event.pointerId
    holdCompleteRef.current = false
    suppressClickRef.current = false
    showProgress()
  }

  function handlePointerUp(event) {
    if (pointerIdRef.current !== event.pointerId) return
    pointerIdRef.current = null
    if (!holdCompleteRef.current) hideProgress(true)
  }

  function handlePointerCancel(event) {
    if (pointerIdRef.current !== event.pointerId) return
    pointerIdRef.current = null
    holdCompleteRef.current = false
    suppressClickRef.current = false
    hideProgress(true)
  }

  function handleClick(event) {
    if (!suppressClickRef.current) return
    event.preventDefault()
    suppressClickRef.current = false
  }

  function handleContextMenu(event) {
    if (window.matchMedia('(pointer: coarse)').matches) event.preventDefault()
  }

  function handleMouseEnter() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    animateFill(1, 0.75, 'power2.inOut')
    animateArrowButton(true, 0.75, 'power2.inOut')
  }

  function handleMouseLeave() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    animateFill(0, 0.3, 'power2.out')
    animateArrowButton(false, 0.3, 'power2.out')
  }

  function handleFocus(event) {
    if (event.currentTarget.matches(':focus-visible')) {
      animateFill(1, 0.45, 'power2.inOut')
      animateArrowButton(true, 0.45, 'power2.inOut')
    }
  }

  function handleBlur() {
    animateFill(0, 0.25, 'power2.out')
    animateArrowButton(false, 0.25, 'power2.out')
  }

  useLayoutEffect(() => {
    holdTimelineRef.current?.kill()
    holdTimelineRef.current = null
    gsap.killTweensOf([fillRef.current, arrowButtonRef.current, progressRef.current, progressFillRef.current])
    gsap.set(fillRef.current, { scaleX: 0 })
    gsap.set(arrowButtonRef.current, {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderColor: currentAccent,
      color: currentAccent,
    })
    gsap.set(progressRef.current, { autoAlpha: 0 })
    gsap.set(progressFillRef.current, { scaleX: 0 })
    pointerIdRef.current = null
    holdCompleteRef.current = false
    suppressClickRef.current = false
  }, [currentAccent, nextGenre.accent, nextGenre.slug])

  useLayoutEffect(() => () => {
    holdTimelineRef.current?.kill()
    gsap.killTweensOf([fillRef.current, arrowButtonRef.current, progressRef.current, progressFillRef.current])
  }, [])

  return (
    <>
      <Link
        to={`/genre/${nextGenre.slug}`}
        className="next-genre-link group relative isolate flex min-h-36 select-none items-center justify-between gap-6 overflow-hidden px-8 py-8 text-ink no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--genre-accent) max-[600px]:min-h-32 max-[600px]:gap-4 max-[600px]:px-4 max-[600px]:py-6 max-[600px]:[touch-action:pan-y_pinch-zoom] max-[600px]:[-webkit-touch-callout:none]"
        style={{ '--next-genre-accent': nextGenre.accent }}
        onContextMenu={handleContextMenu}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <span ref={fillRef} className="next-genre-link__fill pointer-events-none absolute inset-0 z-0 origin-left scale-x-0 bg-[color-mix(in_srgb,var(--next-genre-accent)_24%,var(--color-paper))]" />
        <span className="relative z-1 flex flex-col gap-1 tracking-[-.06em]">
          <small className="font-mono text-[10px] tracking-widest text-[#292923] md:text-xs">BERIKUTNYA · 0{index + 1}</small>
          <span className="text-4xl max-[600px]:text-[30px]">{nextGenre.name}</span>
          <small className="hidden font-sans text-[10px] tracking-normal text-[#292923] max-[600px]:block" id="next-genre-hint">Tahan 2 detik untuk transisi, ketuk untuk buka</small>
        </span>
        <span ref={arrowButtonRef} className="relative z-1 grid size-11.5 shrink-0 place-items-center rounded-full border border-(--genre-accent) bg-transparent text-(--genre-accent) transition-transform duration-300 group-hover:translate-x-1 max-[600px]:size-10">
          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" size={21} />
        </span>
      </Link>
      <div ref={progressRef} className="next-genre-progress pointer-events-none fixed inset-x-0 bottom-0 z-50 hidden h-1 bg-slate-900/10 max-[600px]:block" aria-hidden="true" style={{ visibility: 'hidden' }}>
        <span ref={progressFillRef} className="next-genre-progress__fill block h-full origin-left scale-x-0 bg-(--next-genre-accent)" style={{ '--next-genre-accent': nextGenre.accent }} />
      </div>
    </>
  )
}

export default NextGenreLink
