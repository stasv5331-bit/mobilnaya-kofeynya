"use strict";

// ============================================
// 8 ЗАДАНИЕ: ОБЪЕКТЫ В JAVASCRIPT
// ============================================

console.log("=== 8 ЗАДАНИЕ: ОБЪЕКТЫ В JAVASCRIPT ===\n");

// ============================================
// 1. СПОСОБЫ СОЗДАНИЯ ОБЪЕКТОВ
// ============================================

console.log("1. СПОСОБЫ СОЗДАНИЯ ОБЪЕКТОВ:\n");

// Способ 1: Литерал объекта
const coffee1 = {
    name: "Эспрессо",
    price: 150,
    volume: 30,
    ingredients: ["кофе", "вода"]
};
console.log("  Способ 1 (литерал):", coffee1);

// Способ 2: new Object()
const coffee2 = new Object();
coffee2.name = "Капучино";
coffee2.price = 250;
coffee2.volume = 300;
coffee2.ingredients = ["кофе", "молоко", "вода"];
console.log("  Способ 2 (new Object):", coffee2);

// Способ 3: Object.create()
const coffeePrototype = {
    type: "кофе",
    getInfo() {
        return `${this.name} — ${this.price} руб.`;
    }
};
const coffee3 = Object.create(coffeePrototype);
coffee3.name = "Латте";
coffee3.price = 270;
coffee3.volume = 400;
console.log("  Способ 3 (Object.create):", coffee3);
console.log("    Метод getInfo():", coffee3.getInfo());

// Способ 4: Конструктор (будет позже)
console.log("  Способ 4 (конструктор) — см. раздел 3\n");

// ============================================
// 2. СПОСОБЫ ДОСТУПА К СВОЙСТВАМ
// ============================================

console.log("2. СПОСОБЫ ДОСТУПА К СВОЙСТВАМ:\n");

const coffee4 = {
    name: "Раф-кофе",
    price: 300,
    "volume-ml": 350,
    "special ingredient": "ванильный сахар"
};

// Способ 1: Через точку
console.log("  Через точку (name):", coffee4.name);
console.log("  Через точку (price):", coffee4.price);

// Способ 2: Через квадратные скобки
console.log("  Через [] (volume-ml):", coffee4["volume-ml"]);
console.log("  Через [] (special ingredient):", coffee4["special ingredient"]);

// Запись свойств
coffee4.price = 320;
coffee4["volume-ml"] = 400;
coffee4.newProperty = "Новое свойство";
console.log("  После записи:", coffee4);

// Способ 3: Перебор всех свойств (for...in)
console.log("\n  Перебор свойств (for...in):");
for (let key in coffee4) {
    console.log(`    ${key}: ${coffee4[key]}`);
}

// ============================================
// 3. СОБСТВЕННЫЙ КОНСТРУКТОР Coffee
// ============================================

console.log("\n3. СОБСТВЕННЫЙ КОНСТРУКТОР Coffee:\n");

function Coffee(name, price, volume, additives = []) {
    this.name = name;
    this.price = price;
    this.volume = volume;
    this.additives = additives;
    this.type = "кофе";
    
    // Метод: вывод информации о напитке
    this.getInfo = function() {
        return `${this.name} (${this.volume} мл) — ${this.price} руб.`;
    };
    
    // Метод: добавить добавку
    this.addAdditive = function(additive) {
        this.additives.push(additive);
        this.price += 20;
        return `Добавлена "${additive}". Новая цена: ${this.price} руб.`;
    };
    
    // Метод: удалить добавку
    this.removeAdditive = function(additive) {
        const index = this.additives.indexOf(additive);
        if (index !== -1) {
            this.additives.splice(index, 1);
            this.price -= 20;
            return `Удалена "${additive}". Новая цена: ${this.price} руб.`;
        }
        return `Добавка "${additive}" не найдена`;
    };
}

// Создаем объекты с помощью конструктора
const espresso = new Coffee("Эспрессо", 150, 30);
const cappuccino = new Coffee("Капучино", 250, 300, ["корица"]);
const latte = new Coffee("Латте", 270, 400, ["сироп"]);

console.log("  Созданные напитки:");
console.log(`    ${espresso.getInfo()}`);
console.log(`    ${cappuccino.getInfo()}`);
console.log(`    ${latte.getInfo()}`);

// Демонстрация методов
console.log("\n  Демонстрация методов:");
console.log(`    До добавления: ${cappuccino.getInfo()}`);
console.log(`    ${cappuccino.addAdditive("шоколад")}`);
console.log(`    После добавления: ${cappuccino.getInfo()}`);
console.log(`    ${cappuccino.removeAdditive("корица")}`);
console.log(`    После удаления: ${cappuccino.getInfo()}`);

// ============================================
// 4. РАСШИРЕНИЕ ВСТРОЕННОГО ТИПА Array
// ============================================

console.log("\n4. РАСШИРЕНИЕ Array — метод average():\n");

// Добавляем метод average() в прототип Array
if (!Array.prototype.average) {
    Array.prototype.average = function() {
        if (this.length === 0) {
            return 0;
        }
        let sum = 0;
        for (let i = 0; i < this.length; i++) {
            sum += this[i];
        }
        return sum / this.length;
    };
}

const prices = [150, 250, 270, 300, 180];
console.log(`  Цены: [${prices.join(", ")}]`);
console.log(`  Средняя цена: ${prices.average().toFixed(2)} руб.`);

const sales = [120, 85, 200, 150, 95, 210];
console.log(`  Продажи: [${sales.join(", ")}]`);
console.log(`  Средние продажи: ${sales.average().toFixed(2)} руб./день`);

// ============================================
// 5. РАСШИРЕНИЕ ВСТРОЕННОГО ТИПА Date
// ============================================

console.log("\n5. РАСШИРЕНИЕ Date — метод daysSince():\n");

// Добавляем методы в прототип Date
if (!Date.prototype.daysSince) {
    Date.prototype.daysSince = function(otherDate) {
        const oneDay = 24 * 60 * 60 * 1000;
        const diffMs = Math.abs(this - otherDate);
        return Math.round(diffMs / oneDay);
    };
    
    Date.prototype.getFormatted = function() {
        return `${this.getDate()}.${this.getMonth() + 1}.${this.getFullYear()}`;
    };
}

// Создаем дату открытия кофейни
const openingDate = new Date(2024, 0, 15); // 15 января 2024
const today = new Date();

console.log(`  Дата открытия: ${openingDate.getFormatted()}`);
console.log(`  Сегодня: ${today.getFormatted()}`);
console.log(`  Дней с открытия: ${today.daysSince(openingDate)} дней`);

// Демонстрация с другой датой
const newYear = new Date(2026, 0, 1);
console.log(`  До Нового года: ${today.daysSince(newYear)} дней`);

// ============================================
// 6. ВЫВОД НА СТРАНИЦУ
// ============================================

console.log("\n✅ 8 задание выполнено!");

// Функция для вывода информации на страницу
function displayObjectsInfo() {
    const container = document.getElementById('objects-info');
    if (!container) return;
    
    let html = `
        <h3>📚 Объекты в JavaScript</h3>
        
        <div class="objects-section">
            <h4>☕ 1. Способы создания объектов</h4>
            <ul>
                <li><strong>Литерал:</strong> Эспрессо (${coffee1.price} руб.)</li>
                <li><strong>new Object():</strong> Капучино (${coffee2.price} руб.)</li>
                <li><strong>Object.create():</strong> Латте (${coffee3.price} руб.)</li>
                <li><strong>Конструктор:</strong> Раф-кофе (320 руб.)</li>
            </ul>
        </div>
        
        <div class="objects-section">
            <h4>📝 2. Способы доступа к свойствам</h4>
            <ul>
                <li>Через точку: <code>coffee4.name = ${coffee4.name}</code></li>
                <li>Через []: <code>coffee4["volume-ml"] = ${coffee4["volume-ml"]}</code></li>
                <li>Перебор: <code>for...in</code> — выводит все свойства</li>
            </ul>
        </div>
        
        <div class="objects-section">
            <h4>☕ 3. Конструктор Coffee</h4>
            <ul>
                <li>${espresso.getInfo()} — добавки: ${espresso.additives.length > 0 ? espresso.additives.join(", ") : "нет"}</li>
                <li>${cappuccino.getInfo()} — добавки: ${cappuccino.additives.length > 0 ? cappuccino.additives.join(", ") : "нет"}</li>
                <li>${latte.getInfo()} — добавки: ${latte.additives.length > 0 ? latte.additives.join(", ") : "нет"}</li>
            </ul>
            <p><strong>Методы:</strong> <code>getInfo()</code>, <code>addAdditive()</code>, <code>removeAdditive()</code></p>
        </div>
        
        <div class="objects-section">
            <h4>📊 4. Расширение Array — метод average()</h4>
            <p>Цены: [${prices.join(", ")}] → <strong>средняя: ${prices.average().toFixed(2)} руб.</strong></p>
            <p>Продажи: [${sales.join(", ")}] → <strong>средние: ${sales.average().toFixed(2)} руб./день</strong></p>
        </div>
        
        <div class="objects-section">
            <h4>📅 5. Расширение Date — метод daysSince()</h4>
            <p>Кофейня открыта: ${openingDate.getFormatted()}</p>
            <p>Сегодня: ${today.getFormatted()}</p>
            <p><strong>Прошло ${today.daysSince(openingDate)} дней с открытия!</strong></p>
            <p>До Нового года: ${today.daysSince(newYear)} дней</p>
        </div>
    `;
    
    container.innerHTML = html;
}

// Запускаем вывод на страницу после загрузки
document.addEventListener('DOMContentLoaded', displayObjectsInfo);

console.log("✅ 8 задание загружено!");
console.log("   - 4 способа создания объектов");
console.log("   - 3 способа доступа к свойствам");
console.log("   - Конструктор Coffee с методами");
console.log("   - Расширение Array (average)");
console.log("   - Расширение Date (daysSince)");