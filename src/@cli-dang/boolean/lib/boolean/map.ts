import { default as Generator } from './functions/generator'
import { number_, oftype_, OftypesError } from 'oftypes'

export async function map( logic:{[logic:string]: boolean}, against:string ): Promise<boolean|OftypesError>{

  const generator = new Generator()
  let type:null|Error
  for await ( const check of generator.type_check( logic, against ) ) {

    if( check instanceof Error ) {
      type = check
      break
    }
    type = <null> check
  }

  if( type === null ){
    for ( const [ key ] of Object.entries( logic ) ) {
      if ( await oftype_( logic [ key ] ) !== 'Boolean' || await number_( key, undefined, undefined, true ) ) {
        type = new OftypesError( `NOT <boolean> value OR <number> property name not accepeted. \n-> given \`logic\`: ${ JSON.stringify( logic ) }` )
        break
      }
    }
  }

  return new Promise( ( resolve, reject ) => {

    if( type instanceof Error )
      reject( type )

    let matched_logic = false
    for ( const [ key ] of Object.entries( logic ) ) {
      if ( key === against ) {
        resolve( logic[ key ] )
        matched_logic = true
      }
    }

    if( ! matched_logic )
      reject( new OftypesError ( `your \`against\` value haven't matched any of your \`logic\` object. given \`against\`: ${ against }` ) )
  } )
}
