// import { generateOTP } from "./generate.otp.js";

export const otpTemplate = (otp) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your CryptoTracker OTP Code</title>
</head>
<body style="margin:0; padding:0; background-color:#f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding:40px 0;">
    <tr>
      <td align="center">
        <table width="440" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:16px; box-shadow:0 10px 25px rgba(0,0,0,0.06); overflow:hidden; border:1px solid #e2e8f0;">
          <!-- Header -->
          <tr>
            <td align="center" style="background:linear-gradient(135deg, #059669 0%, #10b981 100%); color:#ffffff; padding:25px 0;">
              <h2 style="margin:0; font-size:24px; font-weight:800; tracking-tight;">🔐 Crypto<span style="color:#a7f3d0;">Tracker</span></h2>
              <p style="margin:5px 0 0 0; font-size:13px; opacity:0.9;">Secure Identity Verification</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 28px; text-align:center; color:#334155;">
              <h3 style="margin-top:0; margin-bottom:12px; font-size:18px; color:#0f172a;">Verify Your Account</h3>
              <p style="font-size:14px; color:#64748b; line-height:1.5; margin-bottom:24px;">
                Use the One-Time Password (OTP) below to authenticate your action. This code is valid for <strong>5 minutes</strong>.
              </p>

              <!-- OTP Box -->
              <div style="background:#f0fdf4; border:2px dashed #34d399; border-radius:12px; padding:16px; display:inline-block; margin:10px 0 24px 0;">
                <span style="font-size:36px; letter-spacing:10px; color:#059669; font-weight:800; font-family: monospace;">
                  ${otp}
                </span>
              </div>

              <p style="font-size:13px; color:#94a3b8; margin-bottom:16px;">
                Please do not share this security code with anyone.
              </p>
              
              <div style="background:#f8fafc; border-radius:8px; padding:10px; font-size:12px; color:#64748b;">
                Sent by <strong>Ayush Kumar</strong> • CryptoTracker Authentication System
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background:#f1f5f9; padding:18px; font-size:12px; color:#64748b; border-top:1px solid #e2e8f0;">
              © 2026 CryptoTracker App. All rights reserved.<br/>
              Need assistance? <a href="mailto:ayushkumar27959@gmail.com" style="color:#059669; text-decoration:none; font-weight:600;">Contact Support</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};