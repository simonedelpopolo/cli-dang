import { OftypesError } from 'oftypes'
export declare type LogicParameter=( ( object: { [ p: string ]: unknown, keys: string[] } ) => Promise<object> );
export declare type ParsedArgv = { [ p: string ]: unknown, keys: string[] };
export declare function entry_point(argv: string[], logic: LogicParameter): Promise<object | OftypesError>;
export function options( pattern:string, reference_to_flag:string ):Promise<OftypesError|object>;
export declare function process_title(parsed_argv: ParsedArgv, logic: LogicParameter, ejected?: undefined | string):Promise<object>;
export declare function processor(argv: any): Promise<ParsedArgv>;
