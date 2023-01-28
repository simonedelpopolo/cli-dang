export function entry_point( argv: string[], logic: LogicParameter ): Promise<void>;
export function options( pattern: string, reference_to_flag: string ): Promise<Error | OptionsType>;
export function processor( argv: any ): Promise<ParsedArgv>;

declare global {
  type OptionsType = {
    [p:string]:string
  }
  type InterceptHelp = { command: string, flag: string }
  type ParsedArgv = { object: { [ p: string ]: any }, keys: string[], flag?: object|string, command?:string}
  type RestArgsCallbacks = Array<boolean | string | object | number>
  type LogicParameter = ( data: ParsedArgv ) => Promise<void>
  
  type FlagType = 'string' | 'boolean' | 'number' | 'opts' | 'json' | 'buf' | 'null'
  type GlobalFlagType = 'string' | 'opts' | 'object'
  type FlagDescriptor ={
    long?: string | null
    short: string | null
    description?: string | null
    usage?: string | null
    void?: boolean | null
    type?: FlagType | null
    check?: boolean | null
    cb?: FlagsCallBack | null,
    rest_args?: RestArgsCallbacks
  }
  type FlagsCallBack =
    ( <cb>( data: cb, ...rest_args: RestArgsCallbacks ) => Promise<void> | void | Promise<cb> | cb )
    | null
  
  type CommandCallBack =
    ( <cb>( data: cb, ...rest_args: RestArgsCallbacks ) => Promise<void> | void | Promise<cb> | cb )
    | null
  type CommandsDefinition = {
    [ name: string ]: {
      flags?: { [ name: string ]: FlagDescriptor } | null,
      cb: CommandCallBack,
      rest_args?: RestArgsCallbacks
    }
  }
  type GlobalFlag = {
      [ name: string ]: {
        cb: CommandCallBack,
        rest_args?: RestArgsCallbacks,
        type: GlobalFlagType
      }
  }
  type checkoutCommand = {
    flags?: {
      [ p: string ]: FlagDescriptor
    }
  }
  
  type checkoutGlobal = {
    cb: CommandCallBack,
    rest_args?: RestArgsCallbacks,
    type: GlobalFlagType
  }
  
  
  interface InterfaceCommand {
    checkout( name?: string | undefined ): checkoutCommand | CommandsDefinition;
    checkout_global( name?: string | undefined ): checkoutGlobal | GlobalFlag;
    intercept( parsed:ParsedArgv ):Promise<void>;
    define: ( name: string, cb: CommandCallBack, global?:boolean, global_type?:GlobalFlagType, rest_args?:RestArgsCallbacks ) => void;
    flag: ( name: string|string[], descriptor: FlagDescriptor ) => Promise<void>;
  }
}

export class Command implements InterfaceCommand {
  checkout( name?: string | undefined ): checkoutCommand | CommandsDefinition;
  checkout_global( name?: string | undefined ): checkoutGlobal | GlobalFlag;
  intercept( parsed:ParsedArgv ): Promise<void>;
  define: ( name: string, cb: CommandCallBack, global?:boolean, global_type?:GlobalFlagType, rest_args?:RestArgsCallbacks ) => void;
  flag: ( name: string|string[], descriptor: FlagDescriptor ) => Promise<void>;
}
