import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { SIM_RECORDS, LADDER_LABELS, type SimRecord } from '../data/simRecords'

// ─── PIN Gate ──────────────────────────────────────────────────────────────

const CORRECT_PIN = import.meta.env.VITE_INTEL_PIN || '2626'
const SESSION_KEY = 'myk_intel_auth'

function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin]     = useState('')
  const [shake, setShake] = useState(false)
  const [hint, setHint]   = useState('')

  const attempt = (val: string) => {
    if (val === CORRECT_PIN) {
      sessionStorage.setItem(SESSION_KEY, '1')
      onUnlock()
    } else if (val.length === 4) {
      setShake(true)
      setHint('Access denied')
      setTimeout(() => { setShake(false); setPin(''); setHint('') }, 900)
    }
  }

  const press = (d: string) => {
    const next = d === 'DEL' ? pin.slice(0, -1) : pin.length < 4 ? pin + d : pin
    setPin(next)
    if (next.length === 4) attempt(next)
  }

  const KEYS = ['1','2','3','4','5','6','7','8','9','DEL','0','OK']

  return (
    <div style={{
      minHeight: '100dvh', background: '#050505',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      <motion.div
        animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
        transition={{ duration: 0.45 }}
        style={{ textAlign: 'center', padding: '0 24px', maxWidth: 340, width: '100%' }}
      >
        {/* Logo line */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#3a3a3a', marginBottom: 8 }}>
            Mykei Securities Ltd
          </div>
          <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8962E' }}>
            Intelligence Centre
          </div>
        </div>

        {/* PIN dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 32 }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{
              width: 12, height: 12, borderRadius: '50%',
              background: pin.length > i ? '#B8962E' : 'transparent',
              border: `1px solid ${pin.length > i ? '#B8962E' : '#2a2a2a'}`,
              transition: 'all 0.15s ease',
            }} />
          ))}
        </div>

        {hint && (
          <div style={{ fontSize: 10, color: '#EF4444', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20 }}>
            {hint}
          </div>
        )}

        {/* Keypad */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {KEYS.map(k => (
            <button key={k} onClick={() => press(k)} style={{
              background: k === 'DEL' ? '#111' : k === 'OK' ? '#B8962E22' : '#111',
              border: '1px solid #1e1e1e',
              color: k === 'DEL' ? '#555' : k === 'OK' ? '#B8962E' : '#ccc',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: k === 'DEL' ? 10 : 18,
              padding: '16px 0',
              cursor: 'pointer',
              letterSpacing: '0.05em',
              borderRadius: 4,
              transition: 'background 0.1s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#1e1e1e')}
            onMouseLeave={e => (e.currentTarget.style.background = k === 'OK' ? '#B8962E22' : '#111')}
            >
              {k === 'DEL' ? '⌫' : k}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 36, fontSize: 9, color: '#252525', letterSpacing: '0.12em' }}>
          AUTHORISED ACCESS ONLY · ADN-SIM-D001
        </div>
      </motion.div>
    </div>
  )
}

// ─── Utilities ─────────────────────────────────────────────────────────────

function levelColor(l: number) { return LADDER_LABELS[l]?.color ?? '#888' }

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  const [w, setW] = useState(0)
  useEffect(() => { const t = setTimeout(() => setW(value), 120); return () => clearTimeout(t) }, [value])
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#555' }}>{label}</span>
        <span style={{ fontSize: 10, color }}>{(value * 100).toFixed(0)}%</span>
      </div>
      <div style={{ height: 2, background: '#111', borderRadius: 2 }}>
        <div style={{
          height: 2, borderRadius: 2, background: color,
          width: `${w * 100}%`,
          transition: 'width 0.9s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: `0 0 6px ${color}55`,
        }} />
      </div>
    </div>
  )
}

// ─── AI Panel ──────────────────────────────────────────────────────────────

function AiPanel({ records }: { records: SimRecord[] }) {
  const [text, setText]     = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone]     = useState(false)

  const analyse = useCallback(async () => {
    const key = import.meta.env.VITE_GEMINI_API_KEY
    if (!key) { setText('Set VITE_GEMINI_API_KEY in .env.local to enable AI analysis.'); setDone(true); return }
    setLoading(true)
    setText('')
    setDone(false)

    const summary = records.map(r =>
      `E${r.pos} ${r.scenario} L${r.level} bulk=${r.scores.bulk_sweep.toFixed(2)} pick=${r.scores.repeated_pick.toFixed(2)} conceal=${r.scores.concealment.toFixed(2)} staff_anom=${r.scores.staff_anomaly.toFixed(2)} deploy=${r.deploy}`
    ).join('\n')

    const prompt = `You are analysing Active Deterrence Node simulation run data from Mykei Securities Ltd. The Active Deterrence Node is a retail theft deterrence device using radar, ToF sensors and acoustic sensors.

Ladder: L0=normal, L1=watch, L2=alert, L3=high-risk, L4=deploy-eligible, L5=override.
Scores: bulk_sweep, repeated_pick, concealment, restock, staff_anomaly. Each 0–1.

Events:
${summary}

Surface exactly 3 behavioural patterns you detected. For each: give it a name, explain what the data shows, and note the commercial implication for a retailer. Be direct and technical. No markdown headers. Separate patterns with ——.`

    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai')
      const genAI = new GoogleGenerativeAI(key)
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
      const result = await model.generateContentStream(prompt)

      for await (const chunk of result.stream) {
        const part = chunk.text()
        setText(prev => prev + part)
      }
      setDone(true)
    } catch (e) {
      setText(`Analysis error: ${e instanceof Error ? e.message : String(e)}`)
      setDone(true)
    } finally {
      setLoading(false)
    }
  }, [records])

  return (
    <div style={{
      background: '#0a0a0a',
      border: '1px solid #1e1e1e',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8962E' }}>
          Gemini Pattern Analysis
        </span>
        {!loading && (
          <button
            onClick={analyse}
            style={{
              background: 'transparent',
              border: '1px solid #B8962E33',
              color: '#B8962E',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '6px 14px',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#B8962E')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#B8962E33')}
          >
            {done ? 'Re-analyse' : 'Analyse Run'}
          </button>
        )}
        {loading && (
          <span style={{ fontSize: 9, color: '#555', letterSpacing: '0.14em' }}>
            reading patterns...
          </span>
        )}
      </div>

      {(text || loading) ? (
        <div style={{
          fontSize: 12,
          lineHeight: 1.8,
          color: '#888',
          whiteSpace: 'pre-wrap',
          maxHeight: 280,
          overflowY: 'auto',
          fontFamily: "'Outfit', sans-serif",
        }}>
          {text}
          {loading && <span style={{
            display: 'inline-block', width: 6, height: 12, background: '#B8962E',
            marginLeft: 3, verticalAlign: 'middle',
            animation: 'blink 0.8s step-end infinite',
          }} />}
        </div>
      ) : (
        <div style={{ fontSize: 11, color: '#2a2a2a', fontStyle: 'italic' }}>
          Press Analyse to surface behavioural patterns from this run using Gemini.
        </div>
      )}
    </div>
  )
}

// ─── Live Event Feed ────────────────────────────────────────────────────────

function EventFeed({ records, playing }: { records: SimRecord[]; playing: boolean }) {
  const [visible, setVisible] = useState<SimRecord[]>([])
  const indexRef = useRef(0)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!playing) { setVisible(records); indexRef.current = records.length; return }
    setVisible([])
    indexRef.current = 0
    const id = setInterval(() => {
      if (indexRef.current >= records.length) { clearInterval(id); return }
      setVisible(prev => [...prev, records[indexRef.current]])
      indexRef.current++
    }, 220)
    return () => clearInterval(id)
  }, [playing, records])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [visible])

  return (
    <div style={{
      background: '#050505',
      border: '1px solid #1a1a1a',
      fontFamily: "'JetBrains Mono', monospace",
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        padding: '10px 16px',
        borderBottom: '1px solid #1a1a1a',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#333' }}>
          Event Log · ADN-SIM-D001
        </span>
        <span style={{ fontSize: 9, color: '#222' }}>
          {visible.length}/{records.length} events
        </span>
      </div>

      <div style={{ maxHeight: 320, overflowY: 'auto', padding: '6px 0' }}>
        <AnimatePresence initial={false}>
          {visible.map((r) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '28px 56px 130px 1fr',
                gap: '0 10px',
                padding: '7px 16px',
                borderBottom: '1px solid #0d0d0d',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: 9, color: '#333' }}>E{r.pos}</span>
              <span style={{
                fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
                color: levelColor(r.level),
              }}>
                {LADDER_LABELS[r.level]?.label.split('·')[0].trim()}
              </span>
              <span style={{ fontSize: 10, color: '#444', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {r.scenario}
              </span>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {r.deploy && (
                  <span style={{
                    fontSize: 8, fontWeight: 700, letterSpacing: '0.1em',
                    color: '#EF4444', border: '1px solid #EF444433', padding: '1px 5px',
                  }}>
                    WOULD DEPLOY
                  </span>
                )}
                <span style={{ fontSize: 9, color: '#2a2a2a' }}>
                  bs:{(r.scores.bulk_sweep*100).toFixed(0)} rp:{(r.scores.repeated_pick*100).toFixed(0)} cc:{(r.scores.concealment*100).toFixed(0)}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>
    </div>
  )
}

// ─── AI Scenario Generator ──────────────────────────────────────────────────

async function generateSimRun(): Promise<SimRecord[]> {
  const key = import.meta.env.VITE_GEMINI_API_KEY
  if (!key) return SIM_RECORDS

  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const prompt = `You are the ADN (Active Deterrence Node) simulation engine for Mykei Securities Ltd. Generate a realistic retail theft deterrence simulation run.

Return ONLY a valid JSON array of 22-28 events. No markdown fences, no explanation, just the raw JSON array.

Each event must exactly match this shape:
{"id":"MYK-SIM-${today}-<6digit zero-padded>","pos":<int from 1>,"ts":"<ISO timestamp>","scenario":"<name>","class":"<class>","level":<0-5>,"eligible":<bool>,"reason":"<string>","scores":{"bulk_sweep":<0-1>,"repeated_pick":<0-1>,"concealment":<0-1>,"restock":<0-1>,"staff_anomaly":<0-1>},"deploy":<bool — only true when level==4 or 5>,"actual":false}

Level rules:
L0 normal: ~55% of events, low scores across all dimensions
L1 watch: ~15%, mildly elevated repeated_pick or bulk_sweep
L2 alert: ~12%, concealment >= 0.5 OR staff_anomaly >= 0.5
L3 high risk: ~10%, repeated_pick >= 0.5 AND concealment >= 0.3
L4 deploy: ~6%, bulk_sweep >= 0.78, deploy must be true, eligible must be true
L5 override: 0-1 events maximum, bulk_sweep >= 0.95 AND another score >= 0.7

Scenario names to use (mix freely, add variety): normal_pick, fast_multi_buy, messy_browsing, child_tap, staff_restock_on, staff_restock_off, classic_bulk_sweep, bag_drag, calm_repeated_pick, slow_basket_theft, two_person_block, coat_concealment, single_item_grab, staff_mode_abuse, trolley_load, return_visit, loitering, item_swap, decoy_group, shoulder_block, price_tag_swap, distraction_technique, pocket_concealment, group_sweep

Make each run feel different. Vary scenario order, mix of events, and exact score values. Be realistic and technically precise.`

  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai')
    const genAI = new GoogleGenerativeAI(key)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent(prompt)
    const raw = result.response.text().trim()
    const jsonStr = raw.startsWith('[') ? raw : raw.slice(raw.indexOf('['), raw.lastIndexOf(']') + 1)
    const parsed: SimRecord[] = JSON.parse(jsonStr)
    return parsed.map((r, i) => ({ ...r, pos: i + 1 }))
  } catch {
    return SIM_RECORDS
  }
}

// ─── Main Dashboard ─────────────────────────────────────────────────────────

function Dashboard() {
  const [playing, setPlaying]   = useState(false)
  const [generating, setGenerating] = useState(false)
  const [records, setRecords]   = useState<SimRecord[]>(SIM_RECORDS)
  const [tick, setTick]         = useState(0)
  const [genError, setGenError] = useState(false)

  const rerun = async () => {
    if (playing || generating) return
    const hasKey = !!import.meta.env.VITE_GEMINI_API_KEY
    if (hasKey) {
      setGenerating(true)
      setGenError(false)
      try {
        const generated = await generateSimRun()
        setRecords(generated)
      } catch {
        setGenError(true)
        setRecords(SIM_RECORDS)
      }
      setGenerating(false)
    }
    setTick(t => t + 1)
    setPlaying(true)
    setTimeout(() => setPlaying(false), (hasKey ? records.length : SIM_RECORDS.length) * 220 + 400)
  }

  const ladderDist = records.reduce<Record<number, number>>((acc, r) => {
    acc[r.level] = (acc[r.level] || 0) + 1
    return acc
  }, {})

  const radarData = [
    { subject: 'Bulk Sweep',    A: +(records.reduce((s, r) => s + r.scores.bulk_sweep, 0) / records.length * 100).toFixed(1) },
    { subject: 'Repeated Pick', A: +(records.reduce((s, r) => s + r.scores.repeated_pick, 0) / records.length * 100).toFixed(1) },
    { subject: 'Concealment',   A: +(records.reduce((s, r) => s + r.scores.concealment, 0) / records.length * 100).toFixed(1) },
    { subject: 'Restock',       A: +(records.reduce((s, r) => s + r.scores.restock, 0) / records.length * 100).toFixed(1) },
    { subject: 'Staff Anom.',   A: +(records.reduce((s, r) => s + r.scores.staff_anomaly, 0) / records.length * 100).toFixed(1) },
  ]

  const highestRisk = [...records].sort((a, b) => b.level - a.level).slice(0, 3)

  const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }

  return (
    <div style={{ minHeight: '100dvh', background: '#050505', color: '#ccc', ...MONO }}>

      {/* Top bar */}
      <div style={{
        background: '#080808',
        borderBottom: '1px solid #1a1a1a',
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#B8962E' }}>
            Mykei Intelligence Centre
          </span>
          <span style={{ width: 1, height: 14, background: '#1e1e1e', display: 'inline-block' }} />
          <span style={{ fontSize: 9, letterSpacing: '0.16em', color: '#333' }}>
            ADN-SIM-D001
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontSize: 9, color: '#4ADE80', letterSpacing: '0.12em',
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: '50%', background: '#4ADE80',
              animation: 'pulse-dot 2s ease-in-out infinite',
            }} />
            {generating ? 'AI GENERATING...' : 'SIM MODE ACTIVE'}
          </span>
          {genError && (
            <span style={{ fontSize: 9, color: '#EF4444', letterSpacing: '0.1em' }}>
              FALLBACK · static records used
            </span>
          )}
          <button
            onClick={rerun}
            disabled={playing || generating}
            style={{
              background: (playing || generating) ? '#111' : '#B8962E18',
              border: '1px solid #B8962E44',
              color: (playing || generating) ? '#444' : '#B8962E',
              ...MONO,
              fontSize: 9,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '6px 14px',
              cursor: (playing || generating) ? 'default' : 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {generating ? 'Generating...' : playing ? 'Running...' : 'Run Simulation'}
          </button>
        </div>
      </div>

      <div style={{ padding: 'clamp(16px, 3vw, 28px)', maxWidth: 1200, margin: '0 auto' }}>

        {/* Stats row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: 1,
          background: '#111',
          border: '1px solid #111',
          marginBottom: 20,
        }}>
          {[
            { label: 'Total Events', val: records.length, color: '#ccc' },
            { label: 'L4 Deploy-Eligible', val: ladderDist[4] ?? 0, color: '#EF4444' },
            { label: 'L3 High Risk', val: ladderDist[3] ?? 0, color: '#F87171' },
            { label: 'L2 Alert', val: ladderDist[2] ?? 0, color: '#FB923C' },
            { label: 'L0 Normal', val: ladderDist[0] ?? 0, color: '#4ADE80' },
            { label: 'Would Deploy', val: records.filter(r => r.deploy).length, color: '#EF4444' },
          ].map(s => (
            <div key={s.label} style={{
              background: '#080808',
              padding: '16px 18px',
              display: 'flex', flexDirection: 'column', gap: 6,
            }}>
              <span style={{ fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2a2a2a' }}>
                {s.label}
              </span>
              <span style={{ fontSize: 28, fontWeight: 700, color: s.color, lineHeight: 1 }}>
                {s.val}
              </span>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 16 }} className="intel-main-grid">

          {/* Left: event feed + AI */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <EventFeed key={tick} records={records} playing={playing} />
            <AiPanel records={records} />
          </div>

          {/* Right: radar + ladder + score bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Score radar */}
            <div style={{ background: '#080808', border: '1px solid #1a1a1a', padding: '16px 12px' }}>
              <div style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#333', marginBottom: 10 }}>
                Avg Score Distribution
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#1a1a1a" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 8, fill: '#444', fontFamily: "'JetBrains Mono', monospace" }} />
                  <Radar name="Score" dataKey="A" stroke="#B8962E" fill="#B8962E" fillOpacity={0.12} strokeWidth={1.5} />
                  <Tooltip
                    contentStyle={{ background: '#0a0a0a', border: '1px solid #1e1e1e', fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}
                    formatter={(v: number) => [`${v}%`, 'Avg']}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Ladder distribution */}
            <div style={{ background: '#080808', border: '1px solid #1a1a1a', padding: 16 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#333', marginBottom: 14 }}>
                Ladder Distribution
              </div>
              {[0,1,2,3,4,5].map(l => {
                const count = ladderDist[l] ?? 0
                const pct   = records.length > 0 ? count / records.length : 0
                return (
                  <div key={l} style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 9, color: LADDER_LABELS[l]?.color ?? '#555' }}>
                        {LADDER_LABELS[l]?.label}
                      </span>
                      <span style={{ fontSize: 9, color: '#333' }}>{count}</span>
                    </div>
                    <div style={{ height: 2, background: '#0d0d0d' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct * 100}%` }}
                        transition={{ duration: 1, delay: l * 0.08, ease: [0.16,1,0.3,1] }}
                        style={{
                          height: 2,
                          background: LADDER_LABELS[l]?.color ?? '#333',
                          boxShadow: `0 0 4px ${LADDER_LABELS[l]?.color ?? '#333'}66`,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Score breakdown for top 3 events */}
            <div style={{ background: '#080808', border: '1px solid #1a1a1a', padding: 16 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#333', marginBottom: 14 }}>
                Top Risk Events
              </div>
              {highestRisk.map((r, i) => (
                <div key={r.id} style={{
                  marginBottom: i < 2 ? 14 : 0,
                  paddingBottom: i < 2 ? 14 : 0,
                  borderBottom: i < 2 ? '1px solid #0d0d0d' : 'none',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 10, color: levelColor(r.level) }}>E{r.pos} · {r.scenario}</span>
                    <span style={{ fontSize: 8, color: '#333' }}>L{r.level}</span>
                  </div>
                  <ScoreBar label="Bulk Sweep" value={r.scores.bulk_sweep} color="#EF4444" />
                  <ScoreBar label="Repeated Pick" value={r.scores.repeated_pick} color="#FB923C" />
                  <ScoreBar label="Concealment" value={r.scores.concealment} color="#FACC15" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%,100% { opacity: 1; } 50% { opacity: 0.3; }
        }
        @keyframes blink {
          0%,100% { opacity: 1; } 50% { opacity: 0; }
        }
        .intel-main-grid {
          @media (max-width: 720px) {
            grid-template-columns: 1fr !important;
          }
        }
        ::-webkit-scrollbar { width: 3px; height: 3px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #1e1e1e; }
      `}</style>
    </div>
  )
}

// ─── Page Root ──────────────────────────────────────────────────────────────

export default function SimIntelPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')

  if (!authed) return <PinGate onUnlock={() => setAuthed(true)} />
  return <Dashboard />
}
