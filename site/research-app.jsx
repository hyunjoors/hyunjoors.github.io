/* ═══════ RESEARCH PAGE ═══════ */

const RESEARCH_AREAS = [
  { title: 'AI-Supported Embodied and Collaborative Mathematics Sensemaking', desc: 'Designing AI-supported learning environments that foster students’ mathematical reasoning through embodied interaction, peer collaboration, and multimodal learning experiences.' },
  { title: 'Teacher Orchestration and Learning Analytics', desc: 'Investigating how learning analytics and AI can support teachers in noticing, interpreting, and responding to students’ thinking in real time.' },
  { title: 'Neurodivergent Learners in STEM Education', desc: 'Exploring inclusive learning technologies and adaptive supports for neurodivergent learners, including students with ADHD, autism, and dyscalculia, in STEM learning contexts.' },
];

function PubItem({ pub, isLast }) {
  const th = THEME;
  return (
    <div style={{ padding: '20px 0', borderBottom: isLast ? 'none' : `1px solid ${th.border}` }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: th.accent, fontVariantNumeric: 'tabular-nums' }}>{pub.year}</span>
      </div>
      <p style={{ fontFamily: th.serif, fontSize: 22, fontWeight: 500, lineHeight: 1.35, marginBottom: 6 }}>{pub.title}</p>
      {Array.isArray(pub.authors) && pub.authors.length > 0 && (
        <p style={{ fontSize: 14, color: th.muted, marginBottom: 4 }}>{renderAuthors(pub.authors)}</p>
      )}
      {pub.venue && (
        <p style={{ fontSize: 14, color: th.accent, fontStyle: 'italic' }}>{pub.venue}</p>
      )}
      {pub.description && (
        <p style={{ fontSize: 14, color: th.muted, lineHeight: 1.7, marginTop: 6, whiteSpace: 'pre-wrap' }}>{pub.description}</p>
      )}
      <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
        {(pub.keywords || []).map(k => (
          <span key={k} style={{ fontSize: 11, padding: '2px 8px', background: th.accentWash, color: th.accent, borderRadius: 3 }}>{k}</span>
        ))}
      </div>
      {pub.pdfUrl && (
        <button onClick={() => openEntry(pub)} style={{ marginTop: 12, fontSize: 13, fontWeight: 500, color: th.accent }}>
          View PDF →
        </button>
      )}
    </div>
  );
}

function ResearchPage() {
  const th = THEME;
  const content = getSiteContent();
  const groups = content.publicationsByType || {};
  const allPubs = content.publicationsByDateDesc || [];
  const pubTypeOrder = content.pubTypes || Object.keys(groups);

  const [query, setQuery] = React.useState('');
  const [keywords, setKeywords] = React.useState([]);
  const toggleKeyword = (k) => setKeywords(prev => prev.includes(k) ? prev.filter(x => x !== k) : [...prev, k]);

  const matchesQuery = (pub) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    const authorMatch = (pub.authors || []).some(a => (a.name || '').toLowerCase().includes(q));
    return pub.title.toLowerCase().includes(q)
      || authorMatch
      || (pub.venue || '').toLowerCase().includes(q)
      || (pub.keywords || []).some(k => k.toLowerCase().includes(q));
  };

  const filteredAll = filterByKeywords(allPubs.filter(matchesQuery), keywords);
  const filteredGroups = {};
  pubTypeOrder.forEach(t => {
    const list = (groups[t] || []).filter(matchesQuery);
    const kept = filterByKeywords(list, keywords);
    if (kept.length > 0) filteredGroups[t] = kept;
  });

  return (
    <PageLayout active="Research">
      <PageHero title="Research" subtitle="Academic Career & Publications" />
      <Divider />

      <section className="section-pad">
        <SectionLabel text="Research Interests" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {RESEARCH_AREAS.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 24 }}>
              <div style={{ width: 3, minHeight: 40, background: th.accent, flexShrink: 0, marginTop: 6 }}></div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: th.serif, fontSize: 26, fontWeight: 500, marginBottom: 8 }}>{r.title}</p>
                <p style={{ fontSize: 16, color: th.muted, lineHeight: 1.8 }}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      <section className="section-pad">
        <SectionLabel text="Publications" />

        <div style={{ marginBottom: 24 }}>
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <svg style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={th.muted} strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input
              className="search-input"
              type="text"
              placeholder="Search publications by title, author, venue, or keyword…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: 8, fontSize: 12, color: th.muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Filter by keyword {keywords.length > 0 && <button onClick={() => setKeywords([])} style={{ marginLeft: 8, color: th.accent }}>clear</button>}
          </div>
          <KeywordChips entries={allPubs} selected={keywords} onToggle={toggleKeyword} />
        </div>

        <p style={{ fontSize: 13, color: th.muted, marginBottom: 16 }}>
          {filteredAll.length} publication{filteredAll.length !== 1 ? 's' : ''}
        </p>

        {pubTypeOrder.map(type => {
          const items = filteredGroups[type];
          if (!items || items.length === 0) return null;
          return (
            <div key={type} style={{ marginBottom: 40 }}>
              <h3 style={{ fontFamily: th.serif, fontSize: 24, fontWeight: 400, color: th.accent, marginBottom: 8, borderBottom: `2px solid ${th.accent}`, paddingBottom: 6 }}>
                {type}
              </h3>
              {items.map((pub, i) => (
                <PubItem key={pub.id} pub={pub} isLast={i === items.length - 1} />
              ))}
            </div>
          );
        })}

        {filteredAll.length === 0 && (
          <p style={{ fontSize: 15, color: th.muted, padding: '40px 0', textAlign: 'center' }}>
            No publications match your search.
          </p>
        )}
      </section>
    </PageLayout>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ResearchPage />);
