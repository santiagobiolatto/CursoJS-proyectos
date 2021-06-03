$('#buscarBtn').on('click',(event)=>{
    event.preventDefault();
    verificador($('#artista').val(), $('#cancion').val());
});

function verificador(artista, cancion) {
    if(artista === "" || cancion === ""){
        M.toast({html: 'Rellene los campos obligatorios'})
    }else{
        buscarLetra(artista, cancion);
    }
}

function buscarLetra(artista, cancion){
    const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
    fetch(url)
        .then( response => response.json())
        .then((data)=>{
            if(data.lyrics){
                $('#letrasCaciones').empty();
                $('#letrasCaciones').append(
                    `<h4>Letra de la cancion: ${cancion}</h4>
                    <p>${data.lyrics}</p>
                    `
                );
            }else{
                $('#letrasCaciones').empty();
                $('#letrasCaciones').append(
                    `<h3>La cancion: ${cancion} no se encontro en el sistema</h3>`
                );
            }
        })
        .catch((err)=>{
            M.toast({html: `Error: ${err}`});
            console.log(err);
        });
}