import { Meta } from '@storybook/react'
import React, { useEffect, useState } from 'react'
import { createTypeStream } from '../'
import './Demo.css'

interface CursorProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  typing?: boolean
  char?: string | JSX.Element
}

const Cursor = ({ typing, char = '|', className, ...props }: CursorProps) => {
  const cursor = React.useRef<HTMLSpanElement>(null)
  const timeout = React.useRef<NodeJS.Timeout>()

  useEffect(() => {
    function endBlink() {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }

      if (cursor.current) {
        cursor.current.style.opacity = '1'
      }
    }
    function blink() {
      if (cursor.current) {
        cursor.current.style.opacity =
          cursor.current.style.opacity === '0' ? '1' : '0'
      }
      timeout.current = setTimeout(blink, 500)
    }
    if (typing) {
      endBlink()
    } else {
      blink()
    }
    return () => {
      endBlink()
    }
  }, [typing])
  return (
    <span ref={cursor} className={'cursor-wrap ' + className} {...props}>
      <span className="cursor">{char}</span>
    </span>
  )
}

const typeStream = createTypeStream({
  perChar: 80,
  perSpace: 0,
  perHangul: 80,
  perLine: 0,
  perDot: 300,
})

export const Demo: React.FC = () => {
  const [value, setValue] = React.useState('')
  const [isStream, set_isStream] = useState<boolean>(false)
  const [isEnd, set_isEnd] = useState<boolean>(false)
  const [streamStatus, set_streamStatus] = useState<
    'stopped' | 'playing' | 'done'
  >('stopped')
  const runTyping = async () => {
    set_isEnd(false)
    setValue('')
    set_isStream(false)
    const result = await typeStream(
      `쌍자음과 쌍모음은 분리하지 않고 키보드 입력처럼 한번에 처리합니다.
      겹자음과 겹모읍은 따로 분리되어 처리됩니다.
      겹자모의 예는 다음과 같습니다.
      꿹뷁뷹같은 글자, 읽다, 읎다. 핥다. 앉거나, 없다.
      English or number also supported.
      1234567890
      예제 끝!`,
      async (result, stream) => {
        setValue(result)
        set_isStream(!stream.isEnd)
        set_streamStatus(stream.status)
      }
    )
    console.log('result', result)
    set_isEnd(true)
  }
  return (
    <div style={{ whiteSpace: 'pre-line', width: '500px' }}>
      <button onClick={runTyping}>{streamStatus}</button>
      <h1>
        {value}
        {!isEnd && <Cursor typing={isStream} style={{ color: 'blue' }} />}
      </h1>
    </div>
  )
}

const meta = {
  title: 'Demo',
  component: Demo,
  parameters: {
    layout: 'centered',
  },
  tags: [''],
  argTypes: {},
} satisfies Meta<typeof Demo>

export default meta
