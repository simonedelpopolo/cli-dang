import { LogicParameter } from './types'
import { OftypesError } from 'oftypes'
import { process_title } from './process_title'
import { processor } from './processor'

export async function entry_point( argv:string[], logic:LogicParameter ):Promise<object|OftypesError>{

  return Promise.resolve( process_title( await processor( argv ).catch( error => error ), logic ).catch( error => error ) )
}

