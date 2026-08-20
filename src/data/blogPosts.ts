/**
 * Departments. A magazine files pieces; a blog just lists them.
 *
 * Each department answers a different question, which is why the reader needs
 * the label before the headline:
 *   Evidence  — what does the research actually support?
 *   Data      — what do the numbers say, and who produced them?
 *   Policy    — what has changed in law or enforcement?
 *   Field     — what is happening in shops?
 *   Doctrine  — what do we argue, and why?
 */
export type Department = "Evidence" | "Data" | "Policy" | "Field" | "Doctrine";

export const DEPARTMENTS: Department[] = [
  "Evidence",
  "Data",
  "Policy",
  "Field",
  "Doctrine",
];

export const DEPARTMENT_BLURB: Record<Department, string> = {
  Evidence: "What the research supports, and what it does not.",
  Data: "The numbers, and who paid for them.",
  Policy: "Law, enforcement and the machinery of response.",
  Field: "What actually happens in shops.",
  Doctrine: "The argument we are making.",
};

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;          // ISO 8601, e.g. "2026-04-12"
  summary: string;       // 1-2 sentences, plain text
  tags: string[];
  readingTime: string;   // e.g. "5 min read"
  landmark?: boolean;    // Landmark Read feature post
  department?: Department;
  /**
   * Issue number. These are real: they were already recorded in the page
   * comments and datelines (Issue 01 through Issue 16) before this field
   * existed, and are transcribed from there rather than invented. Pieces
   * published without an issue number are left undefined rather than
   * back-filled with a guess.
   */
  issue?: number;
  /**
   * Marginal note for the front page lead. Optional, and omitted rather than
   * guessed: an earlier front hardcoded a sources count belonging to one
   * specific piece, so any new lead would have inherited a false note.
   */
  sourcesCited?: number;
  sourceNote?: string;
}

/**
 * Issue numbers, transcribed from the datelines already printed on the article
 * pages (e.g. SignalCCTVScamPage renders "The Signal · Issue 01 · April 2026").
 * Only pieces that already carried a number are listed. Nothing is invented,
 * and gaps are left as gaps.
 */
const ISSUE_BY_SLUG: Record<string, number> = {
  "cctv-313-million-movie-ticket": 1,
  "salford-to-vinted-black-market": 2,
  "surgeon-not-camera-200ms": 3,
  "shopkeeper-maths-adn-cost": 4,
  "david-robinson-gmb-cctv-theatre": 11,
  "fog-security-systems-debunked": 12,
  "safergems-jewellery-theft-ai-police-response": 13,
  "police-200-pound-threshold": 14,
  "shoplifting-133-percent-london-1-in-14": 15,
  "coop-named-the-enemy-economics-unchanged": 16,
  "marking-evidence": 17,
};

/** Explicit filing. Anything not listed falls back to tag inference below. */
const DEPARTMENT_BY_SLUG: Record<string, Department> = {
  "marking-evidence": "Evidence",
  "police-200-pound-threshold": "Policy",
  "coop-named-the-enemy-economics-unchanged": "Policy",
  "shoplifting-133-percent-london-1-in-14": "Data",
  "cctv-313-million-movie-ticket": "Data",
  "shopkeeper-maths-adn-cost": "Data",
  "fog-security-systems-debunked": "Evidence",
  "selectadna-met-police": "Evidence",
  "synthetic-dna-forensics": "Evidence",
  "why-cctv-fails": "Evidence",
  "salford-to-vinted-black-market": "Field",
  "safergems-jewellery-theft-ai-police-response": "Field",
  "waitrose-smart-cabinets-resale-problem": "Field",
  "independent-retailer-economics": "Field",
  "pilot-programme-manchester": "Field",
  "marketplace-flagging": "Field",
  "economic-sterilisation-explained": "Doctrine",
  "surgeon-not-camera-200ms": "Doctrine",
  "protected-by-mykei": "Doctrine",
  "adn1-how-it-works": "Doctrine",
  "stop-calling-it-shoplifting-lost-stock": "Doctrine",
  "david-robinson-gmb-cctv-theatre": "Field",
  "uk-retail-crime-crisis": "Data",
};

/** Falls back to tags so a new piece files itself sensibly before curation. */
function inferDepartment(post: BlogPostMeta): Department {
  const explicit = DEPARTMENT_BY_SLUG[post.slug];
  if (explicit) return explicit;

  const tags = post.tags.map((t) => t.toLowerCase());
  const has = (...needles: string[]) =>
    needles.some((n) => tags.some((t) => t.includes(n)));

  if (has("evidence", "research", "study")) return "Evidence";
  if (has("police", "legislation", "policy", "threshold", "charge rate")) return "Policy";
  if (has("data", "statistics", "ons", "brc")) return "Data";
  if (has("economic sterilisation", "adn", "doctrine")) return "Doctrine";
  return "Field";
}

/** Department and issue for a post, resolving overrides and inference. */
export function fileOf(post: BlogPostMeta): {
  department: Department;
  issue?: number;
} {
  return {
    department: post.department ?? inferDepartment(post),
    issue: post.issue ?? ISSUE_BY_SLUG[post.slug],
  };
}

export const blogPosts: BlogPostMeta[] = [
  // ── August 2026 ────────────────────────────────────────────────────────
  {
    slug: "threshold-repealed-still-law",
    title: "The \u00a3200 Threshold Was Repealed in April. It Is Still the Law Today.",
    date: "2026-08-20",
    landmark: true,
    department: "Policy",
    issue: 18,
    summary:
      "Parliament voted to abolish the low-value shoplifting threshold. The government has not switched it on, and will not say when. Meanwhile the provision everyone is arguing about never governed whether police turn up.",
    tags: [
      "legislation",
      "Crime and Policing Act 2026",
      "section 22A",
      "police",
      "Home Office",
      "retail crime law",
      "ONS",
    ],
    readingTime: "8 min read",
    sourcesCited: 9,
    sourceNote:
      "Every legal status read directly from legislation.gov.uk on 20 August 2026, not from press summaries. Commencement can change with one statutory instrument.",
  },
  {
    slug: "marking-evidence",
    title:
      "We Are Building a Forensic Marking Product. Its Evidence Base Is Weaker Than the Industry Says.",
    date: "2026-08-19",
    landmark: true,
    sourcesCited: 3,
    sourceNote:
      "Two peer reviewed, one randomised. Both paywalled, and every figure confirmed against a second independent source before publication.",
    summary:
      "Two independent studies, one of them randomised, point the same way. Forensic property marking produces a real early drop in crime that does not last, and most people handed a free kit never use it. Co-op has published no outcome data at all. We are entering this category, so we are publishing the review nobody else will.",
    tags: [
      "evidence review",
      "forensic marking",
      "SmartWater",
      "SelectaDNA",
      "Co-op",
      "deterrence decay",
      "research",
    ],
    readingTime: "9 min read",
  },
  {
    slug: "stop-calling-it-shoplifting-lost-stock",
    title: "Stop Calling It Shoplifting If The System Still Treats It Like Lost Stock",
    date: "2026-05-20",
    landmark: true,
    summary: "ITV's retail crime coverage shows the language is changing. The missing layer is not a better name for theft. It is shelf level evidence.",
    tags: ["ITV News", "shoplifting", "retail crime", "retail evidence", "ADN", "Mykei Registry", "Economic Sterilisation"],
    readingTime: "6 min read",
  },
  {
    slug: "january-retail-theft-stopped-looking-random",
    title: "January File: The Month Retail Theft Stopped Looking Random",
    date: "2026-05-19",
    summary: "January reporting showed gangs moving from store to store while retailers waited for the law to catch up. The missing lesson was not more panic. It was pattern evidence.",
    tags: ["Retail Crime Files", "January 2026", "organised retail crime", "shoplifting", "retail evidence", "Mykei Registry"],
    readingTime: "6 min read",
  },
  {
    slug: "february-brc-retail-crime-noise",
    title: "February File: Five and a Half Million Theft Incidents. Still Treated Like Noise.",
    date: "2026-05-19",
    summary: "The BRC Crime Report 2026 made the scale impossible to ignore. Mykei's reading is simple: retail theft now behaves like a resale economy, not a set of isolated incidents.",
    tags: ["Retail Crime Files", "February 2026", "BRC Crime Report", "retail theft", "resale economy", "ADN"],
    readingTime: "7 min read",
  },
  {
    slug: "march-chocolate-case-pattern-evidence",
    title: "March File: The Chocolate Case Shows the Problem With One Incident Thinking",
    date: "2026-05-19",
    summary: "A prolific chocolate theft case in North Yorkshire looked small until the pattern appeared. Retailers need evidence at the shelf event level before punishment arrives after aggregation.",
    tags: ["Retail Crime Files", "March 2026", "repeat offenders", "prolific shoplifting", "retail evidence", "shelf event"],
    readingTime: "6 min read",
  },
  {
    slug: "april-cctv-evidence-gap",
    title: "April File: The CCTV Evidence Gap Is the Real Retail Crime Story",
    date: "2026-05-19",
    summary: "April reporting showed the Met asking retailers for better digital evidence. Mykei's view: the future is not more footage. It is structured event evidence.",
    tags: ["Retail Crime Files", "April 2026", "CCTV evidence", "Met Police", "retail crime reporting", "event records"],
    readingTime: "7 min read",
  },
  {
    slug: "waitrose-smart-cabinets-resale-problem",
    title: "Waitrose Is Locking Up Champagne. The Real Problem Is Resale.",
    date: "2026-05-19",
    landmark: true,
    summary: "Waitrose is trialling smart cabinets for champagne and premium spirits after another wave of retail theft pressure. The cabinet protects the bottle. It does not change why stolen stock still has value once it leaves the store.",
    tags: ["Waitrose", "retail theft", "premium spirits", "smart cabinets", "resale economy", "ADN"],
    readingTime: "5 min read",
  },
  {
    slug: "coop-named-the-enemy-economics-unchanged",
    title: "Co-op Named the Enemy. Nobody Changed the Economics.",
    date: "2026-05-07",
    summary: "Co-op recorded over 300,000 incidents of retail crime in 2024-25 and publicly named organised gangs. The government launched the Retail Crime Action Plan. Charge rates stayed at 1 in 5. Stolen goods stayed sellable. Michael Esema on why naming the problem is not the same as changing the economics.",
    tags: ["Co-op", "organised retail crime", "Retail Crime Action Plan", "charge rate", "economic sterilisation", "BRC"],
    readingTime: "7 min read",
  },
  {
    slug: "shoplifting-133-percent-london-1-in-14",
    title: "Shoplifting Up 133% in Five Years. London Charges 1 in 14. The System Has a Name for This: Acceptable Loss.",
    date: "2026-04-16",
    landmark: true,
    summary: "530,000 offences recorded in 2025. Fewer than 1 in 5 result in a charge nationally; in London, 1 in 14. Thematic coding reveals organised gangs operating at network scale while policing responds per-incident. Michael Esema on why the maths only resolves one way.",
    tags: ["shoplifting", "organised retail crime", "London", "thematic coding", "Liberal Democrats", "economic sterilisation"],
    readingTime: "7 min read",
  },
  {
    slug: "police-200-pound-threshold",
    title: "Police Won't Come for £30 of Stolen Stock. That Is Not an Accident.",
    date: "2026-04-16",
    landmark: true,
    summary: "Liberal Democrats data shows shoplifting cases have more than doubled in five years. Only 1 in 5 results in a charge. The de facto £200 floor means most retail theft is simply absorbed. Michael Esema on why Economic Sterilisation removes the need to call anyone.",
    tags: ["police", "Liberal Democrats", "shoplifting", "£200 threshold", "economic sterilisation"],
    readingTime: "6 min read",
  },
  {
    slug: "safergems-jewellery-theft-ai-police-response",
    title: "SaferGems Logged 10 Armed Robberies in Three Months. The Government's Answer Won't Be Ready Until 2030.",
    date: "2026-04-15",
    landmark: true,
    summary: "Jewellery theft armed robberies are up 10x in Q1 2026. Gold at £4,000/oz is driving coordinated attacks. The institutional response is AI crime mapping due in 2030 and fog machines that leave stolen goods fully sellable. Michael Esema on why the doctrine has to change.",
    tags: ["SaferGems", "jewellery theft", "AI policing", "Metropolitan Police", "economic sterilisation", "ADN"],
    readingTime: "8 min read",
  },
  {
    slug: "david-robinson-gmb-cctv-theatre",
    title: "David Robinson Was Right on GMB. Here Is What Comes Next.",
    date: "2026-04-14",
    landmark: true,
    summary: "David Robinson told GMB that CCTV is security theatre. He was right. But nobody answered the follow-on question: if not cameras, then what? The ADN is the answer.",
    tags: ["CCTV", "GMB", "David Robinson", "forensic DNA", "economic sterilisation"],
    readingTime: "7 min read",
  },
  {
    slug: "fog-security-systems-debunked",
    title: "Fog Security Systems Are CCTV Theatre With Smoke",
    date: "2026-04-13",
    summary: "Security fog machines create friction. They do not remove the commercial incentive for theft. If stolen goods are still sellable after your security system fires, the economics of the crime are unchanged.",
    tags: ["fog security", "security theatre", "retail theft", "economic sterilisation"],
    readingTime: "6 min read",
  },
  {
    slug: "cctv-313-million-movie-ticket",
    title: "CCTV is a £313 Million Movie Ticket for a Crime You Already Lost",
    date: "2026-04-08",
    landmark: true,
    summary: "The 2026 ACS Crime Report: 5.8 million theft incidents despite record £313m security spend. A camera without forensic response is just an expensive documentary of your losses.",
    tags: ["CCTV", "ACS 2026", "deterrence failure", "economic sterilisation"],
    readingTime: "6 min read",
  },
  {
    slug: "salford-to-vinted-black-market",
    title: "The Black Market Grocery Store: How Mykei Breaks the Economic Bridge",
    date: "2026-04-03",
    summary: "The BRC 2026 report confirms OCGs run retail theft as a supply chain. The Mykei Registry creates a traceable link that disrupts the pipeline between a Salford shelf and a Vinted listing.",
    tags: ["organised crime", "Vinted", "eBay", "registry-linked evidence"],
    readingTime: "7 min read",
  },
  {
    slug: "surgeon-not-camera-200ms",
    title: "A Surgeon, Not a Camera: The 200 Millisecond Rule",
    date: "2026-04-01",
    summary: "XSHUT address management on GPIO 4 and GPIO 5. Kinetic signature classification on an Encrypted Logic Core in under 50ms. A 113kHz ultrasonic deployment module fires before the thief reaches the door. This is forensic infrastructure, not AI surveillance.",
    tags: ["Encrypted Logic Core", "technical", "Tactical Multi-zone Sensor Array", "firmware", "kinetic analysis"],
    readingTime: "8 min read",
  },
  {
    slug: "shopkeeper-maths-adn-cost",
    title: "The Maths: Built for the Shopkeeper's Cash Position",
    date: "2026-03-28",
    summary: "Pricing to be scoped per pilot. The unit economics of forensic retail defence, for BIRA members and independent retailers.",
    tags: ["pricing", "BIRA", "independent retail", "break-even", "economics"],
    readingTime: "6 min read",
  },
  {
    slug: "uk-retail-crime-crisis",
    title: "UK Retail Crime Has Reached 1.8 Billion Pounds. Here Is What the Data Says.",
    date: "2026-03-18",
    summary: "The British Retail Consortium's 2024 survey recorded £1.8 billion in annual shrinkage. The response from the industry has been to spend more on the systems that failed to prevent it.",
    tags: ["retail crime", "BRC", "data", "UK"],
    readingTime: "6 min read",
  },
  {
    slug: "why-cctv-fails",
    title: "CCTV Does Not Prevent Theft. It Records It.",
    date: "2026-04-07",
    summary: "After 40 years and billions invested in surveillance infrastructure, UK retail theft is at record highs. The data makes a case that camera-based deterrence has reached its ceiling.",
    tags: ["CCTV", "deterrence", "security"],
    readingTime: "5 min read",
  },
  {
    slug: "economic-sterilisation-explained",
    title: "Economic Sterilisation: The Doctrine That Makes Theft Pointless",
    date: "2026-02-26",
    summary: "Most security systems ask how to stop theft. Economic Sterilisation asks a different question: how do you remove the reason it happens?",
    tags: ["Economic Sterilisation", "doctrine", "ADN"],
    readingTime: "7 min read",
  },
  {
    slug: "adn1-how-it-works",
    title: "How the ADN Marks, Logs, and Flags Stolen Goods in Under Three Seconds",
    date: "2026-04-09",
    summary: "A walkthrough of the ADN activation sequence: from sweep detection to controlled marker deployment to registry event record.",
    tags: ["ADN", "technology", "forensics"],
    readingTime: "6 min read",
  },
  {
    slug: "synthetic-dna-forensics",
    title: "Synthetic DNA Forensics: From Crime Scenes to Corner Shops",
    date: "2026-03-25",
    summary: "Proprietary Forensic Marking Compound-class forensic markers are invisible, permanent, and designed to support evidential workflows. Here is what the science says and why it matters for independent retailers.",
    tags: ["forensic markers", "forensics", "Proprietary Forensic Marking Compound"],
    readingTime: "5 min read",
  },
  {
    slug: "selectadna-met-police",
    title: "What the Met Police and Proprietary Forensic Marking Compound Proved About DNA Tagging",
    date: "2026-03-06",
    summary: "The Metropolitan Police Service ran targeted DNA-tagging operations in high-crime areas. The results produced significant reductions in burglary and vehicle crime. Here is what happened.",
    tags: ["Met Police", "Proprietary Forensic Marking Compound", "case study"],
    readingTime: "5 min read",
  },
  {
    slug: "pilot-programme-manchester",
    title: "The Independent Retail Pilot: Five Retailers, One Doctrine",
    date: "2026-04-11",
    summary: "ADN Independent Retail Pilot: what it tests, who it is for, and how to apply.",
    tags: ["pilot", "Manchester", "ADN"],
    readingTime: "4 min read",
  },
  {
    slug: "independent-retailer-economics",
    title: "The Maths: Break-Even Point Without a Fixed Price Yet",
    date: "2026-04-12",
    landmark: true,
    summary: "The unit economics of the ADN are built around the independent retailer's cash position, not the investor's return model. Here is how the numbers work.",
    tags: ["economics", "pricing", "retail"],
    readingTime: "5 min read",
  },
  {
    slug: "marketplace-flagging",
    title: "Why Stolen Goods Still Sell on eBay, and How to Stop It",
    date: "2026-04-05",
    summary: "eBay, Vinted, and Facebook Marketplace are the exit routes for organised retail crime. Registry-linked event records are designed to disrupt anonymous resale.",
    tags: ["marketplace", "eBay", "registry", "resale"],
    readingTime: "6 min read",
  },
  {
    slug: "protected-by-mykei",
    title: "The Decal Effect: Why a Sticker in the Window Changes Criminal Behaviour",
    date: "2026-04-10",
    summary: "The 'Protected by Mykei Securities' decal is not decoration. It signals that every item in this store is forensically marked and harder to sell anonymously if stolen.",
    tags: ["deterrence", "decal", "signage", "behaviour"],
    readingTime: "4 min read",
  },
];

export function getPostBySlug(slug: string): BlogPostMeta | undefined {
  return blogPosts.find(p => p.slug === slug);
}
