const { select, input, checkbox } = require("@inquirer/prompts");

let meta = {
    value: "Tomar 3L de água todos os dias",
    checked: false,
};

let metas = [meta];

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta: " });

    if (meta.length == 0) {
        console.log('A meta não pode ser vazia');
        return;
    }

    metas.push({ value: meta, checked: false });
};

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    });

    if (respostas.length == 0) {
        console.log("Nenhuma meta selecionada");
        return;
    }

    // Desmarcar todas as metas
    metas.forEach((m) => {
        m.checked = false;
    });

    // Aqui estava o erro: corrigido para respostas.forEach
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value === resposta;
        });

        if (meta) {
            meta.checked = true;
        }
    });

    console.log('Meta(s) marcada(s) como concluída(s)');
};

const metasRealizadas = async () => {
    const realizadas = metas.filter((metas) => {
        return meta.checked
    })
    if(realizadas.length == 0){
        console.log("Não existe metas realizadas :/ ")
        return
    }

    await select ({
        message: "Metas Realizadas",
        choices: [...realizadas]
    })
}

const start = async () => {
    while (true) {
        const opcao = await select({
            message: "Menu  >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        });

        switch (opcao) {
            case "cadastrar":
                await cadastrarMeta();
                console.log(metas);
                break;
            case "listar":
                await listarMetas();
                console.log(metas);
                break;
            case "realizadas":
                await metasRealizadas();
                break
            case "sair":
                console.log("Até a próxima");
                return;
        }
    }
};

start();
