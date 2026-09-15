function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__grid" aria-hidden="true"></div>
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__kicker">Full-stack Website</p>
          {/* <h1 className="hero__title">
            আমি ওয়েবসাইট বানাই,<br />সমস্যা সমাধানের জন্য।
          </h1> */}
          <p className="hero__desc">
            React, Node এবং PHP/MySQL দিয়ে সম্পূর্ণ ওয়েব অ্যাপ্লিকেশন তৈরি করি —
            আইডিয়া থেকে শুরু করে লাইভ ডিপ্লয়মেন্ট পর্যন্ত।
          </p>
          <a href="#about" className="hero__btn">আরও জানুন</a>
        </div>

     
      </div>
    </section>
  )
}

export default Hero
