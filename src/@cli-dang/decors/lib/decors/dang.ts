import ansi from './ansi'
import escape from './escape'

export const Dang = {

  black( chars?:string ):string{
    return render.call( this, chars, 'black', 'foreground' )
  },

  b_black( chars?:string ):string{
    return render.call( this, chars, 'black', 'brightForeground' )
  },

  bg_black( chars?:string ):string{
    return render.call( this, chars, 'black', 'background' )
  },

  b_bg_black( chars?:string ):string{
    return render.call( this, chars, 'black', 'brightBackground' )
  },

  blue( chars?:string ):string{
    return render.call( this, chars, 'blue', 'foreground' )
  },

  b_blue( chars?:string ):string{
    return render.call( this, chars, 'blue', 'brightForeground' )
  },

  bg_blue( chars?:string ):string{
    return render.call( this, chars, 'blue', 'background' )
  },

  b_bg_blue( chars?:string ):string{
    return render.call( this, chars, 'blue', 'brightBackground' )
  },

  color( code?:number, chars?:string ){
    return render.call( this, chars, 'color', 'foreground', code, '256' )
  },

  bg_color( code?:number, chars?:string ){
    return render.call( this, chars, 'color', 'background', code, '256' )
  },

  cyan( chars?:string ):string{
    return render.call( this, chars, 'cyan', 'foreground' )
  },

  b_cyan( chars?:string ):string{
    return render.call( this, chars, 'cyan', 'brightForeground' )
  },

  bg_cyan( chars?:string ):string{
    return render.call( this, chars, 'cyan', 'background' )
  },

  b_bg_cyan( chars?:string ):string{
    return render.call( this, chars, 'cyan', 'brightBackground' )
  },

  green( chars?:string ):string{
    return render.call( this, chars, 'green', 'foreground' )
  },

  b_green( chars?:string ):string{
    return render.call( this, chars, 'green', 'brightForeground' )
  },

  bg_green( chars?:string ):string{
    return render.call( this, chars, 'green', 'background' )
  },

  b_bg_green( chars?:string ):string{
    return render.call( this, chars, 'green', 'brightBackground' )
  },

  magenta( chars?:string ):string{
    return render.call( this, chars, 'magenta', 'foreground' )
  },

  b_magenta( chars?:string ):string{
    return render.call( this, chars, 'magenta', 'brightForeground' )
  },

  bg_magenta( chars?:string ):string{
    return render.call( this, chars, 'magenta', 'background' )
  },

  b_bg_magenta( chars?:string ):string{
    return render.call( this, chars, 'magenta', 'brightBackground' )
  },

  negative( chars?:string ):string{
    return render.call( this, chars, 'negative', 'code' )
  },

  red( chars?:string ):string{
    return render.call( this, chars, 'red', 'foreground' )
  },

  b_red( chars?:string ):string{
    return render.call( this, chars, 'red', 'brightForeground' )
  },

  bg_red( chars?:string ):string{
    return render.call( this, chars, 'red', 'background' )
  },

  b_bg_red( chars?:string ):string{
    return render.call( this, chars, 'red', 'brightBackground' )
  },

  rgb( code?:RGB, chars?:string ){
    return render.call( this, chars, 'rgb', 'foreground', code, 'RGB' )
  },

  bg_rgb( code?:RGB, chars?:string ){
    return render.call( this, chars, 'rgb', 'background', code, 'RGB' )
  },

  strong( chars?:string ):string{
    return render.call( this, chars, 'strong', 'code' )
  },

  underline( chars?:string ):string{
    return render.call( this, chars, 'underline', 'code' )
  },

  white( chars?:string ):string{
    return render.call( this, chars, 'white', 'foreground' )
  },

  b_white( chars?:string ):string{
    return render.call( this, chars, 'white', 'brightForeground' )
  },

  bg_white( chars?:string ):string{
    return render.call( this, chars, 'white', 'background' )
  },

  b_bg_white( chars?:string ):string{
    return render.call( this, chars, 'white', 'brightBackground' )
  },

  yellow( chars?:string ):string{
    return render.call( this, chars, 'yellow', 'foreground' )
  },

  b_yellow( chars?:string ):string{
    return render.call( this, chars, 'yellow', 'brightForeground' )
  },

  bg_yellow( chars?:string ):string{
    return render.call( this, chars, 'yellow', 'background' )
  },

  b_bg_yellow( chars?:string ):string{
    return render.call( this, chars, 'yellow', 'brightBackground' )
  }
}

function render( chars:string, color:string, variant:string, code?: number|RGB, color_method?:string  ):string{

  let rendered_string:string = chars || ''
  if( this.constructor.name === 'String' )
    rendered_string = ! chars ? this : `${this}${chars}`

  let rgb:RGB = [ 0, 0, 0 ]
  let col256 = 0
  if( color_method === 'RGB' ) {
    if ( typeof code !== 'undefined' ) rgb = <RGB> code
    else code = <RGB> [ 0, 0, 0 ]
  }else if ( color_method === '256' ) {
    if ( typeof code !== 'undefined' ) col256 = <number> code
    else code = 0
  }


  let color_selection:string
  if( typeof code !== 'undefined' && code !== null ) {

    if ( code.constructor.name === 'Number' )
      color_selection = `${ ansi[ color ][ variant ] }${ col256 }m`
    else if ( code.constructor.name === 'Array' ) {
      const [ r, g, b ]: RGB = <RGB>rgb
      color_selection = `${ ansi[ color ][ variant ] }${ r };${ g };${ b }m`
    }
  } else
    color_selection = `${ansi[ color ][ variant ]}`

  return `${escape.sequence[ 0 ]}${color_selection}${ rendered_string }${escape.sequence[ 0 ]}0m`
}
