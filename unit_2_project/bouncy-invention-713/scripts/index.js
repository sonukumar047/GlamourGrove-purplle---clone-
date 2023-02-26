
function search() {
      // Get the search query from the input element
      var query = document.getElementById("searchInput").value;

      // Perform the search using the query (replace this with your own search function)
      var results = performSearch(query);

      // Display the search results (replace this with your own display function)
      displayResults(results);
    }

    function performSearch(query) {
      // Replace this with your own search function that returns an array of search results
      return [
        "Result 1",
        "Result 2",
        "Result 3"
      ];
    }

    function displayResults(results) {
      // Get the search results element
      var resultsElement = document.getElementById("searchResults");

      // Clear any previous search results
      resultsElement.innerHTML = "";

      // Add each result to the search results list
      for (var i = 0; i < results.length; i++) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(results[i]));
        resultsElement.appendChild(li);
      }
    }

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