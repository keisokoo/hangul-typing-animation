"use strict";
var CHOSUNG_LIST = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];
var JUNGSUNG_LIST = [
    'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
];
var JONGSUNG_LIST = [
    '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];
var BASE_CODE = 0xAC00;
var CHOSUNG_BASE = 588;
var JUNGSUNG_BASE = 28;
function decomposeHangul(text) {
    var decomposed = [];
    for (var i = 0; i < text.length; i++) {
        var charCode = text.charCodeAt(i);
        if (charCode < BASE_CODE || charCode > 0xD7A3) {
            // 한글이 아닌 경우
            decomposed.push([text[i]]);
            continue;
        }
        var uniValue = charCode - BASE_CODE;
        var chosungIndex = Math.floor(uniValue / CHOSUNG_BASE);
        var jungsungIndex = Math.floor((uniValue - (chosungIndex * CHOSUNG_BASE)) / JUNGSUNG_BASE);
        var jongsungIndex = uniValue % JUNGSUNG_BASE;
        var chosung = CHOSUNG_LIST[chosungIndex];
        var jungsung = JUNGSUNG_LIST[jungsungIndex];
        var jongsung = JONGSUNG_LIST[jongsungIndex];
        decomposed.push([chosung, jungsung, jongsung].filter(function (jaso) { return jaso; }));
    }
    return decomposed;
}
function containsNewlineOrDot(text) {
    // 줄바꿈 또는 마침표가 있는지 확인하는 정규 표현식
    return /\n|\./.test(text);
}
function isNonCharacterOrNumber(char) {
    // 영어 알파벳, 한글 (완성형, 자모 포함), 숫자가 아닌 경우를 찾는 정규 표현식
    return /[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9]/.test(char);
}
function isIncludeJongsung(text) {
    return JONGSUNG_LIST.includes(text);
}
function isSpaceCharacter(text) {
    return text === ' ' || text === '\n';
}
// 사용 예시
function combineHangul(decomposed) {
    return decomposed.map(function (jasoArray) {
        if (jasoArray.length === 1) {
            // 초성만 있는 경우
            return jasoArray[0];
        }
        else if (jasoArray.length === 2) {
            // 초성과 중성이 있는 경우
            var chosungIndex = CHOSUNG_LIST.indexOf(jasoArray[0]);
            var jungsungIndex = JUNGSUNG_LIST.indexOf(jasoArray[1]);
            return String.fromCharCode(BASE_CODE + chosungIndex * CHOSUNG_BASE + jungsungIndex * JUNGSUNG_BASE);
        }
        else if (jasoArray.length === 3) {
            // 초성, 중성, 종성이 모두 있는 경우
            var chosungIndex = CHOSUNG_LIST.indexOf(jasoArray[0]);
            var jungsungIndex = JUNGSUNG_LIST.indexOf(jasoArray[1]);
            var jongsungIndex = JONGSUNG_LIST.indexOf(jasoArray[2]);
            return String.fromCharCode(BASE_CODE + chosungIndex * CHOSUNG_BASE + jungsungIndex * JUNGSUNG_BASE + jongsungIndex);
        }
        return '';
    }).join('');
}
function typeStream(text) {
    var decomposedText = decomposeHangul(text); // 이전에 만든 decomposeHangul 함수 사용
    var typingElement = {
        textContent: ''
    };
    var currentText = '';
    var charIndex = 0;
    var jasoIndex = 0;
    function typeCharacter() {
        if (charIndex < decomposedText.length) {
            var word = decomposedText[charIndex];
            var prevWord = charIndex > 0 ? decomposedText[charIndex - 1] : [];
            var currentCharJasos = word.slice(0, jasoIndex + 1);
            var currentJaso = currentCharJasos[currentCharJasos.length - 1];
            var isWordLast = word.length > 1 && jasoIndex === word.length - 1;
            var newLineOrEnd = false;
            var isSpaceChar = false;
            if (isSpaceCharacter(currentJaso))
                isSpaceChar = true;
            if (containsNewlineOrDot(currentJaso))
                newLineOrEnd = true;
            var combinedChar = combineHangul([currentCharJasos]);
            // 이전 글자가 종성을 가질 수 있는지, 현재 글자가 초성만 있는지 확인
            if (charIndex > 0 && prevWord.length === 2 && currentCharJasos.length === 1 && isIncludeJongsung(currentJaso)) {
                // 이전 글자에 현재 초성을 종성으로 추가
                var tempLastChar = prevWord.concat(currentJaso);
                var combinedLastChar = combineHangul([tempLastChar]);
                typingElement.textContent = currentText.slice(0, -1) + combinedLastChar;
            }
            else {
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
    typeCharacter();
}
typeStream("\uC548\uB155\uD558\uC138\uC694, \uBC25\uC774\uBE71\uC774\n\uB418\uC5C8\uC2B5\uB2C8\uB2E4.\n\uADF8\uB9AC\uACE0 \uBB34\uAD81\uD654 \uAF43\uC774 \uD53C\uC5C8\uC2B5\uB2C8\uB2E4. and You are the best!\n1337"); // 타이핑 애니메이션 시작
