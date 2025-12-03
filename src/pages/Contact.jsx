import React from "react";
import FeedbackForm from "../components/common/FeedbackForm";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f0f4ff] to-[#e0e7ff] flex items-center justify-center px-4 py-12">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 max-w-6xl w-full p-10 flex flex-col md:flex-row items-center gap-16">
        {/* Left Section */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-indigo-800 mb-6 leading-tight">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            We'd love to hear from you! Whether you have a question about
            features, trials, pricing, or anything else — our team is ready to
            answer all your questions.
          </p>
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-indigo-600 text-xl">📧</span>
              <p className="text-gray-700">jainsrishty309@gmail.com</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-indigo-600 text-xl">📞</span>
              <p className="text-gray-700">+91 8439707968</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Send us a Message
            </h2>
            <FeedbackForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
