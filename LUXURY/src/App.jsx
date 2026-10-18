import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Instagram,
  Menu, MoveUpRight, X,
} from 'lucide-react'
import './App.css'

const projects = [
  { id: '01', title: 'Casa Serein', location: 'Amagansett, New York', detail: '6,240 SQ FT · PRIVATE RESIDENCE', image: 'photo-1600607687939-ce8a6c25118c', size: 'project-tall' },
  { id: '02', title: 'The Stillwater House', location: 'Hudson Valley, New York', detail: '4,880 SQ FT · COUNTRY ESTATE', image: 'photo-1600210492486-724fe5c67fb0', size: 'project-wide' },
  { id: '03', title: 'Villa Aster', location: 'Palm Springs, California', detail: '5,100 SQ FT · DESERT RETREAT', image: 'photo-1600607687920-4e2a09cf159d', size: 'project-square' },
  { id: '04', title: 'House on the Dune', location: 'Montauk, New York', detail: '3,760 SQ FT · COASTAL HOME', image: 'photo-1600566753086-00f18fb6b3ea', size: 'project-square' },
  { id: '05', title: 'Atelier No. 8', location: 'Brooklyn, New York', detail: '2,940 SQ FT · URBAN RESIDENCE', image: 'photo-1600607687644-c7171b42498f', size: 'project-wide' },
  { id: '06', title: 'The Rowan', location: 'Litchfield Hills, Connecticut', detail: '5,420 SQ FT · COUNTRY ESTATE', image: 'photo-1600210491892-03d54c0aaf87', size: 'project-tall' },
]

const testimonials = [
  { quote: 'They understood the feeling we wanted our home to have before we knew how to put it into words.', name: 'Alexandra & James Whitmore', role: 'Casa Serein, Amagansett' },
  { quote: 'The process felt considered from the first conversation. Every detail has a reason, and nothing feels overstated.', name: 'Claire & Thomas Bennett', role: 'The Stillwater House, Hudson Valley' },
  { quote: 'What they created is more than a beautiful house. It is where our family feels most like itself.', name: 'Sofia & Luca Moretti', role: 'Villa Aster, Palm Springs' },
]

const imageUrl = (id, width = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [testimonial, setTestimonial] = useState(0)
  const [project, setProject] = useState(null)
  const [sent, setSent] = useState(false)
  const projectTrigger = useRef(null)
  const modalClose = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return undefined
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!project) {
      projectTrigger.current?.focus()
      return undefined
    }
    modalClose.current?.focus()
    const onKeyDown = (event) => { if (event.key === 'Escape') setProject(null) }
    window.addEventListener('keydown', onKeyDown)
    document.body.classList.add('modal-open')
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('modal-open')
    }
  }, [project])

  const moveTestimonial = (direction) => {
    setTestimonial((index) => (index + direction + testimonials.length) % testimonials.length)
  }

  const openProject = (item, event) => {
    projectTrigger.current = event.currentTarget
    setProject(item)
  }

  const submitInquiry = (event) => {
    event.preventDefault()
    setSent(true)
    event.currentTarget.reset()
  }

  return (
    <div className="site-shell">
      <a href="#main" className="skip-link">Skip to content</a>
      <header className={`site-header ${scrolled || menuOpen ? 'is-solid' : ''}`}>
        <a className="wordmark" href="#home" aria-label="Maison Vale home">
          <span className="wordmark-name">MAISON VALE</span>
          <span className="wordmark-caption">REAL ESTATE & ARCHITECTURE</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#projects">Projects</a><a href="#about">Our approach</a><a href="#journal">Journal</a><a href="#contact">Contact</a>
        </nav>
        <a className="header-cta" href="#contact">Start a conversation <ArrowUpRight size={14} strokeWidth={1.5} /></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </header>

      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">
        <a href="#projects" onClick={() => setMenuOpen(false)}>Projects <ArrowUpRight size={16} /></a>
        <a href="#about" onClick={() => setMenuOpen(false)}>Our approach <ArrowUpRight size={16} /></a>
        <a href="#journal" onClick={() => setMenuOpen(false)}>Journal <ArrowUpRight size={16} /></a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact <ArrowUpRight size={16} /></a>
        <span className="mobile-nav-meta">NEW YORK · EVERYWHERE</span>
      </nav>}

      <main id="main">
        <section id="home" className="hero" aria-labelledby="hero-title">
          <img className="hero-image" src={imageUrl('photo-1600607687939-ce8a6c25118c', 2400)} alt="A serene contemporary home with warm stone, natural timber, and a garden opening" fetchPriority="high" />
          <div className="hero-shade" />
          <div className="hero-topline"><span>INDEPENDENT DESIGN & PROPERTY STUDIO</span><span>NEW YORK · EST. 2008</span></div>
          <div className="hero-content">
            <p className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> A more considered way to live</p>
            <h1 id="hero-title">Spaces with<br /><em>a sense of place.</em></h1>
            <div className="hero-bottom-row">
              <p className="hero-copy">We bring architecture, interiors, and exceptional homes together with a quieter kind of confidence.</p>
              <a className="hero-link" href="#projects"><span>Explore selected work</span><span className="circle-arrow"><ArrowDown size={16} strokeWidth={1.4} /></span></a>
            </div>
          </div>
          <div className="hero-index"><span>01</span><span className="hero-index-rule" /><span>06</span></div>
          <div className="hero-vertical">THOUGHTFULLY FOUND · BEAUTIFULLY MADE</div>
        </section>

        <section id="projects" className="projects section-pad">
          <div className="section-heading reveal">
            <div><p className="eyebrow"><span className="eyebrow-line dark-line" /> A few places we love</p><h2>Selected <em>works</em></h2></div>
            <div className="section-heading-aside"><p>A collection of homes and spaces shaped by light, landscape, and the way we want to feel.</p><a href="#contact" className="text-link">View all projects <ArrowUpRight size={14} /></a></div>
          </div>
          <div className="projects-grid">
            {projects.map((item, index) => <article key={item.id} className={`project-card ${item.size} reveal`} style={{ '--reveal-delay': `${(index % 3) * 90}ms` }}>
              <button type="button" className="project-image-button" onClick={(event) => openProject(item, event)} aria-label={`View ${item.title}, ${item.location}`}>
                <span className="project-image-wrap"><img src={imageUrl(item.image, 1300)} alt={`${item.title}, a refined residential architecture and interior project in ${item.location}`} loading="lazy" /></span>
                <span className="project-overlay"><span className="project-number">{item.id} / 06</span><span className="project-open"><MoveUpRight size={19} strokeWidth={1.4} /></span></span>
              </button>
              <div className="project-meta"><div><h3>{item.title}</h3><p>{item.location}</p></div><span className="project-detail">{item.detail}</span></div>
            </article>)}
          </div>
        </section>

        <section id="about" className="philosophy">
          <div className="philosophy-image reveal"><img src={imageUrl('photo-1600210492486-724fe5c67fb0', 1300)} alt="Sunlit natural wood interior with tactile stone and a quiet palette" loading="lazy" /><span className="image-caption">A home should feel like it could only be yours.</span><span className="image-vertical">MATERIAL · LIGHT · STILLNESS</span></div>
          <div className="philosophy-copy reveal">
            <p className="eyebrow"><span className="eyebrow-line dark-line" /> The Maison Vale point of view</p>
            <h2>Good design<br />makes room for <em>life.</em></h2>
            <p className="philosophy-lead">We believe the most meaningful spaces don’t ask for attention. They earn it slowly — through the way morning light moves across a room, or how a place brings people together.</p>
            <p className="philosophy-body">Part architecture practice, part property studio, we guide each project from first sketch to final key. We look for enduring materials, thoughtful proportion, and a light touch on the land. The result is not a signature style, but a deep sense of belonging.</p>
            <blockquote>“The best spaces feel<br />like they’ve always been <em>waiting for you.</em>”</blockquote>
            <a href="#contact" className="text-link">Get to know us <ArrowUpRight size={14} /></a>
          </div>
        </section>

        <section className="stats-strip" aria-label="Maison Vale at a glance">
          <div className="stats-intro"><span className="eyebrow">A practice shaped by trust</span><span className="stats-note">Over time, and across places.</span></div>
          <div className="stat"><strong>16</strong><span>Years of practice</span></div><div className="stat"><strong>84</strong><span>Places made</span></div><div className="stat"><strong>12</strong><span>Design honours</span></div><div className="stat"><strong>98<small>%</small></strong><span>Client referrals</span></div>
        </section>

        <section id="journal" className="journal section-pad">
          <div className="journal-top reveal"><p className="eyebrow"><span className="eyebrow-line dark-line" /> Notes from home</p><p className="journal-label">A LITTLE MORE ABOUT HOW WE SEE THINGS</p></div>
          <div className="testimonial reveal" aria-live="polite" aria-atomic="true" aria-label={`Client story ${testimonial + 1} of ${testimonials.length}`}>
            <span className="quote-mark" aria-hidden="true">“</span>
            <blockquote>{testimonials[testimonial].quote}</blockquote>
            <div className="quote-attribution"><span className="quote-rule" /><span><strong>{testimonials[testimonial].name}</strong><small>{testimonials[testimonial].role}</small></span></div>
          </div>
          <div className="testimonial-controls"><span className="testimonial-count"><strong>0{testimonial + 1}</strong> <i /> 0{testimonials.length}</span><div className="arrow-controls"><button type="button" onClick={() => moveTestimonial(-1)} aria-label="Previous testimonial"><ArrowLeft size={17} /></button><button type="button" onClick={() => moveTestimonial(1)} aria-label="Next testimonial"><ArrowRight size={17} /></button></div></div>
        </section>

        <section className="journal-teaser reveal"><div><p className="eyebrow"><span className="eyebrow-line dark-line" /> From the journal · 04</p><h2>On finding a home<br />that <em>feels like you.</em></h2></div><a href="#contact" className="text-link">A note on finding your place <ArrowUpRight size={14} /></a><div className="journal-teaser-image"><img src={imageUrl('photo-1600566753190-17f0baa2a6c3', 1100)} alt="Quietly composed living room with natural textures and soft daylight" loading="lazy" /></div></section>

        <footer id="contact" className="site-footer">
          <div className="footer-main">
            <div className="footer-message"><p className="eyebrow"><span className="eyebrow-line" /> The first step is a conversation</p><h2>Find your<br /><em>somewhere.</em></h2><p>Tell us what home means to you. We’ll take it from there.</p><a className="footer-email" href="mailto:hello@maisonvale.example">hello@maisonvale.example <ArrowUpRight size={15} /></a></div>
            <form className="contact-form" onSubmit={submitInquiry}>
              <label>Your name<input name="name" type="text" placeholder="How should we address you?" autoComplete="name" required /></label>
              <label>Email address<input name="email" type="email" placeholder="Where can we reach you?" autoComplete="email" required /></label>
              <label>A little about your plans<textarea name="message" rows="2" placeholder="A home to find, a place to make..." required /></label>
              <div className="form-submit-row"><button type="submit" className="submit-button">Send an enquiry <ArrowUpRight size={15} /></button><span className="form-note" aria-live="polite">{sent ? <><Check size={13} /> Thank you — we’ll be in touch soon.</> : 'We usually reply within two working days.'}</span></div>
            </form>
          </div>
          <div className="footer-bottom"><a className="footer-wordmark" href="#home">MAISON VALE<span>®</span></a><span className="footer-copyright">© 2026 MAISON VALE STUDIO</span><div className="footer-links"><a href="#projects">Projects</a><a href="#about">About</a><a href="https://www.instagram.com/" aria-label="Instagram"><Instagram size={15} /></a></div><span className="footer-location">NEW YORK · EVERYWHERE</span></div>
        </footer>
      </main>

      {project && <div className="project-modal" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setProject(null) }}><div className="project-modal-panel" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onKeyDown={(event) => { if (event.key === 'Tab') { const controls = [...event.currentTarget.querySelectorAll('button, a[href]')]; const first = controls[0]; const last = controls[controls.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() } } }}><button ref={modalClose} className="modal-close" type="button" onClick={() => setProject(null)} aria-label="Close project"><X size={19} /></button><img src={imageUrl(project.image, 1800)} alt={`${project.title} architecture and interiors`} /><div className="modal-project-meta"><span className="eyebrow">PROJECT {project.id} · {project.detail}</span><h2 id="project-modal-title">{project.title}</h2><p>{project.location}</p><a className="text-link" href="#contact" onClick={() => setProject(null)}>Enquire about a similar project <ArrowUpRight size={14} /></a></div></div></div>}
      <div className="sr-only" aria-live="polite">{sent ? 'Your enquiry has been sent. Thank you.' : ''}</div>
    </div>
  )
}

export default App
