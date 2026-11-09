function Header({
  search,
  onSearch,
  albums,
  album,
  onAlbum,
  dark,
  onToggleDark,
  total,
  shown,
}) {
  return (
    <header className="header">
      <div className="header-top">
        <h1 className="logo">Contact Sheet</h1>
        <button
          className="theme-btn"
          onClick={onToggleDark}
          aria-label="Toggle dark mode"
        >
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>

      <div className="controls">
        <input
          type="search"
          className="input"
          placeholder="Title বা ID দিয়ে খুঁজুন"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          aria-label="Search photos"
        />
        <select
          className="input"
          value={album}
          onChange={(e) => onAlbum(e.target.value)}
          aria-label="Filter by album"
        >
          <option value="all">সব Album</option>
          {albums.map((id) => (
            <option key={id} value={id}>
              Album {id}
            </option>
          ))}
        </select>
        <span className="count">
          {shown} / {total} photo
        </span>
      </div>
    </header>
  );
}

export default Header;
