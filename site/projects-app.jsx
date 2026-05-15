/* ═══════ PROJECTS PAGE ═══════
   Three project types:
   - 'embedded'  → HTML hosted within this site (opens in iframe overlay)
   - 'external'  → link to external webpage
   - 'showcase'  → description + images/diagrams/figures
   ══════════════════════════════ */

const ALL_PROJECTS = [
  {
    title: 'Number Sandbox',
    tagline: 'Math dust all over you',
    type: 'embedded',
    embedPath: 'projects/rrs/index.html',
    desc: 'Explore how rectangles become recipes, and how recipes reveal different kinds of numbers',
    tags: ['Algebra', 'Sandbox', 'Euler'],
    status: 'Live',
    role: 'Lead Developer & Designer',
  },
  {
    title: 'EVE',
    tagline: 'Enactive Virtual Environment with Dynamic Human-AI Learning Partnerships',
    type: 'external',
    externalUrl: 'https://regal.umd.edu/evelyn',
    desc: 'An AI platform that helps students externalize mathematical reasoning through collaborative problem-solving. MathReason prompts students to articulate their thinking step-by-step, while giving teachers a real-time view into how students approach problems.',
    tags: ['AI', 'Collaboration', 'K-12', 'Game-based Learning'],
    status: 'Pilot',
    role: 'Lead Developer & Researcher',
  },
  // {
  //   title: 'TeacherScope',
  //   tagline: 'Orchestrating classroom learning in real-time',
  //   type: 'external',
  //   externalUrl: '#',
  //   desc: 'A dashboard that visualizes student thinking patterns during collaborative math activities. Teachers can identify struggling students, surface productive confusion, and decide when to intervene — all without interrupting student flow.',
  //   tags: ['Dashboard', 'Learning Analytics', 'Teachers'],
  //   status: 'Active',
  //   role: 'Co-PI',
  // },
  // {
  //   title: 'EquiMath',
  //   tagline: 'Adaptive math for every learner',
  //   type: 'showcase',
  //   desc: 'An adaptive mathematics curriculum designed specifically for neurodivergent learners. EquiMath uses multi-modal representations — visual, spatial, narrative — to meet students where they are and support different cognitive approaches to mathematical concepts.',
  //   images: [],
  //   tags: ['Adaptive Learning', 'Neurodivergent', 'Curriculum'],
  //   status: 'In Development',
  //   role: 'Lead Designer',
  // },
  // {
  //   title: 'IntegriTeach',
  //   tagline: 'Navigating AI ethics in education',
  //   type: 'external',
  //   externalUrl: '#',
  //   desc: 'A set of curriculum modules and teacher guides for integrating academic integrity conversations into courses that use generative AI tools. Developed through participatory design with teachers and students.',
  //   tags: ['Academic Integrity', 'Generative AI', 'PD'],
  //   status: 'Pilot',
  //   role: 'Researcher',
  // },
];

/* ── Type icon ── */
function TypeBadge({ type }) {
  const th = THEME;
  const config = {
    embedded: { label: 'Interactive', icon: (
      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
        <polygon points="6,3 13,8 6,13" />
      </svg>
    )},
    external: { label: 'External', icon: (
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1v-3" />
        <path d="M9 1h6v6" /><path d="M15 1L7 9" />
      </svg>
    )},
    showcase: { label: 'Showcase', icon: (
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1" y="2" width="14" height="12" rx="1.5" />
        <circle cx="5.5" cy="6.5" r="1.5" /><path d="M1 11l4-3 3 2 3-4 4 5" />
      </svg>
    )},
  };
  const c = config[type];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em',
      padding: '3px 10px', borderRadius: 3,
      background: th.accentWash, color: th.accent,
    }}>
      {c.icon} {c.label}
    </span>
  );
}

/* ── Embed Overlay ── */
function EmbedOverlay({ project, onClose }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
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
          <span style={{ fontSize: 12, opacity: 0.5 }}>{project.tagline}</span>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a href={project.embedPath} target="_blank" rel="noopener" style={{
            fontSize: 12, color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 4,
          }}>
            Open in new tab
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1v-3" />
              <path d="M9 1h6v6" /><path d="M15 1L7 9" />
            </svg>
          </a>
          <button onClick={onClose} style={{ color: 'white', fontSize: 20, lineHeight: 1, padding: '4px 8px' }}>✕</button>
        </div>
      </div>
      <div style={{ flex: 1, background: 'white' }}>
        <iframe
          src={project.embedPath}
          style={{ width: '100%', height: '100%', border: 'none' }}
          title={project.title}
        ></iframe>
      </div>
    </div>
  );
}

/* ── Project Card ── */
function ProjectCard({ project, idx, onOpenEmbed }) {
  const th = THEME;
  const [expanded, setExpanded] = React.useState(false);
  const isFeature = idx === 0;

  const handleAction = (e) => {
    if (project.type === 'embedded') {
      e.stopPropagation();
      onOpenEmbed(project);
    } else if (project.type === 'external') {
      e.stopPropagation();
      window.open(project.externalUrl, '_blank');
    }
  };

  const actionLabel = {
    embedded: 'Launch →',
    external: 'Visit →',
    showcase: null,
  };

  return (
    <div
      className="card-lift"
      onClick={() => setExpanded(!expanded)}
      style={{
        border: `1px solid ${th.border}`,
        padding: 0, overflow: 'hidden', cursor: 'pointer',
        gridColumn: isFeature ? 'span 2' : 'span 1',
      }}
    >
      {/* Header band */}
      <div style={{
        height: isFeature ? 160 : 120,
        background: isFeature ? th.accent : th.placeholder,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '24px 32px',
      }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
          <span style={{
            fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em',
            padding: '2px 8px', borderRadius: 3,
            background: isFeature ? 'rgba(255,255,255,0.2)' : th.accentWash,
            color: isFeature ? 'white' : th.accent,
          }}>{project.status}</span>
          <TypeBadge type={project.type} />
        </div>
        <p style={{
          fontFamily: th.serif, fontSize: isFeature ? 32 : 24, fontWeight: 500,
          color: isFeature ? 'white' : th.text,
        }}>{project.title}</p>
      </div>

      {/* Body */}
      <div style={{ padding: '24px 32px' }}>
        <p style={{ fontSize: 15, fontStyle: 'italic', color: th.accent, marginBottom: 12 }}>{project.tagline}</p>
        <p style={{
          fontSize: 15, color: th.muted, lineHeight: 1.8,
          maxHeight: expanded ? 600 : 60, overflow: 'hidden',
          transition: 'max-height 0.4s ease',
        }}>{project.desc}</p>

        {expanded && (
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${th.border}` }}>
            <p style={{ fontSize: 14, color: th.muted, marginBottom: 12 }}>
              <span style={{ fontWeight: 600, color: th.text }}>Role:</span> {project.role}
            </p>

            {/* Images for showcase type */}
            {project.type === 'showcase' && project.images && project.images.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 12 }}>
                {project.images.map((img, i) => (
                  <div key={i} style={{ height: 140, background: th.placeholder, overflow: 'hidden' }}>
                    <img src={img.src} alt={img.alt || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}

            {/* Placeholder for showcase with no images yet */}
            {project.type === 'showcase' && (!project.images || project.images.length === 0) && (
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 12,
              }}>
                {[1, 2].map(i => (
                  <div key={i} style={{
                    height: 100, background: th.placeholder, border: `1px dashed ${th.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 10, color: th.muted }}>figure / diagram</span>
                  </div>
                ))}
              </div>
            )}

            {/* Action button for embedded/external */}
            {actionLabel[project.type] && (
              <button
                onClick={handleAction}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '8px 20px', marginTop: 4,
                  background: th.accent, color: 'white',
                  fontSize: 14, fontWeight: 500,
                  transition: 'opacity 0.2s',
                }}
              >
                {actionLabel[project.type]}
              </button>
            )}
          </div>
        )}

        <div style={{ display: 'flex', gap: 6, marginTop: 16, flexWrap: 'wrap' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{ fontSize: 11, padding: '2px 8px', background: th.accentWash, color: th.accent, borderRadius: 3 }}>{tag}</span>
          ))}
        </div>

        <p style={{ fontSize: 13, color: th.accent, marginTop: 16, fontWeight: 500 }}>
          {expanded ? 'Show less ↑' : 'Read more ↓'}
        </p>
      </div>
    </div>
  );
}

/* ── Filter Tabs ── */
function ProjectsPage() {
  const th = THEME;
  const [filterType, setFilterType] = React.useState('all');
  const [embedProject, setEmbedProject] = React.useState(null);

  const typeFilters = [
    { key: 'all', label: 'All' },
    { key: 'embedded', label: 'Interactive' },
    { key: 'external', label: 'External' },
    { key: 'showcase', label: 'Showcase' },
  ];

  const filtered = filterType === 'all'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter(p => p.type === filterType);

  return (
    <PageLayout active="Projects">
      <PageHero title="Projects" subtitle="Research & Design" />
      <Divider />

      <section className="section-pad">
        {/* Filter bar */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 36 }}>
          {typeFilters.map(f => (
            <button key={f.key} className={`tag-pill ${filterType === f.key ? 'active' : ''}`}
              onClick={() => setFilterType(f.key)}>{f.label}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28 }}>
          {filtered.map((p, i) => (
            <ProjectCard key={p.title} project={p} idx={i} onOpenEmbed={setEmbedProject} />
          ))}
        </div>
      </section>

      {embedProject && (
        <EmbedOverlay project={embedProject} onClose={() => setEmbedProject(null)} />
      )}
    </PageLayout>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ProjectsPage />);
