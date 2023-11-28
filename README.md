# hangul-typing-animation

`hangul-typing-animation` is a simple hangul typing animation library.

## Installation

```bash
npm install hangul-typing-animation
```
or
```bash
yarn add hangul-typing-animation
```

## Usage for decompose and compose hangul (한글 자소 분해, 재결합)

```typescript
import { decomposeHangul, composeHangul } from 'hangul-typing-animation';

const decomposedText = decomposeHangul('안녕하세요. abc 123.')
console.log(decomposedText)
// result
// [
//   ['ㅇ', 'ㅏ', 'ㄴ'],
//   ['ㄴ', 'ㅕ', 'ㅇ'],
//   ['ㅎ', 'ㅏ'],
//   ['ㅅ', 'ㅔ'],
//   ['ㅇ', 'ㅛ'],
//   ['.'],
//   [' '],
//   ['a'],
//   ['b'],
//   ['c'],
//   [' '],
//   ['1'],
//   ['2'],
//   ['3'],
//   ['.'],
// ]
const composedText = composeHangul(decomposedText)
console.log(composedText)
// result 안녕하세요. abc 123.
```


## Usage for typing animation

```typescript

```html
<div id="typing"></div>
```

```typescript
import { createTypeStream, delay } from 'hangul-typing-animation';

const typeStream = createTypeStream();

const runAnimation = async () => {
  await delay(2000)
  await typeStream(
    `무궁화 꽃이 피었습니다.
    동해물과 백두산이 마르고 닳도록
    하느님이 보우하사 우리나라 만세.
    Korea history is very long. about 5000 years.
    Korean is a language isolate spoken mainly in South Korea and North Korea by about 63 million people.`,
    async (result, stream) => {
      document.getElementById('typing').innerHTML = result;
    }
  )
}
runAnimation()
```


## Reference
```tsx
type TypeStreamDelayOptions = {
  perHangul?: number,
  perChar?: number,
  perSpace?: number,
  perLine?: number,
  perDot?: number,
}

type CreateTypeStream = (options?: TypeStreamDelayOptions) => TypeStream;

type TypeStreamResult = {
  textContent: string,
  decomposedText: string[][],
  charIndex: number,
  jasoIndex: number,
  lastJaso: string,
  isEnd: boolean
}

type TypeStream = (
  text: string,
  callback: (string: string, stream: {
  decomposedText: string[][], charIndex: number, jasoIndex: number, lastJaso: string, isEnd?: boolean
}) => void
) => Promise<TypeStreamResult>;

```

### `createTypeStream(options?: TypeStreamDelayOptions): TypeStream`
  - **`options`**_`: TypeStreamDelayOptions`_&mdash; Delay times after word, char, space, line, dot. (milliseconds) (각, 단어, 문자, 공백, 줄바꿈, 마침표 후 딜레이 시간. (밀리초))
  - **`return`**_`: TypeStream`_&mdash; TypeStream function. (TypeStream 함수 반환)

### `TypeStream(text: string, callback: (typing: string, stream: { decomposedText: string[][], charIndex: number, jasoIndex: number, lastJaso: string, isEnd?: boolean }) => void): Promise<TypeStreamResult>`
  - **`text`**_`: string`_&mdash; Text to type. (타이핑할 텍스트)
  - **`callback`**_`: (string: string, stream: { decomposedText: string[][], charIndex: number, jasoIndex: number, lastJaso: string, isEnd?: boolean }) => void`_&mdash; Callback function. `typing` is returns current typing(animation) string. `stream` is current typing stream data. (콜백 함수. `typing`은 현재 타이핑(애니메이션) 문자열을 반환합니다. `stream`은 현재 타이핑 스트림 데이터입니다.)
  - **`return`**_`: Promise<TypeStreamResult>`_&mdash; The Promise resolves with the final TypeStream data upon completion of the animation. (애니메이션이 완료되면 Promise는 최종 TypeStream 데이터를 반환합니다.)


  ### `decomposeHangul(text: string): string[][]`
  - **`text`**_`: string`_&mdash; Text to decompose(for korean). (분해할 텍스트)
  - **`return`**_`: string[][]`_&mdash; Decomposed text(for korean). (분해된 텍스트, 한글 자소로 분해된 텍스트) - [초성, 중성, 종성][]
  
  ### `composeHangul(decomposedText: string[][]): string`
  - **`decomposedText`**_`: string[][]`_&mdash; Decomposed text(for korean). (분해된 텍스트, 한글 자소로 분해된 텍스트) - [초성, 중성, 종성][]
  - **`return`**_`: string`_&mdash; Composed text(for korean). (분해된 텍스트를 합친 텍스트)

  ### `delay(ms: number): Promise<void>`
  - **`ms`**_`: number`_&mdash; Delay time. (딜레이 시간)
  
