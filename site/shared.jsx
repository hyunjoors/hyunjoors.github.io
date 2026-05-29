/* ═══════ THEME ═══════ */
const THEME = {
  bg: '#FAF8F5', bgOuter: '#F0EDE8', text: '#1F1D1A', muted: '#5F564D',
  accent: '#3D6091', accentMid: '#5A7FAF', accentWash: '#E8EDF4',
  border: '#D8D2CA', placeholder: '#EBE8E3',
  serif: "'Cormorant Garamond', serif",
  sans: "'DM Sans', sans-serif",
  kr: "'Noto Sans KR', sans-serif",
};

/* ═══════ PAW CURSOR ═══════ */
function PawCursor() {
  const pawSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="22" height="22"><g fill="${THEME.accent}" opacity="0.7"><ellipse cx="18" cy="12" rx="7" ry="8"/><ellipse cx="9" cy="22" rx="3.5" ry="4.5" transform="rotate(15 9 22)"/><ellipse cx="27" cy="22" rx="3.5" ry="4.5" transform="rotate(-15 27 22)"/><ellipse cx="14" cy="27" rx="3" ry="4" transform="rotate(5 14 27)"/><ellipse cx="22" cy="27" rx="3" ry="4" transform="rotate(-5 22 27)"/></g></svg>`;
  const dataUri = `data:image/svg+xml,${encodeURIComponent(pawSvg)}`;
  const paws = React.useRef([]);
  const idx = React.useRef(0);
  const lastPos = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    // Create pool of paw elements
    const pool = [];
    for (let i = 0; i < 8; i++) {
      const el = document.createElement('img');
      el.src = dataUri;
      el.className = 'paw-trail';
      document.body.appendChild(el);
      pool.push(el);
    }
    paws.current = pool;

    const onMove = (e) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 60) return;
      lastPos.current = { x: e.clientX, y: e.clientY };

      const el = pool[idx.current % pool.length];
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) - 90;
      const flip = idx.current % 2 === 0 ? 1 : -1;
      el.style.left = `${e.clientX - 11}px`;
      el.style.top = `${e.clientY - 11}px`;
      el.style.transform = `rotate(${angle}deg) scaleX(${flip})`;
      el.classList.add('visible');
      idx.current++;

      setTimeout(() => {
        el.classList.remove('visible');
        el.classList.add('fading');
        setTimeout(() => el.classList.remove('fading'), 1200);
      }, 2000);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      pool.forEach(el => el.remove());
    };
  }, []);
  return null;
}

/* ═══════ NAV ═══════ */
function Nav({ active }) {
  const links = [
    { label: 'About', href: 'index.html' },
    { label: 'Research', href: 'research.html' },
    { label: 'Projects', href: 'projects.html' },
    { label: 'News', href: 'news.html' },
    { label: 'Blog', href: 'blog.html' },
    { label: 'Cats', href: 'cats.html' },
  ];
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '28px 80px', borderBottom: `1px solid ${THEME.border}` }}>
      <a href="index.html" style={{ fontFamily: THEME.serif, fontSize: 22, fontWeight: 500, color: THEME.text }}>Rosalyn Shin</a>
      <div style={{ display: 'flex', gap: 36, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {links.map(l => (
          <a key={l.label} href={l.href} style={{
            color: active === l.label ? THEME.accent : THEME.muted,
            fontWeight: active === l.label ? 600 : 400,
            transition: 'color 0.2s',
          }}>{l.label}</a>
        ))}
      </div>
    </nav>
  );
}

/* ═══════ FOOTER ═══════ */
function Footer() {
  return (
    <footer style={{
      padding: '0 80px', height: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: THEME.accent, color: 'rgba(255,255,255,0.92)',
    }}>
      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>© 2026 Rosalyn Shin</span>
      <div style={{ display: 'flex', gap: 24, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
        {['GitHub', 'Google Scholar', 'Email'].map(l => (
          <span key={l} style={{ cursor: 'pointer' }}>{l}</span>
        ))}
      </div>
    </footer>
  );
}

/* ═══════ PAGE LAYOUT WRAPPER ═══════ */
function PageLayout({ active, children }) {
  return (
    <div style={{ background: THEME.bgOuter, minHeight: '100vh' }}>
      <PawCursor />
      <div className="page-wrap">
        <Nav active={active} />
        {children}
        <Footer />
      </div>
    </div>
  );
}

/* ═══════ SECTION LABEL ═══════ */
function SectionLabel({ text }) {
  return (
    <p style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: THEME.muted, marginBottom: 40, fontFamily: THEME.sans, fontWeight: 500 }}>{text}</p>
  );
}

/* ═══════ SIDE HEADING (editorial 2-col style) ═══════ */
function SideHeading({ line1, line2 }) {
  return (
    <div>
      <h2 style={{ fontFamily: THEME.serif, fontSize: 34, fontWeight: 500, lineHeight: 1.2, color: THEME.text }}>
        {line1}<br />{line2}
      </h2>
      <div style={{ width: 36, height: 2, background: THEME.accent, marginTop: 16 }}></div>
    </div>
  );
}

/* ═══════ PAGE HERO ═══════ */
function PageHero({ title, subtitle }) {
  return (
    <section style={{ padding: '72px 80px 56px' }}>
      <p style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: THEME.muted, marginBottom: 16, fontWeight: 500 }}>{subtitle}</p>
      <h1 style={{ fontFamily: THEME.serif, fontSize: 60, fontWeight: 400, lineHeight: 1.1, color: THEME.text }}>{title}</h1>
      <div style={{ width: 48, height: 2, background: THEME.accent, marginTop: 24 }}></div>
    </section>
  );
}

/* ═══════ DIVIDER ═══════ */
function Divider() {
  return <div className="divider"></div>;
}

/* ═══════ CONTENT HELPERS ═══════ */
function getSiteContent() {
  const fallback = {
    entriesById: {},
    worksByDateDesc: [],
    newsByDateDesc: [],
    publicationsByDateDesc: [],
    projectsByDateDesc: [],
    demosByDateDesc: [],
    postersByDateDesc: [],
    blogByDateDesc: [],
    homeSelections: { selectedWorkIds: [], selectedNewsIds: [], selectedBlogIds: [] },
  };
  if (!window.SITE_CONTENT) {
    console.warn('window.SITE_CONTENT is missing. Did you run scripts/build_content.py?');
    return fallback;
  }
  return { ...fallback, ...window.SITE_CONTENT };
}

function resolveByIds(ids, lookup) {
  if (!Array.isArray(ids)) return [];
  return ids.map(id => lookup[id]).filter(Boolean);
}

function formatIsoDate(dateString, options) {
  if (!dateString) return '';
  const parsed = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', options || { month: 'long', year: 'numeric' }).format(parsed);
}

function entryTypeLabel(type) {
  const labels = {
    project: 'Project',
    demo: 'Demo',
    poster: 'Poster',
    publication: 'Publication',
    news: 'News',
  };
  return labels[type] || type;
}

function runEntryAction(entry, onEmbed) {
  if (!entry || !entry.action) return;
  const { url, target } = entry.action;
  if (target === 'embed' && typeof onEmbed === 'function') {
    onEmbed(entry);
    return;
  }
  if (target === 'same_tab') {
    window.location.href = url;
    return;
  }
  window.open(url, '_blank', 'noopener');
}

/* ═══════ EXPORT TO WINDOW ═══════ */
Object.assign(window, {
  THEME, PawCursor, Nav, Footer, PageLayout, SectionLabel,
  SideHeading, PageHero, Divider,
  getSiteContent, resolveByIds, formatIsoDate, entryTypeLabel, runEntryAction,
});
