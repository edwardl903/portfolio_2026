import { Link } from 'react-router-dom'

function ContactSuccess() {
  return (
    <section className="contact-success">
      <div className="container">
        <div className="success-content">
          <i className="fas fa-check-circle"></i>
          <h2>Message Sent Successfully!</h2>
          <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
          <Link to="/" className="btn btn-primary">Return to Home</Link>
        </div>
      </div>
    </section>
  )
}

export default ContactSuccess

