import React from 'react'
import SectionHeaders from '@/components/layout/SectionHeaders';

const ContactPage = () => {
  return (
    <section className="bg-white py-4">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <SectionHeaders
          subHeader="Contact Us"
          mainHeader="Get In Touch"
        />

        <p className="mt-8 text-lg text-gray-700">
          Have a question, feedback, or craving something special?
          We’d love to hear from you.
        </p>

        <div className="mt-10">
          <p className="text-sm text-gray-500 uppercase tracking-widest">
            Call us
          </p>

          <a
            href="tel:+919322061117"
            className="mt-2 inline-block text-3xl font-extrabold text-red-600 hover:text-red-700 transition"
          >
            +91 93220 61117
          </a>
        </div>

        <p className="mt-6 text-gray-600">
          Available every day from <span className="font-medium">10 AM – 11 PM</span>
        </p>

      </div>
    </section>
  );
}

export default ContactPage
