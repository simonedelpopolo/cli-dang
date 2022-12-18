import { object_, resolvers } from 'oftypes'

/**
 * Given object|array it will give back string
 *
 * @param {object} body - given to be resewed into a string
 * @param {string} [needle=':'] - to resew the body
 * @returns {Promise<string>}
 */
export default async function resew_prop_val( body, needle = '|' ){

  /**
   * Error Object.
   *
   * @type {{occurred: boolean, message: null|string}}
   */
  let error= { occurred:false, message:null }

  const falsy = () => {
    error.occurred = true
    error.message = 'body argument must be provided'
  }
  const truthy = () => {
    if( ! ( Object.keys( body ).length > 0 ) ) {
      error.occurred = true
      error.message = 'body argument must NOT be empty'
    }
    else
      return true
  }

  await( await object_( body, await resolvers( truthy, falsy ) ) )()

  return new Promise( ( resolve, reject ) => {

    if( error.occurred ) reject( error.message )

    resolve( ( () => {
      let resewed = ''
      for ( const prop in body )
        resewed += `${ prop }:${ body[ prop ] }${needle}`

      return resewed.slice( 0, -1 )
    } )() )

  } )
}
