const apps = [
  { name: 'Auto Clicker', icon: 'Auto Clicker Pro v2.6.0 Modded by @Getmodpcs.png', file: 'Auto Clicker Pro v2.6.0 Modded by @Getmodpcs.apk' },
  { name: 'DevInfo', icon: 'DevInfo Pro v3.4.0.1 Modded by @Getmodpcs.png', file: 'DevInfo Pro v3.4.0.1 Modded by @Getmodpcs.apk' },
  { name: 'App Three', icon: 'images/app3.png', file: 'apk/app3.apk' },
];

const container = document.getElementById('appContainer');

apps.forEach(app => {
  const div = document.createElement('div');
  div.className = 'appCard';
  div.innerHTML = `
    <img src="${app.icon}" alt="${app.name}">
    <h3>${app.name}</h3>
    <progress value="0" max="100"></progress>
    <button>Download</button>
  `;
  container.appendChild(div);

  const button = div.querySelector('button');
  const progress = div.querySelector('progress');

  button.addEventListener('click', () => {
    fetch(app.file)
      .then(resp => {
        const total = parseInt(resp.headers.get('Content-Length'), 10);
        let loaded = 0;
        const reader = resp.body.getReader();

        const stream = new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  const a = document.createElement('a');
                  a.href = app.file;
                  a.download = app.name + '.apk';
                  a.click();
                  return;
                }
                loaded += value.length;
                progress.value = (loaded / total) * 100;
                controller.enqueue(value);
                push();
              });
            }
            push();
          }
        });
        return new Response(stream);
      })
      .catch(console.error);
  });
});
