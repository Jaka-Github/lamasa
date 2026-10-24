import { useLayoutEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import HomePage from './pages/HomePage'
import GenrePage from './pages/GenrePage'
import { genres } from './data/genres'

function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function NotFoundPage() {
  return (
    <main className="page-shell flex min-h-[62vh] flex-col items-start justify-center">
      <span className="eyebrow">Sisi lain dari katalog</span>
      <h1 className="my-3.75 mb-6 max-w-150 text-[clamp(45px,6vw,70px)] font-medium tracking-[-.07em]">Genre ini belum ditemukan.</h1>
      <Link className="border-b border-[#a9a79d] pb-1.25 text-xs" to="/">Kembali ke eksplorasi</Link>
    </main>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {genres.map((genre) => (
          <Route
            key={genre.slug}
            path={`/genre/${genre.slug}`}
            element={<GenrePage genre={genre} />}
          />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <SiteFooter />
    </>
  )
}

export default App
