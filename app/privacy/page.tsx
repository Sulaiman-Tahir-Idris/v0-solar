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

export default function PrivacyPolicy() {
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
                <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="prose prose-green max-w-none">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

            <p className="text-muted-foreground mb-6">Last updated: June 13, 2025</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              EcoSolar ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how
              we collect, use, disclose, and safeguard your information when you visit our website ecosolar.com and use
              our services.
            </p>
            <p>
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy,
              please do not access the site.
            </p>
            <p>
              We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert
              you about any changes by updating the "Last updated" date of this Privacy Policy. You are encouraged to
              periodically review this Privacy Policy to stay informed of updates.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Collection of Your Information</h2>
            <p>
              We may collect information about you in a variety of ways. The information we may collect via the Site
              includes:
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Personal Data</h3>
            <p>
              Personally identifiable information, such as your name, shipping address, email address, and telephone
              number, and demographic information, such as your age, gender, hometown, and interests, that you
              voluntarily give to us when you register with the Site or when you choose to participate in various
              activities related to the Site, such as online chat and message boards. You are under no obligation to
              provide us with personal information of any kind, however your refusal to do so may prevent you from using
              certain features of the Site.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Derivative Data</h3>
            <p>
              Information our servers automatically collect when you access the Site, such as your IP address, your
              browser type, your operating system, your access times, and the pages you have viewed directly before and
              after accessing the Site.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Financial Data</h3>
            <p>
              Financial information, such as data related to your payment method (e.g., valid credit card number, card
              brand, expiration date) that we may collect when you purchase, order, return, exchange, or request
              information about our services from the Site. We store only very limited, if any, financial information
              that we collect. Otherwise, all financial information is stored by our payment processor, and you are
              encouraged to review their privacy policy and contact them directly for responses to your questions.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Mobile Device Data</h3>
            <p>
              Device information, such as your mobile device ID, model, and manufacturer, and information about the
              location of your device, if you access the Site from a mobile device.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Use of Your Information</h2>
            <p>
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized
              experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Create and manage your account.</li>
              <li>Process your orders and manage your transactions.</li>
              <li>Email you regarding your account or order.</li>
              <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
              <li>Notify you of updates to the Site.</li>
              <li>Offer new products, services, and/or recommendations to you.</li>
              <li>Perform other business activities as needed.</li>
              <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
              <li>Process payments and refunds.</li>
              <li>Request feedback and contact you about your use of the Site.</li>
              <li>Resolve disputes and troubleshoot problems.</li>
              <li>Respond to product and customer service requests.</li>
              <li>Send you a newsletter.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Disclosure of Your Information</h2>
            <p>
              We may share information we have collected about you in certain situations. Your information may be
              disclosed as follows:
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">By Law or to Protect Rights</h3>
            <p>
              If we believe the release of information about you is necessary to respond to legal process, to
              investigate or remedy potential violations of our policies, or to protect the rights, property, and safety
              of others, we may share your information as permitted or required by any applicable law, rule, or
              regulation. This includes exchanging information with other entities for fraud protection and credit risk
              reduction.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Third-Party Service Providers</h3>
            <p>
              We may share your information with third parties that perform services for us or on our behalf, including
              payment processing, data analysis, email delivery, hosting services, customer service, and marketing
              assistance.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Marketing Communications</h3>
            <p>
              With your consent, or with an opportunity for you to withdraw consent, we may share your information with
              third parties for marketing purposes, as permitted by law.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Interactions with Other Users</h3>
            <p>
              If you interact with other users of the Site, those users may see your name, profile photo, and
              descriptions of your activity, including sending invitations to other users, chatting with other users,
              liking posts, following blogs.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Online Postings</h3>
            <p>
              When you post comments, contributions or other content to the Site, your posts may be viewed by all users
              and may be publicly distributed outside the Site in perpetuity.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal
              information. While we have taken reasonable steps to secure the personal information you provide to us,
              please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method
              of data transmission can be guaranteed against any interception or other type of misuse. Any information
              disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot
              guarantee complete security if you provide personal information.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Policy for Children</h2>
            <p>
              We do not knowingly solicit information from or market to children under the age of 13. If you become
              aware of any data we have collected from children under age 13, please contact us using the contact
              information provided below.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Controls for Do-Not-Track Features</h2>
            <p>
              Most web browsers and some mobile operating systems include a Do-Not-Track ("DNT") feature or setting you
              can activate to signal your privacy preference not to have data about your online browsing activities
              monitored and collected. No uniform technology standard for recognizing and implementing DNT signals has
              been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that
              automatically communicates your choice not to be tracked online. If a standard for online tracking is
              adopted that we must follow in the future, we will inform you about that practice in a revised version of
              this Privacy Policy.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Options Regarding Your Information</h2>
            <p>You may at any time review or change the information in your account or terminate your account by:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Logging into your account settings and updating your account</li>
              <li>Contacting us using the contact information provided below</li>
            </ul>
            <p>
              Upon your request to terminate your account, we will deactivate or delete your account and information
              from our active databases. However, some information may be retained in our files to prevent fraud,
              troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with legal
              requirements.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
            <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>By email: privacy@ecosolar.com</li>
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
