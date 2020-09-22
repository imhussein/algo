class Mohamed:
    def __init__(self, name):
        self.name = name

    def __enter__(self):
        print(f"Entering {self.name}")
        return 'Value'

    def __exit__(self, exec_type, exec_value, tb):
        print(f"Exiting {self.name}")

    def __next__(self):
        return ['Mohamed']

    def __iter__(self):
        for i, letter in enumerate(self.name):
            yield self.name[i]


with Mohamed("mohamed") as name:
    print(name)
for item in Mohamed('Mohamed Hussein'):
    print(item)
