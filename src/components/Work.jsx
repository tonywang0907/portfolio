import { useEffect, useRef, useState } from 'react'

const sideProjects = [
  {
    name: 'Sports Cards Database',
    description: 'Django app for cataloging sports card collections.',
    stack: ['Django', 'Python', 'SQLite'],
    github: 'https://github.com/tonywang0907/sports-cards-database',
  },
  {
    name: 'Fantasy Basketball Stats Predictor',
    description: 'Fetches live NBA data and projects weekly fantasy stats.',
    stack: ['Python', 'nba_api', 'pandas'],
    github: 'https://github.com/tonywang0907/fantasy_basketball_stats_predictor',
  },
]

const projects = [
  {
    num: '01',
    name: 'Whatnot Card Break Wheel',
    status: 'Complete',
    stack: ['Flask', 'Python', 'Selenium', 'ExcelJS'],
    thumbnail: '/img/whatnot.jpg',
    description:
      'A multi-sports card wheel spin tool designed for Whatnot sellers, making buyer team data tracking a breeze. Paste in a live stream URL and it automatically scrapes the buyer list, spins the wheel for NBA, MLB, or NFL breaks, and matches each buyer to whatever team lands. Also doubles as a general-purpose wheel for any use case.',
    note: 'Works locally. Cloudflare blocks Selenium from scraping Whatnot in hosted environments.',
    video: 'https://www.youtube.com/embed/vLfGTB0GPgk',
    github: 'https://github.com/tonywang0907/whatnot-wheel',
  },
]

export default function Work() {
  const sectionRef = useRef(null)
  const sideRef = useRef(null)
  const [active, setActive] = useState(null)
  const [lightbox, setLightbox] = useState(null)

  // Animate main project cards on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-card').forEach((el, i) => {
              setTimeout(() => el.classList.add('card-visible'), i * 120)
            })
          }
        })
      },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Animate side project rows on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.side-row').forEach((el, i) => {
            setTimeout(() => el.classList.add('row-visible'), i * 90)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (sideRef.current) observer.observe(sideRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setActive(null); setLightbox(null) }
      if (e.key === 'ArrowRight' && lightbox) setLightbox(l => ({ ...l, index: (l.index + 1) % l.images.length }))
      if (e.key === 'ArrowLeft' && lightbox) setLightbox(l => ({ ...l, index: (l.index - 1 + l.images.length) % l.images.length }))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <>
      <style>{`
        .fade-card {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .card-visible { opacity: 1; transform: translateY(0); }

        .inven-card {
          transition: box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .inven-card:hover {
          box-shadow: 0 28px 72px rgba(0,0,0,0.26), 0 0 0 1px rgba(255,200,60,0.12) !important;
          transform: translateY(-3px);
        }
        .inven-card::after {
          content: '';
          position: absolute; inset: 0;
          border-radius: inherit;
          background: radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), rgba(255,210,70,0.13), transparent 72%);
          opacity: 0;
          transition: opacity 0.35s;
          pointer-events: none;
          z-index: 1;
        }
        .inven-card:hover::after { opacity: 1; }

        .proj-card {
          transition: box-shadow 0.25s ease, transform 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        .proj-card:hover {
          box-shadow: 0 16px 52px rgba(0,0,0,0.1), 0 0 0 1px var(--border-hover) !important;
          transform: translateY(-3px);
        }
        .proj-card::after {
          content: '';
          position: absolute; inset: 0;
          border-radius: inherit;
          background: radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), rgba(0,0,0,0.03), transparent 72%);
          opacity: 0;
          transition: opacity 0.35s;
          pointer-events: none;
          z-index: 1;
        }
        .proj-card:hover::after { opacity: 1; }

        .chip {
          font-size: 11px; color: var(--text-dim);
          background: rgba(0,0,0,0.04); border: 1px solid var(--border);
          padding: 3px 10px; border-radius: 100px; letter-spacing: 0.01em;
          white-space: nowrap;
        }
        .status-badge {
          font-size: 11px; font-weight: 500; letter-spacing: 0.04em;
          padding: 3px 9px; border-radius: 100px; white-space: nowrap;
        }

        /* ── Side rows ── */
        .side-row {
          display: grid;
          grid-template-columns: 280px 1fr auto auto;
          align-items: center;
          gap: 0 28px;
          padding: 18px 14px;
          border-bottom: 1px solid var(--border);
          border-radius: 8px;
          text-decoration: none;
          opacity: 0;
          transition: background 0.18s;
        }
        .side-row:first-child { border-top: none; }
        .side-row:hover { background: var(--bg-2); }
        .side-row:hover .side-arrow { transform: translateX(3px); }
        .side-arrow {
          font-size: 12px; color: var(--text-dim); flex-shrink: 0;
          transition: transform 0.2s cubic-bezier(0.16,1,0.3,1);
          display: inline-block;
        }
        .row-visible {
          animation: row-reveal 0.55s cubic-bezier(0.16,1,0.3,1) both;
        }
        @media (max-width: 860px) {
          .side-row { grid-template-columns: 1fr auto; }
          .side-row-desc { display: none; }
        }
        @media (max-width: 640px) {
          .side-row-stack { display: none; }
        }

        /* ── Modal ── */
        .modal-overlay { animation: fadeOverlay 0.2s ease forwards; }
        .modal-box { animation: slideUp 0.3s cubic-bezier(0.16,1,0.3,1) forwards; }
        @keyframes fadeOverlay { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .modal-img {
          width: 100%; border-radius: 10px;
          border: 1px solid var(--border);
          display: block;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .modal-img:hover { transform: scale(1.02); box-shadow: var(--shadow-md); }

        .site-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 10px 20px;
          font-size: 13px; font-weight: 500; letter-spacing: 0.01em;
          border-radius: 9px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          transition: opacity 0.2s, transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s;
        }
        .site-btn:hover {
          opacity: 0.82; transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.2);
        }
      `}</style>

      <section id="work" ref={sectionRef} style={{ padding: '100px 32px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>

          <h2 style={titleStyle}>Selected Work</h2>

          <div className="work-grid">

            {/* ── Inven AI ── */}
            <div
              className="fade-card proj-card inven-card"
              onMouseMove={e => {
                const r = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
                e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
              }}
              style={{
                background: '#141412', borderRadius: 20,
                padding: '32px', position: 'relative', overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
                display: 'flex', flexDirection: 'column', gap: 0,
              }}
            >
              {/* Ambient glow */}
              <div style={{
                position: 'absolute', top: -80, right: -40, width: 280, height: 280,
                background: 'radial-gradient(ellipse, rgba(255,210,80,0.07) 0%, transparent 65%)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute', bottom: -60, left: -40, width: 200, height: 200,
                background: 'radial-gradient(ellipse, rgba(80,120,255,0.05) 0%, transparent 65%)',
                pointerEvents: 'none',
              }} />

              {/* Header row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
                <img src="/img/invenai.png" alt="Inven AI"
                  style={{ width: 52, height: 52, borderRadius: 13, boxShadow: '0 4px 16px rgba(0,0,0,0.4)', flexShrink: 0 }}
                />
                <span style={{
                  fontSize: 11, fontWeight: 500, letterSpacing: '0.05em',
                  color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  padding: '4px 10px', borderRadius: 100,
                }}>App</span>
              </div>

              <h3 style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', color: '#fff', marginBottom: 10 }}>
                Inven AI
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, marginBottom: 32, flex: 1 }}>
                Scan a grocery receipt and AI builds your kitchen inventory, tracks what's expiring, and generates recipes from what you actually have on hand.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {['Flutter', 'AI-Assisted Dev'].map(s => (
                    <span key={s} style={{
                      fontSize: 11, color: 'rgba(255,255,255,0.28)',
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                      padding: '4px 10px', borderRadius: 100,
                    }}>{s}</span>
                  ))}
                </div>
                <a href="https://www.inven-ai.com/" target="_blank" rel="noreferrer"
                  style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', transition: 'color 0.2s', flexShrink: 0, marginLeft: 16 }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                >
                  Visit Site →
                </a>
              </div>
            </div>

            {/* ── Sports Card Wheel ── */}
            {projects.map(p => (
              <div key={p.name}
                className="fade-card proj-card"
                onClick={() => setActive(p)}
                onMouseMove={e => {
                  const r = e.currentTarget.getBoundingClientRect()
                  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
                  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
                }}
                style={{
                  background: 'var(--bg-card)', borderRadius: 20,
                  border: '1px solid var(--border)',
                  padding: '32px',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer',
                  display: 'flex', flexDirection: 'column',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
                  <img src={p.thumbnail} alt={p.name}
                    style={{ width: 52, height: 52, borderRadius: 13, objectFit: 'cover', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}
                    loading="lazy"
                  />
                  <span className="status-badge" style={{ background: 'rgba(0,0,0,0.04)', color: 'var(--text-dim)', border: '1px solid var(--border)' }}>
                    Project
                  </span>
                </div>

                <h3 style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 10 }}>
                  {p.name}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32, flex: 1 }}>
                  A multi-sports card wheel spin tool for Whatnot sellers. Scrapes the buyer list from a live stream URL, spins for NBA/MLB/NFL breaks, and matches buyers to teams.
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {p.stack.map(s => <span key={s} className="chip">{s}</span>)}
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--text-dim)', flexShrink: 0, marginLeft: 16 }}>Details →</span>
                </div>
              </div>
            ))}

          </div>

          {/* ── Side projects ── */}
          <div ref={sideRef} style={{ marginTop: 88 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
              <p style={{ ...labelStyle, marginBottom: 0 }}>Also Built</p>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, var(--border), transparent)' }} />
            </div>
            <div>
              {sideProjects.map((p, i) => (
                <a
                  key={p.name}
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="side-row"
                >
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 10, color: 'var(--text-dim)', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.06em', flexShrink: 0 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {p.name}
                  </span>
                  <span className="side-row-desc" style={{ fontSize: 13, color: 'var(--text-dim)', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.description}
                  </span>
                  <div className="side-row-stack" style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
                    {p.stack.map(s => <span key={s} className="chip">{s}</span>)}
                  </div>
                  <span className="side-arrow" style={{ fontSize: 11, letterSpacing: '0.04em', textTransform: 'uppercase' }}>GitHub ↗</span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Modal ── */}
      {active && (
        <div
          className="modal-overlay"
          onClick={() => setActive(null)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(20,20,18,0.5)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            overflowY: 'auto',
          }}
        >
          <div
            className="modal-box"
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--bg-card)',
              borderRadius: 20,
              padding: '44px 48px',
              maxWidth: 600,
              width: '100%',
              boxShadow: '0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
              position: 'relative',
              margin: 'auto',
            }}
          >
            <button
              onClick={() => setActive(null)}
              style={{
                position: 'absolute', top: 18, right: 18,
                background: 'var(--bg-2)', border: 'none',
                width: 30, height: 30, borderRadius: '50%',
                cursor: 'pointer', fontSize: 18, color: 'var(--text-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                lineHeight: 1, transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#e8e6e0'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-2)'}
            >
              ×
            </button>

            <div style={{ marginBottom: 18 }}>
              <span className="status-badge" style={{
                background: active.status === 'Complete' ? 'rgba(34,197,94,0.1)' : 'rgba(0,0,0,0.05)',
                color: active.status === 'Complete' ? '#15803d' : 'var(--text-dim)',
              }}>
                {active.status}
              </span>
            </div>

            <h3 style={{ fontSize: 24, fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 14 }}>
              {active.name}
            </h3>

            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.85, letterSpacing: '0.01em', marginBottom: active.note ? 12 : 24 }}>
              {active.description}
            </p>

            {active.note && (
              <p style={{ fontSize: 12, color: 'var(--text-dim)', fontStyle: 'italic', marginBottom: 24, lineHeight: 1.65 }}>
                {active.note}
              </p>
            )}

            {active.video && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 12 }}>
                  Demo
                </p>
                <div style={{ position: 'relative', paddingBottom: '56.25%', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <iframe
                    src={active.video}
                    title="Demo video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                  />
                </div>
              </div>
            )}

            {active.images?.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 12 }}>
                  Screenshots
                </p>
                <div className="modal-images" style={{ display: 'grid', gridTemplateColumns: active.images.length === 1 ? '1fr' : '1fr 1fr 1fr', gap: 8 }}>
                  {active.images.map(({ src, caption }, idx) => (
                    <div key={src} style={{ cursor: 'zoom-in' }} onClick={() => setLightbox({ images: active.images, index: idx })}>
                      <img src={src} alt={caption} className="modal-img" style={{ aspectRatio: active.images.length === 1 ? 'auto' : '16/10', objectFit: 'cover' }} loading="lazy" />
                      <p style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 5, textAlign: 'center' }}>{caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {active.stack.map(s => <span key={s} className="chip">{s}</span>)}
              </div>
              {active.github && (
                <a
                  href={active.github}
                  target="_blank"
                  rel="noreferrer"
                  className="site-btn"
                  style={{ background: 'var(--text)', color: '#fff' }}
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <Lightbox lightbox={lightbox} setLightbox={setLightbox} />
    </>
  )
}

function Lightbox({ lightbox, setLightbox }) {
  if (!lightbox) return null
  const { images, index } = lightbox
  const prev = () => setLightbox(l => ({ ...l, index: (l.index - 1 + l.images.length) % l.images.length }))
  const next = () => setLightbox(l => ({ ...l, index: (l.index + 1) % l.images.length }))

  return (
    <div
      onClick={() => setLightbox(null)}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'rgba(0,0,0,0.9)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
        animation: 'fadeOverlay 0.15s ease forwards',
      }}
    >
      {images.length > 1 && (
        <button onClick={e => { e.stopPropagation(); prev() }} style={navBtnStyle}>‹</button>
      )}

      <div onClick={e => e.stopPropagation()} style={{ maxWidth: 900, width: '100%', position: 'relative' }}>
        <img
          src={images[index].src}
          alt={images[index].caption}
          style={{ width: '100%', borderRadius: 12, display: 'block', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}
        />
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', fontSize: 12, marginTop: 12 }}>
          {images[index].caption} · {index + 1} / {images.length}
        </p>
      </div>

      {images.length > 1 && (
        <button onClick={e => { e.stopPropagation(); next() }} style={navBtnStyle}>›</button>
      )}

      <button
        onClick={() => setLightbox(null)}
        style={{ position: 'absolute', top: 20, right: 20, ...navBtnStyle, width: 36, height: 36, fontSize: 18 }}
      >×</button>
    </div>
  )
}

const navBtnStyle = {
  background: 'rgba(255,255,255,0.1)', border: 'none',
  color: '#fff', fontSize: 28, cursor: 'pointer',
  width: 44, height: 44, borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  flexShrink: 0, margin: '0 12px',
  transition: 'background 0.2s',
}

const labelStyle = {
  fontSize: 11, fontWeight: 500, letterSpacing: '0.14em',
  textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 12,
}
const titleStyle = {
  fontFamily: 'var(--font-display)',
  fontSize: 'clamp(38px, 5vw, 60px)', fontWeight: 400,
  letterSpacing: '-0.025em', color: 'var(--text)', marginBottom: 36,
}
