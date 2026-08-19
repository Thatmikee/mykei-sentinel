export default function JanuaryRetailTheftStoppedLookingRandom() {
  return (
    <article>
      <p>
        This is a January file, written as part of The Signal archive. It looks back at the
        retail crime reporting from January 2026 and asks what the news cycle missed.
      </p>

      <p>
        By late January, the story was no longer just that shoplifting was rising. Retail Gazette
        reported that gangs were targeting one store after another as shoplifting continued to
        climb. That detail matters. A one off theft is an incident. A group moving across stores is
        a pattern. A pattern needs evidence that can survive beyond the shift, the CCTV clip, and
        the memory of whoever was on duty.
      </p>

      <h2>The overlooked word was sequence.</h2>

      <p>
        Most public coverage still treats retail crime as a series of separate moments: this store,
        this offender, this police response, this charge rate. That is useful for reporting. It is
        not enough for retailers trying to understand repeat loss.
      </p>

      <p>
        The operational question is different. What category was hit? How often? Which shelf? Which
        store? Which time window? Was the movement consistent with a sweep? Did the same category
        appear again elsewhere? Without that structure, retailers are left with anecdotes. They may
        know they are being targeted, but they cannot turn the pressure into a clean evidence trail.
      </p>

      <h2>Why this matters for Mykei.</h2>

      <p>
        ADN is built around this gap. The device detects a defined shelf event, deploys a
        controlled marker, and creates a cartridge linked event record in the Mykei Registry.
        Not to make the store look more sophisticated. To give the retailer something concrete:
        device, store, shelf zone, timestamp, cartridge session, marker batch reference. The
        difference between "we keep getting hit" and being able to show the pattern.
      </p>

      <h2>The lesson from January.</h2>

      <p>
        January showed that retail theft had stopped looking random. The gap was that most systems
        still record it as if it were random. CCTV gives a picture. Incident logs give a note. Police
        reports give a case number. None of those, alone, turn the shelf event into structured
        inventory evidence.
      </p>

      <p>
        Forensic retail infrastructure fills the gap between what CCTV records and what a later
        investigation can actually use. Police, guards, cameras, store policy, none of that
        changes. What changes is whether the shelf event itself creates a traceable record.
      </p>

      <p>
        If the same kind of theft happens again, the store should not be starting from zero. It
        should already have a record.
      </p>

      <h2>Read next</h2>

      <p>
        See <a href="/howitworks">how ADN works</a> and the <a href="/adn">ADN product page</a>.
        For retailers with repeat shelf theft, start with a <a href="/pilot">store fit check</a>.
      </p>

      <h2>Source</h2>

      <ul>
        <li>
          <a href="https://www.retailgazette.co.uk/blog/2026/01/brc-ons-retail-theft/" target="_blank" rel="noopener noreferrer">
            Retail Gazette, 29 January 2026: gangs targeting one store after another as shoplifting rises
          </a>
        </li>
      </ul>
    </article>
  );
}
