const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const millionBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.title} ${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}

// double everyone's money
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 };
    });

    updateDOM();
}

// sort users by richest
function sortRichest() {
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}

// filter only millionaires
function showMillion() {
    data = data.filter( user => user.money > 1000000);

    updateDOM();
}

// calculate the total wealth
function calculate() {
    const wealth = data.reduce((acc, user) => (acc + user.money), 0);

    const wealthEle = document.createElement('div');
    wealthEle.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEle);
}

// add new obj to data arr
function addData(user) {
    data.push(user);

    updateDOM();
}

// format number as money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// update DOM
function updateDOM(provideData = data) {
    // clear main dom
    main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;

    provideData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    })
}

// Event listener
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortRichest);
millionBtn.addEventListener('click', showMillion);
calculateBtn.addEventListener('click', calculate);