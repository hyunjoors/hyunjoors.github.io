/* ═══════ PLAYGROUND PAGE ═══════ */

const PLAYGROUND_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'project', label: 'Projects' },
  { key: 'Workshops', label: 'Workshops' },
  { key: 'Demo', label: 'Demos' },
];

function entryFacet(entry) {
  if (entry.type === 'project') return 'project';
  if (entry.type === 'presentation') return entry.presType;
  return entry.type;
}

function EmbedOverlay({ entry, onClose }) {
  React.useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  const url = entryPrimaryUrl(entry);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex', flexDirection: 'column',
      animation: 'fadeUp 0.3s ease both',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', background: '#1a1a2e', color: 'white' }}>
        <span style={{ fontFamily: THEME.serif, fontSize: 18, fontWeight: 500 }}>{entry.title}</span>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a href={url} target="_blank" rel="noopener" style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Open in new tab</a>
          <button onClick={onClose} style={{ color: 'white', fontSize: 20, lineHeight: 1, padding: '4px 8px' }}>✕</button>
        </div>
      </div>
      <div style={{ flex: 1, background: 'white' }}>
        <iframe src={url} style={{ width: '100%', height: '100%', border: 'none' }} title={entry.title}></iframe>
      </div>
    </div>
  );
}

function PlaygroundCard({ entry, onOpenEmbed }) {
  const th = THEME;
  const url = entryPrimaryUrl(entry);
  const subtype = entrySubtypeLabel(entry);

  return (
    <div className="card-lift" style={{ border: `1px solid ${th.border}`, overflow: 'hidden' }}>
      <div style={{ height: 120, background: th.placeholder, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '20px 24px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '2px 8px', borderRadius: 3, background: th.accentWash, color: th.accent }}>
            {subtype}
          </span>
          {entry.type === 'project' && (
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '2px 8px', borderRadius: 3, background: th.accentWash, color: th.accent }}>
              {entry.mode === 'embedded' ? 'Interactive' : 'External'}
            </span>
          )}
        </div>
        <p style={{ fontFamily: th.serif, fontSize: 26, fontWeight: 500 }}>{entry.title}</p>
      </div>

      <div style={{ padding: '22px 24px' }}>
        {entry.description && (
          <p style={{ fontSize: 15, color: th.muted, lineHeight: 1.8, marginBottom: 14, whiteSpace: 'pre-wrap' }}>{entry.description}</p>
        )}
        {Array.isArray(entry.authors) && entry.authors.length > 0 && (
          <p style={{ fontSize: 13, color: th.muted, marginBottom: 10 }}>{renderAuthors(entry.authors)}</p>
        )}
        {entry.venue && (
          <p style={{ fontSize: 13, color: th.accent, fontStyle: 'italic', marginBottom: 12 }}>{entry.venue}</p>
        )}
        {url && (
          <button
            onClick={() => openEntry(entry, onOpenEmbed)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 20px', background: th.accent, color: 'white', fontSize: 14, fontWeight: 500 }}
          >
            Open →
          </button>
        )}
        <div style={{ display: 'flex', gap: 6, marginTop: 16, flexWrap: 'wrap' }}>
          {(entry.keywords || []).map(k => (
            <span key={k} style={{ fontSize: 11, padding: '2px 8px', background: th.accentWash, color: th.accent, borderRadius: 3 }}>{k}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlaygroundPage() {
  const content = getSiteContent();
  const all = content.playgroundByDateDesc || [];
  const [facet, setFacet] = React.useState('all');
  const [keywords, setKeywords] = React.useState([]);
  const [embedded, setEmbedded] = React.useState(null);

  const toggleKeyword = (k) => setKeywords(prev => prev.includes(k) ? prev.filter(x => x !== k) : [...prev, k]);

  const byFacet = facet === 'all' ? all : all.filter(e => entryFacet(e) === facet);
  const filtered = filterByKeywords(byFacet, keywords);

  return (
    <PageLayout active="Playground">
      <PageHero title="Playground" subtitle="Projects, Workshops & Demos" />
      <Divider />

      <section className="section-pad">
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {PLAYGROUND_FILTERS.map(f => (
            <button key={f.key} className={`tag-pill ${facet === f.key ? 'active' : ''}`} onClick={() => setFacet(f.key)}>
              {f.label}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: 8, fontSize: 12, color: THEME.muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Filter by keyword {keywords.length > 0 && <button onClick={() => setKeywords([])} style={{ marginLeft: 8, color: THEME.accent }}>clear</button>}
        </div>
        <div style={{ marginBottom: 36 }}>
          <KeywordChips entries={byFacet} selected={keywords} onToggle={toggleKeyword} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28 }}>
          {filtered.map(entry => (
            <PlaygroundCard key={entry.id} entry={entry} onOpenEmbed={setEmbedded} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p style={{ fontSize: 15, color: THEME.muted, padding: '40px 0', textAlign: 'center' }}>No entries match.</p>
        )}
      </section>

      {embedded && <EmbedOverlay entry={embedded} onClose={() => setEmbedded(null)} />}
    </PageLayout>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PlaygroundPage />);
