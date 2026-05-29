/* ═══════ PROJECTS PAGE ═══════ */

function TypeBadge({ mode }) {
  const th = THEME;
  const config = {
    embedded: { label: 'Interactive' },
    external: { label: 'External' },
    showcase: { label: 'Showcase' },
  };
  const c = config[mode] || { label: 'Project' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em',
      padding: '3px 10px', borderRadius: 3,
      background: th.accentWash, color: th.accent,
    }}>
      {c.label}
    </span>
  );
}

function EmbedOverlay({ project, onClose }) {
  React.useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex', flexDirection: 'column',
      animation: 'fadeUp 0.3s ease both',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 24px', background: '#1a1a2e', color: 'white',
      }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontFamily: THEME.serif, fontSize: 18, fontWeight: 500 }}>{project.title}</span>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a href={project.action.url} target="_blank" rel="noopener" style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
            Open in new tab
          </a>
          <button onClick={onClose} style={{ color: 'white', fontSize: 20, lineHeight: 1, padding: '4px 8px' }}>✕</button>
        </div>
      </div>
      <div style={{ flex: 1, background: 'white' }}>
        <iframe src={project.action.url} style={{ width: '100%', height: '100%', border: 'none' }} title={project.title}></iframe>
      </div>
    </div>
  );
}

function ProjectCard({ project, onOpenEmbed }) {
  const th = THEME;

  return (
    <div className="card-lift" style={{ border: `1px solid ${th.border}`, overflow: 'hidden' }}>
      <div style={{
        height: 120, background: th.placeholder, display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '20px 24px',
      }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
          <span style={{
            fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em',
            padding: '2px 8px', borderRadius: 3, background: th.accentWash, color: th.accent,
          }}>{project.status || 'Active'}</span>
          <TypeBadge mode={project.mode} />
        </div>
        <p style={{ fontFamily: th.serif, fontSize: 26, fontWeight: 500 }}>{project.title}</p>
      </div>

      <div style={{ padding: '22px 24px' }}>
        {project.tagline && (
          <p style={{ fontSize: 14, fontStyle: 'italic', color: th.accent, marginBottom: 10 }}>{project.tagline}</p>
        )}
        <p style={{ fontSize: 15, color: th.muted, lineHeight: 1.8, marginBottom: 14 }}>{project.summary}</p>

        <p style={{ fontSize: 14, color: th.muted, marginBottom: 14 }}>
          <span style={{ fontWeight: 600, color: th.text }}>Role:</span> {project.role}
        </p>

        <button
          onClick={() => runEntryAction(project, onOpenEmbed)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '8px 20px',
            background: th.accent, color: 'white',
            fontSize: 14, fontWeight: 500,
          }}
        >
          {project.action?.label || 'Open'} →
        </button>

        <div style={{ display: 'flex', gap: 6, marginTop: 16, flexWrap: 'wrap' }}>
          {(project.tags || []).map(tag => (
            <span key={tag} style={{ fontSize: 11, padding: '2px 8px', background: th.accentWash, color: th.accent, borderRadius: 3 }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsPage() {
  const content = getSiteContent();
  const [filterMode, setFilterMode] = React.useState('all');
  const [embedProject, setEmbedProject] = React.useState(null);
  const projects = content.projectsByDateDesc || [];

  const modeFilters = [
    { key: 'all', label: 'All' },
    { key: 'embedded', label: 'Interactive' },
    { key: 'external', label: 'External' },
    { key: 'showcase', label: 'Showcase' },
  ];

  const filtered = filterMode === 'all'
    ? projects
    : projects.filter(p => p.mode === filterMode);

  return (
    <PageLayout active="Projects">
      <PageHero title="Projects" subtitle="Research & Design" />
      <Divider />

      <section className="section-pad">
        <div style={{ display: 'flex', gap: 8, marginBottom: 36 }}>
          {modeFilters.map(f => (
            <button key={f.key} className={`tag-pill ${filterMode === f.key ? 'active' : ''}`} onClick={() => setFilterMode(f.key)}>
              {f.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28 }}>
          {filtered.map(project => (
            <ProjectCard key={project.id} project={project} onOpenEmbed={setEmbedProject} />
          ))}
        </div>
      </section>

      {embedProject && <EmbedOverlay project={embedProject} onClose={() => setEmbedProject(null)} />}
    </PageLayout>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ProjectsPage />);
