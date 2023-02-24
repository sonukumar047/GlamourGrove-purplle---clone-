async function FetchData(){
    try{
        let res = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline`)
        res = await res.json()
        console.log(res)
        DisplayData(res)   
    } catch(err){
        console.log("error", err)
    }
}
//FetchData();

let Brand = document.querySelector(".card")

Brand.addEventListener("click", ()=>{
   // FetchData();
   window.location.href="./product.html"
})

let Cart = JSON.parse(localStorage.getItem("cart"))||[]

let Container = document.querySelector("body")

function DisplayData(data){
    Container.innerHTML = ""

    data.forEach((product) => {
        let Card = document.createElement("div")
        let Image = document.createElement("img")
        let Name = document.createElement("h3")
        let Price = document.createElement("h4")
        let Type = document.createElement("h4")
        let AddtoCart = document.createElement("button")

        Image.src = product.image_link;
        Name.textContent = product.name;
        Price.textContent = `₹${product.price}`
        Type.textContent = product.product_type;
        AddtoCart.textContent = "Add To Cart"

        AddtoCart.addEventListener("click", ()=>{
            Cart.push(product)
            localStorage.setItem("cart", JSON.stringify(Cart))
            alert("product added to cart")
        })
        Card.append(Image,Name,Price,Type,AddtoCart)
        Container.append(Card)

    });
}