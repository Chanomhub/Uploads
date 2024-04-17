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
FCNEC=[["AKsRol-raORU-KSk5gAZPXnK7E_nuVhPTwYYQjSlBc7mMoLZcg9JO8ofVPWp3TK8gNBHTzZLu50Vpr_5qCF86Uh3U2Bx_eU79e1Xlg-AOe_y_jfXPwc8ar_pDlgW_SyV2Mlgs9J5ETOWhfs3pjdeWAtFDBc4XxgUuA=="],null,[[5,"411"]]];token=7hc318lo1kg153ch9njh4csp10;captcha={"puzzle":"1713330670.3474661f59ee54d2a","range":10000,"find":["d7de1cae781ff3dc4347568db6b8cbb816baa1d8c0025a0e8f8b0eb83f441377","bae990fa23f6d6d8af0a9661c0fa348a4deaa98048be07a74ec3ccd3d1e830d7","ec029acc5641243d21241c1a59be1f313affa7ee7d5c92185891bb4af8fad1d5"],"data":"fnKliVtsvqrXGYZjof4BDXGwi4SlLcya9zSxD0a3uMjgHIgFm84K6+xcXl6YtGoMd6xy4p5PPWmBSUJYp6FnMFMF04PLFsPpLvqWV5MgV5\/XEanvCr4Cxox1Ngu8H8EKlaEpv98Xc91JWtKB5cFl2xyQJidcEH\/0HfKtqxDGWX0rOIazI0etuVFnnzT+Ml1E"}
```
 POST to https://workupload.com/generateLink
<br>
(Cookies)
<br>
FCNEC -> ???
<br>
captcha -> https://workupload.com/puzzle
<br>
data -> ??? (File)
