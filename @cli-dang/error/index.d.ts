export declare type ErrorsObject = {
  COMMAND: number;
  FLAG: number;
  TYPE: number;
  INTERNAL: number;
  UNKNOWN: number;
};
export declare const error_code: ErrorsObject
export declare function add( key: string, value: number ): void;
export declare function get( key?: undefined | string ): number | ErrorsObject;
