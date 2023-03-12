import { Dang } from '@cli-dang/decors'
import { dirname, resolve } from 'node:path'
import { exit } from '@cli-dang/activity'
import { fileURLToPath } from 'url'
import { multi, root } from '../input/chmodx'
import { spawn } from 'node:child_process'

export async function watch(): Promise<void>{

  const root_path = root.values().next()?.value ?? undefined
  const path = `${process.cwd()}/${root_path ?  root_path + '/' : ''}`
  const packageJSON = await ( await import( `${path}package.json`, { assert: { type: 'json' } } ) ).default

  if( !packageJSON.bin )
    await exit( `  \n  ♠ this package, '${Dang.magenta( packageJSON.name )}', doesn't seem to have a bin property\n  please insert an entry` )

  const watcher_exec = resolve( dirname( fileURLToPath( import.meta.url ) ) + '../../../bin/watcher.js' )

  if( multi.size > 0 ){
    for( const filename of multi ){
      const watcher = spawn( watcher_exec, { stdio: [  'inherit', 'inherit', 'inherit', 'ipc' ], } )
      watcher.on( 'error', err => console.log( err ) )
      watcher.send( [ resolve( `${path}${filename}` ),  filename ] )
      process.on( 'message', message => console.log( message ) )
    }
  }
  const watcher = spawn( watcher_exec, { stdio: [  'inherit', 'inherit', 'inherit', 'ipc' ], } )
  watcher.on( 'error', err => console.log( err ) )
  watcher.send( [ `${path}${packageJSON.bin[ Object.keys( packageJSON.bin )[ 0 ] ]}`,  Object.keys( packageJSON.bin )[ 0 ] ] )
  process.on( 'message', message => console.log( message ) )

}