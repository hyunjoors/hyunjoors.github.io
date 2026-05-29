/* ═══════ RESEARCH PAGE ═══════ */

const RESEARCH_AREAS = [
  { title: 'AI-Supported Embodied and Collaborative Mathematics Sensemaking', icon: '→', desc: 'Designing AI-supported learning environments that foster students’ mathematical reasoning through embodied interaction, peer collaboration, and multimodal learning experiences.' },
  { title: 'Teacher Orchestration and Learning Analytics', icon: '→', desc: 'Investigating how learning analytics and AI can support teachers in noticing, interpreting, and responding to students’ thinking in real time.' },
  { title: 'Neurodivergent Learners in STEM Education', icon: '→', desc: 'Exploring inclusive learning technologies and adaptive supports for neurodivergent learners, including students with ADHD, autism, and dyscalculia, in STEM learning contexts.' },
];

function PubItem({ pub }) {
  const th = THEME;
  const typeColors = { journal: '#4A6FA5', conference: '#6B8FBF', workshop: '#8A7F76' };
  const color = typeColors[pub.pubType] || th.accent;

  return (
    <div className="card-lift" style={{ padding: '24px 28px', border: `1px solid ${th.border}`, marginBottom: 12 }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: th.accent, fontVariantNumeric: 'tabular-nums' }}>{new Date(`${pub.date}T00:00:00`).getFullYear()}</span>
        <span style={{
          fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em',
          padding: '2px 8px', borderRadius: 3,
          background: `${color}20`, color,
        }}>{pub.pubType}</span>
      </div>
      <p style={{ fontFamily: th.serif, fontSize: 22, fontWeight: 500, lineHeight: 1.35, marginBottom: 6 }}>{pub.title}</p>
      <p style={{ fontSize: 14, color: th.muted, marginBottom: 4 }}>{pub.authors}</p>
      <p style={{ fontSize: 14, color: th.accent, fontStyle: 'italic' }}>{pub.venue}</p>
      <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
        {(pub.tags || []).map(tag => (
          <span key={tag} style={{ fontSize: 11, padding: '2px 8px', background: th.accentWash, color: th.accent, borderRadius: 3 }}>{tag}</span>
        ))}
      </div>
      <button onClick={() => runEntryAction(pub)} style={{ marginTop: 12, fontSize: 13, fontWeight: 500, color: th.accent }}>
        {pub.action?.label || 'View details'} →
      </button>
    </div>
  );
}

function ResearchPage() {
  const th = THEME;
  const content = getSiteContent();
  const demos = content.demosByDateDesc || [];
  const posters = content.postersByDateDesc || [];
  const publications = content.publicationsByDateDesc || [];

  const [query, setQuery] = React.useState('');
  const [filterType, setFilterType] = React.useState('all');
  const [filterYear, setFilterYear] = React.useState('all');

  const filteredPublications = publications.filter(pub => {
    const matchQuery = !query
      || pub.title.toLowerCase().includes(query.toLowerCase())
      || pub.authors.toLowerCase().includes(query.toLowerCase())
      || (pub.tags || []).some(tag => tag.toLowerCase().includes(query.toLowerCase()));
    const matchType = filterType === 'all' || pub.pubType === filterType;
    const pubYear = String(new Date(`${pub.date}T00:00:00`).getFullYear());
    const matchYear = filterYear === 'all' || pubYear === filterYear;
    return matchQuery && matchType && matchYear;
  });

  const years = [...new Set(publications.map(pub => String(new Date(`${pub.date}T00:00:00`).getFullYear())))].sort((a, b) => b.localeCompare(a));
  const types = [...new Set(publications.map(pub => pub.pubType))];

  return (
    <PageLayout active="Research">
      <PageHero title="Research" subtitle="Academic Career & Publications" />
      <Divider />

      <section className="section-pad">
        <SectionLabel text="Research Interests" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {RESEARCH_AREAS.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 24, maxWidth: 800 }}>
              <div style={{ width: 3, minHeight: 40, background: th.accent, flexShrink: 0, marginTop: 6 }}></div>
              <div>
                <p style={{ fontFamily: th.serif, fontSize: 26, fontWeight: 500, marginBottom: 8 }}>{r.title}</p>
                <p style={{ fontSize: 16, color: th.muted, lineHeight: 1.8 }}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      <section className="section-pad">
        <SectionLabel text="Demos" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {demos.map(demo => (
            <div key={demo.id} className="card-lift" style={{ border: `1px solid ${th.border}`, overflow: 'hidden' }}>
              <div style={{ height: 120, background: th.accentWash, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.5 }}>
                  <polygon points="8,5 19,12 8,19" fill={th.accent} />
                </svg>
                {demo.venue && (
                  <span style={{ position: 'absolute', bottom: 8, right: 12, fontSize: 11, fontWeight: 600, color: th.accent, background: 'white', padding: '2px 8px', borderRadius: 3 }}>
                    {demo.venue}
                  </span>
                )}
              </div>
              <div style={{ padding: '20px 24px' }}>
                <p style={{ fontFamily: th.serif, fontSize: 20, fontWeight: 500, marginBottom: 8, lineHeight: 1.3 }}>{demo.title}</p>
                <p style={{ fontSize: 13, color: th.muted, lineHeight: 1.7, marginBottom: 12 }}>{demo.summary}</p>
                <button onClick={() => runEntryAction(demo)} style={{ fontSize: 13, fontWeight: 500, color: th.accent }}>
                  {demo.action?.label || 'Open demo'} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      <section className="section-pad">
        <SectionLabel text="Posters" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {posters.map(poster => (
            <div key={poster.id} className="card-lift" style={{ border: `1px solid ${th.border}`, overflow: 'hidden', cursor: 'pointer' }} onClick={() => runEntryAction(poster)}>
              <div style={{ height: 180, background: th.placeholder, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {poster.thumbnail ? (
                  <img src={poster.thumbnail} alt={poster.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontFamily: 'monospace', fontSize: 10, color: th.muted }}>poster preview</span>
                )}
              </div>
              <div style={{ padding: '16px 20px' }}>
                <p style={{ fontFamily: th.serif, fontSize: 16, fontWeight: 500, lineHeight: 1.35, marginBottom: 6 }}>{poster.title}</p>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span className="tag-pill" style={{ fontSize: 10 }}>{poster.venue}</span>
                  <span style={{ fontSize: 12, color: th.muted }}>{poster.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      <section className="section-pad">
        <SectionLabel text="Publications" />

        <div style={{ marginBottom: 32 }}>
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <svg style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={th.muted} strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input
              className="search-input"
              type="text"
              placeholder="Search publications by title, author, or topic..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button className={`tag-pill ${filterType === 'all' ? 'active' : ''}`} onClick={() => setFilterType('all')}>All types</button>
            {types.map(type => (
              <button key={type} className={`tag-pill ${filterType === type ? 'active' : ''}`} onClick={() => setFilterType(type)} style={{ textTransform: 'capitalize' }}>{type}</button>
            ))}
            <span style={{ width: 1, height: 24, background: th.border, margin: '0 8px' }}></span>
            <button className={`tag-pill ${filterYear === 'all' ? 'active' : ''}`} onClick={() => setFilterYear('all')}>All years</button>
            {years.map(year => (
              <button key={year} className={`tag-pill ${filterYear === year ? 'active' : ''}`} onClick={() => setFilterYear(year)}>{year}</button>
            ))}
          </div>
        </div>

        <p style={{ fontSize: 13, color: th.muted, marginBottom: 16 }}>
          {filteredPublications.length} publication{filteredPublications.length !== 1 ? 's' : ''}
        </p>
        {filteredPublications.map(pub => <PubItem key={pub.id} pub={pub} />)}
        {filteredPublications.length === 0 && (
          <p style={{ fontSize: 15, color: th.muted, padding: '40px 0', textAlign: 'center' }}>
            No publications match your search.
          </p>
        )}
      </section>
    </PageLayout>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ResearchPage />);
