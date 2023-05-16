const form = document.querySelector('form');
const loginButton = document.querySelector('#login-button');

loginButton.addEventListener('click', (e) => {
	e.preventDefault();
	const username = form.username.value;
	const password = form.password.value;
	if (username === 'usuario' && password === 'senha') {
		alert('Login efetuado com sucesso!');
	} else {
		alert('Usuário ou senha inválidos.');
	}
});
