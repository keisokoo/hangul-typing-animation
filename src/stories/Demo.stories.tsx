import { Meta } from '@storybook/react'
import React, { useEffect, useState } from 'react'
import { delay, createTypeStream } from '../'

interface CursorProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  typing?: boolean
  char?: string | JSX.Element
}

const Cursor = ({ typing, char = '|', ...props }: CursorProps) => {
  const cursor = React.useRef<HTMLSpanElement>(null)
  const timeout = React.useRef<NodeJS.Timeout>()
  const [hide, set_hide] = useState<boolean>(false)

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
  useEffect(() => {
    function destroy() {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }
    }
    if (hide) {
      destroy()
    }
    return () => {
      destroy()
    }
  }, [])
  if (hide) {
    return null
  }
  return (
    <span ref={cursor} {...props}>
      {char}
    </span>
  )
}

const typeStream = createTypeStream({
  perChar: 10,
  perWord: 20,
  perHangul: 20,
  perLine: 500,
  perDot: 100,
})
export const Demo: React.FC = () => {
  const [value, setValue] = React.useState('')
  const [isStream, set_isStream] = useState<boolean>(false)
  return (
    <div style={{ whiteSpace: 'pre-line', width: '500px' }}>
      <button
        onClick={async () => {
          await delay(2000)
          typeStream(
            `안녕하세요, 밥이빱이
되었습니다.
그리고 무궁화 꽃이 피었습니다. and You are the best!
1337`,
            (result, stream) => {
              setValue(result)
              set_isStream(!stream.isEnd)
            }
          )
        }}
      >
        Run
      </button>
      <h1>
        {value}
        {<Cursor typing={isStream} style={{ color: 'red' }} />}
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
