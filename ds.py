# Single Linked List Implementation


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
        else:
            new_node.next = self.head
            self.head = new_node
            self.len += 1
            return self

    def get(self, index):
        if index < 0 or index >= self.len:
            return None
        counter = 0
        current = self.head
        while counter != index:
            current = current.next
            counter += 1
        return current

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
            return not(not(self.append(value)))
        if index == 0:
            return not(not(self.unshift(value)))
        new_node = Node(value)
        prev = self.get(index)
        temp = prev.next
        prev.next = new_node
        new_node.next = temp
        self.len += 1
        return True

    def remove(self, index):
        if index < 0 or index > self.len:
            return False
        if index == 0:
            return self.shift()
        if index == self.len:
            return self.pop()
        prev_node = self.get(index - 1)
        removed = prev_node.next
        prev_node.next = removed.next
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
