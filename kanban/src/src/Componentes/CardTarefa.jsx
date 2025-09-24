import React from "react";
import '../Style/cardTarefa.scss';

export function CardTarefa({ tarefa, onChangeStatus }) {
  return (
    <div className={`card-tarefa card-status-${tarefa.status}`}>
      <div className="conteudo-postite">
        <h3>{tarefa.descricao}</h3>
        <p>Setor:{tarefa.setor || '-'}</p>
        <p>Prioridade: {tarefa.prioridade}</p>

        <label>Status:</label>
        <select
          value={tarefa.status}
          onChange={(e) => onChangeStatus(tarefa.id, e.target.value)}
        >
          <option value="A">A fazer</option>
          <option value="F">Fazendo</option>
          <option value="P">Pronto</option>
        </select>
      </div>
    </div>
  );
}
