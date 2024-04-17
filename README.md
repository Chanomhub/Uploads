# Default html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload File</title>
</head>
<body>
<form id="uploadForm">
  <input type="file" name="file" id="fileInput">
  <button type="submit">Upload</button>
  <div id="uploadResult"></div>
</form>
</body>
</html>

```

# Uploads
**Gofile**
```
      
      const uploadForm = document.getElementById('uploadForm');
      const uploadResultDiv = document.getElementById('uploadResult');

      uploadForm.addEventListener('submit', handleFileUpload);

      async function handleFileUpload(event) {
        event.preventDefault(); // Prevent default form submission

        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];

        // Check file size (adjust as needed)
        if (file.size > 2147483648) { // 2GB
          uploadResultDiv.textContent = 'File size is too large'; 
          return;
        }

        // Fetch server information
        const serverInfo = await fetchServerInfo();
        if (!serverInfo) {
          uploadResultDiv.textContent = 'Error fetching server information';
          return;
        }

        const server = selectServer(serverInfo);
        if (!server) {
          uploadResultDiv.textContent = 'Unable to select a server';
          return;
        }

        // Prepare data for upload
        const formData = new FormData();
        formData.append('file', file);

        const url = `https://${server.name}.gofile.io/uploadFile`;

        try {
          const response = await fetch(url, {
            method: 'POST',
            body: formData
          });

          const result = await response.json();
          if (result.status === 'ok') {
            uploadResultDiv.textContent = 'File uploaded successfully: ' + result.data.downloadPage; 
            // Display download URL or take other actions
          } else {
            uploadResultDiv.textContent = 'Error uploading file: ' + result.message; 
          }
        } catch (error) {
          uploadResultDiv.textContent = 'Error during upload: ' + error;
        }
      }


      async function fetchServerInfo() {
        const url = "https://api.gofile.io/servers";
        try {
          const response = await fetch(url);
          const data = await response.json();
          if (data.status === 'ok') {
            return data.data.servers;
          }
        } catch (error) {
          console.error('Error fetching server info:', error);
        }
        return null;
      }


      function selectServer(servers) {
        // Implement your server selection logic here
        if (servers && servers.length > 0) {
          return servers[0]; // Example: Select the first server
        }
        return null;
      }
```

**Workupload**
```
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

```
