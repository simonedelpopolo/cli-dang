import { array_, function_, number_, object_, string_, undefined_ } from 'oftypes'

/**
 * Function type check for Object [ boolean.map ] arguments.
 *
 * @param {any} logic - argument
 * @param {any} against - argument
 * @returns {Promise<string|boolean>}
 */
export async function map_types( logic, against ){
  let undef
  if ( await undefined_( logic ) === true || await undefined_( against ) === true )
    undef = false

  // Check if logic parameter is an Array because typeof Array are objects
  let logicArray
  if ( await array_( logic ) === true )
    logicArray = false

  // Check if logic parameter is a Function
  let logicFunction
  if ( await function_( logic ) === true )
    logicFunction = false

  // Last check logic parameter is everything else but Object
  let logicObject
  if ( await object_( logic ) === false )
    logicObject = false

  // Check if against parameter is an Array because typeof Array are objects
  let againstArray
  if ( await array_( against ) === true )
    againstArray = false


  // Check if against parameter is a Function
  let againstFunction
  if ( await function_( against ) === true )
    againstFunction = false

  // Check if against parameter is different from type string
  let againstStringNumber
  if ( number_( against ) === false && string_( against ) === false )
    againstStringNumber = false

  return new Promise( ( resolve, reject ) => {

    if( undef === false )
      reject(  ` both parameters \`logic\` && \`against\` cannot be undefined given parameter: \`logic\`->[ ${ logic } ], \`against\`->[ ${ against } ]` )

    if( logicArray === false )
      reject( 'this method accept only object for parameter `logic`. Given type: Array' )

    if( logicFunction === false )
      reject( 'this method accept only object for parameter `logic`. Given type: Function' )

    if( logicObject === false )
      reject( `this method accept only object for parameter \`logic\`. Given type: ${ typeof logic }` )

    if( againstArray === false )
      reject( 'this method accept only string or number for parameter `against`. Given type: Array' )

    if( againstFunction === false )
      reject( 'this method accept only string and number for parameter `against`. Given type: Function' )

    if( againstStringNumber === false )
      reject( `this method accept only string and number for parameter \`against\`. Given type: ${ typeof against }` )

    resolve( true )
  } )
}
