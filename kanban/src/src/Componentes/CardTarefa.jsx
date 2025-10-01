import React from "react";
import '../Style/cardTarefa.scss';

export function CardTarefa({ tarefa, onDragStart, onEditar, onExcluir }) {
  return (
    <div className={`card-tarefa card-status-${tarefa.status}`} draggable="true" onDragStart={(e) => onDragStart(e, tarefa.id)}>
      <div className="conteudo-postite">
        <h3>{tarefa.descricao}</h3>
        <p>Setor:{tarefa.setor || '-'}</p>
        <p>Prioridade: {tarefa.prioridade}</p>
        <p>Usuário: {tarefa.usuario_nome || '-'}</p>

        <div className="botoes-card">
          <button onClick={() => onEditar(tarefa)}>Editar</button>
          <button onClick={() => onExcluir(tarefa)}>Excluir</button>
        </div>
      </div>
    </div>
  );
}
