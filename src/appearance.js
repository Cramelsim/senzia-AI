export const SETTINGS_KEY = 'senzia_settings';

export const DEFAULT_SETTINGS = {
  companyName: 'Senzia Limited',
  businessId: 'SEN-2024-001',
  email: 'info@senzia.com',
  phone: '+254 700 123 456',
  address: 'WestPark Towers, 7th Floor, Waiyaki Way, Nairobi, Kenya',
  language: 'English (US)',
  timezone: 'EAT (UTC+3) Nairobi',
  currency: 'KES - Kenyan Shilling',
  dataRetention: '13 Months',
  defaultDashboard: 'Executive',
  itemsPerPage: '10',
  dateFormat: 'MMM D, YYYY',
  theme: 'dark',
  primaryColor: '#f0a828',
  compactMode: false,
  twoFactorAuth: true,
  emailNotifications: true,
  inAppNotifications: true,
  smsNotifications: false,
};

export const loadSettings = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY));
    return { ...DEFAULT_SETTINGS, ...(saved && typeof saved === 'object' ? saved : {}) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
};

export const saveSettings = (settings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

const hexToRgba = (hex, alpha) => {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Pushes theme / accent colour / compact mode onto <html> so every page picks them up.
export const applyAppearance = ({ theme, primaryColor, compactMode }) => {
  const root = document.documentElement;

  const resolvedTheme =
    theme === 'system'
      ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
      : theme;
  root.setAttribute('data-theme', resolvedTheme === 'light' ? 'light' : 'dark');

  if (/^#[0-9a-f]{6}$/i.test(primaryColor)) {
    root.style.setProperty('--accent', primaryColor);
    root.style.setProperty('--accent-hover', `color-mix(in srgb, ${primaryColor} 80%, white)`);
    root.style.setProperty('--accent-soft', hexToRgba(primaryColor, 0.12));
    root.style.setProperty('--accent-soft-border', hexToRgba(primaryColor, 0.28));
  }

  root.classList.toggle('compact', Boolean(compactMode));
};
