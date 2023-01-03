import { default as Generator } from './functions/generator'
import { OftypesError } from 'oftypes'

export async function array_to_json( data:[never] ):Promise<string|OftypesError> {

  const generator = new Generator()
  let type:null|Error
  for await ( const check of generator.type_check( data, true ) ) {

    if( check instanceof Error ) {
      type = check
      break
    }
    type = <null> check
  }

  return new Promise( ( resolve, reject ) => {

    if( type instanceof Error )
      reject( type )

    const property_value:[] = []
    const even = 0

    for ( const key in data ) {

      if ( even + parseInt( key ) % 2 === 0 )
        property_value.push( <never> Array.of( data[ parseInt( key ) ], data[ parseInt( key ) + 1 ] ) )
    }

    resolve( JSON.stringify( Object.fromEntries( property_value ) ) )

  } )
}
