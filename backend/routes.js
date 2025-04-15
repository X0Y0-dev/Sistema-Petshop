import express from 'express'
import db from './db.js'

const router = express.Router()

// CREATE
router.post("/cliente", async (req, res) => {
    try {
        const { nome_cliente, sobrenome_cliente, telefone, cpf, email, senha } = req.body;
        
        const [result] = await db.execute(
            "INSERT INTO cliente(nome_cliente, sobrenome_cliente, telefone, cpf, email, senha) VALUES (?, ?, ?, ?, ?, ?)",
            [nome_cliente, sobrenome_cliente, telefone, cpf, email, senha]
        );
        
        res.json({ 
            id: result.insertId, 
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

// LOGIN
router.post("/cliente/login", async (req, res) => {
    try {
        const { email, senha } = req.body;
        const [cliente] = await db.execute("SELECT * FROM cliente WHERE email = ? AND senha = ?", [email, senha]);

        if (cliente.length > 0) {
            res.json({ success: true, user: cliente[0] });
        } else {
            res.status(401).json({ success: false, message: "Credenciais inválidas" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// UPDATE
router.put("/cliente/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nome_cliente, sobrenome_cliente, telefone, cpf, email, senha } = req.body;

        const [result] = await db.execute(
            "UPDATE cliente SET nome_cliente = ?, sobrenome_cliente = ?, telefone = ?, cpf = ?, email = ?, senha = ? WHERE id_cliente = ?",
            [nome_cliente, sobrenome_cliente, telefone, cpf, email, senha, id]
        );
        
        res.status(200).json({ id, nome_cliente, sobrenome_cliente, telefone, cpf, email });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Erro ao atualizar cliente: " + error.message });
    }
});

// DELETE
router.delete("/cliente/:id", async (req, res) => {
    try {
        const { id } = req.params
        await db.execute("DELETE FROM cliente WHERE id=?", [id])
        res.json({ message: "Cliente excluído com sucesso!" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router