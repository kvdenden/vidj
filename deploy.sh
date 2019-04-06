#!/usr/bin/env bash

echo "Deploying server..."
git subtree push --prefix server heroku master

echo "Deploying client..."
now client
