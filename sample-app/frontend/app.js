document.addEventListener('DOMContentLoaded', () => {
    const contentSection = document.getElementById('content');
    const button = document.createElement('button');
    button.textContent = 'Click Me';
    button.addEventListener('click', () => {
        const message = document.createElement('p');
        message.textContent = 'Button clicked!';
        contentSection.appendChild(message);
    });
    contentSection.appendChild(button);
});
