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


class DNode:
    def __init__(self, value):
        self.next = None
        self.prev = None
        self.value = value


class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.len = 0

    def push(self, value):
        new_node = DNode(value)
        if not self.head:
            self.head = self.tail = new_node
        else:
            self.tail.next = new_node
            new_node.prev = self.tail
            self.tail = new_node
        self.len += 1
        return self

    def pop(self):
        if not self.head:
            return None
        popped_node = self.tail
        if self.len == 1:
            self.head = None
            self.tail = None
        else:
            self.tail = popped_node.prev
            self.tail.next = None
            popped_node.prev = None
        self.len += 1
        return popped_node

    def shift(self):
        if not self.head:
            return None
        current_head = self.head
        if self.len == 1:
            self.head = self.tail = None
        self.head = current_head.next
        self.head.prev = None
        self.head.next = None
        self.len += 1
        return current_head

    def unshift(self, value):
        new_node = DNode(value)
        if not self.head:
            self.head = self.tail = new_node
        self.head.prev = new_node
        new_node.next = self.head
        self.head = new_node
        self.len += 1
        return self

    def get(self, index):
        if index < 0 or self.len <= index:
            return None
        if index <= self.len / 2:
            counter = 0
            current = self.head
            while counter != index:
                current = current.next
                counter += 1
            return current
        else:
            counter = self.len - 1
            current = self.tail
            while counter != index:
                current = current.prev
                current -= 1
            return current

    def set(self, index, value):
        found_node = self.get(index)
        if found_node:
            found_node.value = value
            return True
        return False

    def insert(self, index, value):
        new_node = DNode(value)
        if index < 0 or self.len < index:
            return False
        if index == 0:
            return self.unshift(value)
        if self.len == index:
            return self.shift(value)
        node = self.get(index - 1)
        after = node.next
        node.next = new_node
        new_node.prev = node
        new_node.next = after
        after.prev = new_node
        self.len += 1
        return True

    def remove(self, index):
        if index < 0 or index >= self.len:
            return None
        if index == 0:
            return self.shift()
        if index == self.len - 1:
            return self.pop()
        removed = self.get(index)
        removed.prev.next = removed.next
        removed.next.prev = removed.prev
        removed.next = None
        removed.prev = None


class SNode:
    def __init__(self, value):
        self.value = value
        self.next = None


class Stack:
    def __init__(self):
        self.first = None
        self.last = None
        self.size = 0

    def push(self, value):
        new_node = SNode(value)
        if not self.first:
            self.first = self.last = new_node
        else:
            temp = self.first
            self.first = new_node
            self.first.next = temp
        self.size += 1
        return self.size

    def pop(self):
        if not self.first:
            return None
        temp = self.first
        if self.first == self.last:
            self.last = None
        self.first = self.first.next
        self.size -= 1
        return temp.value


class QNode:
    def __init__(self, value):
        self.value = value
        self.next = None


class Queue:
    def __init__(self):
        self.first = None
        self.last = None
        self.size = 0

    def enqueue(self, value):
        new_node = QNode(value)
        if not self.first:
            self.first = self.last = new_node
        else:
            self.last.next = new_node
            self.last = new_node
        self.size += 1
        return self.size

    def dequeue(self):
        if not self.first:
            return None
        temp = self.first
        if self.first == self.last:
            self.last = None
        self.first.next = self.first
        self.len -= 1
        return temp.value


class BSTNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


class BinarySearchTree:
    def __init__(self):
        self.root = None
