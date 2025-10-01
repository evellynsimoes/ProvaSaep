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
  const [erroDescricao, setErroDescricao] = useState('');
  const [erroSetor, setErroSetor] = useState('');
  const [tarefas, setTarefas] = useState([]);
  const [tarefaEditando, setTarefaEditando] = useState(null);

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

    const fetchTarefas = async () => {
      try {
        const response = await fetch(API_TAREFA);
        if (response.ok) {
          const data = await response.json();
          setTarefas(data);
        } else {
          console.error('Erro ao buscar tarefas');
        }
      } catch (err) {
        console.error('Erro de conexão: ', err);
      }
    };

    fetchTarefas();
    fetchUsuarios();
  }, []);

  const onEditar = (tarefa) => {
    setTarefaEditando(tarefa);
  };

  const salvarEdicao = async () => {
    try {
      const response = await fetch(`${API_TAREFA}${tarefaEditando.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tarefaEditando),
      });

      if (response.ok) {
        const dataAtualizada = await response.json();
        Swal.fire('Sucesso', 'Tarefa atualizada!', 'success');
        setTarefaEditando(null);
        setTarefas((prev) =>
          prev.map((t) => (t.id === dataAtualizada.id ? dataAtualizada : t))
        );
      } else {
        Swal.fire('Erro', 'Erro ao atualizar a tarefa.', 'error');
      }
    } catch (err) {
      Swal.fire('Erro', 'Falha na conexão.', 'error');
    }
  };

  const onExcluir = async (tarefa) => {
    const confirm = await Swal.fire({
      title: 'Excluir?',
      text: 'Tem certeza que deseja excluir essa tarefa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    });

    if (confirm.isConfirmed) {
      try {
        const response = await fetch(`${API_TAREFA}${tarefa.id}/`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setTarefas((prev) => prev.filter((t) => t.id !== tarefa.id));
          Swal.fire('Excluída', 'Tarefa removida.', 'success');
        } else {
          Swal.fire('Erro', 'Não foi possível excluir.', 'error');
        }
      } catch (err) {
        Swal.fire('Erro', 'Erro de conexão ao excluir.', 'error');
      }
    }
  };

  const validarDescricao = (e) => {
    const valor = e.target.value;

    const regexDescricao = /^.{0,50}$/;

    if (!regexDescricao.test(valor)) {
      setErroDescricao('Máximo de 50 caracteres');
      return;
    }

    setErroDescricao('');
    setDescricao(valor);
  };

  const validarSetor = (e) => {
    const valor = e.target.value;

    const regexSetor = /^.{0,50}$/;

    if (!regexSetor.test(valor)) {
      setErroSetor('Máximo de 50 caracteres');
      return;
    }

    setErroSetor('');
    setSetor(valor);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regexDescricao = /^.{0,50}$/;
    if (!regexDescricao.test(descricao)) {
      setErroDescricao('Descrição inválida (máx. de 50 caracteres)');
      return;
    } else {
      setErroDescricao('');
    }

    const regexSetor = /^.{0,50}$/;
    if (!regexSetor.test(setor)) {
      setErroSetor('Descrição inválida (máx. de 50 caracteres)');
      return;
    } else {
      setErroSetor('');
    }

    if (!descricao || !setor || !usuario || !prioridade) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const novaTarefa = {
      descricao,
      setor,
      idUsuario: Number(usuario),
      prioridade,
    };

    try {
      const response = await fetch(API_TAREFA, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaTarefa),
      });

      if (response.ok) {
        const data = await response.json();

        Swal.fire({
          title: 'Tarefa cadastrada com sucesso!',
          icon: 'success',
          customClass: {
            title: 'text-sweetalert',
          },
          draggable: true,
        });

        console.log('Tarefa cadastrada com sucesso:', data);

        // Limpar campos
        setDescricao('');
        setSetor('');
        setUsuario('');
        setPrioridade('');
        setTarefas((prev) => [...prev, data]); // Adiciona a tarefa nova na lista
      } else {
        console.error('Erro ao cadastrar tarefa:', response.status);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao cadastrar',
          text: 'O servidor respondeu com erro.',
        });
      }
    } catch (error) {
      console.error('Erro na conexão com o servidor:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro de conexão',
        text: 'Não foi possível conectar ao servidor.',
      });
    }
  };

  return (
    <div className="conteudoTarefa">
      <div className="titulo">
        <h1>Cadastro de Tarefas</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="inputsTarefas">
          <div className="inputTarefa">
            <label>Descrição:</label>
            <input
              type="text"
              placeholder="Digite a descrição aqui"
              value={descricao}
              onChange={validarDescricao}
              required
            />
            {erroDescricao && <p className="erro-validacao">{erroDescricao}</p>}
          </div>

          <div className="inputTarefa">
            <label>Setor:</label>
            <input
              type="text"
              placeholder="Digite o setor aqui"
              value={setor}
              onChange={validarSetor}
              required
            />
            {erroSetor && <p className="erro-validacao">{erroSetor}</p>}
          </div>
        </div>

        <div className="selectsTarefa">
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

        <div className="botaoTarefa">
          <button type="submit">Cadastrar</button>
        </div>
      </form>

      {tarefaEditando && (
        <div className="modal-edicao">
          <div className="modal-conteudo">
            <h2>Editar Tarefa</h2>
            <label>Descrição: </label>
            <input
              type="text"
              value={tarefaEditando.descricao}
              onChange={(e) =>
                setTarefaEditando({ ...tarefaEditando, descricao: e.target.value })
              }
            />

            <label>Setor:</label>
            <input
              type="text"
              value={tarefaEditando.setor}
              onChange={(e) =>
                setTarefaEditando({ ...tarefaEditando, setor: e.target.value })
              }
            />

            <label>Prioridade:</label>
            <select
              value={tarefaEditando.prioridade}
              onChange={(e) =>
                setTarefaEditando({ ...tarefaEditando, prioridade: e.target.value })
              }
            >
              <option value="B">Baixa</option>
              <option value="M">Média</option>
              <option value="A">Alta</option>
            </select>

            <div className="modal-botoes">
              <button onClick={salvarEdicao}>Salvar</button>
              <button onClick={() => setTarefaEditando(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <div className="lista-tarefas">
        {tarefas.map((tarefa) => (
          <CardTarefa
            key={tarefa.id}
            tarefa={tarefa}
            onEditar={onEditar}
            onExcluir={onExcluir}
          />
        ))}
      </div>
    </div>
  );
}
