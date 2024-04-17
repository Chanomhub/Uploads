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
