import AdminCapsules from "../../components/admin/AdminCapsules";

const AdminPage = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {/* <h1 className="text-2xl font-bold text-center mb-6">
        Admin Dashboard
      </h1> */}

      <AdminCapsules />

      {/* <p className="text-center text-gray-500 mt-10">
        Choose a section to manage.
      </p> */}
    </section>
  );
};

export default AdminPage;
