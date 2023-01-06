import { default as Generator } from './functions/generator'
import { OftypesError } from 'oftypes'

export async function object_to_json( data: object, replacer?: ( this:unknown, key: string, value: unknown ) => string, space?: string | number ):Promise<string | OftypesError>{

  const generator = new Generator()
  let type:null|Error
  for await ( const check of generator.type_check( data ) ) {

    if( check instanceof Error ) {
      type = check
      break
    }
    type = <null> check
  }

  return new Promise( ( resolve, reject ) => {
    if( type instanceof Error )
      reject( type )

    resolve( JSON.stringify( data, replacer, space ) )
  } )
}
