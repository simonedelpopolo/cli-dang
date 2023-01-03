import { Dang } from './dang'

export function override( prefix?: string, symbol:undefined|boolean = undefined ):void{

  if( ! prefix )
    prefix = ''

  if( ! symbol )
    symbol = false

  for ( const func in  Dang ) {

    if ( symbol ) String.prototype[ Symbol.for ( `${ prefix }${ Dang[ func ].name }` ) ] = Dang[ func ]
    else String.prototype[ `${ prefix }${ Dang[ func ].name }` ] = Dang[ func ]

  }
}
