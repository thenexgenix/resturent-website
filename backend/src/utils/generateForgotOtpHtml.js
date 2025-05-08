function generateForgotOtpHtml(email, name, otp) {
  return `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #fff; color: #333;">
        <table width="100%" style="background: url('https://source.unsplash.com/800x400/?technology,safety') no-repeat center center / cover; padding: 40px 0;">
          <tr>
            <td align="center">
              <div style="background-color: rgba(255, 255, 255, 0.95); max-width: 600px; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                <h1 style="color: tomato; font-size: 28px; margin-bottom: 10px;">Hello, ${name} 👋</h1>
                <p style="font-size: 16px;">We received a request to reset your password. Use the OTP below to proceed:</p>
                <div style="font-size: 32px; font-weight: bold; color: #fff; background-color: tomato; padding: 15px 25px; border-radius: 8px; display: inline-block; margin: 20px 0;">
                  ${otp}
                </div>
                <p style="font-size: 14px; color: #555;">This OTP is valid for the next 10 minutes. Please do not share it with anyone.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                <p style="font-size: 13px; color: #888;">If you didn’t request this, you can safely ignore this email.</p>
                <p style="font-size: 13px; color: #aaa;">Sent to ${email}</p>
              </div>
            </td>
          </tr>
        </table>
      </div>
    `;
}

export default generateForgotOtpHtml;