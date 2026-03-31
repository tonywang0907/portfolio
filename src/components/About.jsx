import { useEffect, useRef } from 'react'

const skills = [
  'Claude Code',
  'Gemini API',
  'Google AI Studio',
  'Prompt Engineering',
  'Figma',
  'Flutter',
  'React',
  'Python',
  'Flask',
  'JavaScript',
  'REST APIs',
]

export default function About() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('about-visible') },
      { threshold: 0.12 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .about-grid {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .about-visible { opacity: 1 !important; transform: translateY(0) !important; }

        .skill-chip {
          font-size: 12px;
          color: var(--text-muted);
          background: var(--bg);
          border: 1px solid var(--border);
          padding: 6px 13px;
          border-radius: 8px;
          letter-spacing: 0.01em;
          cursor: default;
          opacity: 0;
        }

        /* Stagger chips in when about section becomes visible */
        .about-visible .skill-chip {
          animation: chip-in 0.5s cubic-bezier(0.16,1,0.3,1) var(--chip-delay, 0.4s) both;
        }

        /* Hover still works after animation settles */
        .skill-chip:hover {
          color: var(--text);
          border-color: var(--border-hover);
          background: #eeecea;
        }
      `}</style>

      <section id="about" style={{ padding: '72px 32px', background: 'var(--bg-2)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div ref={ref} className="about-grid about-layout" style={{ alignItems: 'start' }}>
            <div>
              <p style={labelStyle}>About</p>
              <h2 style={{ ...titleStyle, marginBottom: 20 }}>Tony Wang</h2>
              <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.85, letterSpacing: '0.01em' }}>
                I build products that people actually use.
              </p>
            </div>

            <div className="about-sticky" style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 18,
              padding: '36px',
              position: 'sticky',
              top: 'calc(var(--nav-h) + 24px)',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <p style={{
                fontSize: 11, fontWeight: 500, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 20,
              }}>
                Tools & Stack
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {skills.map((s, i) => (
                  <span
                    key={s}
                    className="skill-chip"
                    style={{ '--chip-delay': `${0.4 + i * 0.055}s` }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const labelStyle = {
  fontSize: 11, fontWeight: 500, letterSpacing: '0.14em',
  textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 12,
}
const titleStyle = {
  fontFamily: 'var(--font-display)',
  fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400,
  letterSpacing: '-0.02em', color: 'var(--text)',
}
