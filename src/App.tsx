import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { SmoothScroll } from "./components/motion/SmoothScroll";
import { ScrollProgress } from "./components/motion/ScrollProgress";
import { LiveGlow } from "./components/motion/LiveGlow";
import { HomePage } from "./pages/HomePage";
import { BrandsPage } from "./pages/BrandsPage";
import { BrandPage } from "./pages/BrandPage";
import { useEffect } from "react";

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return null;
}

function AppShell() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <LiveGlow />
      <div className="noise" aria-hidden="true" />
      <Header />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/brands/:brandId" element={<BrandPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || undefined;

  return (
    <BrowserRouter basename={basename}>
      <AppShell />
    </BrowserRouter>
  );
}
