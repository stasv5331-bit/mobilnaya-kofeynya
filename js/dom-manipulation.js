"use strict";

// ============================================
// 9 ЗАДАНИЕ: ДИНАМИЧЕСКОЕ ИЗМЕНЕНИЕ DOM
// ============================================

console.log("=== 9 ЗАДАНИЕ: ДИНАМИЧЕСКОЕ ИЗМЕНЕНИЕ DOM ===\n");

// ============================================
// 1. TO-DO LIST (список задач)
// ============================================

// Получаем элементы (разные способы выборки!)
const todoInput = document.getElementById('todo-input');           // getElementById
const addBtn = document.getElementById('add-todo-btn');            // getElementById
const todoList = document.getElementById('todo-list');             // getElementById
const todoCountSpan = document.getElementById('todo-count');       // getElementById

// Получаем кнопки фильтров через querySelectorAll
const filterBtns = document.querySelectorAll('.filter-btn');        // querySelectorAll

// Текущий фильтр
let currentFilter = 'all';

// Функция обновления счетчика задач
function updateTodoCount() {
    const items = document.querySelectorAll('.todo-item');          // querySelectorAll
    let activeCount = 0;
    
    items.forEach(item => {
        const checkbox = item.querySelector('.todo-checkbox');
        if (!checkbox.checked) {
            activeCount++;
        }
    });
    
    todoCountSpan.textContent = activeCount;
}

// Функция применения фильтра
function applyFilter() {
    const items = document.querySelectorAll('.todo-item');
    
    items.forEach(item => {
        const checkbox = item.querySelector('.todo-checkbox');
        const isCompleted = checkbox.checked;
        
        if (currentFilter === 'all') {
            item.style.display = 'flex';
        } else if (currentFilter === 'active') {
            item.style.display = isCompleted ? 'none' : 'flex';
        } else if (currentFilter === 'completed') {
            item.style.display = isCompleted ? 'flex' : 'none';
        }
    });
}

// Функция добавления новой задачи
function addTodoItem() {
    const taskText = todoInput.value.trim();
    
    if (taskText === '') {
        alert('Введите текст задачи!');
        return;
    }
    
    // Создаем новый элемент списка (createElement)
    const li = document.createElement('li');
    li.className = 'todo-item';
    
    // Создаем чекбокс
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    
    // Создаем span для текста
    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = taskText;
    
    // Создаем кнопку удаления
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'todo-delete';
    deleteBtn.textContent = '🗑️';
    
    // Добавляем обработчики событий
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
        updateTodoCount();
        applyFilter();
        console.log(`[СПИСОК] Задача "${taskText}" ${checkbox.checked ? 'выполнена' : 'активна'}`);
    });
    
    deleteBtn.addEventListener('click', function() {
        li.remove();  // современный метод remove()!
        updateTodoCount();
        applyFilter();
        console.log(`[СПИСОК] Удалена задача: "${taskText}"`);
    });
    
    // Собираем элемент
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    
    // Добавляем в список (appendChild)
    todoList.appendChild(li);
    
    // Очищаем поле ввода
    todoInput.value = '';
    todoInput.focus();
    
    updateTodoCount();
    applyFilter();
    
    console.log(`[СПИСОК] Добавлена задача: "${taskText}"`);
}

// Обработчик на кнопку добавления (addEventListener)
addBtn.addEventListener('click', addTodoItem);

// Добавление по Enter
todoInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTodoItem();
    }
});

// Обработчики для фильтров
filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Убираем active у всех кнопок
        filterBtns.forEach(b => b.classList.remove('active'));
        // Добавляем active текущей
        this.classList.add('active');
        
        // Устанавливаем фильтр
        if (this.id === 'filter-all') {
            currentFilter = 'all';
        } else if (this.id === 'filter-active') {
            currentFilter = 'active';
        } else if (this.id === 'filter-completed') {
            currentFilter = 'completed';
        }
        
        applyFilter();
        console.log(`[СПИСОК] Применен фильтр: ${currentFilter}`);
    });
});

// Инициализация существующих задач
function initExistingTasks() {
    const items = document.querySelectorAll('.todo-item');
    
    items.forEach(item => {
        const checkbox = item.querySelector('.todo-checkbox');
        const span = item.querySelector('.todo-text');
        const deleteBtn = item.querySelector('.todo-delete');
        const taskText = span.textContent;
        
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                item.classList.add('completed');
            } else {
                item.classList.remove('completed');
            }
            updateTodoCount();
            applyFilter();
            console.log(`[СПИСОК] Задача "${taskText}" ${checkbox.checked ? 'выполнена' : 'активна'}`);
        });
        
        deleteBtn.addEventListener('click', function() {
            item.remove();
            updateTodoCount();
            applyFilter();
            console.log(`[СПИСОК] Удалена задача: "${taskText}"`);
        });
    });
    
    updateTodoCount();
    applyFilter();
}

// Запускаем инициализацию
initExistingTasks();

// ============================================
// 2. ГАЛЕРЕЯ С МОДАЛЬНЫМ ОКНОМ
// ============================================

// Получаем элементы
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');
const modalClose = document.querySelector('.modal-close');

// Получаем все миниатюры через getElementsByClassName и преобразуем в массив
const thumbnails = document.getElementsByClassName('gallery-thumb');
const thumbnailsArray = Array.from(thumbnails);

// Функция открытия модального окна
function openModal(imgSrc, imgAlt) {
    modal.style.display = 'block';
    modalImg.src = imgSrc;
    modalCaption.textContent = imgAlt;
    console.log(`[ГАЛЕРЕЯ] Открыто изображение: ${imgAlt}`);
}

// Добавляем обработчики на миниатюры
thumbnailsArray.forEach(thumb => {
    thumb.addEventListener('click', function() {
        const fullSrc = this.getAttribute('data-full') || this.src;
        const alt = this.alt;
        openModal(fullSrc, alt);
    });
});

// Закрытие модального окна
modalClose.addEventListener('click', function() {
    modal.style.display = 'none';
    console.log('[ГАЛЕРЕЯ] Модальное окно закрыто');
});

// Закрытие по клику на фон
modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        console.log('[ГАЛЕРЕЯ] Модальное окно закрыто (клик на фон)');
    }
});

// Закрытие по Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        console.log('[ГАЛЕРЕЯ] Модальное окно закрыто (Escape)');
    }
});

console.log("✅ 9 задание загружено!");
console.log("   - To-Do List: добавление, удаление, фильтрация задач");
console.log("   - Галерея: открытие картинок в модальном окне");
console.log("   - Использованы разные способы выборки элементов");