import { __assign } from "tslib";
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
export function isNewLine(text) {
    return /\n/.test(text);
}
export function isDot(text) {
    return /\./.test(text);
}
export function isInJongSung(text) {
    return JONGSUNG_LIST.includes(text);
}
export function isSpaceCharacter(text) {
    return text === ' ' || text === '\s';
}
export function decomposeHangul(text) {
    var decomposed = [];
    for (var i = 0; i < text.length; i++) {
        var charCode = text.charCodeAt(i);
        if (charCode < BASE_CODE || charCode > 0xD7A3) {
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
export function composeHangul(decomposed) {
    return decomposed.map(function (jasoArray) {
        if (jasoArray.length === 1) {
            return jasoArray[0];
        }
        else if (jasoArray.length === 2) {
            var chosungIndex = CHOSUNG_LIST.indexOf(jasoArray[0]);
            var jungsungIndex = JUNGSUNG_LIST.indexOf(jasoArray[1]);
            return String.fromCharCode(BASE_CODE + chosungIndex * CHOSUNG_BASE + jungsungIndex * JUNGSUNG_BASE);
        }
        else if (jasoArray.length === 3) {
            var chosungIndex = CHOSUNG_LIST.indexOf(jasoArray[0]);
            var jungsungIndex = JUNGSUNG_LIST.indexOf(jasoArray[1]);
            var jongsungIndex = JONGSUNG_LIST.indexOf(jasoArray[2]);
            return String.fromCharCode(BASE_CODE + chosungIndex * CHOSUNG_BASE + jungsungIndex * JUNGSUNG_BASE + jongsungIndex);
        }
        return '';
    }).join('');
}
export var delay = function (milliseconds) {
    return new Promise(function (resolve) { return setTimeout(resolve, milliseconds); });
};
var defaultDelayOptions = {
    perChar: 40,
    perHangul: 80,
    perSpace: 0,
    perLine: 0,
    perDot: 320
};
function createTypeStream(delayOptions) {
    var currentAnimationId = 0;
    var typeStream = function typeHangulStream(text, callback, currentDelay) {
        return new Promise(function (resolve, reject) {
            var currentDelayOptions = __assign(__assign({ defaultDelayOptions: defaultDelayOptions }, delayOptions), currentDelay);
            var thisAnimationId = ++currentAnimationId;
            var decomposedText = decomposeHangul(text);
            var textContent = '';
            var currentText = '';
            var charIndex = 0;
            var jasoIndex = 0;
            var timeout;
            function typeCharacter() {
                if (thisAnimationId !== currentAnimationId) {
                    reject(new Error('Animation canceled'));
                    return clearTimeout(timeout);
                }
                if (charIndex < decomposedText.length) {
                    var word = decomposedText[charIndex];
                    var prevWord = charIndex > 0 ? decomposedText[charIndex - 1] : [];
                    var currentCharJasos = word.slice(0, jasoIndex + 1);
                    var currentJaso = currentCharJasos[currentCharJasos.length - 1];
                    var afterHangulCombination = word.length > 1 && jasoIndex === word.length - 1;
                    var newLine = false;
                    var endDot = false;
                    var isSpaceChar = false;
                    if (isSpaceCharacter(currentJaso))
                        isSpaceChar = true;
                    if (isNewLine(currentJaso))
                        newLine = true;
                    if (isDot(currentJaso))
                        endDot = true;
                    var combinedChar = composeHangul([currentCharJasos]);
                    if (charIndex > 0 && prevWord.length === 2 && currentCharJasos.length === 1 && isInJongSung(currentJaso)) {
                        var tempLastChar = prevWord.concat(currentJaso);
                        var combinedLastChar = composeHangul([tempLastChar]);
                        textContent = currentText.slice(0, -1) + combinedLastChar;
                    }
                    else {
                        textContent = currentText + combinedChar;
                    }
                    jasoIndex++;
                    if (jasoIndex >= word.length) {
                        currentText += combinedChar;
                        charIndex++;
                        jasoIndex = 0;
                    }
                    timeout = setTimeout(typeCharacter, newLine ? currentDelayOptions.perLine : endDot ? currentDelayOptions.perDot : isSpaceChar ? currentDelayOptions.perSpace : afterHangulCombination ? currentDelayOptions.perHangul : currentDelayOptions.perChar);
                    callback(textContent, {
                        decomposedText: decomposedText,
                        charIndex: charIndex,
                        jasoIndex: jasoIndex,
                        lastJaso: currentJaso,
                        isEnd: false
                    });
                }
                else if (timeout) {
                    callback(textContent, {
                        decomposedText: decomposedText,
                        charIndex: charIndex,
                        jasoIndex: jasoIndex,
                        lastJaso: decomposedText[decomposedText.length - 1][decomposedText[decomposedText.length - 1].length - 1],
                        isEnd: true
                    });
                    clearTimeout(timeout);
                    resolve({
                        textContent: textContent,
                        decomposedText: decomposedText,
                        charIndex: charIndex,
                        jasoIndex: jasoIndex,
                        lastJaso: decomposedText[decomposedText.length - 1][decomposedText[decomposedText.length - 1].length - 1],
                        isEnd: true
                    });
                }
            }
            typeCharacter();
        });
    };
    return typeStream;
}
export default createTypeStream;
