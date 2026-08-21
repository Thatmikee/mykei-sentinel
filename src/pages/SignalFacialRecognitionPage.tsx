// src/pages/SignalFacialRecognitionPage.tsx
// The Signal · Evidence · The evidence base for facial recognition in UK retail.
//
// Second in the evidence review series, after the forensic marking review.
// Same discipline: we sell into this market, so we are hard on ourselves and
// hard on everyone else, and we publish what we could not verify.
//
// The ICO closure letter quoted here was read directly as a primary document,
// not taken from press summaries.

import PageSEO from "@/components/PageSEO";
import SignalShareBar from "@/components/SignalShareBar";
import SignalRunningHead from "@/components/SignalRunningHead";
import { RED_EDITION, RED_TYPE } from "@/styles/signalRed";

const SLUG = "facial-recognition-evidence";
const TITLE = "Facial Recognition Is Spreading Through UK Retail. Nobody Has Published Evidence That It Cuts Theft.";
const STANDFIRST =
  "Every reduction figure in this market is self-reported by the retailer or the vendor. The independent testing that does exist measures whether the cameras recognise faces, which is a different question, and it comes from policing rather than shops.";
const DATE = "2026-08-21";
const AUTHOR = "Michael Esema";
const CHECKED = "21 August 2026";

const { INK, INK_2, INK_3, RULE, RULE_2, RED, GROUND } = RED_EDITION;
const { SANS, MONO } = RED_TYPE;

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: SANS, fontSize: "clamp(21px,2.7vw,29px)", fontWeight: 600,
      letterSpacing: "-0.028em", lineHeight: 1.18, color: INK, margin: "52px 0 18px",
    }}>{children}</h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 17, lineHeight: 1.78, color: INK, margin: "0 0 22px" }}>{children}</p>;
}

function Quote({ cite, children }: { cite: string; children: React.ReactNode }) {
  return (
    <figure style={{ margin: "30px 0", borderLeft: `2px solid ${INK}`, paddingLeft: 22 }}>
      <blockquote style={{ margin: 0, fontFamily: MONO, fontSize: 14.5, lineHeight: 1.68, color: INK }}>
        {children}
      </blockquote>
      <figcaption style={{
        fontFamily: MONO, fontSize: 10, letterSpacing: "0.09em", textTransform: "uppercase",
        color: INK_3, marginTop: 12,
      }}>{cite}</figcaption>
    </figure>
  );
}

function Pull({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: SANS, fontSize: "clamp(20px,2.5vw,26px)", fontWeight: 600,
      letterSpacing: "-0.026em", lineHeight: 1.32, color: RED,
      margin: "40px 0", textWrap: "balance",
    }}>{children}</p>
  );
}

const SOURCES: { ref: string; url: string }[] = [
  { ref: "Information Commissioner’s Office, closure letter to Simon Gordon, Founder, Facewatch Limited, dated 28 March 2023. Read as a primary document. Published in redacted form by Big Brother Watch.",
    url: "https://bigbrotherwatch.org.uk/wp-content/uploads/2023/06/Closure-letter-redacted.pdf" },
  { ref: "Information Commissioner’s Office, disclosure log entry IC-228367-G3D4, on the Facewatch investigation.",
    url: "https://ico.org.uk/about-the-ico/our-information/disclosure-log/2023/06/ic-228367-g3d4/" },
  { ref: "Information Commissioner’s Office, Balancing people’s privacy rights with the need to prevent crime, March 2023.",
    url: "https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2023/03/balancing-people-s-privacy-rights-with-the-need-to-prevent-crime/" },
  { ref: "R (Bridges) v Chief Constable of South Wales Police [2020] EWCA Civ 1058, Court of Appeal, 11 August 2020.",
    url: "https://www.judiciary.uk/wp-content/uploads/2020/08/R-Bridges-v-CC-South-Wales-ors-Judgment.pdf" },
  { ref: "National Physical Laboratory, Facial Recognition Technology in Law Enforcement: equitability study, report MS43, March 2023. Commissioned testing of the Metropolitan Police system.",
    url: "https://science.police.uk/site/assets/files/3396/frt-equitability-study_mar2023.pdf" },
  { ref: "Cardiff University, Evaluating the use of automated facial recognition technology in major policing operations, evaluation of South Wales Police.",
    url: "https://www.cardiff.ac.uk/news/view/1383278-evaluating-the-use-of-automated-facial-recognition-technology-in-major-policing-operations" },
  { ref: "Big Brother Watch, response to the Metropolitan Police’s 2025 live facial recognition report.",
    url: "https://bigbrotherwatch.org.uk/press-releases/big-brother-watch-responds-to-the-metropolitan-polices-2025-live-facial-recognition-report/" },
  { ref: "Metropolitan Police, Facial recognition technology, force information page carrying its own performance figures.",
    url: "https://www.met.police.uk/police-forces/metropolitan-police/areas/about-us/about-the-met/facial-recognition-technology/" },
  { ref: "Southern Co-op, ICO investigation into Facewatch, corporate statement.",
    url: "https://southern.coop/news/ico-investigation-into-facewatch" },
];

export default function SignalFacialRecognitionPage() {
  const published = new Date(DATE).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div style={{ background: GROUND, minHeight: "100vh", fontFamily: SANS }}>
      <PageSEO
        title={`${TITLE} | The Signal`}
        description={STANDFIRST}
        canonical={`https://mykei.io/signal/${SLUG}`}
        ogType="article"
        keywords="facial recognition retail evidence, Facewatch ICO, live facial recognition UK shops, retail crime technology evidence, LFR accuracy"
        breadcrumbs={[
          ["Home", "https://mykei.io"],
          ["The Signal", "/signal"],
          ["Facial recognition evidence review", `/signal/${SLUG}`],
        ]}
        ldJson={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: TITLE,
          datePublished: DATE,
          author: { "@type": "Person", name: AUTHOR },
          publisher: { "@type": "Organization", name: "Mykei Securities Ltd" },
          description: STANDFIRST,
        })}
      />

      <SignalRunningHead />

      <article style={{ maxWidth: 700, margin: "0 auto", padding: "56px clamp(16px,4vw,32px) 96px" }}>
        <div style={{
          fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em",
          textTransform: "uppercase", color: RED, marginBottom: 20,
        }}>
          Evidence review · {published}
        </div>

        <h1 style={{
          fontFamily: SANS, fontSize: "clamp(30px,4.6vw,50px)", fontWeight: 600,
          lineHeight: 1.06, letterSpacing: "-0.036em", color: INK, margin: "0 0 22px",
          textWrap: "balance",
        }}>
          {TITLE}
        </h1>

        <p style={{ fontSize: 19, lineHeight: 1.62, color: INK_2, margin: "0 0 40px" }}>
          {STANDFIRST}
        </p>

        <div style={{
          borderTop: `2px solid ${INK}`, borderBottom: `1px solid ${RULE}`,
          padding: "14px 0", marginBottom: 40,
          fontFamily: MONO, fontSize: 11.5, lineHeight: 1.6, color: INK_2,
        }}>
          Second in a series reviewing the evidence behind the products this
          industry sells, including ours. Sources checked {CHECKED}.
        </div>

        <P>
          Facial recognition is now running in British shops at scale. Asda has
          trialled it. Sainsbury’s has been extending it. Southern Co-op, Home
          Bargains, Iceland, Budgens and Frasers Group have all deployed it,
          most of them through a single supplier, Facewatch, which operates a
          shared watchlist so that a person flagged in one subscriber’s shop can
          be flagged on entering another.
        </P>
        <P>
          We went looking for the evidence that it reduces theft. Not that it
          identifies faces accurately, which is a separate and much easier
          question, but that fewer goods leave the shop unpaid for because the
          cameras are there.
        </P>
        <P>
          We could not find a single published, independently controlled study
          showing that. Not one. Every reduction figure in circulation traces
          back to the retailer that bought the system or the vendor that sold
          it.
        </P>

        <Pull>
          Recognising a face and preventing a theft are different claims. Only
          one of them has been tested by anyone independent.
        </Pull>

        <H2>What the regulator actually found</H2>
        <P>
          The Information Commissioner’s Office investigated Facewatch and
          closed the case on 28 March 2023. The closure letter is public in
          redacted form, and it is more damning than the coverage suggested.
        </P>
        <Quote cite="ICO closure letter to Facewatch Limited, 28 March 2023">
          We concluded that Facewatch’s processing of personal data failed to
          balance the legitimate interest of Facewatch and their subscribers
          against the rights and freedoms of individuals.
        </Quote>
        <P>
          The letter then lists what the ICO advised had been breached. It is
          not a short list: Article 5(1)(a) on lawfulness, fairness and
          transparency; Article 5(1)(b) on purpose limitation; Article 5(1)(e)
          on storage limitation; Article 6 on lawfulness of processing; Article
          9 on special category data; Article 10 on data relating to criminal
          convictions and offences; Recital 38 on the rights of children; and
          Schedule 1, Part 2, section 10 of the Data Protection Act 2018.
        </P>
        <P>
          Eight items. The ICO also accepted, in the same letter, that the
          underlying purpose was legitimate.
        </P>
        <Quote cite="ICO closure letter to Facewatch Limited, 28 March 2023">
          We agreed that the purpose of preventing and deterring criminal
          activity is in the legitimate interest of Facewatch and their
          subscribers. Legal gateways in the data protection legislation allow
          biometric data to be processed for this purpose.
        </Quote>
        <P>
          Then the part worth sitting with. The letter says the ICO welcomes the
          steps that have been or will be actioned by Facewatch, and lists them
          as a series of bullet points. In the published version, every one of
          those bullets is blacked out.
        </P>
        <P>
          So the public record is this: a regulator found eight breaches by a
          company operating biometric surveillance in shops the public walks
          into without choosing to, took no enforcement action, and the remedies
          that resolved it are redacted. A shopper cannot read what was fixed.
          Neither can a retailer evaluating the product.
        </P>

        <H2>The accuracy evidence is real, and it is not about shops</H2>
        <P>
          There is genuine independent testing of facial recognition in the UK.
          It belongs to policing.
        </P>
        <P>
          The National Physical Laboratory tested the Metropolitan Police
          system and published results in March 2023. At the operational
          threshold the force uses, the reported true positive identification
          rate was high and the incorrect match rate very low, and the study
          also found that at lower thresholds incorrect matches rose and did not
          fall evenly across demographic groups. Cardiff University’s evaluation
          of South Wales Police documented the other end of the range: at the
          2017 Champions League final, the overwhelming majority of matches
          generated were wrong, which the evaluation attributed largely to poor
          quality watchlist images, and performance improved substantially as
          the system and its procedures were changed.
        </P>
        <P>
          Both of those are accuracy studies. Neither measures whether crime
          fell. And neither is about retail.
        </P>
        <P>
          This distinction is where most of the public argument goes wrong in
          both directions. Campaigners cite police error rates as
          though they described the shop on your high street. Vendors cite
          police-grade accuracy figures as though independent laboratories had
          tested their product. No National Physical Laboratory equivalent has
          publicly tested a retail deployment. Retail runs on cheaper cameras,
          worse angles and worse light, with no published testing regime and no
          independent audit body, and it is the sector making the loudest
          claims.
        </P>

        <H2>Where the reduction figures come from</H2>
        <P>
          The numbers that circulate in this market share a structure. A
          retailer or a supplier states an outcome. No baseline is given, no
          comparison group, no time period, no methodology, and no third party
          has checked it.
        </P>
        <P>
          Frasers Group told the BBC in 2023 that it had seen a significant
          reduction in criminal offences in its stores since installing the
          technology. That is a company describing its own results, with no
          figure attached. Southern Co-op has been widely reported as saying
          that a large majority of identified and banned offenders did not
          return to its stores. We went to Southern Co-op’s own published
          statement on the ICO investigation to source that figure directly and
          it is not there, so we are not putting a number on it here.
        </P>
        <P>
          One recent figure deserves separating out because it is being pulled
          into this argument and does not belong in it. Iceland reported in
          August 2026 that it had cut store losses by around 80 per cent using
          an artificial intelligence system. That system is a computer vision
          product from a different supplier watching checkouts and aisles. It is
          not facial recognition. Anyone citing it as evidence for facial
          recognition is making exactly the category error this piece is about.
        </P>

        <Pull>
          A company reporting its own results is not evidence. It is a claim
          with a logo on it.
        </Pull>

        <H2>What the courts settled, and what they did not</H2>
        <P>
          In August 2020 the Court of Appeal ruled in R (Bridges) v Chief
          Constable of South Wales Police that the force’s use of automated
          facial recognition was unlawful. The judgment concerned a police
          force: its statutory powers, its data protection impact assessment,
          and its public sector equality duty.
        </P>
        <P>
          It is cited constantly in retail debates, and it does not do the work
          people want it to. A supermarket is not a police force. It relies on
          different legal ground under data protection law rather than police
          powers, and the public sector equality duty does not apply to it. What
          Bridges established was the seriousness of the interference and the
          standard of justification a public body needs. It is the backdrop to
          the ICO’s scrutiny of Facewatch, not a ruling about shops.
        </P>

        <H2>The strongest case for it, stated properly</H2>
        <P>
          We are not going to pretend the argument is stupid, because it is not.
        </P>
        <P>
          Excluding a specific identified repeat offender from a specific shop
          is a mechanism that plausibly reduces incidents at that shop, in the
          same way a ban notice and a door supervisor with a good memory always
          did. The novelty is speed and scale, not the underlying logic. The
          staff safety framing that Asda and Southern Co-op both used is also a
          narrower and more defensible claim than aggregate theft reduction:
          warning a worker that a person previously involved in a violent
          incident has walked in is a different proposition from claiming
          shrinkage fell.
        </P>
        <P>
          Displacement does not fully defeat the case either. If an offender
          simply moves to the shop without cameras, the retailer that installed
          them has still reduced its own losses. That is a private benefit
          rather than a reduction in crime, and it should be described that way
          rather than presented as a public good.
        </P>
        <P>
          None of that is outcome evidence. It is a case that the theory is
          reasonable and that better governance could produce testable results.
          Those results have not been produced.
        </P>

        <H2>The cost of being wrong is a person</H2>
        <P>
          Forensic marking fails quietly. Facial recognition fails at somebody.
        </P>
        <P>
          There is a growing record of shoppers wrongly flagged, searched and
          publicly ejected. Trade and technology press reported in August 2026
          that Sainsbury’s had wrongly ejected shoppers on two separate
          occasions and paused the technology at one store after the second,
          with the supplier attributing that incident to human error rather
          than to the technology. We were unable to open those reports directly,
          for the reason given below, so this paragraph rests on reporting
          rather than on documents we read ourselves. That deflection deserves
          examining rather than accepting, because the human error in question
          was a member of staff acting on an alert the system produced. If the
          alert is only safe when staff correctly disregard it, the alert is
          doing something other than what it is sold as doing.
        </P>

        <H2>Our position, stated</H2>
        <P>
          Mykei Securities is building a product for this market. We do not sell
          facial recognition and have no plans to, which gives us a commercial
          interest in this technology looking bad. A reader is entitled to
          weigh that against everything above.
        </P>
        <P>
          So here is the test we are willing to be held to. We published a
          review of forensic property marking, the category we are actually
          entering, and it concluded that its independent evidence base is
          weaker than the industry says and that the deterrent decays. We
          applied the same standard to a technology we compete with. If we ever
          publish an outcome figure for our own product without a baseline, a
          period and a method, hold this page up.
        </P>

        <H2>What we could not verify</H2>
        <P>
          Several things, listed because leaving them out would make this look
          more complete than it is.
        </P>
        <P>
          A number of trade press and regulator pages refused automated access,
          so the retail incidents and the Iceland figure are sourced from
          reporting we could read rather than from documents we could open
          ourselves. We could not extract the text of the Bridges judgment
          directly and have described its holding at the level it is universally
          reported rather than quoting it. We could not confirm any ICO outcome
          on the 2025 complaint about Asda, or on the 2023 investigation into
          Frasers Group. We could not find any peer reviewed study evaluating
          the effect of retail facial recognition on theft, and absence of a
          search result is not proof that none exists. And we could not obtain
          any methodology behind the accuracy or reduction figures published by
          any vendor in this market.
        </P>
        <P>
          If you hold data that answers any of these, particularly a controlled
          evaluation from a retailer, write to us. We will publish it whichever
          way it points, with a date on it.
        </P>

        <div style={{ marginTop: 64, borderTop: `2px solid ${INK}`, paddingTop: 26 }}>
          <div style={{
            fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em",
            textTransform: "uppercase", color: RED, marginBottom: 18,
          }}>
            Sources
          </div>
          <ol style={{ paddingLeft: 20, margin: 0 }}>
            {SOURCES.map(s => (
              <li key={s.ref} style={{ fontSize: 13.5, lineHeight: 1.68, color: INK_2, marginBottom: 14 }}>
                {s.ref}{" "}
                <a href={s.url} target="_blank" rel="noopener noreferrer"
                   style={{ color: RED, textDecoration: "underline" }}>Link</a>
              </li>
            ))}
          </ol>
          <p style={{
            fontSize: 13, lineHeight: 1.7, color: INK_2, marginTop: 20,
            paddingTop: 16, borderTop: `1px solid ${RULE_2}`,
          }}>
            Method note. The ICO closure letter was read as a primary document
            rather than through press summaries, which is why the list of
            breached provisions and the redaction of the remedies appear here.
            Where a source could not be opened directly, that is stated above
            rather than papered over. Corrections to protocol@mykei.io and this
            page will carry a dated note.
          </p>
        </div>

        <SignalShareBar url={`https://mykei.io/signal/${SLUG}`} title={TITLE} description={STANDFIRST} />
      </article>
    </div>
  );
}
