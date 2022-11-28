import express from "express";
import { randomUUID } from "crypto";
import * as dotenv from "dotenv";


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
    },
    {
        id: randomUUID(),
        documentName: "Licitação Compras - Cadeiras",
        status: "Finalizado",
        details: "Processo de licitação para compra de cadeiras",
        dateInit: "30/10/2022",
        comments: ["Licitação deserta"],
        dateEnd: "",
        setor: "tre"
    },
    {
        id: randomUUID(),
        documentName: "Licitação Compras - BEBEDOUROS",
        status: "Em andamento",
        details: "Processo de licitação para compra de cadeiras",
        dateInit: "30/09/2022",
        comments: ["Licitação em andamento", "processo na CONJUR"],
        dateEnd: "",
        setor: "trj"
    },
    {
        id: randomUUID(),
        documentName: "Licença Capacitação  ",
        status: "Finalizado",
        details: "Processo de solicitação de licença capacitação",
        dateInit: "05/10/2022",
        comments: ["Aguardando assinatura do secretário"],
        dateEnd: "",
        setor: "cnpq"
    }
];

app.get("/all", (req, res) => {
    return res.status(200).json(processos);
});


app.get("/processo/:id", (req, res) => {

    const { id } = req.params;
    const processoById = processos.find((processo) => processo.id === id);
    return res.status(200).json(processoById);

});


app.get("/status/open", (req, res) => {
    
    const statusOpen = processos.filter((processo) => processo.status === "Em andamento");
    return res.status(200).json(statusOpen);

});

app.get("/status/close", (req, res) => {
    const statusClose = processos.filter((processo) => processo.status === "Finalizado");
    return res.status(200).json(statusClose);
})

app.get("/status/:status", (req, res) => {

    const { status } = req.params;
    const statusClose = processos.filter((processo) => processo.status.toLowerCase() === status.toLowerCase());
    return res.status(200).json(statusClose);
});

app.get("/setor/:nomeSetor", (req, res) => {
    
    const {nomeSetor} = req.params;
    const processosSetor = processos.filter((processo) => processo.setor === nomeSetor);
    return res.status(200).json(processosSetor);
})

app.post("/create", (req, res) => {

    const processo = req.body;
    processo.id = randomUUID();
    processos.push(processo);

    return res.status(201).json(processos);
});

app.delete("/delete/:id", (req, res) => {
    // console.log(req.params.id);

    const { id } = req.params;

    const deleteById = processos.find((processo) => processo.id === id);

    console.log(deleteById);

    const index = processos.indexOf(deleteById);

    // console.log(index);

    processos.splice(index, 1);

    return res.status(200).json({
        message: "Excluido com sucesso"
    });


});

app.get("/random", (req, res) => {

    const randomIndex = Math.floor(Math.random() * processos.length);
    const processo = processos[randomIndex];

    return res.status(200).json(processo);

});


app.listen(process.env.PORT, () => {
    console.log(`App up and running on port http://localhost:${process.env.PORT}`);
})