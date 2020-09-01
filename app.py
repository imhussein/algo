from math import floor

# Linear Search Time complexity of O(n)


def linearSearch(arr, value):
    end = len(arr)
    for i in range(end):
        if arr[i] == value:
            return i
    return -1


# print(linearSearch([*'Mohamed'], 'h'))

# Binary Search Time Complexity O(1)
def binarySearch(arr, value):
    start = 0
    end = len(arr) - 1
    middle = floor((start + end) / 2)
    while arr[middle] != value and end >= start:
        start = middle + 1 if arr[middle] < value else start
        end = middle - 1 if arr[middle] > value else end
        middle = floor((start + end) / 2)
    return middle if arr[middle] else -1


# print(binarySearch(arr=[1, 2, 3, 4, 5, 6, 7, 8, 9], value=7))

# Count Matchs Time Complexity O(n2)
def matchesCount(long, short):
    count = 0
    for i in range(len(long)):
        for j in range(len(short)):
            if short[j] != long[i+j]:
                break
            if j == len(short) - 1:
                count += 1
    return count


# print(matchesCount('lorie loled', 'lol'))

# Bubble Sort Time Complexity O(n2)
def bubbleSort(arr):
    for i in range(len(arr)):
        for j in range(len(arr) - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr


# print(bubbleSort([2, 3, 8, 6, 1, 12, 9, 4]))

def bubbleSortV2(arr):
    end = len(arr) - 1
    while end > 0:
        for i in range(end):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
        end -= 1
    return arr


# print(bubbleSortV2([2, 3, 8, 6, 1, 12, 9, 4]))

# Selection Sort Time Complexity O(n2)
def selectionSort(arr):
    end = len(arr)
    for i in range(end):
        lowest = i
        for j in range(i + 1, end):
            if arr[j] < arr[lowest]:
                lowest = j
            arr[i], arr[lowest] = arr[lowest], arr[i]
    return arr


# print(selectionSort([2, 3, 8, 6, 1, 12, 9, 4]))

# Merge
def merge(arr1, arr2):
    results = []
    i = 0
    j = 0
    while i < len(arr1) and j < len(arr2):
        if arr2[j] > arr1[i]:
            results.append(arr1[i])
            i += 1
        else:
            results.append(arr2[j])
            j += 1
    while i < len(arr1):
        results.append(arr1[i])
        i += 1
    while j < len(arr2):
        results.append(arr2[j])
        j += 1
    return results

# Merge Sort Time Complexity O(n)


def mergeSort(arr):
    if len(arr) <= 1:
        return arr
    mid = floor(len(arr) / 2)
    left = mergeSort(arr[0:mid])
    right = mergeSort(arr[mid:])
    return merge(left, right)


print(mergeSort([12, 3, 46, 1]))
