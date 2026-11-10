// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

/** Visual primitives that only src/components/controllers may use (mirrors the dashboard controller pattern). */
const RN_ALLOWED = 'Linking|Share|Alert|Keyboard|Platform';
const VISUAL_LIBS = [
  'react-native-reanimated', 'react-native-svg', 'expo-blur', 'expo-linear-gradient', '@expo/vector-icons',
  'react-native-gesture-handler', 'expo-image',
];
const LAYER_MESSAGE =
  'Visual code lives in src/components/controllers. Compose controllers (Stack, Row, Box, Text, Card...) instead.';

const featureScopes = ['src/features/**/*.{ts,tsx}', 'src/app/**/*.{ts,tsx}'];

module.exports = defineConfig([
  expoConfig,
  { ignores: ['dist/*', '.expo/*'] },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'max-lines': ['error', { max: 150, skipBlankLines: true, skipComments: true }],
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    // features/** and app/** may not touch visual primitives, style props or color literals.
    files: featureScopes,
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['react-native'],
              importNamePattern: `^(?!(${RN_ALLOWED})$).*`,
              message: `Only ${RN_ALLOWED.split('|').join(', ')} may be imported from react-native here. ${LAYER_MESSAGE}`,
            },
            ...VISUAL_LIBS.map((name) => ({ group: [name], message: LAYER_MESSAGE })),
          ],
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: "JSXAttribute[name.name='style']",
          message: 'No style props outside controllers. Use Stack/Row/Box props and controller variants.',
        },
        {
          selector: 'Literal[value=/^#[0-9a-fA-F]{3,8}$/]',
          message: 'No hex color literals outside core/theme and core/brand.',
        },
        {
          selector: 'Literal[value=/^rgba?\\(/]',
          message: 'No rgb()/rgba() color literals outside core/theme and core/brand.',
        },
        {
          selector: 'TemplateElement[value.raw=/^(#[0-9a-fA-F]{3,8}|rgba?\\()/]',
          message: 'No color literals outside core/theme and core/brand.',
        },
      ],
    },
  },
]);
