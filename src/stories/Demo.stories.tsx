import { Meta } from '@storybook/react'
import React, { useState } from 'react'
import { typeStream } from '../'

export const Demo: React.FC = () => {
  const [value, setValue] = React.useState('')
  const [isStream, set_isStream] = useState<boolean>(false)
  return (
    <div style={{ whiteSpace: 'pre-line', width: '500px' }}>
      <button
        onClick={() => {
          typeStream(
            `안녕하세요, 밥이빱이
되었습니다.
그리고 무궁화 꽃이 피었습니다. and You are the best!
1337`,
            (result, stream) => {
              setValue(result)
              set_isStream(!stream.isEnd)
            },
            {
              perChar: 100,
              perWord: 200,
              perHangul: 200,
              perLineOrDot: 1000,
            }
          )
        }}
      >
        Run
      </button>
      <h1>
        {value}
        {isStream ? `_` : ''}
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
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Demo>

export default meta
