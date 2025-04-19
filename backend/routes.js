import express from 'express'
import db from './db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router()

// CREATE
router.post("/cliente", async (req, res) => {
    try {
        const { nome_cliente, sobrenome_cliente, telefone, cpf, email, senha } = req.body;

        const senhaHashed = await bcrypt.hash(senha, 10);

        const [result] = await db.execute(
            "INSERT INTO cliente(nome_cliente, sobrenome_cliente, telefone, cpf, email, senha) VALUES (?, ?, ?, ?, ?, ?)",
            [nome_cliente, sobrenome_cliente, telefone, cpf, email, senhaHashed]
        );

        res.json({
            id_cliente: result.insertId,
            nome_cliente,
            sobrenome_cliente,
            telefone,
            cpf,
            email
        });
    } catch (error) {
        console.error("Erro detalhado:", error);
        res.status(500).json({
            error: error.message,
            stack: error.stack
        });
    }
});

//PET
router.post("/pet", async (req, res) => {
    try {
        const { id_cliente, nome_pet, especie, raca, sexo, peso, tamanho, castrado } = req.body;

        const [result] = await db.execute(
            `INSERT INTO pet (id_cliente, nome_pet, especie, raca, sexo, peso, tamanho, castrado) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [id_cliente, nome_pet, especie, raca, sexo, peso, tamanho, castrado]
        );

        res.json({
            success: true,
            id_pet: result.insertId,
            id_cliente,
            nome_pet,
            especie,
            raca,
            sexo,
            peso,
            tamanho,
            castrado
        });
    } catch (error) {
        console.error("Erro detalhado:", error);
        res.status(500).json({
            success: false,
            error: error.message,
            stack: error.stack
        });
    }
});

//LOGIN
router.post("/cliente/login", async (req, res) => {
    try {
        const { email, senha } = req.body;

        // 1. Busca o cliente pelo e-mail
        const [clientes] = await db.execute(
            "SELECT * FROM cliente WHERE email = ?",
            [email]
        );

        if (clientes.length === 0) {
            return res.status(401).json({ success: false, message: "Credenciais inválidas" });
        }

        const cliente = clientes[0];

        // 2. Compara a senha recebida com o hash do banco
        const senhaCorreta = await bcrypt.compare(senha, cliente.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ success: false, message: "Credenciais inválidas" });
        }

        // 3. Gera o token JWT se a senha estiver certa
        const token = jwt.sign(
            { id: cliente.id_cliente, email: cliente.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        

        // 4. Retorna o usuário e o token
        res.json({ success: true, user: cliente, token });

    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ error: error.message });
    }
});

// READ
router.get("/cliente", async (req, res) => {
    try {
        const [cliente] = await db.execute("SELECT * FROM cliente")
        res.status(200).json(cliente)
    } catch (error) {
        console.error("Erro ao buscar clientes:", error)
        res.status(500).json({ error: error.message })
    }
})


// UPDATE
router.put("/cliente/:id_cliente", async (req, res) => {
    try {
        const { id_cliente } = req.params;
        const { nome_cliente, sobrenome_cliente, telefone, cpf, email } = req.body;

        const [result] = await db.execute(
            "UPDATE cliente SET nome_cliente = ?, sobrenome_cliente = ?, telefone = ?, cpf = ?, email = ? WHERE id_cliente = ?",
            [nome_cliente, sobrenome_cliente, telefone, cpf, email, id_cliente]
        );

        res.status(200).json({ id_cliente, nome_cliente, sobrenome_cliente, telefone, cpf, email });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Erro ao atualizar cliente: " + error.message });
    }
});

// DELETE
router.delete("/cliente/:id_cliente", async (req, res) => {
    try {
        const { id_cliente } = req.params;
        await db.execute("DELETE FROM cliente WHERE id_cliente=?", [id_cliente]);
        res.json({ message: "Cliente excluído com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router