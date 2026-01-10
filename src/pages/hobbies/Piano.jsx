function Piano() {
  return (
    <section className="hobby-detail">
      <div className="container">
        <div className="hobby-header">
          <div className="hobby-icon">
            <i className="fas fa-music"></i>
          </div>
        </div>

        <div className="hobby-content">
          <div className="hobby-description">
            <h2>My Musical Journey</h2>
            <p>I started piano when I was 7, but quit after a couple of years thinking I just wasn't good at it. At 13, I decided to try again and started taking lessons. Having a good teacher made all the difference - I actually started enjoying the process and rediscovered my interest in music.</p>
            
            <p>I performed at a few retirement homes, which was nerve-wracking but turned out to be a good experience. It helped me get more comfortable playing in front of people and showed me that sometimes the obstacles we think are there aren't as big as they seem.</p>

            <p>Now I play a mix of things - classical pieces, jazz, pop songs, movie soundtracks, and some oriental music. I also like to improvise and come up with my own stuff sometimes. It's become a way for me to relax and express myself.</p>

            <p>Looking back, I'm glad I gave it another shot. It taught me that it's okay to walk away from something and come back to it later, and that persistence usually pays off even when things don't start out great.</p>
            
            <p><a 
              href="#performances" 
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('performances');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >View My Piano Performances <i className="fas fa-arrow-down"></i></a></p>
          </div>

          {/* YouTube Performances Section */}
          <div className="performances-section" id="performances">
            <h2>Piano Performances</h2>
            <p className="section-intro">Here are some of my piano performances organized by different aspects of my musical journey.</p>
            
            {/* Duet with Friends Section */}
            <div className="performance-category">
              <h3><i className="fas fa-users"></i> Duet with Friends</h3>
              <p className="category-description">Collaborative performances with friends and fellow musicians.</p>
              
              <div className="videos-grid">
                {/* Tufts CSA Formal - Yellow */}
                <div className="video-card">
                  <div className="video-thumbnail">
                    <iframe 
                      src="https://www.youtube.com/embed/ESv27FFFxkU" 
                      title="Yellow - Coldplay (Tufts CSA Formal)"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                  <div className="video-info">
                    <h4>Yellow - Coldplay (Katherine Ho Version)</h4>
                    <p>Performed at the Tufts Chinese Student Association Formal with my housemates Roan and Eric on vocals. We only had two practice sessions before the performance.</p>
                    <div className="video-meta">
                      <span className="difficulty">Trio</span>
                      <span className="duration">CSA Formal</span>
                    </div>
                  </div>
                </div>

                {/* Tufts Vietnamese Coffee Shop - Light */}
                <div className="video-card">
                  <div className="video-thumbnail">
                    <iframe 
                      src="https://www.youtube.com/embed/XlFLukgERCU" 
                      title="Light - Wave to Earth (Vietnamese Coffee Shop)"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                  <div className="video-info">
                    <h4>Light - Wave to Earth</h4>
                    <p>Performed at the Tufts Vietnamese Student Culture Club Coffee Shop with my friend Gawon on vocals. The theme was "Light" so this song fit well. I also used LED lights that sync with piano keys through Bluetooth MIDI using a GitHub repo I found.</p>
                    <div className="video-meta">
                      <span className="difficulty">Duet</span>
                      <span className="duration">Coffee Shop</span>
                    </div>
                  </div>
                </div>

                {/* Gurenge with Justin */}
                <div className="video-card">
                  <div className="video-thumbnail">
                    <div className="thumbnail-container">
                      <img src="/static/images/hobbies/piano/justin-piano-duet.jpg" alt="Justin Qiao and Edward Lai Piano & Viola Duet" className="video-thumbnail-img" loading="lazy" />
                      <div className="play-overlay">
                        <a href="https://www.youtube.com/watch?v=Hbk1MypXwY0" target="_blank" rel="noopener noreferrer" className="watch-button">
                          <i className="fab fa-youtube"></i>
                          Watch on YouTube
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="video-info">
                    <h4>Gurenge - LiSA (Piano & Viola)</h4>
                    <p>Collaborative performance with my friend Justin on viola. We played on the same high school volleyball team and decided to try a music collaboration.</p>
                    <div className="video-meta">
                      <span className="difficulty">Duet</span>
                      <span className="duration">Full Video</span>
                    </div>
                  </div>
                </div>

                {/* Pokemon Theme with Kate */}
                <div className="video-card">
                  <div className="video-thumbnail">
                    <iframe 
                      src="https://www.youtube.com/embed/MKek29hEIrY" 
                      title="Gotta Catch 'Em All - Pokemon Theme"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                  <div className="video-info">
                    <h4>Gotta Catch 'Em All - Pokemon Theme</h4>
                    <p>Collaboration with my friend Kate playing the Pokemon theme song.</p>
                    <div className="video-meta">
                      <span className="difficulty">Duet</span>
                      <span className="duration">YouTube Shorts</span>
                    </div>
                  </div>
                </div>

                {/* Collaboration with Emai */}
                <div className="video-card">
                  <div className="video-thumbnail">
                    <iframe 
                      src="https://www.youtube.com/embed/cq2GTBF19hE" 
                      title="Piano Collaboration with Emai"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                  <div className="video-info">
                    <h4>Driver's License - Olivia Rodrigo [Piano Duet]</h4>
                    <p>Piano duet with my sister Emai - we don't get to play together often.</p>
                    <div className="video-meta">
                      <span className="difficulty">Duet</span>
                      <span className="duration">YouTube Shorts</span>
                    </div>
                  </div>
                </div>

                {/* Comethru with Rebecca */}
                <div className="video-card">
                  <div className="video-thumbnail">
                    <iframe 
                      src="https://www.youtube.com/embed/5ukPpMSdI8k" 
                      title="Comethru - Jeremy Zucker [Piano Duet]"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                  <div className="video-info">
                    <h4>Comethru - Jeremy Zucker [Piano Duet]</h4>
                    <p>Piano duet with my friend Rebecca. We practiced during COVID with masks on, which made rehearsals interesting.</p>
                    <div className="video-meta">
                      <span className="difficulty">Duet</span>
                      <span className="duration">YouTube Shorts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Favorite Pieces Section */}
            <div className="performance-category">
              <h3><i className="fas fa-heart"></i> Favorite Pieces</h3>
              <p className="category-description">Personal favorites that I love to play and perform.</p>
              
              <div className="videos-grid">
                {/* Merry-Go-Round Of Life */}
                <div className="video-card">
                  <div className="video-thumbnail">
                    <iframe 
                      src="https://www.youtube.com/embed/V_uyAVF7G6g" 
                      title="Merry-Go-Round Of Life - Joe Hisaishi"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                  <div className="video-info">
                    <h4>Merry-Go-Round Of Life - Joe Hisaishi</h4>
                    <p>From the Studio Ghibli movie Howl's Moving Castle. This is Kyle Landry's arrangement.</p>
                    <div className="video-meta">
                      <span className="difficulty">Advanced</span>
                      <span className="duration">YouTube Shorts</span>
                    </div>
                  </div>
                </div>

                {/* Snowhalation */}
                <div className="video-card">
                  <div className="video-thumbnail">
                    <iframe 
                      src="https://www.youtube.com/embed/5v-TmCWWivM" 
                      title="Snowhalation - Love Live! OST"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                  <div className="video-info">
                    <h4>Snow Halation - Love Live! OST</h4>
                    <p>This piece has a nice winter feel to it.</p>
                    <div className="video-meta">
                      <span className="difficulty">Intermediate</span>
                      <span className="duration">YouTube Shorts</span>
                    </div>
                  </div>
                </div>

                {/* Hacking to the Gate */}
                <div className="video-card">
                  <div className="video-thumbnail">
                    <iframe 
                      src="https://www.youtube.com/embed/_4woMFijPyw" 
                      title="Hacking to the Gate - Ito Kanako"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                  <div className="video-info">
                    <h4>Hacking to the Gate - Ito Kanako</h4>
                    <p>From the Steins;Gate soundtrack. I added some glitch effects to match the show's time travel theme.</p>
                    <div className="video-meta">
                      <span className="difficulty">Advanced</span>
                      <span className="duration">YouTube Shorts</span>
                    </div>
                  </div>
                </div>

                {/* Loser */}
                <div className="video-card">
                  <div className="video-thumbnail">
                    <iframe 
                      src="https://www.youtube.com/embed/xmAIylGoWS0" 
                      title="Loser - Kenshi Yonezu"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                  <div className="video-info">
                    <h4>Loser - Kenshi Yonezu</h4>
                    <p>Kenshi Yonezu is a well-known Japanese artist. This is a jazzy piano arrangement of his song.</p>
                    <div className="video-meta">
                      <span className="difficulty">Intermediate-Advanced</span>
                      <span className="duration">Full Video</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Classical Pieces Section */}
            <div className="performance-category">
              <h3><i className="fas fa-music"></i> Classical Pieces</h3>
              <p className="category-description">Traditional classical repertoire and masterpieces.</p>
              
              <div className="videos-grid">
                {/* Chopin Revolutionary Etude */}
                <div className="video-card">
                  <div className="video-thumbnail">
                    <iframe 
                      src="https://www.youtube.com/embed/YqCZQ_jTLuU" 
                      title="Chopin - Revolutionary Etude Op. 10 No. 12"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                  <div className="video-info">
                    <h4>Chopin - Revolutionary Etude Op. 10 No. 12</h4>
                    <p>I worked on this piece in spring 2020. It's one of the hardest pieces I've learned and I still have room for improvement, but it's my favorite Chopin piece.</p>
                    <div className="video-meta">
                      <span className="difficulty">Advanced</span>
                      <span className="duration">3:01</span>
                    </div>
                  </div>
                </div>

                {/* Brahms Rhapsody */}
                <div className="video-card">
                  <div className="video-thumbnail">
                    <iframe 
                      src="https://www.youtube.com/embed/awgRrKACTio" 
                      title="Brahms - Rhapsody in G Minor, Op.79, No.2"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                  <div className="video-info">
                    <h4>Brahms - Rhapsody in G Minor, Op.79, No.2</h4>
                    <p>I don't normally play Brahms, but this piece has a lot of staccatos which makes it interesting.</p>
                    <div className="video-meta">
                      <span className="difficulty">Advanced</span>
                      <span className="duration">Full Video</span>
                    </div>
                  </div>
                </div>

                {/* Beethoven Moonlight Sonata 3rd Movement */}
                <div className="video-card">
                  <div className="video-thumbnail">
                    <iframe 
                      src="https://www.youtube.com/embed/Sml-MhcTXWI" 
                      title="Beethoven - Moonlight Sonata 3rd Movement"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                  <div className="video-info">
                    <h4>Beethoven - Moonlight Sonata (3rd Movement)</h4>
                    <p>Performed this in a small competition in 2017 - my first competition.</p>
                    <div className="video-meta">
                      <span className="difficulty">Advanced</span>
                      <span className="duration">Competition</span>
                    </div>
                  </div>
                </div>

                {/* Rachmaninoff Preludes */}
                <div className="video-card">
                  <div className="video-thumbnail">
                    <iframe 
                      src="https://www.youtube.com/embed/ZmtXTxyWI3Y" 
                      title="Rachmaninoff - Prelude in C Sharp Minor Op. 3 No. 2"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                  <div className="video-info">
                    <h4>Rachmaninoff - Prelude in C Sharp Minor Op. 3 No. 2</h4>
                    <p>This piece is dramatic and has a gloomy feel to it.</p>
                    <div className="video-meta">
                      <span className="difficulty">Advanced</span>
                      <span className="duration">Full Video</span>
                    </div>
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

export default Piano
