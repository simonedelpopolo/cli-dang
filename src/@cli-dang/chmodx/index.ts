#!/usr/bin/env node --no-warnings
import chmodx from './lib/input/chmodx'
import { entry_point } from '@cli-dang/input'
import { watch } from './lib/chmodx/watch'

export { watch } from './lib/chmodx/watch'

process.argv.splice( 0, 2 )
process.title = 'dang-chmodx'

await entry_point( process.argv, chmodx )