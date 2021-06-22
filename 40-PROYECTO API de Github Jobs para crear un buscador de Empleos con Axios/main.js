$('#buscarBtn').on('click', (event)=>{
    event.preventDefault();
    $('#jobsList').empty();
    searchJobs($('#inputBusqueda').val());
});

function searchJobs(trabajo){
    const urlJobs = `https://jobs.github.com/positions.json?search=${trabajo}`
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(urlJobs)}`
    axios.get(url)
    .then(response =>{
        return JSON.parse(response.data.contents);
    })
    .then(data =>{
        console.log(data);
        if(data.length !== 0){
            mostrarTrabajos(data);
        }else{
            M.toast({html: 'No se encontraron trabajos.'})

        }
    })
}

function mostrarTrabajos(trabajos){
    trabajos.forEach(trabajo => {
        $('#jobsList').append(`
        <div class="col s12 m6 cardcss">
            <div class="card">
                <div class="card-content">
                    <span class="card-title">${trabajo.title}</span>
                    <p><strong>Compañia: </strong>${trabajo.company}</p>
                    <p><strong>Tipo de contrato: </strong>${trabajo.type}</p>
                </div>
                <div class="card-action">
                    <a href="${trabajo.url}" target="__blank" class="waves-effect waves-green btn-flat">Ver vacante</a>
                </div>
            </div>
        </div>
        `);
    });
}