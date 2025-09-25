import React from "react";
import '../Style/cardTarefa.scss';

export function CardTarefa({ tarefa, onDragStart }) {
  return (
    <div className={`card-tarefa card-status-${tarefa.status}`} draggable="true" onDragStart={(e) => onDragStart(e, tarefa.id)}>
      <div className="conteudo-postite">
        <h3>{tarefa.descricao}</h3>
        <p>Setor:{tarefa.setor || '-'}</p>
        <p>Prioridade: {tarefa.prioridade}</p>
      </div>
    </div>
  );
}
