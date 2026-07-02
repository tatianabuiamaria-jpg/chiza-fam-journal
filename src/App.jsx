import { BrowserRouter, Routes, Route } from "react-router-dom";
import JournalHome from "./journal/JournalHome.jsx";
import JournalEntry from "./journal/JournalEntry.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JournalHome />} />
        <Route path="/journal/:slug" element={<JournalEntry />} />
      </Routes>
    </BrowserRouter>
  );
}
