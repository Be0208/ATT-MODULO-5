const messagesContainer = document.querySelector('.messages-list')

const prevPage = document.getElementById('prevPage') //paginação
const nextPage = document.getElementById('nextPage') //paginação
const pageNumbers = document.getElementById('pageNumbers')
const numbers = document.getElementById('numbers')
const fristPage = document.getElementById('frist')
const lastPage = document.getElementById('last')

const newRecado = document.getElementById('newRecado') //encaminhr para fazer um noo recado

// Variáveis globais para a PAGINAÇÂO
let currentPage = 1 //pagina atual - inicia com 1 
let totalPage = 1 //total de paginas que temos da api

async function fetchMessages(page) { //faz a requisição para a api 
  try {
    const userId = localStorage.getItem('userId')

    if (!userId) {
      alert("Você precisa fazer login para visualizar os recados.")
      location.href = "index.html"

      return
    }

    const params = { // PARAMETROS para a minha PAGINAÇÃO de listas
      page, //pagina atual
      perPage: 3 //quantos dados por pagina atual
    }

    const response = await api.get(`/notes/${userId}`, { params })
    const messages = response.data.userMessages //array com todos os recados "do userId"

    console.log(messages)

    totalPage = response.data.totalPages//denomina o total de paginas dentro desta variavel dinamica
    
    numbers.innerText = `${currentPage} de ${totalPage}` // mostra qual pagina vc esta de quantas paginas existem

    if(!pageNumbers.children.length){
      for(let contador = 1; contador <= totalPage; contador++){
        pageNumbers.innerHTML += `<button onclick=fetchMessages(${contador}) >${contador}</button>`   // fez um botão para cada pagina
     }
    }

    messagesContainer.innerHTML = ''

    messages.forEach(message => {
      const messageCard = document.createElement('div')
      messageCard.classList.add('card')

      messageCard.innerHTML = `
        <h2 class="card-title">${message.title}</h2>
        <p class="card-description">${message.description}</p>
        <div class="card-icons">
          <i class="fas fa-solid fa-trash" data-id=${message.id}></i>
          <i class="fas fa-regular fa-edit" data-id=${message.id}></i>
        </div>
      `

      messagesContainer.appendChild(messageCard)

      const deleteIcon = messageCard.querySelector('.fa-trash')

      deleteIcon.addEventListener('click', () => {
        const messageId = deleteIcon.getAttribute('data-id')

        deleteMessage(messageId)
      })

      const editIcon = messageCard.querySelector('.fa-edit')
      editIcon.addEventListener('click', () => {
        const messageId = editIcon.getAttribute('data-id')

        navigateToEditPage(messageId)
      })
    });

    if (messages.length === 0) {
      const h3 = document.createElement('h3')
      h3.textContent = 'Nenhum recado cadastrado.'
      messagesContainer.appendChild(h3)
    }
  } catch (error) {
    console.log('Erro ao buscar mensagens', error)
  }
}

fetchMessages(currentPage) //o o valor da pagina "1, 2, 3, 4, ..."

function navigateToEditPage(messageId) {
  location.href = `editar-recado.html?id=${messageId}`
}

prevPage.addEventListener('click', () => { 
  if (currentPage > 1) {
    currentPage-- //diminui o valor da pagina atual
    fetchMessages(currentPage)
  }
})
nextPage.addEventListener('click', () => { //o evento que vai acontecer ao eu clicar no botão "nextPage"
  if (currentPage < totalPage) {
    currentPage++; //incrementa a pagina atual
    fetchMessages(currentPage) //incaminha o numero da pagina para a função de buscar recados
  }
})


fristPage.addEventListener('click', () => {
  currentPage = 1
  fetchMessages(currentPage)
})
lastPage.addEventListener('click', () => {
  currentPage = totalPage
  fetchMessages(currentPage)
})

// trocado por um modal

// newRecado.addEventListener('click', () => {
//   location.href = `cadastrar-recado.html`
// })

