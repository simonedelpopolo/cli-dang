import { OftypesError } from 'oftypes'
export declare function entry_point(argv: string[], logic: LogicParameter): Promise<void>;
export function options( pattern:string, reference_to_flag:string ):Promise<OftypesError|object>;
export declare function processor(argv: any): Promise<ParsedArgv>;
export const Command:Commands
export declare type ParsedArgv = { [ p: string ]: unknown, keys: string[] }
export declare type LogicParameter = ( data: ParsedArgv ) => Promise<void>
export declare type FlagType = 'string' | 'boolean' | 'number' | 'opts' | 'json' | 'buf'
export declare type FLAG = {
  long?: string|null
  short?: string|null
  description?: string|null
  usage?:string|null
  void?:boolean
  type?:FlagType
  check?: boolean
  cb?: { function:FlagsCallBack, arguments?: Array<boolean|string|object|number> }
}
export declare type FlagsCallBack = ( <cb>( arg:cb, ...arguments:[] )=>Promise<void>|void|Promise<cb>|cb ) | null
export declare type CommandCallBack = ( <cb>( arg:cb )=>Promise<void>|void|Promise<cb>|cb ) | null
export declare type CommandsDefinition = { [name:string]: {
    flags?:{
             [name:string]:FLAG
           } | null,
    cb:CommandCallBack
  } }
export declare interface Commands {
  retrieve: ( name?:string|undefined ) => CommandsDefinition|undefined
  interceptor: ( parsed: ParsedArgv ) => Promise<void>
  define: ( name:string, cb:CommandCallBack ) => void
  flag: ( name:string, descriptor: FLAG, alias?:string[] |undefined  ) => void
}
