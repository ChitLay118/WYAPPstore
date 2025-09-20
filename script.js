const downloadBtn = document.getElementById('downloadBtn');
const progressBar = document.getElementById('progress');

downloadBtn.addEventListener('click', () => {
  fetch('/myapp.apk')
    .then(response => {
      const contentLength = response.headers.get('Content-Length');
      if (!contentLength) throw new Error('Content-Length missing');
      const total = parseInt(contentLength, 10);
      let loaded = 0;
      const reader = response.body.getReader();

      const stream = new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                // Download finished → trigger install
                const a = document.createElement('a');
                a.href = '/myapp.apk';
                a.download = 'myapp.apk';
                a.click();
                return;
              }
              loaded += value.length;
              progressBar.value = (loaded / total) * 100;
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
