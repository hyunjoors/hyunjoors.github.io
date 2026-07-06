/* ═══════ HOMEPAGE (About) ═══════ */

const CATS_DATA = [
  { name: 'Sirius', kr: '현금', img: 'uploads/LAB06305%20sh%20%E1%84%8C%E1%85%B3%E1%86%BC%E1%84%86%E1%85%A7%E1%86%BC.jpg' },
  { name: 'Eleanora', kr: '현옥', img: 'uploads/LAB06477%20sh%20%E1%84%87%E1%85%A1%E1%86%AB%E1%84%8D%E1%85%A9%E1%86%A8.jpg' },
];

const EDUCATION = [
  { degree: 'Ph.D.', field: 'Teaching & Learning, Policy & Leadership', school: 'University of Maryland', status: 'In progress' },
  { degree: 'M.Eng.', field: 'Computer Science', school: 'Johns Hopkins University', status: '' },
  { degree: 'B.S.', field: 'Computer Science', school: 'Purdue University', status: '' },
];

function isImage(url) {
  return /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(url || '');
}

function RecentNewsRow({ item, isLast }) {
  const th = THEME;
  const url = entryPrimaryUrl(item);
  const showAttachment = item.type === 'presentation' && url;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: showAttachment ? '110px 1fr 140px' : '110px 1fr',
        gap: 24,
        padding: '20px 0',
        borderBottom: isLast ? 'none' : `1px solid ${th.border}`,
        alignItems: 'start',
      }}
    >
      <div>
        <span className="tag-pill" style={{ fontSize: 11 }}>{formatIsoDate(item.date)}</span>
        <p style={{ fontSize: 11, color: th.muted, marginTop: 6 }}>{entrySubtypeLabel(item)}</p>
      </div>
      <div>
        <p style={{ fontFamily: th.serif, fontSize: 22, fontWeight: 500, marginBottom: 4, lineHeight: 1.35 }}>{item.title}</p>
        {item.description && (
          <p style={{ fontSize: 14, color: th.muted, lineHeight: 1.7, marginBottom: 6, whiteSpace: 'pre-wrap' }}>{item.description}</p>
        )}
        {Array.isArray(item.authors) && item.authors.length > 0 && (
          <p style={{ fontSize: 13, color: th.muted, marginBottom: 4 }}>{renderAuthors(item.authors)}</p>
        )}
        {item.venue && (
          <p style={{ fontSize: 13, color: th.accent, fontStyle: 'italic' }}>{item.venue}</p>
        )}
        {url && (
          <button onClick={() => openEntry(item)} style={{ marginTop: 8, fontSize: 13, color: th.accent, fontWeight: 500 }}>
            Open →
          </button>
        )}
      </div>
      {showAttachment && (
        <a href={url} target="_blank" rel="noopener" style={{ display: 'block', width: 140, height: 100, background: th.placeholder, overflow: 'hidden' }}>
          {isImage(url) ? (
            <img src={url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: th.muted }}>PDF →</div>
          )}
        </a>
      )}
    </div>
  );
}

function HomePage() {
  const th = THEME;
  const content = getSiteContent();
  const entriesById = content.entriesById || {};
  const recentNews = resolveByIds(content.recentNewsIds || [], entriesById)
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const blogPreview = (content.blogByDateDesc || []).slice(0, 3);

  return (
    <PageLayout active="About">
      <section style={{ padding: '96px 80px 72px', display: 'flex', gap: 80 }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: th.muted, marginBottom: 28, fontWeight: 500 }}>
            PhD Student · University of Maryland
          </p>
          <h1 style={{ fontFamily: th.serif, fontSize: 76, fontWeight: 400, lineHeight: 1.02, marginBottom: 40 }}>
            Rosalyn Shin
          </h1>
          <div style={{ width: 48, height: 2, background: th.accent, marginBottom: 28 }}></div>
          <p style={{ fontSize: 17, lineHeight: 1.85, maxWidth: 540, color: th.text, opacity: 0.7 }}>
            I am a PhD student in <a href="https://education.umd.edu/academics/departments/tlpl" style={{ color: th.accent, textDecoration: 'underline' }}>Technology and Learning, Policy and Leadership</a> at the <a href="https://umd.edu/" style={{ color: th.accent, textDecoration: 'underline' }}>University of Maryland, College Park</a>, advised by <a href="https://regal.umd.edu/#people" style={{ color: th.accent, textDecoration: 'underline' }}>Dr. Fengfeng Ke</a> in the <a href="https://regal.umd.edu" style={{ color: th.accent, textDecoration: 'underline' }}>REGAL Lab</a>. My research is grounded in the Learning Sciences and lies at the intersection of human-computer interaction, mathematics education, and AI-supported learning. I study how students develop mathematical understanding through embodied, collaborative, and representational activity, and how AI-supported environments can make these learning dynamics visible without replacing the human and social practices through which sensemaking occurs.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.85, maxWidth: 540, color: th.text, opacity: 0.7 }}>
            My current work focuses on AI-mediated collaborative mathematics learning, especially in algebra. I design and study learning environments that support students in externalizing, sharing, revising, and reflecting on their mathematical reasoning through peer discourse, multimodal interaction, and productive struggle.
          </p>
        </div>
        <div style={{ width: 280, height: 360, overflow: 'hidden', flexShrink: 0, background: '#ddd' }}>
          <img src="uploads/RosalynShin2025.JPG" alt="Rosalyn Shin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </section>

      <Divider />

      <section className="section-pad">
        <SectionLabel text="Education" />
        <div style={{ display: 'flex', gap: 0 }}>
          {EDUCATION.map((e, i) => (
            <div key={i} style={{ flex: 1, paddingLeft: 24, borderLeft: `2px solid ${i === 0 ? th.accent : th.border}`, position: 'relative' }}>
              <div style={{ position: 'absolute', left: -5, top: 0, width: 8, height: 8, borderRadius: '50%', background: i === 0 ? th.accent : th.border }}></div>
              <p style={{ fontFamily: th.serif, fontSize: 24, fontWeight: 500, marginBottom: 4 }}>{e.degree}</p>
              <p style={{ fontSize: 15, marginBottom: 4 }}>{e.field}</p>
              <p style={{ fontSize: 14, color: th.muted }}>{e.school}{e.status ? ` · ${e.status}` : ''}</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      <section style={{ padding: '56px 80px', display: 'grid', gridTemplateColumns: '200px 1fr', gap: 56 }}>
        <SideHeading line1="Recent" line2="News" />
        <div>
          {recentNews.length === 0 && (
            <p style={{ fontSize: 14, color: th.muted }}>No Recent News selected yet — pick up to 5 in the notebook.</p>
          )}
          {recentNews.map((item, i) => (
            <RecentNewsRow key={item.id} item={item} isLast={i === recentNews.length - 1} />
          ))}
          <a href="news.html" style={{ display: 'inline-block', marginTop: 20, fontSize: 13, color: th.accent, fontWeight: 500 }}>View all news →</a>
        </div>
      </section>

      <Divider />

      <section style={{ padding: '56px 80px', display: 'grid', gridTemplateColumns: '200px 1fr', gap: 56 }}>
        <SideHeading line1="From" line2="the Blog" />
        <div>
          {blogPreview.map((bp, i) => (
            <div key={bp.id} style={{ padding: '18px 0', borderBottom: i < blogPreview.length - 1 ? `1px solid ${th.border}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <span className="tag-pill">{bp.tag}</span>
                <p style={{ fontFamily: th.serif, fontSize: 21, fontWeight: 500 }}>{bp.title}</p>
              </div>
              <span style={{ fontSize: 14, color: th.muted, flexShrink: 0 }}>{bp.dateLabel}</span>
            </div>
          ))}
          <a href="blog.html" style={{ display: 'inline-block', marginTop: 20, fontSize: 13, color: th.accent, fontWeight: 500 }}>Read more posts →</a>
        </div>
      </section>

      <section>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
          {CATS_DATA.map(cat => (
            <div key={cat.name} style={{ position: 'relative', height: 380, overflow: 'hidden', background: '#111' }}>
              <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 28, background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
                <p style={{ fontFamily: th.serif, fontSize: 30, fontWeight: 500, color: 'white' }}>{cat.name}</p>
                <p style={{ fontFamily: th.kr, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{cat.kr}</p>
              </div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', padding: '24px 0' }}>
          <a href="cats.html" style={{ fontSize: 13, color: th.accent, fontWeight: 500 }}>Meet Sirius & Eleanora →</a>
          <span style={{ margin: '0 12px', color: th.border }}>·</span>
          <a href="https://instagram.com/geumi_oaki" target="_blank" rel="noopener" style={{ fontSize: 13, color: th.accent, fontWeight: 500 }}>@geumi_oaki</a>
        </p>
      </section>
    </PageLayout>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<HomePage />);
