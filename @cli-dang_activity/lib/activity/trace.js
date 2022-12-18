import { inspect } from 'util'

/**
 * Object [ activity.trace ]
 * Trace something, prints values, Object or simply whatever.
 * Mute the output to get a string from node:until:inspect with options:
 * - [depth=Infinity][showHidden=true][colors:true]
 *
 *
 * @param {string|boolean=} [mute=false] - mute the standard output and return an Object representing the console.trace output
 * @param {...*} data - to be printed with console.trace
 * @returns {string|null}
 */
export default function trace ( mute = false, ...data  ) {

  const mute_to_message = []

  if( mute.constructor.name !== 'Boolean' ) {
    mute_to_message[ 0 ] = mute
    mute_to_message.push( ...data )
    mute = false
  }
  if( ! mute ) {
    if ( mute_to_message.length > 0 )
      console.trace( ...mute_to_message )
    else console.trace( ...data )
  } else

    return inspect( data, { colors: true, depth: Infinity, showHidden: true } )

  return null

}
