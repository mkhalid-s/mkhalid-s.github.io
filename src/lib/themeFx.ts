// Theme-switch transition effects, selectable via ?fx=NAME (persists to
// localStorage). With no ?fx= override, a random one is used on each toggle
// (so different visitors / interactions see different effects).
export const THEME_FX = [
  'crossfade', // calm full-page dissolve
  'circle', // hard circular reveal from the toggle
  'feather', // soft-edged circular reveal from the toggle
  'iris', // new theme zooms up from centre
  'diagonal', // angled wipe across the screen
  'up', // wipe bottom → top
  'down', // wipe top → bottom
  'right', // wipe left → right
  'split', // opens from the centre line outward
  'blinds', // venetian-blind bars sweep open
] as const

export type ThemeFx = (typeof THEME_FX)[number]

export const randomFx = (): ThemeFx => THEME_FX[(Math.random() * THEME_FX.length) | 0]
