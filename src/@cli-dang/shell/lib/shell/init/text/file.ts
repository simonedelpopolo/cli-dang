export function process_file( title ){
  return `import { bare_flag } from './dang/flag/bare_flag.js'
import { error_code } from '@cli-dang/error'
import { exit } from '@cli-dang/activity'
import { OftypesError, resolvers, undefined_ } from 'oftypes'

/**
 * - ${title} process
 *
 * @param {Object<{[unknown:string]: any}>} parsed - process.argv
 * @returns {Promise<Object<{command: {init: null},flag:{bare:null}}>>}
 */
export async function ${ title }_process( parsed ) {

    let break_for_loop = false

    const ${title} = {
        command:{
            init: null
        },
        flag:{
            bare: null
        }
    }

    const ${title}_commandKeys = Object.keys( ${title}.command )
    for ( const selected_command in ${title}_commandKeys ) {

        if ( !( parsed.keys.includes( ${title}_commandKeys[ selected_command ] ) ) )
            delete ${title}.command[ ${title}_commandKeys[ selected_command ] ]
    }

    for ( const command in parsed.keys ) {

        if ( break_for_loop )
            break

        switch ( parsed.keys[ command ] ) {

            case 'init': {

                const truthy = () => {
                    delete parsed.object.init
                    parsed.keys.splice( 0, 1 )
                }
                const falsy = async () => exit( 'init command doesn\\'t accept any argument', new SyntaxError( '♠︎' ), error_code.COMMAND )
                await ( await undefined_( parsed.object.init, await resolvers( truthy, falsy ) ) )()

                ${title}.command.init = true
            }
                break_for_loop = true
                break

            case 'v':
            case 'version':

                console.log( await ( await import( '../../../package.json', { assert: { type: 'json' } } ) ).default.version )
                process.exit( 0 )
                break

            default: {

                let error = \`        command '\${ parsed.keys[ command ].red() }' not recognize
        run -> \${ process.title.blue() } help        \`

                await exit( error, new SyntaxError( \`\${ process.title } ♠︎\` ), error_code.COMMAND )
            }
        }
    }

    const ${title}Flags = Object.keys( parsed.object )

    for ( const flag in ${title}Flags ) {

        switch ( ${title}Flags[ flag ] ) {

            case 'bare': {

                for await ( const type of await bare_flag( parsed.object[ ${title}Flags[ flag ] ] ) ) {
                    if ( type instanceof Error )
                        await exit( type.message, new OftypesError( '♠︎' ), error_code.FLAG )

                    ${title}.flag.bare = type
                }


                delete parsed.object[ ${title}Flags[ flag ] ]
                parsed.keys.splice( 0, 1 )
            }
                break

            default: {
                let error = \`        flag '\${ ${title}Flags[ flag ].red() }' not recognize
        run -> \${ process.title.blue() } help        \`

                await exit( error, new SyntaxError( \`\${ process.title } ♠︎\` ), error_code.FLAG )
            }
        }
    }

    return ${title}
}`}

/**
 * Flag bare type checking.
 *
 * @returns {string}
 */
export function bare_flag_file(){
  return `import { OftypesError, resolvers, undefined_ } from 'oftypes'

/**
 * - checking --bare flag
 *
 * @param {string} arg - value
 * @yields
 * @returns {AsyncGenerator<OftypesError|string, void, OftypesError|string>}
 */
export async function * bare_flag( arg ){

    const truthy = () => true
    const falsy = () => new OftypesError( 'bare doesn\\'t accept any argument' )
    yield await ( await undefined_( arg, await resolvers( truthy, falsy ) ) )()

}`}
