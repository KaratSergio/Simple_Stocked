import { pathsToModuleNameMapper } from 'ts-jest';
import { readFile } from 'fs/promises';
import path from 'path';

const tsconfigPath = path.resolve('./tsconfig.json');
const tsconfigRaw = await readFile(tsconfigPath, 'utf-8');
const tsconfig = JSON.parse(tsconfigRaw);

const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'jsx', 'tsx'],

  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths || {}, { prefix: '<rootDir>/' }),
};

export default config;
