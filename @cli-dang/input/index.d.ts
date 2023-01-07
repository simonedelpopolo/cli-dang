import { OftypesError } from 'oftypes'
export declare type ParsedArgv = { [ p: string ]: unknown, keys: string[] }
export declare type LogicParameter = ( data: ParsedArgv ) => Promise<void>
export declare function entry_point(argv: string[], logic: LogicParameter): Promise<void>;
export function options( pattern:string, reference_to_flag:string ):Promise<OftypesError|object>;
export declare function processor(argv: any): Promise<ParsedArgv>;
export const Command:Commands
export declare interface Commands {
  
  retrieve: ( name?:string|undefined ) => CommandsDefinition|undefined
  interceptor: ( parsed: ParsedArgv ) => Promise<void>
  define: ( name:string, cb?:<cb>( args?:cb )=>Promise<cb>|Promise<void> | void ) => void
  flag: ( name:string ) => Commands
  short: ( name:string ) => Commands
  long: ( name:string ) => Commands
  description: ( text:string ) => Commands
  usage: ( text:string ) => Commands
  void: ( bool:boolean ) => Commands
  type: ( string:string ) => Commands
  check: ( bool:boolean ) => Commands
  cb: ( cb?:<cb extends void | Promise<void> | Promise<cb>>( args?:cb )=>Promise<cb>|Promise<void> | void ) => Commands
}
export declare type CommandsDefinition = { [name:string]: {
    flags?:{
             [name:string]:{
                             long: string,
                             short?: string,
                             description?: string,
                             usage?: string,
                             void?: boolean,
                             type?: string,
                             check: boolean,
                             cb?: <cb>( args?: cb )=> Promise<cb>|Promise<void> | void
                           } | null
           } | null,
    cb?:<cb>( args?: cb )=> Promise<cb>|Promise<void> | void
  } }
