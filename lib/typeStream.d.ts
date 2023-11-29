export declare function isNewLine(text: string): boolean;
export declare function isDot(text: string): boolean;
export declare function isInJongSung(text: string): boolean;
export declare function isSpaceCharacter(text: string): boolean;
export declare function decomposeHangul(text: string): string[][];
export declare function composeHangul(decomposed: string[][]): string;
export type TypeStreamDelayOptions = {
    perHangul?: number;
    perChar?: number;
    perSpace?: number;
    perLine?: number;
    perDot?: number;
    toggle?: boolean;
};
export type TypeStreamStatus = 'stopped' | 'playing' | 'done';
export type TypeStreamData = {
    decomposedText: string[][];
    charIndex: number;
    jasoIndex: number;
    lastJaso: string;
    isEnd?: boolean;
    status: TypeStreamStatus;
};
export type TypeStreamCallback = (typing: string, stream: TypeStreamData) => void;
export type TypeStreamResult = TypeStreamData & {
    textContent: string;
};
export type TypeStream = (text: string, callback: TypeStreamCallback, delay?: TypeStreamDelayOptions) => Promise<TypeStreamResult>;
export declare const delay: (milliseconds: number) => Promise<unknown>;
declare function createTypeStream(delayOptions?: TypeStreamDelayOptions): TypeStream;
export default createTypeStream;
