const { withExpo } = require('@expo/next-adapter')
const withPlugins = require('next-compose-plugins')

const withTM = require('next-transpile-modules')([
  'moti',
  '@motify/core',
  '@motify/components',
  '@motify/skeleton',
  'react-native-reanimated',
])

module.exports = withPlugins([withTM, [withExpo, { projectRoot: __dirname }]], {
  resolve: {
    alias: Object.assign({
      'react-native$': 'react-native-web',
    }),
  },
})
