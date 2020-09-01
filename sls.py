class Node:
    def __init__(self, value):
        self.value = value
        self.next = None


class LinkedList:
    def __init__(self):
        self.len = 0
        self.head = None
        self.tail = None

    def append(self, value):
        new_node = Node(value)
        if not self.head:
            self.tail = self.head = new_node
        else:
            self.tail.next = new_node
            self.tail = new_node
        self.len += 1
        return self

    def pop(self):
        if not self.head:
            return None
        new_tail = current = self.head
        while current.next:
            new_tail = current
            current = current.next
        self.tail = new_tail
        self.tail.next = None
        self.len -= 1
        if self.len == 0:
            self.head = None
            self.tail = None
        return current

    def shift(self):
        if not self.head:
            return None
        current_head = self.head
        self.head = current_head.next
        self.len -= 1
        if self.len == 0:
            self.head = None
            self.tail = None
        return current_head

    def unshift(self, value):
        new_node = Node(value)
        if not self.head:
            self.head = self.tail = new_node
        new_node.next = self.head
        self.head = new_node
        self.len += 1
        return self.head


lls = LinkedList()
print(lls.len)
print(lls.head)
print(lls.tail)
lls.append(10)
print(lls.len)
print(lls.head.value)
print(lls.tail.value)
lls.append(400)
print(lls.len)
print(lls.head.value)
print(lls.tail.value)
print(lls.head.next == lls.tail)
lls.pop()
print(lls.len)
print(lls.head.value)
print(lls.tail.value)
print(lls.head.next == lls.tail)
lls.append(400)
print(lls.len)
print(lls.head.value)
print(lls.tail.value)
print(lls.head.next == lls.tail)
lls.shift()
print(lls.len)
print(lls.head.value)
print(lls.tail.value)
print(lls.head.next == lls.tail)
lls.unshift(90)
print(lls.head.next.value)
