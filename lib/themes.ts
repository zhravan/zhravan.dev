/**
 * Theme configuration inspired by VS Code themes
 * You can easily swap themes by changing the ACTIVE_THEME in site.ts
 */

export type ThemeColors = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
  input: string;
  ring: string;
  link: string;
  linkHover: string;
};

export type Theme = {
  name: string;
  colors: ThemeColors;
  syntaxTheme: string; // Shiki theme name
};

/**
 * Available VS Code-inspired themes
 * Add your own by following the same structure
 */
export const themes = {
  'vitesse-dark': {
    name: 'Vitesse Dark',
    colors: {
      background: 'hsl(220 15% 8%)',
      foreground: 'hsl(220 10% 85%)',
      card: 'hsl(220 15% 10%)',
      cardForeground: 'hsl(220 10% 85%)',
      primary: 'hsl(220 10% 85%)',
      primaryForeground: 'hsl(220 15% 10%)',
      secondary: 'hsl(220 15% 12%)',
      secondaryForeground: 'hsl(220 10% 85%)',
      muted: 'hsl(220 15% 12%)',
      mutedForeground: 'hsl(220 8% 45%)',
      accent: 'hsl(220 15% 15%)',
      accentForeground: 'hsl(220 10% 85%)',
      border: 'hsl(220 12% 15%)',
      input: 'hsl(220 12% 15%)',
      ring: 'hsl(220 10% 85%)',
      link: 'hsl(220 10% 70%)',
      linkHover: 'hsl(220 10% 85%)',
    },
    syntaxTheme: 'vitesse-dark',
  },
  'github-dark': {
    name: 'GitHub Dark',
    colors: {
      background: 'hsl(220 13% 12%)',
      foreground: 'hsl(213 23% 85%)',
      card: 'hsl(215 14% 14%)',
      cardForeground: 'hsl(213 23% 85%)',
      primary: 'hsl(213 23% 85%)',
      primaryForeground: 'hsl(220 13% 12%)',
      secondary: 'hsl(215 14% 16%)',
      secondaryForeground: 'hsl(213 23% 85%)',
      muted: 'hsl(215 14% 16%)',
      mutedForeground: 'hsl(215 10% 50%)',
      accent: 'hsl(215 14% 20%)',
      accentForeground: 'hsl(213 23% 85%)',
      border: 'hsl(215 12% 18%)',
      input: 'hsl(215 12% 18%)',
      ring: 'hsl(213 23% 85%)',
      link: 'hsl(212 92% 60%)',
      linkHover: 'hsl(212 92% 70%)',
    },
    syntaxTheme: 'github-dark',
  },
  'dracula': {
    name: 'Dracula',
    colors: {
      background: 'hsl(231 15% 18%)',
      foreground: 'hsl(60 30% 96%)',
      card: 'hsl(232 14% 20%)',
      cardForeground: 'hsl(60 30% 96%)',
      primary: 'hsl(326 100% 74%)',
      primaryForeground: 'hsl(231 15% 18%)',
      secondary: 'hsl(232 14% 25%)',
      secondaryForeground: 'hsl(60 30% 96%)',
      muted: 'hsl(232 14% 25%)',
      mutedForeground: 'hsl(231 11% 65%)',
      accent: 'hsl(265 89% 78%)',
      accentForeground: 'hsl(231 15% 18%)',
      border: 'hsl(232 14% 30%)',
      input: 'hsl(232 14% 30%)',
      ring: 'hsl(326 100% 74%)',
      link: 'hsl(326 100% 74%)',
      linkHover: 'hsl(265 89% 78%)',
    },
    syntaxTheme: 'dracula',
  },
  'monokai': {
    name: 'Monokai',
    colors: {
      background: 'hsl(60 3% 15%)',
      foreground: 'hsl(60 17% 89%)',
      card: 'hsl(60 3% 17%)',
      cardForeground: 'hsl(60 17% 89%)',
      primary: 'hsl(186 100% 69%)',
      primaryForeground: 'hsl(60 3% 15%)',
      secondary: 'hsl(60 3% 20%)',
      secondaryForeground: 'hsl(60 17% 89%)',
      muted: 'hsl(60 3% 20%)',
      mutedForeground: 'hsl(55 8% 56%)',
      accent: 'hsl(80 76% 53%)',
      accentForeground: 'hsl(60 3% 15%)',
      border: 'hsl(60 3% 25%)',
      input: 'hsl(60 3% 25%)',
      ring: 'hsl(186 100% 69%)',
      link: 'hsl(186 100% 69%)',
      linkHover: 'hsl(80 76% 53%)',
    },
    syntaxTheme: 'monokai',
  },
  'nord': {
    name: 'Nord',
    colors: {
      background: 'hsl(220 16% 22%)',
      foreground: 'hsl(218 27% 94%)',
      card: 'hsl(220 17% 25%)',
      cardForeground: 'hsl(218 27% 94%)',
      primary: 'hsl(193 43% 67%)',
      primaryForeground: 'hsl(220 16% 22%)',
      secondary: 'hsl(220 17% 28%)',
      secondaryForeground: 'hsl(218 27% 94%)',
      muted: 'hsl(220 17% 28%)',
      mutedForeground: 'hsl(220 17% 60%)',
      accent: 'hsl(179 25% 65%)',
      accentForeground: 'hsl(220 16% 22%)',
      border: 'hsl(220 17% 32%)',
      input: 'hsl(220 17% 32%)',
      ring: 'hsl(193 43% 67%)',
      link: 'hsl(193 43% 67%)',
      linkHover: 'hsl(179 25% 65%)',
    },
    syntaxTheme: 'nord',
  },
  'one-dark-pro': {
    name: 'One Dark Pro',
    colors: {
      background: 'hsl(220 13% 18%)',
      foreground: 'hsl(220 14% 71%)',
      card: 'hsl(220 13% 20%)',
      cardForeground: 'hsl(220 14% 71%)',
      primary: 'hsl(207 82% 66%)',
      primaryForeground: 'hsl(220 13% 18%)',
      secondary: 'hsl(220 13% 23%)',
      secondaryForeground: 'hsl(220 14% 71%)',
      muted: 'hsl(220 13% 23%)',
      mutedForeground: 'hsl(220 10% 50%)',
      accent: 'hsl(286 60% 67%)',
      accentForeground: 'hsl(220 13% 18%)',
      border: 'hsl(220 13% 26%)',
      input: 'hsl(220 13% 26%)',
      ring: 'hsl(207 82% 66%)',
      link: 'hsl(207 82% 66%)',
      linkHover: 'hsl(286 60% 67%)',
    },
    syntaxTheme: 'one-dark-pro',
  },
  'tokyo-night': {
    name: 'Tokyo Night',
    colors: {
      background: 'hsl(232 23% 13%)',
      foreground: 'hsl(223 13% 75%)',
      card: 'hsl(232 23% 15%)',
      cardForeground: 'hsl(223 13% 75%)',
      primary: 'hsl(199 89% 48%)',
      primaryForeground: 'hsl(232 23% 13%)',
      secondary: 'hsl(232 23% 18%)',
      secondaryForeground: 'hsl(223 13% 75%)',
      muted: 'hsl(232 23% 18%)',
      mutedForeground: 'hsl(223 11% 55%)',
      accent: 'hsl(267 84% 81%)',
      accentForeground: 'hsl(232 23% 13%)',
      border: 'hsl(232 23% 22%)',
      input: 'hsl(232 23% 22%)',
      ring: 'hsl(199 89% 48%)',
      link: 'hsl(199 89% 48%)',
      linkHover: 'hsl(267 84% 81%)',
    },
    syntaxTheme: 'tokyo-night',
  },
  'catppuccin-mocha': {
    name: 'Catppuccin Mocha',
    colors: {
      background: 'hsl(240 21% 15%)',
      foreground: 'hsl(226 64% 88%)',
      card: 'hsl(240 21% 17%)',
      cardForeground: 'hsl(226 64% 88%)',
      primary: 'hsl(189 71% 73%)',
      primaryForeground: 'hsl(240 21% 15%)',
      secondary: 'hsl(240 21% 20%)',
      secondaryForeground: 'hsl(226 64% 88%)',
      muted: 'hsl(240 21% 20%)',
      mutedForeground: 'hsl(227 25% 60%)',
      accent: 'hsl(267 84% 81%)',
      accentForeground: 'hsl(240 21% 15%)',
      border: 'hsl(240 21% 25%)',
      input: 'hsl(240 21% 25%)',
      ring: 'hsl(189 71% 73%)',
      link: 'hsl(189 71% 73%)',
      linkHover: 'hsl(267 84% 81%)',
    },
    syntaxTheme: 'catppuccin-mocha',
  },
  'solarized-dark': {
    name: 'Solarized Dark',
    colors: {
      background: 'hsl(192 100% 11%)',
      foreground: 'hsl(44 87% 94%)',
      card: 'hsl(192 81% 14%)',
      cardForeground: 'hsl(44 87% 94%)',
      primary: 'hsl(205 69% 49%)',
      primaryForeground: 'hsl(192 100% 11%)',
      secondary: 'hsl(192 81% 17%)',
      secondaryForeground: 'hsl(44 87% 94%)',
      muted: 'hsl(192 81% 17%)',
      mutedForeground: 'hsl(186 8% 55%)',
      accent: 'hsl(68 100% 30%)',
      accentForeground: 'hsl(192 100% 11%)',
      border: 'hsl(192 81% 20%)',
      input: 'hsl(192 81% 20%)',
      ring: 'hsl(205 69% 49%)',
      link: 'hsl(205 69% 49%)',
      linkHover: 'hsl(68 100% 30%)',
    },
    syntaxTheme: 'solarized-dark',
  },
  'material-theme': {
    name: 'Material Theme',
    colors: {
      background: 'hsl(210 24% 16%)',
      foreground: 'hsl(0 0% 92%)',
      card: 'hsl(210 24% 18%)',
      cardForeground: 'hsl(0 0% 92%)',
      primary: 'hsl(199 85% 65%)',
      primaryForeground: 'hsl(210 24% 16%)',
      secondary: 'hsl(210 24% 22%)',
      secondaryForeground: 'hsl(0 0% 92%)',
      muted: 'hsl(210 24% 22%)',
      mutedForeground: 'hsl(0 0% 60%)',
      accent: 'hsl(286 60% 67%)',
      accentForeground: 'hsl(210 24% 16%)',
      border: 'hsl(210 24% 26%)',
      input: 'hsl(210 24% 26%)',
      ring: 'hsl(199 85% 65%)',
      link: 'hsl(199 85% 65%)',
      linkHover: 'hsl(286 60% 67%)',
    },
    syntaxTheme: 'material-theme',
  },
  'night-owl': {
    name: 'Night Owl',
    colors: {
      background: 'hsl(210 50% 7%)',
      foreground: 'hsl(209 34% 80%)',
      card: 'hsl(210 50% 9%)',
      cardForeground: 'hsl(209 34% 80%)',
      primary: 'hsl(207 82% 66%)',
      primaryForeground: 'hsl(210 50% 7%)',
      secondary: 'hsl(210 50% 12%)',
      secondaryForeground: 'hsl(209 34% 80%)',
      muted: 'hsl(210 50% 12%)',
      mutedForeground: 'hsl(218 17% 55%)',
      accent: 'hsl(286 60% 67%)',
      accentForeground: 'hsl(210 50% 7%)',
      border: 'hsl(210 50% 15%)',
      input: 'hsl(210 50% 15%)',
      ring: 'hsl(207 82% 66%)',
      link: 'hsl(207 82% 66%)',
      linkHover: 'hsl(286 60% 67%)',
    },
    syntaxTheme: 'night-owl',
  },
  'palenight': {
    name: 'Palenight',
    colors: {
      background: 'hsl(229 20% 18%)',
      foreground: 'hsl(220 14% 71%)',
      card: 'hsl(229 20% 20%)',
      cardForeground: 'hsl(220 14% 71%)',
      primary: 'hsl(207 82% 66%)',
      primaryForeground: 'hsl(229 20% 18%)',
      secondary: 'hsl(229 20% 23%)',
      secondaryForeground: 'hsl(220 14% 71%)',
      muted: 'hsl(229 20% 23%)',
      mutedForeground: 'hsl(229 15% 50%)',
      accent: 'hsl(286 60% 67%)',
      accentForeground: 'hsl(229 20% 18%)',
      border: 'hsl(229 20% 27%)',
      input: 'hsl(229 20% 27%)',
      ring: 'hsl(207 82% 66%)',
      link: 'hsl(207 82% 66%)',
      linkHover: 'hsl(286 60% 67%)',
    },
    syntaxTheme: 'material-theme-palenight',
  },
  'ayu-dark': {
    name: 'Ayu Dark',
    colors: {
      background: 'hsl(213 18% 12%)',
      foreground: 'hsl(45 29% 84%)',
      card: 'hsl(213 18% 14%)',
      cardForeground: 'hsl(45 29% 84%)',
      primary: 'hsl(39 100% 57%)',
      primaryForeground: 'hsl(213 18% 12%)',
      secondary: 'hsl(213 18% 17%)',
      secondaryForeground: 'hsl(45 29% 84%)',
      muted: 'hsl(213 18% 17%)',
      mutedForeground: 'hsl(213 15% 50%)',
      accent: 'hsl(95 38% 62%)',
      accentForeground: 'hsl(213 18% 12%)',
      border: 'hsl(213 18% 20%)',
      input: 'hsl(213 18% 20%)',
      ring: 'hsl(39 100% 57%)',
      link: 'hsl(39 100% 57%)',
      linkHover: 'hsl(95 38% 62%)',
    },
    syntaxTheme: 'ayu-dark',
  },
  'gruvbox-dark': {
    name: 'Gruvbox Dark',
    colors: {
      background: 'hsl(27 15% 16%)',
      foreground: 'hsl(40 19% 82%)',
      card: 'hsl(27 15% 18%)',
      cardForeground: 'hsl(40 19% 82%)',
      primary: 'hsl(24 51% 55%)',
      primaryForeground: 'hsl(27 15% 16%)',
      secondary: 'hsl(27 15% 22%)',
      secondaryForeground: 'hsl(40 19% 82%)',
      muted: 'hsl(27 15% 22%)',
      mutedForeground: 'hsl(40 15% 52%)',
      accent: 'hsl(142 34% 52%)',
      accentForeground: 'hsl(27 15% 16%)',
      border: 'hsl(27 15% 26%)',
      input: 'hsl(27 15% 26%)',
      ring: 'hsl(24 51% 55%)',
      link: 'hsl(24 51% 55%)',
      linkHover: 'hsl(142 34% 52%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'cobalt2': {
    name: 'Cobalt2',
    colors: {
      background: 'hsl(205 100% 8%)',
      foreground: 'hsl(0 0% 100%)',
      card: 'hsl(205 100% 10%)',
      cardForeground: 'hsl(0 0% 100%)',
      primary: 'hsl(186 100% 46%)',
      primaryForeground: 'hsl(205 100% 8%)',
      secondary: 'hsl(205 100% 13%)',
      secondaryForeground: 'hsl(0 0% 100%)',
      muted: 'hsl(205 100% 13%)',
      mutedForeground: 'hsl(0 0% 70%)',
      accent: 'hsl(55 100% 50%)',
      accentForeground: 'hsl(205 100% 8%)',
      border: 'hsl(205 100% 17%)',
      input: 'hsl(205 100% 17%)',
      ring: 'hsl(186 100% 46%)',
      link: 'hsl(186 100% 46%)',
      linkHover: 'hsl(55 100% 50%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'synthwave-84': {
    name: 'Synthwave 84',
    colors: {
      background: 'hsl(265 30% 12%)',
      foreground: 'hsl(0 0% 95%)',
      card: 'hsl(265 30% 14%)',
      cardForeground: 'hsl(0 0% 95%)',
      primary: 'hsl(326 100% 74%)',
      primaryForeground: 'hsl(265 30% 12%)',
      secondary: 'hsl(265 30% 18%)',
      secondaryForeground: 'hsl(0 0% 95%)',
      muted: 'hsl(265 30% 18%)',
      mutedForeground: 'hsl(265 15% 60%)',
      accent: 'hsl(180 100% 50%)',
      accentForeground: 'hsl(265 30% 12%)',
      border: 'hsl(265 30% 22%)',
      input: 'hsl(265 30% 22%)',
      ring: 'hsl(326 100% 74%)',
      link: 'hsl(326 100% 74%)',
      linkHover: 'hsl(180 100% 50%)',
    },
    syntaxTheme: 'synthwave-84',
  },
  'shades-of-purple': {
    name: 'Shades of Purple',
    colors: {
      background: 'hsl(265 48% 13%)',
      foreground: 'hsl(0 0% 100%)',
      card: 'hsl(265 48% 15%)',
      cardForeground: 'hsl(0 0% 100%)',
      primary: 'hsl(178 100% 42%)',
      primaryForeground: 'hsl(265 48% 13%)',
      secondary: 'hsl(265 48% 19%)',
      secondaryForeground: 'hsl(0 0% 100%)',
      muted: 'hsl(265 48% 19%)',
      mutedForeground: 'hsl(265 30% 65%)',
      accent: 'hsl(51 100% 64%)',
      accentForeground: 'hsl(265 48% 13%)',
      border: 'hsl(265 48% 23%)',
      input: 'hsl(265 48% 23%)',
      ring: 'hsl(178 100% 42%)',
      link: 'hsl(178 100% 42%)',
      linkHover: 'hsl(51 100% 64%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'moonlight': {
    name: 'Moonlight',
    colors: {
      background: 'hsl(240 21% 15%)',
      foreground: 'hsl(222 50% 91%)',
      card: 'hsl(240 21% 17%)',
      cardForeground: 'hsl(222 50% 91%)',
      primary: 'hsl(267 84% 81%)',
      primaryForeground: 'hsl(240 21% 15%)',
      secondary: 'hsl(240 21% 20%)',
      secondaryForeground: 'hsl(222 50% 91%)',
      muted: 'hsl(240 21% 20%)',
      mutedForeground: 'hsl(240 15% 60%)',
      accent: 'hsl(189 71% 73%)',
      accentForeground: 'hsl(240 21% 15%)',
      border: 'hsl(240 21% 25%)',
      input: 'hsl(240 21% 25%)',
      ring: 'hsl(267 84% 81%)',
      link: 'hsl(267 84% 81%)',
      linkHover: 'hsl(189 71% 73%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'andromeda': {
    name: 'Andromeda',
    colors: {
      background: 'hsl(232 26% 16%)',
      foreground: 'hsl(140 6% 87%)',
      card: 'hsl(232 26% 18%)',
      cardForeground: 'hsl(140 6% 87%)',
      primary: 'hsl(165 100% 54%)',
      primaryForeground: 'hsl(232 26% 16%)',
      secondary: 'hsl(232 26% 22%)',
      secondaryForeground: 'hsl(140 6% 87%)',
      muted: 'hsl(232 26% 22%)',
      mutedForeground: 'hsl(140 6% 60%)',
      accent: 'hsl(265 89% 78%)',
      accentForeground: 'hsl(232 26% 16%)',
      border: 'hsl(232 26% 26%)',
      input: 'hsl(232 26% 26%)',
      ring: 'hsl(165 100% 54%)',
      link: 'hsl(165 100% 54%)',
      linkHover: 'hsl(265 89% 78%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'panda': {
    name: 'Panda',
    colors: {
      background: 'hsl(240 14% 16%)',
      foreground: 'hsl(0 0% 99%)',
      card: 'hsl(240 14% 18%)',
      cardForeground: 'hsl(0 0% 99%)',
      primary: 'hsl(156 100% 67%)',
      primaryForeground: 'hsl(240 14% 16%)',
      secondary: 'hsl(240 14% 22%)',
      secondaryForeground: 'hsl(0 0% 99%)',
      muted: 'hsl(240 14% 22%)',
      mutedForeground: 'hsl(240 8% 65%)',
      accent: 'hsl(178 100% 58%)',
      accentForeground: 'hsl(240 14% 16%)',
      border: 'hsl(240 14% 26%)',
      input: 'hsl(240 14% 26%)',
      ring: 'hsl(156 100% 67%)',
      link: 'hsl(156 100% 67%)',
      linkHover: 'hsl(178 100% 58%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'laserwave': {
    name: 'Laserwave',
    colors: {
      background: 'hsl(241 31% 14%)',
      foreground: 'hsl(0 0% 95%)',
      card: 'hsl(241 31% 16%)',
      cardForeground: 'hsl(0 0% 95%)',
      primary: 'hsl(323 100% 58%)',
      primaryForeground: 'hsl(241 31% 14%)',
      secondary: 'hsl(241 31% 20%)',
      secondaryForeground: 'hsl(0 0% 95%)',
      muted: 'hsl(241 31% 20%)',
      mutedForeground: 'hsl(241 15% 65%)',
      accent: 'hsl(180 97% 54%)',
      accentForeground: 'hsl(241 31% 14%)',
      border: 'hsl(241 31% 24%)',
      input: 'hsl(241 31% 24%)',
      ring: 'hsl(323 100% 58%)',
      link: 'hsl(323 100% 58%)',
      linkHover: 'hsl(180 97% 54%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'horizon': {
    name: 'Horizon',
    colors: {
      background: 'hsl(345 30% 12%)',
      foreground: 'hsl(0 13% 90%)',
      card: 'hsl(345 30% 14%)',
      cardForeground: 'hsl(0 13% 90%)',
      primary: 'hsl(338 95% 56%)',
      primaryForeground: 'hsl(345 30% 12%)',
      secondary: 'hsl(345 30% 18%)',
      secondaryForeground: 'hsl(0 13% 90%)',
      muted: 'hsl(345 30% 18%)',
      mutedForeground: 'hsl(345 15% 60%)',
      accent: 'hsl(4 93% 67%)',
      accentForeground: 'hsl(345 30% 12%)',
      border: 'hsl(345 30% 22%)',
      input: 'hsl(345 30% 22%)',
      ring: 'hsl(338 95% 56%)',
      link: 'hsl(338 95% 56%)',
      linkHover: 'hsl(4 93% 67%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'winter-is-coming-dark': {
    name: 'Winter is Coming Dark',
    colors: {
      background: 'hsl(209 35% 9%)',
      foreground: 'hsl(210 24% 87%)',
      card: 'hsl(209 35% 11%)',
      cardForeground: 'hsl(210 24% 87%)',
      primary: 'hsl(187 71% 63%)',
      primaryForeground: 'hsl(209 35% 9%)',
      secondary: 'hsl(209 35% 14%)',
      secondaryForeground: 'hsl(210 24% 87%)',
      muted: 'hsl(209 35% 14%)',
      mutedForeground: 'hsl(209 20% 60%)',
      accent: 'hsl(39 67% 69%)',
      accentForeground: 'hsl(209 35% 9%)',
      border: 'hsl(209 35% 18%)',
      input: 'hsl(209 35% 18%)',
      ring: 'hsl(187 71% 63%)',
      link: 'hsl(187 71% 63%)',
      linkHover: 'hsl(39 67% 69%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'winter-is-coming-blue': {
    name: 'Winter is Coming Blue',
    colors: {
      background: 'hsl(220 29% 12%)',
      foreground: 'hsl(217 14% 85%)',
      card: 'hsl(220 29% 14%)',
      cardForeground: 'hsl(217 14% 85%)',
      primary: 'hsl(187 82% 55%)',
      primaryForeground: 'hsl(220 29% 12%)',
      secondary: 'hsl(220 29% 17%)',
      secondaryForeground: 'hsl(217 14% 85%)',
      muted: 'hsl(220 29% 17%)',
      mutedForeground: 'hsl(220 14% 60%)',
      accent: 'hsl(39 67% 69%)',
      accentForeground: 'hsl(220 29% 12%)',
      border: 'hsl(220 29% 21%)',
      input: 'hsl(220 29% 21%)',
      ring: 'hsl(187 82% 55%)',
      link: 'hsl(187 82% 55%)',
      linkHover: 'hsl(39 67% 69%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'oceanic-next': {
    name: 'Oceanic Next',
    colors: {
      background: 'hsl(194 14% 16%)',
      foreground: 'hsl(192 15% 81%)',
      card: 'hsl(194 14% 18%)',
      cardForeground: 'hsl(192 15% 81%)',
      primary: 'hsl(187 47% 55%)',
      primaryForeground: 'hsl(194 14% 16%)',
      secondary: 'hsl(194 14% 22%)',
      secondaryForeground: 'hsl(192 15% 81%)',
      muted: 'hsl(194 14% 22%)',
      mutedForeground: 'hsl(194 10% 55%)',
      accent: 'hsl(95 38% 62%)',
      accentForeground: 'hsl(194 14% 16%)',
      border: 'hsl(194 14% 26%)',
      input: 'hsl(194 14% 26%)',
      ring: 'hsl(187 47% 55%)',
      link: 'hsl(187 47% 55%)',
      linkHover: 'hsl(95 38% 62%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'monokai-pro': {
    name: 'Monokai Pro',
    colors: {
      background: 'hsl(51 3% 14%)',
      foreground: 'hsl(60 17% 89%)',
      card: 'hsl(51 3% 16%)',
      cardForeground: 'hsl(60 17% 89%)',
      primary: 'hsl(186 100% 69%)',
      primaryForeground: 'hsl(51 3% 14%)',
      secondary: 'hsl(51 3% 19%)',
      secondaryForeground: 'hsl(60 17% 89%)',
      muted: 'hsl(51 3% 19%)',
      mutedForeground: 'hsl(51 5% 56%)',
      accent: 'hsl(80 76% 53%)',
      accentForeground: 'hsl(51 3% 14%)',
      border: 'hsl(51 3% 23%)',
      input: 'hsl(51 3% 23%)',
      ring: 'hsl(186 100% 69%)',
      link: 'hsl(186 100% 69%)',
      linkHover: 'hsl(80 76% 53%)',
    },
    syntaxTheme: 'monokai',
  },
  'atom-one-light': {
    name: 'Atom One Light',
    colors: {
      background: 'hsl(230 1% 98%)',
      foreground: 'hsl(230 8% 24%)',
      card: 'hsl(230 1% 96%)',
      cardForeground: 'hsl(230 8% 24%)',
      primary: 'hsl(230 8% 24%)',
      primaryForeground: 'hsl(230 1% 98%)',
      secondary: 'hsl(230 1% 93%)',
      secondaryForeground: 'hsl(230 8% 24%)',
      muted: 'hsl(230 1% 93%)',
      mutedForeground: 'hsl(230 4% 64%)',
      accent: 'hsl(230 1% 90%)',
      accentForeground: 'hsl(230 8% 24%)',
      border: 'hsl(230 8% 88%)',
      input: 'hsl(230 8% 88%)',
      ring: 'hsl(230 8% 24%)',
      link: 'hsl(221 87% 60%)',
      linkHover: 'hsl(355 65% 65%)',
    },
    syntaxTheme: 'github-light',
  },
  'light-plus': {
    name: 'Light+',
    colors: {
      background: 'hsl(0 0% 100%)',
      foreground: 'hsl(0 0% 0%)',
      card: 'hsl(0 0% 98%)',
      cardForeground: 'hsl(0 0% 0%)',
      primary: 'hsl(0 0% 0%)',
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(0 0% 96%)',
      secondaryForeground: 'hsl(0 0% 0%)',
      muted: 'hsl(0 0% 96%)',
      mutedForeground: 'hsl(0 0% 40%)',
      accent: 'hsl(0 0% 93%)',
      accentForeground: 'hsl(0 0% 0%)',
      border: 'hsl(0 0% 90%)',
      input: 'hsl(0 0% 90%)',
      ring: 'hsl(0 0% 0%)',
      link: 'hsl(210 100% 42%)',
      linkHover: 'hsl(355 78% 56%)',
    },
    syntaxTheme: 'github-light',
  },
  'quiet-light': {
    name: 'Quiet Light',
    colors: {
      background: 'hsl(30 20% 98%)',
      foreground: 'hsl(0 0% 33%)',
      card: 'hsl(30 20% 96%)',
      cardForeground: 'hsl(0 0% 33%)',
      primary: 'hsl(0 0% 33%)',
      primaryForeground: 'hsl(30 20% 98%)',
      secondary: 'hsl(30 20% 93%)',
      secondaryForeground: 'hsl(0 0% 33%)',
      muted: 'hsl(30 20% 93%)',
      mutedForeground: 'hsl(0 0% 55%)',
      accent: 'hsl(30 20% 90%)',
      accentForeground: 'hsl(0 0% 33%)',
      border: 'hsl(30 10% 88%)',
      input: 'hsl(30 10% 88%)',
      ring: 'hsl(0 0% 33%)',
      link: 'hsl(210 100% 42%)',
      linkHover: 'hsl(355 78% 56%)',
    },
    syntaxTheme: 'github-light',
  },
  'solarized-light': {
    name: 'Solarized Light',
    colors: {
      background: 'hsl(44 87% 94%)',
      foreground: 'hsl(192 81% 26%)',
      card: 'hsl(44 87% 92%)',
      cardForeground: 'hsl(192 81% 26%)',
      primary: 'hsl(205 69% 49%)',
      primaryForeground: 'hsl(44 87% 94%)',
      secondary: 'hsl(45 86% 88%)',
      secondaryForeground: 'hsl(192 81% 26%)',
      muted: 'hsl(45 86% 88%)',
      mutedForeground: 'hsl(186 8% 55%)',
      accent: 'hsl(68 100% 30%)',
      accentForeground: 'hsl(44 87% 94%)',
      border: 'hsl(45 86% 85%)',
      input: 'hsl(45 86% 85%)',
      ring: 'hsl(205 69% 49%)',
      link: 'hsl(205 69% 49%)',
      linkHover: 'hsl(68 100% 30%)',
    },
    syntaxTheme: 'github-light',
  },
  'ayu-light': {
    name: 'Ayu Light',
    colors: {
      background: 'hsl(45 43% 97%)',
      foreground: 'hsl(210 17% 30%)',
      card: 'hsl(45 43% 95%)',
      cardForeground: 'hsl(210 17% 30%)',
      primary: 'hsl(39 100% 57%)',
      primaryForeground: 'hsl(45 43% 97%)',
      secondary: 'hsl(45 43% 92%)',
      secondaryForeground: 'hsl(210 17% 30%)',
      muted: 'hsl(45 43% 92%)',
      mutedForeground: 'hsl(210 13% 50%)',
      accent: 'hsl(45 43% 89%)',
      accentForeground: 'hsl(210 17% 30%)',
      border: 'hsl(45 20% 88%)',
      input: 'hsl(45 20% 88%)',
      ring: 'hsl(39 100% 57%)',
      link: 'hsl(39 100% 57%)',
      linkHover: 'hsl(95 38% 62%)',
    },
    syntaxTheme: 'github-light',
  },
  'ayu-mirage': {
    name: 'Ayu Mirage',
    colors: {
      background: 'hsl(213 15% 17%)',
      foreground: 'hsl(45 29% 84%)',
      card: 'hsl(213 15% 19%)',
      cardForeground: 'hsl(45 29% 84%)',
      primary: 'hsl(39 100% 57%)',
      primaryForeground: 'hsl(213 15% 17%)',
      secondary: 'hsl(213 15% 23%)',
      secondaryForeground: 'hsl(45 29% 84%)',
      muted: 'hsl(213 15% 23%)',
      mutedForeground: 'hsl(213 12% 55%)',
      accent: 'hsl(95 38% 62%)',
      accentForeground: 'hsl(213 15% 17%)',
      border: 'hsl(213 15% 27%)',
      input: 'hsl(213 15% 27%)',
      ring: 'hsl(39 100% 57%)',
      link: 'hsl(39 100% 57%)',
      linkHover: 'hsl(95 38% 62%)',
    },
    syntaxTheme: 'ayu-dark',
  },
  'github-light': {
    name: 'GitHub Light',
    colors: {
      background: 'hsl(0 0% 100%)',
      foreground: 'hsl(210 24% 16%)',
      card: 'hsl(210 20% 98%)',
      cardForeground: 'hsl(210 24% 16%)',
      primary: 'hsl(210 24% 16%)',
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(210 20% 96%)',
      secondaryForeground: 'hsl(210 24% 16%)',
      muted: 'hsl(210 20% 96%)',
      mutedForeground: 'hsl(215 13% 50%)',
      accent: 'hsl(210 20% 93%)',
      accentForeground: 'hsl(210 24% 16%)',
      border: 'hsl(214 18% 92%)',
      input: 'hsl(214 18% 92%)',
      ring: 'hsl(210 24% 16%)',
      link: 'hsl(212 92% 45%)',
      linkHover: 'hsl(212 92% 60%)',
    },
    syntaxTheme: 'github-light',
  },
  'min-dark': {
    name: 'Min Dark',
    colors: {
      background: 'hsl(0 0% 10%)',
      foreground: 'hsl(0 0% 90%)',
      card: 'hsl(0 0% 12%)',
      cardForeground: 'hsl(0 0% 90%)',
      primary: 'hsl(0 0% 90%)',
      primaryForeground: 'hsl(0 0% 10%)',
      secondary: 'hsl(0 0% 15%)',
      secondaryForeground: 'hsl(0 0% 90%)',
      muted: 'hsl(0 0% 15%)',
      mutedForeground: 'hsl(0 0% 60%)',
      accent: 'hsl(0 0% 20%)',
      accentForeground: 'hsl(0 0% 90%)',
      border: 'hsl(0 0% 18%)',
      input: 'hsl(0 0% 18%)',
      ring: 'hsl(0 0% 90%)',
      link: 'hsl(0 0% 70%)',
      linkHover: 'hsl(0 0% 90%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'min-light': {
    name: 'Min Light',
    colors: {
      background: 'hsl(0 0% 98%)',
      foreground: 'hsl(0 0% 20%)',
      card: 'hsl(0 0% 96%)',
      cardForeground: 'hsl(0 0% 20%)',
      primary: 'hsl(0 0% 20%)',
      primaryForeground: 'hsl(0 0% 98%)',
      secondary: 'hsl(0 0% 93%)',
      secondaryForeground: 'hsl(0 0% 20%)',
      muted: 'hsl(0 0% 93%)',
      mutedForeground: 'hsl(0 0% 50%)',
      accent: 'hsl(0 0% 90%)',
      accentForeground: 'hsl(0 0% 20%)',
      border: 'hsl(0 0% 88%)',
      input: 'hsl(0 0% 88%)',
      ring: 'hsl(0 0% 20%)',
      link: 'hsl(0 0% 40%)',
      linkHover: 'hsl(0 0% 20%)',
    },
    syntaxTheme: 'github-light',
  },
  'eva-dark': {
    name: 'Eva Dark',
    colors: {
      background: 'hsl(228 16% 16%)',
      foreground: 'hsl(225 14% 89%)',
      card: 'hsl(228 16% 18%)',
      cardForeground: 'hsl(225 14% 89%)',
      primary: 'hsl(193 76% 67%)',
      primaryForeground: 'hsl(228 16% 16%)',
      secondary: 'hsl(228 16% 22%)',
      secondaryForeground: 'hsl(225 14% 89%)',
      muted: 'hsl(228 16% 22%)',
      mutedForeground: 'hsl(228 10% 60%)',
      accent: 'hsl(286 58% 73%)',
      accentForeground: 'hsl(228 16% 16%)',
      border: 'hsl(228 16% 26%)',
      input: 'hsl(228 16% 26%)',
      ring: 'hsl(193 76% 67%)',
      link: 'hsl(193 76% 67%)',
      linkHover: 'hsl(286 58% 73%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'eva-light': {
    name: 'Eva Light',
    colors: {
      background: 'hsl(0 0% 100%)',
      foreground: 'hsl(228 16% 16%)',
      card: 'hsl(225 25% 98%)',
      cardForeground: 'hsl(228 16% 16%)',
      primary: 'hsl(228 16% 16%)',
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(225 25% 95%)',
      secondaryForeground: 'hsl(228 16% 16%)',
      muted: 'hsl(225 25% 95%)',
      mutedForeground: 'hsl(228 10% 50%)',
      accent: 'hsl(225 25% 92%)',
      accentForeground: 'hsl(228 16% 16%)',
      border: 'hsl(225 25% 90%)',
      input: 'hsl(225 25% 90%)',
      ring: 'hsl(228 16% 16%)',
      link: 'hsl(193 76% 67%)',
      linkHover: 'hsl(286 58% 73%)',
    },
    syntaxTheme: 'github-light',
  },
  'halcyon': {
    name: 'Halcyon',
    colors: {
      background: 'hsl(229 24% 13%)',
      foreground: 'hsl(225 14% 89%)',
      card: 'hsl(229 24% 15%)',
      cardForeground: 'hsl(225 14% 89%)',
      primary: 'hsl(172 100% 52%)',
      primaryForeground: 'hsl(229 24% 13%)',
      secondary: 'hsl(229 24% 19%)',
      secondaryForeground: 'hsl(225 14% 89%)',
      muted: 'hsl(229 24% 19%)',
      mutedForeground: 'hsl(229 15% 60%)',
      accent: 'hsl(265 89% 78%)',
      accentForeground: 'hsl(229 24% 13%)',
      border: 'hsl(229 24% 23%)',
      input: 'hsl(229 24% 23%)',
      ring: 'hsl(172 100% 52%)',
      link: 'hsl(172 100% 52%)',
      linkHover: 'hsl(265 89% 78%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'radical': {
    name: 'Radical',
    colors: {
      background: 'hsl(270 25% 8%)',
      foreground: 'hsl(0 0% 95%)',
      card: 'hsl(270 25% 10%)',
      cardForeground: 'hsl(0 0% 95%)',
      primary: 'hsl(326 100% 74%)',
      primaryForeground: 'hsl(270 25% 8%)',
      secondary: 'hsl(270 25% 14%)',
      secondaryForeground: 'hsl(0 0% 95%)',
      muted: 'hsl(270 25% 14%)',
      mutedForeground: 'hsl(270 12% 60%)',
      accent: 'hsl(151 100% 51%)',
      accentForeground: 'hsl(270 25% 8%)',
      border: 'hsl(270 25% 18%)',
      input: 'hsl(270 25% 18%)',
      ring: 'hsl(326 100% 74%)',
      link: 'hsl(326 100% 74%)',
      linkHover: 'hsl(151 100% 51%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'rose-pine': {
    name: 'Rosé Pine',
    colors: {
      background: 'hsl(249 22% 12%)',
      foreground: 'hsl(245 50% 91%)',
      card: 'hsl(249 22% 14%)',
      cardForeground: 'hsl(245 50% 91%)',
      primary: 'hsl(2 66% 83%)',
      primaryForeground: 'hsl(249 22% 12%)',
      secondary: 'hsl(249 22% 18%)',
      secondaryForeground: 'hsl(245 50% 91%)',
      muted: 'hsl(249 22% 18%)',
      mutedForeground: 'hsl(245 22% 61%)',
      accent: 'hsl(267 84% 81%)',
      accentForeground: 'hsl(249 22% 12%)',
      border: 'hsl(249 22% 22%)',
      input: 'hsl(249 22% 22%)',
      ring: 'hsl(2 66% 83%)',
      link: 'hsl(2 66% 83%)',
      linkHover: 'hsl(267 84% 81%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'rose-pine-moon': {
    name: 'Rosé Pine Moon',
    colors: {
      background: 'hsl(246 24% 17%)',
      foreground: 'hsl(245 50% 91%)',
      card: 'hsl(246 24% 19%)',
      cardForeground: 'hsl(245 50% 91%)',
      primary: 'hsl(2 66% 83%)',
      primaryForeground: 'hsl(246 24% 17%)',
      secondary: 'hsl(246 24% 23%)',
      secondaryForeground: 'hsl(245 50% 91%)',
      muted: 'hsl(246 24% 23%)',
      mutedForeground: 'hsl(245 22% 61%)',
      accent: 'hsl(35 88% 72%)',
      accentForeground: 'hsl(246 24% 17%)',
      border: 'hsl(246 24% 27%)',
      input: 'hsl(246 24% 27%)',
      ring: 'hsl(2 66% 83%)',
      link: 'hsl(2 66% 83%)',
      linkHover: 'hsl(35 88% 72%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'rose-pine-dawn': {
    name: 'Rosé Pine Dawn',
    colors: {
      background: 'hsl(35 100% 98%)',
      foreground: 'hsl(248 25% 18%)',
      card: 'hsl(35 100% 96%)',
      cardForeground: 'hsl(248 25% 18%)',
      primary: 'hsl(343 76% 51%)',
      primaryForeground: 'hsl(35 100% 98%)',
      secondary: 'hsl(35 100% 93%)',
      secondaryForeground: 'hsl(248 25% 18%)',
      muted: 'hsl(35 100% 93%)',
      mutedForeground: 'hsl(248 15% 50%)',
      accent: 'hsl(35 88% 72%)',
      accentForeground: 'hsl(248 25% 18%)',
      border: 'hsl(35 60% 90%)',
      input: 'hsl(35 60% 90%)',
      ring: 'hsl(343 76% 51%)',
      link: 'hsl(343 76% 51%)',
      linkHover: 'hsl(35 88% 72%)',
    },
    syntaxTheme: 'github-light',
  },
  'kanagawa': {
    name: 'Kanagawa',
    colors: {
      background: 'hsl(0 13% 13%)',
      foreground: 'hsl(38 18% 86%)',
      card: 'hsl(0 13% 15%)',
      cardForeground: 'hsl(38 18% 86%)',
      primary: 'hsl(173 25% 60%)',
      primaryForeground: 'hsl(0 13% 13%)',
      secondary: 'hsl(0 13% 19%)',
      secondaryForeground: 'hsl(38 18% 86%)',
      muted: 'hsl(0 13% 19%)',
      mutedForeground: 'hsl(0 10% 55%)',
      accent: 'hsl(6 63% 74%)',
      accentForeground: 'hsl(0 13% 13%)',
      border: 'hsl(0 13% 23%)',
      input: 'hsl(0 13% 23%)',
      ring: 'hsl(173 25% 60%)',
      link: 'hsl(173 25% 60%)',
      linkHover: 'hsl(6 63% 74%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'everforest-dark': {
    name: 'Everforest Dark',
    colors: {
      background: 'hsl(143 15% 16%)',
      foreground: 'hsl(60 12% 85%)',
      card: 'hsl(143 15% 18%)',
      cardForeground: 'hsl(60 12% 85%)',
      primary: 'hsl(142 34% 52%)',
      primaryForeground: 'hsl(143 15% 16%)',
      secondary: 'hsl(143 15% 22%)',
      secondaryForeground: 'hsl(60 12% 85%)',
      muted: 'hsl(143 15% 22%)',
      mutedForeground: 'hsl(60 10% 55%)',
      accent: 'hsl(39 67% 69%)',
      accentForeground: 'hsl(143 15% 16%)',
      border: 'hsl(143 15% 26%)',
      input: 'hsl(143 15% 26%)',
      ring: 'hsl(142 34% 52%)',
      link: 'hsl(142 34% 52%)',
      linkHover: 'hsl(39 67% 69%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'everforest-light': {
    name: 'Everforest Light',
    colors: {
      background: 'hsl(45 43% 97%)',
      foreground: 'hsl(0 0% 25%)',
      card: 'hsl(45 43% 95%)',
      cardForeground: 'hsl(0 0% 25%)',
      primary: 'hsl(142 34% 35%)',
      primaryForeground: 'hsl(45 43% 97%)',
      secondary: 'hsl(45 43% 92%)',
      secondaryForeground: 'hsl(0 0% 25%)',
      muted: 'hsl(45 43% 92%)',
      mutedForeground: 'hsl(0 0% 45%)',
      accent: 'hsl(39 67% 69%)',
      accentForeground: 'hsl(0 0% 25%)',
      border: 'hsl(45 20% 88%)',
      input: 'hsl(45 20% 88%)',
      ring: 'hsl(142 34% 35%)',
      link: 'hsl(142 34% 35%)',
      linkHover: 'hsl(39 67% 69%)',
    },
    syntaxTheme: 'github-light',
  },
  'bearded-arc': {
    name: 'Bearded Arc',
    colors: {
      background: 'hsl(213 20% 13%)',
      foreground: 'hsl(220 13% 85%)',
      card: 'hsl(213 20% 15%)',
      cardForeground: 'hsl(220 13% 85%)',
      primary: 'hsl(193 76% 67%)',
      primaryForeground: 'hsl(213 20% 13%)',
      secondary: 'hsl(213 20% 19%)',
      secondaryForeground: 'hsl(220 13% 85%)',
      muted: 'hsl(213 20% 19%)',
      mutedForeground: 'hsl(220 10% 55%)',
      accent: 'hsl(286 58% 73%)',
      accentForeground: 'hsl(213 20% 13%)',
      border: 'hsl(213 20% 23%)',
      input: 'hsl(213 20% 23%)',
      ring: 'hsl(193 76% 67%)',
      link: 'hsl(193 76% 67%)',
      linkHover: 'hsl(286 58% 73%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'bearded-theme': {
    name: 'Bearded Theme',
    colors: {
      background: 'hsl(0 0% 10%)',
      foreground: 'hsl(0 0% 85%)',
      card: 'hsl(0 0% 12%)',
      cardForeground: 'hsl(0 0% 85%)',
      primary: 'hsl(171 100% 41%)',
      primaryForeground: 'hsl(0 0% 10%)',
      secondary: 'hsl(0 0% 16%)',
      secondaryForeground: 'hsl(0 0% 85%)',
      muted: 'hsl(0 0% 16%)',
      mutedForeground: 'hsl(0 0% 55%)',
      accent: 'hsl(51 100% 50%)',
      accentForeground: 'hsl(0 0% 10%)',
      border: 'hsl(0 0% 20%)',
      input: 'hsl(0 0% 20%)',
      ring: 'hsl(171 100% 41%)',
      link: 'hsl(171 100% 41%)',
      linkHover: 'hsl(51 100% 50%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'material-ocean': {
    name: 'Material Ocean',
    colors: {
      background: 'hsl(216 25% 12%)',
      foreground: 'hsl(0 0% 92%)',
      card: 'hsl(216 25% 14%)',
      cardForeground: 'hsl(0 0% 92%)',
      primary: 'hsl(199 85% 65%)',
      primaryForeground: 'hsl(216 25% 12%)',
      secondary: 'hsl(216 25% 18%)',
      secondaryForeground: 'hsl(0 0% 92%)',
      muted: 'hsl(216 25% 18%)',
      mutedForeground: 'hsl(0 0% 60%)',
      accent: 'hsl(286 60% 67%)',
      accentForeground: 'hsl(216 25% 12%)',
      border: 'hsl(216 25% 22%)',
      input: 'hsl(216 25% 22%)',
      ring: 'hsl(199 85% 65%)',
      link: 'hsl(199 85% 65%)',
      linkHover: 'hsl(286 60% 67%)',
    },
    syntaxTheme: 'material-theme',
  },
  'material-lighter': {
    name: 'Material Lighter',
    colors: {
      background: 'hsl(0 0% 98%)',
      foreground: 'hsl(230 8% 24%)',
      card: 'hsl(0 0% 96%)',
      cardForeground: 'hsl(230 8% 24%)',
      primary: 'hsl(199 85% 45%)',
      primaryForeground: 'hsl(0 0% 98%)',
      secondary: 'hsl(0 0% 93%)',
      secondaryForeground: 'hsl(230 8% 24%)',
      muted: 'hsl(0 0% 93%)',
      mutedForeground: 'hsl(230 4% 50%)',
      accent: 'hsl(0 0% 90%)',
      accentForeground: 'hsl(230 8% 24%)',
      border: 'hsl(0 0% 88%)',
      input: 'hsl(0 0% 88%)',
      ring: 'hsl(199 85% 45%)',
      link: 'hsl(199 85% 45%)',
      linkHover: 'hsl(286 60% 67%)',
    },
    syntaxTheme: 'github-light',
  },
  'darcula': {
    name: 'Darcula',
    colors: {
      background: 'hsl(0 0% 16%)',
      foreground: 'hsl(0 0% 84%)',
      card: 'hsl(0 0% 18%)',
      cardForeground: 'hsl(0 0% 84%)',
      primary: 'hsl(187 71% 63%)',
      primaryForeground: 'hsl(0 0% 16%)',
      secondary: 'hsl(0 0% 22%)',
      secondaryForeground: 'hsl(0 0% 84%)',
      muted: 'hsl(0 0% 22%)',
      mutedForeground: 'hsl(0 0% 55%)',
      accent: 'hsl(39 67% 69%)',
      accentForeground: 'hsl(0 0% 16%)',
      border: 'hsl(0 0% 26%)',
      input: 'hsl(0 0% 26%)',
      ring: 'hsl(187 71% 63%)',
      link: 'hsl(187 71% 63%)',
      linkHover: 'hsl(39 67% 69%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'rebecca': {
    name: 'Rebecca',
    colors: {
      background: 'hsl(253 25% 14%)',
      foreground: 'hsl(60 30% 96%)',
      card: 'hsl(253 25% 16%)',
      cardForeground: 'hsl(60 30% 96%)',
      primary: 'hsl(326 100% 74%)',
      primaryForeground: 'hsl(253 25% 14%)',
      secondary: 'hsl(253 25% 20%)',
      secondaryForeground: 'hsl(60 30% 96%)',
      muted: 'hsl(253 25% 20%)',
      mutedForeground: 'hsl(253 15% 60%)',
      accent: 'hsl(61 89% 72%)',
      accentForeground: 'hsl(253 25% 14%)',
      border: 'hsl(253 25% 24%)',
      input: 'hsl(253 25% 24%)',
      ring: 'hsl(326 100% 74%)',
      link: 'hsl(326 100% 74%)',
      linkHover: 'hsl(61 89% 72%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'spacegray': {
    name: 'Spacegray',
    colors: {
      background: 'hsl(200 8% 15%)',
      foreground: 'hsl(200 8% 85%)',
      card: 'hsl(200 8% 17%)',
      cardForeground: 'hsl(200 8% 85%)',
      primary: 'hsl(187 47% 55%)',
      primaryForeground: 'hsl(200 8% 15%)',
      secondary: 'hsl(200 8% 21%)',
      secondaryForeground: 'hsl(200 8% 85%)',
      muted: 'hsl(200 8% 21%)',
      mutedForeground: 'hsl(200 6% 55%)',
      accent: 'hsl(39 67% 69%)',
      accentForeground: 'hsl(200 8% 15%)',
      border: 'hsl(200 8% 25%)',
      input: 'hsl(200 8% 25%)',
      ring: 'hsl(187 47% 55%)',
      link: 'hsl(187 47% 55%)',
      linkHover: 'hsl(39 67% 69%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'palefire': {
    name: 'Palefire',
    colors: {
      background: 'hsl(238 19% 15%)',
      foreground: 'hsl(60 30% 96%)',
      card: 'hsl(238 19% 17%)',
      cardForeground: 'hsl(60 30% 96%)',
      primary: 'hsl(326 100% 74%)',
      primaryForeground: 'hsl(238 19% 15%)',
      secondary: 'hsl(238 19% 21%)',
      secondaryForeground: 'hsl(60 30% 96%)',
      muted: 'hsl(238 19% 21%)',
      mutedForeground: 'hsl(238 12% 60%)',
      accent: 'hsl(61 89% 72%)',
      accentForeground: 'hsl(238 19% 15%)',
      border: 'hsl(238 19% 25%)',
      input: 'hsl(238 19% 25%)',
      ring: 'hsl(326 100% 74%)',
      link: 'hsl(326 100% 74%)',
      linkHover: 'hsl(61 89% 72%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'noctis': {
    name: 'Noctis',
    colors: {
      background: 'hsl(233 20% 13%)',
      foreground: 'hsl(220 14% 85%)',
      card: 'hsl(233 20% 15%)',
      cardForeground: 'hsl(220 14% 85%)',
      primary: 'hsl(199 89% 48%)',
      primaryForeground: 'hsl(233 20% 13%)',
      secondary: 'hsl(233 20% 19%)',
      secondaryForeground: 'hsl(220 14% 85%)',
      muted: 'hsl(233 20% 19%)',
      mutedForeground: 'hsl(220 10% 55%)',
      accent: 'hsl(267 84% 81%)',
      accentForeground: 'hsl(233 20% 13%)',
      border: 'hsl(233 20% 23%)',
      input: 'hsl(233 20% 23%)',
      ring: 'hsl(199 89% 48%)',
      link: 'hsl(199 89% 48%)',
      linkHover: 'hsl(267 84% 81%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'deep-ocean': {
    name: 'Deep Ocean',
    colors: {
      background: 'hsl(216 33% 8%)',
      foreground: 'hsl(0 0% 92%)',
      card: 'hsl(216 33% 10%)',
      cardForeground: 'hsl(0 0% 92%)',
      primary: 'hsl(199 85% 65%)',
      primaryForeground: 'hsl(216 33% 8%)',
      secondary: 'hsl(216 33% 14%)',
      secondaryForeground: 'hsl(0 0% 92%)',
      muted: 'hsl(216 33% 14%)',
      mutedForeground: 'hsl(0 0% 60%)',
      accent: 'hsl(286 60% 67%)',
      accentForeground: 'hsl(216 33% 8%)',
      border: 'hsl(216 33% 18%)',
      input: 'hsl(216 33% 18%)',
      ring: 'hsl(199 85% 65%)',
      link: 'hsl(199 85% 65%)',
      linkHover: 'hsl(286 60% 67%)',
    },
    syntaxTheme: 'material-theme',
  },
  'cream-light': {
    name: 'Cream Light',
    colors: {
      background: 'hsl(40 30% 97%)', // Warm cream background
      foreground: 'hsl(0 0% 15%)', // Near-black text
      card: 'hsl(40 25% 95%)', // Slightly darker cream for cards
      cardForeground: 'hsl(0 0% 15%)',
      primary: 'hsl(0 0% 15%)', // Dark primary
      primaryForeground: 'hsl(40 30% 97%)',
      secondary: 'hsl(40 20% 92%)', // Subtle secondary
      secondaryForeground: 'hsl(0 0% 20%)',
      muted: 'hsl(40 20% 92%)',
      mutedForeground: 'hsl(0 0% 45%)', // Medium gray for muted text
      accent: 'hsl(40 15% 88%)', // Subtle accent
      accentForeground: 'hsl(0 0% 15%)',
      border: 'hsl(40 15% 85%)', // Soft border
      input: 'hsl(40 20% 90%)',
      ring: 'hsl(0 0% 25%)', // Dark focus ring
      link: 'hsl(0 0% 25%)', // Dark links
      linkHover: 'hsl(0 0% 10%)', // Darker on hover
    },
    syntaxTheme: 'github-light',
  },
  'sketchbook-cream': {
    name: 'Sketchbook Cream',
    colors: {
      background: 'hsl(45 45% 94%)', // Rich cream paper
      foreground: 'hsl(30 8% 25%)', // Pencil/ink gray-brown
      card: 'hsl(45 40% 92%)',
      cardForeground: 'hsl(30 8% 25%)',
      primary: 'hsl(30 8% 25%)',
      primaryForeground: 'hsl(45 45% 94%)',
      secondary: 'hsl(45 35% 90%)',
      secondaryForeground: 'hsl(30 10% 30%)',
      muted: 'hsl(45 30% 88%)',
      mutedForeground: 'hsl(30 5% 50%)',
      accent: 'hsl(48 85% 75%)', // Bright yellow marker
      accentForeground: 'hsl(30 8% 20%)',
      border: 'hsl(45 25% 82%)',
      input: 'hsl(45 35% 90%)',
      ring: 'hsl(48 90% 65%)', // Vibrant yellow
      link: 'hsl(30 12% 35%)',
      linkHover: 'hsl(30 15% 20%)',
    },
    syntaxTheme: 'github-light',
  },
  'midnight-ink': {
    name: 'Midnight Ink',
    colors: {
      background: 'hsl(220 30% 8%)', // Deep navy-black
      foreground: 'hsl(200 15% 88%)', // Cool white-blue
      card: 'hsl(220 28% 10%)',
      cardForeground: 'hsl(200 15% 88%)',
      primary: 'hsl(190 90% 55%)', // Electric cyan
      primaryForeground: 'hsl(220 30% 8%)',
      secondary: 'hsl(220 25% 13%)',
      secondaryForeground: 'hsl(200 12% 80%)',
      muted: 'hsl(220 20% 15%)',
      mutedForeground: 'hsl(200 8% 55%)',
      accent: 'hsl(280 70% 65%)', // Purple accent
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(220 25% 18%)',
      input: 'hsl(220 22% 14%)',
      ring: 'hsl(190 90% 55%)',
      link: 'hsl(190 85% 60%)',
      linkHover: 'hsl(280 70% 65%)',
    },
    syntaxTheme: 'dracula',
  },
  'sakura-blossom': {
    name: 'Sakura Blossom',
    colors: {
      background: 'hsl(350 25% 97%)', // Soft pink-white
      foreground: 'hsl(340 35% 25%)', // Deep rose-brown
      card: 'hsl(350 30% 95%)',
      cardForeground: 'hsl(340 35% 25%)',
      primary: 'hsl(340 65% 55%)', // Cherry blossom pink
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(350 20% 92%)',
      secondaryForeground: 'hsl(340 30% 30%)',
      muted: 'hsl(350 15% 90%)',
      mutedForeground: 'hsl(340 15% 50%)',
      accent: 'hsl(160 45% 65%)', // Soft jade green
      accentForeground: 'hsl(340 35% 25%)',
      border: 'hsl(350 20% 85%)',
      input: 'hsl(350 22% 93%)',
      ring: 'hsl(340 65% 55%)',
      link: 'hsl(340 70% 50%)',
      linkHover: 'hsl(340 75% 40%)',
    },
    syntaxTheme: 'rose-pine-dawn',
  },
  'neon-tokyo': {
    name: 'Neon Tokyo',
    colors: {
      background: 'hsl(260 25% 12%)', // Deep purple-black
      foreground: 'hsl(180 80% 75%)', // Bright cyan
      card: 'hsl(260 22% 15%)',
      cardForeground: 'hsl(180 80% 75%)',
      primary: 'hsl(330 100% 65%)', // Hot pink
      primaryForeground: 'hsl(260 25% 12%)',
      secondary: 'hsl(260 20% 18%)',
      secondaryForeground: 'hsl(180 70% 70%)',
      muted: 'hsl(260 18% 20%)',
      mutedForeground: 'hsl(180 30% 55%)',
      accent: 'hsl(280 90% 70%)', // Electric purple
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(280 60% 35%)',
      input: 'hsl(260 20% 18%)',
      ring: 'hsl(330 100% 65%)',
      link: 'hsl(330 95% 70%)',
      linkHover: 'hsl(280 90% 75%)',
    },
    syntaxTheme: 'synthwave-84',
  },
  'forest-whisper': {
    name: 'Forest Whisper',
    colors: {
      background: 'hsl(140 20% 12%)', // Deep forest green
      foreground: 'hsl(85 25% 82%)', // Soft sage
      card: 'hsl(140 18% 15%)',
      cardForeground: 'hsl(85 25% 82%)',
      primary: 'hsl(145 50% 55%)', // Vibrant green
      primaryForeground: 'hsl(140 20% 12%)',
      secondary: 'hsl(140 15% 18%)',
      secondaryForeground: 'hsl(85 20% 75%)',
      muted: 'hsl(140 12% 20%)',
      mutedForeground: 'hsl(85 12% 50%)',
      accent: 'hsl(35 80% 60%)', // Golden amber
      accentForeground: 'hsl(140 20% 12%)',
      border: 'hsl(140 15% 25%)',
      input: 'hsl(140 12% 18%)',
      ring: 'hsl(145 50% 55%)',
      link: 'hsl(145 55% 60%)',
      linkHover: 'hsl(35 80% 65%)',
    },
    syntaxTheme: 'everforest-dark',
  },
  'arctic-aurora': {
    name: 'Arctic Aurora',
    colors: {
      background: 'hsl(200 30% 10%)', // Deep ice blue
      foreground: 'hsl(180 20% 90%)', // Pale ice white
      card: 'hsl(200 28% 12%)',
      cardForeground: 'hsl(180 20% 90%)',
      primary: 'hsl(160 70% 60%)', // Aurora green
      primaryForeground: 'hsl(200 30% 10%)',
      secondary: 'hsl(200 25% 15%)',
      secondaryForeground: 'hsl(180 18% 85%)',
      muted: 'hsl(200 20% 18%)',
      mutedForeground: 'hsl(180 10% 55%)',
      accent: 'hsl(280 60% 70%)', // Aurora purple
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(200 25% 22%)',
      input: 'hsl(200 22% 15%)',
      ring: 'hsl(160 70% 60%)',
      link: 'hsl(160 75% 65%)',
      linkHover: 'hsl(280 60% 70%)',
    },
    syntaxTheme: 'nord',
  },
  'desert-sunset': {
    name: 'Desert Sunset',
    colors: {
      background: 'hsl(25 45% 92%)', // Warm sand
      foreground: 'hsl(15 30% 25%)', // Desert brown
      card: 'hsl(25 40% 90%)',
      cardForeground: 'hsl(15 30% 25%)',
      primary: 'hsl(15 80% 55%)', // Burnt orange
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(25 35% 88%)',
      secondaryForeground: 'hsl(15 25% 30%)',
      muted: 'hsl(25 30% 85%)',
      mutedForeground: 'hsl(15 15% 45%)',
      accent: 'hsl(340 70% 60%)', // Sunset pink
      accentForeground: 'hsl(15 30% 25%)',
      border: 'hsl(25 25% 80%)',
      input: 'hsl(25 35% 88%)',
      ring: 'hsl(15 80% 55%)',
      link: 'hsl(15 75% 50%)',
      linkHover: 'hsl(340 70% 55%)',
    },
    syntaxTheme: 'solarized-light',
  },
  'lavender-dream': {
    name: 'Lavender Dream',
    colors: {
      background: 'hsl(270 35% 96%)', // Soft lavender white
      foreground: 'hsl(260 30% 30%)', // Deep purple-gray
      card: 'hsl(270 30% 94%)',
      cardForeground: 'hsl(260 30% 30%)',
      primary: 'hsl(270 60% 65%)', // Lavender purple
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(270 25% 92%)',
      secondaryForeground: 'hsl(260 25% 35%)',
      muted: 'hsl(270 20% 90%)',
      mutedForeground: 'hsl(260 15% 50%)',
      accent: 'hsl(310 65% 70%)', // Bright magenta
      accentForeground: 'hsl(260 30% 30%)',
      border: 'hsl(270 20% 85%)',
      input: 'hsl(270 25% 92%)',
      ring: 'hsl(270 60% 65%)',
      link: 'hsl(270 65% 60%)',
      linkHover: 'hsl(310 65% 65%)',
    },
    syntaxTheme: 'github-light',
  },
  'obsidian-flame': {
    name: 'Obsidian Flame',
    colors: {
      background: 'hsl(0 0% 8%)', // Pure black
      foreground: 'hsl(20 15% 85%)', // Warm gray
      card: 'hsl(0 0% 11%)',
      cardForeground: 'hsl(20 15% 85%)',
      primary: 'hsl(15 95% 60%)', // Burning orange
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(0 0% 14%)',
      secondaryForeground: 'hsl(20 12% 80%)',
      muted: 'hsl(0 0% 17%)',
      mutedForeground: 'hsl(20 8% 50%)',
      accent: 'hsl(35 100% 55%)', // Golden flame
      accentForeground: 'hsl(0 0% 10%)',
      border: 'hsl(15 20% 20%)',
      input: 'hsl(0 0% 14%)',
      ring: 'hsl(15 95% 60%)',
      link: 'hsl(15 90% 65%)',
      linkHover: 'hsl(35 100% 60%)',
    },
    syntaxTheme: 'monokai',
  },
  'ocean-depths': {
    name: 'Ocean Depths',
    colors: {
      background: 'hsl(210 35% 8%)', // Deep ocean blue
      foreground: 'hsl(190 25% 88%)', // Sea foam white
      card: 'hsl(210 32% 10%)',
      cardForeground: 'hsl(190 25% 88%)',
      primary: 'hsl(195 85% 55%)', // Bright aqua
      primaryForeground: 'hsl(210 35% 8%)',
      secondary: 'hsl(210 28% 13%)',
      secondaryForeground: 'hsl(190 20% 82%)',
      muted: 'hsl(210 25% 16%)',
      mutedForeground: 'hsl(190 12% 55%)',
      accent: 'hsl(165 70% 60%)', // Turquoise
      accentForeground: 'hsl(210 35% 8%)',
      border: 'hsl(210 25% 20%)',
      input: 'hsl(210 25% 14%)',
      ring: 'hsl(195 85% 55%)',
      link: 'hsl(195 80% 60%)',
      linkHover: 'hsl(165 70% 65%)',
    },
    syntaxTheme: 'oceanic-next',
  },
  'vintage-sepia': {
    name: 'Vintage Sepia',
    colors: {
      background: 'hsl(35 30% 88%)', // Old paper beige
      foreground: 'hsl(25 20% 25%)', // Faded ink brown
      card: 'hsl(35 28% 85%)',
      cardForeground: 'hsl(25 20% 25%)',
      primary: 'hsl(25 45% 40%)', // Sepia brown
      primaryForeground: 'hsl(35 30% 88%)',
      secondary: 'hsl(35 25% 82%)',
      secondaryForeground: 'hsl(25 18% 30%)',
      muted: 'hsl(35 20% 80%)',
      mutedForeground: 'hsl(25 12% 45%)',
      accent: 'hsl(200 25% 50%)', // Faded blue
      accentForeground: 'hsl(35 30% 88%)',
      border: 'hsl(35 20% 75%)',
      input: 'hsl(35 25% 84%)',
      ring: 'hsl(25 45% 40%)',
      link: 'hsl(25 50% 35%)',
      linkHover: 'hsl(200 30% 45%)',
    },
    syntaxTheme: 'github-light',
  },
  'electric-violet': {
    name: 'Electric Violet',
    colors: {
      background: 'hsl(270 40% 10%)', // Deep purple-black
      foreground: 'hsl(280 20% 90%)', // Pale violet white
      card: 'hsl(270 38% 12%)',
      cardForeground: 'hsl(280 20% 90%)',
      primary: 'hsl(280 90% 65%)', // Electric violet
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(270 35% 15%)',
      secondaryForeground: 'hsl(280 18% 85%)',
      muted: 'hsl(270 30% 18%)',
      mutedForeground: 'hsl(280 12% 55%)',
      accent: 'hsl(320 85% 65%)', // Hot magenta
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(270 30% 22%)',
      input: 'hsl(270 32% 16%)',
      ring: 'hsl(280 90% 65%)',
      link: 'hsl(280 85% 70%)',
      linkHover: 'hsl(320 85% 70%)',
    },
    syntaxTheme: 'shades-of-purple',
  },
  'mint-breeze': {
    name: 'Mint Breeze',
    colors: {
      background: 'hsl(165 40% 96%)', // Pale mint
      foreground: 'hsl(170 30% 25%)', // Deep teal-green
      card: 'hsl(165 35% 94%)',
      cardForeground: 'hsl(170 30% 25%)',
      primary: 'hsl(165 60% 50%)', // Fresh mint
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(165 30% 92%)',
      secondaryForeground: 'hsl(170 25% 30%)',
      muted: 'hsl(165 25% 90%)',
      mutedForeground: 'hsl(170 15% 45%)',
      accent: 'hsl(190 70% 60%)', // Sky blue
      accentForeground: 'hsl(170 30% 25%)',
      border: 'hsl(165 25% 85%)',
      input: 'hsl(165 30% 92%)',
      ring: 'hsl(165 60% 50%)',
      link: 'hsl(165 65% 45%)',
      linkHover: 'hsl(190 70% 55%)',
    },
    syntaxTheme: 'github-light',
  },
  'bubblegum-pop': {
    name: 'Bubblegum Pop',
    colors: {
      background: 'hsl(330 100% 97%)', // Bright bubblegum pink white
      foreground: 'hsl(280 70% 25%)', // Deep purple
      card: 'hsl(330 95% 95%)',
      cardForeground: 'hsl(280 70% 25%)',
      primary: 'hsl(320 100% 60%)', // Hot pink
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(330 90% 92%)',
      secondaryForeground: 'hsl(280 60% 30%)',
      muted: 'hsl(330 85% 90%)',
      mutedForeground: 'hsl(280 40% 45%)',
      accent: 'hsl(280 100% 70%)', // Electric purple
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(320 80% 80%)',
      input: 'hsl(330 90% 93%)',
      ring: 'hsl(320 100% 60%)',
      link: 'hsl(320 95% 55%)',
      linkHover: 'hsl(280 100% 65%)',
    },
    syntaxTheme: 'rose-pine-dawn',
  },
  'lemon-lime': {
    name: 'Lemon Lime',
    colors: {
      background: 'hsl(65 100% 95%)', // Bright lemon yellow
      foreground: 'hsl(120 60% 20%)', // Deep forest green
      card: 'hsl(65 95% 92%)',
      cardForeground: 'hsl(120 60% 20%)',
      primary: 'hsl(85 90% 45%)', // Electric lime
      primaryForeground: 'hsl(120 60% 10%)',
      secondary: 'hsl(65 90% 88%)',
      secondaryForeground: 'hsl(120 50% 25%)',
      muted: 'hsl(65 85% 85%)',
      mutedForeground: 'hsl(120 30% 40%)',
      accent: 'hsl(45 100% 55%)', // Bright yellow
      accentForeground: 'hsl(120 60% 15%)',
      border: 'hsl(75 80% 75%)',
      input: 'hsl(65 90% 90%)',
      ring: 'hsl(85 90% 45%)',
      link: 'hsl(85 85% 40%)',
      linkHover: 'hsl(45 100% 50%)',
    },
    syntaxTheme: 'github-light',
  },
  'cyber-candy': {
    name: 'Cyber Candy',
    colors: {
      background: 'hsl(180 100% 96%)', // Electric cyan white
      foreground: 'hsl(300 80% 25%)', // Deep magenta
      card: 'hsl(180 95% 94%)',
      cardForeground: 'hsl(300 80% 25%)',
      primary: 'hsl(190 100% 50%)', // Neon cyan
      primaryForeground: 'hsl(300 80% 15%)',
      secondary: 'hsl(180 90% 90%)',
      secondaryForeground: 'hsl(300 70% 30%)',
      muted: 'hsl(180 85% 88%)',
      mutedForeground: 'hsl(300 40% 45%)',
      accent: 'hsl(310 100% 60%)', // Hot magenta
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(190 80% 75%)',
      input: 'hsl(180 90% 92%)',
      ring: 'hsl(190 100% 50%)',
      link: 'hsl(190 95% 45%)',
      linkHover: 'hsl(310 100% 55%)',
    },
    syntaxTheme: 'github-light',
  },
  'tangerine-dream': {
    name: 'Tangerine Dream',
    colors: {
      background: 'hsl(30 100% 94%)', // Bright tangerine
      foreground: 'hsl(0 70% 25%)', // Deep crimson
      card: 'hsl(30 95% 91%)',
      cardForeground: 'hsl(0 70% 25%)',
      primary: 'hsl(20 100% 55%)', // Vibrant orange
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(30 90% 87%)',
      secondaryForeground: 'hsl(0 60% 30%)',
      muted: 'hsl(30 85% 84%)',
      mutedForeground: 'hsl(0 35% 45%)',
      accent: 'hsl(350 100% 65%)', // Hot coral
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(25 80% 77%)',
      input: 'hsl(30 90% 88%)',
      ring: 'hsl(20 100% 55%)',
      link: 'hsl(20 95% 50%)',
      linkHover: 'hsl(350 100% 60%)',
    },
    syntaxTheme: 'solarized-light',
  },
  'holographic-pearl': {
    name: 'Holographic Pearl',
    colors: {
      background: 'hsl(200 50% 97%)', // Iridescent white-blue
      foreground: 'hsl(260 60% 30%)', // Rich purple
      card: 'hsl(200 45% 95%)',
      cardForeground: 'hsl(260 60% 30%)',
      primary: 'hsl(280 80% 65%)', // Holographic purple
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(200 40% 92%)',
      secondaryForeground: 'hsl(260 50% 35%)',
      muted: 'hsl(200 35% 90%)',
      mutedForeground: 'hsl(260 30% 50%)',
      accent: 'hsl(170 70% 65%)', // Pearlescent teal
      accentForeground: 'hsl(260 60% 25%)',
      border: 'hsl(210 60% 83%)',
      input: 'hsl(200 40% 93%)',
      ring: 'hsl(280 80% 65%)',
      link: 'hsl(280 75% 60%)',
      linkHover: 'hsl(170 70% 60%)',
    },
    syntaxTheme: 'github-light',
  },
  'radioactive-lime': {
    name: 'Radioactive Lime',
    colors: {
      background: 'hsl(80 100% 93%)', // Nuclear lime
      foreground: 'hsl(180 70% 15%)', // Deep cyan-black
      card: 'hsl(80 95% 90%)',
      cardForeground: 'hsl(180 70% 15%)',
      primary: 'hsl(75 100% 50%)', // Toxic lime
      primaryForeground: 'hsl(180 70% 10%)',
      secondary: 'hsl(80 90% 86%)',
      secondaryForeground: 'hsl(180 60% 20%)',
      muted: 'hsl(80 85% 83%)',
      mutedForeground: 'hsl(180 35% 35%)',
      accent: 'hsl(160 100% 40%)', // Neon green
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(75 80% 70%)',
      input: 'hsl(80 90% 88%)',
      ring: 'hsl(75 100% 50%)',
      link: 'hsl(75 95% 40%)',
      linkHover: 'hsl(160 100% 35%)',
    },
    syntaxTheme: 'github-light',
  },
  'sunset-sorbet': {
    name: 'Sunset Sorbet',
    colors: {
      background: 'hsl(10 100% 95%)', // Peach sorbet
      foreground: 'hsl(340 70% 25%)', // Deep raspberry
      card: 'hsl(10 95% 92%)',
      cardForeground: 'hsl(340 70% 25%)',
      primary: 'hsl(350 95% 60%)', // Raspberry red
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(10 90% 88%)',
      secondaryForeground: 'hsl(340 60% 30%)',
      muted: 'hsl(10 85% 85%)',
      mutedForeground: 'hsl(340 35% 45%)',
      accent: 'hsl(30 100% 65%)', // Mango orange
      accentForeground: 'hsl(340 70% 20%)',
      border: 'hsl(15 80% 78%)',
      input: 'hsl(10 90% 90%)',
      ring: 'hsl(350 95% 60%)',
      link: 'hsl(350 90% 55%)',
      linkHover: 'hsl(30 100% 60%)',
    },
    syntaxTheme: 'rose-pine-dawn',
  },
  'cosmic-cotton-candy': {
    name: 'Cosmic Cotton Candy',
    colors: {
      background: 'hsl(290 80% 96%)', // Light purple-pink
      foreground: 'hsl(200 70% 20%)', // Deep space blue
      card: 'hsl(290 75% 94%)',
      cardForeground: 'hsl(200 70% 20%)',
      primary: 'hsl(310 90% 65%)', // Cosmic pink
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(290 70% 91%)',
      secondaryForeground: 'hsl(200 60% 25%)',
      muted: 'hsl(290 65% 88%)',
      mutedForeground: 'hsl(200 35% 45%)',
      accent: 'hsl(240 90% 75%)', // Nebula blue
      accentForeground: 'hsl(200 70% 15%)',
      border: 'hsl(300 70% 80%)',
      input: 'hsl(290 70% 92%)',
      ring: 'hsl(310 90% 65%)',
      link: 'hsl(310 85% 60%)',
      linkHover: 'hsl(240 90% 70%)',
    },
    syntaxTheme: 'rose-pine-dawn',
  },
  'electric-banana': {
    name: 'Electric Banana',
    colors: {
      background: 'hsl(55 100% 94%)', // Bright banana yellow
      foreground: 'hsl(280 80% 20%)', // Deep purple
      card: 'hsl(55 95% 91%)',
      cardForeground: 'hsl(280 80% 20%)',
      primary: 'hsl(50 100% 50%)', // Electric yellow
      primaryForeground: 'hsl(280 80% 15%)',
      secondary: 'hsl(55 90% 87%)',
      secondaryForeground: 'hsl(280 70% 25%)',
      muted: 'hsl(55 85% 84%)',
      mutedForeground: 'hsl(280 40% 40%)',
      accent: 'hsl(280 95% 65%)', // Vibrant purple
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(50 80% 75%)',
      input: 'hsl(55 90% 88%)',
      ring: 'hsl(50 100% 50%)',
      link: 'hsl(50 95% 45%)',
      linkHover: 'hsl(280 95% 60%)',
    },
    syntaxTheme: 'github-light',
  },
  'strawberry-milkshake': {
    name: 'Strawberry Milkshake',
    colors: {
      background: 'hsl(345 90% 96%)', // Creamy pink
      foreground: 'hsl(350 70% 25%)', // Deep berry
      card: 'hsl(345 85% 94%)',
      cardForeground: 'hsl(350 70% 25%)',
      primary: 'hsl(340 100% 65%)', // Strawberry pink
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(345 80% 91%)',
      secondaryForeground: 'hsl(350 60% 30%)',
      muted: 'hsl(345 75% 88%)',
      mutedForeground: 'hsl(350 35% 45%)',
      accent: 'hsl(0 85% 70%)', // Cherry red
      accentForeground: 'hsl(350 70% 20%)',
      border: 'hsl(340 75% 82%)',
      input: 'hsl(345 80% 92%)',
      ring: 'hsl(340 100% 65%)',
      link: 'hsl(340 95% 60%)',
      linkHover: 'hsl(0 85% 65%)',
    },
    syntaxTheme: 'rose-pine-dawn',
  },
  'aurora-borealis': {
    name: 'Aurora Borealis',
    colors: {
      background: 'hsl(210 40% 96%)', // Icy white
      foreground: 'hsl(220 50% 20%)', // Deep night blue
      card: 'hsl(210 35% 94%)',
      cardForeground: 'hsl(220 50% 20%)',
      primary: 'hsl(160 80% 55%)', // Aurora green
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(210 30% 91%)',
      secondaryForeground: 'hsl(220 45% 25%)',
      muted: 'hsl(210 25% 88%)',
      mutedForeground: 'hsl(220 25% 45%)',
      accent: 'hsl(270 70% 70%)', // Purple aurora
      accentForeground: 'hsl(220 50% 15%)',
      border: 'hsl(200 50% 80%)',
      input: 'hsl(210 30% 92%)',
      ring: 'hsl(160 80% 55%)',
      link: 'hsl(160 75% 50%)',
      linkHover: 'hsl(160 85% 40%)',
    },
    syntaxTheme: 'github-light',
  },
  'tropical-paradise': {
    name: 'Tropical Paradise',
    colors: {
      background: 'hsl(180 60% 95%)', // Turquoise white
      foreground: 'hsl(25 70% 20%)', // Warm brown
      card: 'hsl(180 55% 93%)',
      cardForeground: 'hsl(25 70% 20%)',
      primary: 'hsl(165 70% 50%)', // Tropical teal
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(180 50% 89%)',
      secondaryForeground: 'hsl(25 60% 25%)',
      muted: 'hsl(180 45% 86%)',
      mutedForeground: 'hsl(25 35% 40%)',
      accent: 'hsl(35 95% 60%)', // Tropical orange
      accentForeground: 'hsl(25 70% 15%)',
      border: 'hsl(175 55% 78%)',
      input: 'hsl(180 50% 90%)',
      ring: 'hsl(165 70% 50%)',
      link: 'hsl(165 65% 45%)',
      linkHover: 'hsl(165 75% 35%)',
    },
    syntaxTheme: 'github-light',
  },
  'velvet-luxury': {
    name: 'Velvet Luxury',
    colors: {
      background: 'hsl(340 45% 95%)', // Soft rose white
      foreground: 'hsl(350 60% 20%)', // Rich burgundy
      card: 'hsl(340 40% 93%)',
      cardForeground: 'hsl(350 60% 20%)',
      primary: 'hsl(330 70% 50%)', // Luxe magenta
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(340 35% 90%)',
      secondaryForeground: 'hsl(350 55% 25%)',
      muted: 'hsl(340 30% 87%)',
      mutedForeground: 'hsl(350 30% 40%)',
      accent: 'hsl(280 65% 65%)', // Royal purple
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(335 45% 80%)',
      input: 'hsl(340 35% 91%)',
      ring: 'hsl(330 70% 50%)',
      link: 'hsl(330 65% 45%)',
      linkHover: 'hsl(330 75% 35%)',
    },
    syntaxTheme: 'rose-pine-dawn',
  },
  'peachy-keen': {
    name: 'Peachy Keen',
    colors: {
      background: 'hsl(25 85% 95%)', // Soft peach
      foreground: 'hsl(15 65% 20%)', // Deep terracotta
      card: 'hsl(25 80% 93%)',
      cardForeground: 'hsl(15 65% 20%)',
      primary: 'hsl(20 90% 60%)', // Juicy peach
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(25 75% 89%)',
      secondaryForeground: 'hsl(15 60% 25%)',
      muted: 'hsl(25 70% 86%)',
      mutedForeground: 'hsl(15 35% 40%)',
      accent: 'hsl(340 80% 65%)', // Pink blush
      accentForeground: 'hsl(15 65% 15%)',
      border: 'hsl(20 70% 80%)',
      input: 'hsl(25 75% 90%)',
      ring: 'hsl(20 90% 60%)',
      link: 'hsl(20 85% 55%)',
      linkHover: 'hsl(20 90% 45%)',
    },
    syntaxTheme: 'solarized-light',
  },
  'oceanic-breeze': {
    name: 'Oceanic Breeze',
    colors: {
      background: 'hsl(195 55% 96%)', // Ocean mist
      foreground: 'hsl(200 60% 20%)', // Deep ocean
      card: 'hsl(195 50% 94%)',
      cardForeground: 'hsl(200 60% 20%)',
      primary: 'hsl(190 75% 50%)', // Ocean blue
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(195 45% 91%)',
      secondaryForeground: 'hsl(200 55% 25%)',
      muted: 'hsl(195 40% 88%)',
      mutedForeground: 'hsl(200 30% 40%)',
      accent: 'hsl(165 70% 60%)', // Sea foam
      accentForeground: 'hsl(200 60% 15%)',
      border: 'hsl(190 50% 80%)',
      input: 'hsl(195 45% 92%)',
      ring: 'hsl(190 75% 50%)',
      link: 'hsl(190 70% 45%)',
      linkHover: 'hsl(190 80% 35%)',
    },
    syntaxTheme: 'github-light',
  },
  'golden-hour': {
    name: 'Golden Hour',
    colors: {
      background: 'hsl(45 70% 94%)', // Warm golden glow
      foreground: 'hsl(30 60% 20%)', // Rich brown
      card: 'hsl(45 65% 92%)',
      cardForeground: 'hsl(30 60% 20%)',
      primary: 'hsl(40 90% 55%)', // Golden yellow
      primaryForeground: 'hsl(30 60% 15%)',
      secondary: 'hsl(45 60% 88%)',
      secondaryForeground: 'hsl(30 55% 25%)',
      muted: 'hsl(45 55% 85%)',
      mutedForeground: 'hsl(30 30% 40%)',
      accent: 'hsl(15 85% 60%)', // Sunset orange
      accentForeground: 'hsl(30 60% 15%)',
      border: 'hsl(40 60% 78%)',
      input: 'hsl(45 60% 89%)',
      ring: 'hsl(40 90% 55%)',
      link: 'hsl(40 85% 50%)',
      linkHover: 'hsl(40 90% 40%)',
    },
    syntaxTheme: 'solarized-light',
  },
  'cherry-blossom-night': {
    name: 'Cherry Blossom Night',
    colors: {
      background: 'hsl(330 50% 95%)', // Pale pink
      foreground: 'hsl(270 50% 20%)', // Deep purple-blue
      card: 'hsl(330 45% 93%)',
      cardForeground: 'hsl(270 50% 20%)',
      primary: 'hsl(320 75% 60%)', // Cherry pink
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(330 40% 90%)',
      secondaryForeground: 'hsl(270 45% 25%)',
      muted: 'hsl(330 35% 87%)',
      mutedForeground: 'hsl(270 25% 40%)',
      accent: 'hsl(270 70% 70%)', // Night purple
      accentForeground: 'hsl(270 50% 15%)',
      border: 'hsl(325 45% 80%)',
      input: 'hsl(330 40% 91%)',
      ring: 'hsl(320 75% 60%)',
      link: 'hsl(320 70% 55%)',
      linkHover: 'hsl(320 80% 45%)',
    },
    syntaxTheme: 'rose-pine-dawn',
  },
  'lime-zest': {
    name: 'Lime Zest',
    colors: {
      background: 'hsl(75 75% 95%)', // Bright lime
      foreground: 'hsl(140 60% 20%)', // Deep green
      card: 'hsl(75 70% 93%)',
      cardForeground: 'hsl(140 60% 20%)',
      primary: 'hsl(80 85% 50%)', // Zesty lime
      primaryForeground: 'hsl(140 60% 15%)',
      secondary: 'hsl(75 65% 89%)',
      secondaryForeground: 'hsl(140 55% 25%)',
      muted: 'hsl(75 60% 86%)',
      mutedForeground: 'hsl(140 30% 40%)',
      accent: 'hsl(55 90% 55%)', // Lemon yellow
      accentForeground: 'hsl(140 60% 15%)',
      border: 'hsl(75 65% 78%)',
      input: 'hsl(75 65% 90%)',
      ring: 'hsl(80 85% 50%)',
      link: 'hsl(80 80% 45%)',
      linkHover: 'hsl(80 90% 35%)',
    },
    syntaxTheme: 'github-light',
  },
  'midnight-garden': {
    name: 'Midnight Garden',
    colors: {
      background: 'hsl(155 40% 95%)', // Pale jade
      foreground: 'hsl(240 50% 20%)', // Midnight blue
      card: 'hsl(155 35% 93%)',
      cardForeground: 'hsl(240 50% 20%)',
      primary: 'hsl(150 65% 50%)', // Garden green
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(155 30% 90%)',
      secondaryForeground: 'hsl(240 45% 25%)',
      muted: 'hsl(155 25% 87%)',
      mutedForeground: 'hsl(240 25% 40%)',
      accent: 'hsl(260 75% 65%)', // Night bloom
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(150 35% 80%)',
      input: 'hsl(155 30% 91%)',
      ring: 'hsl(150 65% 50%)',
      link: 'hsl(150 60% 45%)',
      linkHover: 'hsl(150 70% 35%)',
    },
    syntaxTheme: 'github-light',
  },
  'coral-reef': {
    name: 'Coral Reef',
    colors: {
      background: 'hsl(10 70% 95%)', // Soft coral
      foreground: 'hsl(195 60% 20%)', // Ocean depth
      card: 'hsl(10 65% 93%)',
      cardForeground: 'hsl(195 60% 20%)',
      primary: 'hsl(5 85% 60%)', // Living coral
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(10 60% 89%)',
      secondaryForeground: 'hsl(195 55% 25%)',
      muted: 'hsl(10 55% 86%)',
      mutedForeground: 'hsl(195 30% 40%)',
      accent: 'hsl(180 75% 55%)', // Reef turquoise
      accentForeground: 'hsl(195 60% 15%)',
      border: 'hsl(5 60% 78%)',
      input: 'hsl(10 60% 90%)',
      ring: 'hsl(5 85% 60%)',
      link: 'hsl(5 80% 55%)',
      linkHover: 'hsl(5 85% 45%)',
    },
    syntaxTheme: 'solarized-light',
  },
  'mystic-twilight': {
    name: 'Mystic Twilight',
    colors: {
      background: 'hsl(260 50% 96%)', // Mystical lavender
      foreground: 'hsl(210 55% 20%)', // Twilight navy
      card: 'hsl(260 45% 94%)',
      cardForeground: 'hsl(210 55% 20%)',
      primary: 'hsl(270 80% 65%)', // Mystic purple
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(260 40% 91%)',
      secondaryForeground: 'hsl(210 50% 25%)',
      muted: 'hsl(260 35% 88%)',
      mutedForeground: 'hsl(210 25% 40%)',
      accent: 'hsl(190 75% 60%)', // Twilight cyan
      accentForeground: 'hsl(210 55% 15%)',
      border: 'hsl(265 45% 82%)',
      input: 'hsl(260 40% 92%)',
      ring: 'hsl(270 80% 65%)',
      link: 'hsl(270 75% 60%)',
      linkHover: 'hsl(270 85% 50%)',
    },
    syntaxTheme: 'github-light',
  },
  'honey-glow': {
    name: 'Honey Glow',
    colors: {
      background: 'hsl(42 75% 94%)', // Honey cream
      foreground: 'hsl(25 60% 20%)', // Deep amber
      card: 'hsl(42 70% 92%)',
      cardForeground: 'hsl(25 60% 20%)',
      primary: 'hsl(38 90% 55%)', // Golden honey
      primaryForeground: 'hsl(25 60% 15%)',
      secondary: 'hsl(42 65% 88%)',
      secondaryForeground: 'hsl(25 55% 25%)',
      muted: 'hsl(42 60% 85%)',
      mutedForeground: 'hsl(25 30% 40%)',
      accent: 'hsl(28 85% 60%)', // Warm amber
      accentForeground: 'hsl(25 60% 15%)',
      border: 'hsl(38 65% 78%)',
      input: 'hsl(42 65% 89%)',
      ring: 'hsl(38 90% 55%)',
      link: 'hsl(38 85% 50%)',
      linkHover: 'hsl(38 90% 40%)',
    },
    syntaxTheme: 'solarized-light',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PREMIUM DARK THEMES - Top-notch, intuitive dark themes
  // ═══════════════════════════════════════════════════════════════════════════

  'noir-elegance': {
    name: 'Noir Elegance',
    colors: {
      background: 'hsl(0 0% 4%)', // True black elegance
      foreground: 'hsl(45 20% 88%)', // Warm cream white
      card: 'hsl(0 0% 7%)',
      cardForeground: 'hsl(45 20% 88%)',
      primary: 'hsl(42 70% 55%)', // Champagne gold
      primaryForeground: 'hsl(0 0% 4%)',
      secondary: 'hsl(0 0% 10%)',
      secondaryForeground: 'hsl(45 15% 80%)',
      muted: 'hsl(0 0% 12%)',
      mutedForeground: 'hsl(45 8% 50%)',
      accent: 'hsl(35 55% 60%)', // Soft gold accent
      accentForeground: 'hsl(0 0% 4%)',
      border: 'hsl(45 10% 15%)',
      input: 'hsl(0 0% 10%)',
      ring: 'hsl(42 70% 55%)',
      link: 'hsl(42 65% 60%)',
      linkHover: 'hsl(42 75% 70%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'deep-space': {
    name: 'Deep Space',
    colors: {
      background: 'hsl(240 25% 6%)', // Cosmic void
      foreground: 'hsl(220 30% 92%)', // Starlight white
      card: 'hsl(240 22% 9%)',
      cardForeground: 'hsl(220 30% 92%)',
      primary: 'hsl(270 80% 70%)', // Nebula purple
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(240 20% 12%)',
      secondaryForeground: 'hsl(220 25% 85%)',
      muted: 'hsl(240 18% 14%)',
      mutedForeground: 'hsl(220 15% 55%)',
      accent: 'hsl(200 90% 65%)', // Cosmic blue
      accentForeground: 'hsl(240 25% 6%)',
      border: 'hsl(250 25% 18%)',
      input: 'hsl(240 18% 12%)',
      ring: 'hsl(270 80% 70%)',
      link: 'hsl(270 75% 72%)',
      linkHover: 'hsl(200 90% 70%)',
    },
    syntaxTheme: 'tokyo-night',
  },
  'carbon-fiber': {
    name: 'Carbon Fiber',
    colors: {
      background: 'hsl(210 15% 7%)', // Deep carbon
      foreground: 'hsl(0 0% 92%)', // Clean white
      card: 'hsl(210 14% 10%)',
      cardForeground: 'hsl(0 0% 92%)',
      primary: 'hsl(185 100% 50%)', // Electric cyan
      primaryForeground: 'hsl(210 15% 7%)',
      secondary: 'hsl(210 12% 13%)',
      secondaryForeground: 'hsl(0 0% 85%)',
      muted: 'hsl(210 10% 15%)',
      mutedForeground: 'hsl(210 8% 50%)',
      accent: 'hsl(165 80% 50%)', // Tech teal
      accentForeground: 'hsl(210 15% 7%)',
      border: 'hsl(210 12% 18%)',
      input: 'hsl(210 10% 12%)',
      ring: 'hsl(185 100% 50%)',
      link: 'hsl(185 95% 55%)',
      linkHover: 'hsl(165 80% 55%)',
    },
    syntaxTheme: 'material-theme',
  },
  'velvet-midnight': {
    name: 'Velvet Midnight',
    colors: {
      background: 'hsl(280 30% 8%)', // Deep velvet purple
      foreground: 'hsl(280 15% 90%)', // Soft lavender white
      card: 'hsl(280 28% 11%)',
      cardForeground: 'hsl(280 15% 90%)',
      primary: 'hsl(340 75% 70%)', // Rose gold pink
      primaryForeground: 'hsl(280 30% 8%)',
      secondary: 'hsl(280 25% 14%)',
      secondaryForeground: 'hsl(280 12% 82%)',
      muted: 'hsl(280 22% 16%)',
      mutedForeground: 'hsl(280 10% 50%)',
      accent: 'hsl(25 70% 65%)', // Warm rose gold
      accentForeground: 'hsl(280 30% 8%)',
      border: 'hsl(280 25% 20%)',
      input: 'hsl(280 22% 13%)',
      ring: 'hsl(340 75% 70%)',
      link: 'hsl(340 70% 72%)',
      linkHover: 'hsl(25 70% 70%)',
    },
    syntaxTheme: 'dracula',
  },
  'slate-storm': {
    name: 'Slate Storm',
    colors: {
      background: 'hsl(215 28% 10%)', // Storm slate
      foreground: 'hsl(210 20% 90%)', // Cool white
      card: 'hsl(215 26% 13%)',
      cardForeground: 'hsl(210 20% 90%)',
      primary: 'hsl(210 100% 60%)', // Electric blue
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(215 24% 16%)',
      secondaryForeground: 'hsl(210 18% 82%)',
      muted: 'hsl(215 22% 18%)',
      mutedForeground: 'hsl(215 15% 52%)',
      accent: 'hsl(195 90% 55%)', // Sky blue accent
      accentForeground: 'hsl(215 28% 10%)',
      border: 'hsl(215 22% 22%)',
      input: 'hsl(215 22% 15%)',
      ring: 'hsl(210 100% 60%)',
      link: 'hsl(210 95% 65%)',
      linkHover: 'hsl(195 90% 60%)',
    },
    syntaxTheme: 'one-dark-pro',
  },
  'ember-glow': {
    name: 'Ember Glow',
    colors: {
      background: 'hsl(15 20% 7%)', // Warm charcoal
      foreground: 'hsl(35 25% 88%)', // Warm cream
      card: 'hsl(15 18% 10%)',
      cardForeground: 'hsl(35 25% 88%)',
      primary: 'hsl(25 95% 55%)', // Ember orange
      primaryForeground: 'hsl(15 20% 7%)',
      secondary: 'hsl(15 15% 13%)',
      secondaryForeground: 'hsl(35 20% 80%)',
      muted: 'hsl(15 12% 15%)',
      mutedForeground: 'hsl(20 12% 48%)',
      accent: 'hsl(40 90% 55%)', // Golden amber
      accentForeground: 'hsl(15 20% 7%)',
      border: 'hsl(18 18% 18%)',
      input: 'hsl(15 14% 12%)',
      ring: 'hsl(25 95% 55%)',
      link: 'hsl(25 90% 60%)',
      linkHover: 'hsl(40 90% 60%)',
    },
    syntaxTheme: 'monokai',
  },
  'graphite-pro': {
    name: 'Graphite Pro',
    colors: {
      background: 'hsl(220 8% 9%)', // Pure graphite
      foreground: 'hsl(220 5% 88%)', // Neutral white
      card: 'hsl(220 8% 12%)',
      cardForeground: 'hsl(220 5% 88%)',
      primary: 'hsl(220 5% 88%)', // Clean white primary
      primaryForeground: 'hsl(220 8% 9%)',
      secondary: 'hsl(220 7% 15%)',
      secondaryForeground: 'hsl(220 5% 78%)',
      muted: 'hsl(220 6% 17%)',
      mutedForeground: 'hsl(220 5% 48%)',
      accent: 'hsl(220 7% 22%)',
      accentForeground: 'hsl(220 5% 88%)',
      border: 'hsl(220 8% 18%)',
      input: 'hsl(220 7% 14%)',
      ring: 'hsl(220 5% 88%)',
      link: 'hsl(220 5% 70%)',
      linkHover: 'hsl(220 5% 88%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'phantom': {
    name: 'Phantom',
    colors: {
      background: 'hsl(240 5% 5%)', // Void black
      foreground: 'hsl(0 0% 80%)', // Ghost white
      card: 'hsl(240 5% 8%)',
      cardForeground: 'hsl(0 0% 80%)',
      primary: 'hsl(0 0% 75%)', // Phantom gray
      primaryForeground: 'hsl(240 5% 5%)',
      secondary: 'hsl(240 4% 11%)',
      secondaryForeground: 'hsl(0 0% 72%)',
      muted: 'hsl(240 4% 13%)',
      mutedForeground: 'hsl(0 0% 45%)',
      accent: 'hsl(0 0% 20%)',
      accentForeground: 'hsl(0 0% 80%)',
      border: 'hsl(240 4% 15%)',
      input: 'hsl(240 4% 10%)',
      ring: 'hsl(0 0% 75%)',
      link: 'hsl(0 0% 60%)',
      linkHover: 'hsl(0 0% 80%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'obsidian-emerald': {
    name: 'Obsidian Emerald',
    colors: {
      background: 'hsl(160 20% 6%)', // Deep obsidian green
      foreground: 'hsl(140 15% 88%)', // Soft sage white
      card: 'hsl(160 18% 9%)',
      cardForeground: 'hsl(140 15% 88%)',
      primary: 'hsl(155 70% 55%)', // Emerald green
      primaryForeground: 'hsl(160 20% 6%)',
      secondary: 'hsl(160 15% 12%)',
      secondaryForeground: 'hsl(140 12% 80%)',
      muted: 'hsl(160 12% 14%)',
      mutedForeground: 'hsl(150 10% 48%)',
      accent: 'hsl(170 65% 50%)', // Bright teal
      accentForeground: 'hsl(160 20% 6%)',
      border: 'hsl(160 15% 17%)',
      input: 'hsl(160 14% 11%)',
      ring: 'hsl(155 70% 55%)',
      link: 'hsl(155 65% 58%)',
      linkHover: 'hsl(170 65% 55%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'charcoal-bloom': {
    name: 'Charcoal Bloom',
    colors: {
      background: 'hsl(350 12% 8%)', // Warm charcoal
      foreground: 'hsl(350 10% 88%)', // Soft pink white
      card: 'hsl(350 11% 11%)',
      cardForeground: 'hsl(350 10% 88%)',
      primary: 'hsl(350 75% 65%)', // Soft coral pink
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(350 10% 14%)',
      secondaryForeground: 'hsl(350 8% 80%)',
      muted: 'hsl(350 8% 16%)',
      mutedForeground: 'hsl(350 6% 48%)',
      accent: 'hsl(15 70% 60%)', // Warm coral
      accentForeground: 'hsl(350 12% 8%)',
      border: 'hsl(350 10% 18%)',
      input: 'hsl(350 9% 13%)',
      ring: 'hsl(350 75% 65%)',
      link: 'hsl(350 70% 68%)',
      linkHover: 'hsl(15 70% 65%)',
    },
    syntaxTheme: 'rose-pine',
  },
  'ink-stars': {
    name: 'Ink & Stars',
    colors: {
      background: 'hsl(225 30% 7%)', // Deep ink
      foreground: 'hsl(220 25% 92%)', // Starlight silver
      card: 'hsl(225 28% 10%)',
      cardForeground: 'hsl(220 25% 92%)',
      primary: 'hsl(45 80% 70%)', // Star gold
      primaryForeground: 'hsl(225 30% 7%)',
      secondary: 'hsl(225 25% 13%)',
      secondaryForeground: 'hsl(220 20% 84%)',
      muted: 'hsl(225 22% 15%)',
      mutedForeground: 'hsl(225 15% 50%)',
      accent: 'hsl(210 70% 60%)', // Twilight blue
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(225 22% 18%)',
      input: 'hsl(225 24% 12%)',
      ring: 'hsl(45 80% 70%)',
      link: 'hsl(45 75% 72%)',
      linkHover: 'hsl(210 70% 65%)',
    },
    syntaxTheme: 'tokyo-night',
  },
  'copper-dusk': {
    name: 'Copper Dusk',
    colors: {
      background: 'hsl(20 15% 8%)', // Bronze dark
      foreground: 'hsl(30 18% 86%)', // Warm parchment
      card: 'hsl(20 14% 11%)',
      cardForeground: 'hsl(30 18% 86%)',
      primary: 'hsl(25 75% 55%)', // Polished copper
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(20 12% 14%)',
      secondaryForeground: 'hsl(30 15% 78%)',
      muted: 'hsl(20 10% 16%)',
      mutedForeground: 'hsl(25 10% 48%)',
      accent: 'hsl(35 70% 55%)', // Bronze accent
      accentForeground: 'hsl(20 15% 8%)',
      border: 'hsl(22 14% 18%)',
      input: 'hsl(20 11% 13%)',
      ring: 'hsl(25 75% 55%)',
      link: 'hsl(25 70% 58%)',
      linkHover: 'hsl(35 70% 60%)',
    },
    syntaxTheme: 'monokai',
  },
  'aurora-dark': {
    name: 'Aurora Dark',
    colors: {
      background: 'hsl(220 25% 8%)', // Northern night
      foreground: 'hsl(180 20% 90%)', // Aurora white
      card: 'hsl(220 23% 11%)',
      cardForeground: 'hsl(180 20% 90%)',
      primary: 'hsl(160 85% 55%)', // Aurora green
      primaryForeground: 'hsl(220 25% 8%)',
      secondary: 'hsl(220 20% 14%)',
      secondaryForeground: 'hsl(180 15% 82%)',
      muted: 'hsl(220 18% 16%)',
      mutedForeground: 'hsl(200 12% 50%)',
      accent: 'hsl(280 75% 70%)', // Aurora purple
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(220 18% 19%)',
      input: 'hsl(220 19% 13%)',
      ring: 'hsl(160 85% 55%)',
      link: 'hsl(160 80% 58%)',
      linkHover: 'hsl(280 75% 72%)',
    },
    syntaxTheme: 'nord',
  },
  'midnight-sapphire': {
    name: 'Midnight Sapphire',
    colors: {
      background: 'hsl(230 35% 8%)', // Deep sapphire black
      foreground: 'hsl(215 30% 90%)', // Cool crystal white
      card: 'hsl(230 32% 11%)',
      cardForeground: 'hsl(215 30% 90%)',
      primary: 'hsl(220 90% 60%)', // Royal sapphire
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(230 28% 14%)',
      secondaryForeground: 'hsl(215 25% 82%)',
      muted: 'hsl(230 25% 16%)',
      mutedForeground: 'hsl(220 18% 50%)',
      accent: 'hsl(260 70% 65%)', // Amethyst accent
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(228 26% 20%)',
      input: 'hsl(230 28% 13%)',
      ring: 'hsl(220 90% 60%)',
      link: 'hsl(220 85% 65%)',
      linkHover: 'hsl(260 70% 68%)',
    },
    syntaxTheme: 'tokyo-night',
  },
  'smoky-quartz': {
    name: 'Smoky Quartz',
    colors: {
      background: 'hsl(30 8% 9%)', // Smoky brown-black
      foreground: 'hsl(30 10% 85%)', // Warm stone white
      card: 'hsl(30 8% 12%)',
      cardForeground: 'hsl(30 10% 85%)',
      primary: 'hsl(30 25% 60%)', // Quartz beige
      primaryForeground: 'hsl(30 8% 9%)',
      secondary: 'hsl(30 7% 15%)',
      secondaryForeground: 'hsl(30 8% 76%)',
      muted: 'hsl(30 6% 17%)',
      mutedForeground: 'hsl(30 6% 48%)',
      accent: 'hsl(25 35% 55%)', // Warm amber
      accentForeground: 'hsl(30 8% 9%)',
      border: 'hsl(30 7% 19%)',
      input: 'hsl(30 7% 14%)',
      ring: 'hsl(30 25% 60%)',
      link: 'hsl(30 22% 62%)',
      linkHover: 'hsl(25 35% 58%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'cyber-matrix': {
    name: 'Cyber Matrix',
    colors: {
      background: 'hsl(120 30% 4%)', // Matrix black
      foreground: 'hsl(120 60% 75%)', // Matrix green text
      card: 'hsl(120 28% 7%)',
      cardForeground: 'hsl(120 60% 75%)',
      primary: 'hsl(120 100% 50%)', // Bright matrix green
      primaryForeground: 'hsl(120 30% 4%)',
      secondary: 'hsl(120 25% 10%)',
      secondaryForeground: 'hsl(120 50% 65%)',
      muted: 'hsl(120 22% 12%)',
      mutedForeground: 'hsl(120 30% 40%)',
      accent: 'hsl(180 100% 45%)', // Cyber cyan
      accentForeground: 'hsl(120 30% 4%)',
      border: 'hsl(120 25% 15%)',
      input: 'hsl(120 24% 9%)',
      ring: 'hsl(120 100% 50%)',
      link: 'hsl(120 90% 55%)',
      linkHover: 'hsl(180 100% 50%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'volcanic-ash': {
    name: 'Volcanic Ash',
    colors: {
      background: 'hsl(0 5% 7%)', // Volcanic black
      foreground: 'hsl(0 3% 82%)', // Ash gray
      card: 'hsl(0 5% 10%)',
      cardForeground: 'hsl(0 3% 82%)',
      primary: 'hsl(15 90% 55%)', // Lava orange
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(0 4% 13%)',
      secondaryForeground: 'hsl(0 3% 74%)',
      muted: 'hsl(0 4% 15%)',
      mutedForeground: 'hsl(0 3% 45%)',
      accent: 'hsl(5 85% 50%)', // Magma red
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(0 4% 18%)',
      input: 'hsl(0 4% 12%)',
      ring: 'hsl(15 90% 55%)',
      link: 'hsl(15 85% 58%)',
      linkHover: 'hsl(5 85% 55%)',
    },
    syntaxTheme: 'monokai',
  },
  'arctic-night': {
    name: 'Arctic Night',
    colors: {
      background: 'hsl(200 30% 8%)', // Frozen night
      foreground: 'hsl(195 25% 92%)', // Ice white
      card: 'hsl(200 28% 11%)',
      cardForeground: 'hsl(195 25% 92%)',
      primary: 'hsl(190 80% 60%)', // Ice blue
      primaryForeground: 'hsl(200 30% 8%)',
      secondary: 'hsl(200 25% 14%)',
      secondaryForeground: 'hsl(195 20% 84%)',
      muted: 'hsl(200 22% 16%)',
      mutedForeground: 'hsl(200 15% 50%)',
      accent: 'hsl(175 70% 55%)', // Glacier teal
      accentForeground: 'hsl(200 30% 8%)',
      border: 'hsl(200 22% 19%)',
      input: 'hsl(200 24% 13%)',
      ring: 'hsl(190 80% 60%)',
      link: 'hsl(190 75% 63%)',
      linkHover: 'hsl(175 70% 58%)',
    },
    syntaxTheme: 'nord',
  },
  'shadow-realm': {
    name: 'Shadow Realm',
    colors: {
      background: 'hsl(260 25% 6%)', // Deep shadow purple
      foreground: 'hsl(260 15% 88%)', // Ethereal white
      card: 'hsl(260 23% 9%)',
      cardForeground: 'hsl(260 15% 88%)',
      primary: 'hsl(280 100% 70%)', // Mystic purple
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(260 20% 12%)',
      secondaryForeground: 'hsl(260 12% 80%)',
      muted: 'hsl(260 18% 14%)',
      mutedForeground: 'hsl(260 10% 48%)',
      accent: 'hsl(320 90% 65%)', // Shadow pink
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(260 18% 17%)',
      input: 'hsl(260 19% 11%)',
      ring: 'hsl(280 100% 70%)',
      link: 'hsl(280 95% 72%)',
      linkHover: 'hsl(320 90% 68%)',
    },
    syntaxTheme: 'dracula',
  },
  'nebula-pink': {
    name: 'Nebula Pink',
    colors: {
      background: 'hsl(320 25% 7%)', // Deep cosmic pink
      foreground: 'hsl(320 15% 90%)', // Soft nebula white
      card: 'hsl(320 23% 10%)',
      cardForeground: 'hsl(320 15% 90%)',
      primary: 'hsl(330 90% 65%)', // Bright nebula pink
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(320 20% 13%)',
      secondaryForeground: 'hsl(320 12% 82%)',
      muted: 'hsl(320 18% 15%)',
      mutedForeground: 'hsl(320 10% 48%)',
      accent: 'hsl(280 80% 68%)', // Purple dust
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(320 18% 18%)',
      input: 'hsl(320 19% 12%)',
      ring: 'hsl(330 90% 65%)',
      link: 'hsl(330 85% 68%)',
      linkHover: 'hsl(280 80% 70%)',
    },
    syntaxTheme: 'dracula',
  },
  'royal-amethyst': {
    name: 'Royal Amethyst',
    colors: {
      background: 'hsl(270 30% 8%)', // Deep amethyst
      foreground: 'hsl(270 18% 90%)', // Crystal white
      card: 'hsl(270 28% 11%)',
      cardForeground: 'hsl(270 18% 90%)',
      primary: 'hsl(280 70% 60%)', // Royal purple
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(270 25% 14%)',
      secondaryForeground: 'hsl(270 15% 82%)',
      muted: 'hsl(270 22% 16%)',
      mutedForeground: 'hsl(270 12% 50%)',
      accent: 'hsl(45 80% 60%)', // Gold accent
      accentForeground: 'hsl(270 30% 8%)',
      border: 'hsl(270 22% 19%)',
      input: 'hsl(270 24% 13%)',
      ring: 'hsl(280 70% 60%)',
      link: 'hsl(280 65% 63%)',
      linkHover: 'hsl(45 80% 65%)',
    },
    syntaxTheme: 'shades-of-purple',
  },
  'moonlit-ocean': {
    name: 'Moonlit Ocean',
    colors: {
      background: 'hsl(210 40% 7%)', // Deep ocean night
      foreground: 'hsl(200 30% 92%)', // Moonlight silver
      card: 'hsl(210 38% 10%)',
      cardForeground: 'hsl(200 30% 92%)',
      primary: 'hsl(195 85% 60%)', // Moonlit water
      primaryForeground: 'hsl(210 40% 7%)',
      secondary: 'hsl(210 35% 13%)',
      secondaryForeground: 'hsl(200 25% 84%)',
      muted: 'hsl(210 32% 15%)',
      mutedForeground: 'hsl(205 20% 50%)',
      accent: 'hsl(220 70% 65%)', // Deep sea blue
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(210 32% 18%)',
      input: 'hsl(210 34% 12%)',
      ring: 'hsl(195 85% 60%)',
      link: 'hsl(195 80% 63%)',
      linkHover: 'hsl(220 70% 68%)',
    },
    syntaxTheme: 'tokyo-night',
  },
  'crimson-night': {
    name: 'Crimson Night',
    colors: {
      background: 'hsl(0 25% 6%)', // Blood dark
      foreground: 'hsl(0 10% 90%)', // Pale white
      card: 'hsl(0 23% 9%)',
      cardForeground: 'hsl(0 10% 90%)',
      primary: 'hsl(355 85% 55%)', // Crimson red
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(0 20% 12%)',
      secondaryForeground: 'hsl(0 8% 82%)',
      muted: 'hsl(0 18% 14%)',
      mutedForeground: 'hsl(0 8% 48%)',
      accent: 'hsl(340 75% 55%)', // Dark rose
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(0 18% 17%)',
      input: 'hsl(0 19% 11%)',
      ring: 'hsl(355 85% 55%)',
      link: 'hsl(355 80% 58%)',
      linkHover: 'hsl(340 75% 58%)',
    },
    syntaxTheme: 'dracula',
  },
  'jade-shadow': {
    name: 'Jade Shadow',
    colors: {
      background: 'hsl(160 30% 6%)', // Deep jade dark
      foreground: 'hsl(150 20% 88%)', // Soft jade white
      card: 'hsl(160 28% 9%)',
      cardForeground: 'hsl(150 20% 88%)',
      primary: 'hsl(155 65% 50%)', // Imperial jade
      primaryForeground: 'hsl(160 30% 6%)',
      secondary: 'hsl(160 25% 12%)',
      secondaryForeground: 'hsl(150 15% 80%)',
      muted: 'hsl(160 22% 14%)',
      mutedForeground: 'hsl(155 12% 48%)',
      accent: 'hsl(42 75% 55%)', // Gold accent
      accentForeground: 'hsl(160 30% 6%)',
      border: 'hsl(160 22% 17%)',
      input: 'hsl(160 24% 11%)',
      ring: 'hsl(155 65% 50%)',
      link: 'hsl(155 60% 53%)',
      linkHover: 'hsl(42 75% 58%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'twilight-haze': {
    name: 'Twilight Haze',
    colors: {
      background: 'hsl(265 28% 9%)', // Twilight purple
      foreground: 'hsl(260 18% 90%)', // Hazy white
      card: 'hsl(265 26% 12%)',
      cardForeground: 'hsl(260 18% 90%)',
      primary: 'hsl(45 85% 65%)', // Warm sunset gold
      primaryForeground: 'hsl(265 28% 9%)',
      secondary: 'hsl(265 23% 15%)',
      secondaryForeground: 'hsl(260 15% 82%)',
      muted: 'hsl(265 20% 17%)',
      mutedForeground: 'hsl(260 12% 50%)',
      accent: 'hsl(280 70% 65%)', // Twilight purple
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(265 20% 20%)',
      input: 'hsl(265 22% 14%)',
      ring: 'hsl(45 85% 65%)',
      link: 'hsl(45 80% 68%)',
      linkHover: 'hsl(280 70% 68%)',
    },
    syntaxTheme: 'tokyo-night',
  },
  'storm-cloud': {
    name: 'Storm Cloud',
    colors: {
      background: 'hsl(210 18% 8%)', // Storm dark
      foreground: 'hsl(210 12% 88%)', // Cloud white
      card: 'hsl(210 17% 11%)',
      cardForeground: 'hsl(210 12% 88%)',
      primary: 'hsl(200 90% 55%)', // Lightning blue
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(210 15% 14%)',
      secondaryForeground: 'hsl(210 10% 80%)',
      muted: 'hsl(210 13% 16%)',
      mutedForeground: 'hsl(210 8% 50%)',
      accent: 'hsl(45 90% 60%)', // Lightning flash
      accentForeground: 'hsl(210 18% 8%)',
      border: 'hsl(210 13% 19%)',
      input: 'hsl(210 14% 13%)',
      ring: 'hsl(200 90% 55%)',
      link: 'hsl(200 85% 58%)',
      linkHover: 'hsl(45 90% 63%)',
    },
    syntaxTheme: 'one-dark-pro',
  },
  'burnt-sienna': {
    name: 'Burnt Sienna',
    colors: {
      background: 'hsl(18 25% 8%)', // Earth dark
      foreground: 'hsl(25 18% 86%)', // Warm clay white
      card: 'hsl(18 23% 11%)',
      cardForeground: 'hsl(25 18% 86%)',
      primary: 'hsl(20 75% 50%)', // Burnt sienna
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(18 20% 14%)',
      secondaryForeground: 'hsl(25 14% 78%)',
      muted: 'hsl(18 18% 16%)',
      mutedForeground: 'hsl(20 12% 48%)',
      accent: 'hsl(35 70% 55%)', // Terracotta
      accentForeground: 'hsl(18 25% 8%)',
      border: 'hsl(18 18% 19%)',
      input: 'hsl(18 20% 13%)',
      ring: 'hsl(20 75% 50%)',
      link: 'hsl(20 70% 53%)',
      linkHover: 'hsl(35 70% 58%)',
    },
    syntaxTheme: 'monokai',
  },
  'frozen-dusk': {
    name: 'Frozen Dusk',
    colors: {
      background: 'hsl(210 25% 9%)', // Frozen night
      foreground: 'hsl(200 35% 92%)', // Frost white
      card: 'hsl(210 23% 12%)',
      cardForeground: 'hsl(200 35% 92%)',
      primary: 'hsl(190 70% 65%)', // Ice blue
      primaryForeground: 'hsl(210 25% 9%)',
      secondary: 'hsl(210 20% 15%)',
      secondaryForeground: 'hsl(200 28% 84%)',
      muted: 'hsl(210 18% 17%)',
      mutedForeground: 'hsl(205 15% 52%)',
      accent: 'hsl(280 55% 65%)', // Dusk purple
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(210 18% 20%)',
      input: 'hsl(210 19% 14%)',
      ring: 'hsl(190 70% 65%)',
      link: 'hsl(190 65% 68%)',
      linkHover: 'hsl(280 55% 68%)',
    },
    syntaxTheme: 'nord',
  },
  'bamboo-night': {
    name: 'Bamboo Night',
    colors: {
      background: 'hsl(140 20% 7%)', // Dark bamboo forest
      foreground: 'hsl(120 15% 88%)', // Bamboo white
      card: 'hsl(140 18% 10%)',
      cardForeground: 'hsl(120 15% 88%)',
      primary: 'hsl(135 55% 50%)', // Bamboo green
      primaryForeground: 'hsl(140 20% 7%)',
      secondary: 'hsl(140 15% 13%)',
      secondaryForeground: 'hsl(120 12% 80%)',
      muted: 'hsl(140 13% 15%)',
      mutedForeground: 'hsl(130 10% 48%)',
      accent: 'hsl(45 60% 55%)', // Lantern gold
      accentForeground: 'hsl(140 20% 7%)',
      border: 'hsl(140 13% 18%)',
      input: 'hsl(140 14% 12%)',
      ring: 'hsl(135 55% 50%)',
      link: 'hsl(135 50% 53%)',
      linkHover: 'hsl(45 60% 58%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'onyx-gold': {
    name: 'Onyx Gold',
    colors: {
      background: 'hsl(0 0% 4%)', // Pure onyx black
      foreground: 'hsl(45 35% 88%)', // Warm gold white
      card: 'hsl(0 0% 7%)',
      cardForeground: 'hsl(45 35% 88%)',
      primary: 'hsl(45 90% 55%)', // Luxurious gold
      primaryForeground: 'hsl(0 0% 4%)',
      secondary: 'hsl(0 0% 10%)',
      secondaryForeground: 'hsl(45 25% 80%)',
      muted: 'hsl(0 0% 12%)',
      mutedForeground: 'hsl(45 15% 50%)',
      accent: 'hsl(38 85% 60%)', // Bright gold
      accentForeground: 'hsl(0 0% 4%)',
      border: 'hsl(45 20% 15%)',
      input: 'hsl(0 0% 10%)',
      ring: 'hsl(45 90% 55%)',
      link: 'hsl(45 85% 58%)',
      linkHover: 'hsl(38 85% 63%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'midnight-rose': {
    name: 'Midnight Rose',
    colors: {
      background: 'hsl(340 22% 7%)', // Dark rose night
      foreground: 'hsl(340 15% 90%)', // Rose white
      card: 'hsl(340 20% 10%)',
      cardForeground: 'hsl(340 15% 90%)',
      primary: 'hsl(345 80% 60%)', // Rose pink
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(340 17% 13%)',
      secondaryForeground: 'hsl(340 12% 82%)',
      muted: 'hsl(340 15% 15%)',
      mutedForeground: 'hsl(340 10% 50%)',
      accent: 'hsl(320 70% 60%)', // Deep magenta
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(340 15% 18%)',
      input: 'hsl(340 16% 12%)',
      ring: 'hsl(345 80% 60%)',
      link: 'hsl(345 75% 63%)',
      linkHover: 'hsl(320 70% 63%)',
    },
    syntaxTheme: 'rose-pine',
  },
  'thunder-gray': {
    name: 'Thunder Gray',
    colors: {
      background: 'hsl(220 12% 8%)', // Thunder cloud dark
      foreground: 'hsl(220 8% 88%)', // Storm white
      card: 'hsl(220 11% 11%)',
      cardForeground: 'hsl(220 8% 88%)',
      primary: 'hsl(210 100% 60%)', // Electric blue
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(220 10% 14%)',
      secondaryForeground: 'hsl(220 7% 80%)',
      muted: 'hsl(220 9% 16%)',
      mutedForeground: 'hsl(220 6% 50%)',
      accent: 'hsl(55 100% 55%)', // Lightning yellow
      accentForeground: 'hsl(220 12% 8%)',
      border: 'hsl(220 9% 19%)',
      input: 'hsl(220 10% 13%)',
      ring: 'hsl(210 100% 60%)',
      link: 'hsl(210 95% 63%)',
      linkHover: 'hsl(55 100% 58%)',
    },
    syntaxTheme: 'one-dark-pro',
  },
  'black-pearl': {
    name: 'Black Pearl',
    colors: {
      background: 'hsl(200 20% 6%)', // Deep pearl black
      foreground: 'hsl(200 30% 92%)', // Pearl iridescence
      card: 'hsl(200 18% 9%)',
      cardForeground: 'hsl(200 30% 92%)',
      primary: 'hsl(185 60% 65%)', // Pearl cyan
      primaryForeground: 'hsl(200 20% 6%)',
      secondary: 'hsl(200 15% 12%)',
      secondaryForeground: 'hsl(200 22% 84%)',
      muted: 'hsl(200 13% 14%)',
      mutedForeground: 'hsl(200 12% 50%)',
      accent: 'hsl(280 50% 70%)', // Pearl purple
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(200 13% 17%)',
      input: 'hsl(200 14% 11%)',
      ring: 'hsl(185 60% 65%)',
      link: 'hsl(185 55% 68%)',
      linkHover: 'hsl(280 50% 72%)',
    },
    syntaxTheme: 'material-theme',
  },
  'neon-noir': {
    name: 'Neon Noir',
    colors: {
      background: 'hsl(240 10% 5%)', // Film noir black
      foreground: 'hsl(0 0% 88%)', // Classic white
      card: 'hsl(240 9% 8%)',
      cardForeground: 'hsl(0 0% 88%)',
      primary: 'hsl(340 100% 60%)', // Neon pink
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(240 8% 11%)',
      secondaryForeground: 'hsl(0 0% 80%)',
      muted: 'hsl(240 7% 13%)',
      mutedForeground: 'hsl(0 0% 48%)',
      accent: 'hsl(180 100% 50%)', // Neon cyan
      accentForeground: 'hsl(240 10% 5%)',
      border: 'hsl(340 30% 15%)',
      input: 'hsl(240 8% 10%)',
      ring: 'hsl(340 100% 60%)',
      link: 'hsl(340 95% 63%)',
      linkHover: 'hsl(180 100% 55%)',
    },
    syntaxTheme: 'synthwave-84',
  },
  'cosmic-dust': {
    name: 'Cosmic Dust',
    colors: {
      background: 'hsl(250 25% 8%)', // Space dust purple
      foreground: 'hsl(245 20% 90%)', // Starlight white
      card: 'hsl(250 23% 11%)',
      cardForeground: 'hsl(245 20% 90%)',
      primary: 'hsl(260 65% 65%)', // Cosmic purple
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(250 20% 14%)',
      secondaryForeground: 'hsl(245 17% 82%)',
      muted: 'hsl(250 18% 16%)',
      mutedForeground: 'hsl(250 12% 50%)',
      accent: 'hsl(200 75% 60%)', // Nebula blue
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(250 18% 19%)',
      input: 'hsl(250 19% 13%)',
      ring: 'hsl(260 65% 65%)',
      link: 'hsl(260 60% 68%)',
      linkHover: 'hsl(200 75% 63%)',
    },
    syntaxTheme: 'tokyo-night',
  },
  'steel-forge': {
    name: 'Steel Forge',
    colors: {
      background: 'hsl(215 15% 9%)', // Forged steel
      foreground: 'hsl(210 10% 88%)', // Metal white
      card: 'hsl(215 14% 12%)',
      cardForeground: 'hsl(210 10% 88%)',
      primary: 'hsl(210 50% 60%)', // Steel blue
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(215 12% 15%)',
      secondaryForeground: 'hsl(210 8% 80%)',
      muted: 'hsl(215 10% 17%)',
      mutedForeground: 'hsl(210 6% 50%)',
      accent: 'hsl(25 85% 55%)', // Molten orange
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(215 10% 20%)',
      input: 'hsl(215 11% 14%)',
      ring: 'hsl(210 50% 60%)',
      link: 'hsl(210 45% 63%)',
      linkHover: 'hsl(25 85% 58%)',
    },
    syntaxTheme: 'material-theme',
  },
  'mystic-fog': {
    name: 'Mystic Fog',
    colors: {
      background: 'hsl(230 15% 10%)', // Foggy night
      foreground: 'hsl(225 15% 85%)', // Misty white
      card: 'hsl(230 14% 13%)',
      cardForeground: 'hsl(225 15% 85%)',
      primary: 'hsl(225 40% 65%)', // Fog blue
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(230 12% 16%)',
      secondaryForeground: 'hsl(225 12% 77%)',
      muted: 'hsl(230 10% 18%)',
      mutedForeground: 'hsl(225 8% 50%)',
      accent: 'hsl(270 45% 65%)', // Mystic purple
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(230 10% 21%)',
      input: 'hsl(230 11% 15%)',
      ring: 'hsl(225 40% 65%)',
      link: 'hsl(225 35% 68%)',
      linkHover: 'hsl(270 45% 68%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'raven-wing': {
    name: 'Raven Wing',
    colors: {
      background: 'hsl(225 30% 6%)', // Raven black-blue
      foreground: 'hsl(220 25% 92%)', // Silver moonlight
      card: 'hsl(225 28% 9%)',
      cardForeground: 'hsl(220 25% 92%)',
      primary: 'hsl(220 60% 65%)', // Raven blue
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(225 25% 12%)',
      secondaryForeground: 'hsl(220 20% 84%)',
      muted: 'hsl(225 22% 14%)',
      mutedForeground: 'hsl(220 15% 50%)',
      accent: 'hsl(0 0% 75%)', // Silver accent
      accentForeground: 'hsl(225 30% 6%)',
      border: 'hsl(225 22% 17%)',
      input: 'hsl(225 24% 11%)',
      ring: 'hsl(220 60% 65%)',
      link: 'hsl(220 55% 68%)',
      linkHover: 'hsl(0 0% 80%)',
    },
    syntaxTheme: 'tokyo-night',
  },
  'terracotta-night': {
    name: 'Terracotta Night',
    colors: {
      background: 'hsl(15 18% 8%)', // Warm terracotta dark
      foreground: 'hsl(25 15% 88%)', // Clay white
      card: 'hsl(15 17% 11%)',
      cardForeground: 'hsl(25 15% 88%)',
      primary: 'hsl(18 70% 55%)', // Terracotta orange
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(15 15% 14%)',
      secondaryForeground: 'hsl(25 12% 80%)',
      muted: 'hsl(15 13% 16%)',
      mutedForeground: 'hsl(20 10% 48%)',
      accent: 'hsl(165 50% 50%)', // Sage green
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(15 13% 19%)',
      input: 'hsl(15 14% 13%)',
      ring: 'hsl(18 70% 55%)',
      link: 'hsl(18 65% 58%)',
      linkHover: 'hsl(165 50% 53%)',
    },
    syntaxTheme: 'monokai',
  },
  'northern-lights': {
    name: 'Northern Lights',
    colors: {
      background: 'hsl(220 30% 7%)', // Arctic night sky
      foreground: 'hsl(180 25% 92%)', // Aurora white
      card: 'hsl(220 28% 10%)',
      cardForeground: 'hsl(180 25% 92%)',
      primary: 'hsl(150 90% 55%)', // Aurora green
      primaryForeground: 'hsl(220 30% 7%)',
      secondary: 'hsl(220 25% 13%)',
      secondaryForeground: 'hsl(180 20% 84%)',
      muted: 'hsl(220 22% 15%)',
      mutedForeground: 'hsl(200 15% 50%)',
      accent: 'hsl(280 80% 65%)', // Aurora purple
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(220 22% 18%)',
      input: 'hsl(220 24% 12%)',
      ring: 'hsl(150 90% 55%)',
      link: 'hsl(150 85% 58%)',
      linkHover: 'hsl(280 80% 68%)',
    },
    syntaxTheme: 'nord',
  },
  'vintage-noir': {
    name: 'Vintage Noir',
    colors: {
      background: 'hsl(30 8% 7%)', // Sepia black
      foreground: 'hsl(35 20% 82%)', // Vintage cream
      card: 'hsl(30 8% 10%)',
      cardForeground: 'hsl(35 20% 82%)',
      primary: 'hsl(35 45% 55%)', // Vintage gold
      primaryForeground: 'hsl(30 8% 7%)',
      secondary: 'hsl(30 7% 13%)',
      secondaryForeground: 'hsl(35 15% 74%)',
      muted: 'hsl(30 6% 15%)',
      mutedForeground: 'hsl(35 10% 48%)',
      accent: 'hsl(20 50% 50%)', // Sepia accent
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(30 6% 18%)',
      input: 'hsl(30 7% 12%)',
      ring: 'hsl(35 45% 55%)',
      link: 'hsl(35 40% 58%)',
      linkHover: 'hsl(20 50% 53%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'electric-dreams': {
    name: 'Electric Dreams',
    colors: {
      background: 'hsl(255 30% 8%)', // Dream purple
      foreground: 'hsl(250 20% 92%)', // Dream white
      card: 'hsl(255 28% 11%)',
      cardForeground: 'hsl(250 20% 92%)',
      primary: 'hsl(315 100% 60%)', // Electric magenta
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(255 25% 14%)',
      secondaryForeground: 'hsl(250 17% 84%)',
      muted: 'hsl(255 22% 16%)',
      mutedForeground: 'hsl(255 12% 50%)',
      accent: 'hsl(185 100% 50%)', // Electric cyan
      accentForeground: 'hsl(255 30% 8%)',
      border: 'hsl(260 22% 19%)',
      input: 'hsl(255 24% 13%)',
      ring: 'hsl(315 100% 60%)',
      link: 'hsl(315 95% 63%)',
      linkHover: 'hsl(185 100% 55%)',
    },
    syntaxTheme: 'synthwave-84',
  },
  'moss-stone': {
    name: 'Moss Stone',
    colors: {
      background: 'hsl(120 12% 8%)', // Mossy stone dark
      foreground: 'hsl(110 10% 86%)', // Lichen white
      card: 'hsl(120 11% 11%)',
      cardForeground: 'hsl(110 10% 86%)',
      primary: 'hsl(130 45% 50%)', // Forest moss
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(120 10% 14%)',
      secondaryForeground: 'hsl(110 8% 78%)',
      muted: 'hsl(120 9% 16%)',
      mutedForeground: 'hsl(115 7% 48%)',
      accent: 'hsl(180 40% 50%)', // Stone teal
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(120 9% 19%)',
      input: 'hsl(120 10% 13%)',
      ring: 'hsl(130 45% 50%)',
      link: 'hsl(130 40% 53%)',
      linkHover: 'hsl(180 40% 53%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'cherry-cola': {
    name: 'Cherry Cola',
    colors: {
      background: 'hsl(0 20% 7%)', // Cola dark
      foreground: 'hsl(0 12% 88%)', // Cream white
      card: 'hsl(0 18% 10%)',
      cardForeground: 'hsl(0 12% 88%)',
      primary: 'hsl(350 80% 55%)', // Cherry red
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(0 15% 13%)',
      secondaryForeground: 'hsl(0 10% 80%)',
      muted: 'hsl(0 13% 15%)',
      mutedForeground: 'hsl(0 8% 48%)',
      accent: 'hsl(30 70% 50%)', // Caramel
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(0 13% 18%)',
      input: 'hsl(0 14% 12%)',
      ring: 'hsl(350 80% 55%)',
      link: 'hsl(350 75% 58%)',
      linkHover: 'hsl(30 70% 53%)',
    },
    syntaxTheme: 'dracula',
  },
  'galactic-purple': {
    name: 'Galactic Purple',
    colors: {
      background: 'hsl(275 35% 7%)', // Galaxy purple
      foreground: 'hsl(275 18% 92%)', // Star white
      card: 'hsl(275 33% 10%)',
      cardForeground: 'hsl(275 18% 92%)',
      primary: 'hsl(285 90% 65%)', // Galactic violet
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(275 30% 13%)',
      secondaryForeground: 'hsl(275 15% 84%)',
      muted: 'hsl(275 27% 15%)',
      mutedForeground: 'hsl(275 12% 50%)',
      accent: 'hsl(340 85% 65%)', // Nebula pink
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(275 27% 18%)',
      input: 'hsl(275 29% 12%)',
      ring: 'hsl(285 90% 65%)',
      link: 'hsl(285 85% 68%)',
      linkHover: 'hsl(340 85% 68%)',
    },
    syntaxTheme: 'shades-of-purple',
  },
  'ocean-abyss': {
    name: 'Ocean Abyss',
    colors: {
      background: 'hsl(210 45% 5%)', // Deep ocean abyss
      foreground: 'hsl(195 30% 90%)', // Deep sea glow
      card: 'hsl(210 42% 8%)',
      cardForeground: 'hsl(195 30% 90%)',
      primary: 'hsl(185 80% 55%)', // Bioluminescent cyan
      primaryForeground: 'hsl(210 45% 5%)',
      secondary: 'hsl(210 38% 11%)',
      secondaryForeground: 'hsl(195 25% 82%)',
      muted: 'hsl(210 35% 13%)',
      mutedForeground: 'hsl(200 18% 48%)',
      accent: 'hsl(200 70% 55%)', // Deep sea blue
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(210 35% 16%)',
      input: 'hsl(210 37% 10%)',
      ring: 'hsl(185 80% 55%)',
      link: 'hsl(185 75% 58%)',
      linkHover: 'hsl(200 70% 58%)',
    },
    syntaxTheme: 'material-theme',
  },
  'warm-charcoal': {
    name: 'Warm Charcoal',
    colors: {
      background: 'hsl(25 10% 8%)', // Warm charcoal
      foreground: 'hsl(30 12% 88%)', // Warm white
      card: 'hsl(25 9% 11%)',
      cardForeground: 'hsl(30 12% 88%)',
      primary: 'hsl(30 65% 55%)', // Warm amber
      primaryForeground: 'hsl(25 10% 8%)',
      secondary: 'hsl(25 8% 14%)',
      secondaryForeground: 'hsl(30 10% 80%)',
      muted: 'hsl(25 7% 16%)',
      mutedForeground: 'hsl(28 7% 48%)',
      accent: 'hsl(15 60% 55%)', // Warm coral
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(25 7% 19%)',
      input: 'hsl(25 8% 13%)',
      ring: 'hsl(30 65% 55%)',
      link: 'hsl(30 60% 58%)',
      linkHover: 'hsl(15 60% 58%)',
    },
    syntaxTheme: 'monokai',
  },
  'neon-sunset': {
    name: 'Neon Sunset',
    colors: {
      background: 'hsl(280 25% 8%)', // Sunset purple
      foreground: 'hsl(35 30% 92%)', // Warm sunset white
      card: 'hsl(280 23% 11%)',
      cardForeground: 'hsl(35 30% 92%)',
      primary: 'hsl(35 100% 55%)', // Neon orange
      primaryForeground: 'hsl(280 25% 8%)',
      secondary: 'hsl(280 20% 14%)',
      secondaryForeground: 'hsl(35 25% 84%)',
      muted: 'hsl(280 18% 16%)',
      mutedForeground: 'hsl(300 12% 50%)',
      accent: 'hsl(330 100% 60%)', // Neon pink
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(290 18% 19%)',
      input: 'hsl(280 19% 13%)',
      ring: 'hsl(35 100% 55%)',
      link: 'hsl(35 95% 58%)',
      linkHover: 'hsl(330 100% 63%)',
    },
    syntaxTheme: 'synthwave-84',
  },
  'ice-cave': {
    name: 'Ice Cave',
    colors: {
      background: 'hsl(200 35% 8%)', // Ice cave dark
      foreground: 'hsl(195 40% 94%)', // Ice white
      card: 'hsl(200 33% 11%)',
      cardForeground: 'hsl(195 40% 94%)',
      primary: 'hsl(195 80% 65%)', // Glacial blue
      primaryForeground: 'hsl(200 35% 8%)',
      secondary: 'hsl(200 30% 14%)',
      secondaryForeground: 'hsl(195 35% 86%)',
      muted: 'hsl(200 27% 16%)',
      mutedForeground: 'hsl(195 22% 52%)',
      accent: 'hsl(185 70% 60%)', // Crystal cyan
      accentForeground: 'hsl(200 35% 8%)',
      border: 'hsl(200 27% 19%)',
      input: 'hsl(200 29% 13%)',
      ring: 'hsl(195 80% 65%)',
      link: 'hsl(195 75% 68%)',
      linkHover: 'hsl(185 70% 63%)',
    },
    syntaxTheme: 'nord',
  },
  'royal-navy': {
    name: 'Royal Navy',
    colors: {
      background: 'hsl(220 40% 8%)', // Deep navy
      foreground: 'hsl(215 25% 90%)', // Naval white
      card: 'hsl(220 38% 11%)',
      cardForeground: 'hsl(215 25% 90%)',
      primary: 'hsl(215 70% 55%)', // Royal blue
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(220 35% 14%)',
      secondaryForeground: 'hsl(215 20% 82%)',
      muted: 'hsl(220 32% 16%)',
      mutedForeground: 'hsl(215 15% 50%)',
      accent: 'hsl(45 85% 55%)', // Naval gold
      accentForeground: 'hsl(220 40% 8%)',
      border: 'hsl(220 32% 19%)',
      input: 'hsl(220 34% 13%)',
      ring: 'hsl(215 70% 55%)',
      link: 'hsl(215 65% 58%)',
      linkHover: 'hsl(45 85% 58%)',
    },
    syntaxTheme: 'one-dark-pro',
  },
  'autumn-ember': {
    name: 'Autumn Ember',
    colors: {
      background: 'hsl(20 22% 8%)', // Autumn night
      foreground: 'hsl(30 20% 88%)', // Warm leaf white
      card: 'hsl(20 20% 11%)',
      cardForeground: 'hsl(30 20% 88%)',
      primary: 'hsl(25 85% 55%)', // Autumn orange
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(20 17% 14%)',
      secondaryForeground: 'hsl(30 15% 80%)',
      muted: 'hsl(20 15% 16%)',
      mutedForeground: 'hsl(25 12% 48%)',
      accent: 'hsl(45 80% 50%)', // Golden leaf
      accentForeground: 'hsl(20 22% 8%)',
      border: 'hsl(20 15% 19%)',
      input: 'hsl(20 16% 13%)',
      ring: 'hsl(25 85% 55%)',
      link: 'hsl(25 80% 58%)',
      linkHover: 'hsl(45 80% 53%)',
    },
    syntaxTheme: 'monokai',
  },
  'lavender-mist': {
    name: 'Lavender Mist',
    colors: {
      background: 'hsl(265 22% 10%)', // Lavender night
      foreground: 'hsl(260 18% 90%)', // Soft lavender white
      card: 'hsl(265 20% 13%)',
      cardForeground: 'hsl(260 18% 90%)',
      primary: 'hsl(270 60% 65%)', // Lavender purple
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(265 17% 16%)',
      secondaryForeground: 'hsl(260 15% 82%)',
      muted: 'hsl(265 15% 18%)',
      mutedForeground: 'hsl(265 10% 50%)',
      accent: 'hsl(300 50% 65%)', // Soft magenta
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(265 15% 21%)',
      input: 'hsl(265 16% 15%)',
      ring: 'hsl(270 60% 65%)',
      link: 'hsl(270 55% 68%)',
      linkHover: 'hsl(300 50% 68%)',
    },
    syntaxTheme: 'rose-pine',
  },
  'midnight-forest': {
    name: 'Midnight Forest',
    colors: {
      background: 'hsl(150 25% 6%)', // Forest midnight
      foreground: 'hsl(140 18% 88%)', // Moonlit leaves
      card: 'hsl(150 23% 9%)',
      cardForeground: 'hsl(140 18% 88%)',
      primary: 'hsl(145 60% 50%)', // Forest green
      primaryForeground: 'hsl(150 25% 6%)',
      secondary: 'hsl(150 20% 12%)',
      secondaryForeground: 'hsl(140 15% 80%)',
      muted: 'hsl(150 18% 14%)',
      mutedForeground: 'hsl(145 12% 48%)',
      accent: 'hsl(55 70% 55%)', // Firefly yellow
      accentForeground: 'hsl(150 25% 6%)',
      border: 'hsl(150 18% 17%)',
      input: 'hsl(150 19% 11%)',
      ring: 'hsl(145 60% 50%)',
      link: 'hsl(145 55% 53%)',
      linkHover: 'hsl(55 70% 58%)',
    },
    syntaxTheme: 'dark-plus',
  },
  'wine-cellar': {
    name: 'Wine Cellar',
    colors: {
      background: 'hsl(345 25% 7%)', // Wine dark
      foreground: 'hsl(345 15% 88%)', // Aged white
      card: 'hsl(345 23% 10%)',
      cardForeground: 'hsl(345 15% 88%)',
      primary: 'hsl(350 65% 50%)', // Wine red
      primaryForeground: 'hsl(0 0% 100%)',
      secondary: 'hsl(345 20% 13%)',
      secondaryForeground: 'hsl(345 12% 80%)',
      muted: 'hsl(345 18% 15%)',
      mutedForeground: 'hsl(345 10% 48%)',
      accent: 'hsl(30 60% 50%)', // Oak barrel
      accentForeground: 'hsl(0 0% 100%)',
      border: 'hsl(345 18% 18%)',
      input: 'hsl(345 19% 12%)',
      ring: 'hsl(350 65% 50%)',
      link: 'hsl(350 60% 53%)',
      linkHover: 'hsl(30 60% 53%)',
    },
    syntaxTheme: 'dracula',
  },
} as const;

export type ThemeName = keyof typeof themes;

/**
 * Get a theme by name
 */
export function getTheme(name: ThemeName): Theme {
  return themes[name];
}

/**
 * Get all available theme names
 */
export function getThemeNames(): ThemeName[] {
  return Object.keys(themes) as ThemeName[];
}
