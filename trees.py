class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


class BST:
    def __init__(self):
        self.root = None

    def insert(self, value):
        new_node = Node(value)
        if not self.root:
            self.root = new_node
            return self
        current = self.root
        while True:
            if value == current.value:
                return None
            if value < current.value:
                if not current.left:
                    current.left = new_node
                    return self
                current = current.left
            elif value > current.value:
                if not current.right:
                    current.right = new_node
                    return self
                current = current.right

    def find(self):
        if not self.root:
            return False
        current = self.root
        found = False
        while not found and current:
            if value < current.value:
                current = current.left
            elif value > current.value:
                current = current.right
            else:
                found = True
        if not found:
            return False
        return current

    def BFS(self):
        data = []
        queue = []
        current = self.root
        queue.append(self.root)
        while queue:
            current = queue.pop(0)
            data.append(current)
            if current.left:
                queue.append(current.left)
            if current.right:
                queue.append(current.right)
        return data

    def DFSPreOrder(self):
        data = []
        current = self.root

        def traverse(node):
            data.append(node)
            if node.left:
                traverse(node.left)
            if node.right:
                traverse(node.right)
        traverse(current)
        return data

    def DFSPostOrder(self):
        data = []
        current = self.root

        def traverse(node):
            if node.left:
                traverse(node.left)
            if node.right:
                traverse(node.right)
            data.append(self.root)
        traverse(self.root)
        return data

    def DFSInOrder(self):
        data = []
        current = self.root

        def traverse(node):
            if node.left:
                traverse(node.left)
            data.append(node.value)
            if node.right:
                traverse(node.right)
        traverse(self.root)
        return data
