// Cloudflare Pages Middleware, per-route meta injection
// Fixes: all SPA routes serving identical ADN index.html to crawlers
// LinkedIn / WhatsApp / X bots don't run JS, they see raw HTML only.
// This middleware fetches index.html server-side, swaps meta, returns patched HTML.

const ROUTE_META = {
  '/': {
    title: 'Mykei Securities | Shelf Level Retail Defence',
    description: 'Mykei Securities is developing ADN, a shelf level retail defence device in prototype: event detection, controlled marker deployment, and Mykei Registry event records. Pre-pilot, UK patent pending.',
    canonical: 'https://mykei.io',
    ogTitle: 'Mykei Securities | Shelf Level Retail Defence',
    ogDescription: 'ADN is a patent-pending prototype shelf-level retail defence device for high-loss categories, designed to link event detection, controlled marker deployment, and Mykei Registry records.',
    ogUrl: 'https://mykei.io',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'Mykei Securities | Shelf Level Retail Defence',
    twitterDescription: 'ADN is a prototype designed to help retailers protect high-loss shelves with event detection, controlled marker deployment, and Mykei Registry records. No cameras.',
  },
  '/howitworks': {
    title: 'How ADN Works | Mykei Securities',
    description: 'A plain explanation of ADN: shelf event detection, controlled marker deployment, cartridge-linked records, and the Mykei Registry.',
    canonical: 'https://mykei.io/howitworks',
    ogTitle: 'How ADN Works | Mykei Securities',
    ogDescription: 'How ADN is designed to turn a defined shelf-level theft event into controlled marker deployment and a cartridge-linked registry record.',
    ogUrl: 'https://mykei.io/howitworks',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'How ADN Works | Mykei Securities',
    twitterDescription: 'Shelf event detection, controlled marker deployment, cartridge-linked records, and the Mykei Registry.',
  },
  '/protocol': {
    title: 'Asset-Proof Nigeria | Mykei Protocol',
    description: 'Asset-Proof Nigeria is Mykei registry-first field validation for high-value movable assets across solar, estate, school, warehouse, and SME contexts.',
    canonical: 'https://mykei.io/protocol',
    ogTitle: 'Asset-Proof Nigeria | Mykei Protocol',
    ogDescription: 'Registry-first asset protection for high-value movable goods. Ownership records, asset photos, marking options, and verification workflows.',
    ogUrl: 'https://mykei.io/protocol',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'Asset-Proof Nigeria | Mykei Protocol',
    twitterDescription: 'Registry-first asset protection for Nigerian solar, estate, school, warehouse, and SME assets.',
  },
  '/founder': {
    title: 'Michael Esema, Founder & CEO, Mykei Securities Ltd | Manchester',
    description: 'Michael Esema is the founder of Mykei Securities Ltd, inventor of ADN, and originator of Economic Sterilisation. Manchester-based, Nigerian-born, MBA, MSc.',
    canonical: 'https://mykei.io/founder',
    ogTitle: 'Michael Esema | Founder & CEO, Mykei Securities',
    ogDescription: 'Founder of Mykei Securities Ltd, inventor of ADN, and originator of Economic Sterilisation.',
    ogUrl: 'https://mykei.io/founder',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'Michael Esema | Founder & CEO, Mykei Securities',
    twitterDescription: 'Inventor of the ADN. Originator of Economic Sterilisation. MBA, MSc.',
  },
  '/economic-sterilisation': {
    title: 'Economic Sterilisation, The Doctrine Coined by Michael Esema | Mykei Securities',
    description: 'Economic Sterilisation is Mykei Securities doctrine for disrupting the resale incentive behind retail theft through registry-linked evidence workflows.',
    canonical: 'https://mykei.io/economic-sterilisation',
    ogTitle: 'Economic Sterilisation | The Doctrine',
    ogDescription: 'The doctrine behind Mykei Securities: reduce resale confidence by linking theft-related events to marker and registry records.',
    ogUrl: 'https://mykei.io/economic-sterilisation',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'Economic Sterilisation | The Doctrine | Mykei Securities',
    twitterDescription: 'A retail theft doctrine focused on disrupting resale confidence through registry-linked evidence.',
  },
  '/adn': {
    title: 'ADN Retail Security Device · Bulk Sweep Theft Detection | Mykei',
    description: 'ADN is a patent-pending prototype shelf-level retail defence device for high-loss categories, designed for controlled marker deployment and Mykei Registry event records.',
    canonical: 'https://mykei.io/adn',
    ogTitle: 'ADN | Forensic Retail Defence System',
    ogDescription: 'Shelf-level retail defence for defined theft events. Controlled marker deployment, cartridge-linked activation, and Mykei Registry records.',
    ogUrl: 'https://mykei.io/adn',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'ADN | Forensic Retail Defence | Mykei Securities',
    twitterDescription: 'ADN is designed to link shelf theft events to controlled marker deployment and registry event records.',
  },
  '/adn-in-action': {
    title: 'ADN in Action, Scroll-Through Simulation | Mykei Securities',
    description: 'A scroll-driven simulation of the ADN detection, marking, and registry sequence, illustrative only, not a live deployment or real event data.',
    canonical: 'https://mykei.io/adn-in-action',
    ogTitle: 'ADN in Action | Mykei Securities',
    ogDescription: 'See the ADN detection, marking, and registry sequence in a scroll-driven simulation. Illustrative only, not live deployment data.',
    ogUrl: 'https://mykei.io/adn-in-action',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'ADN in Action | Mykei Securities',
    twitterDescription: 'A scroll-driven simulation of the ADN detection, marking, and registry sequence. Illustrative only.',
  },
  '/pilot': {
    title: 'Contact | Mykei Securities',
    description: 'Pilot applications are closed while ADN is in prototype. Contact Mykei Securities at protocol@mykei.io.',
    canonical: 'https://mykei.io/contact',
    ogTitle: 'Contact | Mykei Securities',
    ogDescription: 'Pilot applications are closed while ADN is in prototype. Contact Mykei Securities at protocol@mykei.io.',
    ogUrl: 'https://mykei.io/contact',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'Contact | Mykei Securities',
    twitterDescription: 'Pilot applications are closed while ADN is in prototype.',
  },
  '/enterprise': {
    title: 'Strategic Retail Pilots | Mykei Securities Ltd',
    description: 'Strategic retail pilot reviews for multi-site retailers, loss prevention teams, insurers, and forensic partners evaluating ADN and Mykei Registry workflows.',
    canonical: 'https://mykei.io/enterprise',
    ogTitle: 'Enterprise Retail Pilots | Mykei Securities',
    ogDescription: 'Strategic pilot reviews for multi-site retail loss prevention, forensic workflow design, controlled marker deployment, and registry evidence packs.',
    ogUrl: 'https://mykei.io/enterprise',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'Enterprise Retail Pilots | Mykei Securities',
    twitterDescription: 'Strategic pilot reviews for retail loss prevention, forensic workflow design, and Mykei Registry evidence packs.',
  },
  '/signal': {
    title: 'The Signal | Mykei Securities Intelligence',
    description: 'The Signal publishes Mykei intelligence briefings on retail crime, theft economics, resale incentives, forensic workflow, and asset protection.',
    canonical: 'https://mykei.io/signal',
    ogTitle: 'The Signal | Mykei Securities Intelligence',
    ogDescription: 'Intelligence briefings on retail crime, theft economics, and forensic asset protection.',
    ogUrl: 'https://mykei.io/signal',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'The Signal | Mykei Securities',
    twitterDescription: 'Intelligence briefings on retail crime and theft economics.',
  },
  '/technology/ats': {
    title: 'Mykei Registry Infrastructure | Mykei Securities',
    description: 'Mykei Registry is the event-record layer designed to connect ADN device activity, shelf zones, timestamps, cartridge sessions, and marker batch references.',
    canonical: 'https://mykei.io/technology/ats',
    ogTitle: 'Mykei Registry Infrastructure | Mykei Securities',
    ogDescription: 'The registry layer behind cartridge-linked shelf event records and evidence-supporting retail workflows.',
    ogUrl: 'https://mykei.io/technology/ats',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'Mykei Registry Infrastructure',
    twitterDescription: 'Device, shelf, timestamp, cartridge session, and marker batch references in one event record.',
  },
  '/state-of-theft': {
    title: 'State of Retail Theft | Mykei Securities Research Dashboard',
    description: 'A Mykei briefing page on UK retail theft, organised resale incentives, high-loss categories, and the evidence gap facing retailers.',
    canonical: 'https://mykei.io/state-of-theft',
    ogTitle: 'State of Retail Theft | Mykei Securities',
    ogDescription: 'Retail theft, organised resale incentives, and the evidence gap facing high-loss retail categories.',
    ogUrl: 'https://mykei.io/state-of-theft',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'State of Retail Theft | Mykei Securities',
    twitterDescription: 'UK retail theft, resale incentives, and the evidence gap facing retailers.',
  },
  '/certification': {
    title: 'Mykei Protected Certification | Mykei Securities',
    description: 'Mykei Protected is the certification concept for verified retail protection workflows, registry-linked marker records, and evidence-supporting deployment standards.',
    canonical: 'https://mykei.io/certification',
    ogTitle: 'Mykei Protected Certification | Mykei Securities',
    ogDescription: 'A certification concept for verified retail protection workflows and registry-linked marker records.',
    ogUrl: 'https://mykei.io/certification',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'Mykei Protected Certification',
    twitterDescription: 'Verified retail protection workflows and registry-linked marker records.',
  },
  '/roadmap': {
    title: 'ADN Roadmap | Mykei Securities',
    description: 'The ADN roadmap tracks prototype proof, sensor testing, registry mockups, cartridge-linked activation, and field validation milestones.',
    canonical: 'https://mykei.io/roadmap',
    ogTitle: 'ADN Roadmap | Mykei Securities',
    ogDescription: 'Prototype proof, sensor testing, registry mockups, cartridge-linked activation, and field validation milestones.',
    ogUrl: 'https://mykei.io/roadmap',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'ADN Roadmap | Mykei Securities',
    twitterDescription: 'Prototype proof, sensor testing, registry mockups, and field validation milestones.',
    noindex: true,
  },
  '/contact': {
    title: 'Contact Mykei Securities',
    description: 'Contact Mykei Securities for ADN enterprise pilot review, marker supplier conversations, registry workflow questions, and retail loss-prevention discussions.',
    canonical: 'https://mykei.io/contact',
    ogTitle: 'Contact Mykei Securities',
    ogDescription: 'Contact Mykei for ADN pilot review, supplier conversations, registry workflow questions, and retail loss-prevention discussions.',
    ogUrl: 'https://mykei.io/contact',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'Contact Mykei Securities',
    twitterDescription: 'ADN pilot review, supplier conversations, and registry workflow questions.',
  },
  '/privacy': {
    title: 'Privacy Policy | Mykei Securities',
    description: 'Privacy information for Mykei Securities, including contact data, pilot enquiries, website analytics, and shelf-level event data principles.',
    canonical: 'https://mykei.io/privacy',
    ogTitle: 'Privacy Policy | Mykei Securities',
    ogDescription: 'Privacy information for Mykei Securities, pilot enquiries, website analytics, and shelf-level event data principles.',
    ogUrl: 'https://mykei.io/privacy',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'Privacy Policy | Mykei Securities',
    twitterDescription: 'Privacy information for Mykei Securities and pilot enquiries.',
  },
  '/glossary/economic-sterilisation': {
    title: 'Economic Sterilisation, Definition & Glossary | Mykei Securities',
    description: 'Economic Sterilisation is the systematic disruption of the resale incentive behind retail theft through marker and registry event records. Coined by Michael Esema, Mykei Securities Ltd.',
    canonical: 'https://mykei.io/glossary/economic-sterilisation',
    ogTitle: 'Economic Sterilisation, Definition & Glossary',
    ogDescription: 'The definition and origin of Economic Sterilisation, coined by Michael Esema for Mykei Securities Ltd.',
    ogUrl: 'https://mykei.io/glossary/economic-sterilisation',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'Economic Sterilisation, Definition & Glossary',
    twitterDescription: 'The definition and origin of Economic Sterilisation.',
  },
  '/signal/stop-calling-it-shoplifting-lost-stock': {
    title: 'Stop Calling It Shoplifting If The System Still Treats It Like Lost Stock | The Signal',
    description: 'ITV retail crime coverage shows the language is changing. The missing layer is not a better name for theft. It is shelf level evidence.',
    canonical: 'https://mykei.io/signal/stop-calling-it-shoplifting-lost-stock',
    ogTitle: 'Stop Calling It Shoplifting If The System Still Treats It Like Lost Stock',
    ogDescription: 'ITV retail crime coverage shows the language is changing. The missing layer is not a better name for theft. It is shelf level evidence.',
    ogUrl: 'https://mykei.io/signal/stop-calling-it-shoplifting-lost-stock',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'Stop Calling It Shoplifting If The System Still Treats It Like Lost Stock',
    twitterDescription: 'The missing layer is not a better name for theft. It is shelf level evidence.',
  },
  '/signal/coop-named-the-enemy-economics-unchanged': {
    title: 'Co-op Named the Enemy. Nobody Changed the Economics. | The Signal',
    description: 'Co-op recorded over 300,000 incidents of retail crime in 2024-25 and publicly named organised gangs. The question is whether the economics of theft changed.',
    canonical: 'https://mykei.io/signal/coop-named-the-enemy-economics-unchanged',
    ogTitle: 'Co-op Named the Enemy. Nobody Changed the Economics.',
    ogDescription: 'Co-op named organised gangs. Mykei asks whether the economics of retail theft actually changed.',
    ogUrl: 'https://mykei.io/signal/coop-named-the-enemy-economics-unchanged',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'Co-op Named the Enemy. Nobody Changed the Economics.',
    twitterDescription: 'Co-op named organised gangs. The economics still need to change.',
  },
  '/signal/waitrose-smart-cabinets-resale-problem': {
    title: 'Waitrose Is Locking Up Champagne. The Real Problem Is Resale. | The Signal',
    description: 'Waitrose is trialling smart cabinets for premium spirits. Mykei argues the deeper problem is resale confidence after stolen goods leave the shelf.',
    canonical: 'https://mykei.io/signal/waitrose-smart-cabinets-resale-problem',
    ogTitle: 'Waitrose Is Locking Up Champagne. The Real Problem Is Resale.',
    ogDescription: 'Smart cabinets protect the bottle. They do not change why stolen stock keeps value after it leaves the store.',
    ogUrl: 'https://mykei.io/signal/waitrose-smart-cabinets-resale-problem',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'Waitrose Is Locking Up Champagne. The Real Problem Is Resale.',
    twitterDescription: 'Smart cabinets protect the bottle. Resale confidence is the deeper problem.',
  },
  '/signal/cctv-313-million-movie-ticket': {
    title: 'CCTV is a £313 Million Movie Ticket for a Crime You Already Lost | The Signal',
    description: 'The ACS 2026 Crime Report records 5.8 million theft incidents despite record security spend. Mykei argues cameras record loss after the economics already worked.',
    canonical: 'https://mykei.io/signal/cctv-313-million-movie-ticket',
    ogTitle: 'CCTV is a £313 Million Movie Ticket for a Crime You Already Lost',
    ogDescription: 'A camera without an event response is an expensive documentary of retail loss.',
    ogUrl: 'https://mykei.io/signal/cctv-313-million-movie-ticket',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'CCTV is a £313 Million Movie Ticket for a Crime You Already Lost',
    twitterDescription: 'Cameras record loss after the economics already worked.',
  },
  '/signal/salford-to-vinted-black-market': {
    title: 'The Black Market Grocery Store: How Mykei Breaks the Economic Bridge | The Signal',
    description: 'Retail theft increasingly behaves like a resale supply chain. Mykei explains why registry-linked event records target the bridge from shelf to resale.',
    canonical: 'https://mykei.io/signal/salford-to-vinted-black-market',
    ogTitle: 'The Black Market Grocery Store',
    ogDescription: 'How registry-linked event records target the bridge from shelf theft to resale.',
    ogUrl: 'https://mykei.io/signal/salford-to-vinted-black-market',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'The Black Market Grocery Store',
    twitterDescription: 'The bridge from shelf theft to resale is the business model.',
  },
  '/signal/surgeon-not-camera-200ms': {
    title: 'A Surgeon, Not a Camera: The 200 Millisecond Rule | The Signal',
    description: 'Mykei explains why ADN is being designed around fast shelf-level event response rather than camera-based surveillance.',
    canonical: 'https://mykei.io/signal/surgeon-not-camera-200ms',
    ogTitle: 'A Surgeon, Not a Camera: The 200 Millisecond Rule',
    ogDescription: 'Fast shelf-level event response instead of camera-based surveillance.',
    ogUrl: 'https://mykei.io/signal/surgeon-not-camera-200ms',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'A Surgeon, Not a Camera',
    twitterDescription: 'Fast shelf-level event response, not surveillance theatre.',
  },
  '/signal/shopkeeper-maths-adn1-cost': {
    title: "The Maths: Built for the Shopkeeper's Cash Position | The Signal",
    description: 'A Mykei Signal article on the early ADN pricing thesis for independent retailers and why retail security economics must fit cash reality.',
    canonical: 'https://mykei.io/signal/shopkeeper-maths-adn1-cost',
    ogTitle: "The Maths: Built for the Shopkeeper's Cash Position",
    ogDescription: 'Retail security economics must fit the cash reality of the shopkeeper.',
    ogUrl: 'https://mykei.io/signal/shopkeeper-maths-adn1-cost',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: "The Maths: Built for the Shopkeeper's Cash Position",
    twitterDescription: 'Retail security economics must fit cash reality.',
  },
  '/signal/safergems-jewellery-theft-ai-police-response': {
    title: "SaferGems Jewellery Theft Surge: 10 Armed Robberies in Q1 2026. AI Policing Won't Be Ready Until 2030. | The Signal",
    description: 'SaferGems reported a sharp jewellery robbery surge. Mykei argues physical event evidence is needed before long-range AI policing arrives.',
    canonical: 'https://mykei.io/signal/safergems-jewellery-theft-ai-police-response',
    ogTitle: "SaferGems Jewellery Theft Surge. AI Policing Won't Be Ready Until 2030.",
    ogDescription: 'Physical event evidence is needed before long-range AI policing arrives.',
    ogUrl: 'https://mykei.io/signal/safergems-jewellery-theft-ai-police-response',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: "SaferGems Jewellery Theft Surge",
    twitterDescription: 'Physical event evidence is needed before long-range AI policing arrives.',
  },
  '/signal/shoplifting-133-percent-london-1-in-14': {
    title: 'Shoplifting Up 133% in Five Years. London Charges 1 in 14. | The Signal',
    description: 'London shoplifting charge rates show the weakness of incident-by-incident response. Mykei argues retailers need shelf-level event evidence.',
    canonical: 'https://mykei.io/signal/shoplifting-133-percent-london-1-in-14',
    ogTitle: 'Shoplifting Up 133% in Five Years. London Charges 1 in 14.',
    ogDescription: 'The weakness of incident-by-incident response creates the need for shelf-level event evidence.',
    ogUrl: 'https://mykei.io/signal/shoplifting-133-percent-london-1-in-14',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'Shoplifting Up 133% in Five Years',
    twitterDescription: 'Retailers need shelf-level event evidence, not just incident-by-incident response.',
  },
  '/signal/police-200-pound-threshold': {
    title: "Police Won't Come for £30 of Stolen Stock. That Is Not an Accident. | The Signal",
    description: 'A Mykei Signal article on the practical policing threshold problem and why retailers need event evidence that does not depend on immediate response.',
    canonical: 'https://mykei.io/signal/police-200-pound-threshold',
    ogTitle: "Police Won't Come for £30 of Stolen Stock. That Is Not an Accident.",
    ogDescription: 'Why retailers need event evidence that does not depend on immediate police response.',
    ogUrl: 'https://mykei.io/signal/police-200-pound-threshold',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: "Police Won't Come for £30 of Stolen Stock",
    twitterDescription: 'Retailers need event evidence that does not depend on immediate response.',
  },
  '/signal/david-robinson-gmb-cctv-theatre': {
    title: 'David Robinson Was Right on GMB. Here Is What Comes Next. | The Signal',
    description: 'David Robinson called CCTV security theatre. Mykei asks what comes after cameras when stolen goods remain easy to resell.',
    canonical: 'https://mykei.io/signal/david-robinson-gmb-cctv-theatre',
    ogTitle: 'David Robinson Was Right on GMB. Here Is What Comes Next.',
    ogDescription: 'What comes after cameras when stolen goods remain easy to resell.',
    ogUrl: 'https://mykei.io/signal/david-robinson-gmb-cctv-theatre',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'David Robinson Was Right on GMB',
    twitterDescription: 'What comes after cameras when resale remains the incentive.',
  },
  '/signal/fog-security-systems-debunked': {
    title: 'Fog Security Systems Are CCTV Theatre With Smoke | The Signal',
    description: 'Security fog adds friction but does not remove the commercial incentive for theft if stolen goods remain sellable.',
    canonical: 'https://mykei.io/signal/fog-security-systems-debunked',
    ogTitle: 'Fog Security Systems Are CCTV Theatre With Smoke',
    ogDescription: 'Fog adds friction. It does not remove resale value by itself.',
    ogUrl: 'https://mykei.io/signal/fog-security-systems-debunked',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'Fog Security Systems Are CCTV Theatre With Smoke',
    twitterDescription: 'Fog adds friction. It does not remove resale value by itself.',
  },
  '/signal/january-retail-theft-stopped-looking-random': {
    title: 'January File: The Month Retail Theft Stopped Looking Random | The Signal',
    description: 'January reporting showed retail theft patterns moving across stores. Mykei argues the missing layer is pattern evidence at the shelf-event level.',
    canonical: 'https://mykei.io/signal/january-retail-theft-stopped-looking-random',
    ogTitle: 'January File: The Month Retail Theft Stopped Looking Random',
    ogDescription: 'Retail theft patterns need shelf-event evidence, not isolated incident treatment.',
    ogUrl: 'https://mykei.io/signal/january-retail-theft-stopped-looking-random',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'January File: Retail Theft Stopped Looking Random',
    twitterDescription: 'Retail theft patterns need shelf-event evidence.',
  },
  '/signal/february-brc-retail-crime-noise': {
    title: 'February File: Five and a Half Million Theft Incidents. Still Treated Like Noise. | The Signal',
    description: 'The BRC Crime Report made retail theft scale impossible to ignore. Mykei argues the issue behaves like a resale economy, not isolated noise.',
    canonical: 'https://mykei.io/signal/february-brc-retail-crime-noise',
    ogTitle: 'February File: Five and a Half Million Theft Incidents',
    ogDescription: 'Retail theft now behaves like a resale economy, not isolated noise.',
    ogUrl: 'https://mykei.io/signal/february-brc-retail-crime-noise',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'February File: Five and a Half Million Theft Incidents',
    twitterDescription: 'Retail theft behaves like a resale economy.',
  },
  '/signal/march-chocolate-case-pattern-evidence': {
    title: 'March File: The Chocolate Case Shows the Problem With One Incident Thinking | The Signal',
    description: 'A chocolate theft case shows why retailers need pattern evidence before repeat theft looks serious enough to act on.',
    canonical: 'https://mykei.io/signal/march-chocolate-case-pattern-evidence',
    ogTitle: 'March File: The Chocolate Case Shows the Problem With One Incident Thinking',
    ogDescription: 'Retailers need pattern evidence before repeat theft looks serious enough to act on.',
    ogUrl: 'https://mykei.io/signal/march-chocolate-case-pattern-evidence',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'March File: The Chocolate Case',
    twitterDescription: 'Retailers need pattern evidence before repeat theft looks serious.',
  },
  '/signal/april-cctv-evidence-gap': {
    title: 'April File: The CCTV Evidence Gap Is the Real Retail Crime Story | The Signal',
    description: 'April reporting showed police asking retailers for better digital evidence. Mykei argues the future is structured event evidence, not more footage.',
    canonical: 'https://mykei.io/signal/april-cctv-evidence-gap',
    ogTitle: 'April File: The CCTV Evidence Gap',
    ogDescription: 'The future is structured event evidence, not more footage.',
    ogUrl: 'https://mykei.io/signal/april-cctv-evidence-gap',
    ogImage: 'https://mykei.io/social-share.png',
    twitterTitle: 'April File: The CCTV Evidence Gap',
    twitterDescription: 'The future is structured event evidence, not more footage.',
  },
}

const REMOVED_ASSET_PATHS = new Set([
  '/Mykei_Economic_Sterilisation_White_Paper.pdf',
  '/Mykei_ADN1_Pilot_Programme_Overview.pdf',
])

function injectMeta(html, meta) {
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`)
  html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${meta.description}"`)
  html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${meta.canonical}"`)
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${meta.ogTitle}"`)
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${meta.ogDescription}"`)
  html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${meta.ogUrl}"`)
  html = html.replace(/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${meta.ogImage}"`)
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${meta.twitterTitle}"`)
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${meta.twitterDescription}"`)
  html = html.replace(/<meta name="twitter:image" content="[^"]*"/, `<meta name="twitter:image" content="${meta.ogImage}"`)
  html = html.replace(/<meta name="robots" content="[^"]*"/, `<meta name="robots" content="${meta.noindex ? 'noindex, nofollow' : 'index, follow'}"`)
  return html
}

export async function onRequest(context) {
  const url = new URL(context.request.url)

  // Canonicalize www.mykei.io -> mykei.io (avoids duplicate-content: both were
  // serving identical 200 responses with no redirect between them).
  if (url.hostname === 'www.mykei.io') {
    url.hostname = 'mykei.io'
    return Response.redirect(url.toString(), 301)
  }

  const pathname = url.pathname.replace(/\/$/, '') || '/'

  if (REMOVED_ASSET_PATHS.has(pathname)) {
    return new Response('Gone', {
      status: 410,
      headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' },
    })
  }

  const meta = ROUTE_META[pathname]

  if (!meta) return context.next()

  const indexUrl = new URL('/index.html', context.request.url)
  const response = await context.env.ASSETS.fetch(indexUrl)
  let html = await response.text()

  html = injectMeta(html, meta)

  const headers = new Headers(response.headers)
  headers.set('Content-Type', 'text/html;charset=UTF-8')
  headers.set('Cache-Control', 'public, max-age=300')
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('X-Frame-Options', 'DENY')
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  if (meta.noindex) headers.set('X-Robots-Tag', 'noindex, nofollow')
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')

  return new Response(html, { headers })
}
