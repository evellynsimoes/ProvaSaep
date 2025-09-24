import { useState } from "react";
import '../Style/cadastroUsuario.scss';
import Swal from 'sweetalert2'

const API_URL = 'http://localhost:8000/usuario/';

export function CadUsuario(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [erroNome, setErroNome] = useState('');
    const [erroEmail, setErroEmail] = useState('');

    const validarEmail = (valor) => {
        const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.com$/;
        if(!regex.test(valor) || !valor.includes('.com')){
            setErroEmail("Email inválido. Use apenas letras minúsculas, com '@' e '.com'");
        }else {
            setErroEmail('');
        }
    }

    const validarNome = (valor) => {
        const regex = /^[A-Za-zÀ-ÿ\s]+$/;
        if(!regex.test(valor)){
            setErroNome("Deve conter apenas letras");
        }else{
            setErroNome('');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (erroNome) {
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Dados incorretos",
            customClass: {
                title: "text-sweetalert",
            },
            });
            return;
        }

        if (erroNome || erroEmail) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Dados incorretos",
                customClass: {
                title: "text-sweetalert",
                },
            });
            return;
        }


        const novoUsuario = {
            nome: nome, 
            email: email
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoUsuario)
            });

            if (response.ok) {
                const data = await response.json();
                Swal.fire({
                title: "Usuário cadastrado com sucesso!",
                icon: "success",
                customClass: {
                title: "text-sweetalert",
                },
                draggable: true
                });
                console.log("Usuário cadastrado com sucesso:", data);
                // Limpa os inputs
                setNome('');
                setEmail('');
            } else {
                console.error("Erro ao cadastrar usuário:", response.status);
            }
        } catch (error) {
            console.error("Erro de rede:", error);
        }
        };

    return(
        <main>
            <div className="conteudoUsuario">
                <h1>Cadastrar Usuario</h1>
                <form onSubmit={handleSubmit}>
                    <div className="inputs">
                        <div className="inputNome">
                            <label htmlFor="nome">Nome:</label>
                            <input type="text" value={nome} onChange={(e) => {setNome(e.target.value); validarNome(e.target.value)}} required placeholder="Digite seu nome aqui"/>
                            {erroNome && <p className="erro-validacao">{erroNome}</p>}
                        </div>

                        <div className="inputEmail">
                            <label htmlFor="email">Email:</label>
                            <input type="text" value={email} onChange={(e) => {setEmail(e.target.value); validarEmail(e.target.value)}} required placeholder="Digite seu email aqui"/>
                            {erroEmail && <p className="erro-validacao">{erroEmail}</p>}
                        </div>

                    </div>
                    <div className="botao">
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>

        </main>
    )
}