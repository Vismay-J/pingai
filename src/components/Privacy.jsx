import React from 'react'
import './Privacy.css'

function Privacy() {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-content">
          <h1>Privacy Policy</h1>
          <p className="legal-updated">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <section>
            <h2>1. Introduction</h2>
            <p>
              Ping ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our SMS-first assistant service.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            
            <h3>2.1 Information You Provide</h3>
            <ul>
              <li><strong>Account Information:</strong> Name, phone number, and password</li>
              <li><strong>Waitlist Information:</strong> Phone number and name (optional) when joining our waitlist</li>
              <li><strong>Calendar Data:</strong> Calendar events, schedules, and related information you choose to sync</li>
              <li><strong>Profile Information:</strong> Preferences, settings, and other information you provide</li>
              <li><strong>Communication Data:</strong> Messages, feedback, and support requests</li>
            </ul>

            <h3>2.2 Information Automatically Collected</h3>
            <ul>
              <li><strong>Usage Data:</strong> How you interact with the Service, features used, and time spent</li>
              <li><strong>Device Information:</strong> Device type, operating system, browser type, and IP address</li>
              <li><strong>Log Data:</strong> Server logs, error reports, and diagnostic information</li>
              <li><strong>Location Data:</strong> General location information (if you enable location services)</li>
            </ul>

            <h3>2.3 Information from Third Parties</h3>
            <ul>
              <li>Calendar data from Google Calendar, Outlook, or other calendar services you connect</li>
              <li>Learning Management System (LMS) data from Canvas, Brightspace, or other LMS platforms</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve the Service</li>
              <li>Send SMS notifications, reminders, and updates</li>
              <li>Sync your calendar and LMS data</li>
              <li>Process transactions and manage your account</li>
              <li>Send you service-related communications</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Detect, prevent, and address technical issues and security threats</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2>4. SMS and Text Message Communications</h2>
            <p>
              By providing your phone number, you consent to receive SMS messages from Ping. We may send you:
            </p>
            <ul>
              <li>Event notifications and reminders</li>
              <li>Calendar updates and changes</li>
              <li>Service-related messages</li>
              <li>Marketing messages (you can opt out at any time)</li>
            </ul>
            <p>
              <strong>Message and data rates may apply.</strong> You can opt out by replying STOP to any message or contacting us directly. Standard message and data rates may apply for messages sent to and from us.
            </p>
          </section>

          <section>
            <h2>5. Information Sharing and Disclosure</h2>
            <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
            
            <h3>5.1 Service Providers</h3>
            <p>We may share information with third-party service providers who perform services on our behalf, such as:</p>
            <ul>
              <li>SMS delivery services</li>
              <li>Cloud hosting and storage providers</li>
              <li>Payment processors</li>
              <li>Analytics providers</li>
            </ul>

            <h3>5.2 Legal Requirements</h3>
            <p>We may disclose information if required by law or in response to valid requests by public authorities.</p>

            <h3>5.3 Business Transfers</h3>
            <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</p>
          </section>

          <section>
            <h2>6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2>7. Data Retention</h2>
            <p>
              We retain your information for as long as necessary to provide the Service, comply with legal obligations, resolve disputes, and enforce our agreements. When you delete your account, we will delete or anonymize your personal information, except where we are required to retain it by law.
            </p>
          </section>

          <section>
            <h2>8. Your Rights and Choices</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul>
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Opt-Out:</strong> Opt out of marketing communications</li>
              <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
              <li><strong>Objection:</strong> Object to processing of your information</li>
            </ul>
            <p>To exercise these rights, please contact us using the information provided below.</p>
          </section>

          <section>
            <h2>9. Children's Privacy</h2>
            <p>
              The Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>
          </section>

          <section>
            <h2>10. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country.
            </p>
          </section>

          <section>
            <h2>11. California Privacy Rights</h2>
            <p>
              If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect and the right to opt out of the sale of personal information (we do not sell personal information).
            </p>
          </section>

          <section>
            <h2>12. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We may also notify you via email or through the Service.
            </p>
          </section>

          <section>
            <h2>13. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at:</p>
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

export default Privacy


