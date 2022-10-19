#!/bin/bash
echo "Setting up fdk-cli"
echo '{
  "theme": {
    "active_context": "'"$current_env"'",
    "contexts": {
      "'"$current_env"'": {
        "name": "'"$current_env"'",
        "application_id": "'"$application_id"'",
        "domain": "'"$domain"'",
        "company_id": "'"$company_id"'",
        "theme_id": "'"$theme_id"'",
        "env": "'"$current_env"'"
      }
    }
  },
  "partners": {}
}' > .fdk/context.json
fdk --version
password=$(echo -n $password | base64 -d)
fdk env set -n $current_env
fdk login --email $email --password $password
fdk theme pull-config
fdk theme sync
if [ $? -eq 0 ]
then
  echo "Theme syncing completed"
else
  echo "Theme syncing failed"
  exit 1
fi
