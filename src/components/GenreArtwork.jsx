import { AudioLines, Disc3, Guitar, Mic2, Piano, Radio } from 'lucide-react'

const instruments = {
  guitar: Guitar,
  saxophone: AudioLines,
  turntable: Disc3,
  synth: Piano,
  microphone: Mic2,
  vinyl: Disc3,
}

function GenreArtwork({ genre, className = '' }) {
  const Instrument = instruments[genre.icon] ?? Radio

  return (
    <div
      className={`genre-art ${className}`}
      aria-hidden="true"
      style={{ '--genre-accent': genre.accent, '--genre-pale': genre.pale }}
    >
      <span className="art-orbit" />
      <span className="art-orbit art-orbit--two" />
      <span className="art-spark art-spark--one" />
      <span className="art-spark art-spark--two" />
      <div className="art-center">
        <Instrument strokeWidth={1.05} />
      </div>
      <span className="art-index">{genre.name.slice(0, 2).toUpperCase()}</span>
    </div>
  )
}

export default GenreArtwork
