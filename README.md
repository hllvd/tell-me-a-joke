# Tell me a joke
## Sobre o App
Tell me a Joke foi desenvolvido para fazer a Esther feliz. Ela gosta de escutar piadas em inglês. As do Chuck Norris são as suas preferidas.

#### Instalação

  - Descomprimir arquivo tell-me-a-joke.zip
  - Rodar os seguintes comandos no terminal

#### Para instalar o aplicativo
```
cd tell-me-a-joke
npm install
```

#### Executar o App
```
npm run serve
```
A app estará disponível no endereço http://localhost:8080


## Comportamento técnico:
  - Toda vez que a Esther fica triste, n chamadas da API https://github.com/sameerkumar18/geek-joke-api são guardadas em um estado, servindo como cachê.
  - As piadas são guardadas no estado state (app.store.js ) de forma assíncrona e recuperadas em FIFO
  - A cada piada visualizada, o estado de humor é incrementado através do método improveMoodLevel que chamará um Action this.$store.dispatch(ACTION_APP_IMPROVE_MOOD). Por sua vez, esse método requisitará a modificação ao mutations. Todos as mudanças de estados passam por mutations do arquivo (app.store.js).
  - Bom, existe uma excessão. O Modal, por ser usado somente no component Modal, não é guardado no state.
  - Ao chegar ao estado máximo de humor, o botão "Fechar piadas" é liberado
  - Um clique no botão acima envia o usuário a página inicial, resetando o humor.
  - Os nomes das actions são guardadas em constantes para facilitar a reutilização
  - O efeito de mudança de humor foi simulado com transições fade out vs fade in.
  - Existe um preload de imagens para melhorar a fluidez do app.
  - Caso o endpoint https://github.com/sameerkumar18/geek-joke-api pare de funcionar, o app carrega uma piada padrão.
  - Foi adaptado para celular


## Arquivos principais
- app.store.js : Onde foi guardado os estados
- Modal.vue : Administra o Modal
- Piada.vue : Rota da piada "conte-me-uma-piada"
- RandomGif : Mostra um Gif quando a Esther atinge o humor máximo

## Tecnologias utilizadas
- Vue.js
- Node.js




