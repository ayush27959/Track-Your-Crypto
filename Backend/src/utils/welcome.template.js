export const welcomeTemplate = (userName = "Trader", domain = process.env.DOMAIN || "http://localhost:5173") => {
  const appUrl = domain.replace(/\/$/, "");
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Welcome to Crypto Tracker</title>
</head>
<body style="margin:0; padding:0; background-color:#f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 30px 10px;">
    <tr>
      <td align="center">
        <table width="550" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; border:1px solid #e2e8f0; overflow:hidden; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#4f46e5; padding:24px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:24px; font-weight:700;">🎉 Welcome to Crypto Tracker!</h1>
              <p style="color:#c7d2fe; margin:5px 0 0 0; font-size:13px;">Account Successfully Verified</p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding:30px; color:#334155; line-height:1.6;">
              <h2 style="color:#1e293b; margin-top:0; font-size:20px;">Hey ${userName}, glad to have you! 👋</h2>
              <p style="margin-bottom:20px;">Your email has been successfully verified! You now have full access to your <strong>Crypto Wallet Tracker</strong> account.</p>

              <!-- About Our Web App Features -->
              <h3 style="color:#1e293b; font-size:15px; margin-bottom:10px;">✨ What you can do on our platform:</h3>
              <ul style="padding-left:20px; margin:0 0 25px 0; color:#475569; font-size:14px;">
                <li style="margin-bottom:8px;"><strong>Live Market Ticker:</strong> Check real-time crypto prices & interactive TradingView charts.</li>
                <li style="margin-bottom:8px;"><strong>Portfolio Holdings & PnL:</strong> Track your total Buys, Sells, Holdings, and Profit/Loss instantly.</li>
                <li style="margin-bottom:8px;"><strong>Market News:</strong> Stay ahead with breaking crypto news directly in your dashboard.</li>
                <li style="margin-bottom:8px;"><strong>Export Reports:</strong> Download your trade analytics in CSV format anytime.</li>
              </ul>

              <div style="text-align:center; margin:30px 0;">
                <a href="${appUrl}/login" style="background-color:#4f46e5; color:#ffffff; padding:12px 28px; text-decoration:none; border-radius:6px; font-weight:bold; font-size:14px;">Go to Dashboard</a>
              </div>

              <hr style="border:none; border-top:1px solid #e2e8f0; margin:20px 0;" />

              <!-- Contact & Support -->
              <h3 style="color:#1e293b; font-size:15px; margin-bottom:8px;">📞 Contact & Support Details</h3>
              <p style="margin:4px 0; font-size:13px; color:#475569;">Have questions or feedback? Feel free to reach out to us:</p>
              <p style="margin:4px 0; font-size:13px; color:#475569;"><strong>Email Support:</strong> <a href="mailto:support@cryptotracker.com" style="color:#4f46e5; text-decoration:none;">support@cryptotracker.com</a></p>
              <p style="margin:4px 0; font-size:13px; color:#475569;"><strong>Website:</strong> <a href="${appUrl}" style="color:#4f46e5; text-decoration:none;">cryptotracker.com</a></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc; padding:15px; text-align:center; border-top:1px solid #e2e8f0; font-size:12px; color:#94a3b8;">
              © ${new Date().getFullYear()} Crypto Wallet Tracker. All rights reserved.
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