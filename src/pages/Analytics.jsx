const UMAMI_ANALYTICS_URL = 'https://cloud.umami.is/analytics/us/share/ro275gw9xcSCsLan'

function Analytics() {
  return (
    <section className="analytics-page" aria-label="Site analytics">
      <div className="container">
        <div className="analytics-header">
          <p className="analytics-eyebrow">Open metrics</p>
          <h1 className="analytics-title">Site Analytics</h1>
          <p className="analytics-lede">
            Live traffic for this site (privacy-friendly, no cookies,
            no personal data). I like building things with data, so it felt right
            to leave the numbers out in the open.
          </p>
        </div>

        <div className="analytics-frame-card">
          <div className="analytics-frame-bar">
            <span className="analytics-frame-dot" aria-hidden="true" />
            <span className="analytics-frame-label">umami.is</span>
            <div className="analytics-frame-bar-actions">
              <a
                href={UMAMI_ANALYTICS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="analytics-frame-open"
              >
                Open dashboard <i className="fas fa-external-link-alt" aria-hidden="true" />
              </a>
            </div>
          </div>
          <iframe
            src={UMAMI_ANALYTICS_URL}
            title="Umami site analytics dashboard"
            className="analytics-frame"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </section>
  )
}

export default Analytics
