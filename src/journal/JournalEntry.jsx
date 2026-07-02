import { Link, useParams } from "react-router-dom";
import { entries } from "./JournalHome";
import "./journal.css";

// Full post content lives here, keyed by the same slug used in JournalHome.
// Add a matching entry every time you add a post to the `entries` array.
const bodies = {
  "why-we-wrote-god-made-it-good": {
    readTime: "4 min read",
    dek: "A bedtime question we couldn't answer with a shrug — and the story of how it became a book.",
    paragraphs: [
      "It was an ordinary Tuesday, and our daughter asked why the world was broken if God made it. We fumbled through an answer, and it wasn't a good one. That night we started writing down what we actually believed, in language small enough for her to hold onto.",
      "What began as a page of notes became a manuscript over the next four months. We wanted something that didn't flinch from hard questions but still landed on the truth we hold onto: creation was good, is still good, and is being made good again.",
    ],
    pullQuote:
      "We didn't want to write a book that answered every question. We wanted one that made it safe to keep asking them.",
    marginNote: "— written the week before her fourth birthday",
    closing:
      "If you've read it to your own kids, we'd love to hear what questions it opened up at your table.",
  },
};

export default function JournalEntry() {
  const { slug } = useParams();
  const meta = entries.find((e) => e.slug === slug);
  const body = bodies[slug];

  if (!meta) {
    return (
      <div className="wrap-narrow">
        <p style={{ padding: "60px 0" }}>
          This entry doesn't exist yet.{" "}
          <Link to="/">Back to the journal</Link>
        </p>
      </div>
    );
  }

  // find the next entry in the list to link to at the bottom
  const index = entries.findIndex((e) => e.slug === slug);
  const next = entries[index + 1] || entries[0];

  return (
    <div className="wrap-narrow">
      <nav className="jr">
        <div className="nav-row">
          <Link className="back-link" to="/">
            ← Back to the journal
          </Link>
          <div className="logotype-small">The Chiza Fam</div>
        </div>
      </nav>

      <header className="entry-header">
        <div className="entry-date">{meta.date}</div>
        <div className="entry-meta">
          <span className={`tag ${meta.tag}`}>{meta.tagLabel}</span>
          {body && <span className="read-time">{body.readTime}</span>}
        </div>
        <h1>{meta.title}</h1>
        <p className="dek">{body ? body.dek : meta.excerpt}</p>
      </header>

      {meta.isVideo && meta.image && (
        <div className="video-block">
          <div className="tape"></div>
          <img src={meta.image} alt={meta.title} />
          <div className="play-badge-lg"></div>
        </div>
      )}

      {body ? (
        <div className="entry-body">
          {body.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {body.pullQuote && (
            <p className="pull-quote">{body.pullQuote}</p>
          )}
          {body.marginNote && (
            <p className="margin-note">{body.marginNote}</p>
          )}
          {body.closing && <p>{body.closing}</p>}
        </div>
      ) : (
        <div className="entry-body">
          <p>Full text for this entry hasn't been added yet.</p>
        </div>
      )}

      <div className="signoff">— The Chiza Fam</div>

      <div className="next-entry">
        <div className="next-label">Next in the journal</div>
        <Link className="next-title" to={`/journal/${next.slug}`}>
          {next.title} →
        </Link>
      </div>
    </div>
  );
}
