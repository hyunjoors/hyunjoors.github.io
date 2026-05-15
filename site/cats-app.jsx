/* ═══════ CATS PAGE ═══════ */

const CAT_PROFILES = [
  {
    name: 'Sirius',
    kr: '현금',
    img: 'uploads/LAB06305%20sh%20%E1%84%8C%E1%85%B3%E1%86%BC%E1%84%86%E1%85%A7%E1%86%BC.jpg',
    personality: 'The regal one. Sirius has a gaze that could peer into your soul — and judge whether you have treats. Loves high perches, early morning demands, and the occasional headbutt of approval.',
    facts: ['Black mediumhair', 'Playful & Cuddly', 'Expert lap claimer'],
  },
  {
    name: 'Eleanora',
    kr: '현옥',
    img: 'uploads/LAB06477%20sh%20%E1%84%87%E1%85%A1%E1%86%AB%E1%84%8D%E1%85%A9%E1%86%A8.jpg',
    personality: 'The fluffy philosopher. Eleanora spends her days contemplating the dust motes in sunbeams and claiming any warm surface as her territory. Unbothered by deadlines.',
    facts: ['Grey longhair', 'Soft & Sweet', 'No cat near me', 'Professional desk chair thief', 'Sunbeam connoisseur'],
  },
];

const CAT_GALLERY = [
  { img: 'uploads/LAB06305%20sh%20%E1%84%8C%E1%85%B3%E1%86%BC%E1%84%86%E1%85%A7%E1%86%BC.jpg', caption: 'Sirius Profile', cat: 'Sirius' },
  { img: 'uploads/LAB06477%20sh%20%E1%84%87%E1%85%A1%E1%86%AB%E1%84%8D%E1%85%A9%E1%86%A8.jpg', caption: 'Eleanora Profile', cat: 'Eleanora' },
  { img: 'uploads/%E1%84%92%E1%85%A7%E1%86%AB%E1%84%80%E1%85%B3%E1%86%B71.jpg', caption: 'Sirius up close', cat: 'Sirius' },
  { img: 'uploads/%E1%84%92%E1%85%A7%E1%86%AB%E1%84%8B%E1%85%A9%E1%86%A81.png', caption: '👅', cat: 'Eleanora' },
  { img: 'uploads/geum01.png', caption: 'Sirius the Teddy Bear', cat: 'Sirius' },
  { img: 'uploads/oak02.png', caption: 'Eleanora in her element', cat: 'Eleanora' },

];

function CatProfile({ cat, flipped }) {
  const th = THEME;
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: flipped ? '1fr 1fr' : '1fr 1fr',
      gap: 0,
    }}>
      {flipped && (
        <div style={{ padding: '56px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <CatDetails cat={cat} />
        </div>
      )}
      <div style={{ height: 480, overflow: 'hidden', background: '#111' }}>
        <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      {!flipped && (
        <div style={{ padding: '56px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <CatDetails cat={cat} />
        </div>
      )}
    </div>
  );
}

function CatDetails({ cat }) {
  const th = THEME;
  return (
    <div>
      <p style={{ fontFamily: th.kr, fontSize: 14, color: th.accent, marginBottom: 8 }}>{cat.kr}</p>
      <h2 style={{ fontFamily: th.serif, fontSize: 48, fontWeight: 400, marginBottom: 20 }}>{cat.name}</h2>
      <div style={{ width: 36, height: 2, background: th.accent, marginBottom: 24 }}></div>
      <p style={{ fontSize: 17, lineHeight: 1.85, color: th.muted, marginBottom: 28 }}>{cat.personality}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {cat.facts.map((fact, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: th.accent, flexShrink: 0 }}></div>
            <span style={{ fontSize: 15, color: th.text }}>{fact}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CatsPage() {
  const th = THEME;

  return (
    <PageLayout active="Cats">
      <PageHero title="Sirius & Eleanora" subtitle="The Real Stars of This Website" />
      <Divider />

      {/* Profiles */}
      {CAT_PROFILES.map((cat, i) => (
        <React.Fragment key={cat.name}>
          <CatProfile cat={cat} flipped={i % 2 === 1} />
          {i < CAT_PROFILES.length - 1 && <Divider />}
        </React.Fragment>
      ))}

      <Divider />

      {/* Gallery */}
      <section className="section-pad">
        <SectionLabel text="Gallery" />
        <p style={{ fontSize: 15, color: th.muted, marginBottom: 32, lineHeight: 1.7 }}>
          Drop your favorite Sirius & Eleanora photos here — this gallery is a placeholder for your collection.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {CAT_GALLERY.map((photo, i) => (
            <div key={i} style={{ position: 'relative', height: 260, overflow: 'hidden', background: '#111' }}>
              <img src={photo.img} alt={photo.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: 'linear-gradient(transparent, rgba(0,0,0,0.6))' }}>
                <p style={{ fontSize: 12, color: 'white' }}>{photo.caption}</p>
              </div>
            </div>
          ))}
          {/* Placeholder slots */}
          {[1, 2].map(i => (
            <div key={`ph-${i}`} style={{
              height: 260, background: th.placeholder,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px dashed ${th.border}`,
            }}>
              <span style={{ fontFamily: 'monospace', fontSize: 11, color: th.muted }}>+ add photo</span>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* Instagram CTA */}
      <section style={{ padding: '56px 80px', textAlign: 'center' }}>
        <p style={{ fontFamily: th.serif, fontSize: 30, fontWeight: 400, marginBottom: 8 }}>Follow their adventures</p>
        <p style={{ fontSize: 15, color: th.muted, marginBottom: 24 }}>More cat content on Instagram</p>
        <a
          href="https://instagram.com/geumi_oaki"
          target="_blank"
          rel="noopener"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 32px',
            background: th.accent, color: 'white',
            fontSize: 14, fontWeight: 500, letterSpacing: '0.02em',
            transition: 'opacity 0.2s',
          }}
        >
          @geumi_oaki on Instagram
        </a>
      </section>
    </PageLayout>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<CatsPage />);
