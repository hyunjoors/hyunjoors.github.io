/* ═══════ NEWS PAGE ═══════ */

function NewsPage() {
  const th = THEME;
  const content = getSiteContent();
  const newsItems = content.newsByDateDesc || [];
  const [filterType, setFilterType] = React.useState('all');
  const types = [...new Set(newsItems.map(item => item.newsType))];

  const filtered = newsItems.filter(item => filterType === 'all' || item.newsType === filterType);
  const groupedByYear = filtered.reduce((acc, item) => {
    const year = new Date(`${item.date}T00:00:00`).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {});
  const sortedYears = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a));

  const typeEmoji = { Talk: '🎤', Poster: '🖼️', Publication: '📄', Award: '🏆', Milestone: '🎓' };

  return (
    <PageLayout active="News">
      <PageHero title="News" subtitle="Conferences, Publications & Updates" />
      <Divider />

      <section className="section-pad">
        <div style={{ display: 'flex', gap: 8, marginBottom: 36, flexWrap: 'wrap' }}>
          <button className={`tag-pill ${filterType === 'all' ? 'active' : ''}`} onClick={() => setFilterType('all')}>All</button>
          {types.map(type => (
            <button key={type} className={`tag-pill ${filterType === type ? 'active' : ''}`} onClick={() => setFilterType(type)}>
              {type}
            </button>
          ))}
        </div>

        {sortedYears.map(year => (
          <div key={year} style={{ marginBottom: 48 }}>
            <h3 style={{ fontFamily: th.serif, fontSize: 28, fontWeight: 400, color: th.accent, marginBottom: 24 }}>{year}</h3>
            {groupedByYear[year].map((item, idx) => (
              <div
                key={item.id}
                id={item.id}
                style={{
                  display: 'grid', gridTemplateColumns: '130px 1fr', gap: 28,
                  padding: '20px 0',
                  borderBottom: idx < groupedByYear[year].length - 1 ? `1px solid ${th.border}` : 'none',
                }}
              >
                <div>
                  <span className="tag-pill" style={{ fontSize: 11 }}>{formatIsoDate(item.date)}</span>
                  <p style={{ fontSize: 12, color: th.muted, marginTop: 6 }}>
                    {typeEmoji[item.newsType] || ''} {item.newsType}
                  </p>
                </div>
                <div>
                  <p style={{ fontFamily: th.serif, fontSize: 23, fontWeight: 500, marginBottom: 6, lineHeight: 1.35 }}>{item.title}</p>
                  <p style={{ fontSize: 15, color: th.muted, lineHeight: 1.7, marginBottom: 8 }}>{item.summary}</p>
                  <button onClick={() => runEntryAction(item)} style={{ fontSize: 13, color: th.accent, fontWeight: 500 }}>
                    {item.action?.label || 'Open'} →
                  </button>
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
