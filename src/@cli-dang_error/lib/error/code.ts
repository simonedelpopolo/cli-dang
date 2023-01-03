import { ErrorsObject } from './types'

export const error_code:ErrorsObject = {
  COMMAND: 1,
  FLAG: 2,
  TYPE: 3,
  INTERNAL: 4,
  UNKNOWN: 5
}

export function add( key:string, value:number ): void{
  error_code[ key ] = value
}

export function get( key?:undefined|string ): number|ErrorsObject{

  return key ? error_code[ key ] || 0 : error_code
}
