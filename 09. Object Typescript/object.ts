const product = {
    data: [
        {
            id: 1,
            name: "Product 1",
            price: 30000
        },
        {
            id: 2,
            name: "Product 2",
            price: 40000
        },
        {
            id: 3,
            name: "Product 3",
            price: 20000
        },
    ]
}

// mencari produk dengan harga lebih sama dengan atau lebih dari 30000 menggunakan filter
const filter = product.data.filter(element => element.price >= 30000)
// [{
//   "id": 1,
//   "name": "Product 1",
//   "price": 30000
// }, {
//   "id": 2,
//   "name": "Product 2",
//   "price": 40000
// }] 
console.log(filter)

// cek nama produk yang harganya lebih dari atau sama dengan 30000
const getFilteredNameProduct = filter.map(element => element.name)
console.log(getFilteredNameProduct)

// mengecek apakah semua produk harganya lebih dari 10000
const isPass = product.data.every(element => element.price >= 10000)
// true
console.log(isPass)

// menghitung total harga semua produk
const getTotal = product.data.reduce((total, element) => total + element.price, 0)
// 90000
console.log(getTotal)

const avrg = getTotal / product.data.length
// 30000
console.log(avrg)

