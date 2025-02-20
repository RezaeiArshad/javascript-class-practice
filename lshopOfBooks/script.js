const bookShelves = document.getElementById("books-container")
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");
const cartDiv = document.getElementById("cart");
const showCartBtn = document.getElementById("show-cart")
const selectedBooks = document.getElementById("selected-books")
const clearCartBtn = document.getElementById("clear-cart")
const numberOfSelectedBooks = document.getElementById("number-of-selected-books");
const netAmount = document.getElementById("total-price");

const books = [
    {
        name: "The let them theory",
        author: "Mel Robins",
        price: 20.00,
    },
    {
        name: "Forgotten Home Apothecary",
        author: "Dr. Nicole Apelian",
        price: 37.00,
    },
    {
        name: "I Wish Someone Had Told Me",
        author: "Dana perino",
        price: 20.30,
    },
    {
        name: "The Technological Republic",
        author: "Alexander C.Karp",
        price: 22.41,
    },
    {
        name: "Sunrice on the Reaping",
        author: "Suzane Collins",
        price: 19.59,
    },
    {
        name: "Atomic Habits",
        author: "James Clear",
        price: 2.00,
    },
    {
        name: "Inner Excellence",
        author: "Jim Murphy",
        price: 15.15,
    },
    {
        name: "The Housemaid",
        author: "Freida McFadden",
        price: 1.93,
    },
    {
        name: "Onyx Storm",
        author: "Rebbeca Yarros",
        price: 15.70,
    },
    {
        name: "The Crash",
        author: "Freida McFaffen",
        price: 11.27,
    },
    {
        name: "1984: 75th Anniversary",
        author: "George Orwell",
        price: 1.74,
    }
];

books.forEach(({name, author, price}) => {
    bookShelves.innerHTML += `
    <div class="book" id="${name}-${author}">
      <p><strong>${name}</strong></p>
      <p>${author}</p>
      <p>${price} $</p>
      <button class="add-to-cart-btn">Add To Cart</button>
    </div>
    `
});

[...addToCartBtns].forEach((btn) => {
    btn.addEventListener("click", (event) => {
        cart.addItem(String(event.target.parentElement.id), books);
    })
})

class ShoppingCart {
    constructor () {
    this.items = [];
    this.numberOfItems = 0;
    this.totalAmount = 0;
    }

    updateNumber(num) {
        numberOfSelectedBooks.innerText = num;
    }
    
    addItem(idOfTheCallingDiv, allBooks) {
      const addedBook = allBooks.find((item) => `${item.name}-${item.author}` === idOfTheCallingDiv);
      const {name, author, price} = addedBook;
      selectedBooks.innerHTML += `
      <div id="selected-book">
        <p>${name}</p>
        <p>price: <span>${price}</span> $</p>
      </div>
      `;
      this.items.push(`${name}-${author}`);
      this.numberOfItems = this.items.length;
      this.updateNumber(this.numberOfItems);
      this.addThePrices(price);
    }

    addThePrices(pri) {
      const totalPrice = this.totalAmount += pri;
      this.netAmount(totalPrice);
    }

    netAmount(totalPri) {
      const tax = Math.ceil((totalPri / 100) * 9);
      netAmount.innerText = tax + this.totalAmount;
    }

    clearCart() {
      if (!this.numberOfItems) {
        alert("Your cart is already empty");
        return
      }
      else {
      const youSure = confirm("Are you sure you want to clear the cart?");
        if (youSure) {
            this.items = [];
            this.numberOfItems = 0;
            this.totalAmount = 0;
            selectedBooks.innerHTML = "";
            netAmount.innerHTML = "";
            numberOfSelectedBooks.innerHTML = "";
        }
        }
    }
}

const cart = new ShoppingCart();

clearCartBtn.addEventListener("click", cart.clearCart.bind(cart));

const hideCart = () => {
   cartDiv.style.display = "none";
   showCartBtn.innerText = "show cart";
   showCartBtn.onclick = showCart
};

const showCart = () => {
  cartDiv.style.display = "block";
  showCartBtn.innerText = "hide cart";
  showCartBtn.onclick = hideCart;
};

showCartBtn.onclick = showCart;