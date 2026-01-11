import AdminCapsules from "@/components/admin/AdminCapsules";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      <AdminCapsules />
      {children}
    </section>
  );
}
