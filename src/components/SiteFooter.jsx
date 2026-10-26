import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import BrandMark from './BrandMark'
import { sourceLinks } from '../data/genres'

function SiteFooter() {
  return (
    <footer className="page-shell grid grid-cols-[.8fr_1.2fr] gap-17.5 border-t border-line py-9 pb-10.75 max-[600px]:grid-cols-1 max-[600px]:gap-7 max-[600px]:py-7.25 max-[600px]:pb-7.5">
      <div className="flex flex-col items-start gap-3">
        <Link className="inline-flex shrink-0 items-center gap-2.25 text-[10px] font-bold tracking-[.14em] md:text-xs max-[600px]:text-[11px]" to="/">
          <BrandMark />
          <span className="font-sans text-[14px] font-semibold tracking-[.12em] text-ink md:text-[15px]">LAMASA</span>
        </Link>
        <p className="text-[10px] text-[#85847c] md:text-[13px] max-[600px]:text-[11px]">Catatan kecil tentang bunyi yang membentuk kita.</p>
        <a className="mt-2 inline-flex items-center gap-1.5 text-[9px] text-muted md:text-xs max-[600px]:text-[11px]" href="#top" onClick={(event) => {
          event.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}>
          Kembali ke atas <ArrowUpRight size={14} />
        </a>
      </div>
      <div className="flex flex-col items-start gap-3.25 max-[600px]:gap-2.5">
        <span className="eyebrow max-[600px]:text-[10px]">Bacaan lanjutan</span>
        <div className="flex flex-wrap gap-x-4.25 gap-y-1.75 max-[600px]:gap-x-3.5 max-[600px]:gap-y-2">
          {sourceLinks.map((source) => (
            <a className="inline-flex items-center gap-1 text-[9px] text-muted hover:text-ink md:text-xs max-[600px]:text-[11px]" key={source.label} href={source.href} target="_blank" rel="noreferrer">
              {source.label}<ArrowUpRight size={12} />
            </a>
          ))}
        </div>
        <span className="max-w-117.5 text-[9px] leading-[1.65] text-[#a09e95] md:text-xs max-[600px]:text-[10px]">Ringkasan sejarah untuk eksplorasi awal. Kategori subgenre dapat berbeda menurut sumber dan konteks.</span>
      </div>
    </footer>
  )
}

export default SiteFooter
