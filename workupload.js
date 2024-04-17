    const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const uploadResult = document.getElementById('uploadResult');

uploadForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const file = fileInput.files[0];
  const formData = new FormData();

  // Add form data as instructed
  formData.append('token', '7hc318lo1kg153ch9njh4csp10');
  formData.append('filebag', '661f4f789a3de');
  formData.append('files[]', file);

  fetch('https://f71.workupload.com/api/file/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    const key = data.files[0].key;
    const downloadLink = `https://workupload.com/file/${key}`;
    uploadResult.innerHTML = `<a href="${downloadLink}" target="_blank">${downloadLink}</a>`;
  })
  .catch(error => {
    console.error('Error:', error);
    uploadResult.textContent = 'Upload failed.';
  });
});
