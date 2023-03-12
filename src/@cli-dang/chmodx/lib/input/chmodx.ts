import { Command } from '@cli-dang/input'
import { watch } from '@cli-dang/chmodx'

export const root:Set<string> = new Set()
export const multi:Set<string> = new Set()

async function watch_cb<cb> ( data:ParsedArgv ):Promise<void>{

  if( data.flag?.[ '--multi' ] ){
    const multi_data = data.flag?.[ '--multi' ].split( ',' )
    for( const filename of multi_data )
      multi.add( filename )
  }

  if( data.flag?.[ '--root' ] )
    root.add( data.flag[ '--root' ] )

  await watch()
}

export default async function chmodx( parsed: ParsedArgv ){

  const chmodx = new Command()

  chmodx.define( '--watch', watch_cb as CommandCallBack )
  await chmodx.flag( [ '--multi' ], {
    short: '--multi',
    type: 'string',
    void: false,
    check: true
  } )

  await chmodx.flag( [ '--root' ], {
    short: '--root',
    type: 'string',
    void: false,
    check: true
  } )

  await chmodx.intercept( parsed )
}