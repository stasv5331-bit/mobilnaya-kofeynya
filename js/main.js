"use strict";

// ============================================
// ЗАДАНИЕ 1: Найти сумму элементов последовательности
// ============================================

/**
 * Вычисляет сумму всех элементов массива
 * @param {number[]} arr - Массив чисел
 * @returns {number} Сумма элементов
 */
function sumArray(arr) {
    // Проверка на пустой массив
    if (arr.length === 0) {
        return 0;
    }
    
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

// ============================================
// ЗАДАНИЕ 2: Найти минимальный элемент в последовательности
// ============================================

/**
 * Находит минимальный элемент в массиве
 * @param {number[]} arr - Массив чисел
 * @returns {number|null} Минимальный элемент или null, если массив пуст
 */
function findMin(arr) {
    // Проверка на пустой массив
    if (arr.length === 0) {
        console.log("Массив пуст!");
        return null;
    }
    
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    return min;
}

// ============================================
// ЗАДАНИЕ 5: Общее сопротивление при параллельном соединении
// ============================================

/**
 * Вычисляет общее сопротивление цепи при параллельном соединении
 * Формула: 1 / Rобщ = 1/R1 + 1/R2 + ... + 1/Rn
 * @param {number[]} resistors - Массив сопротивлений
 * @returns {number|null} Общее сопротивление или null, если массив пуст
 */
function parallelResistance(resistors) {
    // Проверка на пустой массив
    if (resistors.length === 0) {
        console.log("Массив сопротивлений пуст!");
        return null;
    }
    
    // Проверка на нулевые сопротивления
    for (let i = 0; i < resistors.length; i++) {
        if (resistors[i] === 0) {
            console.log("Ошибка: Сопротивление не может быть нулевым!");
            return null;
        }
    }
    
    let sumInverse = 0;
    for (let i = 0; i < resistors.length; i++) {
        sumInverse += 1 / resistors[i];
    }
    
    return 1 / sumInverse;
}

// ============================================
// ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ: Форматирование вывода
// ============================================

/**
 * Выводит результаты в красивом формате
 * @param {string} taskName - Название задания
 * @param {any} result - Результат выполнения
 * @param {any[]} input - Входные данные
 */
function printResult(taskName, result, input) {
    console.log(`=== ${taskName} ===`);
    console.log(`Входные данные: [${input.join(', ')}]`);
    console.log(`Результат: ${result}`);
    console.log('-------------------\n');
    
    // Также выводим в body страницы (если есть элемент с id="results")
    const resultsDiv = document.getElementById('results');
    if (resultsDiv) {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${taskName}:</strong> [${input.join(', ')}] → ${result}`;
        resultsDiv.appendChild(p);
    }
}

// ============================================
// ТЕСТИРОВАНИЕ ФУНКЦИЙ
// ============================================

// Создаем тестовые данные
const testArray1 = [5, 3, 8, 1, 9, 2];
const testArray2 = [-10, 5, -3, 7, -1];
const testResistors = [10, 20, 30];  // сопротивления 10 Ом, 20 Ом, 30 Ом

// Очищаем или создаем div для результатов
document.addEventListener('DOMContentLoaded', function() {
    // Создаем контейнер для результатов, если его нет
    if (!document.getElementById('results')) {
        const resultsDiv = document.createElement('div');
        resultsDiv.id = 'results';
        resultsDiv.innerHTML = '<h2>Результаты выполнения заданий:</h2>';
        document.body.appendChild(resultsDiv);
    }
});

// Выполняем задания
setTimeout(() => {
    // Задание 1
    const sum1 = sumArray(testArray1);
    printResult('Сумма элементов (массив 1)', sum1, testArray1);
    
    const sum2 = sumArray(testArray2);
    printResult('Сумма элементов (массив 2)', sum2, testArray2);
    
    // Задание 2
    const min1 = findMin(testArray1);
    printResult('Минимальный элемент (массив 1)', min1, testArray1);
    
    const min2 = findMin(testArray2);
    printResult('Минимальный элемент (массив 2)', min2, testArray2);
    
    // Задание 5
    const totalResistance = parallelResistance(testResistors);
    printResult('Общее сопротивление (параллельное)', totalResistance.toFixed(2) + ' Ом', testResistors);
    
    // Дополнительные тесты
    const emptyArray = [];
    const emptyResult = sumArray(emptyArray);
    printResult('Сумма элементов (пустой массив)', emptyResult, emptyArray);
    
    const zeroResistance = [10, 0, 30];
    const zeroResult = parallelResistance(zeroResistance);
    printResult('Общее сопротивление (с нулем)', zeroResult || 'Ошибка', zeroResistance);
}, 100);