import { default as Generator } from './functions/generator'
import { OftypesError } from 'oftypes'

export async function json_parse( data: string | Buffer ):Promise<object | OftypesError>{

  const generator = new Generator()
  let type:null|Error
  for await ( const check of generator.type_check( data ) ) {

    if( check instanceof Error ) {
      type = check
      break
    }

    type = <null> null
  }

  return new Promise( ( resolve, reject ) => {

    if( type instanceof Error )
      reject( type )

    else{
      let object:object|null

      try {
        object = JSON.parse( Buffer.isBuffer( data ) ? data.toString() : data )
      }
      catch ( error ) {
        reject( new OftypesError( error.message ) )
      }
      resolve( object )
    }

  } )
}
