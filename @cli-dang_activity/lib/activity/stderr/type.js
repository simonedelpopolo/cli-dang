import { Dang } from '@cli-dang/decors'
import { oftype_, OftypesError } from 'oftypes'

/**
 * [ activity.stderr.type ]
 *
 * @param {any} message - to check type for.
 * @yields
 * @returns {AsyncGenerator<null|OftypesError, Promise<null>, void>}
 */
export async function* stderr_argument_type_check( message ){
  yield await oftype_( message ) === 'Buffer' ||
          await oftype_( message ) === 'Uint8Array'||
          await oftype_( message ) === 'String'
    ? null
    : OftypesError( Dang.b_red( `♠ activity.stderr.type - error - ${await oftype_( message ) } not allowed argument` ) )
}
