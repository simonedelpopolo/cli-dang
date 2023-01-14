export function entry_point( argv: string[], logic: LogicParameter ): Promise<void>;
export function options( pattern: string, reference_to_flag: string ): Promise<Error | OptionsType>;
export function processor( argv: any ): Promise<ParsedArgv>;

declare global {
  type OptionsType = {
    [p:string]:string
  }
  type InterceptHelp = { command: string, flag: string }
  type ParsedArgv = { [ p: string ]: unknown, keys: string[], flag?: object|string, command?:string} & { help?: InterceptHelp }
  type RestArgsCallbacks = Array<boolean | string | object | number>
  type LogicParameter = ( data: ParsedArgv ) => Promise<void>
  
  type FlagType = 'string' | 'boolean' | 'number' | 'opts' | 'json' | 'buf'
  type FlagDescriptor = {
    alias?: string[] | undefined
    implement?: Flag
  }
  type Flag = {
    long?: string | null
    short: string | null
    description?: string | null
    usage?: string | null
    void?: boolean | null
    type?: FlagType | null
    check?: boolean | null
    cb?: { function: FlagsCallBack, arguments?: RestArgsCallbacks } | null
  }
  type FlagsCallBack =
    ( <cb>( data: cb, ...rest_args: RestArgsCallbacks ) => Promise<void> | void | Promise<cb> | cb )
    | null
  
  type CommandCallBack =
    ( <cb>( data: cb, ...rest_args: RestArgsCallbacks ) => Promise<void> | void | Promise<cb> | cb )
    | null
  type CommandsDefinition = {
    [ name: string ]: {
      flags?: { [ name: string ]: Flag } | null,
      cb: CommandCallBack,
      arguments?: boolean
    }
  }
  type checkoutCommand = {
    flags?: {
      [ p: string ]: Flag
    }
  }
  
  interface InterfaceCommand {
    checkout( name?: string | undefined ): Promise<checkoutCommand | CommandsDefinition | boolean>;
    intercept( parsed:ParsedArgv ):Promise<void>;
    define: ( name: string, cb: CommandCallBack, arguments?: boolean ) => void;
    flag: ( name: string, descriptor: FlagDescriptor ) => void;
  }
}

export class Command implements InterfaceCommand {
  checkout( name?: string | undefined ): Promise<checkoutCommand | CommandsDefinition | boolean>;
  intercept( parsed:ParsedArgv ):Promise<void>;
  define: ( name: string, cb: CommandCallBack, arguments?: boolean ) => void;
  flag: ( name: string, descriptor: FlagDescriptor ) => void;
}
