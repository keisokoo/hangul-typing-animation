import { composeHangul, decomposeHangul, isInJongSung, isDot, isNewLine, isSpaceCharacter, createTypeStream } from "../src";

jest.useFakeTimers();

describe('decomposeHangul', () => {
  it('should be defined', () => {
    expect(decomposeHangul).toBeDefined();
  })
  it('should be ㅇㅏㄴㄴㅕㅇ', () => {
    const result = decomposeHangul('안녕');
    expect(result).toStrictEqual([['ㅇ', 'ㅏ', 'ㄴ'], ['ㄴ', 'ㅕ', 'ㅇ']]);
  })
})

describe('composeHangul', () => {
  it('should be defined', () => {
    expect(composeHangul).toBeDefined();
  })
  it('should be 안녕', () => {
    const result = composeHangul([['ㅇ', 'ㅏ', 'ㄴ'], ['ㄴ', 'ㅕ', 'ㅇ']]);
    expect(result).toEqual('안녕');
  })
  it('should be 안녕ㅎ', () => {
    const result = composeHangul([['ㅇ', 'ㅏ', 'ㄴ'], ['ㄴ', 'ㅕ', 'ㅇ'], ['ㅎ']]);
    expect(result).toEqual('안녕ㅎ');
  })
})

describe('typeStream', () => {
  it('should be defined', () => {
    const typeStream = createTypeStream();
    expect(typeStream).toBeDefined();
  })
  it('result should be 안녕, lastJaso is ㅇ', () => {
    let result = '';
    let lastJaso = ''
    const typeStream = createTypeStream({
      perChar: 0,
      perHangul: 0,
      perWord: 0,
      perDot: 0,
      perLine: 0
    });
    typeStream('안녕', (value, stream) => {
      result = value;
      lastJaso = stream.lastJaso
    });
    jest.advanceTimersByTime(350)
    expect(result).toEqual('안녕');
    expect(lastJaso).toEqual('ㅇ');
  })
})

describe('isNewLinet', () => {
  it('should be defined', () => {
    expect(isNewLine).toBeDefined();
  })
  it('"-" should be false', () => {
    expect(isNewLine('-')).toBeFalsy();
  })
  it('"\\n" should be true', () => {
    expect(isNewLine('\n')).toBeTruthy();
  })
})
describe('isDot', () => {
  it('should be defined', () => {
    expect(isDot).toBeDefined();
  })
  it('"-" should be false', () => {
    expect(isDot('-')).toBeFalsy();
  })
  it('"\\n" should be true', () => {
    expect(isDot('.')).toBeTruthy();
  })
})
describe('isInJongSung', () => {
  it('should be defined', () => {
    expect(isInJongSung).toBeDefined();
  })
  it('"ㅃ" should be false', () => {
    expect(isInJongSung('ㅃ')).toBeFalsy();
  })
  it('"ㅂ" should be true', () => {
    expect(isInJongSung('ㅂ')).toBeTruthy();
  })
  it('"ㅈ" should be true', () => {
    expect(isInJongSung('ㅈ')).toBeTruthy();
  })
})
describe('isSpaceCharacter', () => {
  it('should be defined', () => {
    expect(isSpaceCharacter).toBeDefined();
  })
  it('"ㅃ" should be false', () => {
    expect(isSpaceCharacter('ㅃ')).toBeFalsy();
  })
  it('" " should be true', () => {
    expect(isSpaceCharacter(' ')).toBeTruthy();
  })
  it('"\\s" should be true', () => {
    expect(isSpaceCharacter('\s')).toBeTruthy();
  })
})