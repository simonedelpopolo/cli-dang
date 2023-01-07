export declare type ParsedArgv = { [ p: string ]: unknown, keys: string[] }
export declare type LogicParameter = ( data: ParsedArgv ) => Promise<void>
