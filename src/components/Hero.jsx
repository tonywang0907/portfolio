import { useEffect, useRef } from 'react'

export default function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    setTimeout(() => ref.current?.classList.add('hero-visible'), 60)
  }, [])

  return (
    <>
      <style>{`
        .hero-inner {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.06s,
                      transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.06s;
        }
        .hero-visible .hero-inner { opacity: 1; transform: translateY(0); }

        .hero-sub {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.18s,
                      transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.18s;
        }
        .hero-visible .hero-sub { opacity: 1; transform: translateY(0); }

        .hero-actions {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s,
                      transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s;
        }
        .hero-visible .hero-actions { opacity: 1; transform: translateY(0); }

        .btn-primary-hero {
          display: inline-flex; align-items: center;
          padding: 11px 22px;
          background: var(--text); color: #fff;
          font-size: 13px; font-weight: 500; letter-spacing: 0.01em;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.16);
          transition: opacity 0.2s, transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s;
          position: relative; overflow: hidden;
        }
        .btn-primary-hero::after {
          content: '';
          position: absolute; top: 0; left: -80%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: skewX(-18deg);
        }
        .btn-primary-hero:hover { opacity: 0.88; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.18); }
        .btn-primary-hero:hover::after { animation: shine-sweep 0.55s ease forwards; }

        .btn-ghost-hero {
          display: inline-flex; align-items: center;
          padding: 11px 22px;
          background: transparent; color: var(--text-muted);
          font-size: 13px; font-weight: 400; letter-spacing: 0.01em;
          border-radius: 10px; border: 1px solid var(--border);
          transition: color 0.2s, border-color 0.2s, transform 0.2s cubic-bezier(0.16,1,0.3,1);
        }
        .btn-ghost-hero:hover { color: var(--text); border-color: var(--border-hover); transform: translateY(-2px); }

        @media (max-width: 640px) {
          .hero-actions { flex-direction: column; align-items: flex-start; }
          .btn-primary-hero, .btn-ghost-hero { width: 100%; justify-content: center; }
        }
      `}</style>

      <section
        ref={ref}
        style={{
          paddingTop: 'calc(var(--nav-h) + 88px)',
          paddingBottom: 100,
          paddingLeft: 32,
          paddingRight: 32,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient orbs — right-weighted to balance left text */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{
            position: 'absolute',
            top: '0%', right: '10%',
            width: 520, height: 520,
            background: 'radial-gradient(circle, rgba(255,190,55,0.07) 0%, transparent 68%)',
            borderRadius: '50%',
            filter: 'blur(36px)',
            animation: 'float-orb 10s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute',
            top: '30%', right: '2%',
            width: 380, height: 380,
            background: 'radial-gradient(circle, rgba(90,140,255,0.055) 0%, transparent 68%)',
            borderRadius: '50%',
            filter: 'blur(44px)',
            animation: 'float-orb 14s ease-in-out infinite reverse',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-5%', right: '30%',
            width: 300, height: 300,
            background: 'radial-gradient(circle, rgba(180,90,255,0.035) 0%, transparent 68%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            animation: 'float-orb 18s ease-in-out infinite 3s',
          }} />
        </div>

        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 700 }}>

            <div className="hero-inner">
              <h1 style={{
                fontSize: 'clamp(56px, 9vw, 104px)',
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                letterSpacing: '-0.025em',
                lineHeight: 1.0,
                color: 'var(--text)',
                marginBottom: 24,
              }}>
                Tony Wang
              </h1>
            </div>

            <p className="hero-sub" style={{
              fontSize: 16,
              color: 'var(--text-muted)',
              lineHeight: 1.75,
              marginBottom: 36,
              letterSpacing: '0.005em',
              maxWidth: 440,
            }}>
              I like building products that people actually use.
            </p>

            <div className="hero-actions" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href="#work" className="btn-primary-hero">View My Work</a>
              <a href="#contact" className="btn-ghost-hero">Get in Touch</a>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
