#!/usr/bin/env node --experimental-json-modules --experimental-import-meta-resolve --trace-warnings --no-warnings
import { dang_process } from './lib/input/dang_process'
import { entry_point } from '@cli-dang/input'

process.argv.splice( 0, 2 )

process.title = 'dang'

await entry_point( process.argv, dang_process )
