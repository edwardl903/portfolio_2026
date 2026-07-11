function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <p className="footer-copy">&copy; {year} Edward Lai</p>

          <div className="footer-social">
            <a
              href="https://github.com/edwardl903"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <i className="fab fa-github" aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/edward-lai-504b6328b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin" aria-hidden="true" />
            </a>
            <a href="mailto:edwardl9039@gmail.com" aria-label="Email">
              <i className="fas fa-envelope" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
