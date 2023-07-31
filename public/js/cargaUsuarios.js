const formCargarUsuario = document.querySelector('#formCargarUsuario')

if (formCargarUsuario instanceof HTMLFormElement) {
    formCargarUsuario.addEventListener('submit', event => {
        event.preventDefault()
        const formData = new FormData(formCargarUsuario)
        const data = {}
        formData.forEach((value, key) => (data[key] = value))
        fetch('/api/usuarios', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(result => {
                if (result.status === 201) {
                    window.location.replace('/')
                }
            })
    })
}
