// sortingAlgorithms.js

export const bubbleSort = (array) => {
    const animations = [];
    const arr = [...array];
  
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        animations.push([j, j + 1, false]);
        if (arr[j] > arr[j + 1]) {
          animations.push([j, j + 1, true]);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
  
    return animations;
  };
  
  export const selectionSort = (array) => {
    const animations = [];
    const arr = [...array];
  
    for (let i = 0; i < arr.length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        animations.push([j, minIdx, false]);
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        animations.push([i, minIdx, true]);
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      }
    }
  
    return animations;
  };
  
  export const insertionSort = (array) => {
    const animations = [];
    const arr = [...array];
  
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      animations.push([i, j, false]);
      while (j >= 0 && arr[j] > key) {
        animations.push([j + 1, j, true]);
        arr[j + 1] = arr[j];
        j--;
        if (j >= 0) animations.push([j + 1, j, false]);
      }
      arr[j + 1] = key;
    }
  
    return animations;
  };
  
  export const quickSort = (array) => {
    const animations = [];
    const arr = [...array];
  
    const partition = (low, high) => {
      const pivot = arr[high];
      let i = low - 1;
  
      for (let j = low; j < high; j++) {
        animations.push([j, high, false]);
        if (arr[j] < pivot) {
          i++;
          animations.push([i, j, true]);
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
      animations.push([i + 1, high, true]);
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      return i + 1;
    };
  
    const quickSortHelper = (low, high) => {
      if (low < high) {
        const pi = partition(low, high);
        quickSortHelper(low, pi - 1);
        quickSortHelper(pi + 1, high);
      }
    };
  
    quickSortHelper(0, arr.length - 1);
    return animations;
  };