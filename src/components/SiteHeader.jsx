import { ArrowUpRight, Disc3 } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { genres } from '../data/genres'

function SiteHeader() {
  const { pathname } = useLocation()

  return (
    <header className="page-shell relative flex h-19 items-center justify-between gap-7 border-b border-line max-[900px]:gap-4 max-[600px]:h-16.25 max-[600px]:flex-wrap max-[600px]:gap-0 max-[600px]:border-b-0">
      <Link className="inline-flex shrink-0 items-center gap-2.25 text-xs font-bold tracking-[.14em] max-[600px]:text-[10px]" to="/" aria-label="Lagu dan Masa, beranda">
        <span className="grid size-6.75 place-items-center rounded-full bg-ink text-paper max-[600px]:size-6.25"><Disc3 size={19} strokeWidth={1.7} /></span>
        <span className="px-px text-slate-800">LAMASA</span>
      </Link>

      <nav className="flex items-center gap-[clamp(17px,2.4vw,36px)] max-[900px]:gap-3.25 max-[600px]:absolute max-[600px]:-left-4.75 max-[600px]:top-16.25 max-[600px]:z-5 max-[600px]:flex max-[600px]:h-9.75 max-[600px]:w-[calc(100%+38px)] max-[600px]:gap-5.5 max-[600px]:overflow-x-auto max-[600px]:border-y max-[600px]:border-line max-[600px]:bg-paper max-[600px]:px-4.75 max-[600px]:scrollbar-none [&::-webkit-scrollbar]:hidden" aria-label="Navigasi genre">
        {genres.map((genre) => (
          <NavLink
            className={({ isActive }) => `border-b py-7.25 text-xs text-[#73736c] transition-colors hover:border-ink hover:text-ink max-[600px]:shrink-0 max-[600px]:pt-3 max-[600px]:pb-2.25 md:text-[13px] ${isActive ? 'border-ink text-ink' : 'border-transparent'}`}
            key={genre.slug}
            to={`/genre/${genre.slug}`}
          >
            {genre.shortName}
          </NavLink>
        ))}
      </nav>

      <Link className={`inline-flex items-center gap-1.75 border px-3 py-2.25 text-[11px] text-[#65645d] transition-colors hover:border-[#b5b2a6] hover:text-ink md:text-[13px] max-[900px]:p-2 max-[600px]:text-0 ${pathname === '/' ? 'border-[#b5b2a6] text-ink' : 'border-line'}`} to="/">
        <span>Jelajahi</span><ArrowUpRight className="max-[600px]:size-4.25" size={15} />
      </Link>
    </header>
  )
}

export default SiteHeader
