import React from 'react';

const Resultado = (props) =>{
    return(
        <div className="card p-3">
            <h2 className="display-5">Resumen</h2>
            <p>La cantidad solicitada es: $ {props.cantidad}</p>
            <p>A pagar en: {props.plazo} meses</p>
            <p>Su pago mensual es de: $ {props.total/props.plazo}</p>
            <p>Total a pagar: $ {props.total}</p>
        </div>
    );
}

export default Resultado;