import React, { ComponentType, CSSProperties } from 'react'
import { Falsy, ImageStyle, RecursiveArray, RegisteredStyle, TextStyle, ViewStyle } from 'react-native'
import { getDisplayName } from 'next/dist/next-server/lib/utils'
import { create } from 'tailwind-rn'

import styles from '../styles.json'

const { tailwind, getColor } = create(styles)

type ComponentWithTailwindProps = {
  className?: string
  style?:
    | ViewStyle
    | ImageStyle
    | TextStyle
    | CSSProperties
    | Falsy
    | RegisteredStyle<ViewStyle>
    | RecursiveArray<ViewStyle | RegisteredStyle<ViewStyle> | Falsy>
}

const withTailwind = <P extends ComponentWithTailwindProps = ComponentWithTailwindProps>(
  Component: ComponentType<P>
) => {
  const ComponentWithTailwind = ({ className, style, ...rest }: P & ComponentWithTailwindProps) => {
    const classes = className
      ? Array.isArray(className)
        ? className.flat().filter(Boolean).join(' ')
        : className
      : ''

    return <Component style={[tailwind(classes), style && style]} {...(rest as P)} />
  }

  ComponentWithTailwind.displayName = `withTailwind(${getDisplayName(Component)})`

  return ComponentWithTailwind
}

export default withTailwind
export { tailwind, getColor }
