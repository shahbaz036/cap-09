# Amazon Product Scraper

This is a web scraper built with **Node.js, Express, and Playwright** to fetch 
Product Name
Rating
Number of Ratings
Selling Price
Total Discount
Bank Offers (all details)
"About this item" section (all information)
"Product Information" section (all technical details)
Amazon Product Images (excluding videos)
"From the Manufacturer" section (all images, excluding videos) 
of an Amazon product. The extracted reviews are then analyzed using **Gemini AI** to generate an AI-generated customer review summary.

## 🚀 Features
- Scrapes Amazon product reviews
- Uses Playwright for browser automation
- Deployed backend on **Render** and frontend on **Vercel**
- AI-generated review summaries with **Gemini AI**

## 📦 Installation

### Prerequisites
- **Node.js** (Ensure you have Node.js installed)
- **Render account** (for backend deployment)
- **Vercel account** (for frontend deployment)

### Setup
1. **Clone the repository**:
   ```sh
   git clone https://github.com/shahbaz036/cap-09.git
   cd cap-09
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Install Playwright Chromium**:
   ```
   npx playwright install chromium
   ```

## 🛠️ Usage

### Run Locally
```
node server.js
```

### API Endpoint
**GET /scrape?url=PRODUCT_URL**
- `PRODUCT_URL`: Amazon product URL

Example:
```
curl "http://localhost:10000/scrape?url=https://www.amazon.com/dp/B09XYZ"
```

## 🚀 Deployment on Render

### 1️⃣ Set **Build Command** in Render Dashboard:
```
npx playwright install chromium
```

### 2️⃣ Set **Start Command**:
```sh
node server.js
```

### 3️⃣ Add Environment Variable:
| Key | Value |
|--------------------|-------|
| `PLAYWRIGHT_BROWSERS_PATH` | `0` |

### 4️⃣ Push Changes & Deploy
```
git add .
git commit -m "Deploy to Render"
git push origin main
```
