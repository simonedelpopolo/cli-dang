import { OftypesError, resolvers, string_ } from 'oftypes'

/**
 * Given string it will give back an JSON string object
 * where, the first entry of the array will be the property name of the object
 * and the second entry of the array will be the value of the property.
 * !The given string must be formatted as multiple of two ['pro:val']
 *
 * @param {string} body - given to be sectioned into an array and then serialized to JSON.string or Object
 * @param {string} [scalpel=':'] - to dissect the body
 * @param {boolean} [serialize=false] - If set to true it will give back an Object
 * @returns {Promise<string|{[unknown:string]: string}>}
 */
export default async function dissect_prop_val( body, scalpel = ':', serialize = false ) {

  /**
   * Error Object.
   *
   * @type {{occurred: boolean, message: null|string}}
   */
  let error= { occurred:false, message:null }
  const falsy = () => {
    error = { occurred:true, message:'body argument must be provided' }
  }
  const truthy = () => body.length > 0 ? true : ( () => {
    error = { occurred:true, message:'body argument must NOT be empty' }
  } )()

  await( await string_( body, await resolvers( truthy, falsy ) ) )()

  return new Promise( ( resolve, reject ) => {

    if( error.occurred ) reject( error[ Symbol.for( 'zDissectionError' ) ].message )

    const option_value_reg_expression = new RegExp( `(.*)[${scalpel}](.*)`, 'g' )
    const body_array_expression = Array.from( body.matchAll( option_value_reg_expression ), body_value_matches => body_value_matches[ 0 ] )

    const single_prop_val = () => {
      if( body.search( ':' ) !== -1 ) return ( dissect( true ) )()
      else return null
    }

    const dissect = ( single = false ) => {
      let body_array = body.split( ':' )
      if( !single )
        body_array = body_array_expression[ 0 ].replaceAll( scalpel, ':' ).split( ':' )

      return body_array.length % 2 !== 0
        ? reject( new OftypesError( 'this method accept only Array that have at least two entries or multiple of 2' ) )
        : () => {
          const even = 0
          let prop_val = []
          for ( const key in body_array ) {

            if ( even + parseInt( key ) % 2 === 0 )
              prop_val.push( Array.of( body_array[ parseInt( key ) ], body_array[ parseInt( key ) + 1 ] ) )
          }

          const dissected = Object.fromEntries( prop_val )

          return serialize === false ? JSON.stringify( dissected ) : dissected

        }
    }

    resolve( body_array_expression.length > 0 ? ( dissect() )() : single_prop_val() )

  } )
}
