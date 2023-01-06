export declare type CommandsDefinition = {[name:string]: {
    flags?:{
      [name:string]:{
        long: string,
        short?: string,
        description?: string,
        usage?: string,
        void?: boolean,
        type?: string,
        check: boolean,
        cb?: ( args?:undefined )=> Promise<unknown>|unknown
      } | null
    } | null
  }
}

const commands: CommandsDefinition = {}

declare interface Command {
  _name: string|undefined
  _flag: string|null

  retrieve: ( name?:string|undefined ) => CommandsDefinition|undefined
  define: ( name:string ) => void
  flag: ( name:string ) => Command
  short: ( name:string ) => Command
  long: ( name:string ) => Command
  description: ( text:string ) => Command
  usage: ( text:string ) => Command
  void: ( bool:boolean ) => Command
  type: ( string:string ) => Command
  check: ( bool:boolean ) => Command
  cb: ( cb: ( args?:undefined )=> Promise<unknown>|unknown ) => Command
}

const Command: Command = Object( null )

Object.defineProperty( Command, '_name', {
  enumerable: false,
  configurable: false,
  writable: true,
  value : undefined
} )

Object.defineProperty( Command, '_flag', {
  enumerable: false,
  configurable: false,
  writable: true,
  value : undefined
} )

Object.defineProperty( Command, 'retrieve', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : ( name?: string|undefined ):CommandsDefinition|undefined => {
    return typeof name !== 'undefined'
      ? typeof commands[ name ] !== 'undefined'
        ? commands [ name ]
        : undefined
      : commands
  }
} )

Object.defineProperty( Command, 'define', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : ( name: string ) => {
    Command._name = name
    if( ! commands[ Command._name ] )
      commands[ name ] = { [ 'flags' ]:{} }
  }
} )

Object.defineProperty( Command, 'flag', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : ( name: string ):Command => {
    Command._flag = name
    commands[ Command._name ].flags[ name ] = {
      long: null,
      short: null,
      description: null,
      usage: null,
      void: null,
      type: null,
      check: null,
      cb: null
    }

    return Command
  }
} )

Object.defineProperty( Command, 'short', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : ( name: string ):Command => {
    commands[ Command._name ].flags[ Command._flag ].short = `-${name}`
    
    return Command
  }
} )

Object.defineProperty( Command, 'long', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : ( name: string ):Command => {
    commands[ Command._name ].flags[ Command._flag ].long = `--${name}`
    
    return Command
  }
} )

Object.defineProperty( Command, 'description', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : ( text: string ):Command => {
    commands[ Command._name ].flags[ Command._flag ].description = text
    
    return Command
  }
} )

Object.defineProperty( Command, 'usage', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : ( text: string ):Command => {
    commands[ Command._name ].flags[ Command._flag ].usage = text
    
    return Command
  }
} )

Object.defineProperty( Command, 'void', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : ( bool: boolean ):Command => {
    commands[ Command._name ].flags[ Command._flag ].void = bool
    
    return Command
  }
} )

Object.defineProperty( Command, 'type', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : ( string: string ):Command => {
    commands[ Command._name ].flags[ Command._flag ].type = string
    
    return Command
  }
} )

Object.defineProperty( Command, 'check', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : ( bool: boolean ):Command => {
    commands[ Command._name ].flags[ Command._flag ].check = bool
    
    return Command
  }
} )

Object.defineProperty( Command, 'cb', {
  enumerable: true,
  configurable: false,
  writable: false,
  value : ( cb: ( args?:undefined )=> Promise<unknown>|unknown ):Command => {
    commands[ Command._name ].flags[ Command._flag ].cb = cb
    
    return Command
  }
} )

export default Command
