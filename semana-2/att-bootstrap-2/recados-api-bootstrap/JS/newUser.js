const formNewUser = document.getElementById('form-new-user')

const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')

formNewUser.addEventListener('submit', (e) => {
  e.preventDefault() // impedir comportamento padrão do submit

  const newUser = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  }

  addNewUser(newUser)
})

async function addNewUser(newUser) {
  try {
    const response = await api.post('/users/signup', newUser)

    if (response.status === 201) {
      location.href = "index.html"
    }
  } catch (error) {
    console.log('Erro ao cadastrar usuário', error)
  }
}