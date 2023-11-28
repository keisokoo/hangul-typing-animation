"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = exports.composeHangul = exports.decomposeHangul = exports.isSpaceCharacter = exports.isInJongSung = exports.isDot = exports.isNewLine = void 0;
var CHOSUNG_LIST = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
]; // 19
var JUNGSUNG_LIST = [
    'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
]; // 21
var JONGSUNG_LIST = [
    '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
]; // 28
var GYEOP_JUNGSUNG_LIST = {
    'ㅘ': 'ㅗㅏ',
    'ㅙ': 'ㅗㅐ',
    'ㅚ': 'ㅗㅣ',
    'ㅝ': 'ㅜㅓ',
    'ㅞ': 'ㅜㅔ',
    'ㅟ': 'ㅜㅣ',
    'ㅢ': 'ㅡㅣ',
};
var GYEOP_JONGSUNG_LIST = {
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
};
var REVERSE_GYEOP_JUNGSUNG_LIST = {
    'ㅗㅏ': 'ㅘ',
    'ㅗㅐ': 'ㅙ',
    'ㅗㅣ': 'ㅚ',
    'ㅜㅓ': 'ㅝ',
    'ㅜㅔ': 'ㅞ',
    'ㅜㅣ': 'ㅟ',
    'ㅡㅣ': 'ㅢ',
};
var REVERSE_GYEOP_JONGSUNG_LIST = {
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
var BASE_CODE = 0xAC00; // '가'
var END_CODE = 0xD7A3; // '힣'
var CHOSUNG_BASE = 588; // 초성이 사용되는 개수 = 21(JUNGSUNG_LIST) * 28(JONGSUNG_LIST) = 588
var JUNGSUNG_BASE = 28; // JONGSUNG_LIST.length
// 유니코드 값 = (초성 인덱스 × 중성 개수 × 종성 개수) + (중성 인덱스 × 종성 개수) + 종성 인덱스 + BASE_CODE
function isNewLine(text) {
    return /\n/.test(text);
}
exports.isNewLine = isNewLine;
function isDot(text) {
    return /\./.test(text);
}
exports.isDot = isDot;
function isInJongSung(text) {
    return JONGSUNG_LIST.includes(text);
}
exports.isInJongSung = isInJongSung;
function isSpaceCharacter(text) {
    return text === ' ' || text === '\s';
}
exports.isSpaceCharacter = isSpaceCharacter;
function decomposeHangul(text) {
    var decomposed = [];
    for (var i = 0; i < text.length; i++) {
        var charCode = text.charCodeAt(i);
        if (charCode < BASE_CODE || charCode > END_CODE) {
            decomposed.push([text[i]]);
            continue;
        }
        var uniValue = charCode - BASE_CODE;
        var chosungIndex = Math.floor(uniValue / CHOSUNG_BASE);
        var jungsungIndex = Math.floor((uniValue - (chosungIndex * CHOSUNG_BASE)) / JUNGSUNG_BASE);
        var jongsungIndex = uniValue % JUNGSUNG_BASE;
        var chosungString = CHOSUNG_LIST[chosungIndex];
        var jungsungString = JUNGSUNG_LIST[jungsungIndex];
        var jongsungString = JONGSUNG_LIST[jongsungIndex];
        var chosung = chosungString;
        var jungsung = (GYEOP_JUNGSUNG_LIST[jungsungString] ? GYEOP_JUNGSUNG_LIST[jungsungString] : jungsungString);
        var jongsung = (GYEOP_JONGSUNG_LIST[jongsungString] ? GYEOP_JONGSUNG_LIST[jongsungString] : jongsungString);
        decomposed.push([chosung, jungsung, jongsung].filter(function (jaso) { return jaso; }));
    }
    return decomposed;
}
exports.decomposeHangul = decomposeHangul;
function composeHangul(decomposed) {
    return decomposed.map(function (jasoArray) {
        if (jasoArray.length === 1) {
            var chosung = jasoArray[0];
            return chosung;
        }
        else if (jasoArray.length === 2) {
            var chosung = jasoArray[0];
            var jungsung = REVERSE_GYEOP_JUNGSUNG_LIST[jasoArray[1]] ? REVERSE_GYEOP_JUNGSUNG_LIST[jasoArray[1]] : jasoArray[1];
            var chosungIndex = CHOSUNG_LIST.indexOf(chosung);
            var jungsungIndex = JUNGSUNG_LIST.indexOf(jungsung);
            return String.fromCharCode(BASE_CODE + chosungIndex * CHOSUNG_BASE + jungsungIndex * JUNGSUNG_BASE);
        }
        else if (jasoArray.length === 3) {
            var chosung = jasoArray[0];
            var jungsung = REVERSE_GYEOP_JUNGSUNG_LIST[jasoArray[1]] ? REVERSE_GYEOP_JUNGSUNG_LIST[jasoArray[1]] : jasoArray[1];
            var jongsung = REVERSE_GYEOP_JONGSUNG_LIST[jasoArray[2]] ? REVERSE_GYEOP_JONGSUNG_LIST[jasoArray[2]] : jasoArray[2];
            var chosungIndex = CHOSUNG_LIST.indexOf(chosung);
            var jungsungIndex = JUNGSUNG_LIST.indexOf(jungsung);
            var jongsungIndex = JONGSUNG_LIST.indexOf(jongsung);
            return String.fromCharCode(BASE_CODE + chosungIndex * CHOSUNG_BASE + jungsungIndex * JUNGSUNG_BASE + jongsungIndex);
        }
        return '';
    }).join('');
}
exports.composeHangul = composeHangul;
function changeLast(textArr, lastChar) {
    textArr.pop();
    textArr.push(lastChar);
    return textArr;
}
var delay = function (milliseconds) {
    return new Promise(function (resolve) { return setTimeout(resolve, milliseconds); });
};
exports.delay = delay;
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
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            var currentDelayOptions = {
                perChar: (_b = (_a = currentDelay === null || currentDelay === void 0 ? void 0 : currentDelay.perChar) !== null && _a !== void 0 ? _a : delayOptions === null || delayOptions === void 0 ? void 0 : delayOptions.perChar) !== null && _b !== void 0 ? _b : defaultDelayOptions.perChar,
                perHangul: (_d = (_c = currentDelay === null || currentDelay === void 0 ? void 0 : currentDelay.perHangul) !== null && _c !== void 0 ? _c : delayOptions === null || delayOptions === void 0 ? void 0 : delayOptions.perHangul) !== null && _d !== void 0 ? _d : defaultDelayOptions.perHangul,
                perSpace: (_f = (_e = currentDelay === null || currentDelay === void 0 ? void 0 : currentDelay.perSpace) !== null && _e !== void 0 ? _e : delayOptions === null || delayOptions === void 0 ? void 0 : delayOptions.perSpace) !== null && _f !== void 0 ? _f : defaultDelayOptions.perSpace,
                perLine: (_h = (_g = currentDelay === null || currentDelay === void 0 ? void 0 : currentDelay.perLine) !== null && _g !== void 0 ? _g : delayOptions === null || delayOptions === void 0 ? void 0 : delayOptions.perLine) !== null && _h !== void 0 ? _h : defaultDelayOptions.perLine,
                perDot: (_k = (_j = currentDelay === null || currentDelay === void 0 ? void 0 : currentDelay.perDot) !== null && _j !== void 0 ? _j : delayOptions === null || delayOptions === void 0 ? void 0 : delayOptions.perDot) !== null && _k !== void 0 ? _k : defaultDelayOptions.perDot
            };
            var thisAnimationId = ++currentAnimationId;
            var decomposedText = decomposeHangul(text);
            var textContent = '';
            var currentText = '';
            var charIndex = 0;
            var jasoIndex = 0;
            var timeout;
            var typeLength = 1;
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
                    var jasoLength = currentJaso.length;
                    currentJaso = jasoLength === 1 || typeLength !== 1 ? currentJaso : currentJaso[0];
                    currentCharJasos = jasoLength === 1 || typeLength !== 1 ? currentCharJasos : changeLast(currentCharJasos, currentJaso);
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
                    if (jasoLength === 1 || typeLength !== 1) {
                        jasoIndex++;
                        typeLength = 1;
                    }
                    else {
                        typeLength++;
                    }
                    if (jasoIndex >= word.length) {
                        currentText += combinedChar;
                        charIndex++;
                        jasoIndex = 0;
                        typeLength = 1;
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
exports.default = createTypeStream;
