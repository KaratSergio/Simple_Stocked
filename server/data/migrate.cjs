// CJS for Node
require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs'
  }
});
require('tsconfig-paths').register();

require('./migrate.ts'); 
