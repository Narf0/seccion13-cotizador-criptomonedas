import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Criptomoneda from './Criptomoneda';
import Error from './Error';


function Formulario({guardarMoneda, guardarCriptomoneda}) {

    const [ criptomonedas, guardarCriptomonedas ] = useState([]);
    const [ monedaCotizar, guardarMonedaCotizar] = useState('');
    const [ criptoCotizar, guardarCriptoCotizar] = useState('');
    const [ error, guardarError ] = useState(false); 

    useEffect(() => {

        const consultarAPI = async () => {
            
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=15&tsym=USD`;
       
            const resultado = await Axios.get(url);

            guardarCriptomonedas(resultado.data.Data);

        }

        consultarAPI();
      
    }, []);

    //Validar que el usuario llene ambos campos
    const cotizarMoneda = (e) => {
        e.preventDefault();

        //validar si ambos campos estan llenos
        if(monedaCotizar ==='' || criptoCotizar === '') {
            guardarError(true);
            return;
        }

        //pasar los datos componentes al componente principal
        guardarError(false);
        guardarMoneda(monedaCotizar);
        guardarCriptomoneda(criptoCotizar);
    }

    // Mostrar el error en caso de que exista
    const componente = (error) ? <Error mensaje="Ambos campos son obligatorios" /> : null;

    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {componente}
            <div className="row">
                <label>Elige tu Moneda</label>
                <select
                    className="u-full-width"
                    onChange= { e => guardarMonedaCotizar(e.target.value)}
                >
                    <option value="">- Elige tu Moneda -</option>
                    <option value="USD">Dolar Estadounidense</option>
                    <option value="MXN">Peso Mexicano</option>
                    <option value="GBP">Libras</option>
                    <option value="EUR">Euro</option>
                </select>
            </div>

            <div className="row">
                <label>Elige tu Criptomoneda</label>
                <select
                    className="u-full-width"
                    onChange={ e => guardarCriptoCotizar(e.target.value) }
                >
                    <option value="">- Elige tu Criptomoneda -</option>
                    { criptomonedas.map(criptomoneda => (
                        <Criptomoneda
                            key={criptomoneda.CoinInfo.Id}
                            criptomoneda={criptomoneda}
                        />
                    ))}

                </select>
            </div>

            <input type="submit" className="button-primary u-full-width" value="Calcular" />
        </form>
    )
}

export default Formulario;