export declare type RGB = [
  r: number,
  g: number,
  b: number,
]

export declare type ANSI = {
  black: {
    foreground: string,
    brightForeground: string,
    background: string,
    brightBackground: string
  },
  blue: {
    foreground: string,
    brightForeground: string,
    background: string,
    brightBackground: string
  },
  color: {
    foreground: string,
    background: string
  },
  cyan: {
    foreground: string,
    brightForeground: string,
    background: string,
    brightBackground: string
  },
  green: {
    foreground: string,
    brightForeground: string,
    background: string,
    brightBackground: string
  },
  magenta: {
    foreground: string,
    brightForeground: string,
    background: string,
    brightBackground: string
  },
  negative: {
    code: string
  },
  red: {
    foreground: string
    brightForeground: string,
    background: string,
    brightBackground: string
  },
  rgb: {
    foreground: string,
    background: string
  },
  strong: {
    code: string
  },
  underline: {
    code: string
  },
  white: {
    foreground: string,
    brightForeground: string,
    background: string,
    brightBackground: string
  },
  yellow: {
    foreground: string,
    brightForeground: string,
    background: string,
    brightBackground: string
  }
}
