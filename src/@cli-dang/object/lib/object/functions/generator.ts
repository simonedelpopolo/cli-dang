import { buffer_, object_, oftype_, OftypesError, string_ } from 'oftypes'

export default class generator{

  async* type_check( data:unknown, string_buffer = false, scalpel:unknown|undefined = undefined, needle:unknown|undefined = undefined ):AsyncGenerator{

    yield await oftype_( data ) === 'undefined'
      ? new OftypesError( `♠︎ parameter \`data\` must be provided and must be ${string_buffer ? '<String|Buffer>' : '<Object>'}` )
      : null

    yield string_buffer
      ? await string_( data ) ||  await buffer_( data )
        ? null
        : new OftypesError( `♠︎ parameter \`data\` must be a <String || Buffer>. given type: ${await oftype_( data )}` )

      : await object_( data )
        ? null
        : new OftypesError( `♠︎ parameter \`data\` must be an <Object>. given type: ${await oftype_( data )}` )

    yield string_buffer
      ? String( data ).length === 0 || Buffer.byteLength( <Buffer> data ) === 0
        ? new OftypesError( '♠︎ parameter `data` can\'t be empty' )
        : null
      : Object.keys( data ).length === 0
        ? new OftypesError( '♠︎ parameter `data` body can\'t be empty' )
        : null

    yield string_buffer
      ? await string_( scalpel ) ||  await buffer_( scalpel )
        ? null
        : new OftypesError( `♠︎ parameter \`scalpel\` must be a <String || Buffer>. given type: ${await oftype_( scalpel )}` )
      : null

    yield string_buffer
      ? String( scalpel ).length === 0 || Buffer.byteLength( <Buffer> scalpel ) === 0
        ? new OftypesError( '♠︎ parameter `scalpel` can\'t be empty' )
        : null
      : null

    yield await oftype_( needle ) !== 'undefined'
      ? await string_( needle ) ||  await buffer_( needle )
        ? String( needle ).length === 0 || Buffer.byteLength( <Buffer> needle ) === 0
          ? new OftypesError( '♠︎ parameter `needle` can\'t be empty' )
          : null
        : new OftypesError( `♠︎ parameter \`needle\` must be a <String || Buffer>. given type: ${await oftype_( needle )}` )
      : null
  }
}
