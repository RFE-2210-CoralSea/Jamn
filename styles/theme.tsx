import { extendTheme } from '@chakra-ui/react'

const fonts = { sans: `'-apple-system', sans-serif`,
                mono: `'Menlo', monospace` }

const breakpoints = {
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
}

const theme = extendTheme({
  semanticTokens: {
    colors: {
      text: {
        default: '#16161D',
        _dark: '#ade3b8',
      },
    }
  },
  colors: {
    black: '#16161D',
  },
  fonts,
  breakpoints,
})

export default theme