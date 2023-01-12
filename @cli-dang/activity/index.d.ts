import { OftypesError } from 'oftypes'
export declare function trace( ...data: [unknown] ): Promise< null |string | OftypesError>;
export declare const trace_options: {
  mute: boolean;
  colors: boolean;
  depth: number;
  showHidden: boolean;
}
export declare type MessageArgument = string | Buffer;
export declare function stderr( message: MessageArgument, mute?: boolean ): Promise<Buffer | string | OftypesError>;
export declare function exit( message: MessageArgument, error_type?: Error, exit_code?: number, process_exit?: boolean, mute?: boolean ): Promise<OftypesError | string>;
