document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const file = document.getElementById('resume').files[0];
  const content = tinymce.get('resume-editor').getContent();

  const formData = new FormData();
  formData.append('resume', file);
  formData.append('userId', 1); // Replace with actual user ID
  formData.append('content', content);

  const response = await fetch('/resume/upload', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  alert(result.message);
});
