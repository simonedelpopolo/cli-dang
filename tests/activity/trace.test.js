import * as tttt from 'trythistrythat'
import { trace } from '@cli-dang/activity'

/**
 * Module filename - trace.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

  tttt.end( id, true, 'trace function test', trace( true, 'output has been muted', { object:'somewhat' }, new SyntaxError( 'trace this' ) ) )
}
