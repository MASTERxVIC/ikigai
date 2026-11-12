import { cookies } from "next/headers";
import { verifySessionToken, getSetupState } from "../../lib/auth.js";
import LoginForm from "../../components/admin/LoginForm";
import AdminApp from "../../components/admin/AdminApp";

export const metadata = {
  robots: { index: false, follow: false },
};

/**
 * /admin — server component.
 * Session is checked via lib/auth.js:
 *   verifySessionToken(cookieValue) -> payload object | null
 *   getSetupState() -> { dbAvailable, setupDone, doc }
 * If the DB is unreachable, getSetupState reports dbAvailable: false and
 * setupDone: false — in that case the session cookie alone decides.
 * NOTE: only these two named exports are used here. Referencing any other
 * auth export name breaks the Turbopack build (it statically checks
 * namespace imports), so do not add fallback branches for other names.
 */
async function getAdminState() {
  let authed = false;
  let setupDone = true;
  let dbAvailable = true;
  try {
    const store = await cookies();
    const token = store.get("ikigai_admin")?.value || null;
    authed = Boolean(token && verifySessionToken(token));

    const s = await getSetupState();
    setupDone = s ? s.setupDone !== false : true;
    dbAvailable = s ? s.dbAvailable !== false : true;
  } catch {
    // lib/auth.js missing or broken — show the login form, never the app.
    authed = false;
  }
  return { authed, setupDone, dbAvailable };
}

export default async function AdminPage() {
  const { authed, setupDone, dbAvailable } = await getAdminState();

  // A valid session token only exists after setup + login, so an authed
  // visitor always gets the app, even if the setup-state read failed.
  if (authed) {
    return <AdminApp />;
  }

  // Not authed and setup genuinely not done (DB reachable) → setup link.
  if (dbAvailable && !setupDone) {
    return (
      <div className="adm-wrap">
      <div className="adm-card">
        <div className="adm-loginbox">
          <div className="adm-eyebrow">ikigaicoding • Staff only</div>
          <h2 style={{ marginTop: 8 }}>Setup not finished</h2>
          <p className="adm-sub">
            The admin login has not been set up yet. Finish the one-time setup first — you will need the setup code from the server environment.
          </p>
          <a href="/admin/setup" className="adm-btn adm-btn-gold adm-btn-block" style={{ marginTop: 18 }}>
            Continue setup →
          </a>
        </div>
      </div>
      </div>
    );
  }

  return (
    <div className="adm-wrap">
      <LoginForm />
    </div>
  );
}
