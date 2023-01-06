import { array_, boolean_, buffer_, oftype_, OftypesError, string_ } from 'oftypes'

export default class generator{

  async* type_check( data:unknown, array = false, check_error:undefined|unknown = undefined ):AsyncGenerator{

    yield await oftype_( data ) === 'undefined'
      ? new OftypesError( `♠︎ parameter \`data\` must be provided and must be ${array ? '<Array>' : '<String|Buffer>'}` )
      : null

    if( array ){

      yield await array_( data )
        ? null
        : new OftypesError( `♠︎ parameter \`data\` must be an <Array>. given type: ${await oftype_( data )}` )

      const array:[] = <[]> data
      yield array.length % 2 !== 0
        ? new OftypesError( `♠︎ parameter \`data\` <Array> not multiple of 2. given data: ${data.toLocaleString()}` )
        : null

    }else{

      yield await string_( data ) || await buffer_( data )
        ? null
        : new OftypesError( `♠︎ parameter \`data\` must be a <String || Buffer>. given type: ${await oftype_( data )}` )

      yield String( data ).length === 0 || Buffer.byteLength( <Buffer> data ) === 0
        ? new OftypesError( '♠︎ parameter `data` can\'t be empty' )
        : null

      yield await oftype_( check_error ) !== 'undefined'
        ? await boolean_( check_error )
          ? null
          : new OftypesError( `♠︎ parameter \`check_error\` must be a <Boolean>. given type: ${await oftype_( check_error )}` )
        : null
    }
  }
}
