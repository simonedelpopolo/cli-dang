import ansi from './ansi.js'
import escape from './escape.js'

// eslint-disable-next-line capitalized-comments
// noinspection JSClosureCompilerSyntax
/**
 * Dang
 *
 * @type {{
 *   bg_rgb(number[]=, string=): string,
 *   bg_white(string): string,
 *   magenta(string=): string,
 *   strong(string=): string,
 *   color(number=, string=): string,
 *   b_cyan(string): string,
 *   bg_red(string): string,
 *   underline(string=): string,
 *   yellow(string=): string,
 *   b_bg_black(string): string,
 *   rgb(number[]=, string=): string,
 *   bg_black(string): string,
 *   cyan(string=): string,
 *   red(string=): string,
 *   b_bg_cyan(string): string,
 *   b_bg_magenta(string): string,
 *   bg_cyan(string): string,
 *   b_bg_green(string): string,
 *   negative(string=): string,
 *   white(string=): string,
 *   b_bg_yellow(string): string,
 *   bg_yellow(string): string,
 *   bg_blue(string): string,
 *   bg_green(string): string,
 *   b_bg_white(string): string,
 *   b_bg_red(string): string,
 *   green(string=): string,
 *   b_red(string): string,
 *   b_magenta(string): string,
 *   b_bg_blue(string): string,
 *   black(string=): string,
 *   b_yellow(string): string,
 *   b_white(string): string,
 *   bg_color(number=, string=): string,
 *   bg_magenta(string): string,
 *   b_black(string): string,
 *   blue(string=): string,
 *   b_blue(string): string,
 *   b_green(string): string
 *   }}
 */
const Dang = {

  /**
   * Object [ decors.Dang.black ]
   * Black foreground
   * Object Interface
   *
   * @param {string} [chars=''] - to be rendered
   * @returns {string}
   */
  black( chars ){
    return render.call( this, chars, 'black', 'foreground' )
  },

  /**
   * Object [ decors.Dang.b_black ]
   * Bright black foreground
   * Object Interface
   *
   * @param {string} chars - to be rendered
   * @returns {string}
   */
  b_black( chars ){
    return render.call( this, chars, 'black', 'brightForeground' )
  },

  /**
   * Object [ decors.Dang.bg_black ]
   * Black background
   * Object Interface
   *
   * @param {string} chars - to be rendered
   * @returns {string}
   */
  bg_black( chars ){
    return render.call( this, chars, 'black', 'background' )
  },

  /**
   * Object [ decors.Dang.b_bg_black ]
   * Black background
   * Object Interface
   *
   * @param {string} chars - to be rendered
   * @returns {string}
   */
  b_bg_black( chars ){
    return render.call( this, chars, 'black', 'brightBackground' )
  },

  /**
   * Object [ decors.Dang.blue ]
   * Blue foreground
   * Object Interface
   *
   * @param {string} [chars=''] - to be rendered
   * @returns {string}
   */
  blue( chars ){
    return render.call( this, chars, 'blue', 'foreground' )
  },

  /**
   * Object [ decors.Dang.b_blue ]
   * Bright blue foreground
   * Object Interface
   *
   * @param {string} chars - to be rendered
   * @returns {string}
   */
  b_blue( chars ){
    return render.call( this, chars, 'blue', 'brightForeground' )
  },

  /**
   * Object [ decors.Dang.bg_blue ]
   * Blue background
   * Object Interface
   *
   * @param {string} chars - to be rendered
   * @returns {string}
   */
  bg_blue( chars ){
    return render.call( this, chars, 'blue', 'background' )
  },

  /**
   * Object [ decors.Dang.b_bg_blue ]
   * Bright Blue background
   * Object Interface
   *
   * @param {string} chars - to be rendered
   * @returns {string}
   */
  b_bg_blue( chars ){
    return render.call( this, chars, 'blue', 'brightBackground' )
  },

  /**
   * Object [ decors.Dang.color ]
   * 256 Color foreground
   * String.prototype extended
   *
   * @param {number?} code - [0-255] range color
   * @param {string?} chars - to be rendered
   * @returns {string}
   */
  color( code, chars ){
    return render.call( this, chars, code, 'foreground' )
  },

  /**
   * Object [ decors.Dang.bg_color ]
   * 256 Color background
   * String.prototype extended
   *
   * @param {number?} code - [0-255] range color
   * @param {string?} chars - to be rendered
   * @returns {string}
   */
  bg_color( code, chars ){
    return render.call( this, chars, code, 'background' )
  },

  /**
   * Object [ decors.Dang.cyan ]
   * Cyan foreground
   * Object Interface
   *
   * @param {string} [chars=''] - to be rendered
   * @returns {string}
   */
  cyan( chars ){
    return render.call( this, chars, 'cyan', 'foreground' )
  },

  /**
   * Object [ decors.Dang.b_cyan ]
   * Bright cyan foreground
   * Object Interface
   *
   * @param {string} chars - to be rendered
   * @returns {string}
   */
  b_cyan( chars ){
    return render.call( this, chars, 'cyan', 'brightForeground' )
  },

  /**
   * Object [ decors.Dang.bg_cyan ]
   * Cyan background
   * Object Interface
   *
   * @param {string} chars - to be rendered
   * @returns {string}
   */
  bg_cyan( chars ){
    return render.call( this, chars, 'cyan', 'background' )
  },

  /**
   * Object [ decors.Dang.b_bg_cyan ]
   * Bright Cyan background
   * Object Interface
   *
   * @param {string} chars - to be rendered
   * @returns {string}
   */
  b_bg_cyan( chars ){
    return render.call( this, chars, 'cyan', 'brightBackground' )
  },

  /**
   * Object [ decors.Dang.green ]
   * Green foreground
   * Object Interface
   *
   * @param {string} [chars=''] - to be rendered
   * @returns {string}
   */
  green( chars ){
    return render.call( this, chars, 'green', 'foreground' )
  },

  /**
   * Object [ decors.Dang.b_green ]
   * Bright green foreground
   * Object Interface
   *
   * @param {string} chars - to be rendered
   * @returns {string}
   */
  b_green( chars ){
    return render.call( this, chars, 'green', 'brightForeground' )
  },

  /**
   * Object [ decors.Dang.bg_green ]
   * Green background
   * Object Interface
   *
   * @param {string} chars - to be rendered
   * @returns {string}
   */
  bg_green( chars ){
    return render.call( this, chars, 'green', 'background' )
  },

  /**
   * Object [ decors.Dang.b_bg_green ]
   * Bright Green background
   * Object Interface
   *
   * @param {string} chars - to be rendered
   * @returns {string}
   */
  b_bg_green( chars ){
    return render.call( this, chars, 'green', 'brightBackground' )
  },

  /**
   * Object [ decors.Dang.magenta ]
   * Magenta foreground
   * Object Interface
   *
   * @param {string} [chars=''] - to be rendered
   * @returns {string}
   */
  magenta( chars ){
    return render.call( this, chars, 'magenta', 'foreground' )
  },

  /**
   * Object [ decors.Dang.b_magenta ]
   * Bright magenta foreground
   * Object Interface
   *
   * @param {string} chars - to be rendered
   * @returns {string}
   */
  b_magenta( chars ){
    return render.call( this, chars, 'magenta', 'brightForeground' )
  },

  /**
   * Object [ decors.Dang.bg_magenta ]
   * Magenta background
   * Object Interface
   *
   * @param {string} chars - to be rendered
   * @returns {string}
   */
  bg_magenta( chars ){
    return render.call( this, chars, 'magenta', 'background' )
  },

  /**
   * Object [ decors.Dang.b_bg_magenta ]
   * Bright Magenta background
   * Object Interface
   *
   * @param {string} chars - to be rendered
   * @returns {string}
   */
  b_bg_magenta( chars ){
    return render.call( this, chars, 'magenta', 'brightBackground' )
  },

  /**
   * Object [ decors.Dang.negative ]
   * Reverse the colors
   * String.prototype extended
   *
   * @param {string?} chars - to be rendered
   * @returns {string}
   */
  negative( chars ){
    return render.call( this, chars, 'negative', 'code' )
  },

  /**
   * Object [ decors.Dang.red ]
   * Red foreground
   * Object Interface
   *
   * @param {string} [chars=''] - to be rendered
   * @returns {string}
   */
  red( chars ){
    return render.call( this, chars, 'red', 'foreground' )
  },

  /**
   * Object [ decors.Dang.b_red ]
   * Bright red foreground
   * Object Interface
   *
   * @param {string} chars - to be rendered
   * @returns {string}
   */
  b_red( chars ){
    return render.call( this, chars, 'red', 'brightForeground' )
  },

  /**
   * Object [ decors.Dang.bg_red ]
   * Red background
   * Object Interface
   *
   * @param {string} chars - to be rendered
   * @returns {string}
   */
  bg_red( chars ){
    return render.call( this, chars, 'red', 'background' )
  },

  /**
   * Object [ decors.Dang.b_bg_red ]
   * Bright Red background
   * Object Interface
   *
   * @param {string} chars - to be rendered
   * @returns {string}
   */
  b_bg_red( chars ){
    return render.call( this, chars, 'red', 'brightBackground' )
  },

  /**
   * Object [ decors.Dang.rgb ]
   * TRUE-COLOR RGB foreground
   * Object Interface
   *
   * @param {number[]?} code - [0-255 | 0-255 | 0-255] range rgb
   * @param {string?} chars - to be rendered
   * @returns {string}
   */
  rgb( code, chars ){
    return render.call( this, chars, code, 'foreground' )
  },

  /**
   * Object [ decors.Dang.bg_rgb ]
   * TRUE-COLOR RGB background
   * Object Interface
   *
   * @param {number[]?} code - [0-255 | 0-255 | 0-255] range rgb
   * @param {string?} chars - to be rendered
   * @returns {string}
   */
  bg_rgb( code, chars ){
    return render.call( this, chars, code, 'background' )
  },

  /**
   * Object [ decors.Dang.strong ]
   * Strong/Bold text
   * String.prototype extended
   *
   * @param {string?} chars - to be rendered
   * @returns {string}
   */
  strong( chars ){
    return render.call( this, chars, 'strong', 'code' )
  },

  /**
   * Object [ decors.Dang.underline ]
   * Underlined text
   * String.prototype extended
   *
   * @param {string?} chars - to be rendered
   * @returns {string}
   */
  underline( chars ){
    return render.call( this, chars, 'underline', 'code' )
  },

  /**
   * Object [ decors.Dang.white ]
   * White foreground
   * Object Interface
   *
   * @param {string} [chars=''] - to be rendered
   * @returns {string}
   */
  white( chars ){
    return render.call( this, chars, 'white', 'foreground' )
  },

  /**
   * Object [ decors.Dang.b_white ]
   * Bright white foreground
   * Object Interface
   *
   * @param {string} chars - to be rendered
   * @returns {string}
   */
  b_white( chars ){
    return render.call( this, chars, 'white', 'brightForeground' )
  },

  /**
   * Object [ decors.Dang.bg_white ]
   * White background
   * Object Interface
   *
   * @param {string} chars - to be rendered
   * @returns {string}
   */
  bg_white( chars ){
    return render.call( this, chars, 'white', 'background' )
  },

  /**
   * Object [ decors.Dang.b_bg_white ]
   * Bright White background
   * Object Interface
   *
   * @param {string} chars - to be rendered
   * @returns {string}
   */
  b_bg_white( chars ){
    return render.call( this, chars, 'white', 'brightBackground' )
  },

  /**
   * Object [ decors.Dang.yellow ]
   * Yellow foreground
   * Object Interface
   *
   * @param {string} [chars=''] - to be rendered
   * @returns {string}
   */
  yellow( chars ){
    return render.call( this, chars, 'yellow', 'foreground' )
  },

  /**
   * Object [ decors.Dang.b_yellow ]
   * Bright yellow foreground
   * Object Interface
   *
   * @param {string} chars - to be rendered
   * @returns {string}
   */
  b_yellow( chars ){
    return render.call( this, chars, 'yellow', 'brightForeground' )
  },

  /**
   * Object [ decors.Dang.bg_yellow ]
   * Yellow background
   * Object Interface
   *
   * @param {string} chars - to be rendered
   * @returns {string}
   */
  bg_yellow( chars ){
    return render.call( this, chars, 'yellow', 'background' )
  },

  /**
   * Object [ decors.Dang.b_bg_yellow ]
   * Bright Yellow background
   * Object Interface
   *
   * @param {string} chars - to be rendered
   * @returns {string}
   */
  b_bg_yellow( chars ){
    return render.call( this, chars, 'yellow', 'brightBackground' )
  }
}

/**
 * Shared function to resolve the color, variant and text.
 * Extended String.prototype && TypeArray.prototype
 * And Object Interface
 *
 * @param {string} [chars=''] - to be rendered
 * @param {string|number} color - to be rendered
 * @param {string} variant - to be rendered
 * @returns {string}
 */
function render( chars, color, variant ){

  let rendered_string = chars || ''
  if( this.constructor.name === 'String' )
    rendered_string = ! chars ? this : `${this}${chars}`

  let color_selection
  if( color.constructor.name === 'Number' )
    color_selection = `${ansi.color[ variant ]}${ color}m`
  else if ( color.constructor.name === 'Array' ) {
    const [ r, g, b ] = color
    color_selection = `${ansi.color[ variant ]}${r};${g};${b}m`
  }
  else
    color_selection = `${ansi[ color ][ variant ]}`

  return `${escape.sequence[ 0 ]}${color_selection}${ rendered_string }${escape.sequence[ 0 ]}0m`
}

export default Dang
