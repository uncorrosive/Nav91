import React from 'react';
import { HelpCircle, Map, Navigation2, Compass, Building2, Users } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: Map,
      title: 'Interactive Maps',
      description: 'Explore detailed indoor maps with real-time location tracking and 3D building views.'
    },
    {
      icon: Navigation2,
      title: 'Smart Navigation',
      description: 'Get turn-by-turn directions with landmarks and points of interest along your route.'
    },
    {
      icon: Building2,
      title: 'Building Directory',
      description: 'Access comprehensive building information, floor plans, and amenities.'
    },
    {
      icon: Users,
      title: 'Accessibility First',
      description: 'Routes optimized for all users, including wheelchair-accessible paths and elevators.'
    }
  ];

  const faqs = [
    {
      question: 'How accurate is the indoor navigation?',
      answer: 'Our system provides accuracy within 2-3 meters using a combination of WiFi positioning, Bluetooth beacons, and sensor fusion technology.'
    },
    {
      question: 'Does it work offline?',
      answer: 'Yes! Once you\'ve downloaded the building data, you can navigate without an internet connection.'
    },
    {
      question: 'How do I report an issue?',
      answer: 'Use the Contact page to report any problems or suggest improvements. We value your feedback!'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#4285F4] via-[#34A853] to-[#EA4335] p-0.5 mx-auto">
          <div className="w-full h-full bg-white dark:bg-gray-950 rounded-2xl flex items-center justify-center">
            <HelpCircle className="w-8 h-8 text-[#4285F4]" />
          </div>
        </div>
        <h1 className="text-4xl font-bold gradient-text">How Can We Help?</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          Learn how NavPoint makes indoor navigation simple, intuitive, and accessible for everyone.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="glass-card p-6 rounded-2xl space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#4285F4] to-[#34A853] p-0.5">
              <div className="w-full h-full bg-white dark:bg-gray-950 rounded-[10px] flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-[#4285F4]" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* FAQs Section */}
      <div className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-center gradient-text">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="glass-card rounded-2xl overflow-hidden">
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#4285F4]" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Help Center */}
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold gradient-text">Still Need Help?</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Our support team is here to help you with any questions or concerns.
        </p>
        <div className="flex justify-center gap-4">
          <button className="btn-primary">
            Contact Support
          </button>
          <button className="btn-secondary">
            View Documentation
          </button>
        </div>
      </div>
    </div>
  );
}