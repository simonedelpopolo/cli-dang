#!/usr/bin/env node

import { Command } from '@cli-dang/input'
const result = new Command()
result.define( 'name', undefined )
await result.flag( 'get', { short:'get', description:'get it', usage: '#boom boom' } )
await result.intercept( { object: { name:undefined, get:'this' }, keys: [ 'name', 'get' ], help:{ command:'name', flag:'get' } } )