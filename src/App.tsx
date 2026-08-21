import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Pilot                    = lazy(() => import("./pages/Pilot"));
const HowItWorks               = lazy(() => import("./pages/HowItWorksPage"));
const Roadmap                  = lazy(() => import("./pages/Roadmap"));
const ADN1Detail               = lazy(() => import("./pages/ADN1DetailPage"));
const ATSDetail                = lazy(() => import("./pages/ATSDetailPage"));
const ADN1InAction             = lazy(() => import("./pages/ADN1InActionPage"));
const FounderPage              = lazy(() => import("./pages/FounderPage"));
const EconomicSterilisationPage = lazy(() => import("./pages/EconomicSterilisationPage"));
const Blog796BillionPage       = lazy(() => import("./pages/Blog796BillionPage"));
const BlogBeyondBuzzerPage     = lazy(() => import("./pages/BlogBeyondBuzzerPage"));
const GlossaryESPage           = lazy(() => import("./pages/GlossaryESPage"));
const PrivacyPage              = lazy(() => import("./pages/PrivacyPage"));
const ContactPage              = lazy(() => import("./pages/ContactPage"));
const TermsPage                = lazy(() => import("./pages/TermsPage"));
const CertificationPage        = lazy(() => import("./pages/CertificationPage"));
const StateOfTheftPage         = lazy(() => import("./pages/StateOfTheftPage"));
const InvestorsPage            = lazy(() => import("./pages/InvestorsPage"));
const EnterprisePage           = lazy(() => import("./pages/EnterprisePage"));
const BriefIndex               = lazy(() => import("./pages/BriefIndex"));
const MastheadPage             = lazy(() => import("./pages/MastheadPage"));
const SignalClinical           = lazy(() => import("./pages/SignalClinical"));
const SignalThresholdPage      = lazy(() => import("./pages/SignalThresholdPage"));
const SignalMarkingEvidencePage = lazy(() => import("./pages/SignalMarkingEvidencePage"));
const SignalCCTVScamPage       = lazy(() => import("./pages/SignalCCTVScamPage"));
const SignalSalfordVintedPage  = lazy(() => import("./pages/SignalSalfordVintedPage"));
const SignalSurgeonNotCameraPage = lazy(() => import("./pages/SignalSurgeonNotCameraPage"));
const SignalShopkeeperMathsPage = lazy(() => import("./pages/SignalShopkeeperMathsPage"));
const SignalDMRGMBPage         = lazy(() => import("./pages/SignalDMRGMBPage"));
const SignalFogSecurityPage    = lazy(() => import("./pages/SignalFogSecurityPage"));
const SignalSaferGemsPage      = lazy(() => import("./pages/SignalSaferGemsPage"));
const SignalPoliceThresholdPage = lazy(() => import("./pages/SignalPolicethresholdPage"));
const SignalShopliftingSystemPage = lazy(() => import("./pages/SignalShopliftingSystemPage"));
const SignalCoopCrimeWarPage   = lazy(() => import("./pages/SignalCoopCrimeWarPage"));
const BlogPostPage             = lazy(() => import("./pages/BlogPostPage"));
const ThesisPage               = lazy(() => import("./pages/ThesisPage"));
const ProtocolPage             = lazy(() => import("./pages/ProtocolPage"));

const queryClient = new QueryClient();

/**
 * Route level canonical fallback.
 *
 * Fifteen pages render no SEO component at all. Without this they would keep
 * whichever canonical the previously viewed page left in the tag, which is
 * worse than having none: it tells Google the page is a duplicate of something
 * it is not. PageSEO stamps data-for with its own path, so an explicit
 * canonical is never overwritten here.
 */
function CanonicalFallback() {
  const { pathname } = useLocation();
  useEffect(() => {
    const el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!el) return;
    if (el.getAttribute("data-for") === pathname) return;
    el.href = `https://mykei.io${pathname === "/" ? "" : pathname}`;
    el.setAttribute("data-for", pathname);
  }, [pathname]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CanonicalFallback />
        <Suspense fallback={<div style={{ height: "100vh", background: "#FFFFFF" }} />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pilot" element={<Pilot />} />
            <Route path="/howitworks" element={<HowItWorks />} />
            <Route path="/how-it-works" element={<Navigate to="/howitworks" replace />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/adn" element={<ADN1Detail />} />
            <Route path="/adn-1" element={<Navigate to="/adn" replace />} />
            <Route path="/technology/adn-1" element={<Navigate to="/adn" replace />} />
            <Route path="/technology/ats" element={<ATSDetail />} />
            <Route path="/adn-in-action" element={<ADN1InAction />} />
            <Route path="/adn-1-in-action" element={<Navigate to="/adn-in-action" replace />} />
            <Route path="/founder" element={<FounderPage />} />
            <Route path="/michael-esema" element={<FounderPage />} />
            <Route path="/economic-sterilisation" element={<EconomicSterilisationPage />} />
            <Route path="/economic-sterilization" element={<EconomicSterilisationPage />} />
            <Route path="/blog" element={<Navigate to="/signal" replace />} />
            <Route path="/blog/the-796-billion-problem" element={<Blog796BillionPage />} />
            <Route path="/blog/beyond-the-buzzer" element={<BlogBeyondBuzzerPage />} />
            <Route path="/glossary/economic-sterilisation" element={<GlossaryESPage />} />
            <Route path="/glossary/economic-sterilization" element={<GlossaryESPage />} />
            <Route path="/overview" element={<Navigate to="/howitworks" replace />} />
            <Route path="/evidence" element={<Navigate to="/adn" replace />} />
            <Route path="/thesis" element={<Navigate to="/economic-sterilisation" replace />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/certification" element={<CertificationPage />} />
            <Route path="/state-of-theft" element={<StateOfTheftPage />} />
            <Route path="/press" element={<Navigate to="/founder" replace />} />
            <Route path="/investors" element={<InvestorsPage />} />
            <Route path="/enterprise" element={<EnterprisePage />} />
            {/* The red edition is the Signal. The previous gold magazine front
                is kept at /signal/magazine rather than deleted, so the work is
                still reachable and nothing 404s. /signal/clinical 301s to
                /signal at the edge, see public/_redirects. */}
            <Route path="/signal" element={<SignalClinical />} />
            <Route path="/signal/magazine" element={<BriefIndex />} />
            <Route path="/signal/masthead" element={<MastheadPage />} />
            <Route path="/signal/clinical" element={<Navigate to="/signal" replace />} />
            <Route path="/signal/threshold-repealed-still-law" element={<SignalThresholdPage />} />
            <Route path="/signal/marking-evidence" element={<SignalMarkingEvidencePage />} />
            <Route path="/signal/cctv-313-million-movie-ticket" element={<SignalCCTVScamPage />} />
            <Route path="/signal/salford-to-vinted-black-market" element={<SignalSalfordVintedPage />} />
            <Route path="/signal/surgeon-not-camera-200ms" element={<SignalSurgeonNotCameraPage />} />
            <Route path="/signal/shopkeeper-maths-adn-cost" element={<SignalShopkeeperMathsPage />} />
            <Route path="/signal/david-robinson-gmb-cctv-theatre" element={<SignalDMRGMBPage />} />
            <Route path="/signal/fog-security-systems-debunked" element={<SignalFogSecurityPage />} />
            <Route path="/signal/shoplifting-133-percent-london-1-in-14" element={<SignalShopliftingSystemPage />} />
            <Route path="/signal/police-200-pound-threshold" element={<SignalPoliceThresholdPage />} />
            <Route path="/signal/safergems-jewellery-theft-ai-police-response" element={<SignalSaferGemsPage />} />
            <Route path="/signal/coop-named-the-enemy-economics-unchanged" element={<SignalCoopCrimeWarPage />} />
            <Route path="/signal/newsletter" element={<Navigate to="/signal" replace />} />
            <Route path="/signal/:slug" element={<BlogPostPage />} />
            <Route path="/brief" element={<Navigate to="/signal" replace />} />
            <Route path="/brief/newsletter" element={<Navigate to="/signal" replace />} />
            <Route path="/brief/:slug" element={<BlogPostPage />} />
            <Route path="/subscribe" element={<Navigate to="/pilot" replace />} />
            <Route path="/protocol" element={<ProtocolPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
