import { object_, oftype_, resolvers } from 'oftypes'

/**
 * Given Array|Object will give back an JSON.string
 *
 * @param {array|Object} body - given to be stringify
 * @param {((this:any, key: string, value: any) => any)|Array}[replacer] - JSON.stringify
 * @param {string|number}[space] - JSON.stringify
 * @returns {Promise<Object>}
 */
export default async function resew_json_obj( body, replacer, space ) {

  /**
   * Error Object.
   *
   * @type {{occurred: boolean, message: null|string}}
   */
  let error= { occurred:false, message:null }

  const falsy = async () => {
    if ( await oftype_( body ) === 'undefined' ) {
      error.occurred = true
      error.message = 'body argument must be provided'
    } else {
      error.occurred = true
      error.message = 'body argument must be oftype Object'
    }
  }
  const truthy = () => {
    if( Object.keys( body ).length === 0 ) {
      error.occurred = true
      error.message = 'body argument must NOT be empty'
    }
  }

  await ( await object_( body, await resolvers( truthy, falsy ) ) )()

  return new Promise( ( resolve, reject ) => {
    if( error.occurred )
      reject( error.message )

    resolve( JSON.stringify( body, replacer, space ) )
  } )
}
