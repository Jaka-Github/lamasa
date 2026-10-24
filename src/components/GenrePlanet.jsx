import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

function GenrePlanet({ accent, pale, className = '' }) {
  const hostRef = useRef(null)

  useLayoutEffect(() => {
    const host = hostRef.current
    const page = host?.closest('main')
    if (!host || !page) return undefined

    let disposed = false
    let renderer
    let geometry
    let material
    let resizeObserver
    let visibilityObserver
    let planet
    let scene
    let camera
    let renderFrame
    let handleVisibilityChange
    let handleMotionPreferenceChange
    let tickerActive = false
    let isInView = false
    let rotation = 0
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')

    import('three').then((THREE) => {
      if (disposed) return

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(34, 1, 0.1, 20)
      camera.position.z = 4.8

      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      } catch (error) {
        console.error('Unable to initialize the genre planet WebGL renderer.', error)
        return
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setClearColor(0x000000, 0)
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.domElement.setAttribute('aria-hidden', 'true')
      host.appendChild(renderer.domElement)

      geometry = new THREE.SphereGeometry(1.12, 128, 96)
      material = new THREE.ShaderMaterial({
        uniforms: {
          uAccent: { value: new THREE.Color(accent) },
          uBase: { value: new THREE.Color(pale) },
        },
        vertexShader: `
          varying vec3 vViewNormal;
          varying vec3 vObjectNormal;

          void main() {
            vViewNormal = normalize(normalMatrix * normal);
            vObjectNormal = normalize(normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uAccent;
          uniform vec3 uBase;
          varying vec3 vViewNormal;
          varying vec3 vObjectNormal;

          void main() {
            vec3 normal = normalize(vViewNormal);
            vec3 localNormal = normalize(vObjectNormal);
            float light = 0.62 + 0.38 * max(dot(normal, normalize(vec3(-0.45, 0.58, 1.0))), 0.0);
            float continentField =
              sin(localNormal.x * 8.0 + cos(localNormal.z * 4.0)) *
              cos(localNormal.y * 7.0 - sin(localNormal.x * 3.0)) *
              sin(localNormal.z * 6.0 + localNormal.y * 2.0);
            float continents = smoothstep(0.12, 0.3, continentField);
            float colorShift = 0.08 + 0.1 * smoothstep(-0.55, 0.8, normal.y);
            float rim = pow(1.0 - max(dot(normal, vec3(0.0, 0.0, 1.0)), 0.0), 2.0);
            vec3 color = mix(uBase, uAccent, colorShift + continents * 0.32 + rim * 0.12);
            gl_FragColor = vec4(color * light, 0.88);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
        }
      `,
        transparent: true,
        side: THREE.FrontSide,
        depthWrite: false,
      })

      planet = new THREE.Mesh(geometry, material)
      planet.rotation.x = -0.16
      scene.add(planet)

      renderFrame = (_time, deltaTime = 0) => {
        if (!motionPreference.matches) {
          rotation += (deltaTime / 1000) * (Math.PI * 2 / 45)
          planet.rotation.y = rotation
        }
        renderer.render(scene, camera)
      }

      const syncAnimation = () => {
        const shouldAnimate = !disposed && !document.hidden && isInView && !motionPreference.matches
        if (shouldAnimate !== tickerActive) {
          tickerActive = shouldAnimate
          if (tickerActive) {
            gsap.ticker.add(renderFrame)
            renderer.render(scene, camera)
          } else {
            gsap.ticker.remove(renderFrame)
          }
        }

        if (!shouldAnimate && !document.hidden && isInView) renderer.render(scene, camera)
      }
      handleVisibilityChange = () => syncAnimation()
      handleMotionPreferenceChange = () => syncAnimation()

      document.addEventListener('visibilitychange', handleVisibilityChange)
      motionPreference.addEventListener('change', handleMotionPreferenceChange)

      visibilityObserver = new IntersectionObserver(([entry]) => {
        isInView = entry.isIntersecting
        syncAnimation()
      })
      visibilityObserver.observe(host)

      resizeObserver = new ResizeObserver(([entry]) => {
        if (disposed) return
        const { width, height } = entry.contentRect
        if (width === 0 || height === 0) return
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        if (!document.hidden && isInView) renderer.render(scene, camera)
      })
      resizeObserver.observe(host)

      syncAnimation()
    }).catch((error) => {
      console.error('Unable to load the genre planet renderer.', error)
    })

    return () => {
      disposed = true
      if (tickerActive) gsap.ticker.remove(renderFrame)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      motionPreference.removeEventListener('change', handleMotionPreferenceChange)
      visibilityObserver?.disconnect()
      resizeObserver?.disconnect()
      geometry?.dispose()
      material?.dispose()
      renderer?.dispose()
      renderer?.domElement.remove()
    }
  }, [accent, pale])

  return <div ref={hostRef} className={`genre-planet ${className}`} aria-hidden="true" />
}

export default GenrePlanet
