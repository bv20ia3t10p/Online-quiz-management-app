import React from "react";
import emailjs from "emailjs-com";

const Email = ({ name, email, setIsSendingEmail }) => {
  function sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_9ntzezu",
        "template_82ris8b",
        e.target,
        "AqzntCQjIGpWk0TlP"
      )
      .then(
        (result) => {
          window.location.reload();
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
  return (
    <form className="contact-form" onSubmit={sendEmail}>
      <input type="hidden" name="contact_number" />
      <label>Name</label>
      <input type="text" name="from_name" value={name} />
      <label>Email address (for further contanct)</label>
      <input type="email" name="from_email" value={email} />
      <label>Message</label>
      <textarea name="html_message" />
      <div className="btns">
        <button className="cancel" onClick={() => setIsSendingEmail(false)}>
          Cancel
        </button>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default Email;
