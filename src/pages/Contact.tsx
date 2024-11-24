import React from 'react';
import { MessageCircle, Mail, Phone, MapPin, Send } from 'lucide-react';

export function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#4285F4] via-[#34A853] to-[#EA4335] p-0.5 mx-auto">
            <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-[#4285F4]" />
            </div>
          </div>
          <h1 className="text-4xl font-bold gradient-text">Get in Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Have questions or feedback? We'd love to hear from you. Choose your preferred way to reach us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="space-y-4">
            {[
              { icon: Mail, title: 'Email Us', info: 'support@navpoint.app', color: '#4285F4' },
              { icon: Phone, title: 'Call Us', info: '+1 (802) 555-0123', color: '#34A853' },
              { icon: MapPin, title: 'Visit Us', info: 'Burlington, VT 05401', color: '#EA4335' }
            ].map((method, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl space-y-3 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#4285F4] to-[#34A853] p-0.5">
                  <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                    <method.icon className="w-6 h-6" style={{ color: method.color }} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{method.title}</h3>
                <p className="text-gray-600">{method.info}</p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8 rounded-2xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    className="input-field min-h-[150px] resize-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="mt-16 text-center space-y-6">
          <h2 className="text-2xl font-bold gradient-text">Looking for Quick Answers?</h2>
          <p className="text-gray-600">
            Check out our comprehensive FAQ section for immediate assistance.
          </p>
          <button className="btn-secondary">
            View FAQ
          </button>
        </div>
      </div>
    </div>
  );
}