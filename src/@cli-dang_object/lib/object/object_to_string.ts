import { default as Generator } from './functions/generator'
import { OftypesError } from 'oftypes'

export async function object_to_string( data:object, needle:Buffer|string = ':' ):Promise<string | OftypesError>{

  const generator = new Generator()
  let type:null|Error
  for await ( const check of generator.type_check( data, false, undefined, needle ) ) {

    if( check instanceof Error ) {
      type = check
      break
    }
    type = <null> check
  }

  return new Promise( ( resolve, reject ) => {
    if( type instanceof Error )
      reject( type )

    let string = ''

    const needle_buffer_or_string:string = Buffer.isBuffer( needle ) ? needle.toString() : needle

    for ( const [ property, value ] of Object.entries( data ) )
      string += `${ property }${ needle_buffer_or_string }${ value }${ needle_buffer_or_string }`

    resolve( string )

  } )
}
