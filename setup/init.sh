#!/usr/bin/env bash
set -e

echo "Fetching ARN for github-action-user..."
userarn=$(aws iam get-user --user-name github-action-user --query 'User.Arn' --output text)

if [ -z "$userarn" ]; then
  echo "Error: Could not retrieve ARN for IAM user 'github-action-user'."
  exit 1
fi

echo "Found User ARN: $userarn"

echo "Downloading aws-iam-authenticator (v0.6.2)..."
curl -sL -o aws-iam-authenticator https://github.com/kubernetes-sigs/aws-iam-authenticator/releases/download/v0.6.2/aws-iam-authenticator_0.6.2_linux_amd64
chmod +x ./aws-iam-authenticator

echo "Adding github-action-user to EKS aws-auth ConfigMap..."
./aws-iam-authenticator add-user \
  --userarn="$userarn" \
  --username=github-action-role \
  --groups=system:masters

echo "Cleaning up authenticator binary..."
rm -f ./aws-iam-authenticator

echo "Successfully added github-action-user to cluster permissions!"
