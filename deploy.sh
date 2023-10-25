#!/bin/bash

echo "Deploying to Helios"

# Remove existing deployment
ssh -p 2222 s368090@se.ifmo.ru "rm -rf wildfly-29.0.1.Final/standalone/deployments/JSF-InteractiveGraph.war"
# add new deployment
scp -P 2222 ./target/JSF-InteractiveGraph.war s368090@se.ifmo.ru:wildfly-29.0.1.Final/standalone/deployments



