import { default as Generator } from './functions/generator'
import { OftypesError } from 'oftypes'

export async function true_false( string:string ):Promise<boolean|OftypesError>{

  const generator = new Generator()
  let type:null|Error
  for await ( const check of await generator.true_false_types( string ) ) {

    if( check instanceof Error ) {
      type = check
      break
    }
    type = <null> check
  }

  return new Promise( ( resolve, reject ) => {
    if ( type instanceof Error )
      reject( type )

    resolve( string === 'false' ? false : !!string )
  } )
}
