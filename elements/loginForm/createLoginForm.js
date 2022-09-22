const HTMLForm =
'<form method="get" class="login-form">\n' +
'    <ul class="login-form-wrapper">\n' +
'        <li class="login-form-row">\n' +
'        <label class="login-form-label">\n' +
'            Введите имя:<br>\n' +
'            <input name="name" placeholder="Имя пользователя" class="login-form-name"><br>\n' +
'        </label>\n' +
'        </li>\n' +
'        <li class="login-form-row">\n' +
'            <input type="submit" value="Ввод" class="login-form-submit">\n' +
'        </li>\n' +
'    </ul>\n' +
'</form>'


const createLoginForm = (clickOnLoginButton, action) => {
    let div = document.createElement('div')
    div.innerHTML = HTMLForm
    div.setAttribute('class', 'login-form-container')

    let form = div.getElementsByClassName('login-form')[0]
    form.onsubmit = (event) => {
        let formData = new FormData(event.target)
        let a = div.getElementsByClassName('login-form-name')[0].value = ''
        clickOnLoginButton(event, formData.get('name'))
    }
    form.setAttribute('action', action)

    if (localStorage.getItem('currentPlayer')) {
        let inputName = div.getElementsByClassName('login-form-name')[0]
        inputName.value = localStorage.getItem('currentPlayer')
    }

    return div
}


export const replaceAllLoginForm = (clickOnLoginButton, action) => {
    let replaceDiv = document.getElementsByClassName('loginForm')
    for (let el of replaceDiv) {
        el.replaceWith(createLoginForm(clickOnLoginButton, action))
    }
}
