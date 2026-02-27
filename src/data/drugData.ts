export interface Drug {
  id: string;
  name: string;
  class: string;
}

export interface InteractionMetadata {
  label: string;
  symbol: string;
  color: string;
  description: string;
  riskScale: number;
}

export interface InteractionEvidence {
  code: string;
  summary: string;
  confidence: "high" | "medium" | "low" | "n/a";
  sources: string;
  mechanisms: string[];
}

export const DRUGS: Drug[] = [
  { id: "LSD", name: "LSD", class: "Psychedelic" },
  { id: "Mushrooms", name: "Mushrooms", class: "Psychedelic" },
  { id: "DMT", name: "DMT", class: "Psychedelic" },
  { id: "Mescaline", name: "Mescaline", class: "Psychedelic" },
  { id: "DOx", name: "DOx", class: "Psychedelic" },
  { id: "NBOMes", name: "NBOMes", class: "Psychedelic" },
  { id: "2C-x", name: "2C-x", class: "Psychedelic" },
  { id: "2C-T-x", name: "2C-T-x", class: "Psychedelic" },
  { id: "5-MeO-xT", name: "5-MeO-xT", class: "Psychedelic" },
  { id: "Cannabis", name: "Cannabis", class: "Cannabinoid" },
  { id: "Ketamine", name: "Ketamine", class: "Dissociative" },
  { id: "MXE", name: "MXE", class: "Dissociative" },
  { id: "DXM", name: "DXM", class: "Dissociative" },
  { id: "Nitrous", name: "Nitrous", class: "Dissociative" },
  { id: "Amphetamines", name: "Amphetamines", class: "Stimulant" },
  { id: "MDMA", name: "MDMA", class: "Stimulant/Entactogen" },
  { id: "Cocaine", name: "Cocaine", class: "Stimulant" },
  { id: "Caffeine", name: "Caffeine", class: "Stimulant" },
  { id: "Alcohol", name: "Alcohol", class: "Depressant" },
  { id: "GHB/GBL", name: "GHB/GBL", class: "Depressant" },
  { id: "Opioids", name: "Opioids", class: "Depressant" },
  { id: "Tramadol", name: "Tramadol", class: "Depressant" },
  { id: "Benzodiazepines", name: "Benzodiazepines", class: "Depressant" },
  { id: "MAOIs", name: "MAOIs", class: "Antidepressant" },
  { id: "SSRIs", name: "SSRIs", class: "Antidepressant" }
];

export const LEGEND: Record<string, InteractionMetadata> = {
  LRS: {
    label: "Low Risk & Synergy",
    symbol: "UP",
    color: "#1C8AD1",
    description: "Generally low-risk combination with potential synergistic effects.",
    riskScale: 1
  },
  LRN: {
    label: "Low Risk & No Synergy",
    symbol: "CIRCLE",
    color: "#3EA5E6",
    description: "Generally low-risk combination without notable synergy.",
    riskScale: 1
  },
  LRD: {
    label: "Low Risk & Decrease",
    symbol: "DOWN",
    color: "#106DAE",
    description: "Generally low-risk combination where one effect may reduce another.",
    riskScale: 2
  },
  CAU: {
    label: "Caution",
    symbol: "WARN",
    color: "#D7CA25",
    description: "Use caution; increased side-effect or unpredictability risk.",
    riskScale: 3
  },
  UNS: {
    label: "Unsafe",
    symbol: "HEART",
    color: "#DD8B28",
    description: "Unsafe combination with substantial risk.",
    riskScale: 4
  },
  DAN: {
    label: "Dangerous",
    symbol: "X",
    color: "#E21B2B",
    description: "Dangerous combination; avoid.",
    riskScale: 5
  },
  UNK: {
    label: "Unknown / Insufficient Data",
    symbol: "INFO",
    color: "#6C757D",
    description: "No explicit matrix classification found for this pair.",
    riskScale: 0
  },
  SELF: {
    label: "Same Drug / N-A",
    symbol: "SELF",
    color: "#274F13",
    description: "Diagonal label cell for the same substance; not an interaction rating.",
    riskScale: -1
  }
};

// Simplified matrix for quick lookup: [drug1_id][drug2_id] = interaction_code
export const INTERACTIONS: Record<string, Record<string, string>> = {
  LSD: { LSD: "SELF", Mushrooms: "LRS", DMT: "LRS", Mescaline: "LRS", DOx: "LRS", NBOMes: "LRS", "2C-x": "LRS", "2C-T-x": "LRS", "5-MeO-xT": "LRS", Cannabis: "CAU", Ketamine: "LRS", MXE: "LRS", DXM: "LRS", Nitrous: "LRS", Amphetamines: "CAU", MDMA: "LRS", Cocaine: "CAU", Caffeine: "LRN", Alcohol: "LRD", "GHB/GBL": "LRD", Opioids: "LRN", Tramadol: "UNS", Benzodiazepines: "LRD", MAOIs: "LRD", SSRIs: "LRD" },
  Mushrooms: { LSD: "LRS", Mushrooms: "SELF", DMT: "LRS", Mescaline: "LRS", DOx: "LRS", NBOMes: "LRS", "2C-x": "LRS", "2C-T-x": "LRS", "5-MeO-xT": "LRS", Cannabis: "CAU", Ketamine: "LRS", MXE: "LRS", DXM: "LRS", Nitrous: "LRS", Amphetamines: "CAU", MDMA: "LRS", Cocaine: "CAU", Caffeine: "LRN", Alcohol: "LRD", "GHB/GBL": "LRD", Opioids: "LRN", Tramadol: "UNS", Benzodiazepines: "LRD", MAOIs: "LRS", SSRIs: "LRD" },
  DMT: { LSD: "LRS", Mushrooms: "LRS", DMT: "SELF", Mescaline: "LRS", DOx: "LRS", NBOMes: "LRS", "2C-x": "LRS", "2C-T-x": "LRS", "5-MeO-xT": "LRS", Cannabis: "CAU", Ketamine: "LRS", MXE: "LRS", DXM: "LRS", Nitrous: "LRS", Amphetamines: "CAU", MDMA: "LRS", Cocaine: "CAU", Caffeine: "LRN", Alcohol: "LRD", "GHB/GBL": "LRD", Opioids: "LRN", Tramadol: "UNS", Benzodiazepines: "LRD", MAOIs: "LRS", SSRIs: "LRD" },
  Mescaline: { LSD: "LRS", Mushrooms: "LRS", DMT: "LRS", Mescaline: "SELF", DOx: "CAU", NBOMes: "CAU", "2C-x": "CAU", "2C-T-x": "CAU", "5-MeO-xT": "CAU", Cannabis: "CAU", Ketamine: "LRS", MXE: "LRS", DXM: "LRS", Nitrous: "LRS", Amphetamines: "CAU", MDMA: "LRS", Cocaine: "CAU", Caffeine: "LRN", Alcohol: "LRD", "GHB/GBL": "LRD", Opioids: "LRN", Tramadol: "UNS", Benzodiazepines: "LRD", MAOIs: "CAU", SSRIs: "LRD" },
  DOx: { LSD: "LRS", Mushrooms: "LRS", DMT: "LRS", Mescaline: "CAU", DOx: "SELF", NBOMes: "CAU", "2C-x": "CAU", "2C-T-x": "CAU", "5-MeO-xT": "CAU", Cannabis: "CAU", Ketamine: "LRS", MXE: "CAU", DXM: "UNS", Nitrous: "LRS", Amphetamines: "UNS", MDMA: "CAU", Cocaine: "UNS", Caffeine: "CAU", Alcohol: "LRD", "GHB/GBL": "LRD", Opioids: "LRN", Tramadol: "UNS", Benzodiazepines: "LRD", MAOIs: "CAU", SSRIs: "LRD" },
  NBOMes: { LSD: "LRS", Mushrooms: "LRS", DMT: "LRS", Mescaline: "CAU", DOx: "CAU", NBOMes: "SELF", "2C-x": "CAU", "2C-T-x": "CAU", "5-MeO-xT": "CAU", Cannabis: "CAU", Ketamine: "LRS", MXE: "CAU", DXM: "UNS", Nitrous: "LRS", Amphetamines: "UNS", MDMA: "CAU", Cocaine: "UNS", Caffeine: "CAU", Alcohol: "LRD", "GHB/GBL": "LRD", Opioids: "LRN", Tramadol: "UNS", Benzodiazepines: "LRD", MAOIs: "CAU", SSRIs: "LRD" },
  "2C-x": { LSD: "LRS", Mushrooms: "LRS", DMT: "LRS", Mescaline: "CAU", DOx: "CAU", NBOMes: "CAU", "2C-x": "SELF", "2C-T-x": "CAU", "5-MeO-xT": "CAU", Cannabis: "CAU", Ketamine: "LRS", MXE: "LRS", DXM: "LRS", Nitrous: "LRS", Amphetamines: "CAU", MDMA: "LRS", Cocaine: "CAU", Caffeine: "LRN", Alcohol: "LRD", "GHB/GBL": "LRD", Opioids: "LRN", Tramadol: "UNS", Benzodiazepines: "LRD", MAOIs: "CAU", SSRIs: "LRD" },
  "2C-T-x": { LSD: "LRS", Mushrooms: "LRS", DMT: "LRS", Mescaline: "CAU", DOx: "CAU", NBOMes: "CAU", "2C-x": "CAU", "2C-T-x": "SELF", "5-MeO-xT": "CAU", Cannabis: "CAU", Ketamine: "LRS", MXE: "CAU", DXM: "UNS", Nitrous: "LRS", Amphetamines: "UNS", MDMA: "CAU", Cocaine: "UNS", Caffeine: "LRN", Alcohol: "LRD", "GHB/GBL": "LRD", Opioids: "LRN", Tramadol: "UNS", Benzodiazepines: "LRD", MAOIs: "CAU", SSRIs: "LRD" },
  "5-MeO-xT": { LSD: "LRS", Mushrooms: "LRS", DMT: "LRS", Mescaline: "CAU", DOx: "CAU", NBOMes: "CAU", "2C-x": "CAU", "2C-T-x": "CAU", "5-MeO-xT": "SELF", Cannabis: "CAU", Ketamine: "LRS", MXE: "LRS", DXM: "UNS", Nitrous: "LRS", Amphetamines: "UNS", MDMA: "CAU", Cocaine: "UNS", Caffeine: "LRN", Alcohol: "LRD", "GHB/GBL": "LRD", Opioids: "LRN", Tramadol: "UNS", Benzodiazepines: "LRD", MAOIs: "DAN", SSRIs: "LRD" },
  Cannabis: { LSD: "CAU", Mushrooms: "CAU", DMT: "CAU", Mescaline: "CAU", DOx: "CAU", NBOMes: "CAU", "2C-x": "CAU", "2C-T-x": "CAU", "5-MeO-xT": "CAU", Cannabis: "SELF", Ketamine: "LRS", MXE: "LRS", DXM: "LRS", Nitrous: "LRS", Amphetamines: "CAU", MDMA: "LRS", Cocaine: "CAU", Caffeine: "LRN", Alcohol: "LRS", "GHB/GBL": "LRS", Opioids: "LRS", Tramadol: "LRS", Benzodiazepines: "LRD", MAOIs: "LRS", SSRIs: "LRN" },
  Ketamine: { LSD: "LRS", Mushrooms: "LRS", DMT: "LRS", Mescaline: "LRS", DOx: "LRS", NBOMes: "LRS", "2C-x": "LRS", "2C-T-x": "LRS", "5-MeO-xT": "LRS", Cannabis: "LRS", Ketamine: "SELF", MXE: "LRS", DXM: "LRN", Nitrous: "LRS", Amphetamines: "CAU", MDMA: "LRS", Cocaine: "CAU", Caffeine: "LRN", Alcohol: "DAN", "GHB/GBL": "DAN", Opioids: "DAN", Tramadol: "DAN", Benzodiazepines: "CAU", MAOIs: "CAU", SSRIs: "LRN" },
  MXE: { LSD: "LRS", Mushrooms: "LRS", DMT: "LRS", Mescaline: "LRS", DOx: "CAU", NBOMes: "CAU", "2C-x": "LRS", "2C-T-x": "CAU", "5-MeO-xT": "LRS", Cannabis: "LRS", Ketamine: "LRS", MXE: "SELF", DXM: "LRN", Nitrous: "LRS", Amphetamines: "CAU", MDMA: "CAU", Cocaine: "CAU", Caffeine: "LRN", Alcohol: "DAN", "GHB/GBL": "DAN", Opioids: "DAN", Tramadol: "DAN", Benzodiazepines: "CAU", MAOIs: "UNS", SSRIs: "CAU" },
  DXM: { LSD: "LRS", Mushrooms: "LRS", DMT: "LRS", Mescaline: "LRS", DOx: "UNS", NBOMes: "UNS", "2C-x": "LRS", "2C-T-x": "UNS", "5-MeO-xT": "UNS", Cannabis: "LRS", Ketamine: "LRN", MXE: "LRN", DXM: "SELF", Nitrous: "LRS", Amphetamines: "UNS", MDMA: "DAN", Cocaine: "UNS", Caffeine: "LRN", Alcohol: "DAN", "GHB/GBL": "DAN", Opioids: "DAN", Tramadol: "DAN", Benzodiazepines: "CAU", MAOIs: "DAN", SSRIs: "DAN" },
  Nitrous: { LSD: "LRS", Mushrooms: "LRS", DMT: "LRS", Mescaline: "LRS", DOx: "LRS", NBOMes: "LRS", "2C-x": "LRS", "2C-T-x": "LRS", "5-MeO-xT": "LRS", Cannabis: "LRS", Ketamine: "LRS", MXE: "LRS", DXM: "LRS", Nitrous: "SELF", Amphetamines: "LRS", MDMA: "LRS", Cocaine: "LRS", Caffeine: "LRN", Alcohol: "CAU", "GHB/GBL": "CAU", Opioids: "CAU", Tramadol: "CAU", Benzodiazepines: "LRD", MAOIs: "LRN", SSRIs: "LRN" },
  Amphetamines: { LSD: "CAU", Mushrooms: "CAU", DMT: "CAU", Mescaline: "CAU", DOx: "UNS", NBOMes: "UNS", "2C-x": "CAU", "2C-T-x": "UNS", "5-MeO-xT": "UNS", Cannabis: "CAU", Ketamine: "CAU", MXE: "CAU", DXM: "UNS", Nitrous: "LRS", Amphetamines: "SELF", MDMA: "LRS", Cocaine: "CAU", Caffeine: "CAU", Alcohol: "CAU", "GHB/GBL": "CAU", Opioids: "CAU", Tramadol: "DAN", Benzodiazepines: "LRD", MAOIs: "DAN", SSRIs: "LRN" },
  MDMA: { LSD: "LRS", Mushrooms: "LRS", DMT: "LRS", Mescaline: "LRS", DOx: "CAU", NBOMes: "CAU", "2C-x": "LRS", "2C-T-x": "CAU", "5-MeO-xT": "CAU", Cannabis: "LRS", Ketamine: "LRS", MXE: "CAU", DXM: "DAN", Nitrous: "LRS", Amphetamines: "LRS", MDMA: "SELF", Cocaine: "CAU", Caffeine: "CAU", Alcohol: "CAU", "GHB/GBL": "CAU", Opioids: "LRN", Tramadol: "DAN", Benzodiazepines: "LRD", MAOIs: "DAN", SSRIs: "LRD" },
  Cocaine: { LSD: "CAU", Mushrooms: "CAU", DMT: "CAU", Mescaline: "CAU", DOx: "UNS", NBOMes: "UNS", "2C-x": "CAU", "2C-T-x": "UNS", "5-MeO-xT": "UNS", Cannabis: "CAU", Ketamine: "CAU", MXE: "CAU", DXM: "UNS", Nitrous: "LRS", Amphetamines: "CAU", MDMA: "CAU", Cocaine: "SELF", Caffeine: "CAU", Alcohol: "UNS", "GHB/GBL": "CAU", Opioids: "DAN", Tramadol: "DAN", Benzodiazepines: "LRD", MAOIs: "DAN", SSRIs: "LRN" },
  Caffeine: { LSD: "LRN", Mushrooms: "LRN", DMT: "LRN", Mescaline: "LRN", DOx: "CAU", NBOMes: "CAU", "2C-x": "LRN", "2C-T-x": "LRN", "5-MeO-xT": "LRN", Cannabis: "LRN", Ketamine: "LRN", MXE: "LRN", DXM: "LRN", Nitrous: "LRN", Amphetamines: "CAU", MDMA: "CAU", Cocaine: "CAU", Caffeine: "SELF", Alcohol: "LRN", "GHB/GBL": "LRN", Opioids: "LRN", Tramadol: "LRN", Benzodiazepines: "LRD", MAOIs: "LRN", SSRIs: "LRN" },
  Alcohol: { LSD: "LRD", Mushrooms: "LRD", DMT: "LRD", Mescaline: "LRD", DOx: "LRD", NBOMes: "LRD", "2C-x": "LRD", "2C-T-x": "LRD", "5-MeO-xT": "LRD", Cannabis: "LRS", Ketamine: "DAN", MXE: "DAN", DXM: "DAN", Nitrous: "CAU", Amphetamines: "CAU", MDMA: "CAU", Cocaine: "UNS", Caffeine: "LRN", Alcohol: "SELF", "GHB/GBL": "DAN", Opioids: "DAN", Tramadol: "DAN", Benzodiazepines: "DAN", MAOIs: "UNS", SSRIs: "CAU" },
  "GHB/GBL": { LSD: "LRD", Mushrooms: "LRD", DMT: "LRD", Mescaline: "LRD", DOx: "LRD", NBOMes: "LRD", "2C-x": "LRD", "2C-T-x": "LRD", "5-MeO-xT": "LRD", Cannabis: "LRS", Ketamine: "DAN", MXE: "DAN", DXM: "DAN", Nitrous: "CAU", Amphetamines: "CAU", MDMA: "CAU", Cocaine: "CAU", Caffeine: "LRN", Alcohol: "DAN", "GHB/GBL": "SELF", Opioids: "DAN", Tramadol: "DAN", Benzodiazepines: "DAN", MAOIs: "LRS", SSRIs: "LRN" },
  Opioids: { LSD: "LRN", Mushrooms: "LRN", DMT: "LRN", Mescaline: "LRN", DOx: "LRN", NBOMes: "LRN", "2C-x": "LRN", "2C-T-x": "LRN", "5-MeO-xT": "LRN", Cannabis: "LRS", Ketamine: "DAN", MXE: "DAN", DXM: "DAN", Nitrous: "CAU", Amphetamines: "CAU", MDMA: "LRN", Cocaine: "DAN", Caffeine: "LRN", Alcohol: "DAN", "GHB/GBL": "DAN", Opioids: "SELF", Tramadol: "DAN", Benzodiazepines: "DAN", MAOIs: "CAU", SSRIs: "LRN" },
  Tramadol: { LSD: "UNS", Mushrooms: "UNS", DMT: "UNS", Mescaline: "UNS", DOx: "UNS", NBOMes: "UNS", "2C-x": "UNS", "2C-T-x": "UNS", "5-MeO-xT": "UNS", Cannabis: "LRS", Ketamine: "DAN", MXE: "DAN", DXM: "DAN", Nitrous: "CAU", Amphetamines: "DAN", MDMA: "DAN", Cocaine: "DAN", Caffeine: "LRN", Alcohol: "DAN", "GHB/GBL": "DAN", Opioids: "DAN", Tramadol: "SELF", Benzodiazepines: "DAN", MAOIs: "DAN", SSRIs: "DAN" },
  Benzodiazepines: { LSD: "LRD", Mushrooms: "LRD", DMT: "LRD", Mescaline: "LRD", DOx: "LRD", NBOMes: "LRD", "2C-x": "LRD", "2C-T-x": "LRD", "5-MeO-xT": "LRD", Cannabis: "LRD", Ketamine: "CAU", MXE: "CAU", DXM: "CAU", Nitrous: "LRD", Amphetamines: "LRD", MDMA: "LRD", Cocaine: "LRD", Caffeine: "LRD", Alcohol: "DAN", "GHB/GBL": "DAN", Opioids: "DAN", Tramadol: "DAN", Benzodiazepines: "SELF", MAOIs: "LRS", SSRIs: "LRN" },
  MAOIs: { LSD: "LRD", Mushrooms: "LRS", DMT: "LRS", Mescaline: "CAU", DOx: "CAU", NBOMes: "CAU", "2C-x": "CAU", "2C-T-x": "CAU", "5-MeO-xT": "DAN", Cannabis: "LRS", Ketamine: "CAU", MXE: "UNS", DXM: "DAN", Nitrous: "LRN", Amphetamines: "DAN", MDMA: "DAN", Cocaine: "DAN", Caffeine: "LRN", Alcohol: "UNS", "GHB/GBL": "LRS", Opioids: "CAU", Tramadol: "DAN", Benzodiazepines: "LRS", MAOIs: "SELF", SSRIs: "DAN" },
  SSRIs: { LSD: "LRD", Mushrooms: "LRD", DMT: "LRD", Mescaline: "LRD", DOx: "LRD", NBOMes: "LRD", "2C-x": "LRD", "2C-T-x": "LRD", "5-MeO-xT": "LRD", Cannabis: "LRN", Ketamine: "LRN", MXE: "CAU", DXM: "DAN", Nitrous: "LRN", Amphetamines: "LRN", MDMA: "LRD", Cocaine: "LRN", Caffeine: "LRN", Alcohol: "CAU", "GHB/GBL": "LRN", Opioids: "LRN", Tramadol: "DAN", Benzodiazepines: "LRN", MAOIs: "DAN", SSRIs: "SELF" }
};

const SEROTONERGIC_SET = new Set([
  "MAOIs",
  "SSRIs",
  "MDMA",
  "DXM",
  "Tramadol",
  "Amphetamines",
  "Cocaine",
  "5-MeO-xT",
  "DOx",
  "NBOMes",
  "2C-T-x",
]);

const DEPRESSANT_SET = new Set([
  "Alcohol",
  "GHB/GBL",
  "Opioids",
  "Tramadol",
  "Benzodiazepines",
]);

const STIMULANT_SET = new Set([
  "Amphetamines",
  "MDMA",
  "Cocaine",
  "Caffeine",
  "DOx",
  "NBOMes",
  "2C-T-x",
]);

const pairKey = (a: string, b: string) => [a, b].sort().join("|");

const buildMechanismNotes = (a: string, b: string): string[] => {
  const notes: string[] = [];
  if (SEROTONERGIC_SET.has(a) && SEROTONERGIC_SET.has(b)) {
    notes.push("Serotonergic load stacking may raise serotonin-toxicity risk.");
  }
  if (DEPRESSANT_SET.has(a) && DEPRESSANT_SET.has(b)) {
    notes.push("Dual depressant combination may increase respiratory/CNS depression risk.");
  }
  if (STIMULANT_SET.has(a) && STIMULANT_SET.has(b)) {
    notes.push("Stacked stimulant burden may increase cardiovascular strain.");
  }
  if ((a === "MAOIs" && b === "5-MeO-xT") || (a === "5-MeO-xT" && b === "MAOIs")) {
    notes.push("Explicitly high-risk MAOI + 5-MeO-type pairing in matrix.");
  }
  return notes;
};

export const getInteractionEvidence = (drug1: string, drug2: string): InteractionEvidence => {
  if (!drug1 || !drug2) {
    return {
      code: "UNK",
      summary: "Select two substances to compute an interaction classification.",
      confidence: "n/a",
      sources: "SeshGuard matrix v1",
      mechanisms: [],
    };
  }

  if (drug1 === drug2) {
    return {
      code: "SELF",
      summary: "Same substance selected; this is not an interaction pair.",
      confidence: "n/a",
      sources: "SeshGuard matrix v1 (diagonal)",
      mechanisms: [],
    };
  }

  const direct = INTERACTIONS[drug1]?.[drug2];
  const reverse = INTERACTIONS[drug2]?.[drug1];
  const code = direct || reverse || "UNK";
  const legend = LEGEND[code] || LEGEND.UNK;
  const confidence: InteractionEvidence["confidence"] = direct || reverse ? "high" : "low";
  const sourceHint = direct ? "matrix direct lookup" : reverse ? "matrix reverse lookup" : "matrix gap";
  const mechanisms = buildMechanismNotes(drug1, drug2);
  const summary = mechanisms.length
    ? `${legend.description} ${mechanisms.join(" ")}`
    : legend.description;

  return {
    code,
    summary,
    confidence,
    sources: `SeshGuard matrix v1 (${sourceHint}; key=${pairKey(drug1, drug2)})`,
    mechanisms,
  };
};
