const messageForm = document.querySelector('#add-message');
const emptyChatMessage = document.querySelector('#empty-chat');
const messagesContainer = document.querySelector('#messages-container');

let notEmpty = false;


messageForm.addEventListener('submit', event => {
	event.preventDefault();
	const { username, usermessage } = getFormObject(messageForm);
	addMessage(username, usermessage, new Date());
	messageForm.reset();
});


function addMessage(name, message, date) {
	if (!notEmpty) {
		notEmpty = true;
		emptyChatMessage.style.display = 'none';
	}

	const newMessage = generateElement('div', 'message');
	const currentMonth = (date.getMonth() + 1 < 10 ? '0' : '') +
		(date.getMonth() + 1);

	const messageHeader = generateElement('div', 'message-header');	
	newMessage.appendChild(messageHeader);
	messageHeader.appendChild(generateElement(
		'h4',
		'message-title',
		'',
		name
	));
	messageHeader.appendChild(generateElement(
		'p',
		'message-date',
		'',
		`${date.getHours()}:${date.getMinutes()}, ${date.getDate()}.${currentMonth}.${date.getFullYear()}`
	));

	newMessage.appendChild(generateElement(
		'p',
		'message-text',
		'',
		message
	));

	// Добавление кнопки Remove
	const removeButton = generateElement('button', 'remove-button', '', 'Remove');
	removeButton.addEventListener('click', () => {
		newMessage.remove();
		if (messagesContainer.childElementCount === 0) {
			emptyChatMessage.style.display = 'block';
		}
	});
	newMessage.appendChild(removeButton);

	messagesContainer.appendChild(newMessage);
}

function getFormObject(form) {
	return Array.from(form.elements)
		.filter(element => {
			return element.type != 'submit';
		}).reduce((result, element) => {
			const { name, type } = element;
			const value = type == 'checkbox' ? element.checked : element.value;
			result[name] = value;
			return result;
		}, {});
}

function generateElement(tagName, tagClass = '', tagId = '', tagValue = '') {
	const newElement = document.createElement(tagName);
	newElement.className = tagClass;
	newElement.id = tagId;
	newElement.innerText = tagValue;
	return newElement;
}