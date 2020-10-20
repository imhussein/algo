from math import (floor)


class MaxBinaryHeap:
    data = 'Added Value'

    def __init__(self):
        self.values = [41, 39, 33, 18, 27, 12]

    def insert(self, value):
        self.values.append(value)
        self.siftUp()

    def siftUp(self):
        index = len(self.values) - 1
        ELEMENT = self.values[index]
        while index > 0:
            parentIndex = floor((index - 1) / 2)
            parentElement = self.values[parentIndex]
            if ELEMENT <= parentElement:
                break
            if ELEMENT > parentElement:
                self.values[parentIndex] = ELEMENT
                self.values[index] = parentElement
                index = parentIndex

    def siftDown(self):
        root = self.values[0]
        end = self.values.pop()
        self.values[0] = end
        index = 0
        length = len(self.values)
        element = self.values[0]
        while True:
            leftChildIndex = 2 * index + 1
            rightChildIndex = 2 * index + 2
            leftChild = None
            rightChild = None
            swap = None
            if leftChildIndex < length:
                leftChild = self.values[leftChildIndex]
                if leftChild > element:
                    swap = leftChildIndex
            if rightChildIndex < length:
                rightChild = self.values[rightChildIndex]
                if (swap is None and rightChild > element) or (swap is not None and rightChild > leftChild):
                    swap = rightChildIndex
            if swap is None:
                break
            self.values[index] = self.values[swap]
            self.values[swap] = element
            index = swap
        return root


maxB = MaxBinaryHeap()
maxB.insert(55)
print(maxB.values)
maxB.siftDown()
print(maxB.values)


def log(name):
    if 'data' in name:
        print(name)
    else:
        print('Not Exist')


log('Mohamed')
