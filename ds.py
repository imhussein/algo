class Node:
    def __init__(self, value):
        self.value = value
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.len = 0

    def push(self, value):
        new_node = Node(value)
        if not self.head:
            self.head = self.tail = new_node
        else:
            self.tail.next = new_node
            self.tail = new_node
        self.len += 1
        return self

    def unshift(self, value):
        new_node = Node(value)
        if not self.head:
            self.head = self.tail = new_node
        else:
            new_node.next = self.head
            self.head = new_node
        self.len += 1
        return self

    def pop(self):
        if not self.head:
            return None
        else:
            current = self.head
            new_tail = current
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
        else:
            head = self.head
            self.head = head.next
        self.len -= 1
        return head

    def get(self, index):
        if self.len == 0 or index >= self.len:
            return None
        current = 0
        node = self.head
        while index != current:
            node = node.next
            current += 1
        return node

    def set(self, index, value):
        node = self.get(index)
        if node:
            node.value = value
            return True
        return False

    def insert(self, index, value):
        if index < 0 or index > self.len:
            return False
        if index == self.len:
            return not(not(self.push(value)))
        if index == 0:
            return not(not(self.unshift(value)))
        new_node = Node(value)
        node = self.get(index - 1)
        temp = node.next
        node.next = new_node
        new_node.next = temp
        self.len += 1
        return self

    def remove(self, index):
        if self.len < 0 or self.len < index:
            return False
        if index == self.len - 1:
            self.pop()
        if index == 0:
            self.shift()
        prev = self.get(index - 1)
        removed = prev.next
        prev.next = removed.next
        self.len -= 1
        return removed

    def reverse(self):
        node = self.head
        self.head = self.tail
        self.tail = node
        prev = None
        next = None
        for i in range(self.len):
            next = node.next
            node.next = prev
            prev = node
            node = next
        return self
