import MenuItem from "./MenuItem";
import SectionHeaders from "../layout/SectionHeaders";

const HomeMenu = () => {
  return (
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
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </div>

      </div>
    </section>
  );
};

export default HomeMenu;
