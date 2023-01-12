const ansi:ANSI = {
  black: {
    foreground: '30m',
    brightForeground: '30;1m',
    background: '40m',
    brightBackground: '40;1m'
  },
  blue: {
    foreground: '34m',
    brightForeground: '34;1m',
    background: '44m',
    brightBackground: '44;1m'
  },
  color: {
    foreground: '38;5;',
    background: '48;5;'
  },
  cyan: {
    foreground: '36m',
    brightForeground: '36;1m',
    background: '46m',
    brightBackground: '46;1m'
  },
  green: {
    foreground: '32m',
    brightForeground: '32;1m',
    background: '42m',
    brightBackground: '42;1m'
  },
  magenta: {
    foreground: '35m',
    brightForeground: '35;1m',
    background: '45m',
    brightBackground: '45;1m'
  },
  negative: { code: '7m' },
  red: {
    foreground: '31m',
    brightForeground: '31;1m',
    background: '41m',
    brightBackground: '41;1m'
  },
  rgb: {
    foreground: '38;2;',
    background: '48;2;'
  },
  strong: { code: '1m' },
  underline: { code: '4m' },
  white: {
    foreground: '37m',
    brightForeground: '37;1m',
    background: '47m',
    brightBackground: '47;1m'
  },
  yellow: {
    foreground: '33m',
    brightForeground: '33;1m',
    background: '43m',
    brightBackground: '43;1m'
  }
}

export default ansi
