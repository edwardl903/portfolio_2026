import { Link } from 'react-router-dom'

function ContactSuccess() {
  return (
    <section className="contact-success-page">
      <div className="container">
        <div className="contact-success-card">
          <div className="contact-success-icon" aria-hidden="true">
            <i className="fas fa-check" />
          </div>
          <h1 className="contact-success-title">Message sent</h1>
          <p className="contact-success-text">
            Thanks for writing. I read what comes through here and reply when I can, usually within a couple days.
          </p>
          <div className="contact-success-actions">
            <Link to="/" className="contact-success-btn contact-success-btn-primary">
              Back to home
            </Link>
            <Link to="/contact" className="contact-success-btn contact-success-btn-secondary">
              Send another message
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSuccess
