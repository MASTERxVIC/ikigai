import SetupForm from "../../../components/admin/SetupForm";

export const metadata = {
  title: "Admin setup — ikigaicoding",
  robots: { index: false, follow: false },
};

export default function AdminSetupPage() {
  return (
    <div className="adm-wrap">
      <SetupForm />
    </div>
  );
}
