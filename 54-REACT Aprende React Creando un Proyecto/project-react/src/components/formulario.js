import React, { Fragment, useState } from "react";
import Swal from "sweetalert2";
import Mensaje from '../components/mensaje';
import Resultado from '../components/resultado';
import { calcularTotal } from "../utils/helpers";

const Formulario = (props) => {
  const [error, setError] = useState(false);

  const leerCantidad = (event) => {
    props.setCantidad(parseInt(event.target.value));
  };
  const leerPlazo = (event) => {
    props.setPlazo(parseInt(event.target.value));
  };
  const calcularPrestamo = (event) => {
    event.preventDefault();
    if ( props.cantidad === 0 || isNaN(props.cantidad) || isNaN(props.plazo) || props.plazo === "") {
      setError(true);
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Todos los campos son obligatorios",
      });
      return;
    }
    setError(false);
    props.setTotal(calcularTotal(props.cantidad, props.plazo));
  };

  let component;
  if(props.total === 0){
    component = <Mensaje/>
  }else
    component = <Resultado
        total={props.total}
        cantidad={props.cantidad}
        plazo={props.plazo}
    />
  return (
    <Fragment>
      <form onSubmit={calcularPrestamo} className="mt-4">
        <div className="mb-3">
          <label htmlFor="cantPrestamo" className="form-label">
            Cantidad de prestamo
          </label>
          <input
            type="number"
            min="0"
            className="form-control"
            id="cantPrestamo"
            
            onChange={leerCantidad}
          />
        </div>
        <div>
          <label htmlFor="plazoSelect" className="form-label">
            Plazo para pagar
          </label>
          <select
            className="form-select mb-3"
            id="plazoSelect"
            onChange={leerPlazo}
            
          >
            <option value="" defaultValue>
              Seleccione
            </option>
            <option value="3">3 meses</option>
            <option value="6">6 meses</option>
            <option value="12">12 meses</option>
            <option value="24">24 meses</option>
          </select>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-lg btn-primary"
          >
            Calcular
          </button>
        </div>
      </form>

      <div className="text-center mt-4">
        {component}
      </div>

    </Fragment>
  );
};

export default Formulario;
