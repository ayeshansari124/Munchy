const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-red-600">MunchY</span>.
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
