import SectionHeaders from "@/components/layout/SectionHeaders";
import PageSection from "@/components/layout/PageSection";

export default function ContactPage() {
  return (
    <PageSection>
      <SectionHeaders subHeader="Contact Us" mainHeader="Get In Touch" />

      <p className="mt-8 text-lg text-gray-700 text-center">
        Questions? Feedback? Cravings?
      </p>

      <div className="mt-10 text-center">
        <p className="text-sm uppercase tracking-widest text-gray-500">
          Call Us
        </p>

        <a
          href="tel:+919322061117"
          className="block mt-2 text-3xl font-extrabold text-red-600 hover:text-red-700"
        >
          +91 93220 61117
        </a>

        <p className="mt-4 text-gray-600">Available 10 AM – 11 PM</p>
      </div>
    </PageSection>
  );
}
