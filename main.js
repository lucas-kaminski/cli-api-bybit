const https = require('https')
const readline = require('readline')

const axios = require('axios')

const { isValidDate } = require('./utils')

let sairDaAplicação = false
let moedas = []

async function requisicaoInicial() {
  return new Promise((resolve) => {
    https.get('https://api-testnet.bybit.com/v2/public/tickers', (resp) => {
      let data = ''

      resp.on('data', (chunk) => {
        data += chunk
      })

      resp.on('end', () => {
        moedas = JSON.parse(data).result.sort((a, b) => (b.last_price - a.last_price)).slice(0, 5)
        resolve()
      })

    }).on("error", (err) => {
      console.log("Error: " + err.message)
    })

  })
}

function pedirOpcaoAoUsuario() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('\n')
  console.log('Escolha uma opção')
  console.log('1 - Deletar uma moeda')
  console.log('2 - Editar uma moeda')
  console.log('3 - Adicionar uma moeda')
  console.log('4 - Listar todas as moedas')
  console.log('5 - Sair')
  console.log('\n')

  return new Promise((resolve) => {
    rl.question('Opção desejada: ', (answer) => {
      console.log('\n')
      resolve(answer)
      rl.close()
    })
  })
}

function listarTodasAsMoedas() {
  const subset = (({ symbol, last_price, next_funding_time }) => { return { symbol: symbol.length > 3 ? symbol.substr(0, 3) + '...' : symbol, last_price, next_funding_time: isValidDate(next_funding_time) && new Date(next_funding_time).toLocaleDateString('pt-br') || next_funding_time } })
  console.table(moedas.map(subset))
}

async function deletarMoeda() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('Deleção de uma moeda')
  return new Promise((resolve) => {
    rl.question('Index da moeda: ', (answer) => {
      if (answer < moedas.length) {
        moedas.splice(answer, 1)
        console.log('Moeda deletada com sucesso')
      } else {
        console.log('Index inválido')
      }
      resolve()
      rl.close()
    })
  })
}

async function editarMoeda() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('Edição de uma moeda')
  return new Promise((resolve) => {
    rl.question('Index da moeda: ', (answer) => {
      if (answer < moedas.length) {
        console.log('Qual atributo deseja editar da moeda ' + moedas[answer].symbol + '?')
        console.log('1 - Nome')
        console.log('2 - Preço')
        console.log('3 - Data')
        rl.question('Opção desejada: ', (answerOption) => {
          if (answerOption == 1) {
            console.log('Digite o novo nome')
            rl.question('Novo nome: ', (answerName) => {
              moedas[answer].symbol = answerName
              console.log('Nome editado com sucesso')
              resolve()
              rl.close()
            })
          } else if (answerOption == 2) {
            console.log('Digite o novo preço')
            rl.question('Novo preço: ', (answerPrice) => {
              moedas[answer].last_price = answerPrice
              console.log('Preço editado com sucesso')
              resolve()
              rl.close()
            })
          } else if (answerOption == 3) {
            console.log('Digite a nova data')
            rl.question('Nova data: ', (answerDate) => {
              if (isValidDate(answerDate)) {
                moedas[answer].next_funding_time = new Date(answerDate)
                console.log('Data editada com sucesso')
              } else {
                moedas[answer].next_funding_time = undefined
                console.log('Data inválida')
              }
              resolve()
              rl.close()
            })
          } else {
            console.log('Opção inválida')
            resolve()
            rl.close()
          }
        })
      } else {
        console.log('Index inválido')
        resolve()
        rl.close()
      }
    })
  })
}

async function adicionarMoeda() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('Adição de uma moeda')

  return new Promise((resolve) => {
    let index
    rl.question('Digite o nome da moeda: ', (answer) => {
      index = moedas.push({ symbol: answer, last_price: 0, next_funding_time: '2020-01-01' })
      rl.question('Digite o preço da moeda: ', (answer) => {
        moedas[index - 1].last_price = answer
        rl.question('Digite a data da moeda: ', (answer) => {
          if (isValidDate(answer)) {
            moedas[index - 1].next_funding_time = new Date(answer)
          } else {
            console.log('Data inválida')
            moedas[index - 1].next_funding_time = undefined
          }
          console.log('Moeda adicionada com sucesso')
          resolve(index - 1)
          rl.close()
        })
      })
    })
  })
}

async function main() {
  await requisicaoInicial()

  while (!sairDaAplicação) {
    let opcao = await pedirOpcaoAoUsuario()
    switch (opcao) {
      case '1':
        await deletarMoeda()
        break
      case '2':
        await editarMoeda()
        break
      case '3':
        // const teste = await adicionarMoeda()
        // const novaMoeda = moedas[teste]
        // console.log(novaMoeda)

        // send post to localhost with new coin
        // http://localhost:3000
        // https://secure-fortress-69045.herokuapp.com
        // const response = axios.post('http://localhost:3000/coins/new', { symbol: 'A', last_price: '30', next_funding_time: undefined })
        // console.log(response.data)
        break
      case '4':
        listarTodasAsMoedas()
        break
      case '5':
        sairDaAplicação = true
        break
      default:
        console.log('Opção inválida')
    }
  }

  console.log('Execução finalizada')
  process.exit()
}

main()