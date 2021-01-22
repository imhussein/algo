import bcrypt
from abc import abstractmethod, ABCMeta


class Details(metaclass=ABCMeta):
    @abstractmethod
    def get_age(self):
        pass


class Member(Details):
    NOT_ALLOWED_NAMES = ["Mohamed", "Hussein"]
    MEMBERS_COUNT = 0

    def __init__(self, fname, lname, username, email, password):
        self.fname = fname
        self.lname = lname
        self.username = username
        self.email = email
        self.password = password
        self.age = 26
        Member.MEMBERS_COUNT += 1

    def get_fname(self):
        return self.fname

    def get_fullname(self):
        if self.fname not in Member.NOT_ALLOWED_NAMES:
            raise ValueError("First Name Not Allowed")
        else:
            return f"{self.fname} {self.lname}"

    def get_lname(self):
        return self.lname

    def get_email(self):
        return self.email

    def get_username(self):
        return self.username

    @classmethod
    def get_users_count(cls):
        return cls.MEMBERS_COUNT

    @staticmethod
    def say_hello(self):
        print(self)
        Member.MEMBERS_COUNT += 1

    def get_password(self):
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(self.password.encode("utf-8"), salt)
        return hashed

    def check_password(self, password):
        return bcrypt.checkpw(self.password.encode("utf-8"), password)

    def __len__(self):
        return len(Member.NOT_ALLOWED_NAMES)

    def __iter__(self):
        yield "Mohamed"

    def get_age(self):
        return self.age


class Admin(Member, Details):
    def __init__(self, fname, lname, username, email, passwordm, role):
        super().__init__(fname, lname, username, email, password)
        self.age = 1000
        self.role = role


print(Member.MEMBERS_COUNT)
member = Member("Mohamed", "Hussein", "mh10445", "mohamed@gmail.com", "100")
print(member.fname)
print(member.lname)
print(member.username)
print(member.email)
print(member.password)
password = member.get_password()
print(member.check_password(password))
print(Member.MEMBERS_COUNT)
names = [
    {
        "fname": "Jane",
        "lname": "Doe",
        "username": "Joe",
        "email": "joe@gmail.com",
        "password": "323232"
    },
    {
        "fname": "Adam",
        "lname": "Smith",
        "username": "adam",
        "email": "adam@gmail.com",
        "password": "323232"
    },
    {
        "fname": "Lio",
        "lname": "lie",
        "username": "lio",
        "email": "lio@gmail.com",
        "password": "323232"
    }
]


def addUsers():
    for name in names:
        member = Member(name['fname'], name['lname'], name['username'],
                        name['email'], name['password'])
        password = member.get_password()
        checked = member.check_password(password)
        print(member.get_email())
        print(member.get_fname())
        try:
            print(member.get_fullname())
        except ValueError as err:
            print(err, "Error")
        finally:
            print("DONE")
        print(member.get_username())
        print(member.get_lname())
        print(checked)


addUsers()

print(member.MEMBERS_COUNT)
print("=" * 10)
print(Member.get_users_count())
print(Member.get_email(member))
Member.say_hello(member)
print(Member.MEMBERS_COUNT)
print(len(member))
for item in member:
    print(item)
for name in names:
    admin = Admin(name.get("fname"), name.get("lname"),
                  name.get("username"), name.get("email"), name.get("password"), "admin")
    try:
        print(admin.get_fullname())
    except ValueError as err:
        print(err)
    print(admin.age)
