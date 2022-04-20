let deleteEl = document.getElementById("delete-el")
let ulEL = document.getElementById("ul-el")
// let inputEl = document.getElementById("input-el")
// let saveEl = document.getElementById("save-el")
let saveTab = document.getElementById("save-tab")

let textArray = []
let localStorageArray = JSON.parse(localStorage.getItem("textArray"))

if(localStorageArray){
    textArray = localStorageArray
    render()
}

function render(){
    let listItems = ""
    for(let i = 0; i < textArray.length; i++){
        listItems += `
        <li>
            <a target='_blank' href='${textArray[i]} '>
                ${textArray[i]} 
            </a>
        </li>`
    }
    ulEL.innerHTML = listItems
}

// saveEl.addEventListener("click", function(){
//     textArray.push(inputEl.value)
//     inputEl.value = ""

//     localStorage.setItem("textArray", JSON.stringify(textArray))
//     render()
// })

deleteEl.addEventListener("click", function(){
    localStorage.clear()
    textArray = []
    render()
})

saveTab.addEventListener("click", function(){
    chrome.tabs.query({currentWindow: true}, function(tabs){
        for(let i = 0; i < tabs.length; i++){
            textArray.push(tabs[i].url)
            localStorage.setItem("textArray", JSON.stringify(textArray))
            render()
        }
    })
})

