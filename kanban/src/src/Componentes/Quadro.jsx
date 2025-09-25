import React, { useState, useEffect, } from "react";
import { CardTarefa } from './CardTarefa.jsx';
import "../Style/quadro.scss";

const API_TAREFA = "http://localhost:8000/tarefa/";

export function Quadro() {
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        const buscarTarefas = async () => {
            try{
                const response = await fetch (API_TAREFA);
                if (response.ok) {
                    const data = await response.json();
                    setTarefas(data); // transforma em json e atualiza o estado com a lista de tarefas
                } else {
                    console.error("Erro ao buscar tarefas: ", response.status);
                }
            } catch (error){
                console.error ("Erro de conexão com API:", error);
            }
        };
        buscarTarefas();
    }, []);

    const handleStatusChange = async (id, novoStatus) => {
        try {
            const tarefaAtualizada = tarefas.find((t) => t.id === id); //procura a tarefa no estado
            const response = await fetch(`${API_TAREFA}${id}/`, {
                method: "PUT", // requisicao put para atualizar a tarefa com o novo estado
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...tarefaAtualizada, status:novoStatus}),
            });

            if (response.ok) {
                setTarefas((prev) =>
                prev.map((t) =>
                t.id === id ? { ...t, status: novoStatus} : t));
            } else {
                console.error("Erro ao atualizar tarefa:", response.status);
            }
        } catch (error) {
            console.error("Erro de conexão ao atualizar tarefa:", error);
        }
    };

    //armazena a tarefa sendo arrastada
    const [draggedTarefaId, setDraggedTarefaId] = useState(null);

    //quando começa o drag no card
    const onDragStart = (e, id) => {
        setDraggedTarefaId(id);
        e.dataTransfer.effectAllowed = "move" // apenas para informar o tipo de operação permitida
    };

    //permitir que a coluna aceite o drop
    const onDragOver = (e) => {
        e.preventDefault(); // obrigatorio para permitir o drop
        e.dataTransfer.dropEffect = "move"; // indica o efeito do drag
    };

    const onDrop = (e, status) => {
        e.preventDefault();
        if (draggedTarefaId !== null) {
            handleStatusChange(draggedTarefaId, status);
            setDraggedTarefaId(null);
        }
    }

    const renderColuna = (titulo, status) => (
        <div className="coluna" onDragOver={onDragOver} onDrop={(e) => onDrop (e, status)}>
            <h2>{titulo}</h2>
            {tarefas
            .filter((t) => t.status === status) //filtra as tarefas no estado que tem aquele status
            .map((tarefa) => ( //Mapeia cada tarefa filtrada para um componente <CardTarefa />, passando a tarefa e a função handleStatusChange para mudar o status.
                <CardTarefa
                    key={tarefa.id}     
                    tarefa={tarefa}
                    onDragStart = {onDragStart}
                />
            ))}
        </div>
    );

    return(
        <main className="quadroKanban">
            <h1>Quadro de Tarefas</h1>
            <div className="containerColunas">
                {renderColuna("A fazer", "A")}
                {renderColuna("Fazendo", "F")}
                {renderColuna("Feito", "P")}
            </div>
        </main>
    );
}

//passo a passo da criação do drag and drop ----------------------------------------------

//Você começa a arrastar um card (evento onDragStart), guarda o ID da tarefa.
//Você arrasta para uma coluna (evento onDragOver permite o drop).
//Você solta o card na coluna (evento onDrop).
//O onDrop chama a função para atualizar o status no backend.
//Atualizamos o estado local para refletir a mudança no UI.
//A tarefa aparece na nova coluna.
