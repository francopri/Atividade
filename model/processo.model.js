import { Schema, model } from mongoose;


const processoSchema = new Schema(
    {
        documentName: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            minLength: 2,
            maxLength: 200
        },
        status: {
            type: String,
            required: true,
            lowercase: true,
            enum: ["Finalizado", "Em andamento",],
            default: "Em andamento"
        },
        details: {
            type: String,
            enum: [
                "Processo aberto",
                "Processo partiu para as partes assinarem",
                "Processo agora está em análise final",
                "Processo já tem data final",
                "Processo em abert e sem previsão de conclusão",
                "Processo em aberto"
            ],
            required: true
        },
        dataInit: {
            type: Date,
            required: true
        },
        dataEnd: {
            type: Date,
            required: true
        },
        comments: {
            type: String,
            trim: true,
            lowercase: true,
            minLength: 2
        },
        setor: {
            type: String,
            required: true,
            lowercase: true,
            enum: ["TRE", "TRJ", "TRF", "TJDFT", "EXTERNO"],
        }
    }
);

const processoModel = model("Processo", processoSchema);
export default processoModel;


comments: ["Processo em aberto e sem previsão de conclusão"],