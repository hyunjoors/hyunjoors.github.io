/* ═══════ BLOG PAGE ═══════ */

function BlogPage() {
  const th = THEME;
  const blogPosts = getSiteContent().blogByDateDesc || [];
  const [activePost, setActivePost] = React.useState(null);
  const [filterTag, setFilterTag] = React.useState('all');
  const tags = [...new Set(blogPosts.map(post => post.tag))];
  const filtered = blogPosts.filter(post => filterTag === 'all' || post.tag === filterTag);

  if (activePost) {
    const post = blogPosts.find(item => item.id === activePost);
    if (!post) {
      return (
        <PageLayout active="Blog">
          <section className="section-pad">
            <p style={{ fontSize: 15, color: th.muted }}>This post no longer exists.</p>
          </section>
        </PageLayout>
      );
    }

    return (
      <PageLayout active="Blog">
        <section style={{ padding: '56px 80px', maxWidth: 780 }}>
          <button onClick={() => setActivePost(null)} style={{ fontSize: 13, color: th.accent, fontWeight: 500, marginBottom: 32, display: 'flex', alignItems: 'center', gap: 6 }}>
            ← Back to all posts
          </button>
          <span className="tag-pill" style={{ marginBottom: 16, display: 'inline-block' }}>{post.tag}</span>
          <h1 style={{ fontFamily: th.serif, fontSize: 48, fontWeight: 400, lineHeight: 1.15, marginBottom: 16 }}>{post.title}</h1>
          <div style={{ display: 'flex', gap: 16, fontSize: 13, color: th.muted, marginBottom: 48 }}>
            <span>{post.dateLabel}</span>
            <span>·</span>
            <span>{post.readTime} read</span>
          </div>
          <article className="blog-article" dangerouslySetInnerHTML={{ __html: post.bodyHtml }}></article>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout active="Blog">
      <PageHero title="Blog" subtitle="Thoughts & Reflections" />
      <Divider />

      <section className="section-pad">
        <div style={{ display: 'flex', gap: 8, marginBottom: 36 }}>
          <button className={`tag-pill ${filterTag === 'all' ? 'active' : ''}`} onClick={() => setFilterTag('all')}>All</button>
          {tags.map(tag => (
            <button key={tag} className={`tag-pill ${filterTag === tag ? 'active' : ''}`} onClick={() => setFilterTag(tag)}>
              {tag}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {filtered.map(post => (
            <div key={post.id} className="blog-card card-lift" onClick={() => setActivePost(post.id)} style={{ cursor: 'pointer', marginBottom: -1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 32 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                    <span className="tag-pill">{post.tag}</span>
                    <span style={{ fontSize: 12, color: th.muted }}>{post.readTime}</span>
                  </div>
                  <p style={{ fontFamily: th.serif, fontSize: 28, fontWeight: 500, lineHeight: 1.3, marginBottom: 10 }}>{post.title}</p>
                  <p style={{ fontSize: 15, color: th.muted, lineHeight: 1.75, maxWidth: 620 }}>{post.excerpt}</p>
                </div>
                <span style={{ fontSize: 14, color: th.muted, flexShrink: 0, paddingTop: 4 }}>{post.dateLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<BlogPage />);
