let recipes = {}

async function loadRecipes(){
    const res = await fetch("recipes.json")
    recipes = await res.json()
}

loadRecipes()

function findRecipe(){

const input = document.getElementById("search").value.toLowerCase()
const result = document.getElementById("result")

// Exact match
if(recipes[input]){

let html = "<h2>"+input+"</h2><ul>"

recipes[input].forEach(i=>{
html += "<li>"+i+"</li>"
})

html += "</ul>"

result.innerHTML = html

return
}

// Suggest similar
let suggestions = Object.keys(recipes).filter(item =>
item.includes(input)
)

if(suggestions.length > 0){

let html = "<h3>Did you mean:</h3><ul>"

suggestions.slice(0,10).forEach(s=>{
html += `<li onclick="selectItem('${s}')" style="cursor:pointer">${s}</li>`
})

html += "</ul>"

result.innerHTML = html

}else{

result.innerHTML = "Recipe not found"

}

}

function selectItem(item){

document.getElementById("search").value = item
findRecipe()

}
