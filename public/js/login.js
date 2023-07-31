const loginForm = document.getElementById('loginForm')

if (loginForm instanceof HTMLFormElement) {
  loginForm.addEventListener('submit', async e => {
    e.preventDefault()

    const input_email = document.querySelector('#email')
    const input_password = document.querySelector('#password')

    if (
      !(input_email instanceof HTMLInputElement)
      || !(input_password instanceof HTMLInputElement)
    ) return

    const data = {
      email: input_email.value,
      password: input_password.value,
    }

    const response = await fetch('/api/sesiones', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 201) {
      window.location.replace('/')
    } else if (response.status === 401) {
      alert('credenciales invalidas!')
    }
  })
}