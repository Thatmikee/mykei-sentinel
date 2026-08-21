// src/pages/SignalMarkingEvidencePage.tsx
// The Signal · The evidence base for forensic property marking.
//
// Written by a company building a forensic marking product. That conflict is
// stated in the piece rather than buried.

import PageSEO from "@/components/PageSEO";
import SignalShareBar from "@/components/SignalShareBar";
import EditorialNote from "@/components/EditorialNote";

const SLUG = "marking-evidence";
const TITLE =
  "We Are Building a Forensic Marking Product. Its Evidence Base Is Weaker Than the Industry Says.";
const STANDFIRST =
  "Two independent studies, one of them randomised, point the same way. Forensic property marking produces a real early drop in crime that does not last, and most people handed a free kit never use it. Nobody selling this technology has published that. We are about to sell it, so we are publishing it.";
const DATE = "2026-08-19";
const AUTHOR = "Michael Esema";

import { SIGNAL, TYPE } from "@/styles/signalTokens";
import SignalRunningHead from "@/components/SignalRunningHead";

const INK = SIGNAL.INK;
const MID = SIGNAL.MUTED;
const GOLD = SIGNAL.ACCENT;
const RULE = SIGNAL.RULE;
const PAPER = SIGNAL.PAPER;

const mono = TYPE.UTILITY;
const serif = TYPE.DISPLAY;

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: serif,
        fontSize: "clamp(21px,2.8vw,28px)",
        fontWeight: 700,
        lineHeight: 1.25,
        color: INK,
        margin: "48px 0 20px",
      }}
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 17, lineHeight: 1.85, color: INK, margin: "0 0 24px" }}>{children}</p>
  );
}

function Pull({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      style={{
        borderLeft: `3px solid ${GOLD}`,
        margin: "36px 0",
        padding: "4px 0 4px 22px",
        fontFamily: serif,
        fontSize: "clamp(19px,2.4vw,24px)",
        lineHeight: 1.45,
        color: INK,
      }}
    >
      {children}
    </blockquote>
  );
}

const SOURCES: { ref: string; url: string }[] = [
  {
    ref: "Chainey, S. A quasi-experimental evaluation of the impact of forensic property marking in decreasing burglaries. Security Journal 35:966 to 985, published online 2021.",
    url: "https://link.springer.com/content/pdf/10.1057/s41284-021-00308-z.pdf",
  },
  {
    ref: "Kyvsgaard, B. and Sorensen, D. W. M. Do stickers indicating the use of forensic property marking prevent burglary? Results from a randomized controlled trial. Journal of Experimental Criminology, 2020.",
    url: "https://link.springer.com/article/10.1007/s11292-019-09409-7",
  },
  {
    ref: "Hodgkinson, W., Ariel, B. and Harinam, V. Comparing panic alarm systems for high-risk domestic abuse victims. Journal of Experimental Criminology 19:595 to 613, 2023. Cited here only for its independent characterisation of the Kyvsgaard and Sorensen findings.",
    url: "https://link.springer.com/article/10.1007/s11292-022-09505-1",
  },
];

export default function SignalMarkingEvidencePage() {
  const published = new Date(DATE).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div style={{ background: PAPER, minHeight: "100vh" }}>
      <PageSEO
        title={`${TITLE} | Mykei Signal`}
        description={STANDFIRST}
        canonical={`https://mykei.io/signal/${SLUG}`}
        ogType="article"
        keywords="forensic property marking evidence, SmartWater evidence base, SelectaDNA research, Co-op forensic marking data, property marking effectiveness, deterrence decay, retail crime research"
        breadcrumbs={[
          ["Home", "https://mykei.io"],
          ["The Signal", "/signal"],
          ["Forensic marking evidence review", `/signal/${SLUG}`],
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

      <article
        style={{ maxWidth: 720, margin: "0 auto", padding: "96px clamp(16px,4vw,32px) 96px" }}
      >
        <div
          style={{
            fontFamily: mono,
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: GOLD,
            marginBottom: 18,
          }}
        >
          Evidence review · {published}
        </div>

        <h1
          style={{
            fontFamily: serif,
            fontSize: "clamp(28px,4.4vw,46px)",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: INK,
            margin: "0 0 26px",
          }}
        >
          {TITLE}
        </h1>

        <p
          style={{
            fontSize: 19,
            lineHeight: 1.7,
            color: MID,
            borderLeft: `3px solid ${GOLD}`,
            paddingLeft: 20,
            margin: "0 0 40px",
          }}
        >
          {STANDFIRST}
        </p>

        <EditorialNote kind="context" date="2026-08-19">
          <p style={{ margin: 0 }}>
            <strong>Declared interest.</strong> Mykei Securities Ltd is developing the ADN, a
            forensic retail security device. This article argues that the evidence base for the
            category we are entering is weaker than that category claims. We would rather be the
            company that said so first than the company caught repeating a number that later gets
            withdrawn.
          </p>
        </EditorialNote>

        <H2>The claim everyone repeats</H2>
        <P>
          Forensic property marking is sold on a simple promise. Mark the goods with a unique
          traceable compound, advertise loudly that you have done it, and thieves go elsewhere
          because the property has become evidence. SmartWater advertises a 100 per cent conviction
          rate across 25 years. DataDot has cited a 60 per cent reduction in theft. Police forces
          have handed out marking kits by the thousand.
        </P>
        <P>
          We went looking for the independent research underneath those numbers, expecting to find
          support for a product we are building. We found two studies of real methodological
          quality. Neither says what the marketing says.
        </P>

        <H2>Study one. The effect is real, and then it is gone</H2>
        <P>
          Spencer Chainey, writing in <em>Security Journal</em>, evaluated the distribution of 345
          forensic property marking kits to households in an English city, measuring the treatment
          area against three control areas.
        </P>
        <P>
          The early result is genuinely strong. Burglary in the treatment area fell{" "}
          <strong>82 per cent</strong> relative to the controls over the first six months, a
          statistically significant reduction, with a diffusion of benefit into vehicle crime and
          criminal damage nearby. That is a large effect, and it is not the finding of a researcher
          hostile to the technology.
        </P>
        <P>
          Then the paper reports what happened next. The decreases were short-lived. Burglary in the
          treatment area <strong>returned to pre-intervention levels</strong> after that initial
          period.
        </P>

        <Pull>
          The marking did not stop working. The advertising did. What decays is not the compound on
          the property. It is the offender's belief that it is there.
        </Pull>

        <H2>Study two. Most people never use the kit</H2>
        <P>
          Britta Kyvsgaard and David Sorensen ran a randomised controlled trial in Aarhus, Denmark,
          published in the <em>Journal of Experimental Criminology</em>. Every single-family house in
          the municipality burgled at least once in the preceding four years was enrolled. That is
          6,603 homes, randomly assigned, 3,378 to treatment and 3,225 to control.
        </P>
        <P>
          Treatment households were offered a free forensic marking kit and asked to display sticker
          decals around their front doors. These were people who had already been burgled, in a
          country with high trust in policing, being offered something useful for nothing.
        </P>
        <P>
          <strong>
            Only 1,080 of them, roughly 32 per cent, requested the kit and put up the stickers as
            instructed.
          </strong>{" "}
          The analysis had to be run on an intention-to-treat basis because two thirds of the
          treatment group never actually became treated.
        </P>
        <P>
          A later paper by Hodgkinson, Ariel and Harinam, reviewing warning-notification research
          from a different field entirely, characterises the Danish findings the same way Chainey
          characterises his own. Reductions in burglary were observed, but they were limited to the
          beginning of the study's observation period.
        </P>

        <H2>What is missing matters as much as what is there</H2>
        <P>
          The College of Policing lists SmartWater as a practice example. It does not carry the kind
          of graded effectiveness rating held by CCTV or improved street lighting. We found no
          Campbell Collaboration systematic review of forensic marking specifically. A systematic
          review of retail tagging more broadly concluded that on the available evidence it is
          difficult to determine whether tags reduce theft at all, and noted that the longest
          evaluation it could locate ran for twelve months.
        </P>
        <P>
          No vendor and no retailer publishes a cost per unit or per store. Not SmartWater, not
          SelectaDNA, not DataDot. In a market that sells on return on investment, nobody will state
          the investment.
        </P>

        <H2>Co-op, specifically</H2>
        <P>
          Co-op is the most visible UK retailer marking stock rather than premises. It has been
          spray-marking high-theft products, alcohol, detergent, coffee, sweets and energy drinks,
          in Manchester and London, and reported expanding the programme more widely in April 2026.
        </P>
        <P>
          <strong>
            Co-op has not published a theft reduction figure, a conviction count, or a return on
            investment for that programme.
          </strong>{" "}
          Not one outcome number.
        </P>
        <P>
          There is a striking statistic in Co-op's crime reporting and it is worth handling
          carefully. Around 500 prolific offenders have received custodial sentences totalling more
          than 100 years. That figure is attributed to Co-op's CCTV and police intelligence-sharing
          partnership. It is not a forensic marking result. It has nonetheless been repeated in
          contexts that imply it is one.
        </P>
        <P>
          Co-op also runs a separate and much older programme in which security staff spray violent
          offenders rather than stock. Coverage conflates the two constantly. They are different
          interventions with different aims, and neither has a published effect size.
        </P>

        <H2>What we think this actually means</H2>
        <P>
          The honest reading is not that forensic marking fails. It is that the industry has been
          selling the wrong mechanism.
        </P>
        <P>
          Both studies point at behaviour rather than chemistry. Chainey's effect faded when the
          signal faded. The Danish trial failed at the point where a human being had to open a box
          and put up a sticker. Neither result is about whether a marker performs forensically. Both
          are about whether anyone believes it is present, and whether anyone bothered to apply it.
        </P>

        <Pull>
          If two thirds of your users never deploy your product, your product's laboratory
          performance is not the constraint.
        </Pull>

        <P>
          That has direct consequences for what we are building. Any system depending on staff
          remembering to mark stock inherits the Danish compliance problem. Any system whose
          deterrent rests on signage inherits Chainey's decay curve. The interesting engineering
          question is not how to make a better marker. It is how to make marking automatic rather
          than discretionary, and how to stop the deterrent signal going stale.
        </P>
        <P>
          We have not solved either. We are naming them because we could not find anyone else in
          this market willing to.
        </P>

        <H2>What we are not saying</H2>
        <P>
          We are not saying forensic marking is worthless. An 82 per cent reduction over six months
          is a real effect that helped real households, and a technology that buys you six months is
          not nothing, provided you understand that six months is what you bought.
        </P>
        <P>
          We are not saying the vendors are lying. A 100 per cent conviction rate is most plausibly
          a true statement about cases where the evidence was admitted and presented, which is a far
          narrower claim than it sounds and would be unremarkable if stated in full.
        </P>
        <P>
          And we are not claiming our own product is proven. It is not. It has no field validation,
          no independent evaluation and no deployment data. When it has them we will publish them
          whichever way they point.
        </P>

        <H2>How to read this market</H2>
        <P>
          In 2023 a widely circulated figure held that organised retail crime accounted for roughly
          half of all retail losses. It was later withdrawn. A great deal of policy, procurement and
          press coverage had already been built on top of it.
        </P>
        <P>
          The lesson is not that trade bodies are dishonest. It is that in this sector almost
          everyone capable of producing a number has a commercial reason to want it to be large, and
          almost nobody has a commercial reason to check. We have exactly the same incentive
          problem. Publishing this is our attempt to be legible about it rather than pretend we
          stand outside it.
        </P>

        <div style={{ marginTop: 64, borderTop: `2px solid ${INK}`, paddingTop: 28 }}>
          <div
            style={{
              fontFamily: mono,
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: 18,
            }}
          >
            Sources
          </div>
          <ol style={{ paddingLeft: 20, margin: 0 }}>
            {SOURCES.map((s) => (
              <li
                key={s.ref}
                style={{ fontSize: 14, lineHeight: 1.7, color: MID, marginBottom: 14 }}
              >
                {s.ref}{" "}
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: GOLD, textDecoration: "underline" }}
                >
                  Link
                </a>
              </li>
            ))}
          </ol>
          <p
            style={{
              fontSize: 13.5,
              lineHeight: 1.7,
              color: MID,
              marginTop: 20,
              paddingTop: 16,
              borderTop: `1px solid ${RULE}`,
            }}
          >
            Method note. The Chainey and Kyvsgaard and Sorensen papers sit behind publisher
            paywalls. The sample sizes, effect sizes and compliance rates reported here were each
            confirmed against two independent sources before publication. Where a figure could not
            be confirmed twice, it has been left out. If you hold the full texts and we have
            misrepresented either study, write to us and we will correct this page with a date on it.
          </p>
        </div>

        <SignalShareBar
          url={`https://mykei.io/signal/${SLUG}`}
          title={TITLE}
          description={STANDFIRST}
        />
      </article>
    </div>
  );
}
