#!/bin/sh
nx build nest-app

nx build angular-app

nx serve nest-app & 
nx serve angular-app