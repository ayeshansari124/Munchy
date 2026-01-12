import { ChevronDown } from "lucide-react";

const Accordion = ({ title, open, toggle, children }: any) => (
  <div className="border rounded-xl overflow-hidden">
    <button
      type="button"
      onClick={toggle}
      className="w-full flex justify-between items-center px-5 py-3 font-semibold bg-gray-50"
    >
      <span>{title}</span>
      <ChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
    </button>

    <div
      className={`grid transition-all duration-300 ${
        open ? "grid-rows-[1fr] p-5" : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  </div>
);

export default Accordion;
