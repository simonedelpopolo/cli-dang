import { default as Generator } from './functions/generator'
import { OftypesError } from 'oftypes'

export async function is_json( data: string | Buffer, catch_error = false ):Promise<boolean | OftypesError>{

  const generator = new Generator()
  let type:null|Error
  for await ( const check of generator.type_check( data, false,  catch_error ) ) {

    if( check instanceof Error ) {
      type = check
      break
    }
    type = <null> check
  }

  return new Promise( ( resolve, reject ) => {

    if( type instanceof Error )
      reject( type )

    const buffer_or_string:string = Buffer.isBuffer( data ) ? data.toString() : data
    let error_message:string|undefined = undefined

    try {
      JSON.parse( buffer_or_string )
    }
    catch ( error ) {
      error_message = error.message
    }

    typeof error_message !== 'undefined'
      ? catch_error
        ? reject( new OftypesError( error_message ) )
        : reject( false )
      :resolve ( true )

  } )
}
