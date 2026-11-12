import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CookieBanner from "../../components/CookieBanner";
import IntroSplash from "../../components/IntroSplash";
import DarumaAssistant from "../../components/DarumaAssistant";

// Public layout: the site chrome (Navbar/Footer/splash/assistant) renders
// ONLY for public pages. The admin area (app/admin) has its own layout
// and never sees this chrome.
export default function PublicLayout({ children }) {
  return (
    <>
      <IntroSplash />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
      <DarumaAssistant />
    </>
  );
}
