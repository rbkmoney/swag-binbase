#!/usr/bin/env node
'use strict';
var Path = require('path');

var TARGET_DIR = 'web_deploy'
if (process.argv[2]) {
    TARGET_DIR = process.argv[2]
}

require('shelljs/global');
set('-e');

mkdir('-p', TARGET_DIR)

cp('-R', 'web/*', TARGET_DIR + '/');

exec('npm run openapi bundle -- -o ' + TARGET_DIR + ' --ext json');
exec('npm run openapi bundle -- -o ' + TARGET_DIR + ' --ext yaml');

var SWAGGER_UI_DIST = Path.dirname(require.resolve('swagger-ui-dist'));
rm('-rf', TARGET_DIR + '/swagger-ui/')
cp('-R', SWAGGER_UI_DIST, TARGET_DIR + '/swagger-ui/')
sed('-i', 'https://petstore.swagger.io/v2/swagger.json', '../openapi.json', TARGET_DIR + '/swagger-ui/index.html')
