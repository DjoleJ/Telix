#!/bin/bash
echo "Deploy TelixDashboard"
cd .deploy
eval $(ssh-agent)
ssh-add ~/.ssh/teslacrypto
mup setup
mup deploy
cd ../