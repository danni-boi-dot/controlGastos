import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import { generarId } from './helpers'
import iconNuevoGasto from './img/nuevo-gasto.svg'


function App() {
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto') ?? 0)
  )
  const [validPresupuesto, setValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animModal, setAnimModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState([])

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState('')

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)

      setTimeout(() => {
        setAnimModal(true)
      }, 500)
    }
  }, [gastoEditar])

  // localStorage del presupuesto
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto') ?? 0)
    if (presupuestoLS > 0) {
      setValidPresupuesto(true)
    }
  })
  // localStorage de los gastos
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    if (filtro) {
      // filtrar
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)

      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  const handleNuevoGasto = () => {
    setGastoEditar({})
    setModal(true)
    setTimeout(() => {
      setAnimModal(true)
    }, 500)
  }

  const guardarGasto = gasto => {
    if (gasto.id) {
      // Actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id ===
        gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
      // Nuevo Gasto
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }
    setAnimModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500)
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)

    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        validPresupuesto={validPresupuesto}
        setValidPresupuesto={setValidPresupuesto}
      />
      {validPresupuesto && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={iconNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}
      {modal &&
        <Modal
          setModal={setModal}
          animModal={animModal}
          setAnimModal={setAnimModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      }
    </div>
  )
}

export default App
