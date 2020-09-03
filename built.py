import gen
values = map(lambda name: name * 10, [*'Mohamed'])
for value in values:
    print(value)
new_values = filter(lambda name: name is 'M', [*'Mohamed'])
for value in new_values:
    print(value)
is_truthy = any([1, 3, 5, 0, 1, 0, 0, 0, 0])
print(is_truthy)
combined = zip([10, 20], [10, 20])
print(combined)
for item in combined:
    print(item)
valuea = 10
try:
    print(valuea)
except NameError as err:
    print("HHHHHHHHHHH", err)
else:
    print("Else Also")
finally:
    print("Run no matter what")

print(gen.__name__)
