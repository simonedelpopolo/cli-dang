import { number_, oftype_, OftypesError, string_, undefined_ } from 'oftypes'

export default class boolean_generator{

  async * true_false_types( string ):AsyncGenerator{
    yield await oftype_( string ) === 'Buffer' ||
    await oftype_( string ) === 'String'
      ? null
      : new OftypesError( `♠ parameter \`string\` accept only <String>. Given type: ${ await oftype_( string ) }` )

    yield string !== 'false' && string !== 'true'
      ? new OftypesError( `♠ parameter \`string\` accept only the strings "true" or "false". given: ${ string }` )
      : null
  }

  async * type_check ( logic:unknown, against: unknown ): AsyncGenerator{

    yield await undefined_( logic ) || await undefined_( against )
      ? new OftypesError( '♠ both parameters `logic` && `against` are required' )
      : null

    yield await oftype_( logic ) === 'Object'
      ? null
      : new OftypesError( `♠ parameter \`logic\` accept only <Object>. Given type: <${ await oftype_( logic ) }>` )

    yield await number_( against, undefined, undefined, true )
      ? new OftypesError( `♠ parameter \`against\` accept only <String>. Given type: <${ await oftype_( against ) }Number>` )
      : null

    yield !( await string_( against ) )
      ? new OftypesError( `♠ parameter \`against\` accept only <String>. Given type: <${ await oftype_( against ) }>` )
      : null
  }

}
