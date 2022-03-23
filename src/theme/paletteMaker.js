import { alpha } from '@mui/material/styles'

// ----------------------------------------------------------------------

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`
}

const paletteGen = (colorMode) => {
  const GREY = {
    0: '#FFFFFF',
    100: '#F9FAFB',
    150: '#F8F9FA',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#212B36',
    900: '#161C24',
    500_8: alpha('#919EAB', 0.08),
    500_12: alpha('#919EAB', 0.12),
    500_16: alpha('#919EAB', 0.16),
    500_24: alpha('#919EAB', 0.24),
    500_32: alpha('#919EAB', 0.32),
    500_48: alpha('#919EAB', 0.48),
    500_56: alpha('#919EAB', 0.56),
    500_80: alpha('#919EAB', 0.8),
  }

  const PRIMARY = {
    lighter: '#D6E4FF',
    light: '#A1B2FF',
    main: '#8095D7',
    dark: '#7788BA',
    darker: '#295A9A',
    contrastText: '#fff',
  }

  const SECONDARY = {
    lighter: '#D6E4FF',
    light: '#84A9FF',
    main: '#3366FF',
    dark: '#1939B7',
    darker: '#091A7A',
    contrastText: '#fff',
  }

  const INFO = {
    lighter: '#D0F2FF',
    light: '#74CAFF',
    main: '#1890FF',
    dark: '#0C53B7',
    darker: '#04297A',
    contrastText: '#fff',
  }
  const SUCCESS = {
    lighter: '#E9FCD4',
    light: '#AAF27F',
    main: '#54D62C',
    dark: '#229A16',
    darker: '#08660D',
    contrastText: GREY[800],
  }
  const WARNING = {
    lighter: '#FFF7CD',
    light: '#FFE16A',
    main: '#FFC107',
    dark: '#B78103',
    darker: '#7A4F01',
    contrastText: GREY[800],
  }

  const GENERETOR = {
    card: '#FFEF7A',
    icon: '#FABB55',
  }

  const STORAGE = {
    card: '#AAF27F',
    icon: '#04C820',
  }

  const CONSUMER = {
    card: '#74CAFF',
    icon: '#0C53B7',
  }

  const DARKMODE_FACLYS = {
    card: '#212121',
    icon: '#90A5CC',
  }

  const DARKMODE_PRIMARY = {
    lighter: '#D6E4FF',
    light: '#A1B2FF',
    main: '#8095D7',
    dark: '#7788BA',
    darker: '#295A9A',
    contrastText: '#fff',
  }

  const DARKMODE_CHART_COLORS = {
    red: ['#314D61'],
    green: ['#5788AB'],
    blue: ['#414D86'],
    yellow: ['#BAD3E6'],
    skyblue: ['#295A9A'],
    violet: ['#72B3E0'],
  }

  const PUREGREY = {
    0: '#FFFFFF',
    100: '#F9FAFB',
    150: '#F8F9FA',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#555555',
    600: '#454545',
    700: '#303030',
    800: '#212121',
    850: '#191919',
    900: '#151515',
  }

  const ERROR = {
    lighter: '#FFE7D9',
    light: '#FFA48D',
    main: '#FF4842',
    dark: '#B72136',
    darker: '#7A0C2E',
    contrastText: '#fff',
  }

  const BACK = {
    lighter: '#F4F6F8',
    light: '#C4CDD5',
    main: '#888895',
    dark: '#454545',
    darker: '#222222',
    contrastText: '#fff',
  }

  const GRADIENTS = {
    primary: createGradient(PRIMARY.light, PRIMARY.main),
    info: createGradient(INFO.light, INFO.main),
    success: createGradient(SUCCESS.light, SUCCESS.main),
    warning: createGradient(WARNING.light, WARNING.main),
    error: createGradient(ERROR.light, ERROR.main),
  }

  const CHART_COLORS = {
    red: ['#F96E5A', '#FF8F6D', '#FFBD98', '#FFF2D4'],
    green: ['#88D8B0', '#60F1C8', '#A4F7CC', '#C0F2DC'],
    blue: ['#1583D1', '#83CFFF', '#A5F3FF', '#CCFAFF'],
    yellow: ['#FED06A', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
    skyblue: ['#65CBDA', '#83CFFF', '#A5F3FF', '#CCFAFF'],
    violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  }

  return {
    mode: colorMode,

    ...(colorMode === 'light'
      ? {
          generetor: { ...GENERETOR },
          storage: { ...STORAGE },
          consumer: { ...CONSUMER },

          common: { black: '#000', white: '#fff' },
          primary: { ...PRIMARY },
          secondary: { ...SECONDARY },
          info: { ...INFO },
          success: { ...SUCCESS },
          warning: { ...WARNING },
          error: { ...ERROR },

          grey: GREY,
          gradients: GRADIENTS,
          chart: CHART_COLORS,
          back: { ...BACK },
          divider: GREY[500_24],
          text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
          background: { paper: '#fff', default: '#fff', dashboard: GREY[150], navbar: '#4433FF' },
          action: {
            active: GREY[600],
            hover: GREY[500_16],
            selected: GREY[500_24],
            disabled: GREY[500_80],
            disabledBackground: GREY[500_24],
            focus: GREY[500_24],
            hoverOpacity: 0.08,
            disabledOpacity: 0.48,
          },
        }
      : {
          generetor: { ...DARKMODE_FACLYS },
          storage: { ...DARKMODE_FACLYS },
          consumer: { ...DARKMODE_FACLYS },

          common: { black: '#000', white: '#fff' },
          primary: { ...DARKMODE_PRIMARY },
          secondary: { ...SECONDARY },
          info: { ...INFO },
          success: { ...SUCCESS },
          warning: { ...WARNING },
          error: { ...ERROR },

          grey: GREY,
          gradients: GRADIENTS,
          chart: DARKMODE_CHART_COLORS,
          back: { ...BACK },
          divider: alpha(GREY[300], 0.12),
          text: { primary: GREY[100], secondary: GREY[300], disabled: GREY[500] },
          background: {
            paper: PUREGREY[700],
            default: PUREGREY[800],
            dashboard: PUREGREY[850],
            navbar: '#8899CC',
          },
          action: {
            active: GREY[600],
            hover: GREY[500_16],
            selected: GREY[500_24],
            disabled: GREY[500_80],
            disabledBackground: GREY[500_24],
            focus: GREY[500_24],
            hoverOpacity: 0.08,
            disabledOpacity: 0.48,
          },
        }),
  }
}

export default paletteGen
