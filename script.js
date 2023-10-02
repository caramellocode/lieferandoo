let shoppingBasket = [
    {
        "name": "Pizza Bruscetta",
        "category": "Pizza",
        "Zutaten": ["Salami", "pilze", "Pepperoni", "Schinken"],
    
        "icon": "img/faficon1.png"
    },
    {
        "name": "Pizza Cheese Tomato",
        "Zutaten": ["Cheese", "Pilze", "Pepperoni", "Schinken"],
        "image": "img/1.png",
        "category": "Pizza",
        "icon": "img/faficon1.png"
    },
    {
        "name": "Pizza alla Chef",
        "Zutaten": ["Bacon", "Oliven", "Pepperoni", "Schinken"],
        "image": "img/1.png",
        "category": "Pizza",
        "icon": "img/faficon1.png"
    },
    {
        "name": "Pizza Calzone",
        "Zutaten": ["Salami", "pilze", "Pepperoni", "Schinken"],
        "image": "img/herz1",
        "category": "Pizza",
        "icon": "img/faficon1.png"
    },
    {
        "name": "Burger Manhattan",
        "Zutaten": ["Salami", "pilze", "Pepperoni", "Schinken"],
        "image": "img/1.png",
        "category": "Pasta",
        "icon": "img/faficon1.png"
    },
    {
        "name": "Burger Miamy",
        "Zutaten": ["Salami", "pilze", "Pepperoni", "Schinken"],
        "image": "img/1.png",
        "category": "Pasta",
        "icon": "img/faficon1.png"
    },
    {
        "name": "Burger Detroit",
        "Zutaten": ["Salami", "pilze", "Pepperoni", "Schinken"],
        "image": "img/1.png",
        "category": "Pizza",
        "icon": "img/faficon1.png"
    },
    {
        "name": "Burger Caramello",
        "Zutaten": ["Salami", "pilze", "Pepperoni", "Schinken"],
        "image": "img/1.png",
        "category": "Pizza",
        "icon": "img/faficon1.png"
    },

    {
        "name": "Burger Swiss",
        "Zutaten": ["Salami", "pilze", "Pepperoni", "Schinken"],
        "image": "img/1.png",
        "category": "Pizza",
        "icon": "img/faficon1.png"
    },
    {
        "name": "Spaghetti Itakia",
        "Zutaten": ["Salami", "pilze", "Pepperoni", "Schinken"],
        "image": "img/1.png",
        "category": "Burger",
        "icon": "img/faficon1.png"
    },
    {
        "name": "Nudel New York",
        "Zutaten": ["Salami", "pilze", "Pepperoni", "Schinken"],
        "image": "img/1.png",
        "category": "Burger",
        "icon": "img/faficon1.png"
    }
    



];

let prices = [
    { "name": "Pizza Bruscetta", "price": 15 },
    { "name": "Pizza Cheese Tomato", "price": 22 },
    { "name": "Pizza alla Chef", "price": 24 },
    { "name": "Pizza Calzone", "price": 25 }, // Sie haben mehrere Produkte mit dem Namen "Pasta", daher müssten Sie die Preise anpassen, falls sie unterschiedlich sein sollen.
    { "name": "Burger Manhattan", "price": 26 },
    { "name": "Burger Miamy", "price": 27 },
    { "name": "Burger Detroit", "price": 28 },
    { "name": "Burger Caramello", "price": 29 },
    { "name": "Burger Swiss", "price": 30 },
    { "name": "Spaghetti Itakia", "price": 31 },
    { "name": "Nudel New York", "price": 31 }
];

let basketNames = [];
let basketPrices = [];
let basketQuantities = [];

let categoryImages = {
    "Pizza": "img/271_italian_pizza_132.avif",
    "Pasta": "img/burger1.jpg",
    "Burger": "img/pasta_bolognese.avif"
};

function getPriceForProduct(name) {
    return prices.find(p => p.name === name).price;
}

function createShoppingHTML(post) {
    let productPrice = getPriceForProduct(post.name) || 0;
    return `
        <div class="product">
            <button class="add-button" onclick="addItemToBasket('${post.name}', ${productPrice})"><i class="fas fa-plus"></i></button>
            <h2>${post.name}</h2>
            <p>Zutaten: ${post.Zutaten.join(', ')}</p>
            <p><strong>Preis: ${productPrice}€</strong></p>
        </div>
    `;
}

function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    let displayedCategories = [];

    for (let product of shoppingBasket) {
        if (!displayedCategories.includes(product.category)) {
            content.innerHTML += `<img src="${categoryImages[product.category]}" alt="${product.category} Kategoriebild" class="category-image" />`;
            displayedCategories.push(product.category);
        }
        content.innerHTML += createShoppingHTML(product);
    }
    renderBasket();
}

function addItemToBasket(name, price) {
    let index = basketNames.indexOf(name);
    if (index !== -1) {
        basketQuantities[index]++;
    } else {
        basketNames.push(name);
        basketPrices.push(price);
        basketQuantities.push(1);
    }
    renderBasket();
}

function renderBasket() {
    let sidebar = document.querySelector(".sidebarsection");
    sidebar.innerHTML = '<h1>Warenkorb</h1>';

    for (let i = 0; i < basketNames.length; i++) {
        sidebar.innerHTML += `
            <div class="basket-item">
                <h3>${basketNames[i]}</h3>
                <p><strong>${basketPrices[i]}€</strong></p>
                <p>Menge: ${basketQuantities[i]}</p>
                <button class="button2" onclick="increaseQuantity('${basketNames[i]}')">+</button>
                <button class="button2" onclick="decreaseQuantity('${basketNames[i]}')">-</button>
            </div>
        `;
    }

    let total = calculateTotal();
    sidebar.innerHTML += `
        <div class="basket-total">
            <span><strong>Gesamtpreis:</strong></span>
            <span><strong>${total.toFixed(2)}€</strong></span><br>
            <button class=button3>jetzt bestellen</button>
        </div>
    `;
}

function increaseQuantity(name) {
    let index = basketNames.indexOf(name);
    if (index !== -1) {
        basketQuantities[index]++;
        renderBasket();
    }
}

function decreaseQuantity(name) {
    let index = basketNames.indexOf(name);
    if (index !== -1) {
        basketQuantities[index]--;
        if (basketQuantities[index] === 0) {
            basketNames.splice(index, 1);
            basketPrices.splice(index, 1);
            basketQuantities.splice(index, 1);
        }
        renderBasket();
    }
}

function calculateTotal() {
    let total = 0;
    for (let i = 0; i < basketPrices.length; i++) {
        total += basketPrices[i] * basketQuantities[i];
    }
    return total;
}

render();