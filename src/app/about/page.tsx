import React from 'react'
import SectionHeaders from '@/components/layout/SectionHeaders';

const AboutPage = () => {
   return (
    <section className="bg-white py-6">
      <div className="max-w-5xl mx-auto px-6">

        <SectionHeaders
          subHeader="About Us"
          mainHeader="Our Story"
        />

        <div className="mt-10 space-y-6 text-center text-gray-700 leading-relaxed">
          <p className="text-lg">
            At <span className="font-semibold text-red-600">ST Pizza</span>, we believe that
            great food brings people together. What started as a small passion
            for crafting the perfect pizza has grown into a place where every
            slice tells a story.
          </p>

          <p>
            We focus on using fresh ingredients, bold flavors, and time-tested
            recipes to create pizzas that feel familiar yet exciting. From our
            crispy crusts to our rich sauces and generous toppings, every detail
            is made with care.
          </p>

          <p>
            Whether you’re ordering for a quick lunch, a family dinner, or a
            late-night craving, our goal is simple: serve food that makes your
            day better — one bite at a time.
          </p>
        </div>

      </div>
    </section>
  );
}

export default AboutPage
