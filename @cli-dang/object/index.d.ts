import { OftypesError } from 'oftypes';
export function object_to_string( data:object, needle?:Buffer|string ):Promise<string | OftypesError>
export function object_to_json( object: object, replacer?: ( this:unknown, key: string, value: unknown ) => string, space?:string|number ):Promise<string|OftypesError>;
export function string_to_object( data: string | Buffer, scalpel?:string|Buffer ):Promise<OftypesError | object>
