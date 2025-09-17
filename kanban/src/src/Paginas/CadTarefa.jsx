export function CadTarefa(){
    return(
        <form className="formulario">
            <h1>Cadastro de Tarefas</h1>
            <label>Descrição: </label>
            <input type="text" alt="Campo de descrição" required/>
            <label>Setor: </label>
            <input type="text" alt="setor" required/>
            <label>Prioridade:</label>
            <select>
                <option>Selecione o Usuário:</option>
                <option>Fer</option>
                <option>Dori Dori</option>
                <option>Marcia</option>
            </select>
            <select>
                <option>Selecione a prioridade:</option>
                <option>Baixa</option>
                <option>Média</option>
                <option>Alta</option>
            </select>
            <button type="submit">Cadastrar</button>
        </form>
    )
}