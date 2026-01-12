import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact({ setActiveSession }) {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    const serviceID = "service_qdjs8zo";
    const templateID = "template_q8cez0t";
    const publicKey = "Mm6yZ4pSYhOLL9JJz"; // EmailJS Public Key

    emailjs
      .sendForm(serviceID, templateID, form.current, {
        publicKey,
      })
      .then(
        () => {
          setStatus("Message sent successfully!");
          setIsSuccess(true);

          setTimeout(() => {
            setStatus("");
            setIsSuccess(null);
          }, 1000);

          e.target.reset();
        },
        () => {
          setStatus("Failed to send message. Please try again.");
          setIsSuccess(false);
        }
      );
  };

  return (
    <>
      {status && isSuccess === true && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-[300px] px-4 animate-fadeIn">
          <div className="bg-green-500 text-white rounded-lg p-3 text-center shadow-lg">
            {status}
          </div>
        </div>
      )}

      <div className="h-auto lg:h-[90vh] bg-black flex items-center justify-center p-2">
        <div className="w-full mx-5 mt-5 flex flex-col lg:flex-row gap-10">
          {/* Contact Form */}
          <div className="bg-gray-900 p-6 rounded-xl border-2 border-gray-700 w-full lg:w-3/4">
            <h2 className="text-3xl font-bold mb-5 text-white border-l-4 border-blue-500 pl-4">
              Contact Form
            </h2>

            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <input
                type="text"
                name="from_name"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg"
              />

              <input
                type="email"
                name="from_email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg"
              />

              <textarea
                name="message"
                rows="6"
                placeholder="Your Message"
                required
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg resize-none"
              />

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Send Message
              </button>
            </form>

            {status && isSuccess === false && (
              <p className="mt-4 text-center text-red-500 font-bold">
                {status}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
