export const commercialTerms = {
  setupFee: 149,
  monthlyFee: 40,
  minimumMonths: 3,
  totalMinimum: 269,
  displayLine: "\u00a3149 setup + \u00a340/month (\u00a3269 minimum, 3 months)",
  pdfRows: [
    { label: "Setup fee",      value: "\u00a3149 (one-time, on pilot start)" },
    { label: "Monthly fee",    value: "\u00a340 per month"                   },
    { label: "Minimum term",   value: "3 months"                             },
    { label: "Total minimum",  value: "\u00a3269"                            },
  ],
} as const;
