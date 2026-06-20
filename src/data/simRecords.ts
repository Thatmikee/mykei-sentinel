export interface SimRecord {
  id: string
  pos: number
  ts: string
  scenario: string
  class: string
  level: number
  eligible: boolean
  reason: string
  scores: {
    bulk_sweep: number
    repeated_pick: number
    concealment: number
    restock: number
    staff_anomaly: number
  }
  deploy: boolean
  actual: boolean
}

export const SIM_RECORDS: SimRecord[] = [
  {"id":"MYK-SIM-20260526-000001","pos":1,"ts":"2026-05-26T13:07:53.323Z","scenario":"normal_pick","class":"normal","level":0,"eligible":false,"reason":"normal_interaction","scores":{"bulk_sweep":0.123,"repeated_pick":0.131,"concealment":0.0,"restock":0.119,"staff_anomaly":0.0},"deploy":false,"actual":false},
  {"id":"MYK-SIM-20260526-000002","pos":2,"ts":"2026-05-26T13:07:53.325Z","scenario":"normal_pick","class":"normal","level":0,"eligible":false,"reason":"normal_interaction","scores":{"bulk_sweep":0.076,"repeated_pick":0.129,"concealment":0.026,"restock":0.098,"staff_anomaly":0.0},"deploy":false,"actual":false},
  {"id":"MYK-SIM-20260526-000003","pos":3,"ts":"2026-05-26T13:07:53.326Z","scenario":"fast_multi_buy","class":"normal","level":0,"eligible":false,"reason":"normal_interaction","scores":{"bulk_sweep":0.204,"repeated_pick":0.306,"concealment":0.028,"restock":0.079,"staff_anomaly":0.0},"deploy":false,"actual":false},
  {"id":"MYK-SIM-20260526-000004","pos":4,"ts":"2026-05-26T13:07:53.327Z","scenario":"messy_browsing","class":"normal","level":0,"eligible":false,"reason":"normal_interaction","scores":{"bulk_sweep":0.053,"repeated_pick":0.157,"concealment":0.0,"restock":0.079,"staff_anomaly":0.0},"deploy":false,"actual":false},
  {"id":"MYK-SIM-20260526-000005","pos":5,"ts":"2026-05-26T13:07:53.328Z","scenario":"child_tap","class":"normal","level":0,"eligible":false,"reason":"normal_interaction","scores":{"bulk_sweep":0.236,"repeated_pick":0.126,"concealment":0.0,"restock":0.125,"staff_anomaly":0.0},"deploy":false,"actual":false},
  {"id":"MYK-SIM-20260526-000006","pos":6,"ts":"2026-05-26T13:07:53.329Z","scenario":"staff_restock_on","class":"staff_suppressed","level":0,"eligible":false,"reason":"staff_mode_active","scores":{"bulk_sweep":0.327,"repeated_pick":0.166,"concealment":0.012,"restock":0.86,"staff_anomaly":0.0},"deploy":false,"actual":false},
  {"id":"MYK-SIM-20260526-000007","pos":7,"ts":"2026-05-26T13:07:53.331Z","scenario":"staff_restock_off","class":"restock_pattern","level":0,"eligible":false,"reason":"shelf_filling","scores":{"bulk_sweep":0.222,"repeated_pick":0.2,"concealment":0.012,"restock":0.804,"staff_anomaly":0.0},"deploy":false,"actual":false},
  {"id":"MYK-SIM-20260526-000008","pos":8,"ts":"2026-05-26T13:07:53.333Z","scenario":"classic_bulk_sweep","class":"classic_bulk_sweep","level":4,"eligible":true,"reason":"bulk_removal_threshold","scores":{"bulk_sweep":0.899,"repeated_pick":0.297,"concealment":0.0,"restock":0.101,"staff_anomaly":0.0},"deploy":true,"actual":false},
  {"id":"MYK-SIM-20260526-000009","pos":9,"ts":"2026-05-26T13:07:53.334Z","scenario":"classic_bulk_sweep","class":"classic_bulk_sweep","level":4,"eligible":true,"reason":"bulk_removal_threshold","scores":{"bulk_sweep":0.917,"repeated_pick":0.274,"concealment":0.028,"restock":0.091,"staff_anomaly":0.0},"deploy":true,"actual":false},
  {"id":"MYK-SIM-20260526-000010","pos":10,"ts":"2026-05-26T13:07:53.335Z","scenario":"classic_bulk_sweep","class":"classic_bulk_sweep","level":4,"eligible":true,"reason":"bulk_removal_threshold","scores":{"bulk_sweep":0.885,"repeated_pick":0.254,"concealment":0.006,"restock":0.112,"staff_anomaly":0.0},"deploy":true,"actual":false},
  {"id":"MYK-SIM-20260526-000011","pos":11,"ts":"2026-05-26T13:07:53.337Z","scenario":"bag_drag","class":"classic_bulk_sweep","level":4,"eligible":true,"reason":"bulk_removal_threshold","scores":{"bulk_sweep":0.797,"repeated_pick":0.268,"concealment":0.0,"restock":0.085,"staff_anomaly":0.0},"deploy":true,"actual":false},
  {"id":"MYK-SIM-20260526-000012","pos":12,"ts":"2026-05-26T13:07:53.338Z","scenario":"bag_drag","class":"high_risk_removal","level":3,"eligible":false,"reason":"below_deploy_threshold","scores":{"bulk_sweep":0.724,"repeated_pick":0.307,"concealment":0.036,"restock":0.071,"staff_anomaly":0.0},"deploy":false,"actual":false},
  {"id":"MYK-SIM-20260526-000013","pos":13,"ts":"2026-05-26T13:07:53.339Z","scenario":"calm_repeated_pick","class":"repeated_pick_alert","level":3,"eligible":false,"reason":"cumulative_removal_pattern","scores":{"bulk_sweep":0.106,"repeated_pick":0.551,"concealment":0.463,"restock":0.074,"staff_anomaly":0.0},"deploy":false,"actual":false},
  {"id":"MYK-SIM-20260526-000014","pos":14,"ts":"2026-05-26T13:07:53.341Z","scenario":"calm_repeated_pick","class":"repeated_pick_alert","level":3,"eligible":false,"reason":"cumulative_removal_pattern","scores":{"bulk_sweep":0.198,"repeated_pick":0.684,"concealment":0.457,"restock":0.122,"staff_anomaly":0.0},"deploy":false,"actual":false},
  {"id":"MYK-SIM-20260526-000015","pos":15,"ts":"2026-05-26T13:07:53.342Z","scenario":"slow_basket_theft","class":"repeated_pick_alert","level":3,"eligible":false,"reason":"cumulative_removal_pattern","scores":{"bulk_sweep":0.105,"repeated_pick":0.553,"concealment":0.434,"restock":0.111,"staff_anomaly":0.0},"deploy":false,"actual":false},
  {"id":"MYK-SIM-20260526-000016","pos":16,"ts":"2026-05-26T13:07:53.343Z","scenario":"slow_basket_theft","class":"watch","level":1,"eligible":false,"reason":"elevated_pattern","scores":{"bulk_sweep":0.138,"repeated_pick":0.537,"concealment":0.474,"restock":0.123,"staff_anomaly":0.0},"deploy":false,"actual":false},
  {"id":"MYK-SIM-20260526-000017","pos":17,"ts":"2026-05-26T13:07:53.344Z","scenario":"two_person_block","class":"concealment_alert","level":2,"eligible":false,"reason":"obstruction_or_tamper","scores":{"bulk_sweep":0.159,"repeated_pick":0.22,"concealment":0.834,"restock":0.594,"staff_anomaly":0.0},"deploy":false,"actual":false},
  {"id":"MYK-SIM-20260526-000018","pos":18,"ts":"2026-05-26T13:07:53.346Z","scenario":"coat_concealment","class":"normal","level":0,"eligible":false,"reason":"normal_interaction","scores":{"bulk_sweep":0.063,"repeated_pick":0.156,"concealment":0.0,"restock":0.098,"staff_anomaly":0.0},"deploy":false,"actual":false},
  {"id":"MYK-SIM-20260526-000019","pos":19,"ts":"2026-05-26T13:07:53.347Z","scenario":"coat_concealment","class":"normal","level":0,"eligible":false,"reason":"normal_interaction","scores":{"bulk_sweep":0.098,"repeated_pick":0.119,"concealment":0.0,"restock":0.088,"staff_anomaly":0.0},"deploy":false,"actual":false},
  {"id":"MYK-SIM-20260526-000020","pos":20,"ts":"2026-05-26T13:07:53.348Z","scenario":"single_item_grab","class":"normal","level":0,"eligible":false,"reason":"normal_interaction","scores":{"bulk_sweep":0.108,"repeated_pick":0.1,"concealment":0.0,"restock":0.118,"staff_anomaly":0.0},"deploy":false,"actual":false},
  {"id":"MYK-SIM-20260526-000021","pos":21,"ts":"2026-05-26T13:07:53.349Z","scenario":"single_item_grab","class":"normal","level":0,"eligible":false,"reason":"normal_interaction","scores":{"bulk_sweep":0.078,"repeated_pick":0.102,"concealment":0.02,"restock":0.12,"staff_anomaly":0.0},"deploy":false,"actual":false},
  {"id":"MYK-SIM-20260526-000022","pos":22,"ts":"2026-05-26T13:07:53.351Z","scenario":"staff_mode_abuse","class":"staff_mode_anomaly","level":2,"eligible":false,"reason":"shelf_clearing_under_staff_mode","scores":{"bulk_sweep":0.152,"repeated_pick":0.698,"concealment":0.418,"restock":0.114,"staff_anomaly":0.717},"deploy":false,"actual":false},
  {"id":"MYK-SIM-20260526-000023","pos":23,"ts":"2026-05-26T13:07:53.351Z","scenario":"staff_mode_abuse","class":"staff_mode_anomaly","level":2,"eligible":false,"reason":"shelf_clearing_under_staff_mode","scores":{"bulk_sweep":0.226,"repeated_pick":0.575,"concealment":0.465,"restock":0.089,"staff_anomaly":0.783},"deploy":false,"actual":false},
  {"id":"MYK-SIM-20260526-000024","pos":24,"ts":"2026-05-26T13:07:53.352Z","scenario":"classic_bulk_sweep","class":"staff_suppressed","level":0,"eligible":false,"reason":"staff_mode_active","scores":{"bulk_sweep":0.919,"repeated_pick":0.234,"concealment":0.0,"restock":0.113,"staff_anomaly":0.0},"deploy":false,"actual":false},
]

export const LADDER_LABELS: Record<number, { label: string; color: string; bg: string }> = {
  0: { label: 'L0 · Normal',    color: '#4ADE80', bg: 'rgba(74,222,128,0.08)' },
  1: { label: 'L1 · Watch',     color: '#FACC15', bg: 'rgba(250,204,21,0.08)' },
  2: { label: 'L2 · Alert',     color: '#FB923C', bg: 'rgba(251,146,60,0.08)' },
  3: { label: 'L3 · High Risk', color: '#F87171', bg: 'rgba(248,113,113,0.08)' },
  4: { label: 'L4 · Deploy',    color: '#EF4444', bg: 'rgba(239,68,68,0.12)' },
  5: { label: 'L5 · Override',  color: '#FF0000', bg: 'rgba(255,0,0,0.15)' },
}
