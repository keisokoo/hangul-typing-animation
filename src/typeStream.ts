const CHOSUNG_LIST = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
]; // 19
const JUNGSUNG_LIST = [
  'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
]; // 21
const JONGSUNG_LIST = [
  '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
]; // 28
const GYEOP_JUNGSUNG_LIST = {
  'ㅘ': 'ㅗㅏ',
  'ㅙ': 'ㅗㅐ',
  'ㅚ': 'ㅗㅣ',
  'ㅝ': 'ㅜㅓ',
  'ㅞ': 'ㅜㅔ',
  'ㅟ': 'ㅜㅣ',
  'ㅢ': 'ㅡㅣ',
}
const GYEOP_JONGSUNG_LIST = {
  'ㄳ': 'ㄱㅅ',
  'ㄵ': 'ㄴㅈ',
  'ㄶ': 'ㄴㅎ',
  'ㄺ': 'ㄹㄱ',
  'ㄻ': 'ㄹㅁ',
  'ㄼ': 'ㄹㅂ',
  'ㄽ': 'ㄹㅅ',
  'ㄾ': 'ㄹㅌ',
  'ㄿ': 'ㄹㅍ',
  'ㅀ': 'ㄹㅎ',
  'ㅄ': 'ㅂㅅ'
}

const REVERSE_GYEOP_JUNGSUNG_LIST = {
  'ㅗㅏ': 'ㅘ',
  'ㅗㅐ': 'ㅙ',
  'ㅗㅣ': 'ㅚ',
  'ㅜㅓ': 'ㅝ',
  'ㅜㅔ': 'ㅞ',
  'ㅜㅣ': 'ㅟ',
  'ㅡㅣ': 'ㅢ',
};

const REVERSE_GYEOP_JONGSUNG_LIST = {
  'ㄱㅅ': 'ㄳ',
  'ㄴㅈ': 'ㄵ',
  'ㄴㅎ': 'ㄶ',
  'ㄹㄱ': 'ㄺ',
  'ㄹㅁ': 'ㄻ',
  'ㄹㅂ': 'ㄼ',
  'ㄹㅅ': 'ㄽ',
  'ㄹㅌ': 'ㄾ',
  'ㄹㅍ': 'ㄿ',
  'ㄹㅎ': 'ㅀ',
  'ㅂㅅ': 'ㅄ',
};
const BASE_CODE = 0xAC00; // '가'
const END_CODE = 0xD7A3; // '힣'
const CHOSUNG_BASE = 588; // 초성이 사용되는 개수 = 21(JUNGSUNG_LIST) * 28(JONGSUNG_LIST) = 588
const JUNGSUNG_BASE = 28; // JONGSUNG_LIST.length
// 유니코드 값 = (초성 인덱스 × 중성 개수 × 종성 개수) + (중성 인덱스 × 종성 개수) + 종성 인덱스 + BASE_CODE

export function isNewLine(text: string): boolean {
  return /\n/.test(text);
}
export function isDot(text: string): boolean {
  return /\./.test(text);
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
    if (charCode < BASE_CODE || charCode > END_CODE) {
      decomposed.push([text[i]]);
      continue;
    }

    const uniValue = charCode - BASE_CODE;
    const chosungIndex = Math.floor(uniValue / CHOSUNG_BASE);
    const jungsungIndex = Math.floor((uniValue - (chosungIndex * CHOSUNG_BASE)) / JUNGSUNG_BASE);
    const jongsungIndex = uniValue % JUNGSUNG_BASE;

    let chosungString = CHOSUNG_LIST[chosungIndex];
    let jungsungString = JUNGSUNG_LIST[jungsungIndex];
    let jongsungString = JONGSUNG_LIST[jongsungIndex];
    const chosung = chosungString;
    const jungsung = (GYEOP_JUNGSUNG_LIST[jungsungString] ? GYEOP_JUNGSUNG_LIST[jungsungString] : jungsungString);
    const jongsung = (GYEOP_JONGSUNG_LIST[jongsungString] ? GYEOP_JONGSUNG_LIST[jongsungString] : jongsungString);
    decomposed.push([chosung, jungsung, jongsung].filter(jaso => jaso) as string[]);
  }

  return decomposed;
}
export function composeHangul(decomposed: string[][]): string {
  return decomposed.map(jasoArray => {
    if (jasoArray.length === 1) {
      let chosung = jasoArray[0];
      return chosung;
    } else if (jasoArray.length === 2) {
      let chosung = jasoArray[0];
      let jungsung = REVERSE_GYEOP_JUNGSUNG_LIST[jasoArray[1]] ? REVERSE_GYEOP_JUNGSUNG_LIST[jasoArray[1]] : jasoArray[1];
      const chosungIndex = CHOSUNG_LIST.indexOf(chosung);
      const jungsungIndex = JUNGSUNG_LIST.indexOf(jungsung);
      return String.fromCharCode(BASE_CODE + chosungIndex * CHOSUNG_BASE + jungsungIndex * JUNGSUNG_BASE);
    } else if (jasoArray.length === 3) {
      let chosung = jasoArray[0];
      let jungsung = REVERSE_GYEOP_JUNGSUNG_LIST[jasoArray[1]] ? REVERSE_GYEOP_JUNGSUNG_LIST[jasoArray[1]] : jasoArray[1];
      let jongsung = REVERSE_GYEOP_JONGSUNG_LIST[jasoArray[2]] ? REVERSE_GYEOP_JONGSUNG_LIST[jasoArray[2]] : jasoArray[2];
      const chosungIndex = CHOSUNG_LIST.indexOf(chosung);
      const jungsungIndex = JUNGSUNG_LIST.indexOf(jungsung);
      const jongsungIndex = JONGSUNG_LIST.indexOf(jongsung);
      return String.fromCharCode(BASE_CODE + chosungIndex * CHOSUNG_BASE + jungsungIndex * JUNGSUNG_BASE + jongsungIndex);
    }
    return '';
  }).join('');
}
function changeLast(textArr: string[], lastChar: string) {
  textArr.pop();
  textArr.push(lastChar);
  return textArr;
}


export type TypeStreamDelayOptions = {
  perHangul?: number,
  perChar?: number,
  perSpace?: number,
  perLine?: number,
  perDot?: number,
  toggle?: boolean
}
export type TypeStreamStatus = 'stopped' | 'playing' | 'done' | 'restart'
export type TypeStreamData = {
  decomposedText: string[][], charIndex: number, jasoIndex: number, lastJaso: string, isEnd?: boolean,
  status: TypeStreamStatus
}
export type TypeStreamCallback = (typing: string, stream: TypeStreamData) => void
export type TypeStreamResult = TypeStreamData & {
  textContent: string
}
export type TypeStream = (text: string, callback: TypeStreamCallback, delay?: TypeStreamDelayOptions) => Promise<TypeStreamResult>
export const delay = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
const defaultDelayOptions: TypeStreamDelayOptions = {
  perChar: 40,
  perHangul: 80,
  perSpace: 0,
  perLine: 0,
  perDot: 320,
  toggle: false
}
function createTypeStream(delayOptions?: TypeStreamDelayOptions) {
  let currentAnimationId = 0;
  let textContent = ''
  let timeout: NodeJS.Timeout | null = null;
  let currentText: string = '';
  let charIndex = 0;
  let jasoIndex = 0;
  let typeLength = 1;
  let done = false;
  let fireCount = 0;

  function restoreValues() {
    currentAnimationId = fireCount;
    textContent = ''
    timeout = null;
    currentText = '';
    charIndex = 0;
    jasoIndex = 0;
    typeLength = 1;
    done = false;
  }
  const typeStream: TypeStream =
    function typeHangulStream(text: string, callback: (typing: string, stream: TypeStreamData) => void, currentDelay?: TypeStreamDelayOptions) {
      return new Promise((resolve) => {
        const currentDelayOptions = {
          perChar: currentDelay?.perChar ?? delayOptions?.perChar ?? defaultDelayOptions.perChar,
          perHangul: currentDelay?.perHangul ?? delayOptions?.perHangul ?? defaultDelayOptions.perHangul,
          perSpace: currentDelay?.perSpace ?? delayOptions?.perSpace ?? defaultDelayOptions.perSpace,
          perLine: currentDelay?.perLine ?? delayOptions?.perLine ?? defaultDelayOptions.perLine,
          perDot: currentDelay?.perDot ?? delayOptions?.perDot ?? defaultDelayOptions.perDot,
          toggle: currentDelay?.toggle ?? delayOptions?.toggle ?? defaultDelayOptions.toggle
        }
        const thisAnimationId = ++currentAnimationId;
        fireCount = thisAnimationId;
        const decomposedText = decomposeHangul(text);

        function typeCharacter() {
          if (charIndex < decomposedText.length) {
            const word = decomposedText[charIndex];
            const prevWord = charIndex > 0 ? decomposedText[charIndex - 1] : [];
            let currentCharJasos = word.slice(0, jasoIndex + 1);
            let currentJaso = currentCharJasos[currentCharJasos.length - 1];
            const jasoLength = currentJaso.length;
            currentJaso = jasoLength === 1 || typeLength !== 1 ? currentJaso : currentJaso[0];
            currentCharJasos = jasoLength === 1 || typeLength !== 1 ? currentCharJasos : changeLast(currentCharJasos, currentJaso);
            const afterHangulCombination = word.length > 1 && jasoIndex === word.length - 1;

            if (thisAnimationId !== currentAnimationId) {
              currentAnimationId = 0
              callback(textContent, {
                decomposedText,
                charIndex,
                jasoIndex,
                lastJaso: currentJaso,
                isEnd: false,
                status: 'stopped'
              })
              if (currentDelayOptions.toggle) {
                if (timeout) clearTimeout(timeout);
                resolve({
                  textContent,
                  decomposedText,
                  charIndex,
                  jasoIndex,
                  lastJaso: decomposedText[decomposedText.length - 1][decomposedText[decomposedText.length - 1].length - 1],
                  isEnd: false,
                  status: 'stopped'
                });
                return
              } else {
                resolve({
                  textContent,
                  decomposedText,
                  charIndex,
                  jasoIndex,
                  lastJaso: decomposedText[decomposedText.length - 1][decomposedText[decomposedText.length - 1].length - 1],
                  isEnd: false,
                  status: 'restart'
                });
                restoreValues();
                return
              }
            }


            let newLine = false;
            let endDot = false;
            let isSpaceChar = false;
            if (isSpaceCharacter(currentJaso)) isSpaceChar = true;
            if (isNewLine(currentJaso)) newLine = true;
            if (isDot(currentJaso)) endDot = true;
            const combinedChar = composeHangul([currentCharJasos]);
            if (charIndex > 0 && prevWord.length === 2 && currentCharJasos.length === 1 && isInJongSung(currentJaso)) {
              let tempLastChar = prevWord.concat(currentJaso);
              let combinedLastChar = composeHangul([tempLastChar]);
              textContent = currentText.slice(0, -1) + combinedLastChar;
            } else {
              textContent = currentText + combinedChar;
            }
            if (jasoLength === 1 || typeLength !== 1) {
              jasoIndex++;
              typeLength = 1;
            } else {
              typeLength++;
            }
            if (jasoIndex >= word.length) {
              currentText += combinedChar;
              charIndex++;
              jasoIndex = 0;
              typeLength = 1;
            }
            callback(textContent, {
              decomposedText,
              charIndex,
              jasoIndex,
              lastJaso: currentJaso,
              isEnd: false,
              status: 'playing'
            })
            timeout = setTimeout(typeCharacter, newLine ? currentDelayOptions.perLine : endDot ? currentDelayOptions.perDot : isSpaceChar ? currentDelayOptions.perSpace : afterHangulCombination ? currentDelayOptions.perHangul : currentDelayOptions.perChar);
          } else if (timeout) {
            done = true;
            currentAnimationId = 0;
            clearTimeout(timeout);
            callback(textContent, {
              decomposedText,
              charIndex,
              jasoIndex,
              lastJaso: decomposedText[decomposedText.length - 1][decomposedText[decomposedText.length - 1].length - 1],
              isEnd: true,
              status: 'done'
            })
            resolve({
              textContent,
              decomposedText,
              charIndex,
              jasoIndex,
              lastJaso: decomposedText[decomposedText.length - 1][decomposedText[decomposedText.length - 1].length - 1],
              isEnd: true,
              status: 'done'
            });
          }
        }
        if (done) restoreValues();
        typeCharacter()
      })
    }
  return typeStream
}
export default createTypeStream