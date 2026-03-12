async function findRecipe(){

const item = document.getElementById("search").value.toLowerCase()

const res = await fetch("recipes.json")
const recipes = await res.json()

const result = document.getElementById("result")

if(recipes[item]){

let html = "<h2>"+item+"</h2><ul>"

recipes[item].forEach(i=>{
html += "<li>"+i+"</li>"
})

html += "</ul>"

result.innerHTML = html

}else{

result.innerHTML = "Recipe not found"

}

}
