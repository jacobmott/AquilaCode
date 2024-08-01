#!/bin/sh
nx build nest-app

nx build angular-app

mongod --config mongod.conf &

nx serve nest-app & 
nx serve angular-app