#!/usr/bin/env node
import { exit } from '@cli-dang/activity'

process.on( 'message', async id => {
  process.send( id )
  await exit( id, undefined, 1, true, true )
} )
