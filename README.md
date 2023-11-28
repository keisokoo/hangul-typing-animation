# hangul-typing-animation

`hangul-typing-animation`은 한글 타이핑 애니메이션을 쉽게 구현할 수 있는 라이브러리입니다.

의존성이 없기에 기본적인 `DOM`이나 `Node.js` 환경은 물론, `React`, `Vue`, `Angular` 등의 프레임워크에서도 사용할 수 있습니다.

한글은 자소 단위로 분해되어 타이핑 애니메이션이 진행됩니다.

영어나 숫자는 그대로 타이핑 애니메이션이 진행됩니다.

이때 한글의 쌍자음과 쌍모음은 분리하지 않고 키보드 입력처럼 한번에 처리합니다.

하지만 겹자음과 겹모음은 따로 분리되어 처리되도록 하였습니다.

<br/><br/>

`hangul-typing-animation` is a simple hangul typing animation library.

It has no dependencies, so it can be used in basic `DOM` or `Node.js` environments, as well as in frameworks like `React`, `Vue`, and `Angular`.

Korean characters are decomposed into individual components (`jamos`) for the typing animation.

English letters and numbers are animated as they are, without decomposition.

During this process, Korean double consonants and double vowels are not separated and are treated as a single keyboard input.

However, combined consonants and vowels are separately decomposed and processed.

***
<br/><br/>
<br/><br/>

## Installation

```bash
npm install hangul-typing-animation
```
or
```bash
yarn add hangul-typing-animation
```

<br/><br/>
<br/><br/>
## Demo in React
[![hangul-typing-animation](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/elated-heisenberg-d2zd92?file=%2Fsrc%2FApp.tsx%3A39%2C42&layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clpic47vm00073b6ltahuho0g%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clpic47vl00033b6lgf5tkgah%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clpic47vl00043b6l02sstkyg%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clpilucmn000f3b6lqq8isd4a%2522%257D%252C%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clpic47vl00063b6lucqrqmxw%2522%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clpilucmn000f3b6lqq8isd4a%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522SANDBOX_ONBOARDING%2522%252C%2522id%2522%253A%2522sandbox-onboarding%2522%252C%2522mode%2522%253A%2522permanent%2522%257D%252C%257B%2522id%2522%253A%2522clpim1wnw00033b6l1xglw74r%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fsrc%252FApp.tsx%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%255D%252C%2522id%2522%253A%2522clpilucmn000f3b6lqq8isd4a%2522%252C%2522activeTabId%2522%253A%2522clpim1wnw00033b6l1xglw74r%2522%257D%252C%2522clpic47vl00033b6lgf5tkgah%2522%253A%257B%2522id%2522%253A%2522clpic47vl00033b6lgf5tkgah%2522%252C%2522activeTabId%2522%253A%2522clpic5ogw00403b6l885e06aq%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clpic47vl00023b6l63lhbes2%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fpublic%252Findex.html%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%252C%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fpackage.json%2522%252C%2522id%2522%253A%2522clpic5ogw00403b6l885e06aq%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522state%2522%253A%2522IDLE%2522%252C%2522initialSelections%2522%253A%255B%257B%2522startLineNumber%2522%253A8%252C%2522startColumn%2522%253A18%252C%2522endLineNumber%2522%253A8%252C%2522endColumn%2522%253A18%257D%255D%257D%255D%257D%252C%2522clpic47vl00063b6lucqrqmxw%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clpic47vl00053b6lgomg8nw2%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522UNASSIGNED_PORT%2522%252C%2522port%2522%253A0%252C%2522path%2522%253A%2522%2522%257D%255D%252C%2522id%2522%253A%2522clpic47vl00063b6lucqrqmxw%2522%252C%2522activeTabId%2522%253A%2522clpic47vl00053b6lgomg8nw2%2522%257D%252C%2522clpic47vl00043b6l02sstkyg%2522%253A%257B%2522tabs%2522%253A%255B%255D%252C%2522id%2522%253A%2522clpic47vl00043b6l02sstkyg%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D)
<br/><br/>

## Usage for typing animation (타이핑 애니메이션)

```html
<div id="typing"></div>
```

<br/><br/>

```typescript
import { createTypeStream, delay } from 'hangul-typing-animation';

const typeStream = createTypeStream({
  perChar: 40,
  perHangul: 80,
  perSpace: 0,
  perLine: 0,
  perDot: 320
});

const runAnimation = async () => {
  await delay(2000)
  await typeStream(
      `쌍자음과 쌍모음은 분리하지 않고 키보드 입력처럼 한번에 처리합니다.
      겹자음과 겹모읍은 따로 분리되어 처리됩니다.
      겹자모의 예는 다음과 같습니다.
      꿹뷁뷹같은 글자, 읽다, 읎다. 핥다. 앉거나, 없다.
      English or number also supported.
      1234567890
      예제 끝!`,
    async (typing) => {
      document.getElementById('typing').innerHTML = typing;
    }
  )
}
runAnimation()
```

#### DelayOptions

전체 (milliseconds) 단위 입니다.

All options are in milliseconds.

- **`perChar`** : 입력 문자 하나당 딜레이 시간 (Default: 40), per input char delay time (Default: 40), 
- **`perHangul`** : 한글의 완성형 하나당 딜레이 시간 (Default: 80), per composed hangul delay time (Default: 80),
- **`perSpace`** : 공백 하나당 딜레이 시간 (Default: 0), per space delay time (Default: 0),
- **`perLine`** : 줄바꿈 하나당 딜레이 시간 (Default: 0), per line delay time (Default: 0),
- **`perDot`** : 마침표 하나당 딜레이 시간 (Default: 320), per dot delay time (Default: 320)

<br/><br/>
<br/><br/>
<br/><br/>

## Usage for decompose and compose hangul(Optional) (한글 자소 분해, 재결합)

애니메이션을 위해 한글을 자소 단위로 분해하고, 애니메이션이 끝난 후에는 다시 합쳐야 할 경우 사용합니다.

쌍자음과 쌍모음은 분리하지 않고 키보드 입력처럼 한번에 처리합니다.

하지만 겹자음과 겹모음은 따로 분리되어 처리되도록 하였습니다.

```typescript
import { decomposeHangul, composeHangul } from 'hangul-typing-animation';

const decomposedText = decomposeHangul('앉았다.')
console.log(decomposedText)
// result [["ㅇ","ㅏ","ㄴㅈ"],["ㅇ","ㅏ","ㅆ"],["ㄷ","ㅏ"],["."]];
const composedText = composeHangul(decomposedText)
console.log(composedText)
// result 앉았다.
```

<br/><br/>
<br/><br/>
<br/><br/>

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
  
