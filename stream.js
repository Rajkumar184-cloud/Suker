<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SMS Sender</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f4f4;
      padding: 30px;
      text-align: center;
    }
    .container {
      background: #fff;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      max-width: 400px;
      margin: auto;
    }
    input, textarea {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 8px;
    }
    button {
      background: #007bff;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
    }
    button:hover {
      background: #0056b3;
    }
    #response {
      margin-top: 15px;
      font-weight: bold;
    }
  </style>
</head>
<body>

  <div class="container">
    <h2>Send SMS to Customer</h2>
    <form id="smsForm">
      <input type="text" id="number" placeholder="Enter phone number (e.g., 01324274940)" required>
      <textarea id="message" placeholder="Enter your message..." rows="4" required></textarea>
      <button type="submit">Send SMS</button>
    </form>
    <div id="response"></div>
  </div>

  <script>
    document.getElementById('smsForm').addEventListener('submit', function(e) {
      e.preventDefault();

      const number = document.getElementById('number').value.trim();
      const message = document.getElementById('message').value.trim();

      const url = `https://root-x.yzz.me/saimul/saimul30day.php?number=${encodeURIComponent(number)}&message=${encodeURIComponent(message)}&i=1`;

      fetch(url)
        .then(res => res.text())
        .then(data => {
          document.getElementById('response').innerText = "✅ " + data;
        })
        .catch(err => {
          document.getElementById('response').innerText = "❌ Error sending message.";
        });
    });
  </script>

</body>
</html>