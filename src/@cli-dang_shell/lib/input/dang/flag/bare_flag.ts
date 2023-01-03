import { OftypesError, resolvers, undefined_ } from 'oftypes'

export async function * bare_flag( arg ){

  const truthy = () => true
  const falsy = () => new OftypesError( 'bare doesn\'t accept any argument' )
  // @ts-ignore
  yield await ( await undefined_( arg, await resolvers( truthy, falsy ) ) )()

}
