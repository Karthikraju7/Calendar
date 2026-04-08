// Per-month color system + local asset images

const MONTH_THEMES = [
  // January — snow/white
  {
    accent: '#4a7fa5',
    accentSoft: '#ddeaf4',
    rangeBg: '#e8f2fa',
    bg: '#eef2f6',
    card: '#ffffff',
    text: '#1a2a38',
    muted: '#6a8499',
  },
  // February — pink/rose
  {
    accent: '#c2547a',
    accentSoft: '#f7d6e4',
    rangeBg: '#fce8f0',
    bg: '#f8eef3',
    card: '#ffffff',
    text: '#2a1020',
    muted: '#8a5570',
  },
  // March — fresh green
  {
    accent: '#2e8b57',
    accentSoft: '#c0e8d4',
    rangeBg: '#d4f0e4',
    bg: '#ebf6f0',
    card: '#ffffff',
    text: '#0d2218',
    muted: '#4a7a60',
  },
  // April — green-blue sky
  {
    accent: '#3a7fbf',
    accentSoft: '#c2ddf5',
    rangeBg: '#d6ebf9',
    bg: '#eaf3fb',
    card: '#ffffff',
    text: '#0d1e30',
    muted: '#4a6e8a',
  },
  // May — sunny yellow
  {
    accent: '#c8900a',
    accentSoft: '#fde8b0',
    rangeBg: '#fef2cc',
    bg: '#fdf8e8',
    card: '#ffffff',
    text: '#261800',
    muted: '#8a6820',
  },
  // June — beach blue
  {
    accent: '#1a8fa0',
    accentSoft: '#b8e8f0',
    rangeBg: '#ccf0f8',
    bg: '#e4f6fa',
    card: '#ffffff',
    text: '#041820',
    muted: '#3a7080',
  },
  // July — ocean / sky / monsoon
  {
    accent: '#2e7eb8',
    accentSoft: '#c8e2f5',
    rangeBg: '#d8edf9',
    bg: '#e8f3fb',
    card: '#ffffff',
    text: '#0c1e30',
    muted: '#4a7295',
  },
  // August — warm gold
  {
    accent: '#b87820',
    accentSoft: '#f0dca0',
    rangeBg: '#f8ecbc',
    bg: '#fdf5e0',
    card: '#ffffff',
    text: '#241400',
    muted: '#886020',
  },
  // September — dry brown/orange
  {
    accent: '#b05a18',
    accentSoft: '#f0ccac',
    rangeBg: '#f8dcc8',
    bg: '#f8ede0',
    card: '#ffffff',
    text: '#240e00',
    muted: '#8a5030',
  },
  // October — halloween orange
  {
    accent: '#d44800',
    accentSoft: '#f9cca8',
    rangeBg: '#fddec8',
    bg: '#f9ede0',
    card: '#ffffff',
    text: '#260800',
    muted: '#904030',
  },
  // November — warm neutral
  {
    accent: '#7a6050',
    accentSoft: '#e0d4cc',
    rangeBg: '#ece0d8',
    bg: '#f4ede8',
    card: '#ffffff',
    text: '#1c1008',
    muted: '#6a5448',
  },
  // December — christmas red/white
  {
    accent: '#c42030',
    accentSoft: '#f8c8cc',
    rangeBg: '#fcdcde',
    bg: '#fdf0f0',
    card: '#ffffff',
    text: '#220008',
    muted: '#8a3040',
  },
];

export function getTheme(date) {
  const m = date.getMonth(); // 0-11
  const t = MONTH_THEMES[m];
  const monthName = ['January','February','March','April','May','June',
    'July','August','September','October','November','December'][m];

  return {
    cssVars: {
      '--accent':      t.accent,
      '--accent-soft': t.accentSoft,
      '--range-bg':    t.rangeBg,
      '--bg':          t.bg,
      '--card':        t.card,
      '--text':        t.text,
      '--text-muted':  t.muted,
    },
    image: `/assets/${monthName}.jpg`,
    imageAlt: `${monthName} scenery`,
    accent: t.accent,
  };
}