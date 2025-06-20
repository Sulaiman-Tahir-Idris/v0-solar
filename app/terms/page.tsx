import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Container } from "@/components/ui/container"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Terms of Service</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="prose prose-green max-w-none">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

            <p className="text-muted-foreground mb-6">Last updated: June 13, 2025</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to EcoSolar ("Company", "we", "our", "us")! These Terms of Service ("Terms", "Terms of Service")
              govern your use of our website located at ecosolar.com (together or individually "Service") operated by
              EcoSolar.
            </p>
            <p>
              Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and
              disclose information that results from your use of our web pages. Please read it here:{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>
            <p>
              By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of
              the terms then you may not access the Service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Communications</h2>
            <p>
              By creating an Account on our Service, you agree to subscribe to newsletters, marketing or promotional
              materials and other information we may send. However, you may opt out of receiving any, or all, of these
              communications from us by following the unsubscribe link or instructions provided in any email we send.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Purchases</h2>
            <p>
              If you wish to purchase any product or service made available through the Service ("Purchase"), you may be
              asked to supply certain information relevant to your Purchase including, without limitation, your credit
              card number, the expiration date of your credit card, your billing address, and your shipping information.
            </p>
            <p>
              You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment
              method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct
              and complete.
            </p>
            <p>
              The service may employ the use of third-party services for the purpose of facilitating payment and the
              completion of Purchases. By submitting your information, you grant us the right to provide the information
              to these third parties subject to our Privacy Policy.
            </p>
            <p>
              We reserve the right to refuse or cancel your order at any time for reasons including but not limited to:
              product or service availability, errors in the description or price of the product or service, error in
              your order or other reasons.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Contests, Sweepstakes and Promotions</h2>
            <p>
              Any contests, sweepstakes or other promotions (collectively, "Promotions") made available through the
              Service may be governed by rules that are separate from these Terms. If you participate in any Promotions,
              please review the applicable rules as well as our Privacy Policy. If the rules for a Promotion conflict
              with these Terms, the Promotion rules will apply.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Refunds</h2>
            <p>We issue refunds for Contracts within 30 days of the original purchase of the Contract.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Content</h2>
            <p>
              Our Service allows you to post, link, store, share and otherwise make available certain information, text,
              graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or
              through the Service, including its legality, reliability, and appropriateness.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Prohibited Uses</h2>
            <p>
              You may use the Service only for lawful purposes and in accordance with Terms. You agree not to use the
              Service:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>In any way that violates any applicable national or international law or regulation.</li>
              <li>
                For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing
                them to inappropriate content or otherwise.
              </li>
              <li>
                To transmit, or procure the sending of, any advertising or promotional material, including any "junk
                mail", "chain letter," "spam," or any other similar solicitation.
              </li>
              <li>
                To impersonate or attempt to impersonate Company, a Company employee, another user, or any other person
                or entity.
              </li>
              <li>
                In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent,
                or harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Limitation Of Liability</h2>
            <p>
              EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS HARMLESS
              FOR ANY INDIRECT, PUNITIVE, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGE, HOWEVER IT ARISES (INCLUDING
              ATTORNEYS' FEES AND ALL RELATED COSTS AND EXPENSES OF LITIGATION AND ARBITRATION, OR AT TRIAL OR ON
              APPEAL, IF ANY, WHETHER OR NOT LITIGATION OR ARBITRATION IS INSTITUTED), WHETHER IN AN ACTION OF CONTRACT,
              NEGLIGENCE, OR OTHER TORTIOUS ACTION, OR ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT, INCLUDING
              WITHOUT LIMITATION ANY CLAIM FOR PERSONAL INJURY OR PROPERTY DAMAGE, ARISING FROM THIS AGREEMENT AND ANY
              VIOLATION BY YOU OF ANY FEDERAL, STATE, OR LOCAL LAWS, STATUTES, RULES, OR REGULATIONS, EVEN IF COMPANY
              HAS BEEN PREVIOUSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. EXCEPT AS PROHIBITED BY LAW, IF THERE IS
              LIABILITY FOUND ON THE PART OF COMPANY, IT WILL BE LIMITED TO THE AMOUNT PAID FOR THE PRODUCTS AND/OR
              SERVICES, AND UNDER NO CIRCUMSTANCES WILL THERE BE CONSEQUENTIAL OR PUNITIVE DAMAGES. SOME STATES DO NOT
              ALLOW THE EXCLUSION OR LIMITATION OF PUNITIVE, INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE PRIOR
              LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the United States, without
              regard to its conflict of law provisions.
            </p>
            <p>
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
              rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining
              provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us
              regarding our Service and supersede and replace any prior agreements we might have had between us
              regarding the Service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Changes To Service</h2>
            <p>
              We reserve the right to withdraw or amend our Service, and any service or material we provide via Service,
              in our sole discretion without notice. We will not be liable if for any reason all or any part of Service
              is unavailable at any time or for any period. From time to time, we may restrict access to some parts of
              Service, or the entire Service, to users, including registered users.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>By email: support@ecosolar.com</li>
              <li>By phone: +1 (555) 123-4567</li>
              <li>By mail: 123 Solar Way, Sunshine City, CA 94123</li>
            </ul>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
