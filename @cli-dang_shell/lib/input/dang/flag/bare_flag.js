import { OftypesError, resolvers, undefined_ } from 'oftypes'

/**
 * - checking --bare flag
 *
 * @param {string} arg - value
 * @yields
 * @returns {AsyncGenerator<OftypesError|string, void, OftypesError|string>}
 */
export async function * bare_flag( arg ){

  const truthy = () => true
  const falsy = () => new OftypesError( 'bare doesn\'t accept any argument' )
  yield await ( await undefined_( arg, await resolvers( truthy, falsy ) ) )()

}
