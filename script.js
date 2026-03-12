let recipes = {}

// Load recipes first
fetch("recipes.json")
.then(res => res.json())
.then(data => {
recipes = data
})

// Convert spaces to _
function normalize(text){
return text.toLowerCase().replace(/ /g,"_")
}

// Pretty name
function formatName(name){
return name.replace(/_/g," ").replace(/\b\w/g,l=>l.toUpperCase())
}

// Show dropdown suggestions
function showSuggestions(){

const inputRaw = document.getElementById("search").value
const suggestionBox = document.getElementById("suggestions")

if(!recipes || Object.keys(recipes).length === 0) return

const input = normalize(inputRaw)

if(inputRaw.length === 0){
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

matches.slice(0,8).forEach(item=>{
html += `<div class="suggest-item" onclick="selectItem('${item}')">${formatName(item)}</div>`
})

suggestionBox.innerHTML = html
suggestionBox.style.display = "block"

}

// Select suggestion
function selectItem(item){

document.getElementById("search").value = formatName(item)
document.getElementById("suggestions").style.display="none"

showRecipe(item)

}

// Manual search
function findRecipe(){

const item = normalize(document.getElementById("search").value)

showRecipe(item)

}

// Show recipe
function showRecipe(item){

const result = document.getElementById("result")

if(recipes[item]){

let html = `<h2>${formatName(item)}</h2><ul>`

recipes[item].forEach(i=>{
html += `<li>${i}</li>`
})

html += "</ul>"

result.innerHTML = html

}else{

result.innerHTML = "Recipe not found"

}

}
