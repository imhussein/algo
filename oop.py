class User:
    age = 100

    def __init__(self, first_name, last_name, user_name, email, password):
        self.first_name = first_name
        self.last_name = last_name
        self.secret = "Mohamed"
        self.email = email
        self.password = password
        self.user_name = user_name
        self.__message = self.first_name
        User.age += 1

    def check_user_name(self):
        letters = [letter * (index + 1) if letter is "m" else index *
                   letter for index, letter in enumerate(self.user_name)]
        return letters

    def get_first_name(self, start=0, end=10):
        print(self.age)
        return f"Firstname is {self.first_name[start: end]}"

    def get_input_add_first_name(self):
        value = input("What is first name ? ")
        print(f"First name is {self.first_name} And Value is {value}")

    @classmethod
    def get_my_name(cls):
        print(cls.age)

    def __repr__(self):
        return self.first_name


class Person(User):

    def __init__(self, first_name, last_name, user_name, email, password):
        super().__init__(first_name, last_name, user_name, email, password)

    @property
    def get_age(self):
        return self.age

    @get_age.setter
    def set_age(self, new_age):
        if new_age >= 0:
            self.age = new_age
        else:
            self.age = 100

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    @full_name.setter
    def set_full_name(self, name):
        if len(name) > 0:
            self.first_name, self.last_name = name[0:2], name[3:]


person = Person('Mohamed', 'Hussein', 'mh10445',
                'mohamed@gmail.com', '1234567')
person.set_age = 100000000000000
person.set_full_name = 'That is name'
print(person.full_name)


class Mohamed:
    def __init__(self):
        self.name = "Moamed"

    def get_name(self):
        return f"Mohamed {self.name}"


class Ahmed:
    def __init__(self):
        self.name = "Ahmed"

    def get_name(self):
        return f"Ahmed {self.name}"


class One(Ahmed, Mohamed):
    pass


one = One()
print(one.get_name(), 'Name')


class Magic:
    def __init__(self, first, last, age):
        self.first = first
        self.last = last
        self.age = age

    def __repr__(self):
        return f"Name is `{self.first} {self.last}`"

    def __len__(self):
        return 10000

    def __add__(self, other):
        if isinstance(other, Magic):
            return 'mohamed is my name'
        else:
            return 'mohamed is my name other value'

    def __mul__(self, other):
        if isinstance(other, Magic):
            return [letter * (index + 1) if letter is "M" else letter * index for index, letter in enumerate(self.first)]

    def __eq__(self, other):
        value = [[x * (x + i) * letter if x == 0 and letter is 'M' else (x * i)
                  * letter for x in range(0, 20)] for i, letter in enumerate([*'Mohamed'])]
        return value


magic = Magic('mohamed', 'hussein', 10)
print(len(magic))
print(magic)
print(magic + magic)
print(magic * magic)
print(magic == magic)


class Events:
    def __init__(self):
        self._events = {}

    def _on(self, event_name, callback):
        if event_name not in self._events:
            self._events[event_name] = []
        if event_name in self._events:
            self._events[event_name].append(callback)

    def _emit(self, event_name):
        if self._events[event_name]:
            for callback in self._events[event_name]:
                callback(event_name)


mohamed = Events()
mohamed._on("log", lambda name: print(name))
mohamed._emit("log")
