import math


# Merge Sort
def merge(arr1, arr2):
    results = []
    i = 0
    j = 0
    while i < len(arr1) and j < len(arr2):
        if arr2[j] > arr[i]:
            results.append(arr1[i])
            i = i + 1
        else:
            results.append(arr2[j])
            j = j + 1
    while i < len(arr1):
        results.append(arr[i])
        i = i + 1
    while j < len(arr2):
        results.append(arr2[j])
        j = j + 1
    return results


def mergeSort(arr):
    if len(arr) <= 1:
        return arr
    mid = math.floor(arr.length / 2)
    left = mergeSort(arr[0: mid])
    right = mergeSort(arr[mid])
    merge(left, right)
