#!/bin/bash

HERE=$(cd "$(dirname $0)" && pwd)
i=0
for f in ${HERE}/*.png
do
    i=$(($i + 1))
    mv "${f}" "${HERE}/0${i}.png"
done
