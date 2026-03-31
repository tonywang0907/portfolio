import { useEffect, useRef } from 'react'

export default function Contact() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('contact-visible') },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .contact-inner {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .contact-visible { opacity: 1 !important; transform: translateY(0) !important; }

        .contact-btn-primary {
          display: inline-flex;
          align-items: center;
          padding: 13px 26px;
          background: var(--text);
          color: #fff;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.01em;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.18);
          transition: opacity 0.2s, transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s;
          position: relative; overflow: hidden;
          white-space: nowrap;
        }
        .contact-btn-primary::after {
          content: '';
          position: absolute; top: 0; left: -80%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent);
          transform: skewX(-18deg);
        }
        .contact-btn-primary:hover {
          opacity: 0.88;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.22);
        }
        .contact-btn-primary:hover::after { animation: shine-sweep 0.55s ease forwards; }

        .contact-btn-ghost {
          display: inline-flex;
          align-items: center;
          padding: 13px 26px;
          background: var(--bg-card);
          color: var(--text-muted);
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.01em;
          border-radius: 10px;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
          transition: color 0.2s, border-color 0.2s, transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s;
        }
        .contact-btn-ghost:hover {
          color: var(--text);
          border-color: var(--border-hover);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        @media (max-width: 480px) {
          .contact-btn-primary, .contact-btn-ghost {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <section id="contact" style={{ padding: '72px 32px', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient orbs */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{
            position: 'absolute',
            bottom: '-10%', left: '5%',
            width: 400, height: 400,
            background: 'radial-gradient(circle, rgba(255,190,55,0.06) 0%, transparent 68%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            animation: 'float-orb 12s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute',
            top: '-10%', right: '8%',
            width: 320, height: 320,
            background: 'radial-gradient(circle, rgba(90,140,255,0.05) 0%, transparent 68%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            animation: 'float-orb 16s ease-in-out infinite reverse',
          }} />
        </div>

        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div ref={ref} className="contact-inner">
            <p style={labelStyle}>Contact</p>
            <h2 style={{ ...titleStyle, marginBottom: 16 }}>Let's Talk</h2>
            <p style={{
              fontSize: 15, color: 'var(--text-muted)',
              maxWidth: 380, margin: '0 auto 40px',
              lineHeight: 1.8, letterSpacing: '0.01em',
            }}>
              Have a project in mind or just want to connect? I'm always open to a good conversation.
            </p>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:tony0907wang@gmail.com" className="contact-btn-primary">
                tony0907wang@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/tonywang0907/"
                target="_blank"
                rel="noreferrer"
                className="contact-btn-ghost"
              >
                LinkedIn ↗
              </a>
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
