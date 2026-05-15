/* ═══════ HOMEPAGE ═══════ */

const CATS_DATA = [
  { name: 'Sirius', kr: '현금', img: 'uploads/LAB06305%20sh%20%E1%84%8C%E1%85%B3%E1%86%BC%E1%84%86%E1%85%A7%E1%86%BC.jpg' },
  { name: 'Eleanora', kr: '현옥', img: 'uploads/LAB06477%20sh%20%E1%84%87%E1%85%A1%E1%86%AB%E1%84%8D%E1%85%A9%E1%86%A8.jpg' },
];

const EDUCATION = [
  { degree: 'Ph.D.', field: 'Teaching & Learning, Policy & Leadership', school: 'University of Maryland', status: 'In progress' },
  { degree: 'M.Eng.', field: 'Computer Science', school: 'Johns Hopkins University', status: '' },
  { degree: 'B.S.', field: 'Computer Science', school: 'Purdue University', status: '' },
];

const NEWS_PREVIEW = [
  { date: 'April 2026', title: 'Presenting at LAK 26 Annual Meeting', desc: 'Poster on Capabilities and Limitations of LLM as a Human Collaborator in Computational Thinking Behavior Analysis and Labeling' },
  // { date: 'Apr 2026', title: 'Paper accepted at LAK 2026', desc: 'Learning analytics for neurodivergent student support' },
  // { date: 'Jan 2026', title: 'ICLS Workshop Proceedings Published', desc: 'Co-facilitated workshop on AI and equity in STEM' },
];

const RESEARCH_INTEREST = [
  { title: 'AI-assisted Learning Technology', desc: 'Capabilities and Limitations of LLM as a Human Collaborator in Computational Thinking Behavior Analysis and Labeling' },
  { title: 'Adaptive Learning for Neurodivergent Students', desc: 'Mathematics teaching and learning for students with autism, ADHD, and dyscalculia' },
  { title: 'Academic Integrity in the AI Era', desc: 'Copyright awareness and integrity practices with generative AI in education' },
];

const PROJECTS_PREVIEW = [
  { title: 'EVE', desc: 'Enactive Virtual Environment with Dynamic Human-AI Learning Partnerships' },
  // { title: 'TeacherScope', desc: 'Real-time dashboard for orchestrating classroom learning by visualizing student thinking' },
  // { title: 'EquiMath', desc: 'Adaptive math curriculum for neurodivergent learners with multi-modal representations' },
];

const BLOG_PREVIEW = [
  { title: 'Rethinking AI as a Learning Facilitator', date: 'Apr 2026', tag: 'Research' },
  { title: 'On Being a Cat Parent During a PhD', date: 'Mar 2026', tag: 'Personal' },
  { title: 'Notes from AERA 2025', date: 'Jan 2026', tag: 'Conference' },
];

function HomePage() {
  const th = THEME;

  return (
    <PageLayout active="About">
      {/* ── HERO ── */}
      <section style={{ padding: '96px 80px 72px', display: 'flex', gap: 80 }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: th.muted, marginBottom: 28, fontWeight: 500 }}>
            PhD Student · University of Maryland
          </p>
          <h1 style={{ fontFamily: th.serif, fontSize: 76, fontWeight: 400, lineHeight: 1.02, marginBottom: 40 }}>
            Rosalyn<br />Shin
          </h1>
          <div style={{ width: 48, height: 2, background: th.accent, marginBottom: 28 }}></div>
          <p style={{ fontSize: 17, lineHeight: 1.85, maxWidth: 540, color: th.text, opacity: 0.7 }}>
            I am a PhD student in Technology, Learning, and Leadership at the University of Maryland, College Park, advised by <a href="https://education.umd.edu/research-and-impact/labs/regal/people" style={{ color: th.accent, textDecoration: 'underline' }}>Dr. Fengfeng Ke</a> in the <a href="https://education.umd.edu/research-and-impact/labs/regal" style={{ color: th.accent, textDecoration: 'underline' }}>REGAL Lab</a>. My research explores how AI can support mathematical sensemaking without replacing the human and social dimensions of learning. I design AI-supported learning environments that foster students’ reasoning, collaboration, and teacher responsiveness in mathematics classrooms.
            
            My current work focuses on embodied and collaborative learning experiences in algebra, integrating conversational AI, multimodal interaction, and teacher-facing learning analytics to support both student learning and instructional orchestration.
          </p>
        </div>
        <div style={{ width: 280, height: 360, overflow: 'hidden', flexShrink: 0, background: '#ddd' }}>
          <img src="uploads/RosalynShin2025.JPG" alt="Rosalyn Shin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </section>

      <Divider />

      {/* ── EDUCATION ── */}
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

      {/* ── NEWS (editorial 2-col from C) ── */}
      <section style={{ padding: '56px 80px', display: 'grid', gridTemplateColumns: '200px 1fr', gap: 56 }}>
        <SideHeading line1="Recent" line2="News" />
        <div>
          {NEWS_PREVIEW.map((item, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 28, padding: '20px 0', borderBottom: i < NEWS_PREVIEW.length - 1 ? `1px solid ${th.border}` : 'none' }}>
              <span className="tag-pill" style={{ alignSelf: 'start', justifySelf: 'start', fontSize: 12 }}>{item.date}</span>
              <div>
                <p style={{ fontFamily: th.serif, fontSize: 23, fontWeight: 500, marginBottom: 4 }}>{item.title}</p>
                <p style={{ fontSize: 14, color: th.muted, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </div>
          ))}
          <a href="news.html" style={{ display: 'inline-block', marginTop: 20, fontSize: 13, color: th.accent, fontWeight: 500 }}>View all news →</a>
        </div>
      </section>

      <Divider />

      {/* ── RESEARCH ── */}
      <section className="section-pad">
        <SectionLabel text="Research Interests" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {RESEARCH_INTEREST.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 24 }}>
              <div style={{ width: 3, minHeight: 40, background: th.accent, flexShrink: 0, marginTop: 6 }}></div>
              <div>
                <p style={{ fontFamily: th.serif, fontSize: 23, fontWeight: 500, marginBottom: 6 }}>{r.title}</p>
                <p style={{ fontSize: 15, color: th.muted, lineHeight: 1.75, maxWidth: 640 }}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <a href="research.html" style={{ display: 'inline-block', marginTop: 28, fontSize: 13, color: th.accent, fontWeight: 500 }}>Explore research & publications →</a>
      </section>

      <Divider />

      {/* ── PROJECTS ── */}
      <section className="section-pad">
        <SectionLabel text="Selected Projects" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
          {PROJECTS_PREVIEW.map((p, i) => (
            <div key={i} className="card-lift" style={{ border: `1px solid ${th.border}`, padding: 32 }}>
              <div style={{ width: '100%', height: 100, background: th.placeholder, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'monospace', fontSize: 10, color: th.muted }}>project visual</span>
              </div>
              <p style={{ fontFamily: th.serif, fontSize: 24, fontWeight: 500, marginBottom: 8 }}>{p.title}</p>
              <p style={{ fontSize: 14, color: th.muted, lineHeight: 1.75 }}>{p.desc}</p>
            </div>
          ))}
        </div>
        <a href="projects.html" style={{ display: 'inline-block', marginTop: 28, fontSize: 13, color: th.accent, fontWeight: 500 }}>View all projects →</a>
      </section>

      <Divider />

      {/* ── BLOG (editorial 2-col from C) ── */}
      <section style={{ padding: '56px 80px', display: 'grid', gridTemplateColumns: '200px 1fr', gap: 56 }}>
        <SideHeading line1="From" line2="the Blog" />
        <div>
          {BLOG_PREVIEW.map((bp, i) => (
            <div key={i} style={{ padding: '18px 0', borderBottom: i < BLOG_PREVIEW.length - 1 ? `1px solid ${th.border}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <span className="tag-pill">{bp.tag}</span>
                <p style={{ fontFamily: th.serif, fontSize: 21, fontWeight: 500 }}>{bp.title}</p>
              </div>
              <span style={{ fontSize: 14, color: th.muted, flexShrink: 0 }}>{bp.date}</span>
            </div>
          ))}
          <a href="blog.html" style={{ display: 'inline-block', marginTop: 20, fontSize: 13, color: th.accent, fontWeight: 500 }}>Read more posts →</a>
        </div>
      </section>

      {/* ── CATS (full-bleed from C) ── */}
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
