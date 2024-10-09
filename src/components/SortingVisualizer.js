import React, { useState, useEffect, useCallback, useRef } from 'react';
import { bubbleSort, selectionSort, insertionSort, quickSort } from './sortingAlgorithms';
import './SortingVisualizer.css';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(10);
  const [isSorting, setIsSorting] = useState(false);
  const [arraySize, setArraySize] = useState(50);
  const [minValue, setMinValue] = useState(5);
  const [maxValue, setMaxValue] = useState(500);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubbleSort');

  const arrayContainerRef = useRef(null);

  const resetArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
    );
    setArray(newArray);
  }, [arraySize, minValue, maxValue]);

  useEffect(() => {
    resetArray();
  }, [resetArray]);

  const sortArray = useCallback(async () => {
    if (isSorting) return;
    setIsSorting(true);

    let animations;
    switch (selectedAlgorithm) {
      case 'bubbleSort':
        animations = bubbleSort(array);
        break;
      case 'selectionSort':
        animations = selectionSort(array);
        break;
      case 'insertionSort':
        animations = insertionSort(array);
        break;
      case 'quickSort':
        animations = quickSort(array);
        break;
      default:
        animations = bubbleSort(array);
    }

    await animateArray(animations);
    setIsSorting(false);
  }, [array, isSorting, selectedAlgorithm]);

  const animateArray = async (animations) => {
    const arrayBars = arrayContainerRef.current.children;
    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx, isSwap] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = isSwap ? 'red' : 'yellow';

      await new Promise(resolve => {
        requestAnimationFrame(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;

          if (isSwap) {
            setTimeout(() => {
              const tempHeight = barOneStyle.height;
              barOneStyle.height = barTwoStyle.height;
              barTwoStyle.height = tempHeight;
              setArray(prevArray => {
                const newArray = [...prevArray];
                [newArray[barOneIdx], newArray[barTwoIdx]] = [newArray[barTwoIdx], newArray[barOneIdx]];
                return newArray;
              });
            }, speed / 2);
          }

          setTimeout(() => {
            barOneStyle.backgroundColor = '#4a90e2';
            barTwoStyle.backgroundColor = '#4a90e2';
            resolve();
          }, speed);
        });
      });
    }
  };

  const handleArraySizeChange = useCallback((e) => {
    const newSize = Number(e.target.value);
    setArraySize(newSize);
    resetArray();
  }, [resetArray]);

  const handleMinValueChange = useCallback((e) => {
    const newMin = Number(e.target.value);
    setMinValue(newMin);
    if (newMin >= maxValue) {
      setMaxValue(newMin + 1);
    }
    resetArray();
  }, [maxValue, resetArray]);

  const handleMaxValueChange = useCallback((e) => {
    const newMax = Number(e.target.value);
    setMaxValue(newMax);
    if (newMax <= minValue) {
      setMinValue(newMax - 1);
    }
    resetArray();
  }, [minValue, resetArray]);

  return (
    <div className="sorting-visualizer">
      <div className="array-container" ref={arrayContainerRef}>
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              height: `${(value / maxValue) * 100}%`,
              width: `${90 / array.length}%`,
            }}
          >
            <span className="bar-value">{value}</span>
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={resetArray} disabled={isSorting}>Generate New Array</button>
        <button onClick={sortArray} disabled={isSorting}>Sort</button>
        <select 
          value={selectedAlgorithm} 
          onChange={(e) => setSelectedAlgorithm(e.target.value)}
          disabled={isSorting}
        >
          <option value="bubbleSort">Bubble Sort</option>
          <option value="selectionSort">Selection Sort</option>
          <option value="insertionSort">Insertion Sort</option>
          <option value="quickSort">Quick Sort</option>
        </select>
      </div>
      <div className="controls">
        <label>
          Array Size: 
          <input 
            type="number" 
            min="10" 
            max="200" 
            value={arraySize} 
            onChange={handleArraySizeChange}
            disabled={isSorting}
          />
        </label>
        <label>
          Min Value: 
          <input 
            type="number" 
            min="1" 
            max={maxValue - 1} 
            value={minValue} 
            onChange={handleMinValueChange}
            disabled={isSorting}
          />
        </label>
        <label>
          Max Value: 
          <input 
            type="number" 
            min={minValue + 1} 
            max="1000" 
            value={maxValue} 
            onChange={handleMaxValueChange}
            disabled={isSorting}
          />
        </label>
      </div>
      <div className="controls">
        <label>Animation Speed: {speed}ms</label>
        <input
          type="range"
          min="1"
          max="100"
          value={100 - speed}
          onChange={(e) => setSpeed(100 - e.target.value)}
          disabled={isSorting}
        />
      </div>
    </div>
  );
};

export default SortingVisualizer;