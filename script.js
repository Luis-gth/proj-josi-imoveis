/* TROCAR IMAGEM PRINCIPAL */

function trocarImagem(elemento){
    const imagemPrincipal = document.getElementById("imagemPrincipal");

    if(imagemPrincipal){
        imagemPrincipal.src = elemento.src;
    }
}

/* VIEWER */

function abrirViewer(abaInicial = "fotos"){
    const viewer = document.getElementById("viewer");

    if(viewer){
        viewer.classList.add("ativo");
        mostrarAba(null, abaInicial);
        document.body.style.overflow = "hidden";
    }
}

function fecharViewer(){
    const viewer = document.getElementById("viewer");

    if(viewer){
        viewer.classList.remove("ativo");
        document.body.style.overflow = "auto";
    }
}

/* TABS */

function mostrarAba(event, id){

    const tabs = document.querySelectorAll(".tab");
    const conteudos = document.querySelectorAll(".conteudo");

    tabs.forEach(tab => {
        tab.classList.remove("ativo");
    });

    conteudos.forEach(conteudo => {
        conteudo.classList.remove("ativo");
    });

    const abaSelecionada = document.getElementById(id);

    if(abaSelecionada){
        abaSelecionada.classList.add("ativo");
    }

    if(event && event.target){
        event.target.classList.add("ativo");
    } else {
        tabs.forEach(tab => {
            const texto = tab.textContent.trim().toLowerCase();

            if(
                (id === "fotos" && texto.includes("foto")) ||
                (id === "video" && texto.includes("vídeo")) ||
                (id === "mapa" && texto.includes("mapa"))
            ){
                tab.classList.add("ativo");
            }
        });
    }
}

/* GALERIA AUTOMÁTICA */

function carregarGaleria(prefixo, totalFotos, containerId){

    const container = document.getElementById(containerId);

    if(!container) return;

    container.innerHTML = "";

    for(let i = 1; i <= totalFotos; i++){

        const img = document.createElement("img");

        img.src = `img/${prefixo}-${i}.webp`;
        img.alt = `Imagem ${i} do imóvel`;

        img.addEventListener("click", function(){
            const principal = document.getElementById("imagemPrincipal");

            if(principal){
                principal.src = this.src;
            }
        });

        container.appendChild(img);
    }
}

/* FECHAR VIEWER COM ESC */

document.addEventListener("keydown", function(e){
    if(e.key === "Escape"){
        fecharViewer();
    }
});

/* FECHAR VIEWER CLICANDO FORA */

document.addEventListener("click", function(e){

    const viewer = document.getElementById("viewer");

    if(
        viewer &&
        viewer.classList.contains("ativo") &&
        e.target === viewer
    ){
        fecharViewer();
    }
});

/* HEADER SHADOW AO ROLAR */

window.addEventListener("scroll", function(){

    const header = document.querySelector(".header");

    if(!header) return;

    if(window.scrollY > 80){
        header.style.background = "rgba(255,255,255,0.96)";
        header.style.backdropFilter = "blur(12px)";
        header.style.boxShadow = "0 8px 28px rgba(0,0,0,0.10)";
        header.style.height = "140px";
    }else{
        header.style.background = "transparent";
        header.style.backdropFilter = "none";
        header.style.boxShadow = "none";
        header.style.height = "140px";
    }
});

function filtrarImoveis(){

    const tipo = document.getElementById("filtroTipo").value.toLowerCase();
    const quartos = document.getElementById("filtroQuartos").value;
    const busca = document.getElementById("buscaImovel").value.toLowerCase();

    const cards = document.querySelectorAll(".card-catalogo");

    cards.forEach(card => {

        const tipoCard = card.dataset.tipo.toLowerCase();
        const quartosCard = card.dataset.quartos;
        const localCard = card.dataset.local.toLowerCase();
        const nomeCard = card.dataset.nome.toLowerCase();

        let mostrar = true;

        if(tipo && tipoCard !== tipo){
            mostrar = false;
        }

        if(quartos && quartosCard !== quartos){
            mostrar = false;
        }

        if(
            busca &&
            !localCard.includes(busca) &&
            !nomeCard.includes(busca)
        ){
            mostrar = false;
        }

        if(mostrar){
            card.style.display = "block";
        }else{
            card.style.display = "none";
        }

    });
}