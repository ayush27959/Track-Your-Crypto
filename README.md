# � Crypto Wallet Tracker

Crypto Wallet Tracker is a modern crypto portfolio dashboard built with **React**, **Vite**, **Node.js**, and **MongoDB**. It helps users manage wallet holdings, track buy/sell transactions, view live market data, and monitor portfolio profit/loss in real time.

---

## ✨ Features

- **📊 Portfolio Dashboard:** Summary of holdings, cash balance, total investment, and performance metrics.
- **💼 Holdings Tracking:** Display current holdings, average buy price, current price, unrealized P&L, and allocation.
- **🔁 Transaction Management:** Add and manage buy/sell transactions with auto-updated net holdings.
- **🛡️ Authentication:** JWT-based login and secure session handling.
- **📩 Email Workflow:** Signup OTP and welcome email verification flow.
- **📈 Live Market Data:** Fetches current crypto prices from CoinGecko for live valuation.
- **📁 Export Reports:** Export transaction or portfolio data as CSV.

---

## 🛠️ Tech Stack

- **Frontend:** React 19 + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas
- **Authentication:** JWT + Cookies
- **Email:** Nodemailer + Gmail SMTP
- **Styling:** Tailwind CSS + Ant Design

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js 18+ installed
- npm installed
- MongoDB Atlas or local MongoDB connection
- Gmail app password configured for email sending

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ayush27959/CryptoTracker.git
   cd Crypto-Wallet-Tracker
   ```

2. **Install backend dependencies:**
   ```bash
   cd Backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set environment variables:**
   - Backend: create `Backend/.env` with MongoDB URL, JWT secrets, email credentials, and domain
   - Frontend: create `frontend/.env` with `VITE_BASE_URL=http://localhost:3030`

5. **Run backend:**
   ```bash
   cd Backend
   npm run dev
   ```

6. **Run frontend:**
   ```bash
   cd ../frontend
   npm run dev
   ```

---

## 📁 Repository Structure

- `Backend/` - Express API, auth, user, transaction, and dashboard routes
- `frontend/` - React UI, pages, components, and API client
- `.gitignore` - ignores node_modules, env files, and logs

---

## ✅ Notes

- Ensure `.env` files are not pushed to GitHub.
- Use a Gmail app password for SMTP login if Gmail blocks standard credentials.
