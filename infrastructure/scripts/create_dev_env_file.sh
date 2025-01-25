#!/bin/bash
# create_dev_env_file.sh

set -e

# Ensure required variables are set
if [[ -z "$REGION" || -z "$RESOURCE_GROUP" || -z "$STORAGE_ACCOUNT_NAME" || -z "$FILE_PATH" || -z "$TEMPLATE_PATH" ]]; then
  echo "One or more required environment variables are missing."
  exit 1
fi

# Ensure the target directory exists
mkdir -p "$(dirname "$FILE_PATH")"

# Use envsubst to generate the YAML file
envsubst < "$TEMPLATE_PATH" > "$FILE_PATH"

# Debugging output
echo "File created at: $FILE_PATH"
echo "Contents:"
cat "$FILE_PATH"
