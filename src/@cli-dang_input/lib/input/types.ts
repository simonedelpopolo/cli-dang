export declare type LogicParameter = ( object: { [ p: string ]: unknown, keys: string[] } ) => Promise<object>

export declare type ParsedArgv = { [ p: string ]: unknown, keys: string[] }
