# FECAP - Fundação Escola de Comércio Álvares Penteado

<p align="center">
<a href= "https://www.fecap.br/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhZPrRa89Kma0ZZogxm0pi-tCn_TLKeHGVxywp-LXAFGR3B1DPouAJYHgKZGV0XTEf4AE&usqp=CAU" alt="FECAP - Fundação Escola de Comércio Álvares Penteado" border="0"></a>
</p>

## Nome do Projeto

<p><strong>Sistema de Agendamento de Banhos em Pet Shop</strong></p>

## Integrantes

<a href="https://www.linkedin.com/in/lucas-alves-bernardo-093871252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">`Lucas Alves Bernardo`</a>

## Orientadores

<a href="https://www.linkedin.com/in/francisco-escobar/">`Me. Francisco de Souza Escobar`</a>

## Descrição

<p>O projeto se consiste em desenvolver um sistema web completo para cadastro de usuários, login seguro, e agendamento de banhos em um petshop, com a possibilidade de cadastrar imagens dos pets. O sistema deverá incluir front-end (HTML/CSS) e back-end com Node.js, banco de dados MySQL, e autenticação com JWT.</p>

## Funcionalidades obrigatórias

### Cadastro e login de usuários
<p>● Registro com e-mail e senha criptografada.</p>
<p>● Login com JWT e retorno de token.</p>
<p>● Middleware para proteger rotas privadas.</p>

### Sistema de agendamento
<p>● Cadastro de agendamentos com:</p>
<p>&emsp;&emsp;° Nome do pet;</p>
<p>&emsp;&emsp;° Raça;</p>
<p>&emsp;&emsp;° Data e horário;</p>
<p>&emsp;&emsp;° Observações;</p>
<p>&emsp;&emsp;° Upload de imagem (obrigatório).</p>
<p>● CRUD completo dos agendamentos via API:</p>

```
POST        /pets          -> Criar agendamento (com imagem) 
GET         /pets          -> Listar agendamentos
PUT         /pets/:id      -> Atualizar agendamento
DELETE      /pets/:id      -> Excluir agendamento
```

## Requisitos Funcionais
<p>1- O sistema deve permitir o cadastro de novos usuários;</p>
<p>2- O sistema deve permitir agendar banho com imagem do pet;</p>
<p>3- O usuário deve poder visualizar, editar e excluir agendamentos.</p>

## Requisitos Não-Funcionais
<p>1- As imagens devem ser salvas em uma pasta específica no servidor;</p>
<p>2- As senhas devem ser criptografadas usando bcrypt;</p>
<p>3- A autenticação deve utilizar JWT com middleware para rotas privadas.</p>

## 📂 **Estrutura do Repositório**

```
/petshop-system
|
├── /Logs
│   ├── Log 1.md
│   ├── Log 2.md
│   ├── Log 3.md
|
├── /frontend
│   ├── index.html
│   ├── login.html
│   ├── cadastro.html
│   ├── style.css
|
├── /backend
│   ├── server.js
│   ├── /routes
│   ├── /controllers
│   ├── /models
│   ├── /middleware
│   ├── /uploads
│   ├── .env
│   ├── package.json
|
├── banco_petshop.sql
├── README.md
```

## 🛠 Instalação e Execução

### 🔧 Pré-requisitos
Antes de começar, certifique-se de ter instalado:
- [GitHub Desktop](https://desktop.github.com/download/)
- [Visual Studio Code](https://code.visualstudio.com/)
- Um navegador de sua preferência

### 🛠️ Passo a Passo

1. **Clone o repositório**
   ```sh
   - Clique no botão verde "<> Code" no topo da tela inicial deste projeto.
   - Clique em "Open with GitHub Desktop".
   - Faça login no GitHub Desktop.
   - Clique em "File", "Clone Repository" e, depois, em "URL".
   - Insira a seguinte URL: https://github.com/X0Y0-dev/Sistema-de-Agendamento-de-Banhos-em-Pet-Shop.git
   - Clique em "Clone".
   ```
2. **Abra o VSCode**
   ```sh
   Pressione as teclas "Win + S" ou, se preferir, abra a barra de pesquisa windows manualmente.
   Pesquise por "vscode" ou "Visual Studio Code" e abra-o.
   No VSCode clique em "File", "Open Folder" e abra a pasta que você clonou no caminho que você escolheu.
   Por exemplo: "C:\Users\nome\Downloads\petshop-system". Este é só um exemplo, você precisa encontrar onde você salvou.
   ```
3. **Execute**
   ```sh
   Clique no símbolo com quatro quadrados no canto esquerdo de seu VSCode para abrir a barra de pesquisa de extensões.
   Procure e instale a extensão "Live Server" no VSCode.
   Agora, clique no "index.html" que está dentro da pasta "Frontend" (em src) e, depois, clique em "Go Live".
   ```

### 🖥 Extensões
Todas as extensões foram baixadas diretamente pela aba de extensões do Visual Studio Code.
1. JavaScripts (ES6) code snippets - charalampos karypidis
2. HTML CSS Support - ecmel
3. Live Server - Ritwick Dey

### 💻 Softwares Utilizados
1. <a href="https://code.visualstudio.com/">VSCode</a> - Microsoft
2. <a href="https://wampserver.aviatechno.net/?lang=en=">WampServer</a> - Romain Bourdon
3. <a href="https://www.mysql.com/">MySQL</a> - Oracle Corporation
4. <a href="http://www.sis4.com/brModelo/download.html">BrModelo</a> - Grupo de Banco de Dados da UFSC

## 🎓 Referências
