import { publish } from "./rabbit.js";
import { wait } from "../utils/timeUtils.js";

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

export const getDispositivoFromEnvironmentVariables = () => {
    const { CATEGORIA_ID, CATEGORIA_NOME, CATEGORIA_MEDIDA } = process.env;

    const categoria = {
        id: CATEGORIA_ID,
        nome: CATEGORIA_NOME,
        medida: CATEGORIA_MEDIDA,
    };

    const {
        ESTANTE_ID,
        ESTANTE_DESCRICAO,
        PRATELEIRAS,
        NICHOS_POR_PRATELEIRA,
    } = process.env;

    const estante = {
        id: ESTANTE_ID,
        descricao: ESTANTE_DESCRICAO,
        prateleiras: PRATELEIRAS,
        nichosPorPrateleira: NICHOS_POR_PRATELEIRA,
    };

    const { TIPO_DISPOSITIVO_ID, TIPO_DISPOSITIVO_NOME } = process.env;

    const tipo = {
        id: TIPO_DISPOSITIVO_ID,
        nome: TIPO_DISPOSITIVO_NOME,
    };

    const { POSICAO_VERTICAL, POSICAO_HORIZONTAL } = process.env;

    const nicho = {
        prateleira: {
            estanteId: ESTANTE_ID,
            posicaoVertical: POSICAO_VERTICAL,
        },
        posicaoHorizontal: POSICAO_HORIZONTAL,
    };

    const { DISPOSITIVO_ID } = process.env;

    const dispositivo = {
        id: DISPOSITIVO_ID,
        categoria,
        estante,
        tipo,
        nicho,
    };
    return dispositivo;
};

export const run = async (dispositivo) => {
    const sensorQueue = process.env.SENSOR_QUEUE || "estante-1";
    const intervalSeconds = process.env.INTERVAL_SECONDS || 60;
    console.log("Dispositivo", dispositivo);
    let value = 20.0;
    while (true) {
        value += getRandomArbitrary(-0.3, 0.3);
        value = +parseFloat(value).toFixed(2);

        const msg = {
            sentAt: new Date(),
            id: parseInt(dispositivo.id, 10),
            label: dispositivo.categoria.medida,
            category: dispositivo.categoria.nome,
            type: dispositivo.tipo.nome,
            value,
        };

        console.log(`Publicando na fila ${sensorQueue}...`);
        await publish(sensorQueue, msg);
        console.log(msg);
        await wait(intervalSeconds);
    }
};
