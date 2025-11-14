import React from 'react'
import './CookiePolicy.css'

function CookiePolicy() {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-content">
          <h1>Cookie Policy</h1>
          <p className="legal-updated">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <section>
            <h2>1. What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
          </section>

          <section>
            <h2>2. How We Use Cookies</h2>
            <p>We use cookies and similar tracking technologies to:</p>
            <ul>
              <li>Remember your preferences and settings</li>
              <li>Authenticate you and keep you logged in</li>
              <li>Analyze how you use our Service</li>
              <li>Improve our Service and user experience</li>
              <li>Provide personalized content</li>
            </ul>
          </section>

          <section>
            <h2>3. Types of Cookies We Use</h2>
            
            <h3>3.1 Essential Cookies</h3>
            <p>
              These cookies are necessary for the Service to function properly. They enable core functionality such as security, network management, and accessibility.
            </p>

            <h3>3.2 Performance Cookies</h3>
            <p>
              These cookies help us understand how visitors interact with our Service by collecting and reporting information anonymously.
            </p>

            <h3>3.3 Functionality Cookies</h3>
            <p>
              These cookies allow the Service to remember choices you make and provide enhanced, personalized features.
            </p>

            <h3>3.4 Targeting/Advertising Cookies</h3>
            <p>
              These cookies may be used to deliver relevant advertisements and track the effectiveness of our advertising campaigns.
            </p>
          </section>

          <section>
            <h2>4. Third-Party Cookies</h2>
            <p>
              We may also use third-party cookies from trusted partners for analytics, advertising, and other purposes. These third parties may use cookies to collect information about your online activities across different websites.
            </p>
          </section>

          <section>
            <h2>5. Managing Cookies</h2>
            <p>
              Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or alert you when cookies are being sent. However, if you disable cookies, some features of the Service may not function properly.
            </p>
            <p>To manage cookies in your browser:</p>
            <ul>
              <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
            </ul>
          </section>

          <section>
            <h2>6. Do Not Track Signals</h2>
            <p>
              Some browsers include a "Do Not Track" (DNT) feature that signals to websites you visit that you do not want to have your online activity tracked. Currently, there is no standard for how DNT signals should be interpreted, so we do not respond to DNT signals.
            </p>
          </section>

          <section>
            <h2>7. Changes to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. We will notify you of any material changes by posting the new Cookie Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2>8. Contact Us</h2>
            <p>If you have questions about our use of cookies, please contact us at:</p>
            <p>
              <strong>Email:</strong> help@pingai.com<br />
              <strong>Address:</strong> 95 2nd Ave, New York, NY, 10003
            </p>
          </section>

          <div className="legal-back">
            <a href="#home" onClick={(e) => { e.preventDefault(); window.location.hash = ''; window.scrollTo(0, 0); }}>
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookiePolicy


