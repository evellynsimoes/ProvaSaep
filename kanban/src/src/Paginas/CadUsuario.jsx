import { useState } from "react";
import '../Style/cadastroUsuario.scss';

const API_URL = 'http://localhost:8000/api/usuario'

export function CadUsuario(){
    const [usuario, setUsuario] = useState([]);
    const [novoUsuario, setNovoUsuario] = useState({
        nome: '',
        email: '',
    });
    const [idEditando, setIdEditando] = useState(null);
    const [visible, setVisible] = useState(false);
    const [editando, setEditando] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // const fetchSalas = async () => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const response = await axios
    //     }
    // }

    const handleSalvar = async () => {
        if (!novoUsuario.nome || !novoUsuario.email) {
            alert('Preencha todos os campos')
            return;
        }

        setIsLoading(true);
        setError(null);
    }

    const abrirModalEdicao = (usuario) => {
        setNovoUsuario(prevState => ({
            ...prevState,
            nome: usuario.nome || '',
            email: usuario.email || ''
        }));
    }

    return(
        <main className="conteudoUsuario">
            <div className="botaoCadastroUsuario">
                <button onClick={() => {
                    setEditando(false);
                    setIdEditando(null);
                    setNovoUsuario({ nome: '', email: ''});
                    setVisible(true);
                }} disabled={isLoading}>
                    {isLoading ? 'Carregando...' : 'Cadastrar Usuario'}
                </button>
            </div>

            {visible && (
                <div className="modalUsuario">
                    <div className="modalContentUsuario">
                        <form>
                            <input type="text" placeholder="Nome" value={novoUsuario.nome} onChange={e => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}/>
                            <input type="text" placeholder="Email" value={novoUsuario.email} onChange={e => setNovoUsuario({ ...novoUsuario, email: e.target.value })}/>

                            <div className="botoes">
                                <button type="button" className="cadastrarUsuario" /*onClick={handleSalvar}*/ disabled={isLoading}>
                                    {isLoading ? 'Salvando...' : (editando ? 'Salvar' : 'Cadastrar')}
                                </button>
                                <button type="button" className="fecharUsuario" onClick={() => setVisible(false)} disabled={isLoading}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    )
}