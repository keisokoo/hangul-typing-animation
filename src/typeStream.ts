const CHOSUNG_LIST = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];
const JUNGSUNG_LIST = [
  'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
];
const JONGSUNG_LIST = [
  '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];
const BASE_CODE = 0xAC00;
const CHOSUNG_BASE = 588;
const JUNGSUNG_BASE = 28;
export function isNewLineOrDot(text: string): boolean {
  return /\n|\./.test(text);
}
export function isInJongSung(text: string): boolean {
  return JONGSUNG_LIST.includes(text);
}
export function isSpaceCharacter(text: string): boolean {
  return text === ' ' || text === '\s';
}
export function decomposeHangul(text: string): string[][] {
  let decomposed: string[][] = [];
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    if (charCode < BASE_CODE || charCode > 0xD7A3) {
      decomposed.push([text[i]]);
      continue;
    }

    const uniValue = charCode - BASE_CODE;
    const chosungIndex = Math.floor(uniValue / CHOSUNG_BASE);
    const jungsungIndex = Math.floor((uniValue - (chosungIndex * CHOSUNG_BASE)) / JUNGSUNG_BASE);
    const jongsungIndex = uniValue % JUNGSUNG_BASE;

    const chosung = CHOSUNG_LIST[chosungIndex];
    const jungsung = JUNGSUNG_LIST[jungsungIndex];
    const jongsung = JONGSUNG_LIST[jongsungIndex];

    decomposed.push([chosung, jungsung, jongsung].filter(jaso => jaso));
  }

  return decomposed;
}
export function composeHangul(decomposed: string[][]): string {
  return decomposed.map(jasoArray => {
    if (jasoArray.length === 1) {
      return jasoArray[0];
    } else if (jasoArray.length === 2) {
      const chosungIndex = CHOSUNG_LIST.indexOf(jasoArray[0]);
      const jungsungIndex = JUNGSUNG_LIST.indexOf(jasoArray[1]);
      return String.fromCharCode(BASE_CODE + chosungIndex * CHOSUNG_BASE + jungsungIndex * JUNGSUNG_BASE);
    } else if (jasoArray.length === 3) {
      const chosungIndex = CHOSUNG_LIST.indexOf(jasoArray[0]);
      const jungsungIndex = JUNGSUNG_LIST.indexOf(jasoArray[1]);
      const jongsungIndex = JONGSUNG_LIST.indexOf(jasoArray[2]);
      return String.fromCharCode(BASE_CODE + chosungIndex * CHOSUNG_BASE + jungsungIndex * JUNGSUNG_BASE + jongsungIndex);
    }
    return '';
  }).join('');
}
export type TypeStreamDelayOptions = {
  perHangul?: number,
  perChar?: number,
  perLineOrDot?: number,
  perWord?: number,
}
export type TypeStreamData = {
  decomposedText: string[][], charIndex: number, jasoIndex: number, lastJaso: string, isEnd?: boolean
}
export type TypeStreamCallback = (string: string, stream: {
  decomposedText: string[][], charIndex: number, jasoIndex: number, lastJaso: string, isEnd?: boolean
}) => void
export type TypeStream = (text: string, callback: TypeStreamCallback, delay?: TypeStreamDelayOptions) => void
export const delay = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function createTypeStream(delayOptions: TypeStreamDelayOptions = {
  perChar: 40,
  perHangul: 80,
  perWord: 160,
  perLineOrDot: 320
}) {
  let currentAnimationId = 0;
  const typeStream: TypeStream =
    function typeHangulStream(text: string, callback: (string: string, stream: TypeStreamData) => void, currentDelay?: TypeStreamDelayOptions) {
      const currentDelayOptions = { ...delayOptions, ...currentDelay };
      const thisAnimationId = ++currentAnimationId;
      const decomposedText = decomposeHangul(text);
      let textContent = ''
      let currentText: string = '';
      let charIndex = 0;
      let jasoIndex = 0;
      let timeout: NodeJS.Timeout;

      function typeCharacter() {
        if (thisAnimationId !== currentAnimationId) {
          return clearTimeout(timeout);
        }
        if (charIndex < decomposedText.length) {
          const word = decomposedText[charIndex];
          const prevWord = charIndex > 0 ? decomposedText[charIndex - 1] : [];
          const currentCharJasos = word.slice(0, jasoIndex + 1);
          const currentJaso = currentCharJasos[currentCharJasos.length - 1];
          const afterHangulCombination = word.length > 1 && jasoIndex === word.length - 1;
          let newLineOrEnd = false;
          let isSpaceChar = false;
          if (isSpaceCharacter(currentJaso)) isSpaceChar = true;
          if (isNewLineOrDot(currentJaso)) newLineOrEnd = true;
          const combinedChar = composeHangul([currentCharJasos]);
          if (charIndex > 0 && prevWord.length === 2 && currentCharJasos.length === 1 && isInJongSung(currentJaso)) {
            let tempLastChar = prevWord.concat(currentJaso);
            let combinedLastChar = composeHangul([tempLastChar]);
            textContent = currentText.slice(0, -1) + combinedLastChar;
          } else {
            textContent = currentText + combinedChar;
          }
          jasoIndex++;
          if (jasoIndex >= word.length) {
            currentText += combinedChar;
            charIndex++;
            jasoIndex = 0;
          }
          timeout = setTimeout(typeCharacter, newLineOrEnd ? currentDelayOptions.perLineOrDot : isSpaceChar ? currentDelayOptions.perWord : afterHangulCombination ? currentDelayOptions.perHangul : currentDelayOptions.perChar);
          callback(textContent, {
            decomposedText,
            charIndex,
            jasoIndex,
            lastJaso: currentJaso,
            isEnd: false
          })
        } else if (timeout) {
          callback(textContent, {
            decomposedText,
            charIndex,
            jasoIndex,
            lastJaso: decomposedText[decomposedText.length - 1][decomposedText[decomposedText.length - 1].length - 1],
            isEnd: true
          })
          clearTimeout(timeout);
        }
      }
      typeCharacter()
    }
  return typeStream
}
export default createTypeStream