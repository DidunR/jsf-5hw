//1
// Напишіть клас Круг та реалізуйте функціонал:
// - Визначте конструктор, який запитує координати центру кола, його радіус та ініціалізує об'єкт;
// - Визначте метод отримання довжини кола для поточного об'єкта (L = 2 * π * R);
// - Визначте статичний метод, який приймає радіус та повертає довжину кола для заданого радіусу;
// - Визначте метод отримання об'єкта-кола, який повертає копію поточного об'єкта;
// - Визначте статичний метод, який приймає координати центра кола, його радіус та повертає об'єкт кола із заданими параметрами;
// - Визначте метод перевірки попадання крапки до кола;
// - Визначте метод перетворення поточного стану об'єкта на символьний рядок (toString()).

class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    getCircumference() {
        return 2 * Math.PI * this.radius;
    }
    static getCircumferenceByRadius(radius) {
        return 2 * Math.PI * radius;
    }
    getCopy() {
        return new Circle(this.x, this.y, this.radius);
    }
    static getCircleByParams(x, y, radius) {
        return new Circle(x, y, radius);
    }
    isPointInside(x, y) {
        const distance = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
        return distance <= this.radius;
    }
    toString() {
        return `Circle with center (${this.x}, ${this.y}) and radius ${this.radius}`;
    }
}

const circle = new Circle(2, 3, 5);

console.log(circle.getCircumference());
console.log(Circle.getCircumferenceByRadius(5));
console.log(circle.getCopy());
console.log(Circle.getCircleByParams(1, 1, 3));
console.log(circle.isPointInside(3, 4));
console.log(circle.toString());


//2
// Напишіть функцію propsCount(currentObject), яка приймає об’єкт і визначає кількість властивостей цього об’єкта.
// Наприклад:
let mentor = {
    course: "JS fundamental",
    duration: 3,
    direction: "web-development"
};
propsCount(mentor);
console.log(propsCount(mentor));

function propsCount(currentObject) {
    let count = 0;
    for (let prop in currentObject) {
        if (currentObject.hasOwnProperty(prop)) {
            count++;
        }
    }
    return count;
}


//3
// - Створіть клас Person, у якого конструктор приймає параметри name і surname, а також міститься метод showFullName(), який виводить у консоль ім’я і прізвище особи. 
// - Від класу Person наслідується клас Student, конструктор якого крім name і surname, приймає параметр year (рік вступу до університету). 
// - В класі Student необхідно перевизначити метод showFullName(midleName), щоб виводилося не лише ім’я, прізвище, але і по-батькові (midleName) студента. 
// - Також в класі Student необхідно реалізувати метод showCourse(), який виводитиме поточний курс студента (від 1 до 6). Значення курсу визначатиметься як різниця поточного року (визначити самостійно) і року вступу до ВНЗ.
// Приклад результату:
// const stud1 = new Student("Petro", "Petrenko", 2019);
// console.log(stud1.showFullName("Petrovych")); // Petrenko Petro Petrovych
// console.log("Current course: " + stud1.showCourse()); //Current course: 4

class Person {
    constructor(name, surname) {
        this.name = name;
        this.surname = surname;
    }
    showFullName() {
        console.log(this.surname + ' ' + this.name);
    }
}
class Student extends Person {
    constructor(name, surname, year) {
        super(name, surname);
        this.year = year;
    }
    showFullName(middleName) {
        console.log(this.surname + ' ' + this.name + ' ' + middleName);
    }
    showCourse() {
        const currentYear = new Date().getFullYear();
        const course = currentYear - this.year + 1;
        return course >= 1 && course <= 6 ? course : null;
    }
}

const stud1 = new Student('Petro', 'Petrenko', 2019);
stud1.showFullName('Petrovych');
console.log('Current course: ' + stud1.showCourse());


//4
// А. Реалізувати клас, який описує простий маркер. У класі мають бути такі компоненти:
// - поле, яке зберігає колір маркера;
// - поле, яке зберігає кількість чорнила в маркері (у відсотках);
// - метод друку (метод приймає рядок і виводить текст відповідним кольором;
// текст виводиться до тих пір, поки в маркері є чорнило; один не пробіловий символ – це 0,5% чорнила в маркері).
// В. Реалізувати клас, що описує маркер, що заправляється, успадкувавши його від простого маркера 
// і додавши метод для заправки маркера. Продемонструвати роботу написаних методів.

class Marker {
    constructor(color, inkAmount) {
        this.color = color;
        this.inkAmount = inkAmount;
    }

    print(text) {
        let inkRequired = text.replace(/ /g, '').length * 0.5;
        if (inkRequired > this.inkAmount) {
            text = text.substr(0, this.inkAmount * 2);
        }
        console.log('%c' + text, `color: ${this.color}`);
        this.inkAmount -= inkRequired;
    }
}

class RefillableMarker extends Marker {
    refill(inkAmount) {
        this.inkAmount += inkAmount;
    }
}

const marker = new RefillableMarker('blue', 50);
marker.print('Hello, world!');
marker.refill(20);
marker.print('This is a longer text that requires more ink.');


//5
// Створіть клас Worker який буде мати конструктор, який приймає наступні властивості: fullName (ім’я і прізвище), 
// dayRate (ставка за день роботи), workingDays (кількість відпрацьованих днів). 
//     1) клас повинен мати метод showSalary(), який буде виводити зарплату працівника. 
//     Зарплата - це добуток ставки dayRate на кількість відпрацьованих днів workingDays. 
//     2) додати приватне поле experience і присвоїти йому значення 1.2 і використовувати його як додатковий множник 
//     при визначенні зарплати – створити метод showSalaryWithExperience(). Вивести значення зарплати з цим коефіцієнтом.
//     3) додати гетери і сетери для поля experience. Встановити значення experience = 1.5 і вивести його на екран.
//     4) Вивести значення зарплати з новим experience.
//     5) Створити кілька екземплярів класу (працівників) з різними зарплатами, як показано в прикладі нижче. 
//     Посортувати зарплату працівників із найбільшим experience по зростанню і вивести результат 
//     в форматі:   worker_fullName: salary_value 
//     6) Реалізувати динамічне сортування для будь-кої кількості працівників-екземплярів класу Worker.

class Worker {
    constructor(fullName, dayRate, workingDays) {
        this.fullName = fullName;
        this.dayRate = dayRate;
        this.workingDays = workingDays;
        this._experience = 1.2;
    }
    showSalary() {
        const salary = this.dayRate * this.workingDays;
        console.log(`${this.fullName} salary: ${salary}`);
        return salary;
    }
    showSalaryWithExperience() {
        const salary = this.dayRate * this.workingDays * this._experience;
        console.log(`${this.fullName} salary: ${salary}`);
        return salary;
    }
    get experience() {
        return this._experience;
    }
    set experience(value) {
        this._experience = value;
    }
    static sortWorkersBySalary(workers) {
        workers.sort((a, b) => a.showSalaryWithExperience() - b.showSalaryWithExperience());
        console.log("Sorted workers by salary:");
        workers.forEach((worker) => console.log(`${worker.fullName}: ${worker.showSalaryWithExperience()}`));
    }
}

const worker1 = new Worker("John Smith", 10, 22);
worker1.showSalary();
worker1.showSalaryWithExperience();
worker1.experience = 1.5;
console.log(`New experience: ${worker1.experience}`);
worker1.showSalaryWithExperience();

const worker2 = new Worker("Mike Johnson", 12, 18);
worker2.showSalary();
worker2.showSalaryWithExperience();
worker2.experience = 1.8;
console.log(`New experience: ${worker2.experience}`);
worker2.showSalaryWithExperience();

const worker3 = new Worker("Jane Dow", 8, 25);
worker3.showSalary();
worker3.showSalaryWithExperience();
worker3.experience = 1.3;
console.log(`New experience: ${worker3.experience}`);
worker3.showSalaryWithExperience();

const workers = [worker1, worker2, worker3];
Worker.sortWorkersBySalary(workers);

