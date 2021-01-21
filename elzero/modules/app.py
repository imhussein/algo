import sys
import numpy
import os
import random
from functools import reduce
from utils import logAge, logName
import termcolor
import pyfiglet

logName("Mohamed")
print(random.randint(0, 1000))
logAge(100)
print(dir())
print(os.getcwd())
print(os.cpu_count())
sys.path.append("/home/mohamed/go/src/algo/elzero")
print(sys.path)
termcolor.cprint("Mohamed", color="red")
termcolor.cprint("Hussein", color="green")
print(pyfiglet.figlet_format("Mohamed"))