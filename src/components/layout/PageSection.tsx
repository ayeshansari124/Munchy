export default function PageSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`bg-white py-10 ${className}`}>
      <div className="max-w-5xl mx-auto px-6">
        {children}
      </div>
    </section>
  );
}
