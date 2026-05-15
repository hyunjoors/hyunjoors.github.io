/* ═══════ RESEARCH PAGE ═══════
   Features: Academic timeline + Publication filter/search
   ══════════════════════════════ */

const PUBLICATIONS = [
  // { id: 1, year: 2026, title: 'Designing AI as Facilitator: A Framework for Collaborative Mathematics Learning', authors: 'Shin, R., Kim, J., & Park, S.', venue: 'AERA Annual Meeting 2026', type: 'conference', tags: ['AI', 'Mathematics', 'Collaboration'] },
  // { id: 2, year: 2026, title: 'Learning Analytics for Neurodivergent Student Support in K-12 Mathematics', authors: 'Shin, R. & Lee, H.', venue: 'LAK 2026', type: 'conference', tags: ['Learning Analytics', 'Neurodivergent', 'K-12'] },
  // { id: 3, year: 2025, title: 'AI and Equity in STEM Education: Workshop Proceedings', authors: 'Shin, R., Garcia, M., & Chen, W.', venue: 'ICLS 2025 Workshop', type: 'workshop', tags: ['AI', 'Equity', 'STEM'] },
  // { id: 4, year: 2025, title: 'Making Mathematical Reasoning Visible Through AI-Supported Representations', authors: 'Shin, R.', venue: 'Journal of Educational Technology & Society', type: 'journal', tags: ['AI', 'Mathematics', 'Representation'] },
  // { id: 5, year: 2024, title: 'Academic Integrity in the Age of Generative AI: A Systematic Review', authors: 'Shin, R. & Davis, K.', venue: 'Computers & Education', type: 'journal', tags: ['Academic Integrity', 'Generative AI'] },
  // { id: 6, year: 2024, title: 'Adaptive Learning Environments for Students with Dyscalculia', authors: 'Shin, R., Park, S., & Kim, J.', venue: 'CHI 2024 Late-Breaking Work', type: 'conference', tags: ['Adaptive Learning', 'Dyscalculia', 'HCI'] },
  // { id: 7, year: 2023, title: 'Teacher Orchestration Tools for AI-Augmented Classrooms', authors: 'Shin, R. & Martinez, L.', venue: 'CSCL 2023', type: 'conference', tags: ['Orchestration', 'AI', 'Classroom'] },
];

const DEMOS = [
  { title: 'Number Sandbox', desc: 'Explore how rectangles become recipes, and how recipes reveal different kinds of numbers', venue: 'S26 788Y', link: 'projects/rrs/index.html' },
  { title: 'EVE', desc: 'An AI platform that helps students externalize mathematical reasoning through collaborative problem-solving. MathReason prompts students to articulate their thinking step-by-step, while giving teachers a real-time view into how students approach problems.', venue: 'REGAL', link: 'https://regal.umd.edu/evelyn' },
  // { title: 'EquiMath Multi-Modal Interface', desc: 'Prototype demo of adaptive math representations for neurodivergent learners — visual, spatial, and narrative modes.', venue: 'CHI 2024', link: '#' },
];

const POSTERS = [
  { title: 'AI-Facilitated Collaborative Learning in K-12 Math Classrooms', venue: 'LAK 2026', year: 2026, thumbnail: 'uploads/LAK26_Poster.png' },
  // { title: 'Designing for Neurodivergent Learners: A Multi-Modal Approach', venue: 'ICLS 2025', year: 2025, thumbnail: null },
  // { title: 'Visualizing Student Reasoning Patterns with Learning Analytics', venue: 'LAK 2025', year: 2025, thumbnail: null },
  // { title: 'Generative AI and Academic Integrity: Student Perspectives', venue: 'CSCL 2024', year: 2024, thumbnail: null },
];

const RESEARCH_AREAS = [
  { title: 'AI-Supported Embodied and Collaborative Mathematics Sensemaking', icon: '→', desc: 'Designing AI-supported learning environments that foster students’ mathematical reasoning through embodied interaction, peer collaboration, and multimodal learning experiences.' },
  { title: 'Teacher Orchestration and Learning Analytics', icon: '→', desc: 'Investigating how learning analytics and AI can support teachers in noticing, interpreting, and responding to students’ thinking in real time.' },
  { title: 'Neurodivergent Learners in STEM Education', icon: '→', desc: 'Exploring inclusive learning technologies and adaptive supports for neurodivergent learners, including students with ADHD, autism, and dyscalculia, in STEM learning contexts.' },
];

// /* ── Timeline Item ── */
// function TimelineItem({ item, isLast }) {
//   const th = THEME;
//   const [hovered, setHovered] = React.useState(false);

//   return (
//     <div
//       style={{ position: 'relative', paddingLeft: 44, paddingBottom: isLast ? 0 : 48 }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {!isLast && <div className="timeline-line"></div>}
//       <div className="timeline-dot" style={item.current ? { background: th.accent } : {}}></div>
//       <div style={{
//         padding: '20px 28px',
//         background: hovered ? th.accentWash : 'transparent',
//         border: `1px solid ${hovered ? th.accent + '30' : 'transparent'}`,
//         transition: 'all 0.3s ease',
//         marginLeft: 8,
//       }}>
//         <div style={{ display: 'flex', gap: 16, alignItems: 'baseline', marginBottom: 6 }}>
//           <span style={{ fontSize: 14, fontWeight: 600, color: th.accent, fontVariantNumeric: 'tabular-nums' }}>{item.year}</span>
//           {item.current && <span className="tag-pill active" style={{ fontSize: 10 }}>Current</span>}
//         </div>
//         <p style={{ fontFamily: th.serif, fontSize: 26, fontWeight: 500, marginBottom: 4 }}>{item.role}</p>
//         <p style={{ fontSize: 16, marginBottom: 2 }}>{item.org}</p>
//         {item.dept && <p style={{ fontSize: 14, color: th.muted }}>{item.dept}</p>}
//         <p style={{ fontSize: 15, color: th.muted, lineHeight: 1.7, marginTop: 8 }}>{item.desc}</p>
//       </div>
//     </div>
//   );
// }

/* ── Publication Item ── */
function PubItem({ pub }) {
  const th = THEME;
  const typeColors = { journal: '#4A6FA5', conference: '#6B8FBF', workshop: '#8A7F76' };

  return (
    <div className="card-lift" style={{
      padding: '24px 28px',
      border: `1px solid ${th.border}`,
      marginBottom: 12,
    }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: th.accent, fontVariantNumeric: 'tabular-nums' }}>{pub.year}</span>
        <span style={{
          fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em',
          padding: '2px 8px', borderRadius: 3,
          background: typeColors[pub.type] + '18', color: typeColors[pub.type],
        }}>{pub.type}</span>
      </div>
      <p style={{ fontFamily: th.serif, fontSize: 22, fontWeight: 500, lineHeight: 1.35, marginBottom: 6 }}>{pub.title}</p>
      <p style={{ fontSize: 14, color: th.muted, marginBottom: 4 }}>{pub.authors}</p>
      <p style={{ fontSize: 14, color: th.accent, fontStyle: 'italic' }}>{pub.venue}</p>
      <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
        {pub.tags.map(tag => (
          <span key={tag} style={{ fontSize: 11, padding: '2px 8px', background: th.accentWash, color: th.accent, borderRadius: 3 }}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Main Research Page ── */
function ResearchPage() {
  const th = THEME;
  const [query, setQuery] = React.useState('');
  const [filterType, setFilterType] = React.useState('all');
  const [filterYear, setFilterYear] = React.useState('all');

  const filtered = PUBLICATIONS.filter(p => {
    const matchQuery = !query || p.title.toLowerCase().includes(query.toLowerCase())
      || p.authors.toLowerCase().includes(query.toLowerCase())
      || p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()));
    const matchType = filterType === 'all' || p.type === filterType;
    const matchYear = filterYear === 'all' || p.year === parseInt(filterYear);
    return matchQuery && matchType && matchYear;
  });

  const years = [...new Set(PUBLICATIONS.map(p => p.year))].sort((a, b) => b - a);
  const types = [...new Set(PUBLICATIONS.map(p => p.type))];

  return (
    <PageLayout active="Research">
      <PageHero title="Research" subtitle="Academic Career & Publications" />
      <Divider />

      {/* ── RESEARCH AREAS ── */}
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

      {/* ── ACADEMIC TIMELINE ──
      <section className="section-pad">
        <SectionLabel text="Academic Timeline" />
        <div style={{ maxWidth: 700, position: 'relative' }}>
          {TIMELINE.map((item, i) => (
            <TimelineItem key={i} item={item} isLast={i === TIMELINE.length - 1} />
          ))}
        </div>
      </section> */}

      <Divider />

      {/* ── DEMOS ── */}
      <section className="section-pad">
        <SectionLabel text="Demos" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {DEMOS.map((demo, i) => (
            <div key={i} className="card-lift" style={{ border: `1px solid ${th.border}`, overflow: 'hidden' }}>
              <div style={{ height: 120, background: th.accentWash, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.5 }}>
                  <polygon points="8,5 19,12 8,19" fill={th.accent} />
                </svg>
                <span style={{ position: 'absolute', bottom: 8, right: 12, fontSize: 11, fontWeight: 600, color: th.accent, background: 'white', padding: '2px 8px', borderRadius: 3 }}>{demo.venue}</span>
              </div>
              <div style={{ padding: '20px 24px' }}>
                <p style={{ fontFamily: th.serif, fontSize: 20, fontWeight: 500, marginBottom: 8, lineHeight: 1.3 }}>{demo.title}</p>
                <p style={{ fontSize: 13, color: th.muted, lineHeight: 1.7 }}>{demo.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── POSTERS ── */}
      <section className="section-pad">
        <SectionLabel text="Posters" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {POSTERS.map((poster, i) => (
            <div key={i} className="card-lift" style={{ border: `1px solid ${th.border}`, overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ height: 180, background: th.placeholder, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <svg width="32" height="40" viewBox="0 0 32 40" fill="none">
                  <rect x="1" y="1" width="30" height="38" rx="2" stroke={th.border} strokeWidth="2" fill="none" />
                  <line x1="6" y1="10" x2="26" y2="10" stroke={th.border} strokeWidth="1.5" />
                  <line x1="6" y1="16" x2="20" y2="16" stroke={th.border} strokeWidth="1.5" />
                  <rect x="6" y="22" width="20" height="10" rx="1" fill={th.accentWash} />
                </svg>
                <span style={{ fontFamily: 'monospace', fontSize: 10, color: th.muted }}>poster preview</span>
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

      {/* ── PUBLICATIONS ── */}
      <section className="section-pad">
        <SectionLabel text="Publications" />

        {/* Search + Filters */}
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
            {/* Type filters */}
            <button className={`tag-pill ${filterType === 'all' ? 'active' : ''}`} onClick={() => setFilterType('all')}>All types</button>
            {types.map(t => (
              <button key={t} className={`tag-pill ${filterType === t ? 'active' : ''}`} onClick={() => setFilterType(t)}
                style={{ textTransform: 'capitalize' }}>{t}</button>
            ))}
            <span style={{ width: 1, height: 24, background: th.border, margin: '0 8px' }}></span>
            {/* Year filters */}
            <button className={`tag-pill ${filterYear === 'all' ? 'active' : ''}`} onClick={() => setFilterYear('all')}>All years</button>
            {years.map(y => (
              <button key={y} className={`tag-pill ${filterYear === String(y) ? 'active' : ''}`} onClick={() => setFilterYear(String(y))}>{y}</button>
            ))}
          </div>
        </div>

        {/* Results */}
        <p style={{ fontSize: 13, color: th.muted, marginBottom: 16 }}>{filtered.length} publication{filtered.length !== 1 ? 's' : ''}</p>
        {filtered.map(pub => <PubItem key={pub.id} pub={pub} />)}
        {filtered.length === 0 && (
          <p style={{ fontSize: 15, color: th.muted, padding: '40px 0', textAlign: 'center' }}>No publications match your search.</p>
        )}
      </section>
    </PageLayout>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ResearchPage />);
