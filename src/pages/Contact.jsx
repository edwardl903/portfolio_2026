import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter a valid name (at least 2 characters)'
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
      newErrors.message = 'Please enter a message (at least 10 characters)'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    // Submit to Formspree
    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.name)
    formDataToSend.append('email', formData.email)
    formDataToSend.append('message', formData.message)
    
    try {
      const response = await fetch('https://formspree.io/f/meokbaaa', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (response.ok) {
        navigate('/contact-success')
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-header">
          <h2>Get In Touch</h2>
          <p className="contact-subtitle">I'm always interested in hearing about new opportunities, interesting projects, or just want to chat about data, chess, or anything else!</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form" id="contactForm">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
                <div className="error-message">{errors.name}</div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
                <div className="error-message">{errors.email}</div>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="6" 
                  value={formData.message}
                  onChange={handleChange}
                  required 
                  placeholder="Tell me about your project, opportunity, or just say hello!"
                ></textarea>
                <div className="error-message">{errors.message}</div>
              </div>
              
              <div className="form-group">
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  <span className="btn-text" style={{ display: isSubmitting ? 'none' : 'inline' }}>Send Message</span>
                  <span className="btn-loading" style={{ display: isSubmitting ? 'inline-flex' : 'none' }}>
                    <i className="fas fa-spinner fa-spin"></i> Sending...
                  </span>
                </button>
              </div>
            </form>
          </div>
          
          <div className="contact-info-container">
            <div className="contact-info">
              <h3>Let's Connect</h3>
              <p>Feel free to reach out through any of these channels:</p>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <p>edwardl9039@gmail.com</p>
                  <a href="mailto:edwardl9039@gmail.com" className="contact-link">Send Email</a>
                </div>
              </div>
              
              <div className="social-links">
                <h4>Follow Me</h4>
                <div className="social-icons">
                  <a href="https://github.com/edwardl903" title="GitHub" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/edward-lai" title="LinkedIn" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="https://www.chesslytics.xyz" title="ChessLytics" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-chess"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

