import { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
import PhotoGallery from "./components/PhotoGallery";
import Footer from "./components/Footer";
import photosData from "./data.json";

// Modal শুধু App.jsx-এর ভেতরেই ব্যবহার হয়, তাই আলাদা ফাইল না করে এখানেই রাখা হলো
function PhotoModal({ photo, onClose }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const color = "#" + photo.url.split("/").pop();

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        {failed ? (
          <div className="fallback modal-img" style={{ background: color }}>
            #{photo.id}
          </div>
        ) : (
          <img
            className="modal-img"
            src={photo.url}
            alt={photo.title}
            onError={() => setFailed(true)}
          />
        )}
        <div className="modal-body">
          <h2>{photo.title}</h2>
          <p>Photo ID: {photo.id} · Album ID: {photo.albumId}</p>
          <button className="theme-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [album, setAlbum] = useState("all");
  const [selected, setSelected] = useState(null);
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      setPhotos(photosData.slice(0, 100));
      setError(null);
    } catch (err) {
      setError(err.message || "Data load করা যায়নি");
    } finally {
      setLoading(false);
    }
  }, []);

  // Dark mode toggle
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }, [dark]);

  const albums = useMemo(
    () => [...new Set(photos.map((p) => p.albumId))].sort((a, b) => a - b),
    [photos]
  );

  // Search + Album Filter
  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return photos.filter(
      (p) =>
        (album === "all" || p.albumId === Number(album)) &&
        (q === "" || p.title.toLowerCase().includes(q) || String(p.id) === q)
    );
  }, [photos, search, album]);

  return (
    <div className="app">
      <Header
        search={search}
        onSearch={setSearch}
        albums={albums}
        album={album}
        onAlbum={setAlbum}
        dark={dark}
        onToggleDark={() => setDark((d) => !d)}
        total={photos.length}
        shown={visible.length}
      />
      <main className="main">
        <PhotoGallery
          photos={visible}
          loading={loading}
          error={error}
          onSelect={setSelected}
        />
      </main>
      <Footer />
      {selected && <PhotoModal photo={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

export default App;
