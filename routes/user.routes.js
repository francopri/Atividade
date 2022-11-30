import express from "express"
import { randomUUID } from "crypto";

const userRoute = express.Router();

const processos = [
    {
        id: "96e2215b-c406-4326-9167-014b4d54bccd",
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

userRoute.get("/all", (req, res) => {
    return res.status(200).json(processos);
});

userRoute.get("/processo/:id", (req, res) => {

    const { id } = req.params;
    const processoById = processos.find((processo) => processo.id === id);

    if (!processo) {
        return res.status(404).json({ message: "Processo não encontrado." })
    }

    return res.status(200).json(processoById);
});

userRoute.get("/status/open", (req, res) => {

    const statusOpen = processos.filter((processo) => processo.status === "Em andamento");
    
    if(!statusOpen.length){
        return res.status(404).json({
            message: "Nenhum processo encontrado."
        })
    }
    
    return res.status(200).json(statusOpen);

});

userRoute.get("/status/close", (req, res) => {
    const statusClose = processos.filter((processo) => processo.status === "Finalizado");
    if(!statusClose.length){
        return res.status(404).json({
            message: "Nenhum processo encontrado."
        })
    }
    
    return res.status(200).json(statusClose);
})

userRoute.get("/status/:status", (req, res) => {

    const { status } = req.params;
    const statusClose = processos.filter((processo) => processo.status.toLowerCase() === status.toLowerCase());
    return res.status(200).json(statusClose);
});

userRoute.get("/setor/:nomeSetor", (req, res) => {

    const { nomeSetor } = req.params;
    const processosSetor = processos.filter((processo) => processo.setor === nomeSetor);

    if(!processosSetor.length){
        return res.status(404).json({
            message: "Nenhum processo encontrado."
        })
    }
    return res.status(200).json(processosSetor);
})

userRoute.post("/create", (req, res) => {

    const processo = req.body;
    processo.id = randomUUID();
    processos.push(processo);

    return res.status(201).json(
        {
            message: "Processo criado!",
            processo,
        }
    )
});

// PUT - EDITAR

userRoute.put("/edit/:id", (req, res) => {
    const { id } = req.params;

    const processo = processos.find((processo) => processo.id === id);
    const index = processos.indexOf(processo);

    processos[index] = {
        ...processo,
        ...req.body,
    }

    return res.status(200).json(processos[index]);
});

userRoute.put("/addComment/:id", (req, res) => {
    const { id } = req.params;
    const processo = processos.find((processo) => processo.id === id);

    console.log(id, processo);



    processo.comments.push(req.body.comment);

    return res.status(201).json(processo);
});

userRoute.delete("/delete/:id", (req, res) => {
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

userRoute.get("/random", (req, res) => {

    const randomIndex = Math.floor(Math.random() * processos.length);
    const processo = processos[randomIndex];

    return res.status(200).json(processo);

});

export default userRoute;