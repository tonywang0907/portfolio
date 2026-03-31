import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32)
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{`
        .nav-link {
          position: relative;
          font-size: 13px; font-weight: 400; color: var(--text-muted);
          padding: 6px 13px; border-radius: 8px; display: block;
          letter-spacing: 0.01em; transition: color 0.2s;
        }
        .nav-link::after {
          content: '';
          position: absolute; bottom: 2px; left: 13px; right: 13px;
          height: 1px; background: var(--text);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-link:hover { color: var(--text); }
        .nav-link:hover::after { transform: scaleX(1); }
      `}</style>

      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: 'var(--nav-h)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        background: scrolled ? 'rgba(248,247,244,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        zIndex: 100,
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}>
        {/* Scroll progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          height: 1.5,
          width: `${progress}%`,
          background: 'var(--text)',
          opacity: 0.18,
          transition: 'width 0.08s linear',
          pointerEvents: 'none',
        }} />

        <a href="#" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <img src="/tony_wang.png" alt="TW" style={{ width: 38, height: 38, borderRadius: 6, display: 'block' }} />
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <ul className="nav-links" style={{ alignItems: 'center', gap: 2, listStyle: 'none', marginRight: 8 }}>
            {['Work', 'Contact'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
              </li>
            ))}
          </ul>

          <a
            href="mailto:tony0907wang@gmail.com"
            style={{
              fontSize: 13, fontWeight: 500, color: 'var(--text)',
              padding: '7px 16px', borderRadius: 9,
              border: '1px solid var(--border)',
              background: 'var(--bg-card)',
              boxShadow: 'var(--shadow-sm)',
              letterSpacing: '0.01em',
              transition: 'box-shadow 0.2s, border-color 0.2s, transform 0.2s cubic-bezier(0.16,1,0.3,1)',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--border-hover)'
              e.currentTarget.style.boxShadow = 'var(--shadow-md)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Get in Touch
          </a>
        </div>
      </nav>
    </>
  )
}
