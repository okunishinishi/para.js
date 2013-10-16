#!/bin/bash

HERE=$(cd "$(dirname $0)" && pwd)

tek-html compact "${HERE}/kikaku/index.html"  "${HERE}/kikaku/compact.html"
tek-html compact "${HERE}/oseti/index.html"  "${HERE}/oseti/compact.html"