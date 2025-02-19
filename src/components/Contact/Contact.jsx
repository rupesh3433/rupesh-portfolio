import React from "react";

export default function Contact() {
  return (
    <div className="h-[90vh] bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-gray-900 p-4 rounded-lg shadow-lg animate-fadeIn">
          <h2 className="text-3xl font-bold mb-6">Contact Me</h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Embedded Real-Time Map */}
        <div className="animate-fadeIn delay-200">
          <h2 className="text-3xl font-bold mb-3">Find Me Here</h2>
          <div className="w-full h-[75vh] rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Real-Time Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.584860496257!2d-122.4013646846825!3d37.793616979756886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064da3a4f6d%3A0xd1e1b05a354d56d!2sSalesforce%20Tower!5e0!3m2!1sen!2sus!4v1601621844567!5m2!1sen!2sus"
              className="w-full h-80 md:h-full min-h-[300px] border-0"
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}