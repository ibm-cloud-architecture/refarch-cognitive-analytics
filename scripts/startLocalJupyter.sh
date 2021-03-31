#!/bin/bash
# Script to start a docker image with jupyter, numpy, sklearn, tensorflow, and expose the jupyter-notebooks folder so
# user can play with the notbook. The dockerfile in this project creates the needed image.
docker run --name pysparktf -v $(pwd)/src/dsx:/home/jovyan/work -it --rm -p 8888:8888 pysparktf start-notebook.sh
