import Hero from "@/components/layout/Hero";
import MenuItem from "@/components/menu/MenuItem";
import SectionHeaders from "@/components/layout/SectionHeaders";
export default function Home() {
  return (
    <div>
    <Hero />
     <section className="relative bg-white overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-16 text-center">
          <SectionHeaders
            subHeader="OUR MENU"
            mainHeader="Delicious Choices"
          />
        </div>

        {/* MENU GRID */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem /> */}
        </div>

      </div>
    </section>
    </div>
  );
}
