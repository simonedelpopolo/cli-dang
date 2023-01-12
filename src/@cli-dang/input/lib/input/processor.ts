import { OftypesError } from 'oftypes'
import { optionsSync } from './functions/optionsSync'

/* @think_it editing RegEx to include the '-' dash/s symbol */
export async function processor( argv:string[] ):Promise<ParsedArgv|OftypesError>{

  return new Promise( ( resolve, reject ) => {

    if( typeof argv === 'undefined' )
      reject( new OftypesError( '♠ argv is undefined' ) )

    if( argv.length === 0 )
      reject( new OftypesError( '♠ empty argv' ) )

    const arguments_array = []
    arguments_array.push( [ argv[ 0 ] ] )
    for ( const index in argv ) {

      if( typeof argv[ index ] === 'number' )
        reject( new OftypesError( '♠ no numbers' ) )

      if( argv[ index ].length === 0 )
        reject( new OftypesError( '♠ empty string.' ) )

      //@ match empty spaces
      if( argv[ index ].match( /^\s+$/ ) )
        reject( new OftypesError( '♠ pattern does not match anything or encountered a problem.' ) )

      if( index !== '0' ) {
        arguments_array.push(
          Array.from( argv[ index ].matchAll( /(.*?)=(.*?$)/g ), match => [
            match[ 1 ],
            match[ 2 ],
          ] )[ 0 ],
        )
      }
    }

    const argv_to_object = Object.fromEntries( arguments_array )

    /**
     * Automatic recognizing the @cli-dang/input.optionsSync_private syntax
     * Mixing @cli-dang/input.options and @cli-dang/object.string_to_object and make them NOT async/Promise
     *
     * @think_it testing functionalities
     */
    for ( const [ argv_option ] of Object.entries( argv_to_object ) ){
      if( typeof argv_to_object[ argv_option ] !== 'undefined' ) {
        const opts = optionsSync( argv_to_object[ argv_option ] )
        if ( !( opts instanceof Error ) )
          argv_to_object[ argv_option ] = opts
      }
    }

    resolve( { object:argv_to_object, keys:Object.keys( argv_to_object ) } )
  } )
}
