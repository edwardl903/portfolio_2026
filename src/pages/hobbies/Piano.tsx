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
            <h2>Piano</h2>
            <p>My path with piano is a little different from most people who stick with it. I had lessons around age 8, had a tough time, and quit pretty fast. Came back in high school and it finally clicked. I didn't start the traditional way either. My first songs were Hall of Fame by The Script, Viva La Vida by Coldplay, and a bunch of movie soundtracks like He's a Pirate and Gravity Falls. That eventually led me to anime OSTs and three YouTube pianists who kind of changed what I thought was possible: Animenz, Theishter, and Kyle Landry. Most of what I play below is their arrangements.</p>

            <p>Nowadays I try to play more by ear than by sheet music, which means more improvising and less drilling. I still love doing duets or putting together little "projects" with people. I've played at some Tufts social events and retirement homes here and there.</p>

            <p>Below are some performances from over the years, mostly stuff I filmed because I liked how it turned out.</p>
            
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
            <p className="section-intro">Duets first, then solos from shows or pop, then classical I studied for lessons.</p>
            
            {/* Duet with Friends Section */}
            <div className="performance-category">
              <h3><i className="fas fa-users"></i> Duet with Friends</h3>
              <p className="category-description">With friends from school or family. Harder to schedule, more fun than playing alone.</p>
              
              <div className="videos-grid">
                {/* Tufts CSA Formal - Yellow */}
                <div className="video-card">
                  <div className="video-thumbnail">
                    <iframe 
                      src="https://www.youtube.com/embed/ESv27FFFxkU" 
                      title="Yellow (Katherine Ho version) - Tufts CSA formal with Roan and Eric"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                  <div className="video-info">
                    <h4>Yellow - Coldplay (Katherine Ho version)</h4>
                    <p>
                      Tufts CSA formal. Roan and Eric sang, I played piano. It is the Katherine Ho version from Crazy Rich
                      Asians, not the original Coldplay track. We had two practices before the show.
                    </p>
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
                      title="Light - Wave to Earth, Tufts Vietnamese Student Culture Club coffee shop"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                  <div className="video-info">
                    <h4>Light - Wave to Earth</h4>
                    <p>
                      Tufts Vietnamese Student Culture Club coffee shop night. Gawon sang. The event was called Light so
                      we used this song. I also hooked up LEDs on the keys over Bluetooth MIDI using code I found on
                      GitHub, mostly because I wanted to see if it would work.
                    </p>
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
                    <h4>Gurenge - LiSA (piano and viola)</h4>
                    <p>
                      Demon Slayer opening with Justin on viola. We met through high school volleyball. Full video is on
                      YouTube if you use the thumbnail link above.
                    </p>
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
                      title="Gotta Catch &apos;Em All - Pokemon theme with Kate"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                  <div className="video-info">
                    <h4>Gotta Catch &apos;Em All - Pokemon Theme</h4>
                    <p>Short with Kate on the Pokemon theme.</p>
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
                      title="Driver&apos;s License - piano duet with Emai"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                  <div className="video-info">
                    <h4>Driver&apos;s License - Olivia Rodrigo (piano duet)</h4>
                    <p>Four hands with my sister Emai. We recorded a short because that was all we had time to learn.</p>
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
                      title="Comethru - Jeremy Zucker, piano duet with Rebecca"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                  <div className="video-info">
                    <h4>Comethru - Jeremy Zucker (piano duet)</h4>
                    <p>
                      With Rebecca. We rehearsed during COVID with masks on so it was harder to hear each other clearly.
                      Same clip as the YouTube Short.
                    </p>
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
              <p className="category-description">Anime, games, and pop songs I learned mostly for fun.</p>
              
              <div className="videos-grid">
                {/* Merry-Go-Round Of Life */}
                <div className="video-card">
                  <div className="video-thumbnail">
                    <iframe 
                      src="https://www.youtube.com/embed/V_uyAVF7G6g" 
                      title="Merry-Go-Round of Life - Howl&apos;s Moving Castle (Joe Hisaishi, Kyle Landry arrangement)"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                  <div className="video-info">
                    <h4>Merry-Go-Round of Life - Joe Hisaishi</h4>
                    <p>
                      From Howl&apos;s Moving Castle. Kyle Landry&apos;s arrangement. Recorded as a short like the other
                      ones in this section.
                    </p>
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
                      title="Snow Halation - Love Live! School idol project"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                  <div className="video-info">
                    <h4>Snow Halation - Love Live! School idol project</h4>
                    <p>Love Live song. I like how it sounds on piano in winter.</p>
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
                      title="Hacking to the Gate - Steins;Gate opening (Kanako Ito)"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                  <div className="video-info">
                    <h4>Hacking to the Gate - Kanako Ito</h4>
                    <p>
                      Steins;Gate opening. The glitchy jumps in the video are from editing afterward, not something I did
                      live at the keyboard.
                    </p>
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
                    <p>Jazzy piano version of a Kenshi Yonezu song I already listened to a lot.</p>
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
              <p className="category-description">Pieces from lessons and a couple competitions.</p>
              
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
                    <h4>Chopin - Revolutionary Etude, Op. 10 No. 12</h4>
                    <p>
                      I worked on this in spring 2020. It is still messy in places when I watch it back, but it was my
                      favorite Chopin etude at the time.
                    </p>
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
                    <h4>Brahms - Rhapsody in G minor, Op. 79 No. 2</h4>
                    <p>
                      I do not play much Brahms usually. I picked this one because of the fast staccato sections and the
                      way the phrases repeat.
                    </p>
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
                    <h4>Beethoven - Moonlight Sonata, third movement</h4>
                    <p>Small competition in 2017. First time I played in front of judges.</p>
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
                    <h4>Rachmaninoff - Prelude in C-sharp minor, Op. 3 No. 2</h4>
                    <p>Slow piece with a lot of low notes. I learned it because I liked how heavy it sounds.</p>
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
