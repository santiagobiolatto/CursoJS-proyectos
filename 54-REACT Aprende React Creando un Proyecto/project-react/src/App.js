import React, { useState } from 'react'
import Header from "./components/header";
import Formulario from "./components/formulario";

const App = () => {
  //States
  const [cantidad, setCantidad] = useState(0);
  const [plazo, setPlazo] = useState('');
  const [total, setTotal] = useState(0);

  return (
    <div className="container" style={{maxWidth:"700px"}}>
      <Header
        titulo= "Cotizador de prestamos"
      />
      <Formulario
        cantidad={cantidad}
        setCantidad={setCantidad}
        plazo={plazo}
        setPlazo={setPlazo}
        total={total}
        setTotal={setTotal}
      />
    </div>
  )
};

export default App;
