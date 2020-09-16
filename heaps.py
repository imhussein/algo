from math import floor


class MaxBinaryHeap:
    def __init__(self):
        self.props = []

    def insert(self, value):
        self.props.append(value)
        self.bubbleUp()

    def bubbleUp(self):
        index = len(self.props) - 1
        ELEMENT = self.props[index]
        while True:
            parentIndex = floor((index - 1) / 2)
            parent = self.props[parentIndex]
            if self.props[parentIndex] >= ELEMENT:
                break
            self.props[parentIndex], ELEMENT = ELEMENT, self.props[parentIndex]
            index = parentIndex

    def extractMax(self):
        max = self.props[0]
        end = self.props.pop()
        self.props[0] = end
        self.sinkDown()
        return max

    def sinkDown(self):
        index = 0
        length = len(self.props)
        element = self.props[0]
        while True:
            leftChildIndex = 2 * index + 1
            rightChildIndex = 2 * index + 2
            swap = None
            leftChild = None
            rightChild = None
            if leftChildIndex < length:
                leftChild = self.props[leftChildIndex]
                if leftChild > element:
                    swap = leftChildIndex
            if rightChildIndex < length:
                rightChildIndex = self.props[rightChildIndex]
                if (not swap and rightChild > element) or (not swap and rightChild < leftChild):
                    swap = rightChildIndex
            if not swap:
                break
            self.props[index], self.props[swap] = self.props[swap], self.prop[index]
            index = swap
