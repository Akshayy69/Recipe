let recipes = {}

async function loadRecipes(){
const res = await fetch("recipes.json")
recipes = await res.json()
}

loadRecipes()

function showSuggestions(){

const input = document.getElementById("search").value.toLowerCase()
const suggestionBox = document.getElementById("suggestions")

if(input.length === 0){
suggestionBox.style.display = "none"
return
}

let matches = Object.keys(recipes).filter(item =>
item.includes(input)
)

if(matches.length === 0){
suggestionBox.style.display = "none"
return
}

let html = ""

matches.slice(0,10).forEach(item=>{
html += `<div 
style="padding:8px; cursor:pointer;"
onclick="selectItem('${item}')"
onmouseover="this.style.background='#eee'"
onmouseout="this.style.background='white'"
>${item}</div>`
})

suggestionBox.innerHTML = html
suggestionBox.style.display = "block"

}

function selectItem(item){

document.getElementById("search").value = item
document.getElementById("suggestions").style.display = "none"
findRecipe()

}

function findRecipe(){

const item = document.getElementById("search").value.toLowerCase()
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
