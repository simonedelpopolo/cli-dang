#!/usr/bin/env node --no-warnings
import { Dang } from '@cli-dang/decors'
import { spawn } from 'node:child_process'
import { watch } from 'node:fs/promises'

process.title = 'chmodx:watch'

process.on( 'message', async data => {

  const watcher = watch( data[ 0 ], { persistent: true } )
  console.log( `watching -> ${Dang.magenta( data[ 1 ] )}` )
  for await ( const event of watcher ) {

    for ( const[ eventType ] of Object.entries( event ) ) {

      switch ( event[ eventType ] ) {
        case 'change': {

          const chmod = spawn( 'chmod', [ 'u+x', data[ 0 ], ] )

          chmod.stderr.on( 'data', console.log )
          chmod.on( 'exit', code => {
            code === 0 ? console.log( `${Dang.magenta( data[ 1 ] )} u+x added -> ${Dang.b_green( data[ 0 ] )}` ) : console.log( `chmodx failed code -> ${ code }` )
          } )
        }
          break

        default: {/*empty*/}
      }
    }
  }
} )