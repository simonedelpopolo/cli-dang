import { OftypesError } from 'oftypes'
export declare type ParsedArgv = { [ p: string ]: unknown, keys: string[] }
export declare type LogicParameter = ( data: ParsedArgv ) => Promise<void>
export declare function entry_point(argv: string[], logic: LogicParameter): Promise<void>;
export function options( pattern:string, reference_to_flag:string ):Promise<OftypesError|object>;
export declare function processor(argv: any): Promise<ParsedArgv>;
