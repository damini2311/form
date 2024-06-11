import React, { useState } from "react";
import "../component/form.css";

const ValidationForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (email.endsWith("@ez.works")) {
      setError("Email ending with @ez.works is not allowed");
      return;
    }

    try {
      const response = await fetch("http://34.225.132.160:8002/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.status === 422) {
        setError(result.message);
      } else if (response.status === 200) {
        setMessage("Form Submitted");
      }
    } catch (err) {
      setError("An error occurred while submitting the form");
    }
  };

  return (
    <div className="container">
      <div className="container-section">
        <div className="info-section">
          <img
            src="data:image/jpeg;base64,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"
            alt="EZ Works"
            className="logo"
          />

          <h1>Suite Of Business Support Services</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt...
          </p>
        </div>
        <form onSubmit={handleFormSubmit} className="form-section">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          {message && <p className="message">{message}</p>}
          <button type="submit">Contact Me</button>
        </form>
      </div>
      <div className="services-section">
        <div className="text-card">Presentation Design</div>
        <div className="text-card">Audio - Visual Production</div>
        <div className="text-card">Translation Services</div>
        <div className="text-card">Graphic Design</div>
        <div className="text-card">Research & Analytics</div>
        <div className="text-card">Data Processing</div>
      </div>
    </div>
  );
};

export default ValidationForm;
