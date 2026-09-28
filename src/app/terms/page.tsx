import { Metadata } from 'next'
import { SEO } from '@/lib/seo'
import SeoPageShell from '@/components/SeoPageShell'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | InvitingYou',
  description: 'Commercial terms and service agreement for ordering digital wedding invitations from InvitingYou.',
  alternates: {
    canonical: `${SEO.siteUrl}/terms`,
  },
}

export default function TermsPage() {
  return (
    <SeoPageShell pageName="Terms of Service">
      <div style={{ background: 'var(--surface-2)', minHeight: '100vh', padding: '10rem 0 6rem' }}>
        <div className="iy-wrap" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--brown)', marginBottom: '2rem' }}>Terms of Service</h1>
          
          <div style={{ background: 'var(--surface)', padding: 'clamp(2rem, 5vw, 4rem)', borderRadius: '16px', border: '1px solid var(--border)' }}>
            
            <section style={{ marginBottom: '3rem' }}>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Welcome to InvitingYou. By placing an order and using our digital wedding invitation services, you agree to the following terms and conditions.
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--brown)', marginBottom: '1rem' }}>1. Service Description</h2>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7 }}>
                InvitingYou provides a service to personalize and host digital wedding invitations based on our pre-designed templates. We customize the selected template with the information, photographs, and media you provide. 
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--brown)', marginBottom: '1rem' }}>2. Pricing and Payment Structure</h2>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                Our current launch pricing for a personalized digital invitation is <strong>₹1,499</strong>. 
              </p>
              <ul style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, paddingLeft: '1.5rem' }}>
                <li>An advance payment of <strong>₹999</strong> is required to commence work on your personalization.</li>
                <li>The remaining balance of <strong>₹500</strong> is due upon review and final delivery of the invitation link.</li>
              </ul>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--brown)', marginBottom: '1rem' }}>3. Customer Responsibilities</h2>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7 }}>
                You are responsible for ensuring that all information provided to us (such as names, dates, times, and venue addresses) is accurate. You also confirm that you have the right and permission to use any photographs or content you supply to us for inclusion in the invitation.
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--brown)', marginBottom: '1rem' }}>4. Review, Delivery, and Revisions</h2>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                Once we have personalized your invitation, we will provide you with a link to review the work. 
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7 }}>
                <em>[BUSINESS OWNER TO CONFIRM SPECIFIC REVISION POLICY — E.g., the number of included revision rounds before an additional fee applies.]</em>
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, marginTop: '1rem' }}>
                After final approval and payment of the remaining balance, the final invitation URL will be made available for you to share with your guests. Delivery timelines are agreed upon at the time of placing the order.
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--brown)', marginBottom: '1rem' }}>5. Cancellations and Refunds</h2>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7 }}>
                <em>[BUSINESS OWNER TO CONFIRM CANCELLATION AND REFUND POLICY — E.g., conditions under which the ₹999 advance is refundable, if at all, once work has commenced.]</em>
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--brown)', marginBottom: '1rem' }}>6. Technical Limitations & Uptime</h2>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7 }}>
                While we strive to ensure that your invitation is accessible 24/7 leading up to your event, we do not guarantee absolute 100% uptime due to the nature of web hosting and internet infrastructure. We rely on standard third-party services for hosting and are not liable for brief interruptions out of our direct control.
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--brown)', marginBottom: '1rem' }}>7. Intellectual Property</h2>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7 }}>
                The design, code, structure, and templates of the digital invitations remain the intellectual property of InvitingYou. You are purchasing a hosted service to use the personalized design for your specific event, not the underlying source code or exclusive rights to the template.
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--brown)', marginBottom: '1rem' }}>8. Privacy</h2>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7 }}>
                Your use of our service is also governed by our <Link href="/privacy" style={{ color: 'var(--brown)', textDecoration: 'underline' }}>Privacy Policy</Link>, which outlines how we handle your event details and media.
              </p>
            </section>

            <section>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--brown)', marginBottom: '1rem' }}>9. Contact</h2>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7 }}>
                For any questions regarding these terms or your order, please visit our <Link href="/contact" style={{ color: 'var(--brown)', textDecoration: 'underline' }}>Contact Page</Link>.
              </p>
            </section>

          </div>
        </div>
      </div>
    </SeoPageShell>
  )
}
