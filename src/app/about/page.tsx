import SectionHeaders from "@/components/layout/SectionHeaders";
import PageSection from "@/components/layout/PageSection";

export default function AboutPage() {
  return (
    <PageSection>
      <SectionHeaders subHeader="About Us" mainHeader="Our Story" />

      <div className="mt-10 space-y-6 text-center text-gray-700 leading-relaxed">
        <p className="text-lg">
          At <span className="font-semibold text-red-600">MunchY</span>, great food
          brings people together.
        </p>

        <p>
          Fresh ingredients, bold flavors, and pizzas made with care.
        </p>

        <p>
          One goal: make your day better — one slice at a time 🍕
        </p>
      </div>
    </PageSection>
  );
}
