#!/bin/bash
echo "Deploying into $WWW_USER_HOST:/var/www/djinn/ ..."
scp -r dist/djinn/* $WWW_USER_HOST:/var/www/djinn/
