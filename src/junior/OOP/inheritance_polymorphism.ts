// наследование
// наследование одними классами свойств и поведений других классов для дальнейшего расширения или модификации
class Animal {
    say(): string {
        return "hehe"
    }
}

class Cat extends Animal {
    constructor(private name: string) {
        super()
    }

    sayByMe() {
        return `"${super.say()}": ${this.name} said`
    }
}

const Garfield = new Cat("Гарфилд")

Garfield.say()
Garfield.sayByMe()


// полиморфизм
// множество реализаций одного интерфейса
interface Car {
    move(): string
}

class BMW implements Car {
    move(): string {
        return "BMW started moving"
    }
}

class Toyota implements Car {
    move(): string {
        return "Toyota started moving"
    }
}