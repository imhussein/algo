class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, value):
        new_node = Node(value)
        current = self.root
        if not self.root:
            self.root = new_node
            return self
        while True:
            if current.value == value:
                return None
            if value < current.value:
                if not current.left:
                    current.left = new_node
                    return self
                else:
                    current = current.left
            elif current.value < value:
                if not current.right:
                    current.right = new_node
                    return self
                else:
                    current = current.right

    def find(self, value):
        current = self.root
        found = False
        if not self.root:
            return False
        while not found and current:
            if current.value > value:
                current = current.left
            elif current.value < value:
                current = current.right
            else:
                found = True
        if found:
            return current
        else:
            return False

    def BST(self):
        node = self.root
        queue = []
        data = []
        queue.append(node)
        while len(queue):
            node = queue.pop(0)
            data.append(node)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        return data
