const data = JSON.parse(localStorage.getItem("cart"));

const handleRemove=(singleData)=>{
    data=data.filter((el)=>el.id!==singleData)
    localStorage.setItem("cart",JSON.stringify(data));
    append(data);
    totalPrice(data);
}

const handleQty=(type,singleData)=>{
    if(singleData.qty===1 && type==="-"){
        alert("Not Possible");
        return;
    }
    if(type==="+"){
        data=data.map((el)=>{
            if(el.id===singleData.id){
                return {...el,qty:el.qty+1}
            }else{
                return el;
            }
        })
        localStorage.setItem("cart",JSON.stringify(data));
        append(data);
        totalPrice(data)
    }
    if(type==="-"){
        data=data.map((el)=>{
            if(el.id===singleData.id){
                return {...el,qty:el.qty-1}
            }else{
                return el;
            }
        })
        localStorage.setItem("cart",JSON.stringify(data));
        append(data);
        totalPrice(data)
    }
}

const totalPrice=(data)=>{
    let total=0;
    data.map((el)=>{
        total+=el*price+el*qty;
    })
    const span=document.querySelector("#totalPriceSpan")
    span.innerText=total;
}
totalPrice(data);

const append = (data) => {
    const container = document.querySelector(".cart-container");
    container.innerHTML = null;

    data.map((el) => {
        //1.create all htmls
        const div = document.createElement("div");
        const img = document.createElement("img");
        const h3 = document.createElement("h3");
        const priceP = document.createElement("p");
        const brandP = document.createElement("p");
        const qtyP = document.createElement("button");
        const remove = document.createElement("button");
        const increment=document.createElement("button");
        const decrement=document.createElement("button");

        //2.giving style and attribute to the tag
        img.src = el.image_link;
        h3.innerText = el.name;
        priceP.innerText = `Price-${el.price}`;
        brandP.innerText = `Brand Name-${el.brand}`
        qtyP.innerText = `Qty - ${el.qty}`
        remove.innerText = "Remove";
        increment.innerText="+";
        decrement.innerText="-";

        //3.add EventListener
        remove.addEventListener("click", () => handleRemove(el));
        increment.addEventListener("click", () => handleQty("+",el));
        decrement.addEventListener("click", () => handleQty("-",el));

        //4.Append
        div.append(img, h3, priceP, brandP, addToCart, buy)
        container.append(div);
    })
}