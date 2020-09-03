from functools import wraps


def factory(factoryValue):
    def eventHandler(callback):
        @wraps(callback)
        def createAnimation(x, y, value, message):
            callback(message, factoryValue)
            return x * value // y
        return createAnimation
    return eventHandler


@factory('My Value')
def say_message(message, factoryValue):
    print(message, factoryValue)


say_message(10, 1, 1, 'Message')

print(say_message.__name__)


class Mohamed:
    x = 10


x = Mohamed()
Mohamed.x = 'Value Changed'
print(x.x)


names = ('Mohamed', 'Hussein', 'Mohamed', (*'Mohamed'))
count = names.count('Mohamed')
print(count)
for name in names:
    print(name)
print(names.index('Mohamed'))
colors = ('red', )
print(type(colors))
print(colors[0:])
actions = {'add', 'update', 'get', 'delete', 'delete'}
print(actions)
actions.pop()
actions.remove('delete')
print(actions)
actions.add('Value')
print(actions)
for action in actions:
    print(action)
data = actions.copy()
print(data is actions)
print(data)
data.clear()
print(len(data))
languages = {'PHP', 'JS'}
langs = {
    'PHP', 'Python'
}
print(langs & languages)

print({letter * (index + 3) if letter is 'M' else letter * (index + 1)
       for index, letter in enumerate({*'MMMMMMMMMohamed'})}
      )

values = {letter * (index + 1) if letter is 'M' else letter * index: letter * (index + 3)
          if letter is 'D' else letter * (index + 1) for index, letter in enumerate({*'Mohamed'})}
print(values)

y = 0


def logValue(value="Default Value", x=10):
    global y
    y = 1
    print(y)
    print(value * x)


print(y)
logValue()
logValue(value='Value')
print(y)


def outer():
    counter = 0

    def inner(callback):
        nonlocal counter
        counter += 1
        callback(counter)
    return inner


outer()(lambda counter: print(f"Counter Value is {counter}"))


def all_args(*args):
    for arg in args:
        print(arg)


all_args("Mohamed", 'Hussein')


def get_all_items(value, *args, **kwargs, ):
    print(kwargs, args, value)


get_all_items(value='sss', name="Mohamed", age=200, )
