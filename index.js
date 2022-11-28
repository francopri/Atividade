import express from "express";
import * as dotenv from "dotenv";
import { randomUUID } from "crypto";


dotenv.config();

const app = express();

app.use(express.json());

const processos = [
    {
        id: randomUUID(),
        documentName: "Licitação Compras - Notebooks",
        status: "Em andamento",
        details: "Processo de licitação para compra de notebooks",
        dateInit: "30/11/2022",
        comments: ["Processo em aberto e sem previsão de conclusão"],
        dateEnd: "",
        setor: "tre"
    }
];

app.get("/all", (req, res) => {
    return res.status(200).json(processos);
});


app.get()


app.post("/create", (req, res) => {

    const processo = req.body;
    processo.id = randomUUID();
    processos.push(processo);

    return res.status(201).json(processos);
});

app.delete("/delete/:id", (req, res) => {
    console.log(req.params.id);

    const {id} = req.params;

    const deleteById = processos.find((processo) => processo.id === id);

    console.log(deleteById);

    const index = processos.indexOf(deleteById);

    console.log(index);

    processos.splice(index, 1);

    return res.status(200).json({
        message: "Excluido com sucesso"
    });


})


app.listen(process.env.PORT, () => {
    console.log(`App up and running on port http://localhost:${process.env.PORT}`);
})