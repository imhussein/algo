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
