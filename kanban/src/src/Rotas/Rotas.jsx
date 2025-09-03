import {Routes, Route} from 'react-router-dom'
import { Inicial } from '../Paginas/Inicial'
import { CadTarefa } from '../Paginas/CadTarefa'
import { CadUsuario } from '../Paginas/CadUsuario'
import { Quadro } from '../Componentes/Quadro'

export function Rotas(){
    return(
        <Routes>
            <Route path='/' element = {<Inicial/>}>
                <Route index element={<Quadro/>}/>
                <Route path='cadTarefa' element={<CadTarefa/>}/>
                <Route path='CadUsuario' element={<CadUsuario/>}/>
            </Route>
        </Routes>
    )
}