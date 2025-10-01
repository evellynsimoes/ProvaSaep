import { useState } from "react";
import '../Style/cadastroUsuario.scss';
import Swal from 'sweetalert2'

const API_URL = 'http://localhost:8000/usuario/';

export function CadUsuario(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [erroNome, setErroNome] = useState('');
    const [erroEmail, setErroEmail] = useState('');

    const handleChangeEmail = (e) => {
        const valor = e.target.value;

        const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.com$/;
        const regexCaracteres = /^.{0,30}$/;

        if(!regexEmail.test(valor) || !valor.includes('.com')){
            setErroEmail("Email inválido. Use apenas letras minúsculas, com '@' e '.com'");
            return;
        }

        if(!regexCaracteres.test(valor)){
            setErroEmail("Máximo de 30 caracteres");
            return;
        }

        setErroEmail('');
        setEmail(valor);
    }

    const handleChangeNome = (e) => {
        const valor = e.target.value;

        const regexCaracteres = /^.{0,30}$/;
        const regexNomeLetras = /^[A-Za-zÀ-ÿ\s]*$/;

        //"test" retorna true se a string bate com o regex
        if (!regexCaracteres.test(valor)){
            setErroNome("Máximo de 30 caracteres");
            return;
        }

        if (!regexNomeLetras.test(valor)){
            setErroNome("Deve conter apenas letras");
            return;
        }

        setErroNome('');
        setNome(valor);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //revalida o nome
        const regexNome = /^[A-Za-zÀ-ÿ\s]{1,30}$/;
        if (!regexNome.test(nome)){
            setErroNome ("Nome inválido. Use apenas letras (máx. 30 caracteres)");
            return;
        } else {
            setErroNome('');
        }

        //revalida o email
        const regexEmail =  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com)$/;
        if (!regexEmail.test(email)){
            setErroEmail("Email inválido. Use apenas letras minúsculas, com '@' e '.com'");
            return;
        } else {
            setErroEmail('');
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
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: "Falha ao cadastrar usuário",
                    customClass: {
                        title: "text-sweetalert",
                    },
                });
                console.error("Erro ao cadastrar usuário", response.status);
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
                            <input type="text" value={nome} onChange={handleChangeNome} required placeholder="Digite seu nome aqui"/>
                            {erroNome && <p className="erro-validacao">{erroNome}</p>}
                        </div>

                        <div className="inputEmail">
                            <label htmlFor="email">Email:</label>
                            <input type="text" value={email} onChange={handleChangeEmail} required placeholder="Digite seu email aqui"/>
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