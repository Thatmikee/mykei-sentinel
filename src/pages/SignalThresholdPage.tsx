// src/pages/SignalThresholdPage.tsx
// The Signal · Policy · The £200 threshold repeal has not been commenced.
//
// Every legal status in this piece was read off legislation.gov.uk directly on
// 20 August 2026, not taken from press summaries. The commencement position can
// change with a single statutory instrument, so the piece dates its own check
// and says so in the text.

import PageSEO from "@/components/PageSEO";
import SignalShareBar from "@/components/SignalShareBar";
import { RED_EDITION, RED_TYPE } from "@/styles/signalRed";
import SignalRunningHead from "@/components/SignalRunningHead";

const SLUG = "threshold-repealed-still-law";
const TITLE = "The £200 Threshold Was Repealed in April. It Is Still the Law Today.";
const STANDFIRST =
  "Parliament voted to abolish the low-value shoplifting threshold. The government has not switched it on, and will not say when. Meanwhile the provision everyone is arguing about never governed whether police turn up.";
const DATE = "2026-08-20";
const AUTHOR = "Michael Esema";
const CHECKED = "20 August 2026";

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

/** Statutory text, set apart so the reader can see the actual words. */
function Statute({ cite, children }: { cite: string; children: React.ReactNode }) {
  return (
    // Neutral ink rule, not a red stripe. A coloured left border on a panel is
    // the most reliable single tell of generated design; the citation label
    // below carries the accent instead.
    <figure style={{ margin: "30px 0", borderLeft: `2px solid ${INK}`, paddingLeft: 22 }}>
      <blockquote style={{
        margin: 0, fontFamily: MONO, fontSize: 14.5, lineHeight: 1.68, color: INK,
      }}>{children}</blockquote>
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
  { ref: "Crime and Policing Act 2026 (c. 20), section 47, Theft from shop triable either way irrespective of value of goods. Carries the annotations “S. 47 not in force at Royal Assent, see s. 255(1)” and “This version of this provision is prospective”.",
    url: "https://www.legislation.gov.uk/ukpga/2026/20/section/47" },
  { ref: "Crime and Policing Act 2026 (c. 20), section 255, Commencement.",
    url: "https://www.legislation.gov.uk/ukpga/2026/20/section/255" },
  { ref: "Magistrates’ Courts Act 1980, section 22A, Low-value shoplifting. Shown as in force, carrying the not-yet-applied change “s. 22A omitted by 2026 c. 20 s. 47(1)”.",
    url: "https://www.legislation.gov.uk/ukpga/1980/43/section/22A" },
  { ref: "The Crime and Policing Act 2026 (Commencement No. 1 and Saving Provision) Regulations 2026, SI 2026/689 (C. 58), regulation 2. Provisions coming into force on 29 June 2026. Section 47 is not among them.",
    url: "https://www.legislation.gov.uk/uksi/2026/689/regulation/2/made" },
  { ref: "Home Office, Crime and Policing Act 2026: retail crime factsheet.",
    url: "https://www.gov.uk/government/publications/crime-and-policing-act-2026-factsheets/crime-and-policing-act-2026-retail-crime-factsheet" },
  { ref: "Home Office, Crime outcomes in England and Wales 2024 to 2025. Published 5 August 2025.",
    url: "https://www.gov.uk/government/statistics/crime-outcomes-in-england-and-wales-2024-to-2025/crime-outcomes-in-england-and-wales-2024-to-2025" },
  { ref: "Office for National Statistics, Crime in England and Wales: year ending March 2026. Published 23 July 2026.",
    url: "https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/bulletins/crimeinenglandandwales/yearendingmarch2026" },
  { ref: "Full Fact, Has the government ended the “immunity” on “low-value” shoplifting? Government tracker, last updated 23 July 2026. Established the commencement gap publicly before we did.",
    url: "https://fullfact.org/government-tracker/immunity-shoplifting-law/" },
  { ref: "National Police Chiefs’ Council, Retail Crime Action Plan, launched October 2023.",
    url: "https://www.npcc.police.uk/our-work/retail-crime/" },
];

export default function SignalThresholdPage() {
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
        keywords="200 pound shoplifting threshold, section 22A Magistrates Courts Act 1980, Crime and Policing Act 2026 section 47, low-value shoplifting commencement, retail crime law England Wales"
        breadcrumbs={[
          ["Home", "https://mykei.io"],
          ["The Signal", "/signal"],
          ["The £200 threshold is still law", `/signal/${SLUG}`],
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

      <article style={{ maxWidth: 700, margin: "0 auto", padding: "72px clamp(16px,4vw,32px) 96px" }}>
        <div style={{
          fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em",
          textTransform: "uppercase", color: RED, marginBottom: 20,
        }}>
          Policy · {published}
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
          Legal status checked against legislation.gov.uk on {CHECKED}. One
          statutory instrument could change it. If it does, this page gets a
          dated correction rather than a quiet edit.
        </div>

        <P>
          On 29 April 2026 the Crime and Policing Act received Royal Assent.
          Section 47 of it abolishes the £200 shoplifting threshold, the rule
          that has governed how low-value shop theft is tried in England and
          Wales since 2014. Retailers were told the threshold was gone. Trade
          bodies welcomed its removal in the past tense.
        </P>
        <P>
          We read the statute book this morning. Section 22A of the
          Magistrates’ Courts Act 1980 is still there, still in force, and still
          law. It has been law every day since Royal Assent.
        </P>

        <H2>What the Act actually says</H2>
        <P>
          Section 47(1) is one sentence, and it is not ambiguous.
        </P>
        <Statute cite="Crime and Policing Act 2026, section 47(1)">
          In the Magistrates’ Courts Act 1980, omit section 22A (low-value
          shoplifting to be a summary offence).
        </Statute>
        <P>
          Directly beneath it on legislation.gov.uk sits the line that the
          coverage left out.
        </P>
        <Statute cite="Commencement annotation to section 47">
          S. 47 not in force at Royal Assent, see s. 255(1).
        </Statute>
        <P>
          The page also carries a status flag in plain words: this version of
          this provision is prospective. Section 255(1) is the Act’s general
          commencement clause, and it provides that the Act comes into force on
          such day as the Secretary of State may by regulations appoint. Some
          provisions were carved out to commence automatically. Section 47 was
          not one of them. It needs a commencement regulation, and until a
          minister signs one, it does nothing at all.
        </P>

        <H2>No such regulation has been made</H2>
        <P>
          One set of commencement regulations has been made under the Act so
          far: the Commencement No. 1 and Saving Provision Regulations 2026,
          which brought a defined list of provisions into force on 29 June 2026.
          The list runs to dozens of sections covering anti-social behaviour,
          firearms, protest offences and police powers. Section 47 is not in it.
          We found no Commencement No. 2.
        </P>
        <P>
          The statute book agrees with itself on this. The live page for section
          22A still displays its full operative text, including the £200 figure
          and the defendant’s right to elect Crown Court trial, and carries the
          repeal only as a change yet to be applied.
        </P>

        <Pull>
          Royal Assent is permission to switch a law on. It is not the switch.
        </Pull>

        <H2>We are not the first to notice, and that is the story</H2>
        <P>
          Full Fact published this on 23 July 2026. Its government tracker
          states that the Act received Royal Assent, and adds that we do not yet
          know when the provision on shoplifting will come into force. Full Fact
          also asked the Home Office in July for a date and recorded that it had
          not received an answer.
        </P>
        <P>
          So the gap has been public for four weeks, from an organisation whose
          entire function is being believed on questions like this. It has not
          closed. As recently as June, one legal and finance content site was
          still telling readers that all theft from shops is now prosecuted as
          full theft under the Theft Act 1968, regardless of value. That is a
          clean present-tense statement of something that has not happened.
        </P>
        <P>
          The mechanism is not really dishonesty. It is that Royal Assent day
          produces a burst of coverage written in the settled tense, the Act is
          real and the words in it are real, and almost nobody goes back four
          weeks later to check which parts were actually turned on. A retailer
          reading that coverage has no reason to doubt it. Neither did we, until
          we looked.
        </P>

        <H2>The deeper error, which survives commencement</H2>
        <P>
          There is a second problem, and unlike the first one it will not be
          fixed by a statutory instrument.
        </P>
        <P>
          Section 22A is a mode of trial provision. It says that low-value
          shoplifting, meaning goods worth £200 or less taken by someone
          purporting to be a customer, is triable only summarily, in the
          magistrates’ court, unless the defendant elects a jury. That is the
          whole of its effect. It does not say police may decline to attend. It
          does not set a threshold for recording a crime. It does not touch the
          charging decision, which belongs to the Code for Crown Prosecutors.
        </P>
        <P>
          It has nonetheless been reported for years as the reason police do not
          come out for thefts under £200. That is not what it does, and it never
          was. The clearest confirmation comes from the government’s own
          factsheet on the Act, which explains the case for repeal like this.
        </P>
        <Statute cite="Home Office, Crime and Policing Act 2026: retail crime factsheet">
          police have confirmed the £200 threshold does not preclude police
          action […] This has created a perception that police will not respond
          to low-value shop theft and offenders will escape punishment.
        </Statute>
        <P>
          Read that twice, because the government is being unusually candid. The
          department repealing the threshold is not claiming the threshold
          stopped police acting. It is saying police have confirmed it did not,
          and that the problem being solved is a perception. Removing perceived
          immunity is the phrase the factsheet uses.
        </P>
        <P>
          That may well be worth doing. Perception is not nothing: if retailers
          stop reporting because they believe reporting is pointless, the
          recorded crime figures fall for reasons that have nothing to do with
          crime falling, and every decision made downstream is made on a
          corrupted number. But it should be argued on those terms, rather than
          sold as the moment police start turning up.
        </P>

        <H2>The number that actually binds</H2>
        <P>
          If the constraint on shop theft enforcement is not mode of trial, what
          is it? The Home Office publishes the answer every year and it attracts
          a fraction of the attention the threshold does.
        </P>
        <P>
          In the year ending March 2025, 55.3 per cent of shoplifting offences
          in England and Wales were closed because no suspect had been
          identified. Not declined. Not diverted. Nobody was ever identified. In
          the same period the charge rate for shoplifting was 18.5 per cent, up
          from 16.4 per cent the year before, and materially higher than the 2.5
          per cent charge rate for other theft offences.
        </P>
        <P>
          Set that against the volume. Police recorded 507,086 shoplifting
          offences in the year ending March 2026, a 4 per cent fall from 530,324
          the year before, and the first fall after a long run of increases.
        </P>
        <P>
          So the majority failure mode is not that the courts were the wrong
          venue. It is that in more than half of recorded cases, the system
          never established who did it. Changing which courtroom a case could
          have been heard in does not move that number. Nothing about section 47
          identifies a single additional suspect.
        </P>

        <Pull>
          You cannot sentence someone you never identified.
        </Pull>

        <H2>What repeal will genuinely change</H2>
        <P>
          Three things, none of them nothing.
        </P>
        <P>
          Shop theft of any value becomes an either way offence under the
          general theft regime, carrying a maximum of seven years rather than
          the summary ceiling. Prolific offenders whose individual thefts sit
          under £200 stop being structurally insulated from the higher
          sentencing range, which matters because the cases that concern
          retailers most are cumulative rather than individually serious. And
          the signalling value is real, in both directions: to offenders, and to
          the shop worker deciding whether reporting is worth the paperwork.
        </P>
        <P>
          The cost side deserves saying out loud too. Making every shop theft
          either way creates a route into a Crown Court system already carrying
          a substantial backlog. How many cases would actually take that route
          is the one number we could not find, and we looked. Nobody appears to
          publish how many sub-£200 shop theft cases currently reach the Crown
          Court by election. Without it, anyone forecasting the effect of this
          repeal, in either direction, is estimating.
        </P>

        <H2>Our position, stated</H2>
        <P>
          Mykei Securities is building a product for this market, which means we
          have a commercial interest in retail theft being taken seriously and
          in evidence at the shelf being considered valuable. A reader is
          entitled to weigh that against everything above.
        </P>
        <P>
          It cuts against us in one specific way worth naming. The finding here,
          that identification rather than sentencing is the binding constraint,
          is convenient for a company selling evidence capture. We did not go
          looking for it. It came out of the Home Office outcomes table, which
          has said the same thing for years to anyone who opened it. But you
          should discount it accordingly, and check the table yourself. It is
          linked below.
        </P>

        <H2>What we could not verify</H2>
        <P>
          Four things, listed because leaving them out would make this piece look
          more complete than it is.
        </P>
        <P>
          We could not obtain any Home Office timetable for commencing section
          47; Full Fact’s request was outstanding as of 23 July and we found no
          answer since. We could not find published data on how many low-value
          shop theft cases currently reach the Crown Court by election. We did
          not audit the national press for the same error, so we cannot say how
          widespread it is beyond the trade and specialist coverage we read. And
          we have not independently confirmed the Act’s territorial extent
          clause for section 47, though section 22A itself applies to England and
          Wales.
        </P>
        <P>
          If a commencement regulation lands tomorrow, this piece becomes a
          historical note within a day, and we will date and mark it as such
          rather than deleting it.
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
            Method note. Every legal status above was read directly from
            legislation.gov.uk on {CHECKED} rather than taken from press
            summaries, and every statistic is quoted from the primary
            publication with its period and publication date given. Commencement
            status can change without notice. If you find an error here, write to
            protocol@mykei.io and this page will carry a dated correction.
          </p>
        </div>

        <SignalShareBar url={`https://mykei.io/signal/${SLUG}`} title={TITLE} description={STANDFIRST} />
      </article>
    </div>
  );
}
