# The Chiza Fam — Journal

## Run it locally
npm install
npm run dev

## Add a new post
1. Open src/journal/JournalHome.jsx — add one object to the `entries` array
   (pick a unique `slug`, that's how the URL is built).
2. Open src/journal/JournalEntry.jsx — add a matching entry to the `bodies`
   object using the same slug, with the full text of the post.
3. Save, push to GitHub, Vercel redeploys automatically.

## Deploy
Push this folder to a GitHub repo, then import that repo in Vercel.
Vercel will detect Vite automatically — no config needed.
