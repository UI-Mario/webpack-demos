#!/bin/sh
echo hello
ls
data=`cat ./test.json`
echo $data

for pkg in `cat ./test.json`; do
  echo $pkg
done