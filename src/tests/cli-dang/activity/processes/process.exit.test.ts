#!/usr/bin/env node
import { exit } from '@cli-dang/activity'

process.on( 'message', async id => {
  process.send( id )
  await exit( <string> id, undefined, 4, true, false )
} )
