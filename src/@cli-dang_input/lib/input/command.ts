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
export class Command{

  private _command: string|undefined = undefined
  private _flag: string|null = null
  constructor(){/*@ empty*/}

  public builder():Command{
    return this
  }

  public interceptor(){/*@ empty*/}

  public command( name:string ){
    this._command = name
    if( ! commands[ this._command ] )
      commands[ name ] = { [ 'flags' ]:{} }

    return this
  }

  public flag( name: string ){
    this._flag = name
    commands[ this._command ].flags[ name ] = {
      long: null,
      short: null,
      description: null,
      usage: null,
      void: null,
      type: null,
      check: null,
      cb: null
    }

    return this
  }

  public short( name: string ){
    commands[ this._command ].flags[ this._flag ].short = `-${name}`

    return this
  }

  public long( name: string ){
    commands[ this._command ].flags[ this._flag ].long = `--${name}`

    return this
  }

  public description( text: string ){
    commands[ this._command ].flags[ this._flag ].description = text

    return this
  }

  public usage( text: string ){
    commands[ this._command ].flags[ this._flag ].usage = text

    return this
  }

  public void( bool: boolean ){
    commands[ this._command ].flags[ this._flag ].void = bool

    return this
  }

  public type( string: string ){
    commands[ this._command ].flags[ this._flag ].type = string

    return this
  }

  public check( bool: boolean ){
    commands[ this._command ].flags[ this._flag ].check = bool

    return this
  }

  public cb( cb: ( args?:undefined )=> Promise<unknown>|unknown ){
    commands[ this._command ].flags[ this._flag ].cb = cb

    return this
  }

  public get(){
    return commands
  }
}
