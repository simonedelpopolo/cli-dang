import { async_, number_, oftype_, OftypesError, resolvers, undefined_ } from 'oftypes'
import { true_false } from '@cli-dang/boolean'

export default async function* check_flag<CheckFlag> ( data:CheckFlag, name:string, is_void = true, type: string, cb = null ):AsyncGenerator<unknown>{

  const void_truthy = ():boolean => true
  const void_falsy = ():OftypesError => new OftypesError( `♠ ${name} doesn't accept any value` )

  const check_type = async <type>( data: type ):Promise<type|OftypesError> => {

    if( typeof data === 'undefined' )
      return new OftypesError( `♠ ${name} can't be undefined` )

    const bool:Error|boolean = await true_false( <string> data ).catch( error => error )
    if( ! ( bool instanceof Error )  )
      data = <type> bool

    if( await number_( data ) )
      data = <type> Number( data )

    if( await oftype_( data ) === type.charAt( 0 ).toUpperCase() + type.slice( 1 ) )
      return data

    return new OftypesError( `♠ ${name} doesn't accept any other type than: ${type}` )

  }

  const data_type_check = is_void
    // @ts-ignore
    ? await ( await undefined_( data, await resolvers( void_truthy, void_falsy ) ) )()
    : await check_type( data )

  yield data_type_check

  if( cb !== null ) {

    yield await async_( cb.function )
      ? await cb.function( data_type_check, ...( cb.arguments || [] ) )
      : cb.function( data_type_check, ...( cb.arguments || [] ) )
  }

}
