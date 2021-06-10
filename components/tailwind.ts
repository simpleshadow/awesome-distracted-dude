import { View, Image, Text } from '@motify/components'
import { ImageSourcePropType } from 'react-native'

import withTailwind from '../hoc/with-tailwind'

export const TWView = withTailwind<typeof View['defaultProps'] & {}>(View)
export const TWImage = withTailwind<typeof Image['defaultProps'] & { source: ImageSourcePropType }>(Image)
export const TWText = withTailwind<typeof Text['defaultProps'] & {}>(Text)
