const { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakColor } = window;

/* ═══════ SHARED DATA ═══════ */
const NEWS = [
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
];

/* ═══════ THEME DERIVATION ═══════ */
function deriveTheme(t) {
  const dark = t.darkMode;
  const [accent, mid, wash] = t.blueTone;
  const hushed = t.atmosphere === 'hushed';
  const vivid = t.atmosphere === 'vivid';

  return {
    bg: dark ? '#15151f' : '#FAF8F5',
    bgOuter: dark ? '#0e0e16' : '#F0EDE8',
    text: dark ? '#E5E2DC' : '#2D2A26',
    muted: dark ? '#7C7C88' : '#8A7F76',
    border: dark ? 'rgba(255,255,255,0.07)' : (hushed ? '#EBE8E3' : '#D8D2CA'),
    placeholder: dark ? '#252530' : '#EBE8E3',

    accent: hushed ? (dark ? '#6A6A7A' : '#9A9590') : accent,
    accentText: hushed ? (dark ? '#8A8A94' : '#7A756E') : accent,
    accentWash: hushed ? 'transparent' : (dark ? `${accent}12` : wash),
    sectionTint: vivid ? (dark ? `${accent}0A` : wash) : 'transparent',

    footerBg: hushed ? (dark ? '#1a1a25' : '#F0EDE8') : (dark ? '#1a1a2e' : accent),
    footerText: hushed ? (dark ? '#9A9AA4' : '#6A655E') : 'rgba(255,255,255,0.92)',
    footerMuted: hushed ? (dark ? '#5A5A64' : '#B0AAA4') : 'rgba(255,255,255,0.5)',
    footerBorder: hushed ? (dark ? 'rgba(255,255,255,0.06)' : '#D8D2CA') : 'transparent',

    dark, hushed, vivid,
    serif: "'Cormorant Garamond', serif",
    sans: "'DM Sans', sans-serif",
    kr: "'Noto Sans KR', sans-serif",
  };
}

/* ═══════ HOMEPAGE ═══════ */
function Homepage({ th }) {
  const divider = (
    <div style={{ margin: '0 80px', height: 1, background: th.border }}></div>
  );
  const sideLabel = (line1, line2) => (
    <div>
      <h2 style={{ fontFamily: th.serif, fontSize: 30, fontWeight: 500, lineHeight: 1.2, color: th.text }}>
        {line1}<br />{line2}
      </h2>
      <div style={{ width: 36, height: 2, background: th.accent, marginTop: 16 }}></div>
    </div>
  );
  const sectionLabel = (text) => (
    <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: th.muted, marginBottom: 40, fontFamily: th.sans }}>{text}</p>
  );

  return (
    <div style={{ width: '100%', maxWidth: 1440, margin: '0 auto', background: th.bg, color: th.text, fontFamily: th.sans, transition: 'background 0.4s, color 0.4s' }}>

      {/* ── NAV (from A) ── */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '28px 80px', borderBottom: `1px solid ${th.border}` }}>
        <span style={{ fontFamily: th.serif, fontSize: 20, fontWeight: 500, color: th.text }}>Rosalyn Shin</span>
        <div style={{ display: 'flex', gap: 36, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: th.muted }}>
          {['About', 'Research', 'Projects', 'News', 'Blog', 'Cats'].map(l => (
            <span key={l} style={{ cursor: 'pointer' }}>{l}</span>
          ))}
        </div>
      </nav>

      {/* ── HERO (from A) ── */}
      <section style={{ padding: '96px 80px 72px', display: 'flex', gap: 80 }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: th.muted, marginBottom: 28 }}>
            PhD Student · University of Maryland
          </p>
          <h1 style={{ fontFamily: th.serif, fontSize: 76, fontWeight: 400, lineHeight: 1.02, color: th.text, marginBottom: 40 }}>
            Rosalyn<br />Shin
          </h1>
          <div style={{ width: 48, height: 2, background: th.accent, marginBottom: 28 }}></div>
          <p style={{ fontSize: 16, lineHeight: 1.85, maxWidth: 520, color: th.muted }}>
            I study how AI can be designed not to replace human learning interactions, but to restore and amplify students' reasoning, collaboration, and teacher responsiveness in mathematics classrooms.
          </p>
        </div>
        <div style={{ width: 280, height: 360, background: th.placeholder, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.4s' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 11, color: th.muted, textAlign: 'center', lineHeight: 2 }}>portrait<br />photo</span>
        </div>
      </section>

      {divider}

      {/* ── EDUCATION (from A) ── */}
      <section style={{ padding: '56px 80px' }}>
        {sectionLabel('Education')}
        <div style={{ display: 'flex', gap: 0 }}>
          {EDUCATION.map((e, i) => (
            <div key={i} style={{ flex: 1, paddingLeft: 24, borderLeft: `2px solid ${i === 0 ? th.accent : th.border}`, position: 'relative' }}>
              <div style={{ position: 'absolute', left: -5, top: 0, width: 8, height: 8, borderRadius: '50%', background: i === 0 ? th.accent : th.border }}></div>
              <p style={{ fontFamily: th.serif, fontSize: 22, fontWeight: 500, marginBottom: 4 }}>{e.degree}</p>
              <p style={{ fontSize: 14, marginBottom: 4 }}>{e.field}</p>
              <p style={{ fontSize: 13, color: th.muted }}>{e.school}{e.status ? ` · ${e.status}` : ''}</p>
            </div>
          ))}
        </div>
      </section>

      {divider}

      {/* ── NEWS (from C — editorial 2-col) ── */}
      <section style={{ padding: '56px 80px', display: 'grid', gridTemplateColumns: '200px 1fr', gap: 56, background: th.sectionTint, transition: 'background 0.4s' }}>
        {sideLabel('Recent', 'News')}
        <div>
          {NEWS.map((item, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 28, padding: '20px 0', borderBottom: i < NEWS.length - 1 ? `1px solid ${th.border}` : 'none' }}>
              <span style={{
                fontSize: 12, fontWeight: 500, fontFamily: th.sans,
                color: th.hushed ? th.muted : 'white',
                background: th.hushed ? 'transparent' : th.accent,
                padding: th.hushed ? '0' : '3px 10px',
                borderRadius: th.hushed ? 0 : 4,
                alignSelf: 'start', justifySelf: 'start',
                transition: 'all 0.3s',
              }}>{item.date}</span>
              <div>
                <p style={{ fontFamily: th.serif, fontSize: 21, fontWeight: 500, marginBottom: 4 }}>{item.title}</p>
                <p style={{ fontSize: 13, color: th.muted, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {divider}

      {/* ── RESEARCH (from A) ── */}
      <section style={{ padding: '56px 80px' }}>
        {sectionLabel('Research Interests')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {RESEARCH.map((r, i) => (
            <div key={i} style={{
              display: 'flex', gap: 24,
              background: th.vivid ? th.accentWash : 'transparent',
              padding: th.vivid ? '20px 24px' : '0',
              borderRadius: th.vivid ? 8 : 0,
              transition: 'all 0.3s',
            }}>
              <div style={{ width: 3, minHeight: 40, background: th.accent, flexShrink: 0, marginTop: 6 }}></div>
              <div>
                <p style={{ fontFamily: th.serif, fontSize: 21, fontWeight: 500, marginBottom: 6 }}>{r.title}</p>
                <p style={{ fontSize: 14, color: th.muted, lineHeight: 1.7, maxWidth: 600 }}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {divider}

      {/* ── PROJECTS (from A) ── */}
      <section style={{ padding: '56px 80px' }}>
        {sectionLabel('Selected Projects')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
          {PROJECTS.map((p, i) => (
            <div key={i} style={{ border: `1px solid ${th.border}`, padding: 32, transition: 'border-color 0.3s' }}>
              <div style={{ width: '100%', height: 100, background: th.vivid ? th.accentWash : th.placeholder, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }}>
                <span style={{ fontFamily: 'monospace', fontSize: 10, color: th.muted }}>project visual</span>
              </div>
              <p style={{ fontFamily: th.serif, fontSize: 22, fontWeight: 500, marginBottom: 8 }}>{p.title}</p>
              <p style={{ fontSize: 13, color: th.muted, lineHeight: 1.7 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {divider}

      {/* ── BLOG (from C — editorial 2-col) ── */}
      <section style={{ padding: '56px 80px', display: 'grid', gridTemplateColumns: '200px 1fr', gap: 56, background: th.sectionTint, transition: 'background 0.4s' }}>
        {sideLabel('From', 'the Blog')}
        <div>
          {BLOG_POSTS.map((bp, i) => (
            <div key={i} style={{ padding: '18px 0', borderBottom: i < BLOG_POSTS.length - 1 ? `1px solid ${th.border}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: '3px 10px',
                  color: th.hushed ? th.muted : th.accentText,
                  background: th.hushed ? 'transparent' : th.accentWash,
                  borderRadius: 4, transition: 'all 0.3s',
                }}>{bp.tag}</span>
                <p style={{ fontFamily: th.serif, fontSize: 19, fontWeight: 500 }}>{bp.title}</p>
              </div>
              <span style={{ fontSize: 13, color: th.muted, flexShrink: 0 }}>{bp.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATS (from C — full-bleed editorial) ── */}
      <section>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
          {CATS.map(cat => (
            <div key={cat.name} style={{ position: 'relative', height: 380, overflow: 'hidden', background: '#111' }}>
              <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 28, background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
                <p style={{ fontFamily: th.serif, fontSize: 28, fontWeight: 500, color: 'white' }}>{cat.name}</p>
                <p style={{ fontFamily: th.kr, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{cat.kr}</p>
              </div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', padding: '24px 0', background: th.bg, transition: 'background 0.4s' }}>
          <a href="https://instagram.com/geumi_oaki" target="_blank" rel="noopener" style={{ fontSize: 13, color: th.accentText, letterSpacing: '0.04em', fontWeight: 500 }}>@geumi_oaki on Instagram →</a>
        </p>
      </section>

      {/* ── FOOTER (from C) ── */}
      <footer style={{
        padding: '0 80px', height: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: th.footerBg, color: th.footerText,
        borderTop: th.hushed ? `1px solid ${th.footerBorder}` : 'none',
        transition: 'all 0.4s',
      }}>
        <span style={{ fontSize: 12, color: th.footerMuted }}>© 2026 Rosalyn Shin</span>
        <div style={{ display: 'flex', gap: 24, fontSize: 12, color: th.footerMuted }}>
          {['GitHub', 'Google Scholar', 'Email'].map(l => <span key={l}>{l}</span>)}
        </div>
      </footer>
    </div>
  );
}

/* ═══════ APP ═══════ */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const th = deriveTheme(t);

  return (
    <div style={{ background: th.bgOuter, minHeight: '100vh', transition: 'background 0.4s' }}>
      <Homepage th={th} />
      <TweaksPanel>
        <TweakSection label="Feel">
          <TweakRadio
            label="Atmosphere"
            value={t.atmosphere}
            onChange={v => setTweak('atmosphere', v)}
            options={['hushed', 'balanced', 'vivid']}
          />
          <TweakToggle
            label="Dark Mode"
            value={t.darkMode}
            onChange={v => setTweak('darkMode', v)}
          />
        </TweakSection>
        <TweakSection label="Palette">
          <TweakColor
            label="Blue Family"
            value={t.blueTone}
            onChange={v => setTweak('blueTone', v)}
            options={[
              ['#4A6FA5', '#6B8FBF', '#E8EDF4'],
              ['#3B82F6', '#93C5FD', '#DBEAFE'],
              ['#2C5282', '#4B7399', '#EBF4FF'],
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
