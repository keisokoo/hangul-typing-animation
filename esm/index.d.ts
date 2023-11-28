export declare function containsNewlineOrDot(text: string): boolean;
export declare function isIncludeJongsung(text: string): boolean;
export declare function isSpaceCharacter(text: string): boolean;
export declare function decomposeHangul(text: string): string[][];
export declare function combineHangul(decomposed: string[][]): string;
declare function typeStream(text: string, callback: (string: string, stream: {
    decomposedText: string[][];
    charIndex: number;
    jasoIndex: number;
    isEnd?: boolean;
}) => void, delay?: {
    perHangul?: number;
    perChar?: number;
    perSentence?: number;
    perWord?: number;
}): void;
export default typeStream;
