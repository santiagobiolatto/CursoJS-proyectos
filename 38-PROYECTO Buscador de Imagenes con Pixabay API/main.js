const registrosPorPagina = 20;
let totalPaginas;
let iterador;
let paginaActual = 1;

$('#buscar').on('click', (event)=>{
    event.preventDefault();
    buscarImagenes();
});

function buscarImagenes() {
    let busqueda = $('#busqueda').val();
    const key = "21914389-c0cfb588572974dbf10fb1645";
    console.log(paginaActual);
    const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${registrosPorPagina}&page=${paginaActual}`;
    fetch(url)
        .then(response => response.json())
        .then(data=>{
            totalPaginas = calcularPaginas(data.totalHits);
            mostrarImagenes(data.hits);
        })
        .catch(err=>{
            console.log(err);
        });
}

//generador
function *paginador(totalPaginas){
    for(let i = 1; i<=totalPaginas; i++){
        yield i;
    }
}

function calcularPaginas(total){
    return parseInt(Math.ceil(total/registrosPorPagina)); 
}

function mostrarPaginador(){
    iterador = paginador(totalPaginas);
    $('.pagination').empty();
    $('.pagination').append(
        `<li class="disabled" id="backArrow"><a href="#"><i class="material-icons">chevron_left</i></a></li>`
    );
    while(true){
        const { value, done } = iterador.next();
        if(done){
            $('.pagination').append(
                `<li class="waves-effect" id="nextArrow"><a href="#"><i class="material-icons">chevron_right</i></a></li>`
            );
            return;
        }
        $('.pagination').append(
            `<li class="waves-effect" id="page${value}"><a href="#">${value}</a></li>`
        );

        $(`#page${paginaActual}`).addClass("active");

        $(`#page${value}>a`).on('click', function(event){
            paginaActual = value;
            $('#containerImg').empty();
            buscarImagenes();
        })
    }
}

function mostrarImagenes(imagenes){
    console.log(imagenes);
    $('#containerImg').empty();
    imagenes.forEach(imagen => {
        $('#containerImg').append(
            `            
            <div class="col s12 m6 l4 xl3 center-align">
                <div class="card">
                    <div class="card-image">
                    <img src="${imagen.previewURL}">
                    <span class="card-title">${imagen.user}</span>
                    </div>
                    <div class="card-content left-align">
                    <p><i class="fas fa-comment-dots"></i> ${imagen.comments}</p>
                    <p><i class="fas fa-heart"></i> ${imagen.favorites}</p>
                    <p><i class="fas fa-arrow-alt-circle-down"></i> ${imagen.downloads}</p>
                    </div>
                    <div class="card-action">
                    <a href="${imagen.largeImageURL}" target=__blank>Ver imagen</a>
                    </div>
                </div>
            </div>
            `
        );
    });
    mostrarPaginador();
    if(paginaActual !== 1){
        $('#backArrow').removeClass('disabled');
        $('#backArrow').on('click', ()=>{
            paginaActual--;
            buscarImagenes();
        });
    }else{
        $('#backArrow').addClass('disabled');
    }
    
    if(paginaActual < totalPaginas){
        $('#nextArrow').removeClass('disabled');
        $('#nextArrow').on('click', ()=>{
            paginaActual++;
            buscarImagenes();
        });
    }else{
        $('#nextArrow').addClass('disabled');
    }
}