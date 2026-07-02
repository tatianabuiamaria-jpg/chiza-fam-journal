import { Link } from "react-router-dom";
import "./journal.css";

// This array is your content. Add a new object here every time you
// publish a post, and it shows up on the homepage automatically.
export const entries = [
  {
    slug: "why-we-wrote-god-made-it-good",
    date: "Sunday, 14 June",
    tag: "book",
    tagLabel: "Book",
    title: 'Why We Wrote "God Made It Good"',
    excerpt:
      "We started this book after a bedtime question we couldn't answer with a shrug. Here's the story behind the pages.",
  },
  {
    slug: "faithful-finance-first-budget",
    date: "Wed, 3 June",
    tag: "finance",
    tagLabel: "Finance",
    title: "Faithful Finance Diary: Our First Real Budget",
    excerpt:
      "Every line item, every argument, every small win — the unfiltered version of our first budget as a family of three.",
  },
  {
    slug: "meet-the-newest-chiza",
    date: "Sat, 30 May",
    tag: "video",
    tagLabel: "Video",
    title: "Meet the Newest Chiza",
    excerpt:
      "We finally filmed it — the introduction we'd been putting off for months.",
    image:
      "https://images.unsplash.com/photo-1595854341625-fc2521582a1a?w=400&h=300&fit=crop",
    isVideo: true,
  },
  {
    slug: "sunday-mornings-in-windhoek",
    date: "Mon, 18 May",
    tag: "journal",
    tagLabel: "Journal",
    title: "Sunday Mornings in Windhoek",
    excerpt:
      "Slow coffee, a late start to church, and a conversation about what 'good' actually means.",
  },
];

export default function JournalHome() {
  return (
    <>
      <div className="wrap">
        <header className="jr">
          <div className="masthead">
            <div className="logotype">The Chiza&nbsp;Fam</div>
            <div className="stamp">
              Windhoek, Namibia
              <br />
              Vol. 1 — Est. 2024
            </div>
          </div>
          <p className="dek">
            A running journal of what we're building, believing, and
            figuring out as a family — the book, the budget, and everything
            in between.
          </p>
        </header>
      </div>

      <div className="wrap spine-wrap">
        <div className="spine"></div>
        <div className="entries">
          {entries.map((entry, i) => (
            <article
              key={entry.slug}
              className={`entry ${i % 2 === 0 ? "left" : "right"}`}
            >
              <div className="entry-date">{entry.date}</div>
              <div className="entry-meta">
                <span className={`tag ${entry.tag}`}>{entry.tagLabel}</span>
              </div>

              {entry.image && (
                <div className="tape-photo">
                  <div className="tape"></div>
                  <img src={entry.image} alt={entry.title} />
                  {entry.isVideo && <div className="play-badge"></div>}
                </div>
              )}

              <h2>{entry.title}</h2>
              <p>{entry.excerpt}</p>
              <Link className="read-more" to={`/journal/${entry.slug}`}>
                {entry.isVideo ? "Watch the entry →" : "Read the entry →"}
              </Link>
            </article>
          ))}
        </div>
      </div>

      <div className="wrap">
        <footer className="jr">
          <span>The Chiza Fam Journal</span>
          <span>Faith · Finance · Firsts</span>
        </footer>
      </div>
    </>
  );
}
