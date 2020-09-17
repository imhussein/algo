class Mohamed:
    def __init__(self, name):
        self.name = name

    def __enter__(self):
        print(f"Entering {self.name}")
        return 'Value'

    def __exit__(self, exec_type, exec_value, tb):
        print(f"Exiting {self.name}")


with Mohamed("mohamed") as name:
    print(name)
