import React, { useState } from 'react'
import { Variants, UseAnimationState } from '@motify/core'
import { Easing } from 'react-native-reanimated'

import { TWView, TWText } from '../tailwind'

type FlapProps<V extends Variants<V>> = {
  AMPM?: string
  animationState?: UseAnimationState<V>
  digits: string
  cardHeight: number
  digitHeight: number
  isHour?: boolean
  type: 'top' | 'bottom'
  onSetDigitHeight?: (height: number) => void
  onFlipped?: () => void
  flipState?: 'flipped' | 'unflipped' | undefined
}

const Flap = <V extends { unflipped: any; flipped: any } & Variants<V>>({
  AMPM,
  animationState,
  cardHeight,
  digitHeight,
  digits,
  isHour,
  onSetDigitHeight,
  type,
  onFlipped,
  flipState,
}: FlapProps<V>) => {
  return (
    <TWView
      className={`absolute flex flex-row items-center justify-center h-1/2 w-full rounded-${
        type === 'top' ? 't' : 'b'
      }-3xl bg-almost-black border-${type === 'top' ? 'b' : 't'} border-black`}
      state={animationState}
      style={{
        backfaceVisibility: 'hidden',
        overflow: 'hidden',
        visibility: flipState === 'unflipped' ? 'hidden' : 'visible',
        [type]: animationState ? cardHeight * 0.25 : 0,
      }}
      transition={{
        type: 'timing',
        duration: flipState === 'unflipped' ? 0 : 1200,
        translateY: {
          type: 'timing',
          duration: 0,
          easing: Easing.linear,
        },
        opacity: {
          type: 'timing',
          duration: 0,
          easing: Easing.linear,
        },
      }}
      onDidAnimate={(styleProp, finished) => {
        animationState?.current === 'flipped' &&
          finished &&
          styleProp === 'rotateX' &&
          onFlipped &&
          onFlipped()
      }}
    >
      {isHour && AMPM && type === 'top' && (
        <TWText className={`absolute text-white font-black text-2xl lowercase`} style={{ top: 32, left: 32 }}>
          {AMPM}
        </TWText>
      )}
      {isHour && type === 'bottom' && (
        <TWView
          className={`absolute bg-white rounded-full`}
          style={{ width: cardHeight * 0.08, height: cardHeight * 0.08, bottom: 32, right: 32 }}
        />
      )}
      <TWText
        className={`absolute text-12xl font-black text-white`}
        style={type === 'top' ? { bottom: -0.5 * digitHeight } : { top: -0.5 * digitHeight }}
        onLayout={(event) => onSetDigitHeight && onSetDigitHeight(event.nativeEvent.layout.height)}
      >
        {digits}
      </TWText>
    </TWView>
  )
}

export default Flap
