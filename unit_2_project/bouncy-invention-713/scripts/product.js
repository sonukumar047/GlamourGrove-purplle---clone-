let cart=JSON.parse(localStorage.getItem("cart"))||[];

//get the data

const getData=async()=>{
    try{
        const response=await fetch("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline");
        const data=await response.json();
        console.log(data);
        append(data)
    }catch(error){
        console.log(error);
    }
};
getData();

const append = (data) => {
    //catch the target
    const container=document.querySelector(".products_div");
    container.innerHTML=null;

    data.map((el)=>{
        //1.create all htmls
        const div=document.createElement("div");
        const img=document.createElement("img");
        const h3=document.createElement("h3");
        const priceP=document.createElement("p");
        const brandP=document.createElement("p");
        const addToCart=document.createElement("button");
        const buy=document.createElement("button");

        //2.giving style and attribute to the tag
        img.src=el.image_link;
        h3.innerText=el.name;
        priceP.innerText=`Price-${el.price}`;
        brandP.innerText=`Brand Name-${el.brand}`
        addToCart.innerText="Add To Cart";
        buy.innerText="Buy";

        //3.add EventListener

       addToCart.addEventListener("click", ()=>{
        if(checkDuplicate(el)){
            alert("product already in cart")
        }else{
            cart.push({...el, qty:1})
            localStorage.setItem("cart",JSON.stringify(cart))
            alert("Product added to Cart")
        }
       })

    //    Adding eventlistner on buy button

    buy.addEventListener("click", ()=>{
        alert("Please Select The Payment Mode");
    })



        //4.Append
        div.append(img,h3,priceP,brandP,addToCart,buy)
        container.append(div);
    })
}

function checkDuplicate(el){
    for(let i=0; i<cart.length; i++){
        if(cart[i].id == el.id){
            return true;
        }
    }
    return false;
}