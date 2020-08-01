function test(person) {
    person.age = 30

    person = {
        name: 'aaa',
        age: 23
    }
    return person
}

const p1 = {
    name: 'also',
    age: 11
}
const p2 = test(p1)

console.log(p1)
console.log(p2)