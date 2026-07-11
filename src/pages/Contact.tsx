import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TOPICS = [
  { id: 'job',   label: 'Job opportunity',  placeholder: 'Tell me about the role and team. Links are helpful.' },
  { id: 'collab', label: 'Collaboration',   placeholder: 'What are you working on, and what would we build together?' },
  { id: 'other', label: 'Just saying hi',   placeholder: 'Whatever you want to say.' },
]

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors]     = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const navigate = useNavigate()

  const activePlaceholder = selectedTopic
    ? TOPICS.find(t => t.id === selectedTopic)?.placeholder
    : 'What you are reaching out about, plus any links or timing that help.'

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
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
    if (!validateForm()) return

    setIsSubmitting(true)
    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.name.trim())
    formDataToSend.append('email', formData.email.trim())
    formDataToSend.append('message', formData.message.trim())
    if (selectedTopic) formDataToSend.append('topic', selectedTopic)

    try {
      const response = await fetch('https://formspree.io/f/meokbaaa', {
        method: 'POST',
        body: formDataToSend,
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        navigate('/contact-success')
        return
      }

      let message = 'Something went wrong. Try again, or email me at edwardl9039@gmail.com.'
      try {
        const data = await response.json()
        if (data?.errors?.length && data.errors[0]?.message) {
          message = data.errors[0].message
        }
      } catch { /* keep default */ }
      setSubmitError(message)
    } catch {
      setSubmitError('Network error. Check your connection, or email edwardl9039@gmail.com directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    if (submitError) setSubmitError('')
  }

  const charCount = formData.message.length
  const charWarning = charCount > 800

  return (
    <section id="contact" className="contact">
      <div className="container">

        {/* Header */}
        <header className="contact-header">
          <span className="contact-eyebrow" aria-hidden="true">GET IN TOUCH</span>
          <h1 className="contact-title">Let's talk.</h1>
          <p className="contact-subtitle">
            Jobs, collaborations, chess challenges, or questions about something on the site. I read everything.
          </p>
        </header>

        {/* Topic selector */}
        <div className="contact-topics" role="group" aria-label="What are you reaching out about?">
          {TOPICS.map(topic => (
            <button
              key={topic.id}
              type="button"
              className={`contact-topic-btn${selectedTopic === topic.id ? ' active' : ''}`}
              onClick={() => setSelectedTopic(prev => prev === topic.id ? null : topic.id)}
              aria-pressed={selectedTopic === topic.id}
            >
              {topic.label}
            </button>
          ))}
        </div>

        {/* Form card */}
        <div className="contact-card">
          <form onSubmit={handleSubmit} className="contact-form" noValidate>

            {/* Name + Email row */}
            <div className="contact-form-row">
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
                {errors.name && (
                  <p className="error-message" id="name-error" role="alert">{errors.name}</p>
                )}
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
                {errors.email && (
                  <p className="error-message" id="email-error" role="alert">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div className={`form-group${errors.message ? ' form-group-has-error' : ''}`}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder={activePlaceholder}
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={
                  errors.message ? 'message-error' : 'message-count'
                }
              />
              <div className="contact-form-footer">
                {errors.message ? (
                  <p className="error-message" id="message-error" role="alert">{errors.message}</p>
                ) : (
                  <span />
                )}
                <span
                  id="message-count"
                  className={`contact-char-count${charWarning ? ' contact-char-count-warn' : ''}`}
                  aria-live="polite"
                >
                  {charCount}
                </span>
              </div>
            </div>

            {/* Server error banner */}
            {submitError && (
              <div className="contact-form-banner contact-form-banner-error" role="alert">
                {submitError}
              </div>
            )}

            {/* Submit */}
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="btn-loading">
                  <i className="fas fa-spinner fa-spin" aria-hidden="true" /> Sending
                </span>
              ) : (
                <span className="btn-text">
                  Send message <i className="fas fa-arrow-right" aria-hidden="true" />
                </span>
              )}
            </button>

          </form>
        </div>

        {/* Divider */}
        <div className="contact-divider" aria-hidden="true">
          <span>or reach out directly</span>
        </div>

        {/* Contact methods row */}
        <div className="contact-methods">
          <a
            href="mailto:edwardl9039@gmail.com"
            className="contact-method"
            aria-label="Email Edward at edwardl9039@gmail.com"
          >
            <span className="contact-method-icon" aria-hidden="true">
              <i className="fas fa-envelope" />
            </span>
            <span className="contact-method-body">
              <span className="contact-method-label">Email</span>
              <span className="contact-method-value">edwardl9039@gmail.com</span>
            </span>
            <i className="fas fa-arrow-up-right-from-square contact-method-arrow" aria-hidden="true" />
          </a>

          <a
            href="https://github.com/edwardl903"
            className="contact-method"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Edward's GitHub profile"
          >
            <span className="contact-method-icon" aria-hidden="true">
              <i className="fab fa-github" />
            </span>
            <span className="contact-method-body">
              <span className="contact-method-label">GitHub</span>
              <span className="contact-method-value">edwardl903</span>
            </span>
            <i className="fas fa-arrow-up-right-from-square contact-method-arrow" aria-hidden="true" />
          </a>

          <a
            href="https://www.linkedin.com/in/edward-lai-504b6328b/"
            className="contact-method"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Edward's LinkedIn profile"
          >
            <span className="contact-method-icon" aria-hidden="true">
              <i className="fab fa-linkedin" />
            </span>
            <span className="contact-method-body">
              <span className="contact-method-label">LinkedIn</span>
              <span className="contact-method-value">Edward Lai</span>
            </span>
            <i className="fas fa-arrow-up-right-from-square contact-method-arrow" aria-hidden="true" />
          </a>
        </div>

      </div>
    </section>
  )
}

export default Contact
