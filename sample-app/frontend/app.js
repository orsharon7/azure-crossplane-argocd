document.addEventListener('DOMContentLoaded', () => {
    const contentSection = document.getElementById('content');
    const button = document.createElement('button');
    button.textContent = 'Click Me';
    button.addEventListener('click', () => {
        const message = document.createElement('p');
        message.textContent = 'Button clicked!';
        contentSection.appendChild(message);
        generateAIContent();
    });
    contentSection.appendChild(button);
});

function generateAIContent() {
    const aiContentSection = document.getElementById('ai-content');
    const aiMessage = document.createElement('p');
    aiMessage.textContent = 'This is AI-generated content!';
    aiContentSection.appendChild(aiMessage);
}
