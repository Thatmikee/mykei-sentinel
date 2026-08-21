import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "@/data/blogPosts";
import BlogPostLayout from "@/components/BlogPostLayout";

import UkRetailCrimeCrisis from "./brief/UkRetailCrimeCrisis";
import WhyCctvFails from "./brief/WhyCctvFails";
import EconomicSterilisationExplained from "./brief/EconomicSterilisationExplained";
import Adn1HowItWorks from "./brief/Adn1HowItWorks";
import SyntheticDnaForensics from "./brief/SyntheticDnaForensics";
import SelectadnaMetPolice from "./brief/SelectadnaMetPolice";
import PilotProgrammeManchester from "./brief/PilotProgrammeManchester";
import IndependentRetailerEconomics from "./brief/IndependentRetailerEconomics";
import MarketplaceFlagging from "./brief/MarketplaceFlagging";
import ProtectedByMykei from "./brief/ProtectedByMykei";
import WaitroseSmartCabinetsResaleProblem from "./brief/WaitroseSmartCabinetsResaleProblem";
import JanuaryRetailTheftStoppedLookingRandom from "./brief/JanuaryRetailTheftStoppedLookingRandom";
import FebruaryBrcRetailCrimeNoise from "./brief/FebruaryBrcRetailCrimeNoise";
import MarchChocolateCasePatternEvidence from "./brief/MarchChocolateCasePatternEvidence";
import AprilCctvEvidenceGap from "./brief/AprilCctvEvidenceGap";
import StopCallingItShopliftingLostStock from "./brief/StopCallingItShopliftingLostStock";
import SignalRunningHead from "@/components/SignalRunningHead";

const POST_COMPONENTS: Record<string, React.ComponentType> = {
  "stop-calling-it-shoplifting-lost-stock": StopCallingItShopliftingLostStock,
  "january-retail-theft-stopped-looking-random": JanuaryRetailTheftStoppedLookingRandom,
  "february-brc-retail-crime-noise": FebruaryBrcRetailCrimeNoise,
  "march-chocolate-case-pattern-evidence": MarchChocolateCasePatternEvidence,
  "april-cctv-evidence-gap": AprilCctvEvidenceGap,
  "waitrose-smart-cabinets-resale-problem": WaitroseSmartCabinetsResaleProblem,
  "uk-retail-crime-crisis": UkRetailCrimeCrisis,
  "why-cctv-fails": WhyCctvFails,
  "economic-sterilisation-explained": EconomicSterilisationExplained,
  "adn1-how-it-works": Adn1HowItWorks,
  "synthetic-dna-forensics": SyntheticDnaForensics,
  "selectadna-met-police": SelectadnaMetPolice,
  "pilot-programme-manchester": PilotProgrammeManchester,
  "independent-retailer-economics": IndependentRetailerEconomics,
  "marketplace-flagging": MarketplaceFlagging,
  "protected-by-mykei": ProtectedByMykei,
};

const DARK = "#1C120A";
const GOLD = "#C8A96E";
const MUTED = "#8A7560";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <PostNotFound />;
  }

  const meta = getPostBySlug(slug);
  const PostComponent = POST_COMPONENTS[slug];

  if (!meta || !PostComponent) {
    return <PostNotFound />;
  }

  return (
    <>
      <SignalRunningHead />
      <BlogPostLayout meta={meta}>
        <PostComponent />
      </BlogPostLayout>
    </>
  );
}

function PostNotFound() {
  return (
    <>
    <SignalRunningHead />
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#F8F3ED",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
      fontFamily: "system-ui, sans-serif",
      color: DARK,
      textAlign: "center",
    }}>
      <p style={{
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontSize: "11px",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: GOLD,
        marginBottom: "16px",
      }}>
        404
      </p>
      <h1 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "32px",
        fontWeight: 700,
        color: DARK,
        marginBottom: "16px",
      }}>
        Post not found.
      </h1>
      <p style={{ color: MUTED, marginBottom: "32px", fontSize: "16px" }}>
        This article does not exist or may have moved.
      </p>
      <Link
        to="/signal"
        style={{
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: DARK,
          textDecoration: "none",
          borderBottom: `2px solid ${GOLD}`,
          paddingBottom: "2px",
        }}
      >
        All entries
      </Link>
    </div>
    </>
  );
}
