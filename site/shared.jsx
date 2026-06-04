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
    { label: 'Playground', href: 'playground.html' },
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

/* ═══════ VISITOR COUNTER (GoatCounter) ═══════ */
// Replace 'YOUR_CODE' with your GoatCounter subdomain (e.g. 'rosalynshin' if your dashboard is rosalynshin.goatcounter.com)
// Then in your GoatCounter site settings, enable "Allow viewing statistics without login" so the counter endpoint is public.
const GOATCOUNTER_CODE = 'hyunjoors';

function GoatCounterTracker() {
  React.useEffect(() => {
    if (!GOATCOUNTER_CODE || GOATCOUNTER_CODE === 'YOUR_CODE') return;
    const s = document.createElement('script');
    s.async = true;
    s.src = '//gc.zgo.at/count.js';
    s.setAttribute('data-goatcounter', `https://${GOATCOUNTER_CODE}.goatcounter.com/count`);
    document.body.appendChild(s);
    return () => { s.remove(); };
  }, []);
  return null;
}

function VisitorCount() {
  const [count, setCount] = React.useState(null);
  React.useEffect(() => {
    if (!GOATCOUNTER_CODE || GOATCOUNTER_CODE === 'YOUR_CODE') return;
    fetch(`https://${GOATCOUNTER_CODE}.goatcounter.com/counter/TOTAL.json`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setCount(Number(data.count_unique ?? data.count ?? 0)); })
      .catch(() => {});
  }, []);
  if (count === null) return null;
  return (
    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
      {count.toLocaleString()} visitors
    </span>
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
      <div style={{ display: 'flex', gap: 24, fontSize: 13, color: 'rgba(255,255,255,0.6)', alignItems: 'center' }}>
        <VisitorCount />
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
      <GoatCounterTracker />
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
    recentNewsIds: [],
    newsAllByDateDesc: [],
    publicationsByType: {},
    publicationsByDateDesc: [],
    presentationsByDateDesc: [],
    projectsByDateDesc: [],
    newsByDateDesc: [],
    playgroundByDateDesc: [],
    blogByDateDesc: [],
    pubTypes: [],
    presTypes: [],
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
    publication: 'Publication',
    presentation: 'Presentation',
    project: 'Project',
    news: 'News',
  };
  return labels[type] || type;
}

function entrySubtypeLabel(entry) {
  if (!entry) return '';
  if (entry.type === 'publication') return entry.pubType || 'Publication';
  if (entry.type === 'presentation') return entry.presType || 'Presentation';
  if (entry.type === 'project') return 'Project';
  if (entry.type === 'news') return 'News';
  return entryTypeLabel(entry.type);
}

function entryPrimaryUrl(entry) {
  if (!entry) return '';
  if (entry.type === 'publication') return entry.pdfUrl || '';
  if (entry.type === 'presentation') return entry.attachmentUrl || '';
  if (entry.type === 'project') return entry.url || '';
  if (entry.type === 'news') return entry.url || '';
  return '';
}

function openEntry(entry, onEmbed) {
  if (!entry) return;
  const url = entryPrimaryUrl(entry);
  if (!url) return;
  if (entry.type === 'project' && entry.mode === 'embedded' && typeof onEmbed === 'function') {
    onEmbed(entry);
    return;
  }
  const isExternal = /^https?:\/\//i.test(url);
  if (isExternal) {
    window.open(url, '_blank', 'noopener');
  } else {
    window.open(url, '_blank', 'noopener');
  }
}

function renderAuthors(authors) {
  if (!Array.isArray(authors) || authors.length === 0) return null;
  return authors.map((a, i) => {
    const sep = i < authors.length - 1 ? ', ' : '';
    if (a.me) {
      return React.createElement(React.Fragment, { key: i },
        React.createElement('strong', { style: { color: THEME.text } }, a.name),
        sep
      );
    }
    return React.createElement(React.Fragment, { key: i }, a.name, sep);
  });
}

/* ═══════ KEYWORD CHIPS FILTER ═══════ */
function KeywordChips({ entries, selected, onToggle }) {
  const th = THEME;
  const keywords = React.useMemo(() => {
    const set = new Set();
    entries.forEach(e => (e.keywords || []).forEach(k => set.add(k)));
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [entries]);
  if (keywords.length === 0) return null;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {keywords.map(k => {
        const active = selected.includes(k);
        return (
          <button
            key={k}
            onClick={() => onToggle(k)}
            className={`tag-pill ${active ? 'active' : ''}`}
            style={{ fontSize: 11 }}
          >
            {k}
          </button>
        );
      })}
    </div>
  );
}

function filterByKeywords(entries, selected) {
  if (!selected || selected.length === 0) return entries;
  return entries.filter(e => {
    const ks = e.keywords || [];
    return selected.every(s => ks.includes(s));
  });
}

/* ═══════ EXPORT TO WINDOW ═══════ */
Object.assign(window, {
  THEME, PawCursor, Nav, Footer, PageLayout, SectionLabel,
  SideHeading, PageHero, Divider,
  getSiteContent, resolveByIds, formatIsoDate,
  entryTypeLabel, entrySubtypeLabel, entryPrimaryUrl, openEntry, renderAuthors,
  KeywordChips, filterByKeywords,
});
