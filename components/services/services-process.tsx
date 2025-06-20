import { Container } from "@/components/ui/container"

export function ServicesProcess() {
  const steps = [
    {
      number: "01",
      title: "Initial Consultation",
      description: "We assess your energy needs, property, and budget to design the perfect solar solution.",
      duration: "1-2 hours",
    },
    {
      number: "02",
      title: "Site Survey & Design",
      description: "Our engineers conduct a detailed site survey and create a custom system design.",
      duration: "2-3 days",
    },
    {
      number: "03",
      title: "Permits & Approvals",
      description: "We handle all necessary permits and utility approvals for your installation.",
      duration: "1-2 weeks",
    },
    {
      number: "04",
      title: "Professional Installation",
      description: "Our certified technicians install your system with precision and care.",
      duration: "1-3 days",
    },
    {
      number: "05",
      title: "System Commissioning",
      description: "We test, commission, and connect your system to ensure optimal performance.",
      duration: "1 day",
    },
    {
      number: "06",
      title: "Ongoing Support",
      description: "Continuous monitoring, maintenance, and support to maximize your investment.",
      duration: "Lifetime",
    },
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Process</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A streamlined approach that ensures your solar installation is completed efficiently and to the highest
            standards.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-600 to-blue-600 hidden lg:block" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="relative flex items-start gap-8">
                {/* Step number */}
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {step.number}
                </div>

                {/* Step content */}
                <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                    <span className="text-sm text-green-600 font-medium bg-green-100 dark:bg-green-900/20 px-3 py-1 rounded-full w-fit">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
