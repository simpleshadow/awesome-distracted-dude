import React, { useCallback, useEffect, useRef, useState } from 'react'
import { endOfMinute, intervalToDuration } from 'date-fns'

import Flipper, { FlipperHandle } from './flipper'
import { TWView } from '../tailwind'

const ClockFace = () => {
  const [date, setDate] = useState(new Date())
  const [cardHeight, setCardHeight] = useState(0)
  const [timer, setTimer] = useState<number>()

  const hourFlipper = useRef<FlipperHandle>(null)
  const minutesFlipper = useRef<FlipperHandle>(null)

  const getMsToNextMinute = (now: Date) =>
    (intervalToDuration({ start: now, end: endOfMinute(now) }).seconds || 0) * 1000

  useEffect(() => {
    if (!timer && cardHeight !== 0) {
      const count = (delay: number, date: Date) => {
        setTimer(
          setTimeout(() => {
            const newDate = new Date()
            console.log('count', newDate, date)

            newDate.getHours() !== date.getHours() && hourFlipper.current?.flip()
            newDate.getMinutes() !== date.getMinutes() && minutesFlipper.current?.flip()

            setDate(newDate)
            count(getMsToNextMinute(newDate), newDate)
          }, delay + 1000)
        )
      }
      const now = new Date()
      const msToNextMinute = getMsToNextMinute(now)
      count(msToNextMinute, now)
    }
    // hourFlipper.current?.flip()
    // minutesFlipper.current?.flip()
    return clearTimeout(timer)
  }, [date, cardHeight])

  return (
    <TWView
      className={`flex flex-row items-center justify-center w-full h-1/3 capitalize pointer-events-none p-4`}
      onLayout={(event) => setCardHeight(event.nativeEvent.layout.height)}
    >
      <Flipper type="hour" cardHeight={cardHeight} date={date} ref={hourFlipper} className={'mr-2'} />
      <Flipper type="minutes" cardHeight={cardHeight} date={date} ref={minutesFlipper} />
    </TWView>
  )
}

export default ClockFace
