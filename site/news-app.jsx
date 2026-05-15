/* ═══════ NEWS PAGE ═══════ */

const ALL_NEWS = [
  { year: 2026, date: 'May 2026', title: 'Presenting at AERA Annual Meeting', desc: 'Presenting a paper on Capabilities and Limitations of LLM as a Human Collaborator in Computational Thinking Behavior Analysis and Labeling', type: 'Poster' },
  // { year: 2026, date: 'Apr 2026', title: 'Paper Accepted at LAK 2026', desc: 'Our paper on learning analytics for neurodivergent student support has been accepted at the Learning Analytics & Knowledge conference.', type: 'Publication' },
  // { year: 2026, date: 'Mar 2026', title: 'Invited Talk at UMD College of Education', desc: 'Spoke about designing AI tools that center teacher agency and student reasoning in mathematics classrooms.', type: 'Talk' },
  // { year: 2026, date: 'Jan 2026', title: 'ICLS Workshop Proceedings Published', desc: 'Co-facilitated workshop on AI and equity in STEM has been published in the ICLS 2025 companion proceedings.', type: 'Publication' },
  // { year: 2025, date: 'Nov 2025', title: 'Best Paper Nomination at CSCL 2025', desc: 'Our paper on teacher orchestration tools for AI-augmented classrooms received a best paper nomination.', type: 'Award' },
  { year: 2025, date: 'August 2025', title: 'Started PhD at University of Maryland', desc: 'Joined the Teaching and Learning, Policy and Leadership PhD program in the College of Education to research AI-supported collaborative learning environments.', type: 'Milestone' },
];

function NewsPage() {
  const th = THEME;
  const [filterType, setFilterType] = React.useState('all');
  const types = [...new Set(ALL_NEWS.map(n => n.type))];

  const filtered = ALL_NEWS.filter(n => filterType === 'all' || n.type === filterType);
  const groupedByYear = filtered.reduce((acc, n) => {
    if (!acc[n.year]) acc[n.year] = [];
    acc[n.year].push(n);
    return acc;
  }, {});
  const sortedYears = Object.keys(groupedByYear).sort((a, b) => b - a);

  const typeEmoji = { Talk: '🎤', Poster: '🖼️', Publication: '📄', Award: '🏆', Milestone: '🎓' };

  return (
    <PageLayout active="News">
      <PageHero title="News" subtitle="Conferences, Publications & Updates" />
      <Divider />

      <section className="section-pad">
        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 36, flexWrap: 'wrap' }}>
          <button className={`tag-pill ${filterType === 'all' ? 'active' : ''}`} onClick={() => setFilterType('all')}>All</button>
          {types.map(t => (
            <button key={t} className={`tag-pill ${filterType === t ? 'active' : ''}`} onClick={() => setFilterType(t)}>{t}</button>
          ))}
        </div>

        {sortedYears.map(year => (
          <div key={year} style={{ marginBottom: 48 }}>
            <h3 style={{ fontFamily: th.serif, fontSize: 28, fontWeight: 400, color: th.accent, marginBottom: 24 }}>{year}</h3>
            {groupedByYear[year].map((item, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '110px 1fr', gap: 28,
                padding: '20px 0',
                borderBottom: i < groupedByYear[year].length - 1 ? `1px solid ${th.border}` : 'none',
              }}>
                <div>
                  <span className="tag-pill" style={{ fontSize: 11 }}>{item.date.replace(` ${year}`, '')}</span>
                  <p style={{ fontSize: 12, color: th.muted, marginTop: 6 }}>{typeEmoji[item.type] || ''} {item.type}</p>
                </div>
                <div>
                  <p style={{ fontFamily: th.serif, fontSize: 23, fontWeight: 500, marginBottom: 6, lineHeight: 1.35 }}>{item.title}</p>
                  <p style={{ fontSize: 15, color: th.muted, lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
    </PageLayout>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<NewsPage />);
