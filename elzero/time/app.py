name = "Mohamed"
iterator = iter(name)
print(next(iterator))
print(next(iterator))
print(next(iterator))
print(next(iterator))
print(next(iterator))
print(next(iterator))
print(next(iterator))
try:
    print(next(iterator))
except StopIteration as err:
    print("Err")


def logValue():
    yield "Mohamed"
    yield "Hussein"


gen = logValue()
print(next(gen))
print(next(gen))

a = iter(range(0, 100))
print(next(a))


def myDecorator(func):
    '''
      Mohamed
    '''
    def nested_func():
        print("Before")
        func(10, 20)
        print("After")
    return nested_func


@myDecorator
def sayHello(x, y):
    print("H Func")


print(myDecorator.__doc__)
sayHello()

zip()

x = -10

try:
    if x < 10:
        raise Exception("ERRRRRR")
except:
    print("FFF")

else:
    print("ELSE")

finally:
    print("There is no error")

print("SS")


def sayMessage(message) -> str:
    print(message)
