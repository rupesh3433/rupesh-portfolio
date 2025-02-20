import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";

export default function Contact({ setActiveSession }) {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    // Update these with your exact EmailJS details from your dashboard.
    const serviceID = "service_qdjs8zo"; // Your EmailJS Service ID
    const templateID = "template_q8cez0t"; // Your EmailJS Template ID
    const userID = "Mm6yZ4pSYhOLL9JJz"; // Your EmailJS Public Key

    emailjs.sendForm(serviceID, templateID, form.current, userID).then(
      (result) => {
        console.log(result.text);
        setStatus("Message sent successfully!");
        setIsSuccess(true);
        // Clear success message after 1 second
        setTimeout(() => {
          setStatus("");
          setIsSuccess(null);
        }, 1000);
        e.target.reset();
      },
      (error) => {
        console.error(error.text);
        setStatus("Failed to send message. Please try again.");
        setIsSuccess(false);
      }
    );
  };

  return (
    <>
      {status && isSuccess === true && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-[300px] px-4 animate-fadeIn">
          <div className="bg-green-500 text-white text-sm md:text-base rounded-lg p-3 text-center shadow-lg">
            {status}
          </div>
        </div>
      )}

      <div className="h-auto lg:h-[90vh] bg-black flex items-center justify-center p-2 lg:overflow-hidden overflow-y-auto">
        <div className="w-full mx-5 mt-5 flex flex-col lg:flex-row gap-6 lg:gap-10 items-center lg:items-stretch">
          {/* Contact Form */}
          <div className="bg-gray-900 p-4 md:p-6 rounded-xl border-2 border-gray-700 w-full sm:w-[95%] md:w-[70%] lg:w-3/4 lg:h-[80vh] max-w-140 mx-auto animate-slideInLeft opacity-0">
            <h2 className="text-2xl lg:text-3xl font-bold mb-5 text-white border-l-4 border-blue-500 pl-4">
              Contact Form
            </h2>
            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <div
                className="animate-fadeIn"
                style={{ animationDelay: "0.1s" }}
              >
                <label className="block text-sm lg:text-base font-medium text-gray-100 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="from_name"
                  className="w-full px-4 py-3 text-sm lg:text-base bg-gray-800 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-gray-400 transition-all"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div
                className="animate-fadeIn"
                style={{ animationDelay: "0.5s" }}
              >
                <label className="block text-sm lg:text-base font-medium text-gray-100 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="from_email"
                  className="w-full px-4 py-3 text-sm lg:text-base bg-gray-800 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-gray-400 transition-all"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div
                className="animate-fadeIn"
                style={{ animationDelay: "0.7s" }}
              >
                <label className="block text-sm lg:text-base font-medium text-gray-100 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  className="w-full px-3 py-1 text-sm lg:text-base bg-gray-800 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-gray-400 resize-none transition-all"
                  placeholder="Write your message..."
                  rows="6"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-sm lg:text-base text-white font-medium rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 animate-fadeIn"
                style={{ animationDelay: "0.9s" }}
              >
                Send Message
              </button>
            </form>

            {/* Error Message */}
            {status && isSuccess === false && (
              <p className="mt-4 text-center text-sm font-bold text-red-500">
                {status}
              </p>
            )}
          </div>

          {/* Map Container */}
          <div className="w-full max-w-4xl h-[60vh] lg:h-[80vh] rounded-xl overflow-hidden border-2 border-gray-700 bg-gray-900">
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.584860496257!2d-122.4013646846825!3d37.793616979756886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064da3a4f6d%3A0xd1e1b05a354d56d!2sSalesforce%20Tower!5e0!3m2!1sen!2sus!4v1601621844567!5m2!1sen!2sus"
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </>
  );
}
