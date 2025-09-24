import '../Style/conteudoTarefa.scss';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const API_TAREFA = 'http://localhost:8000/tarefa/';
const API_USUARIOS = 'http://localhost:8000/usuario/';

export function CadTarefa() {
    const [descricao, setDescricao] = useState('');
    const [setor, setSetor] = useState('');
    const [usuario, setUsuario] = useState('');
    const [prioridade, setPrioridade] = useState('');
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch(API_USUARIOS);
                if (response.ok) {
                    const data = await response.json();
                    setUsuarios(data);
                } else {
                    console.error('Erro ao buscar usuários:', response.status);
                }
            } catch (error) {
                console.error('Erro na conexão com o servidor de usuários:', error);
            }
        };

        fetchUsuarios();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação simples
        if (!descricao || !setor || !usuario || !prioridade) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const novaTarefa = {
            descricao,
            setor,
            idUsuario: Number(usuario),
            prioridade
        };

        try {
            const response = await fetch(API_TAREFA, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novaTarefa)
            });

            if (response.ok) {
                const data = await response.json();

                Swal.fire({
                    title: "Tarefa cadastrada com sucesso!",
                    icon: "success",
                    customClass: {
                        title: "text-sweetalert",
                    },
                    draggable: true
                });

                console.log("Tarefa cadastrada com sucesso:", data);

                // Limpar campos
                setDescricao('');
                setSetor('');
                setUsuario('');
                setPrioridade('');
            } else {
                console.error('Erro ao cadastrar tarefa:', response.status);
                Swal.fire({
                    icon: "error",
                    title: "Erro ao cadastrar",
                    text: "O servidor respondeu com erro.",
                });
            }
        } catch (error) {
            console.error('Erro na conexão com o servidor:', error);
            Swal.fire({
                icon: "error",
                title: "Erro de conexão",
                text: "Não foi possível conectar ao servidor.",
            });
        }
    };

    return (
        <div className="conteudoTarefa">
            <div className="titulo">
                <h1>Cadastro de Tarefas</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='inputsTarefas'>
                    <div className='inputTarefa'>
                        <label>Descrição:</label>
                        <input
                            type="text"
                            placeholder="Digite a descrição aqui"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                        />
                    </div>

                    <div className='inputTarefa'>
                        <label>Setor:</label>
                        <input
                            type="text"
                            placeholder="Digite o setor aqui"
                            value={setor}
                            onChange={(e) => setSetor(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className='selectsTarefa'>
                    <label>Usuário:</label>
                    <select
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                    >
                        <option value="">Selecione o Usuário</option>
                        {usuarios.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.nome}
                            </option>
                        ))}
                    </select>

                    <label>Prioridade:</label>
                    <select
                        value={prioridade}
                        onChange={(e) => setPrioridade(e.target.value)}
                        required
                    >
                        <option value="">Selecione a prioridade</option>
                        <option value="B">Baixa</option>
                        <option value="M">Média</option>
                        <option value="A">Alta</option>
                    </select>
                </div>

                <div className='botaoTarefa'>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}
