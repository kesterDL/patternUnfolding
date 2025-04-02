import React, { useState } from "react";
import { Helmet } from "react-helmet";
import styles from "./ContactUsPage.module.css";
import Header from "../Header/Header";

function ContactUsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(null);

  const handleSendEmail = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill out all fields.");
      return;
    }

    const requestBody = {
      name: name,
      email: email,
      message: message,
    };

    try {
      const response = await fetch(
        "https://8szksonyuc.execute-api.us-east-1.amazonaws.com/dev/contactus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        setIsSent(true);
        setError(null);
      } else {
        throw new Error("Failed to send email.");
      }
    } catch (err) {
      setError(err.message);
      setIsSent(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Contact Us</title>
        <meta name="description" content="Contact Weave and the Wheel" />
      </Helmet>
      <div className={styles.overlay}>
        <Header />
      </div>
      <div className={styles.contactUsPage}>
        <form className={styles.inputCard} onSubmit={handleSendEmail}>
          <div className={styles.inputForm}>
            <h1>Contact Us</h1>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Message"
                required
              />
            </div>

            <button type="submit" className={styles.sendButton}>
              Send
            </button>
          </div>
        </form>
      </div>

      {isSent && (
        <p className={styles.successMessage}>Your message has been sent!</p>
      )}
      {error && (
        <p className={styles.errorMessage}>Failed to send email: {error}</p>
      )}
    </div>
  );
}

export default ContactUsPage;
