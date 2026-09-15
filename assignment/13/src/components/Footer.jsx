function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="footer">
      <div className="footer__inner">
        <div>
          <p className="footer__text"> MD Abdullah — All Rights Reserved © {year}. Built with React &amp; Vite</p>
          {/* <p className="footer__sub">Built with React &amp; Vite</p> */}
        </div>
        <nav className="footer__nav">
          <a href="#top">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
