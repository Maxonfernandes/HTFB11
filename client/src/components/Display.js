import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [loading, setLoading] = useState(false);

  const getdata = async () => {
    setLoading(true);
    const hash = document.querySelector(".address").value;
    try {
      if (!hash) {
        throw new Error("Please enter a valid IPFS hash");
      }
      
      const response = await fetch(`https://gateway.pinata.cloud/ipfs/${hash}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch file with hash ${hash}`);
      }

      // Extract filename from the URL
      const url = response.url;
      const filename = url.substring(url.lastIndexOf('/') + 1);

      // Download the file
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter IPFS Hash"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Download File
      </button>
      {loading && <div>Loading...</div>}
    </>
  );
};

export default Display;
