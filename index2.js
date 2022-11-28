import fs from "fs";
import { randomUUID } from "crypto";
import express from "express";
import * as dotenv from "dotenv";
import { emitWarning } from "process";
import { get } from "http";


dotenv.config();

const app = express();

app.use(express.json());


function lerProcessos() {
    return JSON.parse(fs.readFileSync("./db/db.json").toString());
}

function gravarProcessos(processos) {
    fs.writeFileSync("./db/db.json", JSON.stringify(processos));
}


app.get("/all", (req, res) => {

    const processos = lerProcessos();

    return res.status(200).json(processos);

});

app.get("/processo/:id", (req, res) => {

    const processos = lerProcessos();

    console.log(req.params);
    // const { id } = req.params;

    const id = req.params.id;

    const processo = processos.find((processo) => processo.id === id);

    return res.status(200).json(processo);

});

app.post("/create", (req, res) => {
    
    const processos = lerProcessos();

    const processo = req.body;
    processo.id = randomUUID();

    processos.push(processo);

    gravarProcessos(processos);

    return res.status(201).json(processos);
});

app.delete("/delete/:id", (req, res) => {

    // console.log(req.params.id);

    // const { id } = req.params;

    // const deleteById = processos.find((processo) => processo.id === id);

    // console.log(deleteById);

    // const index = processos.indexOf(deleteById);

    // console.log(index);

    // processos.splice(index, 1);



    const processos = lerProcessos();

    const { id } = req.params;

    const newProcessos = processos.filter(processo => processo.id != id);

    gravarProcessos(newProcessos);



    return res.status(200).json({
        message: "Excluido com sucesso"
    });


});

app.get("/status/open", (req, res) => {

    const processos = lerProcessos();

    const statusOpen = processos.filter((processo) => processo.status === "Em andamento");
    return res.status(200).json(statusOpen);

});

app.get("/status/close", (req, res) => {

    const processos = lerProcessos();

    const statusClose = processos.filter((processo) => processo.status === "Finalizado");
    return res.status(200).json(statusClose);
});

app.get("/status/:status", (req, res) => {

    const { status } = req.params;

    const processos = lerProcessos();

    const statusClose = processos.filter((processo) => processo.status === status);
    return res.status(200).json(statusClose);
});


app.get("/setor/:nomeSetor", (req, res) => {
    const processos = lerProcessos();

    const { nomeSetor } = req.params;

    const processosSetor = processos.filter((processo) => processo.setor === nomeSetor);

    return res.status(200).json(processosSetor);
});

app.get("/random", (req, res) => {

    const processos = lerProcessos();

    const randomIndex = Math.floor(Math.random() * processos.length);
    const processo = processos[randomIndex];

    return res.status(200).json(processo);

});


app.listen(process.env.PORT, () => {
    console.log(`App up and running on port http://localhost:${process.env.PORT}`);
});