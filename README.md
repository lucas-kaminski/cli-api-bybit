Para rodar o projeto é necessário ter somente o node instalado, e atráves do comando a seguir ele será inicializado:

```
node main.js
```

Após inicialização, será feito uma requisição ao endpoint indicado e carregado o resultado já filtrado e ordenado no array 'moedas'.

Tendo o array 'moedas' pronto, será feito um loop para mostrar o menu e esperar as escolhas do usuário.

Todas as operações que o usuário realizar estão aninhadas em funções no próprio arquivo, escolhi não realizar a importação de funções de outros arquivos, pois não havia necessidade devido ao tamanho do projeto e ao tempo de execução, exigindo uma abordagem diferente para a manipulação do array. Entretando, escolhi importar funções que podem ser reutilizadas em outros arquivos com outras finalidades e que não necessitam de manipulação do array.

Dentre todas as demandas do projeto, houve um que não atendi explicitamente, sendo o do número de índice, no forms de exemplo é pedido para iniciar a lista do ID em 1, porém escolhi a abordagem de visualização pelo console.table e nele é automaticamente impresso o valor do index, que no javascript por padrão começa em zero.

----

A estrutura deste pequeno projeto, assim como a organização do código serão levados em consideração durante o processo de avaliação. A partir do momento em que você abriu esta página, você tem até 3 horas e 30 minutos para finalizar o exercício.

Caso você não finalize todo o projeto a tempo, envie-o assim mesmo. Qualquer projeto entregue após o prazo permitido será desconsiderado.

Leia com atenção aos requisitos abaixo:

Assim que a sua aplicação for aberta, essa deve ter antes de tudo uma requisição GET para o endpoint https://api-testnet.bybit.com/v2/public/tickers. Você deverá listar 5 criptomoedas ordenadas por last_price, do maior valor para o menor.

Essa listagem será representada em uma tabela com as seguintes colunas:
- ID (Apenas um índice mesmo. Se a moeda for a primeira da lista o ID será 1, se for a segunda será 2 e assim sucessivamente)
- symbol
- last_price
- next_funding_time

Além dessa listagem inicial, deve-se ter uma opção para editar, remover e adicionar uma nova Criptomoeda.

Tanto a edição e adição se darão apenas sobre as colunas da tabela. Ou seja, ao se cadastrar ou editar uma nova Criptomoeda, os campos considerados serão apenas: symbol, last_price e next_funding_time.

OBSERVAÇÕES:
- NÃO é necessário construir nenhuma estrutura de banco de dados, as informações podem ser todas manipuladas apenas na memória mesmo, através do armazenamento em um array de objetos, por exemplo.
- NÃO é necessário reordenar a Lista ao se adicionar um novo item ou editar o valor de last_price de uma criptomoeda existente. Ao adicionar uma nova criptomoeda, esta ficará no final da lista e terá o ID (índice da listagem) correspondente. Ao se editar o valor de last_price de uma criptomoeda existente, ela simplesmente manterá o mesmo indíce e posição na tabela. NÃO É NECESSÁRIO reordenar os itens em nenhum caso. Quando se tratar de uma remoção, o item removido simplesmente não aparecerá mais na listagem.

Especificações dos campos:

- O campo symbol deve exibir no máximo 3 caracteres e caso este possua mais de 3 caracteres, o nome será cortado no terceiro caracter e será concatenado com "...". Ex: O nome "BTCUSD" ficaria: BTC...

- O campo data será exibido no formato DD/MM/YYYY

- Não haverá qualquer limitação de caracteres no campo symbol durante o processo de cadastro ou edição. Apenas na listagem mesmo que será cortado em 3 (caso passe de 3) e sucedido de "..."

- Ao editar ou cadastrar o campo next_funding_time, este será cadastrado e editado no mesmo formato em que foi trazido do endpoint. Ex: 2022-05-20T16:00:00Z

Sobre a linguagem a ser adotada:
Você pode construir a solução em Node, Python, ou na sua linguagem de preferência desde que não haja a necessidade de instalação de nenhum framework adicional.

A solução pode ser tanto web quanto console. Sendo console, a tabela pode ser representada da mesma forma que dados tabulares seriam representados em um terminal. Ex:
ID | symbol  | last_price  | next_funding_time
1    BTC...    29214.50      20/05/2022

Já para editar, listar, adicionar ou remover os itens no console, pode-se dar opções via comandos. Ex: 1 para deletar, 2 para editar, 3 para adicionar, 4 para listar todos os itens.
Aí para alterar um item específico, pode-se utilizar o ID como referência. Neste caso, por exemplo, a sequência 2 [Enter] e 1 [Enter] permitira que eu Editasse o Item de Id 1.
