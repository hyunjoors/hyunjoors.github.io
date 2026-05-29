/* ═══════ NEWS PAGE ═══════ */

const NEWS_TYPE_TABS = [
  { key: 'all', label: 'All' },
  { key: 'publication', label: 'Publications' },
  { key: 'presentation', label: 'Presentations' },
  { key: 'project', label: 'Projects' },
  { key: 'news', label: 'Others' },
];

function NewsRow({ item, isLast }) {
  const th = THEME;
  const url = entryPrimaryUrl(item);
  const showAttachment = item.type === 'presentation' && url;
  const isImage = /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(url || '');

  return (
    <div
      id={item.id}
      style={{
        display: 'grid',
        gridTemplateColumns: showAttachment ? '130px 1fr 160px' : '130px 1fr',
        gap: 24,
        padding: '24px 0',
        borderBottom: isLast ? 'none' : `1px solid ${th.border}`,
        alignItems: 'start',
      }}
    >
      <div>
        <span className="tag-pill" style={{ fontSize: 11 }}>{formatIsoDate(item.date)}</span>
        <p style={{ fontSize: 12, color: th.muted, marginTop: 6 }}>{entrySubtypeLabel(item)}</p>
      </div>
      <div>
        <p style={{ fontFamily: th.serif, fontSize: 23, fontWeight: 500, marginBottom: 6, lineHeight: 1.35 }}>{item.title}</p>
        {item.description && (
          <p style={{ fontSize: 15, color: th.muted, lineHeight: 1.7, marginBottom: 6, whiteSpace: 'pre-wrap' }}>{item.description}</p>
        )}
        {Array.isArray(item.authors) && item.authors.length > 0 && (
          <p style={{ fontSize: 13, color: th.muted, marginBottom: 4 }}>{renderAuthors(item.authors)}</p>
        )}
        {item.venue && (
          <p style={{ fontSize: 13, color: th.accent, fontStyle: 'italic' }}>{item.venue}</p>
        )}
        {(item.keywords || []).length > 0 && (
          <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
            {item.keywords.map(k => (
              <span key={k} style={{ fontSize: 11, padding: '2px 8px', background: th.accentWash, color: th.accent, borderRadius: 3 }}>{k}</span>
            ))}
          </div>
        )}
        {url && (
          <button onClick={() => openEntry(item)} style={{ marginTop: 12, fontSize: 13, color: th.accent, fontWeight: 500 }}>
            Open →
          </button>
        )}
      </div>
      {showAttachment && (
        <a href={url} target="_blank" rel="noopener" style={{ display: 'block', width: 160, height: 120, background: th.placeholder, overflow: 'hidden' }}>
          {isImage ? (
            <img src={url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: th.muted }}>PDF →</div>
          )}
        </a>
      )}
    </div>
  );
}

function NewsPage() {
  const th = THEME;
  const content = getSiteContent();
  const all = content.newsAllByDateDesc || [];
  const [typeFilter, setTypeFilter] = React.useState('all');
  const [keywords, setKeywords] = React.useState([]);

  const toggleKeyword = (k) => {
    setKeywords(prev => prev.includes(k) ? prev.filter(x => x !== k) : [...prev, k]);
  };

  const filteredByType = typeFilter === 'all' ? all : all.filter(e => e.type === typeFilter);
  const filtered = filterByKeywords(filteredByType, keywords);

  const groupedByYear = filtered.reduce((acc, item) => {
    const year = new Date(`${item.date}T00:00:00`).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {});
  const sortedYears = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <PageLayout active="News">
      <PageHero title="News" subtitle="Publications · Presentations · Projects · Updates" />
      <Divider />

      <section className="section-pad">
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {NEWS_TYPE_TABS.map(tab => (
            <button
              key={tab.key}
              className={`tag-pill ${typeFilter === tab.key ? 'active' : ''}`}
              onClick={() => setTypeFilter(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: 8, fontSize: 12, color: th.muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Filter by keyword {keywords.length > 0 && <button onClick={() => setKeywords([])} style={{ marginLeft: 8, color: th.accent }}>clear</button>}
        </div>
        <div style={{ marginBottom: 36 }}>
          <KeywordChips entries={filteredByType} selected={keywords} onToggle={toggleKeyword} />
        </div>

        {sortedYears.length === 0 && (
          <p style={{ fontSize: 15, color: th.muted, padding: '40px 0' }}>No entries match.</p>
        )}

        {sortedYears.map(year => (
          <div key={year} style={{ marginBottom: 48 }}>
            <h3 style={{ fontFamily: th.serif, fontSize: 28, fontWeight: 400, color: th.accent, marginBottom: 16 }}>{year}</h3>
            {groupedByYear[year].map((item, idx) => (
              <NewsRow key={item.id} item={item} isLast={idx === groupedByYear[year].length - 1} />
            ))}
          </div>
        ))}
      </section>
    </PageLayout>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<NewsPage />);
