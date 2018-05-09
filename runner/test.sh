#!/bin/sh
npm_path=/usr/local/nodejs/bin/cnpm
project_path=/home/nextschool/web/admin.com

cd ${project_path}
/usr/bin/git pull
/bin/rm -rf dist-test
${npm_path} run build-test
/bin/chown -R nobody:nobody ${project_path}/dist-test
