let recipes = {}

async function loadRecipes(){
const res = await fetch("recipes.json")
recipes = await res.json()
}

loadRecipes()

function normalize(text){
return text.toLowerCase().replace(/ /g,"_")
}

function formatName(name){
return name
.replace(/_/g," ")
.replace(/\b\w/g,l=>l.toUpperCase())
}

function showSuggestions(){

const inputRaw = document.getElementById("search").value
const input = normalize(inputRaw)

const suggestionBox = document.getElementById("suggestions")

if(inputRaw.length === 0){
suggestionBox.style.display="none"
return
}

let matches = Object.keys(recipes).filter(item =>
item.includes(input)
)

if(matches.length === 0){
suggestionBox.style.display="none"
return
}

let html=""

matches.slice(0,8).forEach(item=>{

html+=`<div class="suggest-item" onclick="selectItem('${item}')">
${formatName(item)}
</div>`

})

suggestionBox.innerHTML=html
suggestionBox.style.display="block"

}

function selectItem(item){

document.getElementById("search").value=formatName(item)

document.getElementById("suggestions").style.display="none"

showRecipe(item)

}

function findRecipe(){

const inputRaw=document.getElementById("search").value
const item=normalize(inputRaw)

showRecipe(item)

}

function showRecipe(item){

const result=document.getElementById("result")

if(recipes[item]){

let html=`<h2>${formatName(item)}</h2><ul>`

recipes[item].forEach(i=>{
html+=`<li>${i}</li>`
})

html+="</ul>"

result.innerHTML=html

}else{

result.innerHTML="Recipe not found"

}

}
