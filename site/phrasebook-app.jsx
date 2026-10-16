/* ═══════ PHRASEBOOK PAGE ═══════
   Data: window.PHRASEBOOK from site/generated/phrasebook.bundle.js
   (built from content/phrasebook.md by scripts/build_phrasebook.py).

   Unix touches:
   - every entry is a man page: NAME(n) header/footer, NAME, DESCRIPTION,
     EXAMPLES, SEE ALSO, CAVEATS; cross-references written as name(n)
   - blinking block cursor after the title, shell prompt under the hero
   - `less`-style reverse-video status line that follows the entry in view
   - keys: / search, j k / n N next-prev, g G first-last, q top, h help
   - search hits highlighted in reverse video (CSS Custom Highlight API)
   - apropos-style "nothing appropriate." and "No manual entry for x"      */

const PB = Object.assign(
  { updated: '', intro: { name: '', description: '' }, sections: [], order: [], entries: {}, aliases: {}, planned: [] },
  window.PHRASEBOOK || {}
);

const pbManName = (slug, section) => `${slug.toUpperCase()}(${section})`;
const pbRef = (slug, section) => (section ? `${slug}(${section})` : slug);
const pbSection = (num) => PB.sections.find(s => s.num === num) || { num, label: '', intent: '', entries: [] };
const pbNames = (e) => (e.names && e.names.length ? e.names : [{ name: e.headword, meaning: e.meaning }]);
const pbReducedMotion = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

const PB_KEYS = [
  ['/', 'search'],
  ['Enter', 'jump to first match'],
  ['j  n', 'next entry'],
  ['k  N', 'previous entry'],
  ['g  G', 'first / last entry'],
  ['q', 'quit to top'],
  ['h  ?', 'this help'],
  ['Esc', 'clear search / close'],
];

function Html({ html, className }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function ManSection({ label, children }) {
  return (
    <section className="pb-sec">
      <h3 className="pb-sec-label">{label}</h3>
      <div className="pb-sec-body">{children}</div>
    </section>
  );
}

function ManLine({ left, center, right, className }) {
  return (
    <div className={`pb-manline ${className}`}>
      <span>{left}</span><span>{center}</span><span>{right}</span>
    </div>
  );
}

/* ─── phrasebook(7): the overview page ─── */
function IntroMan({ section, onSection, visibleCount }) {
  return (
    <article className="pb-entry pb-intro" data-slug="phrasebook" id="phrasebook">
      <ManLine className="pb-manhead" left="PHRASEBOOK(7)" center="Miscellaneous Information Manual" right="PHRASEBOOK(7)" />
      <ManSection label="NAME">
        <p><strong className="pb-headword">phrasebook</strong>{PB.intro.name && <> — {PB.intro.name}</>}</p>
      </ManSection>
      <ManSection label="SYNOPSIS">
        <p className="pb-synopsis"><strong>man</strong> [<i>section</i>] <i>phrase</i></p>
      </ManSection>
      {PB.intro.description && (
        <ManSection label="DESCRIPTION"><Html className="pb-prose" html={PB.intro.description} /></ManSection>
      )}
      <ManSection label="SECTIONS">
        <div className="pb-secrows">
          {PB.sections.map(s => (
            <button
              key={s.num}
              className={`pb-secrow ${section === s.num ? 'on' : ''}`}
              onClick={() => onSection(section === s.num ? null : s.num)}
              aria-pressed={section === s.num}
            >
              <span className="num">{s.num}</span>
              <span className="lbl">{s.label}</span>
              <span className="intent">“{s.intent}”</span>
              <span className="cnt">{s.entries.length}</span>
            </button>
          ))}
        </div>
      </ManSection>
      <ManLine className="pb-manfoot" left="Rosalyn's Phrasebook" center={PB.updated} right={`${visibleCount} entries`} />
    </article>
  );
}

/* ─── one entry = one man page ─── */
function ManEntry({ entry, flash }) {
  const sec = pbSection(entry.section);
  const name = pbManName(entry.slug, entry.section);
  return (
    <article id={entry.slug} data-slug={entry.slug} className={`pb-entry ${flash ? 'pb-flash' : ''}`}>
      <ManLine className="pb-manhead" left={name} center={sec.label} right={name} />

      <ManSection label="NAME">
        {pbNames(entry).map((n, i) => (
          <p key={i}><strong className="pb-headword">{n.name}</strong>{n.meaning && <> — {n.meaning}</>}</p>
        ))}
      </ManSection>

      {entry.description && (
        <ManSection label="DESCRIPTION"><Html className="pb-prose" html={entry.description} /></ManSection>
      )}

      {(entry.examples.length > 0 || entry.examplesNote) && (
        <ManSection label="EXAMPLES">
          <ul className="pb-examples">
            {entry.examples.map((h, i) => <li key={i} dangerouslySetInnerHTML={{ __html: h }} />)}
          </ul>
          {entry.examplesNote && <Html className="pb-prose" html={entry.examplesNote} />}
        </ManSection>
      )}

      {(entry.related.length > 0 || entry.xrefs.length > 0 || entry.relatedNote) && (
        <ManSection label="SEE ALSO">
          {entry.related.length > 0 && (
            <ul className="pb-related">
              {entry.related.map((h, i) => <li key={i} dangerouslySetInnerHTML={{ __html: h }} />)}
            </ul>
          )}
          {entry.relatedNote && <Html className="pb-prose" html={entry.relatedNote} />}
          {entry.xrefs.length > 0 && (
            <p className="pb-xrefs">
              {entry.xrefs.map((x, i) => (
                <React.Fragment key={x.slug}>
                  {x.exists
                    ? <a className="pb-xref" href={`#${x.slug}`} data-ref={x.slug}>{pbRef(x.slug, x.section)}</a>
                    : <span className="pb-xref planned" data-ref={x.slug} title="planned">{x.slug}</span>}
                  {i < entry.xrefs.length - 1 && ', '}
                </React.Fragment>
              ))}
            </p>
          )}
        </ManSection>
      )}

      {entry.caveats && (
        <ManSection label="CAVEATS"><Html className="pb-prose" html={entry.caveats} /></ManSection>
      )}

      {entry.extra.map((x, i) => (
        <ManSection key={i} label={x.heading}><Html className="pb-prose" html={x.html} /></ManSection>
      ))}

      <ManLine className="pb-manfoot" left="Rosalyn's Phrasebook" center={PB.updated} right={name} />
    </article>
  );
}

/* ─── sidebar: search + index (by section, or whatis-style a–z) ─── */
function IndexLink({ entry, current, whatis, label, meaning }) {
  const text = label || entry.headword;
  const mn = meaning === undefined ? entry.meaning : meaning;
  return (
    <a className={`pb-index-link ${current === entry.slug ? 'on' : ''}`} href={`#${entry.slug}`} data-ref={entry.slug}>
      <span className="hw">{text}</span>
      {whatis && <span className="sec"> ({entry.section})</span>}
      {mn && <span className="mn">{whatis ? '- ' : ''}{mn}</span>}
    </a>
  );
}

function Sidebar({ query, setQuery, searchRef, sort, setSort, visible, current }) {
  // a–z lists every NAME line (aliases too), like whatis
  const az = visible
    .flatMap(e => pbNames(e).map(n => ({ entry: e, label: n.name, meaning: n.meaning })))
    .sort((a, b) => a.label.localeCompare(b.label));
  return (
    <aside className="pb-side" aria-label="Phrasebook index">
      <label className="pb-search">
        <span className="pb-search-slash" aria-hidden="true">/</span>
        <input
          ref={searchRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="search"
          spellCheck={false}
          aria-label="Search the phrasebook"
        />
        {!query && <kbd aria-hidden="true">/</kbd>}
      </label>

      <div className="pb-side-head">
        <span>INDEX</span>
        <span className="pb-sort">
          <button className={sort === 'section' ? 'on' : ''} onClick={() => setSort('section')}>section</button>
          {' · '}
          <button className={sort === 'az' ? 'on' : ''} onClick={() => setSort('az')}>a–z</button>
        </span>
      </div>

      {sort === 'section'
        ? PB.sections.map(sec => {
            const items = visible.filter(e => e.section === sec.num);
            if (items.length === 0) return null;
            return (
              <div key={sec.num} className="pb-side-group">
                <p className="pb-side-group-title">({sec.num}) {sec.label}</p>
                {items.map(e => <IndexLink key={e.slug} entry={e} current={current} />)}
              </div>
            );
          })
        : (
          <div className="pb-side-group">
            {az.map(x => (
              <IndexLink key={x.label} entry={x.entry} label={x.label} meaning={x.meaning} current={current} whatis />
            ))}
          </div>
        )}
    </aside>
  );
}

/* ─── less-style status line ─── */
function LessStatus({ current, pos, total, query, matches }) {
  const where = current ? `${pbRef(current.slug, current.section)} line ${pos}/${total}` : 'phrasebook(7)';
  return (
    <div className="pb-less" aria-hidden="true">
      <span>Manual page {where} (press h for help or q to quit)</span>
      {query && <span className="q">/{query}  ·  {matches} {matches === 1 ? 'match' : 'matches'}</span>}
    </div>
  );
}

function HelpPanel({ onClose }) {
  return (
    <div className="pb-help-backdrop" onClick={onClose}>
      <div className="pb-help" role="dialog" aria-label="Keyboard commands" onClick={e => e.stopPropagation()}>
        <p className="pb-help-title">SUMMARY OF PHRASEBOOK COMMANDS</p>
        <table>
          <tbody>
            {PB_KEYS.map(([k, v]) => (
              <tr key={k}><td className="k">{k}</td><td>{v}</td></tr>
            ))}
          </tbody>
        </table>
        <p className="pb-help-foot">press h or Esc to close</p>
      </div>
    </div>
  );
}

/* ─── page ─── */
function PhrasebookPage() {
  const [query, setQuery] = React.useState('');
  const [section, setSection] = React.useState(null);
  const [sort, setSort] = React.useState('section');
  const [current, setCurrent] = React.useState(null);
  const [help, setHelp] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [flash, setFlash] = React.useState(null);
  const searchRef = React.useRef(null);
  const listRef = React.useRef(null);
  const toastTimer = React.useRef(null);

  const q = query.trim().toLowerCase();
  const visible = React.useMemo(
    () => PB.order
      .map(slug => PB.entries[slug])
      .filter(e => e && (section === null || e.section === section) && (!q || e.text.includes(q))),
    [q, section]
  );
  const visibleKey = visible.map(e => e.slug).join('|');

  const showToast = React.useCallback((msg) => {
    clearTimeout(toastTimer.current);
    setToast({ msg, id: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }, []);

  const jumpTo = React.useCallback((slug) => {
    const go = () => {
      const el = document.getElementById(slug);
      if (!el) return;
      el.scrollIntoView({ behavior: pbReducedMotion() ? 'auto' : 'smooth', block: 'start' });
      setFlash(slug);
      setTimeout(() => setFlash(f => (f === slug ? null : f)), 1400);
      try { history.replaceState(null, '', `#${slug}`); } catch (err) { /* ignore */ }
    };
    if (!visible.some(e => e.slug === slug)) {
      setQuery('');
      setSection(null);
      setTimeout(go, 60);
    } else {
      go();
    }
  }, [visibleKey]);

  // which entry is in view → status line + index marker
  React.useEffect(() => {
    if (!listRef.current || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(items => {
      items.forEach(it => {
        if (it.isIntersecting) {
          const slug = it.target.getAttribute('data-slug');
          setCurrent(slug === 'phrasebook' ? null : slug);
        }
      });
    }, { rootMargin: '-30% 0px -65% 0px' });
    listRef.current.querySelectorAll('article[data-slug]').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [visibleKey]);

  // reverse-video search hits
  React.useEffect(() => {
    const supported = window.CSS && CSS.highlights && typeof Highlight !== 'undefined';
    if (!supported) return;
    CSS.highlights.delete('pb-search');
    if (!q || !listRef.current) return;
    const ranges = [];
    const walker = document.createTreeWalker(listRef.current, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      if (!node.parentElement.closest('.pb-intro')) {
        const text = node.nodeValue.toLowerCase();
        let idx = text.indexOf(q);
        while (idx !== -1) {
          const r = new Range();
          r.setStart(node, idx);
          r.setEnd(node, idx + q.length);
          ranges.push(r);
          idx = text.indexOf(q, idx + q.length);
        }
      }
      node = walker.nextNode();
    }
    if (ranges.length) CSS.highlights.set('pb-search', new Highlight(...ranges));
    return () => CSS.highlights.delete('pb-search');
  }, [q, visibleKey]);

  // keyboard: / j k n N g G q h ? Esc
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target;
      const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
      if (typing) {
        if (e.key === 'Escape') { setQuery(''); t.blur(); }
        else if (e.key === 'Enter') { e.preventDefault(); t.blur(); if (visible[0]) jumpTo(visible[0].slug); }
        return;
      }
      const idx = visible.findIndex(x => x.slug === current);
      const step = (d) => {
        if (!visible.length) return;
        const next = idx === -1 ? (d > 0 ? 0 : visible.length - 1) : Math.min(visible.length - 1, Math.max(0, idx + d));
        jumpTo(visible[next].slug);
      };
      switch (e.key) {
        case '/': e.preventDefault(); if (searchRef.current) searchRef.current.focus(); break;
        case 'j': case 'n': step(1); break;
        case 'k': case 'N': step(-1); break;
        case 'g': if (visible.length) jumpTo(visible[0].slug); break;
        case 'G': if (visible.length) jumpTo(visible[visible.length - 1].slug); break;
        case 'q':
          setHelp(false);
          window.scrollTo({ top: 0, behavior: pbReducedMotion() ? 'auto' : 'smooth' });
          try { history.replaceState(null, '', location.pathname); } catch (err) { /* ignore */ }
          break;
        case 'h': case '?': setHelp(v => !v); break;
        case 'Escape': setHelp(false); setQuery(''); break;
        default: return;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visibleKey, current, jumpTo]);

  // deep links: phrasebook.html#constitute
  React.useEffect(() => {
    const raw = decodeURIComponent((location.hash || '').slice(1));
    if (!raw) return;
    const slug = (PB.aliases && PB.aliases[raw]) || raw;
    if (PB.entries[slug]) setTimeout(() => jumpTo(slug), 150);
    else if (PB.planned.includes(slug)) showToast(`No manual entry for ${slug}`);
  }, []);

  // cross-references and index links (delegated, so links inside markdown work too)
  const onClick = (e) => {
    const el = e.target.closest ? e.target.closest('[data-ref]') : null;
    if (!el) return;
    const slug = el.getAttribute('data-ref');
    e.preventDefault();
    if (el.classList.contains('planned') || !PB.entries[slug]) {
      showToast(`No manual entry for ${slug}`);
      return;
    }
    jumpTo(slug);
  };

  const currentEntry = current ? PB.entries[current] : null;
  const pos = currentEntry ? Math.max(1, visible.findIndex(e => e.slug === current) + 1) : 0;

  return (
    <PageLayout active="Phrasebook">
      <div className="pb-page" onClick={onClick}>
        <section className="pb-hero">
          <p className="pb-kicker">Things Academics Say</p>
          <h1 className="pb-title">Phrasebook<span className="pb-cursor" aria-hidden="true"></span></h1>
          <div className="pb-rule"></div>
          <p className="pb-prompt">
            <span className="pb-prompt-host">rosalyn@umd</span><span className="pb-prompt-path">:~$</span>man phrasebook
          </p>
        </section>
        <Divider />

        <section className="pb-main">
          <div className="pb-layout">
            <Sidebar
              query={query} setQuery={setQuery} searchRef={searchRef}
              sort={sort} setSort={setSort} visible={visible} current={current}
            />
            <div className="pb-entries" ref={listRef}>
              <IntroMan section={section} onSection={setSection} visibleCount={visible.length} />
              {visible.map(e => <ManEntry key={e.slug} entry={e} flash={flash === e.slug} />)}
              {visible.length === 0 && (
                <p className="pb-empty">{query ? `${query.trim()}: nothing appropriate.` : 'No manual entries.'}</p>
              )}
            </div>
          </div>
          <LessStatus current={currentEntry} pos={pos} total={visible.length} query={query.trim()} matches={visible.length} />
        </section>
      </div>

      {/* portals: .page-wrap's animation transform would otherwise trap position:fixed */}
      {help && ReactDOM.createPortal(<HelpPanel onClose={() => setHelp(false)} />, document.body)}
      {toast && ReactDOM.createPortal(
        <div key={toast.id} className="pb-toast" role="status">{toast.msg}</div>, document.body
      )}
    </PageLayout>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PhrasebookPage />);
