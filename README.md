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

## Setting up the CMS (Supabase)

1. Go to supabase.com, create a new project (separate from Tupu — call it something like "chiza-fam-journal").
2. In the Supabase dashboard, go to SQL Editor -> New query, paste in the contents of `supabase-setup.sql`, and run it. This creates the `posts` table.
3. Go to Authentication -> Users -> Add user, and create yourself an admin login (your email + a password). This is the ONLY account that can post.
4. Go to Project Settings -> API. Copy the "Project URL" and the "anon public" key.
5. In Vercel: Project Settings -> Environment Variables, add:
   - VITE_SUPABASE_URL = (the Project URL)
   - VITE_SUPABASE_ANON_KEY = (the anon public key)
6. Redeploy. Visit yoursite.com/admin/login, log in with the account from step 3, and you can post from there — no GitHub needed.
