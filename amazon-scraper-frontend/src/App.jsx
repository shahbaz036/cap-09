import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    if (!(url.includes("amazon.in") || url.includes("amzn.in"))) {
      setError("Please enter a valid Amazon India product URL.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`https://web-scraper-g6bm.onrender.com/scrape?url=${encodeURIComponent(url)}`);
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch product details.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Amazon Smart TV Scraper</h1>
      <div className="flex">
        <input
          type="text"
          className="p-2 border rounded-l w-80"
          placeholder="Enter Amazon product URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-r" onClick={fetchData}>
          Scrape
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {loading && <p className="mt-2">Loading...</p>}

      {data && (
        <div className="bg-white p-4 mt-4 rounded shadow-md w-full max-w-2xl">
          <h2 className="text-xl font-bold">{data.productName}</h2>
          <p>⭐ {data.rating} ({data.numRatings})</p>
          <p className="text-green-600 font-bold">Price: {data.price}</p>
          <p className="text-red-500">Discount: {data.discount}</p>

          <h3 className="mt-4 font-semibold">Bank Offers:</h3>
          <ul className="list-disc ml-5">
            {data.bankOffers.map((offer, index) => <li key={index}>{offer}</li>)}
          </ul>

          <h3 className="mt-4 font-semibold">About This Item:</h3>
          <ul className="list-disc ml-5">
            {data.aboutThisItem.map((item, index) => <li key={index}>{item}</li>)}
          </ul>

          <h3 className="mt-4 font-semibold">Product Information:</h3>
          <ul className="list-disc ml-5">
            {data.productInfo.map((info, index) => <li key={index}>{info}</li>)}
          </ul>


          <h3 className="mt-4 font-semibold">Product Images:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.images.length > 0 ? (
              data.images.map((img, index) => (
                <img key={index} src={img} alt={`Product-${index}`} className="w-full h-40 object-cover rounded-lg shadow-md" />
              ))
            ) : (
              <p className="text-gray-500">No product images available</p>
            )}
          </div>

          <h3 className="mt-4 font-semibold">Manufacturer Images:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.manufacturerImages.length > 0 ? (
              data.manufacturerImages.map((img, index) => (
                <img key={index} src={img} alt={`Manufacturer-${index}`} className="w-full h-40 object-cover rounded-lg shadow-md" />
              ))
            ) : (
              <p className="text-gray-500">No manufacturer images available</p>
            )}
          </div>

          <h3 className="mt-4 font-semibold">AI Review Summary:</h3>
          <p className="bg-gray-200 p-2 rounded">{data.aiReviewSummary}</p>
        </div>
      )}
    </div>
  );
}

export default App;
