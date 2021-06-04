const key = "fa5e627c5b520b70178e1ee684a4706f1572c145b2324f68dfe17a9c10c3557a";

$("select").formSelect();
topCrypto();

$("#cotizarBtn").on("click", (event) => {
  event.preventDefault();
  if ($("#monedaSelect").val() === null || $("#cryptoSelect").val() === null) {
    M.toast({ html: "Debe seleccionar dos monedas para continuar" });
  } else {
    console.log();
    cotizacion($("#monedaSelect").val(), $("#cryptoSelect").val());
  }
});

function cotizacion(moneda, crypto) {
  const url = `https://min-api.cryptocompare.com/data/price?fsym=${crypto}&tsyms=${moneda}&api_key=${key}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      mostrarCotizacion(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function topCrypto() {
  const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&api_key=${key}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.Data.forEach((coin) => {
        crearSelectCrypto(coin.CoinInfo);
      });
      $("select").formSelect();
    })
    .catch((err) => {
      M.toast({ html: `Ocurrio un error: ${err}` });
    });
}

function mostrarCotizacion(moneda) {
  $("#mostrar").empty();
  $("#mostrar").append(
    `<h3>${Object.keys(moneda)}: ${Object.values(moneda)}</h3>`
  );
}

function crearSelectCrypto(crypto) {
  $(`<option value="${crypto.Name}">${crypto.FullName}</option>`).appendTo(
    "#cryptoSelect"
  );
}