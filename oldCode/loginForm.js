let replaceDiv = document.getElementsByClassName('loginForm')

const insertLoginForm = (elem) => {
    let div = document.createElement('div')
    div.setAttribute('class', 'login-form-container')
    let form = createLoginForm()

    div.append(form)
    elem.replaceWith(div)
    // elem.replaceWith(form)
}


const createLoginForm = () => {
    let form = document.createElement('form')
    form.setAttribute('class', 'login-form')

    let label = createLabel()
    let loginFormSubmit = createLoginFormSubmit()

    form.append(label, loginFormSubmit)
    return form
}


const createLoginFormSubmit = () => {
    let loginFormContainerSubmit = document.createElement('div')
    loginFormContainerSubmit.setAttribute('class', 'login-form-container-submit')

    let loginFormSubmit = document.createElement('input')
    loginFormSubmit.setAttribute('class', 'login-form-submit')
    loginFormSubmit.setAttribute('type', 'submit')

    loginFormContainerSubmit.append(loginFormSubmit)

    return loginFormContainerSubmit
}


const createInputName = () => {
    let inputName = document.createElement('input')
    inputName.setAttribute('class', 'login-form-name')
    inputName.setAttribute('placeholder', 'Имя пользователя')
    return inputName
}


const createLabel = () => {
    let label = document.createElement('label')
    label.setAttribute('class', 'login-form-label')
    label.innerHTML = 'Введите имя:'

    label.append(document.createElement('br'))

    label.append(createInputName())

    return label
}


for (let div of replaceDiv) {
    insertLoginForm(div)
}
