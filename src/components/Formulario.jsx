import styled from "@emotion/styled"
import React, {useEffect, useState} from "react"
import useSelectMonedas from '../hooks/useSelectMonedas' 
import { monedas } from '../data/monedas'
import Error from './Error';


const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #ffff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 24px;
  border-radius: 5px;
  transition: background-color .3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #747dfe;
    cursor: pointer;
  }
`


const Formulario = ({setMonedas}) => {

  const [criptos, setCriptos] = useState([])
  const [moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas)
  const [criptomoneda, Selectcriptomoneda] = useSelectMonedas('Elige tu moneda', criptos)
  const [error, setError] = useState(false)

  useEffect(() => {
  const consultarApi = async () => {
    const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
    const respuesta = await fetch(url)
    const resultado = await respuesta.json()

    const arrayCripto = resultado.Data.map( cripto => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }
          return objeto
    })

    setCriptos(arrayCripto)
  }
  consultarApi();
  }, [])
  
  const handleSubmit = e => {
      e.preventDefault()


      if([moneda, criptomoneda].includes('')) {
        setError(true)
          return
      }
      setError(false)
      setMonedas({
        moneda,
        criptomoneda
      })

  }

  return (
    <>
    {error && <Error>Todos lo campos son obligatorios</Error>}
    <form
        onSubmit={handleSubmit}
    >  
      <SelectMonedas/>
      <Selectcriptomoneda/>
      
      <InputSubmit 
            type="submit" 
             value="Cotizar"        
        />
       
    </form>
    </>
  )
}

export default Formulario;
