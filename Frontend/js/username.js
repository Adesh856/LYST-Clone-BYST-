const token = localStorage.getItem("token")
const h4username=document.getElementById("h4username")

if(token!==undefined){
fetch("https://clever-crow-belt.cyclic.app/cart/forname",{
    headers:{
        "Authorization":`${token}`
    }
}).then((res)=>res.json()).then((data)=>{
    console.log(data)
    h4username.innerHTML=data.name
}).catch((err)=>{
   
    console.log(err)
})
}else{
    h4username.innerHTML=""
}