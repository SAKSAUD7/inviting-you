import { Metadata } from 'next'
import { SEO } from '@/lib/seo'
import SeoPageShell from '@/components/SeoPageShell'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | InvitingYou',
  description: 'How InvitingYou handles and protects your personal information and event details.',
  alternates: {
    canonical: `${SEO.siteUrl}/privacy`,
  },
}

export default function PrivacyPage() {
  return (
    <SeoPageShell pageName="Privacy Policy">
      <div style={{ background: 'var(--surface-2)', minHeight: '100vh', padding: '10rem 0 6rem' }}>
        <div className="iy-wrap" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--brown)', marginBottom: '2rem' }}>Privacy Policy</h1>
          
          <div style={{ background: 'var(--surface)', padding: 'clamp(2rem, 5vw, 4rem)', borderRadius: '16px', border: '1px solid var(--border)' }}>
            
            <section style={{ marginBottom: '3rem' }}>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                At InvitingYou, we are committed to protecting the privacy of your special moments. This Privacy Policy explains how we collect, use, and safeguard the information you provide when ordering and using our digital wedding invitation services.
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--brown)', marginBottom: '1rem' }}>Information We Collect</h2>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                To create your personalized digital invitation, we collect information that you explicitly provide to us, which may include:
              </p>
              <ul style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, paddingLeft: '1.5rem' }}>
                <li>Your names and the names of relevant family members</li>
                <li>Wedding or event details (dates, times, venue locations)</li>
                <li>Photographs you wish to include in the invitation</li>
                <li>Your contact information (such as WhatsApp number and email) for communication</li>
                <li>Guest RSVP information (if the RSVP feature is utilized on your invitation)</li>
                <li>Payment-related information required to process your order</li>
              </ul>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--brown)', marginBottom: '1rem' }}>How We Use Your Information</h2>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                The information you provide is used solely for the following purposes:
              </p>
              <ul style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, paddingLeft: '1.5rem' }}>
                <li>To design, build, and host your personalized digital wedding invitation.</li>
                <li>To communicate with you regarding your order, revisions, and delivery, primarily via WhatsApp when initiated by you.</li>
                <li>To facilitate the RSVP collection process for your guests.</li>
              </ul>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, marginTop: '1rem' }}>
                We <strong>never</strong> use your private event details, photographs, or contact information for our public portfolio or marketing materials without obtaining your explicit prior consent.
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--brown)', marginBottom: '1rem' }}>Information Storage and Access</h2>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7 }}>
                Your private invitations are configured so that they are not indexed by search engines (like Google). The URL to your invitation is shared only with you, and it is your choice whom you share it with. Only the InvitingYou team members directly involved in creating your invitation have access to your raw provided materials.
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--brown)', marginBottom: '1rem' }}>Analytics</h2>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7 }}>
                We use Google Analytics on our main public website (such as our template gallery and informational pages) to understand how visitors interact with our site. We do <strong>not</strong> track or expose personally identifiable customer data through Analytics on your private invitation pages.
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--brown)', marginBottom: '1rem' }}>Retention and Deletion</h2>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7 }}>
                We retain your invitation and the associated data for as long as necessary to fulfill the service (typically until after your event has concluded). If you wish to have your invitation taken offline or your data deleted at any time after the event, you may request this by contacting us.
              </p>
            </section>

            <section>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--brown)', marginBottom: '1rem' }}>Contact Us</h2>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7 }}>
                If you have any questions or concerns regarding this Privacy Policy or how your data is handled, please reach out to us via our <Link href="/contact" style={{ color: 'var(--brown)', textDecoration: 'underline' }}>Contact Page</Link>.
              </p>
            </section>

          </div>
        </div>
      </div>
    </SeoPageShell>
  )
}
