export const login = async({ email, password }) => {
    const passwordHash = password; // TODO: converter para base64
    const body = { email, password: passwordHash }

    // Simulação de requisição para a API
    // const token = await fetch({ url: '/login', method: 'POST' })
    const token = '123';

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (password !== "123" || email != 'jonas@jonas.com.br') {
                reject(new Error("Usuário não cadastrado"));
            }

            resolve(token);
        }, 2000);
    });
}

export const logout = async() => {
    // await fetch({ url: '/logout' })
}

export const update = async({ name, phone }, token) => {
    // await fetch({ url: '/update', method: 'POST' })

    // Simulação de requisição para a API
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}