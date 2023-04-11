import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({
    presupuesto, setPresupuesto,
    validPresupuesto, setValidPresupuesto,
    gastos
}) => {
    return (
        <header>
            <h1>Planificador de Gastos</h1>

            {validPresupuesto ? (
                <ControlPresupuesto
                    gastos={gastos}
                    presupuesto={presupuesto}
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