import Dang from './dang.js'

/**
 * Extends String.prototype with a given prefix.
 * - Do Not pass argument prefix to Extend the String.prototype without a prefix ⚠ not good practice anyway :)
 *
 * @example
 * import { override, sym } from @cli-dang/decors'
 *
 * // override
 * await override()
 * console.log('my string'.red())
 *
 * // prefixed
 * await override('prefix_')
 * console.log('my string'.prefix_red())
 *
 * // Symbolized
 * await override(undefined,true)
 * console.log('my_string'[sym('red')]())
 * @param {string?} prefix - for the String.prototype[function]
 * @param {boolean?} symbol - Extend String.prototype using Symbol.for
 */
export default function override( prefix, symbol ){

  if( ! prefix )
    prefix = ''

  if( ! symbol )
    symbol = false

  for ( const func in  Dang ) {

    if ( symbol ) String.prototype[ Symbol.for ( `${ prefix }${ Dang[ func ].name }` ) ] = Dang[ func ]
    else String.prototype[ `${ prefix }${ Dang[ func ].name }` ] = Dang[ func ]

  }
}
