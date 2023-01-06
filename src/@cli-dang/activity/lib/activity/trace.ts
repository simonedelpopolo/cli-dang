import { default as Generator } from './functions/generator'
import { inspect } from 'util'
import { OftypesError } from 'oftypes'
import { TraceOptions } from './types'

export const trace_options: TraceOptions = {
  mute: false,
  colors: true,
  depth: Infinity,
  showHidden: true
}

export async function trace ( ...data:[unknown]  ):Promise<null|string|OftypesError>{

  const generator = new Generator()
  let inspected: string|null = null

  let type:unknown
  for await ( const check of generator.boolean( trace_options.mute, 'trace' ) )
    type = check

  if( ! trace_options.mute )
    console.trace( data )
  else
    inspected = inspect( data[ 0 ], trace_options )

  return new Promise( ( resolve, reject ) => {

    if( type instanceof Error ) reject( type )
    resolve( inspected )
  } )
}
