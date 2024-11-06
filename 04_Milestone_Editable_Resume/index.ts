document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn') as HTMLButtonElement;

    startBtn.addEventListener('click', () => {
        window.location.href = 'form.html';
    });
});
