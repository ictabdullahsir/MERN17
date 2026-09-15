function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <a href="#top" className="header__logo">
          Abdullah<span className="header__logo-dot">.</span>website
        </a>
        <nav className="header__nav">
          <a href="#top">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
