const formEditMessage = document.getElementById('form-edit-message')
const titleInput = document.getElementById('title-edit')
const descriptionInput = document.getElementById('description-edit')

const urlParams = new URLSearchParams(window.location.search) //?id="25"
const messageId = urlParams.get("id") //25

console.log(messageId)

async function populateEditForm() {
  try {
    const response = await api.get(`/notes/list/${messageId}`)
    const message = response.data

    titleInput.value = message.title
    descriptionInput.value = message.description

  } catch (error) {
    console.log('Erro ao buscar recado', error)
  }
}

populateEditForm()

formEditMessage.addEventListener('submit', (event) => {
  event.preventDefault()

  const titleValue = titleInput.value
  const descriptionValue = descriptionInput.value

  const editMessage = {
    title: titleValue,
    description: descriptionValue
  }

  updateMessage(messageId, editMessage)
})

async function updateMessage(messageId, editMessage) {
  try {
    const response = await api.put(`/notes/${messageId}`, editMessage)

    if (response.status === 200) {
      alert('Recado atualizado com sucesso!')
    }

    location.href = "listar-recados.html"
  } catch (error) {
    console.log('Erro ao atualizar recado.')
  }
}