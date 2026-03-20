export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Welcome</title>
  </head>

  <body style="margin:0; padding:0; background-color:#f5f5f5; font-family:Segoe UI, Tahoma, Geneva, Verdana, sans-serif;">
    
    <div style="max-width:600px; margin:20px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background:linear-gradient(to right, #36D1DC, #5B86E5); padding:30px; text-align:center;">
        <img src="https://cdn-icons-png.flaticon.com/512/2950/2950654.png"
             style="width:80px; height:80px; border-radius:50%; background:white; padding:10px;" />
        <h1 style="color:white; margin-top:15px;">Welcome to Chatify 🚀</h1>
      </div>

      <!-- Body -->
      <div style="padding:30px; text-align:center;">
        <h2 style="color:#333;">Hello ${name}, 👋</h2>

        <p style="color:#555; font-size:16px;">
          We're excited to have you join our platform!  
          Start chatting with your friends and enjoy real-time messaging.
        </p>

        <!-- Button -->
        <a href="${clientURL}"
           style="display:inline-block; margin-top:20px; padding:12px 25px; background:#5B86E5; color:white; text-decoration:none; border-radius:8px; font-weight:bold;">
           Get Started
        </a>

        <p style="margin-top:30px; font-size:14px; color:#888;">
          If you didn’t create this account, you can safely ignore this email.
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#f0f0f0; padding:15px; text-align:center; font-size:12px; color:#777;">
        © ${new Date().getFullYear()} Messenger App. All rights reserved.
      </div>

    </div>

  </body>
  </html>
  `;
}