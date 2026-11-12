import "./admin.css";

export const metadata = {
  title: "Admin — ikigaicoding",
  robots: { index: false, follow: false },
};

// Admin shell: no public Navbar/Footer here — the public chrome lives in
// app/(public)/layout.js, so it never renders under /admin. Pages render their own .adm-wrap
// container (AdminApp / LoginForm do; see setup page), so no wrapper here.
export default function AdminLayout({ children }) {
  return <>{children}</>;
}
