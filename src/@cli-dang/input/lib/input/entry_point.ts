import { processor } from './processor'

export async function entry_point( argv:string[], logic:LogicParameter ):Promise<void>{

  const parsedArgv:ParsedArgv = await processor( argv ).catch( error => error )
  if( parsedArgv instanceof Error )
    return Promise.reject( parsedArgv )

  await logic( parsedArgv )
}

