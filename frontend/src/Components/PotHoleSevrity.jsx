import React, { useState } from "react";
import axios from "axios";

const PotholeSeverity = () => {
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState("");
  const [imgSrc, setImgSrc] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImgSrc(url);

      // Prepare form data for API j
      const formData = new FormData();
      formData.append("image", file);

      try {
        // Send request to your AI server (Flask)
        const res = await axios.post("http://localhost:5002/predict", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setPrediction(res.data.class);
        setConfidence((res.data.confidence * 100).toFixed(2) + "%");
      } catch (error) {
        console.error("Error fetching prediction:", error);
        setPrediction("Error connecting to AI server");
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Pothole Severity Estimation</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imgSrc && <img src={imgSrc} alt="Uploaded pothole" width={300} style={{ margin: "20px 0" }} />}
      {prediction && (
        <p>
          <strong>Predicted Severity:</strong> {prediction} <br />
          <strong>Confidence:</strong> {confidence}
        </p>
      )}
    </div>
  );
};

export default PotholeSeverity;
