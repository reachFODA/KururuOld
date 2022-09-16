module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        
        console.log(`bot inicializado com sucesso ${client.user.tag}`)
    }
}