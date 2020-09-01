def my_for(iterable):
    iterator = iter(iterable)
    while True:
        try:
            print(next(iterator))
        except:
            break


my_for('Mohamed')


class Counter:
    def __init__(self, low, high):
        self.low = low
        self.high = high

    def __iter__(self):
        return self

    def __next__(self):
        if self.low < self.high:
            num = self.low
            self.low += 1
            return num
        raise StopIteration


for i in Counter(10, 20):
    print(i)


def count_up_to(value):
    maxValue = 4
    while value < maxValue:
        yield value
        value += 1


count_fn = count_up_to(0)
print(next(count_fn))
print(next(count_fn))
print(next(count_fn))
