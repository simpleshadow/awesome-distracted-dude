import React from 'react'

import ClockFace from '../components/clock-face'
import { TWView } from '../components/tailwind'

const IndexPage = () => (
  <TWView
    className="flex flex-1 h-full w-full items-center justify-center bg-black"
    from={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{
      opacity: 0,
    }}
  >
    <ClockFace />
  </TWView>
)

export default IndexPage
