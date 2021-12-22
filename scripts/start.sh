#!/bin/bash
cd /home/ubuntu/im-sprint-practice-deploy/server

export DB_USERNAME=$(aws ssm get-parameters --region ap-northeast-2 --names DB_USERNAME --query Parameters[0].Value | sed 's/"//g')
export DB_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DB_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DB_DATABASE=$(aws ssm get-parameters --region ap-northeast-2 --names DB_DATABASE --query Parameters[0].Value | sed 's/"//g')
export DB_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DB_HOST --query Parameters[0].Value | sed 's/"//g')
export DB_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DB_PORT --query Parameters[0].Value | sed 's/"//g')
export PORT=$(aws ssm get-parameters --region ap-northeast-2 --names PORT --query Parameters[0].Value | sed 's/"//g')
export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export BCRYPT_SALT_ROUNDS=$(aws ssm get-parameters --region ap-northeast-2 --names BCRYPT_SALT_ROUNDS --query Parameters[0].Value | sed 's/"//g')
export JWT_EXPIRES_SEC=$(aws ssm get-parameters --region ap-northeast-2 --names JWT_EXPIRES_SEC --query Parameters[0].Value | sed 's/"//g')
export CORS_ALLOW_ORIGIN=$(aws ssm get-parameters --region ap-northeast-2 --names CORS_ALLOW_ORIGIN --query Parameters[0].Value | sed 's/"//g')
export NCP_SENS_ACCESS=$(aws ssm get-parameters --region ap-northeast-2 --names NCP_SENS_ACCESS --query Prameters[0].Value | sed 's/"//g')
export NCP_SENS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names NCP_SENS_SECRET --query Prameters[0].Value | sed 's/"//g')
export NCP_SENS_ID=$(aws ssm get-parameters --region ap-northeast-2 --names NCP_SENS_ID --query Prameters[0].Value | sed 's/"//g')
export NCP_SENS_NUMBER=$(aws ssm get-parameters --region ap-northeast-2 --names NCP_SENS_NUMBER --query Prameters[0].Value | sed 's/"//g')

authbind --deep pm2 start app.js