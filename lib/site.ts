import type { ThemeName } from "./themes";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://zhravan.dev";
export const SITE_TITLE = "zhravan";
export const SITE_DESCRIPTION =
  "tinkerer, polymathic indie computer scientist, systems engineer, data-science aficionado, i write at times.";

/**
 * Theme Configuration
 *
 * Change ACTIVE_THEME to any of these 90 available themes:
 *
 * DARK THEMES (52):
 * - 'vitesse-dark'      - VS Code Vitesse theme
 * - 'github-dark'       - GitHub's dark theme
 * - 'dracula'           - Popular Dracula theme
 * - 'monokai'           - Classic Monokai
 * - 'nord'              - Nord color palette
 * - 'one-dark-pro'      - Atom One Dark Pro
 * - 'tokyo-night'       - Tokyo Night theme
 * - 'catppuccin-mocha'  - Catppuccin Mocha variant
 * - 'solarized-dark'    - Solarized dark
 * - 'material-theme'    - Material Design theme
 * - 'night-owl'         - Night Owl theme
 * - 'palenight'         - Palenight theme
 * - 'ayu-dark'          - Ayu dark theme
 * - 'ayu-mirage'        - Ayu mirage variant
 * - 'gruvbox-dark'      - Gruvbox dark
 * - 'cobalt2'           - Cobalt2 theme
 * - 'synthwave-84'      - Synthwave 84
 * - 'shades-of-purple'  - Shades of Purple
 * - 'moonlight'         - Moonlight theme
 * - 'andromeda'         - Andromeda theme
 * - 'panda'             - Panda theme
 * - 'laserwave'         - Laserwave theme
 * - 'horizon'           - Horizon theme
 * - 'winter-is-coming-dark' - Winter is Coming Dark
 * - 'winter-is-coming-blue' - Winter is Coming Blue
 * - 'oceanic-next'      - Oceanic Next
 * - 'monokai-pro'       - Monokai Pro
 * - 'min-dark'          - Minimalist dark
 * - 'eva-dark'          - Eva Dark
 * - 'halcyon'           - Halcyon theme
 * - 'radical'           - Radical theme
 * - 'rose-pine'         - Rosé Pine
 * - 'rose-pine-moon'    - Rosé Pine Moon
 * - 'kanagawa'          - Kanagawa theme
 * - 'everforest-dark'   - Everforest Dark
 * - 'bearded-arc'       - Bearded Arc
 * - 'bearded-theme'     - Bearded Theme
 * - 'material-ocean'    - Material Ocean
 * - 'darcula'           - JetBrains Darcula
 * - 'rebecca'           - Rebecca theme
 * - 'spacegray'         - Spacegray theme
 * - 'palefire'          - Palefire theme
 * - 'noctis'            - Noctis theme
 * - 'deep-ocean'        - Deep Ocean
 * - 'midnight-ink'      - Deep navy with electric cyan
 * - 'neon-tokyo'        - Cyberpunk purple with hot pink
 * - 'forest-whisper'    - Deep forest green with golden amber
 * - 'arctic-aurora'     - Ice blue with aurora colors
 * - 'obsidian-flame'    - Pure black with burning orange
 * - 'ocean-depths'      - Deep ocean blue with aqua
 * - 'electric-violet'   - Deep purple with electric violet
 *
 * LIGHT THEMES (38):
 *
 * CLASSIC (12):
 * - 'atom-one-light'    - Atom One Light
 * - 'cream-light'       - Cream theme
 * - 'github-light'      - GitHub's light theme
 * - 'light-plus'        - VS Code Light+
 * - 'quiet-light'       - Quiet Light
 * - 'solarized-light'   - Solarized light
 * - 'ayu-light'         - Ayu light theme
 * - 'min-light'         - Minimalist light
 * - 'eva-light'         - Eva Light
 * - 'rose-pine-dawn'    - Rosé Pine Dawn
 * - 'everforest-light'  - Everforest Light
 * - 'material-lighter'  - Material Lighter
 *
 * AESTHETIC (6):
 * - 'sketchbook-cream'  - Warm cream paper with pencil tones
 * - 'sakura-blossom'    - Soft pink with jade green
 * - 'desert-sunset'     - Warm sand with burnt orange
 * - 'lavender-dream'    - Soft lavender with magenta
 * - 'vintage-sepia'     - Old paper with sepia tones
 * - 'mint-breeze'       - Pale mint with sky blue
 *
 * CRAZY VIBRANT (10):
 * - 'bubblegum-pop'          - Hot pink bubblegum explosion
 * - 'lemon-lime'             - Nuclear lemon meets electric lime
 * - 'cyber-candy'            - Neon cyan and hot magenta
 * - 'tangerine-dream'        - Vibrant orange sorbet
 * - 'holographic-pearl'      - Iridescent purple shimmer
 * - 'radioactive-lime'       - Toxic neon lime warning
 * - 'sunset-sorbet'          - Peach raspberry swirl
 * - 'cosmic-cotton-candy'    - Space pink and nebula blue
 * - 'electric-banana'        - Banana yellow meets purple
 * - 'strawberry-milkshake'   - Creamy strawberry delight
 *
 * IMMERSIVE & CAPTIVATING (13):
 * - 'aurora-borealis'        - Icy white with dancing green & purple auroras
 * - 'tropical-paradise'      - Turquoise waters meets warm tropical vibes
 * - 'velvet-luxury'          - Soft rose with luxurious magenta & royal purple
 * - 'peachy-keen'            - Soft peach with juicy blush tones
 * - 'oceanic-breeze'         - Ocean mist with sea foam freshness
 * - 'golden-hour'            - Warm golden glow of perfect sunset
 * - 'cherry-blossom-night'   - Pale pink petals under purple twilight
 * - 'lime-zest'              - Bright lime with lemon burst energy
 * - 'midnight-garden'        - Pale jade with midnight blooms
 * - 'coral-reef'             - Living coral with turquoise depths
 * - 'mystic-twilight'        - Mystical lavender meets twilight cyan
 * - 'honey-glow'             - Golden honey cream with warm amber
 * - 'tropical-paradise'      - Turquoise white with tropical energy
 */
export const ACTIVE_THEME: ThemeName = "noctis";
