import { StrictMode, Suspense, lazy, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import { I18nProvider } from "./i18n";
import { RegisterModalProvider } from "./context/RegisterModalContext";
import { CheckoutProvider } from "./checkout/CheckoutContext";
import ScrollToTop from "./components/ScrollToTop";
import "./index.css";

// Core marketing (instant mount on initial paint) + course pages (code-split)
import Home from "./designs/one/CinematicScroll.tsx";
const Valorant = lazy(() => import("./pages/valorant/ValorantA.tsx"));
const BGMI = lazy(() => import("./pages/bgmi/BGMI.tsx"));
const Coaching = lazy(() => import("./pages/careers/Coaching.tsx"));
const TournamentOps = lazy(() => import("./pages/careers/TournamentOps.tsx"));

// Checkout + legal
const Thanks = lazy(() => import("./pages/thanks/Thanks.tsx"));
const LegalPage = lazy(() => import("./pages/legal/LegalPage.tsx"));

// Talent directory — gated + noindex until public launch (TALENT_GATED=1)
const TalentGate = lazy(() => import("./pages/talent/TalentGate.tsx"));
const Directory = lazy(() => import("./pages/talent/Directory.tsx"));
const Profile = lazy(() => import("./pages/talent/Profile.tsx"));
const Claim = lazy(() => import("./pages/talent/Claim.tsx"));
const Edit = lazy(() => import("./pages/talent/Edit.tsx"));
const Verify = lazy(() => import("./pages/talent/Verify.tsx"));
const Admin = lazy(() => import("./pages/admin/Admin.tsx"));

const NotFound = lazy(() => import("./components/NotFound.tsx"));

function Loader() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "grid",
        placeItems: "center",
        background: "#0a0a0b",
        color: "#d9ab4d",
        fontFamily: "Chakra Petch, sans-serif",
        letterSpacing: "0.3em",
        fontSize: 13,
        textTransform: "uppercase",
      }}
    >
      Loading…
    </div>
  );
}

const page = (el: ReactNode) => <Suspense fallback={<Loader />}>{el}</Suspense>;
const gated = (el: ReactNode) => (
  <Suspense fallback={<Loader />}>
    <TalentGate>{el}</TalentGate>
  </Suspense>
);

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/valorant", element: page(<Valorant />) },
      { path: "/bgmi", element: page(<BGMI />) },
      { path: "/coaching", element: page(<Coaching />) },
      { path: "/tournament-ops", element: page(<TournamentOps />) },

      // Checkout + legal
      { path: "/thanks", element: page(<Thanks />) },
      { path: "/terms", element: page(<LegalPage slug="terms" />) },
      { path: "/privacy", element: page(<LegalPage slug="privacy" />) },
      { path: "/refunds", element: page(<LegalPage slug="refunds" />) },
      { path: "/contact", element: page(<LegalPage slug="contact" />) },

      // Talent directory (gated pre-launch)
      { path: "/talent", element: gated(<Directory />) },
      { path: "/talent/claim/:token", element: gated(<Claim />) },
      { path: "/talent/edit", element: gated(<Edit />) },
      { path: "/talent/:handle", element: gated(<Profile />) },
      { path: "/verify/:id", element: gated(<Verify />) },
      { path: "/admin", element: gated(<Admin />) },

      // Preserve compatibility with earlier course URLs.
      { path: "/valorant/a", element: <Navigate to="/valorant" replace /> },
      { path: "/valorant/b", element: <Navigate to="/valorant" replace /> },

      // Branded 404
      { path: "*", element: page(<NotFound />) },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <RegisterModalProvider>
        <CheckoutProvider>
          <RouterProvider router={router} />
        </CheckoutProvider>
      </RegisterModalProvider>
    </I18nProvider>
  </StrictMode>
);
