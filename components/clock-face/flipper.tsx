import { useAnimationState } from '@motify/core'
import { add, format, sub } from 'date-fns'
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'

import Flap from './flap'
import { TWView } from '../tailwind'

type FlipperProps = {
  cardHeight: number
  className?: string
  date: Date
  type: 'hour' | 'minutes'
}

export type FlipperHandle = {
  flip: () => void
}

const Flipper = forwardRef<FlipperHandle, FlipperProps>(
  ({ cardHeight, className, type, date }: FlipperProps, ref) => {
    const [digitHeight, setDigitHeight] = useState(0)
    const [flapState, setFlapState] = useState<'flipped' | 'unflipped'>('unflipped')

    const topCardAnimationState = useAnimationState({
      from: {
        opacity: 1,
        rotateX: '0deg',
        translateY: -0.25 * cardHeight,
      },
      unflipped: {
        opacity: 0,
        rotateX: '0deg',
        translateY: 0.25 * cardHeight,
      },
      flipped: {
        opacity: 1,
        rotateX: '-180deg',
        translateY: -0.25 * cardHeight,
      },
    })

    const bottomCardAnimationState = useAnimationState({
      from: {
        opacity: 1,
        rotateX: '180deg',
        translateY: -0.25 * cardHeight,
      },
      unflipped: {
        opacity: 0,
        rotateX: '180deg',
        translateY: -0.25 * cardHeight,
      },
      flipped: {
        opacity: 1,
        rotateX: '0deg',
        translateY: 0.25 * cardHeight,
      },
    })

    const flipCards = useCallback(() => {
      setFlapState('flipped')
      topCardAnimationState.transitionTo('flipped')
      bottomCardAnimationState.transitionTo('flipped')
    }, [topCardAnimationState, bottomCardAnimationState])

    useImperativeHandle(
      ref,
      () => ({
        flip: () => flipCards(),
      }),
      [cardHeight, digitHeight]
    )

    const digits = format(date, type === 'hour' ? 'h' : 'mm')

    let prevDigits: string, AMPM: string | undefined
    if (type === 'hour') {
      prevDigits = date.getHours() === 12 ? '1' : format(sub(date, { hours: 1 }), 'h')
      AMPM = format(date, 'bb')
    } else {
      prevDigits = date.getMinutes() === 59 ? '00' : format(sub(date, { minutes: 1 }), 'mm')
    }

    return (
      <TWView className={`h-full w-1/2 max-w-sm ${className}`}>
        <Flap
          type={'top'}
          digits={digits}
          AMPM={AMPM}
          cardHeight={cardHeight}
          digitHeight={digitHeight}
          isHour={type === 'hour'}
        />
        <Flap
          type={'bottom'}
          digits={flapState === 'unflipped' ? digits : prevDigits}
          cardHeight={cardHeight}
          digitHeight={digitHeight}
          isHour={type === 'hour'}
        />

        <Flap
          type={'top'}
          digits={flapState === 'unflipped' ? digits : prevDigits}
          AMPM={AMPM}
          cardHeight={cardHeight}
          digitHeight={digitHeight}
          animationState={topCardAnimationState}
          isHour={type === 'hour'}
          onFlipped={() => {
            setFlapState('unflipped')
            topCardAnimationState?.transitionTo('unflipped')
            bottomCardAnimationState?.transitionTo('unflipped')
          }}
          flipState={flapState}
        />
        <Flap
          type={'bottom'}
          digits={digits}
          cardHeight={cardHeight}
          digitHeight={digitHeight}
          onSetDigitHeight={setDigitHeight}
          animationState={bottomCardAnimationState}
          isHour={type === 'hour'}
          onFlipped={() => {
            setFlapState('unflipped')
            topCardAnimationState?.transitionTo('unflipped')
            bottomCardAnimationState?.transitionTo('unflipped')
          }}
          flipState={flapState}
        />
      </TWView>
    )
  }
)

export default Flipper
