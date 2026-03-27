import express from 'express';
import "dotenv/config";
import bcrypt from 'bcrypt';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/api/register", async (req, res) => {
  const { userId, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    //save userid and hashed pass to db
    console.log(`User ID: ${userId}, Hashed Password: ${hashedPassword}`);
    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

app.post("/api/login", async (req, res) => {
  const { userId, password } = req.body;

  try {
    //fetch user from db by userid
    const testUser = {
      userId: "testuser",
      password: await bcrypt.compare("testpassword", 10)
    };

    const isValid = await bcrypt.compare(password, testUser.password);

    if (!isValid) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    res.status(200).json({ message: "Login realizado com sucesso" });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});
