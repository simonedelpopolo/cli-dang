import { resolvers, string_ } from 'oftypes'

/**
 * Given JSON string|ArrayBuffer will give back an Object
 *
 * @param {string} body - given to be serialized to Object
 * @param {((this:any, key: string, value: any) => any) | undefined} [reviver] - JSON.parse
 * @returns {Promise<Object>}
 */
export default async function dissect_json_obj( body, reviver ) {

  let obj

  /**
   * Error Object.
   *
   * @type {{occurred: boolean, message: null|string}}
   */
  let error= { occurred:false, message:null }
  const json_parser = () => {
    try {
      obj = JSON.parse( body, reviver )
    }
    catch ( json_parse_error ) {
      error = { occurred:true, message:json_parse_error.message }
    }
  }

  const falsy = () => {
    error = { occurred:true, message:'body argument must be provided' }
  }

  const truthy = () => body.length > 0
    ? json_parser()
    : ( () => {
      error = { occurred:true, message:'body argument must NOT be empty' }
    } )()

  await( await string_( body, await resolvers( truthy, falsy ) ) )()

  return new Promise( ( resolve, reject ) => {

    if( error.occurred ) reject( error.message )

    else resolve( obj )

  } )
}
