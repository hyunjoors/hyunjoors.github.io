/* ═══════ BLOG PAGE ═══════ */

const BLOG_ALL = [
  {
    id: 'ai-facilitator',
    title: 'Journey of my PhD program',
    date: 'September 12, 2025',
    tag: 'PhD Life',
    readTime: '8 min',
    excerpt: 'Like a Pokémon',
    body: "
I'm an international Ph.A. student here. One in a Ph.D. program will enter as a Ph.A. student, then evolve to a Ph.D. student following these evolutionary steps (just like Pokémon):

Ph.A.: during your coursework stage
Ph.B.: around the time when you finish your coursework
Ph.C.: doctoral candidate stage (probably year 3-4)
Ph.D. : After a successful dissertation defense, you've finally become a Ph.D.
I hope to capture my progress at least once monthly on things like: progress on my projects, comps (I know it's a bit early to start on it), dissertation ideas, personal reflections, etc.

Let the journey begin 🙂",
  },
  // {
  //   id: 'cat-parent-phd',
  //   title: 'On Being a Cat Parent During a PhD',
  //   date: 'March 8, 2026',
  //   tag: 'Personal',
  //   readTime: '5 min',
  //   excerpt: 'Sirius and Eleanora don\'t care about my publication record. They care about when I fill their food bowls and whether my lap is available. There\'s something deeply grounding about that.',
  //   body: `Graduate school compresses time in strange ways. Weeks disappear into paper deadlines. Entire months collapse into "preparing for conference season."\n\nSirius and Eleanora — my two cats — operate on an entirely different clock. Sirius (현금) demands breakfast at 6:47am regardless of when I went to bed. Eleanora (현옥) claims my desk chair the moment I stand up, as though defending territory.\n\nThey don't know about my h-index. They've never read my papers.\n\nAnd honestly? That's the most valuable thing about them.\n\nIn an environment where your worth can feel tied to your productivity, having creatures who love you unconditionally (or at least tolerate you in exchange for food) is a radical form of self-care.\n\nSome lessons from cat parenting during a PhD:\n\n1. Take breaks. Cats nap 16 hours a day and they're doing fine.\n2. Stare out windows. It's not wasted time — it's observation.\n3. Knock things off tables. (Metaphorically. Sometimes you need to disrupt your own assumptions.)\n4. Find your sunny spot and sit in it.\n\nFollow Sirius and Eleanora's adventures at @geumi_oaki on Instagram.`,
  // },
  // {
  //   id: 'aera-2025',
  //   title: 'Notes from AERA 2025',
  //   date: 'January 22, 2026',
  //   tag: 'Conference',
  //   readTime: '6 min',
  //   excerpt: 'Key takeaways from the American Educational Research Association 2025 conference: the AI-in-education conversation is maturing, and the field is finally asking harder questions about equity, agency, and power.',
  //   body: `AERA 2025 felt different. After years of "AI is coming to education" panels, the conversation has shifted to harder, more necessary questions.\n\nHere are my key takeaways:\n\n1. Equity is no longer an afterthought\nMultiple sessions centered equity from the start, not as a section tacked onto a technology paper. Researchers are asking who benefits from AI tools and who is harmed — before building, not after.\n\n2. Teacher agency matters\nThe best presentations I saw all shared a common thread: they positioned teachers as decision-makers, not passive recipients of AI recommendations. Tools that augment teacher judgment outperform tools that try to replace it.\n\n3. Student voice is underrepresented\nFor all our talk about student-centered design, very few projects actually involved students in the design process. This is something I want to foreground in my own work.\n\n4. The methods conversation is evolving\nHybrid methods — combining learning analytics with qualitative approaches — are gaining traction. This aligns with my own approach of using computational tools to surface patterns, then interpretive methods to understand them.\n\nLooking forward to continuing these conversations at LAK and ICLS this year.`,
  // },
  // {
  //   id: 'multimodal-math',
  //   title: 'Why Math Needs More Than Numbers',
  //   date: 'December 5, 2025',
  //   tag: 'Research',
  //   readTime: '7 min',
  //   excerpt: 'Traditional mathematics instruction privileges symbolic representation. But for many learners — especially neurodivergent students — visual, spatial, and narrative representations can unlock understanding that numbers alone cannot.',
  //   body: `placeholder`,
  // },
  // {
  //   id: 'surviving-quals',
  //   title: 'Surviving Quals: A Non-Linear Journey',
  //   date: 'November 14, 2025',
  //   tag: 'PhD Life',
  //   readTime: '6 min',
  //   excerpt: 'Nobody tells you that qualifying exams are less about what you know and more about how you think under pressure. Here\'s what I wish someone had told me.',
  //   body: `placeholder`,
  // },
  // {
  //   id: 'python-learning-analytics',
  //   title: 'Getting Started with Learning Analytics in Python',
  //   date: 'October 20, 2025',
  //   tag: 'Tutorial',
  //   readTime: '10 min',
  //   excerpt: 'A beginner-friendly guide to setting up a learning analytics pipeline using Python, pandas, and basic NLP — with examples from real classroom data.',
  //   body: `placeholder`,
  // },
  // {
  //   id: 'reading-disessa',
  //   title: 'Reading diSessa\'s Knowledge in Pieces',
  //   date: 'September 8, 2025',
  //   tag: 'Reading Notes',
  //   readTime: '5 min',
  //   excerpt: 'Notes on diSessa\'s foundational framework and how it reshapes the way I think about student misconceptions — they\'re not bugs, they\'re features.',
  //   body: `placeholder`,
  // },
  // {
  //   id: 'first-semester-teaching',
  //   title: 'What Teaching Taught Me About Research',
  //   date: 'August 3, 2025',
  //   tag: 'Teaching',
  //   readTime: '6 min',
  //   excerpt: 'My first semester as a TA flipped my assumptions about how students learn. Watching real classrooms changed how I design AI tools.',
  //   body: `placeholder`,
  // },
];

function BlogPage() {
  const th = THEME;
  const [activePost, setActivePost] = React.useState(null);
  const [filterTag, setFilterTag] = React.useState('all');
  const tags = [...new Set(BLOG_ALL.map(b => b.tag))];
  const filtered = BLOG_ALL.filter(b => filterTag === 'all' || b.tag === filterTag);

  if (activePost) {
    const post = BLOG_ALL.find(b => b.id === activePost);
    return (
      <PageLayout active="Blog">
        <section style={{ padding: '56px 80px', maxWidth: 780 }}>
          <button onClick={() => setActivePost(null)} style={{ fontSize: 13, color: th.accent, fontWeight: 500, marginBottom: 32, display: 'flex', alignItems: 'center', gap: 6 }}>
            ← Back to all posts
          </button>
          <span className="tag-pill" style={{ marginBottom: 16, display: 'inline-block' }}>{post.tag}</span>
          <h1 style={{ fontFamily: th.serif, fontSize: 48, fontWeight: 400, lineHeight: 1.15, marginBottom: 16 }}>{post.title}</h1>
          <div style={{ display: 'flex', gap: 16, fontSize: 13, color: th.muted, marginBottom: 48 }}>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime} read</span>
          </div>
          <div style={{ fontFamily: th.serif, fontSize: 20, lineHeight: 1.85, color: '#2A2722' }}>
            {post.body.split('\n\n').map((para, i) => (
              <p key={i} style={{ marginBottom: 24 }}>{para}</p>
            ))}
          </div>
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
          {tags.map(t => (
            <button key={t} className={`tag-pill ${filterTag === t ? 'active' : ''}`} onClick={() => setFilterTag(t)}>{t}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {filtered.map((post, i) => (
            <div
              key={post.id}
              className="blog-card card-lift"
              onClick={() => setActivePost(post.id)}
              style={{ cursor: 'pointer', marginBottom: -1 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 32 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                    <span className="tag-pill">{post.tag}</span>
                    <span style={{ fontSize: 12, color: th.muted }}>{post.readTime}</span>
                  </div>
                  <p style={{ fontFamily: th.serif, fontSize: 28, fontWeight: 500, lineHeight: 1.3, marginBottom: 10 }}>{post.title}</p>
                  <p style={{ fontSize: 15, color: th.muted, lineHeight: 1.75, maxWidth: 620 }}>{post.excerpt}</p>
                </div>
                <span style={{ fontSize: 14, color: th.muted, flexShrink: 0, paddingTop: 4 }}>{post.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<BlogPage />);
