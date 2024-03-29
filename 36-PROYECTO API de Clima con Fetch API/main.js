$('select').formSelect();

$('#buscaBtn').on('click', (event)=>{
    event.preventDefault();
    $('#displayTemp').empty();
    consultarAPI($('#ciudad').val(),$('#pais').val());
});

function validarInputs(){}

function consultarAPI(city, country){
    const key = "";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${key}`
    //Que onda aca?
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data.cod === '404'){
                return M.toast({html:'F no existe la ciudad'})
            }else{
                mostrarTemp(data.name,data.main.temp);
            }
        })
        .catch((err)=>{
            if(err){
                return M.toast({html: `${err}`})
            }
        });
}

function mostrarTemp(ciudad, temp) {
    let celcius = temp - 273.1;
    $('#displayTemp').append(
        `<h1>${ciudad}</h1>
        <h1>${Math.round(celcius)}°C</h1>`
    );
}
