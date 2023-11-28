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
};
export type TypeStreamData = {
    decomposedText: string[][];
    charIndex: number;
    jasoIndex: number;
    lastJaso: string;
    isEnd?: boolean;
};
export type TypeStreamCallback = (typing: string, stream: {
    decomposedText: string[][];
    charIndex: number;
    jasoIndex: number;
    lastJaso: string;
    isEnd?: boolean;
}) => void;
export type TypeStreamResult = {
    textContent: string;
    decomposedText: string[][];
    charIndex: number;
    jasoIndex: number;
    lastJaso: string;
    isEnd: boolean;
};
export type TypeStream = (text: string, callback: TypeStreamCallback, delay?: TypeStreamDelayOptions) => Promise<TypeStreamResult>;
export declare const delay: (milliseconds: number) => Promise<unknown>;
declare function createTypeStream(delayOptions?: TypeStreamDelayOptions): TypeStream;
export default createTypeStream;
