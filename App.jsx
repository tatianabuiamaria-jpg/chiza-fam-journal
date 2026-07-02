import { BrowserRouter, Routes, Route } from "react-router-dom";
import JournalHome from "./journal/JournalHome.jsx";
import JournalEntry from "./journal/JournalEntry.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import NewPost from "./admin/NewPost.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JournalHome />} />
        <Route path="/journal/:slug" element={<JournalEntry />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/new" element={<NewPost />} />
      </Routes>
    </BrowserRouter>
  );
}
