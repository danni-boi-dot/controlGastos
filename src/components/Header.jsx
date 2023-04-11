import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({
    presupuesto, setPresupuesto,
    validPresupuesto, setValidPresupuesto,
    gastos, setGastos
}) => {
    return (
        <header>
            <h1>Planificador de Gastos</h1>

            {validPresupuesto ? (
                <ControlPresupuesto
                    gastos={gastos}
                    setGastos={setGastos}
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setValidPresupuesto={setValidPresupuesto}

                />
            ) : (
                <NuevoPresupuesto
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setValidPresupuesto={setValidPresupuesto}
                />
            )}
        </header>
    )
}

export default Header