import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Use at least 2 characters.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.'
    }

    if (!formData.message || !formData.message.trim()) {
      newErrors.message = 'Add a message before sending.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.name.trim())
    formDataToSend.append('email', formData.email.trim())
    formDataToSend.append('message', formData.message.trim())

    try {
      const response = await fetch('https://formspree.io/f/meokbaaa', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        navigate('/contact-success')
        return
      }

      let message = 'Something went wrong. Try again, or email me at edwardl9039@gmail.com.'
      try {
        const data = await response.json()
        if (data?.errors?.length) {
          const first = data.errors[0]
          if (first?.message) message = first.message
        }
      } catch {
        /* keep default */
      }
      setSubmitError(message)
    } catch {
      setSubmitError('Network error. Check your connection, or email edwardl9039@gmail.com directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
    if (submitError) setSubmitError('')
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <header className="contact-header">
          <h1 className="contact-title">Contact</h1>
          <p className="contact-subtitle">
            Jobs, collaborations, or random questions about something on the site. I read everything here.
          </p>
        </header>

        <div className="contact-content">
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form" id="contactForm" noValidate>
              <div className={`form-group${errors.name ? ' form-group-has-error' : ''}`}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name ? (
                  <p className="error-message" id="name-error" role="alert">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className={`form-group${errors.email ? ' form-group-has-error' : ''}`}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email ? (
                  <p className="error-message" id="email-error" role="alert">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div className={`form-group${errors.message ? ' form-group-has-error' : ''}`}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="What you are reaching out about, plus any links or timing that help."
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message ? (
                  <p className="error-message" id="message-error" role="alert">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              {submitError ? (
                <div className="contact-form-banner contact-form-banner-error" role="alert">
                  {submitError}
                </div>
              ) : null}

              <div className="form-group form-group-submit">
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="btn-loading">
                      <i className="fas fa-spinner fa-spin" aria-hidden="true" /> Sending
                    </span>
                  ) : (
                    <span className="btn-text">Send message</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          <aside className="contact-info-container" aria-label="Other ways to reach me">
            <div className="contact-info">
              <h2 className="contact-info-heading">Direct</h2>
              <p className="contact-info-lead">If the form is acting up, same inbox:</p>

              <div className="contact-item">
                <div className="contact-icon" aria-hidden="true">
                  <i className="fas fa-envelope" />
                </div>
                <div className="contact-details">
                  <h3 className="contact-details-title">Email</h3>
                  <p className="contact-details-text">edwardl9039@gmail.com</p>
                  <a href="mailto:edwardl9039@gmail.com" className="contact-link">
                    Open in mail app
                  </a>
                </div>
              </div>

              <div className="social-links">
                <h3 className="social-links-title">Links</h3>
                <div className="social-icons">
                  <a href="https://github.com/edwardl903" title="GitHub" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/edward-lai-504b6328b/"
                    title="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin" />
                  </a>
                  <a href="https://www.chesslytics.xyz" title="ChessLytics" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-chess" />
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default Contact
