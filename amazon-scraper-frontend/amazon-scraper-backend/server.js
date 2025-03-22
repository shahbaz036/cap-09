const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/scrape", async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "Amazon product URL is required" });

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "domcontentloaded" });

        const productData = await page.evaluate(() => {
            const getText = (selector) => document.querySelector(selector)?.innerText.trim() || "N/A";

            // Extracts unique product images properly
            const extractProductImages = () => {
                let images = new Set();
                document.querySelectorAll(".imgTagWrapper img").forEach((img) => {
                    let src = img.src || img.dataset.src;
                    if (src && !src.includes("video")) images.add(src);
                });
                return Array.from(images);
            };

            // Extracts manufacturer images separately
            const extractManufacturerImages = () => {
                let images = new Set();
                document.querySelectorAll(".celwidget .aplus-module img").forEach((img) => {
                    let src = img.src || img.dataset.src;
                    if (src && !src.includes("video")) images.add(src);
                });
                return Array.from(images);
            };

            return {
                productName: getText("#productTitle"),
                rating: getText(".a-icon-alt"),
                numRatings: getText("#acrCustomerReviewText"),
                price: getText(".a-price-whole"),
                discount: getText(".savingsPercentage"),
                bankOffers: Array.from(document.querySelectorAll(".vsx__offers")).map(el => el.innerText),
                aboutThisItem: Array.from(document.querySelectorAll("#feature-bullets ul li")).map(el => el.innerText),
                productInfo: Array.from(document.querySelectorAll("#productOverview_feature_div .a-spacing-small")).map(el => el.innerText),

                // ✅ Correct product and manufacturer images (no duplicates)
                images: extractProductImages(),
                manufacturerImages: extractManufacturerImages(),

                reviews: Array.from(document.querySelectorAll(".review-text-content")).map(el => el.innerText.trim()).slice(0, 5),
            };
        });

        await browser.close();

        // Generate AI Summary from reviews
        let aiReviewSummary = "No reviews found.";
        if (productData.reviews.length > 0) {
            aiReviewSummary = await generateReviewSummary(productData.reviews);
        }

        res.json({ ...productData, aiReviewSummary });
    } catch (error) {
        res.status(500).json({ error: "Failed to scrape product details", details: error.message });
    }
});

// Function to generate AI review summary using Gemini
const generateReviewSummary = async (reviews) => {
    try {
        const model = gemini.getGenerativeModel({ model: "gemini-2.0-flash" });
        const prompt = `Summarize the following customer reviews of a product in a short paragraph:\n\n${reviews.join("\n\n")}`;

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Error generating AI review summary:", error.message);
        return "AI summary not available.";
    }
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
