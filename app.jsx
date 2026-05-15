const { DesignCanvas, DCSection, DCArtboard } = window;

/* ═══════ SHARED DATA ═══════ */
const NEWS = [
  { date: 'May 2026', title: 'Presenting at AERA Annual Meeting', desc: 'Paper on AI-facilitated collaborative mathematics learning' },
  { date: 'Apr 2026', title: 'Paper accepted at LAK 2026', desc: 'Learning analytics for neurodivergent student support' },
  { date: 'Jan 2026', title: 'ICLS Workshop Proceedings Published', desc: 'Co-facilitated workshop on AI and equity in STEM' },
];

const RESEARCH = [
  { title: 'AI-assisted Learning Technology', desc: 'Designing AI tools for CS and Mathematics education that support rather than replace learning interactions' },
  { title: 'Adaptive Learning for Neurodivergent Students', desc: 'Mathematics teaching and learning for students with autism, ADHD, and dyscalculia' },
  { title: 'Academic Integrity in the AI Era', desc: 'Copyright awareness and integrity practices with generative AI in education' },
];

const PROJECTS = [
  { title: 'MathReason', desc: 'AI platform helping students externalize mathematical reasoning through collaborative problem-solving' },
  { title: 'TeacherScope', desc: 'Real-time dashboard for orchestrating classroom learning by visualizing student thinking' },
  { title: 'EquiMath', desc: 'Adaptive math curriculum for neurodivergent learners with multi-modal representations' },
];

const EDUCATION = [
  { degree: 'Ph.D.', field: 'Teaching & Learning, Policy & Leadership', school: 'University of Maryland', status: 'In progress' },
  { degree: 'M.Eng.', field: 'Computer Science', school: 'Johns Hopkins University', status: '' },
  { degree: 'B.S.', field: 'Computer Science', school: 'Purdue University', status: '' },
];

const CATS = [
  { name: 'Sirius', kr: '현금', img: 'uploads/LAB06305%20sh%20%E1%84%8C%E1%85%B3%E1%86%BC%E1%84%86%E1%85%A7%E1%86%BC.jpg' },
  { name: 'Eleanora', kr: '현옥', img: 'uploads/LAB06477%20sh%20%E1%84%87%E1%85%A1%E1%86%AB%E1%84%8D%E1%85%A9%E1%86%A8.jpg' },
];

const BLOG_POSTS = [
  { title: 'Rethinking AI as a Learning Facilitator', date: 'Apr 2026', tag: 'Research' },
  { title: 'On Being a Cat Parent During a PhD', date: 'Mar 2026', tag: 'Personal' },
  { title: 'Notes from AERA 2025', date: 'Jan 2026', tag: 'Conference' },
];

/* ═══════ VARIATION A: 고요 (Still Water) ═══════
   Pure Japandi. Maximum whitespace. Serif + sans pairing.
   Muted dusty blue as the sole accent. Thin lines, gentle hierarchy.
   ══════════════════════════════════════════════════ */
function StillWater() {
  const c = { bg: '#F5F0EB', text: '#2D2A26', muted: '#8A7F76', accent: '#4A6FA5', border: '#D4CBC0', light: '#E8E4DF' };
  const serif = "'Cormorant Garamond', serif";
  const sans = "'DM Sans', sans-serif";
  const kr = "'Noto Sans KR', sans-serif";
  const divider = <div style={{ margin: '0 80px', height: 1, background: c.border }}></div>;
  const label = (t) => <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.muted, marginBottom: 40, fontFamily: sans }}>{t}</p>;

  return (
    <div style={{ width: 1440, background: c.bg, color: c.text, fontFamily: sans }}>
      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '28px 80px', borderBottom: `1px solid ${c.border}` }}>
        <span style={{ fontFamily: serif, fontSize: 20, fontWeight: 500 }}>Rosalyn Shin</span>
        <div style={{ display: 'flex', gap: 36, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: c.muted }}>
          {['About', 'Research', 'Projects', 'News', 'Blog', 'Cats'].map(l => <span key={l}>{l}</span>)}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: '96px 80px 72px', display: 'flex', gap: 80 }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.muted, marginBottom: 28 }}>PhD Student · University of Maryland</p>
          <h1 style={{ fontFamily: serif, fontSize: 76, fontWeight: 400, lineHeight: 1.02, marginBottom: 40 }}>Rosalyn<br />Shin</h1>
          <div style={{ width: 48, height: 2, background: c.accent, marginBottom: 28 }}></div>
          <p style={{ fontSize: 16, lineHeight: 1.85, maxWidth: 520, color: '#4A4540' }}>
            I study how AI can be designed not to replace human learning interactions, but to restore and amplify students' reasoning, collaboration, and teacher responsiveness in mathematics classrooms.
          </p>
        </div>
        <div style={{ width: 280, height: 360, background: c.light, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: 'monospace', fontSize: 11, color: c.muted, textAlign: 'center', lineHeight: 2 }}>portrait<br />photo</span>
        </div>
      </section>

      {divider}

      {/* EDUCATION TIMELINE */}
      <section style={{ padding: '56px 80px' }}>
        {label('Education')}
        <div style={{ display: 'flex', gap: 0 }}>
          {EDUCATION.map((e, i) => (
            <div key={i} style={{ flex: 1, paddingLeft: 24, borderLeft: `2px solid ${i === 0 ? c.accent : c.border}`, position: 'relative' }}>
              <div style={{ position: 'absolute', left: -5, top: 0, width: 8, height: 8, borderRadius: '50%', background: i === 0 ? c.accent : c.border }}></div>
              <p style={{ fontFamily: serif, fontSize: 22, fontWeight: 500, marginBottom: 4 }}>{e.degree}</p>
              <p style={{ fontSize: 14, color: c.text, marginBottom: 4 }}>{e.field}</p>
              <p style={{ fontSize: 13, color: c.muted }}>{e.school}{e.status ? ` · ${e.status}` : ''}</p>
            </div>
          ))}
        </div>
      </section>

      {divider}

      {/* NEWS */}
      <section style={{ padding: '56px 80px' }}>
        {label('Recent News')}
        {NEWS.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 48, padding: '20px 0', borderBottom: i < NEWS.length - 1 ? `1px solid ${c.border}` : 'none' }}>
            <span style={{ fontSize: 13, color: c.muted, minWidth: 100, fontVariantNumeric: 'tabular-nums' }}>{item.date}</span>
            <div>
              <p style={{ fontFamily: serif, fontSize: 21, fontWeight: 500, marginBottom: 4 }}>{item.title}</p>
              <p style={{ fontSize: 13, color: c.muted, lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {divider}

      {/* RESEARCH */}
      <section style={{ padding: '56px 80px' }}>
        {label('Research Interests')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {RESEARCH.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 24 }}>
              <div style={{ width: 3, minHeight: 40, background: c.accent, flexShrink: 0, marginTop: 6 }}></div>
              <div>
                <p style={{ fontFamily: serif, fontSize: 21, fontWeight: 500, marginBottom: 6 }}>{r.title}</p>
                <p style={{ fontSize: 14, color: c.muted, lineHeight: 1.7, maxWidth: 600 }}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {divider}

      {/* PROJECTS */}
      <section style={{ padding: '56px 80px' }}>
        {label('Selected Projects')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
          {PROJECTS.map((p, i) => (
            <div key={i} style={{ border: `1px solid ${c.border}`, padding: 32 }}>
              <div style={{ width: '100%', height: 100, background: c.light, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'monospace', fontSize: 10, color: c.muted }}>project visual</span>
              </div>
              <p style={{ fontFamily: serif, fontSize: 22, fontWeight: 500, marginBottom: 8 }}>{p.title}</p>
              <p style={{ fontSize: 13, color: c.muted, lineHeight: 1.7 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {divider}

      {/* BLOG */}
      <section style={{ padding: '56px 80px' }}>
        {label('From the Blog')}
        <div style={{ display: 'flex', gap: 28 }}>
          {BLOG_POSTS.map((bp, i) => (
            <div key={i} style={{ flex: 1 }}>
              <p style={{ fontSize: 12, color: c.accent, letterSpacing: '0.05em', marginBottom: 8 }}>{bp.tag}</p>
              <p style={{ fontFamily: serif, fontSize: 20, fontWeight: 500, marginBottom: 6, lineHeight: 1.35 }}>{bp.title}</p>
              <p style={{ fontSize: 12, color: c.muted }}>{bp.date}</p>
            </div>
          ))}
        </div>
      </section>

      {divider}

      {/* CATS */}
      <section style={{ padding: '56px 80px' }}>
        {label('At Home')}
        <div style={{ display: 'flex', gap: 48, justifyContent: 'center' }}>
          {CATS.map(cat => (
            <div key={cat.name} style={{ textAlign: 'center' }}>
              <div style={{ width: 260, height: 320, overflow: 'hidden', marginBottom: 16, background: '#1a1a1a' }}>
                <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <p style={{ fontFamily: serif, fontSize: 22, fontWeight: 500 }}>{cat.name}</p>
              <p style={{ fontFamily: kr, fontSize: 13, color: c.muted }}>{cat.kr}</p>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: 28 }}>
          <a href="https://instagram.com/geumi_oaki" target="_blank" style={{ fontSize: 13, color: c.accent }}>@geumi_oaki on Instagram →</a>
        </p>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '40px 80px', borderTop: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, color: c.muted }}>© 2026 Rosalyn Shin</span>
        <div style={{ display: 'flex', gap: 28, fontSize: 12, color: c.muted }}>
          {['GitHub', 'Google Scholar', 'Email'].map(l => <span key={l}>{l}</span>)}
        </div>
      </footer>
    </div>
  );
}


/* ═══════ VARIATION B: 구름 (Cloud) ═══════
   Soft, rounded, approachable. Card-based with gentle elevation.
   Bright blue, pill tags, circular avatars. Friendly energy.
   ══════════════════════════════════════════════════ */
function CloudVariation() {
  const c = { bg: '#FEFCFA', text: '#1E293B', muted: '#64748B', blue: '#3B82F6', lightBlue: '#DBEAFE', midBlue: '#93C5FD', shadow: '0 2px 16px rgba(30,41,59,0.06)' };
  const r = 16;
  const head = "'Nunito', sans-serif";
  const body = "'DM Sans', sans-serif";
  const kr = "'Noto Sans KR', sans-serif";
  const pill = (text, active) => (
    <span style={{ padding: '5px 14px', borderRadius: 50, fontSize: 12, fontWeight: 600, background: active ? c.blue : c.lightBlue, color: active ? 'white' : c.blue }}>{text}</span>
  );

  return (
    <div style={{ width: 1440, background: c.bg, color: c.text, fontFamily: body }}>
      {/* NAV */}
      <nav style={{ padding: '20px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: head, fontWeight: 800, fontSize: 22, color: c.blue }}>R.</span>
        <div style={{ display: 'flex', gap: 6, background: '#F1F5F9', borderRadius: 50, padding: 4 }}>
          {['About', 'Research', 'Projects', 'News', 'Blog', 'Cats'].map((l, i) => (
            <span key={l} style={{ padding: '8px 18px', borderRadius: 50, fontSize: 13, fontWeight: 600, background: i === 0 ? c.blue : 'transparent', color: i === 0 ? 'white' : c.muted }}>{l}</span>
          ))}
        </div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: c.lightBlue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: c.blue }}>RS</div>
      </nav>

      {/* HERO */}
      <section style={{ padding: '64px 64px 48px', textAlign: 'center' }}>
        <div style={{ width: 112, height: 112, borderRadius: '50%', background: c.lightBlue, margin: '0 auto 28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 10, color: c.blue }}>photo</span>
        </div>
        <h1 style={{ fontFamily: head, fontSize: 44, fontWeight: 800, marginBottom: 12 }}>Rosalyn Shin</h1>
        <div style={{ display: 'inline-flex', gap: 8, marginBottom: 24 }}>
          {pill('PhD Student', true)} {pill('UMD', false)} {pill('AI + Education', false)}
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.8, maxWidth: 600, margin: '0 auto', color: '#475569' }}>
          I study how AI can be designed not to replace human learning interactions, but to restore and amplify students' reasoning, collaboration, and teacher responsiveness in mathematics classrooms.
        </p>
      </section>

      {/* EDUCATION */}
      <section style={{ padding: '24px 64px 48px' }}>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          {EDUCATION.map((e, i) => (
            <div key={i} style={{ background: 'white', borderRadius: r, padding: '20px 28px', boxShadow: c.shadow, display: 'flex', gap: 16, alignItems: 'center', minWidth: 300 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: i === 0 ? c.blue : c.lightBlue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: i === 0 ? 'white' : c.blue, fontFamily: head, flexShrink: 0 }}>{e.degree.replace('.', '')}</div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600 }}>{e.school}</p>
                <p style={{ fontSize: 12, color: c.muted }}>{e.field}{e.status ? ` · ${e.status}` : ''}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWS */}
      <section style={{ padding: '32px 64px 48px' }}>
        <h2 style={{ fontFamily: head, fontSize: 26, fontWeight: 700, marginBottom: 20 }}>Recent News</h2>
        <div style={{ display: 'flex', gap: 20 }}>
          {NEWS.map((item, i) => (
            <div key={i} style={{ flex: 1, background: 'white', borderRadius: r, padding: 24, boxShadow: c.shadow }}>
              {pill(item.date, false)}
              <p style={{ fontFamily: head, fontSize: 17, fontWeight: 700, margin: '14px 0 6px' }}>{item.title}</p>
              <p style={{ fontSize: 13, color: c.muted, lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RESEARCH */}
      <section style={{ padding: '32px 64px 48px' }}>
        <h2 style={{ fontFamily: head, fontSize: 26, fontWeight: 700, marginBottom: 20 }}>Research Interests</h2>
        <div style={{ display: 'flex', gap: 16 }}>
          {RESEARCH.map((res, i) => (
            <div key={i} style={{ flex: 1, background: i === 0 ? c.blue : 'white', color: i === 0 ? 'white' : c.text, borderRadius: r, padding: 28, boxShadow: c.shadow }}>
              <p style={{ fontFamily: head, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{res.title}</p>
              <p style={{ fontSize: 13, lineHeight: 1.7, opacity: i === 0 ? 0.88 : 0.65 }}>{res.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section style={{ padding: '32px 64px 48px' }}>
        <h2 style={{ fontFamily: head, fontSize: 26, fontWeight: 700, marginBottom: 20 }}>Projects</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {PROJECTS.map((p, i) => (
            <div key={i} style={{ background: 'white', borderRadius: r, overflow: 'hidden', boxShadow: c.shadow }}>
              <div style={{ height: 120, background: `linear-gradient(135deg, ${c.midBlue}, ${c.blue})` }}></div>
              <div style={{ padding: 24 }}>
                <p style={{ fontFamily: head, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{p.title}</p>
                <p style={{ fontSize: 13, color: c.muted, lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section style={{ padding: '32px 64px 48px' }}>
        <h2 style={{ fontFamily: head, fontSize: 26, fontWeight: 700, marginBottom: 20 }}>Blog</h2>
        <div style={{ display: 'flex', gap: 20 }}>
          {BLOG_POSTS.map((bp, i) => (
            <div key={i} style={{ flex: 1, background: 'white', borderRadius: r, padding: 24, boxShadow: c.shadow, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {pill(bp.tag, i === 0)}
              <p style={{ fontFamily: head, fontSize: 16, fontWeight: 700, lineHeight: 1.4, marginTop: 4 }}>{bp.title}</p>
              <p style={{ fontSize: 12, color: c.muted }}>{bp.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATS */}
      <section style={{ padding: '32px 64px 48px' }}>
        <h2 style={{ fontFamily: head, fontSize: 26, fontWeight: 700, marginBottom: 20 }}>My Cats</h2>
        <div style={{ display: 'flex', gap: 28, justifyContent: 'center' }}>
          {CATS.map(cat => (
            <div key={cat.name} style={{ background: 'white', borderRadius: r, overflow: 'hidden', boxShadow: c.shadow, width: 280 }}>
              <div style={{ height: 280, overflow: 'hidden', background: '#1a1a1a' }}>
                <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontFamily: head, fontSize: 18, fontWeight: 700 }}>{cat.name}</p>
                  <p style={{ fontFamily: kr, fontSize: 12, color: c.muted }}>{cat.kr}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <a href="https://instagram.com/geumi_oaki" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: c.blue, color: 'white', padding: '10px 24px', borderRadius: 50, fontSize: 13, fontWeight: 600 }}>Follow @geumi_oaki</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '32px 64px', background: '#F8FAFC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: c.muted }}>© 2026 Rosalyn Shin</span>
        <div style={{ display: 'flex', gap: 20, fontSize: 12, color: c.muted }}>
          {['GitHub', 'Google Scholar', 'Email'].map(l => <span key={l}>{l}</span>)}
        </div>
      </footer>
    </div>
  );
}


/* ═══════ VARIATION C: 청사진 (Blueprint) ═══════
   Editorial, bold, magazine-meets-thesis. Asymmetric grids,
   large type, strong blue color blocks, dramatic cat photos.
   ══════════════════════════════════════════════════ */
function BlueprintVariation() {
  const c = { bg: '#FAFAF8', text: '#1A1A1A', muted: '#6B7280', deep: '#2C5282', blue: '#3B82F6', light: '#EBF4FF' };
  const head = "'Space Grotesk', sans-serif";
  const body = "'Newsreader', serif";
  const kr = "'Noto Sans KR', sans-serif";

  return (
    <div style={{ width: 1440, background: c.bg, color: c.text, fontFamily: body }}>
      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 64px', height: 64, background: c.deep, color: 'white' }}>
        <span style={{ fontFamily: head, fontSize: 15, fontWeight: 700, letterSpacing: '0.08em' }}>ROSALYN SHIN</span>
        <div style={{ display: 'flex', gap: 32, fontSize: 13, fontFamily: head }}>
          {['About', 'Research', 'Projects', 'News', 'Blog', 'Cats'].map(l => <span key={l} style={{ opacity: 0.75 }}>{l}</span>)}
        </div>
      </nav>

      {/* HERO — split layout */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ background: c.deep, color: 'white', padding: '80px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontFamily: head, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.5, marginBottom: 28 }}>PhD Student · University of Maryland</p>
          <h1 style={{ fontFamily: head, fontSize: 80, fontWeight: 700, lineHeight: 0.95, marginBottom: 32 }}>Rosalyn<br />Shin</h1>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <span style={{ fontFamily: head, fontSize: 13, padding: '10px 24px', background: 'white', color: c.deep, fontWeight: 600 }}>View Research</span>
            <span style={{ fontFamily: head, fontSize: 13, padding: '10px 24px', border: '1.5px solid rgba(255,255,255,0.4)', color: 'white' }}>Contact</span>
          </div>
        </div>
        <div style={{ padding: '80px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: c.bg }}>
          <p style={{ fontSize: 20, lineHeight: 1.85, fontStyle: 'italic', color: '#374151' }}>
            "I study how AI can be designed not to replace human learning interactions, but to restore and amplify students' reasoning, collaboration, and teacher responsiveness in mathematics classrooms."
          </p>
        </div>
      </section>

      {/* EDUCATION — horizontal band */}
      <section style={{ background: c.light, padding: '40px 64px', display: 'flex', gap: 0 }}>
        {EDUCATION.map((e, i) => (
          <div key={i} style={{ flex: 1, padding: '0 32px', borderLeft: i > 0 ? `1px solid ${c.deep}25` : 'none' }}>
            <p style={{ fontFamily: head, fontSize: 28, fontWeight: 700, color: c.deep, marginBottom: 4 }}>{e.degree}</p>
            <p style={{ fontSize: 15, marginBottom: 2 }}>{e.school}</p>
            <p style={{ fontSize: 13, color: c.muted }}>{e.field}{e.status ? ` · ${e.status}` : ''}</p>
          </div>
        ))}
      </section>

      {/* NEWS — editorial 2-column */}
      <section style={{ padding: '56px 64px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 56 }}>
        <div>
          <h2 style={{ fontFamily: head, fontSize: 32, fontWeight: 700, lineHeight: 1.15 }}>Recent<br />News</h2>
          <div style={{ width: 36, height: 3, background: c.blue, marginTop: 16 }}></div>
        </div>
        <div>
          {NEWS.map((item, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 28, padding: '20px 0', borderBottom: `1px solid #E5E7EB` }}>
              <span style={{ fontFamily: head, fontSize: 12, color: c.blue, fontWeight: 600 }}>{item.date}</span>
              <div>
                <p style={{ fontFamily: head, fontSize: 19, fontWeight: 600, marginBottom: 4 }}>{item.title}</p>
                <p style={{ fontSize: 14, color: c.muted }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RESEARCH — numbered blocks */}
      <section style={{ background: c.light, padding: '56px 64px' }}>
        <h2 style={{ fontFamily: head, fontSize: 32, fontWeight: 700, marginBottom: 40 }}>Research Interests</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
          {RESEARCH.map((res, i) => (
            <div key={i} style={{ padding: '0 28px', borderLeft: i > 0 ? `1px solid ${c.deep}20` : 'none' }}>
              <span style={{ fontFamily: head, fontSize: 56, fontWeight: 700, color: `${c.deep}18`, lineHeight: 1 }}>0{i + 1}</span>
              <p style={{ fontFamily: head, fontSize: 18, fontWeight: 600, margin: '12px 0 8px' }}>{res.title}</p>
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7 }}>{res.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS — asymmetric */}
      <section style={{ padding: '56px 64px' }}>
        <h2 style={{ fontFamily: head, fontSize: 32, fontWeight: 700, marginBottom: 40 }}>Selected Projects</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20 }}>
          <div style={{ background: c.deep, color: 'white', padding: 44 }}>
            <div style={{ height: 140, border: '1px solid rgba(255,255,255,0.15)', marginBottom: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'monospace', fontSize: 10, opacity: 0.4 }}>project visual</span>
            </div>
            <p style={{ fontFamily: head, fontSize: 26, fontWeight: 700, marginBottom: 10 }}>{PROJECTS[0].title}</p>
            <p style={{ fontSize: 15, opacity: 0.8, lineHeight: 1.75 }}>{PROJECTS[0].desc}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {PROJECTS.slice(1).map((p, i) => (
              <div key={i} style={{ border: `2px solid ${c.deep}`, padding: 28, flex: 1 }}>
                <p style={{ fontFamily: head, fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{p.title}</p>
                <p style={{ fontSize: 13, color: c.muted, lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG — editorial list */}
      <section style={{ padding: '0 64px 56px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 56 }}>
        <div>
          <h2 style={{ fontFamily: head, fontSize: 32, fontWeight: 700, lineHeight: 1.15 }}>From<br />the Blog</h2>
          <div style={{ width: 36, height: 3, background: c.blue, marginTop: 16 }}></div>
        </div>
        <div>
          {BLOG_POSTS.map((bp, i) => (
            <div key={i} style={{ padding: '16px 0', borderBottom: `1px solid #E5E7EB`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <span style={{ fontFamily: head, fontSize: 11, fontWeight: 600, color: c.blue, background: c.light, padding: '3px 10px' }}>{bp.tag}</span>
                <p style={{ fontFamily: head, fontSize: 17, fontWeight: 600 }}>{bp.title}</p>
              </div>
              <span style={{ fontSize: 13, color: c.muted, fontFamily: head }}>{bp.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CATS — full-bleed editorial */}
      <section>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
          {CATS.map(cat => (
            <div key={cat.name} style={{ position: 'relative', height: 380, overflow: 'hidden', background: '#111' }}>
              <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 28, background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
                <p style={{ fontFamily: head, fontSize: 26, fontWeight: 700, color: 'white' }}>{cat.name}</p>
                <p style={{ fontFamily: kr, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{cat.kr}</p>
              </div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', padding: '28px 0' }}>
          <a href="https://instagram.com/geumi_oaki" target="_blank" style={{ fontFamily: head, fontSize: 13, fontWeight: 600, color: c.deep, letterSpacing: '0.04em' }}>@geumi_oaki →</a>
        </p>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '0 64px', height: 56, background: c.deep, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: head, fontSize: 12, opacity: 0.55 }}>© 2026 Rosalyn Shin</span>
        <div style={{ display: 'flex', gap: 24, fontFamily: head, fontSize: 12, opacity: 0.55 }}>
          {['GitHub', 'Google Scholar', 'Email'].map(l => <span key={l}>{l}</span>)}
        </div>
      </footer>
    </div>
  );
}


/* ═══════ APP ═══════ */
function App() {
  return (
    <DesignCanvas>
      <DCSection id="concepts" title="Homepage Concepts for rosalynshin.github.io">
        <DCArtboard id="still-water" label='A · "고요" — Still Water' width={1440} height={2840}>
          <StillWater />
        </DCArtboard>
        <DCArtboard id="cloud" label='B · "구름" — Cloud' width={1440} height={2620}>
          <CloudVariation />
        </DCArtboard>
        <DCArtboard id="blueprint" label='C · "청사진" — Blueprint' width={1440} height={2760}>
          <BlueprintVariation />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
