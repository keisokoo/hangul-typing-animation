import { Meta } from '@storybook/react'
import React, { useEffect, useState } from 'react'
import { delay, createTypeStream } from '../'
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
  perChar: 30,
  perSpace: 0,
  perHangul: 60,
  perLine: 0,
  perDot: 300,
})
export const Demo: React.FC = () => {
  const [value, setValue] = React.useState('')
  const [isStream, set_isStream] = useState<boolean>(false)
  const [isEnd, set_isEnd] = useState<boolean>(false)
  return (
    <div style={{ whiteSpace: 'pre-line', width: '500px' }}>
      <button
        onClick={async () => {
          set_isEnd(false)
          setValue('')
          set_isStream(false)
          await delay(2000)
          await typeStream(
            `무궁화 꽃이 피었습니다.
            동해물과 백두산이 마르고 닳도록
            하느님이 보우하사 우리나라 만세.
            Korea history is very long. about 5000 years.
            Korean is a language isolate spoken mainly in South Korea and North Korea by about 63 million people.`,
            async (result, stream) => {
              setValue(result)
              set_isStream(!stream.isEnd)
            }
          )
          await delay(4100)
          set_isEnd(true)
        }}
      >
        Run
      </button>
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
