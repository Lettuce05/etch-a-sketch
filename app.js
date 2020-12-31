const container = document.querySelector(".container");
const newSize = document.querySelector(".newSize");
const submit = document.querySelector(".submit");
const clear = document.querySelector(".clear");


function createGrid(size){
    container.style["grid-template-columns"] = `repeat(${size}, 1fr)`;
    container.style["grid-template-rows"] = `repeat(${size}, 1fr)`;
    for(let i = 0; i < Math.pow(size, 2); i++){
        let div = document.createElement("div");
        div.addEventListener("mouseenter", ()=>{
            div.style.backgroundColor = "black";
        });
        container.appendChild(div);
    }
}

function deleteGrid(){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}

createGrid(16);

submit.addEventListener("click", ()=>{
    if(newSize.value != ""){
        deleteGrid();
        createGrid(newSize.value);
    }
});

clear.addEventListener("click", ()=>{
    const boxes = document.querySelectorAll(".container>div");
    boxes.forEach(box=>{
        box.style.backgroundColor = "white";
    })
});