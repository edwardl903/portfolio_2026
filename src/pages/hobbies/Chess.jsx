function Chess() {
  return (
    <section className="hobby-detail">
      <div className="container">
        <div className="hobby-header">
          <div className="hobby-icon">
            <i className="fas fa-chess"></i>
          </div>
        </div>

        <div className="hobby-content">
          <div className="hobby-description">
            <h2>My Chess Journey</h2>
            <p>I learned chess from my older brother when I was 8, but it wasn't until the COVID-19 pandemic in 2020 that I truly became interested in the game. What started as a way to pass time during lockdown evolved into a serious passion that has shaped my strategic thinking and leadership skills.</p>
            
            <p>I'm proud of my current <strong>2200 chess.com rapid rating</strong>, with <strong>2000 in blitz</strong> and <strong>2000 in bullet</strong>. You can check out my games and progress on my <a href="https://www.chess.com/member/EdwardL903" target="_blank" rel="noopener noreferrer" className="chess-link">chess.com profile</a>.</p>

            <p>My passion for chess extends beyond playing - I've had the privilege of teaching numerous programs at my local community center, my high school, and various camps around the Massachusetts area. I believe in giving back to the chess community and helping others discover the beauty of the game.</p>

            <p>I was the <strong>founder of Tufts Chess Club</strong> and served as <strong>acting president from 2021-2025</strong>. During my time leading the club, I also had the honor of being the <strong>captain of Tufts Collegiate Team A</strong>, competing against other colleges in chess tournaments. These experiences taught me valuable leadership and organizational skills.</p>

            <p>My passion for chess led me to create <strong>ChessLytics</strong>, an end-to-end chess analytics platform that processes 100,000+ games. This project combines my love for chess with my data engineering skills, providing personalized insights and analytics for chess players.</p>
            
            <a href="https://www.chesslytics.xyz" className="btn btn-primary" target="_blank" rel="noopener noreferrer" style={{margin: '1rem 0', display: 'inline-block'}}>
              <i className="fas fa-external-link-alt"></i> Visit ChessLytics
            </a>

            {/* Chess Club Photos Section */}
            <div className="chess-club-section">
              <h3>Tufts Chess Club Memories</h3>
              <p>Here are some special moments from my time leading the Tufts Chess Club:</p>
              
              <div className="chess-photos-grid">
                {/* Boston College Tournament */}
                <div className="chess-photo-card">
                  <img src="/static/images/hobbies/chess/bc.jpg" alt="Boston College Chess Tournament" loading="lazy" />
                  <div className="photo-content">
                    <h4>Boston College Tournament</h4>
                    <p>Our team competed at Boston College in an intercollegiate chess tournament against 10 other schools across Massachusetts. Tufts secured 2nd place!</p>
                  </div>
                </div>

                {/* E-Board Members */}
                <div className="chess-photo-card">
                  <img src="/static/images/hobbies/chess/eboard.png" alt="2025 E-Board Members" loading="lazy" />
                  <div className="photo-content">
                    <h4>2025 E-Board Members</h4>
                    <p>My 2025 executive board members. We worked hard preparing for the club and enjoyed fun bonding activities including Boda Borg, baking contests, poker nights, squash games, and dance parties.</p>
                  </div>
                </div>

                {/* Founders */}
                <div className="chess-photo-card">
                  <img src="/static/images/hobbies/chess/founders.png" alt="Chess Club Founders" loading="lazy" />
                  <div className="photo-content">
                    <h4>Chess Club Founders</h4>
                    <p>The founding members of the chess club: me, Alex (secretary), and Sam (treasurer). We've been working together since the club's inception.</p>
                  </div>
                </div>

                {/* Weekly Meetings */}
                <div className="chess-photo-card meeting-photo">
                  <img src="/static/images/hobbies/chess/meeting1.jpg" alt="Chess Club Weekly Meeting" loading="lazy" />
                  <div className="photo-content">
                    <h4>Weekly Chess Club Meetings</h4>
                    <p>Our weekly chess club meetings where we socialize, enjoy food, and play chess together.</p>
                  </div>
                </div>

                <div className="chess-photo-card meeting-photo">
                  <img src="/static/images/hobbies/chess/meeting2.jpg" alt="Chess Club Weekly Meeting" loading="lazy" />
                  <div className="photo-content">
                    <h4>Chess Club Community</h4>
                    <p>More highlights from our weekly meetings - building friendships and improving our chess skills together.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Chess
