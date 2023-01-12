import { OftypesError } from 'oftypes'
export function is_json( data: string | Buffer, catch_error?: boolean ): Promise<boolean | OftypesError>;
export function json_parse( data: string | Buffer ):Promise<object | OftypesError>
export function array_to_json( data:( string|number|unknown )[] ):Promise<string|OftypesError>;
