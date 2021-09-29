//Daniel
const currentDisc = ''
let numeroDisco = 3
let numeroDeJogadas = 0;

document.querySelector(".close-winner").addEventListener("click", deixarNone);

function deixarNone() {
    const pop = document.querySelector(".pop")
    pop.style.display = "none"
    pop.classList.remove("winner--show")
    const popup = document.querySelector(".popup-winner")
    popup.classList.remove("winner--show")
    reset()
}


const checkSize = (ramroad, currentDisc) => {
    const discAbove = ramroad.children[ramroad.children.length - 1]
    return currentDisc.clientWidth > discAbove.clientWidth
}

function verificarVitoria() {
    if (document.getElementById("end").children.length == numeroDisco) {
        return true
    }

    return false
}

const disco_1 = document.querySelectorAll(".disco")



disco_1.forEach(disco => {
    disco.addEventListener("dragstart", dragStart)
    disco.addEventListener("drag", drag)
    disco.addEventListener("dragend", dragEnd)
})

let discoAtual
let aux

function dragStart(evt) {
    discoAtual = evt.target
    aux = evt.path[1]
    if (evt.target == evt.path[1].lastElementChild) {
        dropZones.forEach(dropZone => {
            dropZone.classList.add("zoneOn")
        })
        this.classList.add("isMove")
    }
}


function drag(evt) {

}

let verifica
let status = false

function dragEnd(evt) {
    verifica = evt.path[1].children.length + 1
    if (evt.target == evt.path[1].lastElementChild) {
        dropZones.forEach(dropZone => {
            dropZone.classList.remove("zoneOn")
        })

        this.classList.remove("isMove")
        if (verifica > evt.path[1].children.length && aux != evt.path[1]) {
            numeroDeJogadas++
            incrementoSpan()
        }
    }
    if (verificarVitoria()) {
        const pop = document.querySelector(".pop")
        pop.style.display = "flex"
        pop.classList.add("winner--show")
        const popup = document.querySelector(".popup-winner")
        popup.classList.add("winner--show")
    }
}




/* soltar disco*/
const dropZones = document.querySelectorAll(".vareta")

dropZones.forEach(zones => {
    zones.addEventListener("dragenter", dragEnter)
    zones.addEventListener("dragover", dragOver)
    zones.addEventListener("dragleave", dragLeave)
    zones.addEventListener("drop", drop)
})

function dragEnter() {

}

function dragOver(evt) {

    const discoMove = document.querySelector(".isMove")
    if (discoMove != null) {
        if (this.children.length == 0) {
            this.appendChild(discoMove)
        } else if (this.children.length >= 1) {
            if (!checkSize(this, discoAtual)) {
                this.appendChild(discoMove)
            }
        }

    }
}

function dragLeave(evt) {

}

//Inclui a checkagem de vitória no drop
function drop(evt) {

}

function incrementoSpan() {
    document.querySelector("#counter").innerText = numeroDeJogadas;
}
incrementoSpan()

document.querySelector(".reset_button").addEventListener("click", reset)

function reset() {
    let array = document.querySelectorAll(".disco")
    let aux = []
    aux.push(array[0])
    for (let i = 1; i < array.length; i++) {
        for (let j = 0; j < aux.length; j++) {
            if (array[i].clientWidth < aux[j].clientWidth) {
                aux.splice(j, 0, array[i])
                break;
            }
            if (j == aux.length - 1) {
                aux.push(array[i])
                break;
            }
        }
    }
    aux.reverse()
    for (let i = 0; i < aux.length; i++) {
        document.querySelector("#start").appendChild(aux[i])
    }
    numeroDeJogadas = 0;
    incrementoSpan()
}

let btn = document.querySelector(".popup-nivel")
btn.addEventListener("click", escolherDificuldade);
document.querySelector(".dificuldade").addEventListener("click", voltarInicio);

function voltarInicio() {
    document.querySelector(".pop").style.display = "flex"
    document.querySelector(".popup-nivel").style.display = "flex"
    document.querySelector(".dificuldade").style.display = "none";
    document.querySelector(".varetas").style.display = "none";
}

function escolherDificuldade(evt) {
    document.querySelector(".pop").style.display = "none"
    document.querySelector(".dificuldade").style.display = "flex"
    btn.style.display = "none";
    document.querySelector(".varetas").style.display = "flex"
    numeroDisco = 3
    if (document.querySelector(".quatro") != null) {
        document.querySelector(".quatro").parentNode.removeChild(document.querySelector(".quatro"))
    }
    if (document.querySelector(".cinco") != null) {
        document.querySelector(".cinco").parentNode.removeChild(document.querySelector(".cinco"))
    }
    if (evt.target.id == "normal") {
        criarDisco("normal")
    } else if (evt.target.id == "hard") {
        criarDisco("hard")
    }
}

function criarDisco(dificuldade) {
    if (document.querySelector(".quatro") == null) {
        const div = document.createElement("div");
        div.classList.add("disco")
        div.classList.add("quatro")
        div.setAttribute("draggable", true)
        div.addEventListener("dragstart", dragStart)
        div.addEventListener("drag", drag)
        div.addEventListener("dragend", dragEnd)
        document.querySelector("#start").appendChild(div)
        numeroDisco = 4
        if (dificuldade == "hard" && document.querySelector(".cinco") == null) {
            const div2 = document.createElement("div");
            div2.classList.add("disco")
            div2.classList.add("cinco")
            div2.setAttribute("draggable", true)
            div2.addEventListener("dragstart", dragStart)
            div2.addEventListener("drag", drag)
            div2.addEventListener("dragend", dragEnd)
            document.querySelector("#start").appendChild(div2)
            numeroDisco = 5
        }
    }
}