const UMAMI_ANALYTICS_URL = 'https://cloud.umami.is/analytics/us/share/ro275gw9xcSCsLan'

function Analytics() {
  return (
    <section className="analytics-embed-page" aria-label="Site analytics">
      <div className="analytics-embed-toolbar">
        <span className="analytics-embed-label">Site analytics</span>
        <a
          href={UMAMI_ANALYTICS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="analytics-embed-open"
        >
          Open in Umami <i className="fas fa-external-link-alt" aria-hidden="true" />
        </a>
      </div>
      <iframe
        src={UMAMI_ANALYTICS_URL}
        title="Umami site analytics dashboard"
        className="analytics-embed-frame"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </section>
  )
}

export default Analytics
