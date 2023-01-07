export declare type ParsedArgv = { [ p: string ]: unknown, keys: string[] }
export declare type LogicParameter = ( data: ParsedArgv ) => Promise<void>
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
export declare interface Commands {
  _name: string|undefined
  _flag: string|null

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
