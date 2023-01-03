import { LogicParameter, ParsedArgv } from './types'
import { oftype_, OftypesError } from 'oftypes'

export async function process_title( parsed_argv: ParsedArgv, logic:LogicParameter ):Promise<object>{

  let execution:object|OftypesError|undefined = undefined
  execution = await logic( parsed_argv )

  if( await oftype_( execution ) === 'undefined' )
    execution = new OftypesError( `♠ execution of logic Function failed: given logic ⇩ \n${logic.toLocaleString()}` )

  return new Promise( ( resolve, reject ) => {

    if( execution instanceof Error )
      reject( execution )

    resolve( execution )
  } )

}
