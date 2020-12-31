const container = document.querySelector(".container");
const newSize = document.querySelector(".newSize");
const submit = document.querySelector(".submit");
const clear = document.querySelector(".clear");
const black = document.querySelector("#black");
const grayscale = document.querySelector("#grayscale");
const randomColor = document.querySelector("#random-color");

function ColorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function createGrid(size){
    container.style["grid-template-columns"] = `repeat(${size}, 1fr)`;
    container.style["grid-template-rows"] = `repeat(${size}, 1fr)`;
    for(let i = 0; i < Math.pow(size, 2); i++){
        let div = document.createElement("div");
        div.style.backgroundColor = "hsl(0,0%, 100%)";
        div.addEventListener("mouseenter", ()=>{
            if(black.checked){
                div.style.backgroundColor = "black";
            } else if(grayscale.checked){
                color = div.style.backgroundColor;
                color = color.split("(");
                color = color[1].split(")");
                color = color[0].split(",");
                color = rgbToHex(parseInt(color[0]), parseInt(color[1]), parseInt(color[2]));
                div.style.backgroundColor = ColorLuminance(color, -0.1);
            } else if(randomColor.checked){
                let red = Math.floor(Math.random() * 256);
                let blue = Math.floor(Math.random() * 256);
                let green = Math.floor(Math.random() * 256);
                div.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
            }
            
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
    if(newSize.value != "" && newSize.value <= 100 && newSize.value >= 1){
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