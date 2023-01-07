import { default as Generator } from './functions/generator'
import { OftypesError } from 'oftypes'

export async function string_to_object( data: string | Buffer, scalpel:string|Buffer = ':' ):Promise<OftypesError | object> {

  const generator = new Generator()
  let type:null|Error
  for await ( const check of generator.type_check( data, true, scalpel ) ) {

    if( check instanceof Error ) {
      type = check
      break
    }
    type = <null> check
  }

  return new Promise( ( resolve, reject ) => {

    if( type instanceof Error )
      reject( type )

    const buffer_or_string:string = Buffer.isBuffer( data ) ? data.toString() : data
    const scalpel_buffer_or_string:string = Buffer.isBuffer( scalpel ) ? scalpel.toString() : scalpel

    const option_value_reg_expression = new RegExp( `(.*)[${scalpel_buffer_or_string}](.*)`, 'g' )
    const body_array_expression = Array.from( buffer_or_string.matchAll( option_value_reg_expression ), body_value_matches => body_value_matches[ 0 ] )

    if( typeof body_array_expression[ 0 ] === 'undefined' )
      reject( new OftypesError( '♠ no matched pattern found' ) )

    const body_array = body_array_expression[ 0 ].replaceAll( scalpel_buffer_or_string, ':' ).split( ':' )
    if( body_array.length % 2 !== 0 )
      reject( new OftypesError( `♠︎ parameter \`data\` <String> <Format>[property]${scalpel}[value]</Format>. Not multiple of 2. given data: ${data.toLocaleString()}` ) )

    else{
      const even = 0
      const property_value = []
      for ( const key in body_array ) {

        if ( even + parseInt( key ) % 2 === 0 ) {
          let value_ = <string> body_array[ parseInt( key ) + 1 ]
          value_ = value_.length === 0 ? undefined : value_
          property_value.push( Array.of( body_array[ parseInt( key ) ], value_ ) )
        }
      }

      resolve( Object.fromEntries( property_value ) )
    }

  } )
}
