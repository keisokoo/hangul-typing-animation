import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  'preset': 'ts-jest',
  'clearMocks': true,
  'coverageDirectory': 'coverage',
  'testMatch': [
    '<rootDir>/tests/**/*.test.(ts|tsx)'
  ]
}

export default config;