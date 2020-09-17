import math


class Node:
    def __init__(self, priority, value):
        self.priority = priority
        self.value = value


class Priority:
    def __init__(self):
        self.values = []

    def enqueue(self, value, priority):
        new_node = Node(priority, value)
        self.values.append(new_node)
        self.bubbleUp()

    def bubbleUp(self):
        index = len(self.values) - 1
        element = self.values[index]
        while index > 0:
            parentIndex = math.floor((n - 1) / 2)
            parentElement = self.values[parentIndex]
            if element.priority <= parentElement.priority:
                break
            self.values[parentIndex] = element
            self.values[index] = parentElement
            index = parentIndex

    def dequeue(self):
        maxPriority = self.values[0]
        end = self.values.pop()
        self.values[0] = end
        index = 0
        length = len(self.values)
        while True:
            leftChildIndex = 2 * index + 1
            rightChildIndex = 2 * index + 2
            leftChild = None
            rightChild = None
            swap = None
            if leftChildIndex < length:
                leftChild = self.values[leftChildIndex]
                if leftChild.priority > maxPriority.priority:
                    swap = leftChildIndex
            if rightChildIndex < length:
                rightChild = self.values[rightChildIndex]
                if (swap is None and rightChild.priority > maxPriority.priority) or (swap is not None and rightChild > leftChild):
                    swap = rightChildIndex
            if swap is None:
                break
            self.values[index] = self.values[swap]
            self.values[swap] = maxPriority
            index = swap
        return maxPriority
