// "build": {
//   "executor": "@nx/webpack:webpack",
//   "options": {
//     "webpackConfig": "nest-app/webpack.config.js",
//     "watch": true,
//     "sourceMap": true
//   }
// },

// "build": {
//   "executor": "@nx/webpack:webpack",
//   "options": {
//     "webpackConfig": "nest-app/webpack.config.js",
//     "generatePackageJson": true
//   }
// },

// "build": {
//   "dependsOn": ["codegen"]
// },
// "codegen": {
//   "command": "...."
// },
// "build": {
//   "executor": "@nrwl/nest:build",
//   "options": {
//     "cacheable": false
//   }
// },

// "build": {
//   "executor": "@nrwl/nest:build",
//   "outputs": ["{options.outputPath}"],
//   "options": {
//     "outputPath": "dist/apps/nest-app",
//     "main": "apps/nest-app/src/main.ts",
//     "tsConfig": "apps/nest-app/tsconfig.app.json",
//     "assets": ["apps/nest-app/src/assets"]
//   },
//   "configurations": {
//     "production": {
//       "optimization": true,
//       "sourceMaps": false,
//       "fileReplacements": [
//         {
//           "replace": "apps/nest-app/src/environments/environment.ts",
//           "with": "apps/nest-app/src/environments/environment.prod.ts"
//         }
//       ]
//     }
//   }
// },
