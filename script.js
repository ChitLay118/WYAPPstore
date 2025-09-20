document.querySelectorAll('.download-btn').forEach(button => {
  button.addEventListener('click', () => {
    const link = button.dataset.link;
    const card = button.closest('.app-card');
    const progress = card.querySelector('.download-progress');
    const installBtn = card.querySelector('.install-btn');

    button.disabled = true;
    let value = 0;

    // Simulate download progress
    const interval = setInterval(() => {
      value += Math.random() * 10;
      if (value >= 100) value = 100;
      progress.value = value;

      if (value >= 100) {
        clearInterval(interval);
        installBtn.disabled = false;
        installBtn.addEventListener('click', () => {
          alert("Install started for " + card.querySelector('h2').textContent);
          // Android device မှာ install လုပ်မယ်ဆိုရင်
          // window.location.href = link; နဲ့ open လုပ်နိုင်
        });
      }
    }, 500);

    // Real download link open for browser
    window.open(link, '_blank');
  });
});
