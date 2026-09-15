const skills = ['React', 'Node.js', 'Express',  'Git']

function About() {
  return (
    <section id="about" className="about">
      <div className="about__inner">
        <div className="about__label">০১ — পরিচিতি</div>
        <div className="about__content">
          <h2 className="about__heading">এই ওয়েবসাইট সম্পর্কে</h2>
          <p className="about__text">
            এটি React JS এবং Vite দিয়ে তৈরি  Component-ভিত্তিক ওয়েবসাইট।
           এটা  সাধারণত React ও Node.js
            দিয়ে ফুল-স্ট্যাক অ্যাপ্লিকেশন  দিয়ে ওয়েবসাইট তৈরি ।
          </p>
          <p className="about__text">
            এই প্রজেক্টের  Component গঠন, প্রপস এবং CSS Layout নিয়ে।
           
          </p>
          <ul className="about__skills">
            {skills.map((skill) => (
              <li key={skill} className="about__skill">{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default About
