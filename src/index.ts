

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
function decomposeHangul(text: string): string[][] {

  let decomposed: string[][] = [];

  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);

    if (charCode < BASE_CODE || charCode > 0xD7A3) {
      // 한글이 아닌 경우
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
function containsNewlineOrDot(text: string): boolean {
  return /\n|\./.test(text);
}
function isNonCharacterOrNumber(char: string): boolean {
  return /[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9]/.test(char);
}
function isIncludeJongsung(text: string): boolean {
  return JONGSUNG_LIST.includes(text);
}
function isSpaceCharacter(text: string): boolean {
  return text === ' ' || text === '\n';
}
// 사용 예시
function combineHangul(decomposed: string[][]): string {
  return decomposed.map(jasoArray => {
    if (jasoArray.length === 1) {
      // 초성만 있는 경우
      return jasoArray[0];
    } else if (jasoArray.length === 2) {
      // 초성과 중성이 있는 경우
      const chosungIndex = CHOSUNG_LIST.indexOf(jasoArray[0]);
      const jungsungIndex = JUNGSUNG_LIST.indexOf(jasoArray[1]);
      return String.fromCharCode(BASE_CODE + chosungIndex * CHOSUNG_BASE + jungsungIndex * JUNGSUNG_BASE);
    } else if (jasoArray.length === 3) {
      // 초성, 중성, 종성이 모두 있는 경우
      const chosungIndex = CHOSUNG_LIST.indexOf(jasoArray[0]);
      const jungsungIndex = JUNGSUNG_LIST.indexOf(jasoArray[1]);
      const jongsungIndex = JONGSUNG_LIST.indexOf(jasoArray[2]);
      return String.fromCharCode(BASE_CODE + chosungIndex * CHOSUNG_BASE + jungsungIndex * JUNGSUNG_BASE + jongsungIndex);
    }

    return '';
  }).join('');
}


function typeStream(text: string) {
  const decomposedText = decomposeHangul(text);
  let typingElement = {
    textContent: ''
  }

  let currentText: string = '';
  let charIndex = 0;
  let jasoIndex = 0;

  function typeCharacter() {
    if (charIndex < decomposedText.length) {
      const word = decomposedText[charIndex];
      const prevWord = charIndex > 0 ? decomposedText[charIndex - 1] : [];
      const currentCharJasos = word.slice(0, jasoIndex + 1);
      const currentJaso = currentCharJasos[currentCharJasos.length - 1];
      const isWordLast = word.length > 1 && jasoIndex === word.length - 1;
      let newLineOrEnd = false;
      let isSpaceChar = false;
      if (isSpaceCharacter(currentJaso)) isSpaceChar = true;
      if (containsNewlineOrDot(currentJaso)) newLineOrEnd = true;
      const combinedChar = combineHangul([currentCharJasos]);
      if (charIndex > 0 && prevWord.length === 2 && currentCharJasos.length === 1 && isIncludeJongsung(currentJaso)) {
        let tempLastChar = prevWord.concat(currentJaso);
        let combinedLastChar = combineHangul([tempLastChar]);
        typingElement.textContent = currentText.slice(0, -1) + combinedLastChar;
      } else {
        typingElement.textContent = currentText + combinedChar;
      }


      console.log('typingElement.textContent', typingElement.textContent);
      jasoIndex++;
      if (jasoIndex >= word.length) {
        currentText += combinedChar;
        charIndex++;
        jasoIndex = 0;
      }
      setTimeout(typeCharacter, newLineOrEnd ? 300 : isSpaceChar ? 120 : isWordLast ? 80 : 40); // 200ms 간격으로 다음 자소를 타이핑
    }
  }
  typeCharacter()
}

typeStream(`안녕하세요, 밥이빱이
되었습니다.
그리고 무궁화 꽃이 피었습니다. and You are the best!
1337`); // 타이핑 애니메이션 시작
