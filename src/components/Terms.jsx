import React from 'react'
import './Terms.css'

function Terms() {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-content">
          <h1>Terms of Service</h1>
          <p className="legal-updated">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Ping ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2>2. Description of Service</h2>
            <p>
              Ping is an SMS-first assistant service designed for college students, clubs, teaching assistants, and departments. The Service provides calendar synchronization, event notifications, RSVP management, and automated reminders via SMS.
            </p>
          </section>

          <section>
            <h2>3. User Accounts and Registration</h2>
            <p>
              To use certain features of the Service, you may be required to register for an account. You agree to:
            </p>
            <ul>
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and update your information to keep it accurate, current, and complete</li>
              <li>Maintain the security of your password and identification</li>
              <li>Accept all responsibility for activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
          </section>

          <section>
            <h2>4. SMS and Communication Consent</h2>
            <p>
              By providing your phone number and joining our waitlist or using the Service, you expressly consent to receive SMS messages from Ping, including:
            </p>
            <ul>
              <li>Event notifications and reminders</li>
              <li>Calendar updates and changes</li>
              <li>Service-related communications</li>
              <li>Marketing messages (you may opt out at any time)</li>
            </ul>
            <p>
              Message and data rates may apply. You can opt out of marketing messages at any time by replying STOP to any message or contacting us directly.
            </p>
          </section>

          <section>
            <h2>5. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Service for any illegal purpose or in violation of any laws</li>
              <li>Transmit any harmful code, viruses, or malicious software</li>
              <li>Attempt to gain unauthorized access to the Service or related systems</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Use the Service to send spam or unsolicited messages</li>
              <li>Impersonate any person or entity or misrepresent your affiliation</li>
            </ul>
          </section>

          <section>
            <h2>6. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are owned by Ping and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2>7. Privacy</h2>
            <p>
              Your use of the Service is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices regarding the collection and use of your information.
            </p>
          </section>

          <section>
            <h2>8. Payment and Billing</h2>
            <p>
              If you purchase a subscription or paid features:
            </p>
            <ul>
              <li>Payment will be charged to your payment method at the time of purchase</li>
              <li>Subscriptions automatically renew unless cancelled</li>
              <li>You may cancel your subscription at any time</li>
              <li>Refunds are subject to our refund policy</li>
              <li>SMS overages are billed at $0.01 per message</li>
            </ul>
          </section>

          <section>
            <h2>9. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use the Service will cease immediately.
            </p>
          </section>

          <section>
            <h2>10. Disclaimer of Warranties</h2>
            <p>
              The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the Service will be uninterrupted, secure, or error-free.
            </p>
          </section>

          <section>
            <h2>11. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Ping shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
            </p>
          </section>

          <section>
            <h2>12. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of any material changes via email or through the Service. Your continued use of the Service after such modifications constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2>13. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
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

export default Terms


