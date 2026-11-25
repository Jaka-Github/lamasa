import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import GenreArtwork from './GenreArtwork'

const orbitOrder = ['rock', 'jazz', 'electronic', 'soul', 'pop', 'hip-hop']
const frontOrder = ['rock', 'hip-hop', 'pop', 'soul', 'electronic', 'jazz']

const orbitSlots = {
  rock: { x: 0, y: 25.7, opacity: 1, scale: 1.17 },
  jazz: { x: -62.5, y: -5.6, opacity: 0.72, scale: 0.64 },
  electronic: { x: -23.9, y: -15.9, opacity: 0.58, scale: 0.51 },
  soul: { x: 0, y: -19.3, opacity: 0.42, scale: 0.4 },
  pop: { x: 23.9, y: -15.9, opacity: 0.58, scale: 0.51 },
  'hip-hop': { x: 62.5, y: -5.6, opacity: 0.72, scale: 0.64 },
}

const transitionDuration = 1.4
const stepInterval = 5
const labelRevealDuration = 0.45
const labelExitDuration = 0.3

const wrapIndex = (index, length) => ((index % length) + length) % length

function interpolatePoint(previous, start, end, next, progress, key) {
  const progressSquared = progress * progress
  const progressCubed = progressSquared * progress

  return 0.5 * (
    (2 * start[key])
    + (-previous[key] + end[key]) * progress
    + (2 * previous[key] - 5 * start[key] + 4 * end[key] - next[key]) * progressSquared
    + (-previous[key] + 3 * start[key] - 3 * end[key] + next[key]) * progressCubed
  )
}

function sampleOrbit(points, position) {
  const index = Math.floor(position)
  const progress = position - index
  const previous = points[wrapIndex(index - 1, points.length)]
  const start = points[wrapIndex(index, points.length)]
  const end = points[wrapIndex(index + 1, points.length)]
  const next = points[wrapIndex(index + 2, points.length)]

  return {
    x: interpolatePoint(previous, start, end, next, progress, 'x'),
    y: interpolatePoint(previous, start, end, next, progress, 'y'),
    opacity: interpolatePoint(previous, start, end, next, progress, 'opacity'),
    scale: interpolatePoint(previous, start, end, next, progress, 'scale'),
  }
}

function GenreArtworkStack({ genres, className = '' }) {
  const stackRef = useRef(null)

  useLayoutEffect(() => {
    const stack = stackRef.current
    if (!stack || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const layers = new Map(
      [...stack.querySelectorAll('.home-artwork-layer')].map((layer) => [layer.dataset.genre, layer]),
    )
    const labels = new Map(
      [...layers].map(([slug, layer]) => [slug, layer.querySelector('.home-artwork-label')]),
    )
    const orbitPoints = frontOrder.map((slug) => orbitSlots[slug])
    const orbitState = { progress: 0 }
    const renderOrbit = () => {
      frontOrder.forEach((slug, index) => {
        const layer = layers.get(slug)
        if (!layer) return

        const position = sampleOrbit(
          orbitPoints,
          wrapIndex(index - orbitState.progress, frontOrder.length),
        )
        layer.style.setProperty('--layer-x', `${position.x}%`)
        layer.style.setProperty('--layer-y', `${position.y}%`)
        layer.style.setProperty('--layer-opacity', `${Math.min(1, Math.max(0, position.opacity))}`)
        layer.style.setProperty('--layer-scale', `${Math.max(0, position.scale)}`)
        layer.style.zIndex = `${Math.round(100 + position.y * 2)}`
      })
    }

    let timeline

    const context = gsap.context(() => {
      timeline = gsap.timeline({
        delay: 2,
        repeat: -1,
        paused: document.visibilityState !== 'visible',
      })

      renderOrbit()

      for (let index = 0; index < frontOrder.length; index += 1) {
        const start = index * stepInterval
        const currentLabel = labels.get(frontOrder[index])
        const nextLabel = labels.get(frontOrder[(index + 1) % frontOrder.length])

        timeline.to(orbitState, {
          progress: index + 1,
          duration: transitionDuration,
          ease: 'power2.inOut',
          onUpdate: renderOrbit,
        }, start)

        if (currentLabel) {
          timeline.to(currentLabel, {
            opacity: 0,
            duration: labelExitDuration,
            ease: 'power1.out',
          }, start)
        }

        if (nextLabel) {
          timeline.to(nextLabel, {
            opacity: 1,
            duration: labelRevealDuration,
            ease: 'power1.out',
          }, start + transitionDuration - labelRevealDuration)
        }
      }

      timeline.set(orbitState, { progress: frontOrder.length }, frontOrder.length * stepInterval)
    }, stack)

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') timeline?.resume()
      else timeline?.pause()
    }
    const pauseTimeline = () => timeline?.pause()
    const resumeTimeline = () => {
      if (document.visibilityState === 'visible') timeline?.resume()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('pagehide', pauseTimeline)
    window.addEventListener('pageshow', resumeTimeline)
    if (document.visibilityState !== 'visible') pauseTimeline()

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('pagehide', pauseTimeline)
      window.removeEventListener('pageshow', resumeTimeline)
      context.revert()
    }
  }, [])

  return (
    <div ref={stackRef} className={`home-artwork-stack ${className}`} aria-hidden="true">
      {orbitOrder.map((slug) => {
        const genre = genres.find((item) => item.slug === slug)
        if (!genre) return null

        const slot = orbitSlots[slug]

        return (
          <div
            className="home-artwork-layer"
            data-genre={slug}
            key={slug}
            style={{
              '--layer-x': `${slot.x}%`,
              '--layer-y': `${slot.y}%`,
              '--layer-opacity': slot.opacity,
              '--layer-scale': slot.scale,
              '--genre-accent': genre.accent,
              '--genre-pale': genre.pale,
              zIndex: Math.round(100 + slot.y * 2),
            }}
          >
            <span className="home-artwork-disc" />
            <GenreArtwork className="home-artwork-stack__art" genre={genre} />
            <span className="home-artwork-label" style={{ opacity: slug === 'rock' ? 1 : 0 }}>
              {genre.slug}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default GenreArtworkStack
