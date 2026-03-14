import React from "react";
import SmartCustomizeForm from "../components/SmartCustomizeForm";
import { Link } from "react-router-dom";

const CustomizePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-20 left-1f/4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 mb-6">
            <span className="text-sm font-semibold text-purple-700 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              AI-Powered Resume Customization
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              Smart Resume Customizer
            </span>
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Tailor your resume to any job description in seconds with AI assistance.
            Get the perfect match for your dream job.
          </p>
        </div>

        {/* Main Content */}
        <div className="mb-10">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-8 md:p-12">
              <SmartCustomizeForm />
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              title: "Keyword Optimization",
              description: "Matches your resume with job description keywords",
              icon: "🔑",
              color: "from-blue-500 to-cyan-500"
            },
            {
              title: "ATS Friendly",
              description: "Ensures your resume passes through tracking systems",
              icon: "🛡️",
              color: "from-green-500 to-emerald-500"
            },
            {
              title: "Time Saving",
              description: "Customize in minutes instead of hours",
              icon: "⏱️",
              color: "from-orange-500 to-red-500"
            },
            {
              title: "Better Interviews",
              description: "3x more likely to get interview calls",
              icon: "📞",
              color: "from-purple-500 to-pink-500"
            }
          ].map((benefit, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${benefit.color} text-white mb-4`}>
                <span className="text-2xl">{benefit.icon}</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{benefit.title}</h3>
              <p className="text-slate-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="text-4xl text-purple-400 mb-4">"</div>
              <p className="text-lg text-slate-700 mb-4 italic">
                I landed my dream job at Google after using SmartResume to customize my application.
                The AI suggestions were spot-on and helped me stand out from 500+ applicants.
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mr-4">
                  SA
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Sarah Anderson</div>
                  <div className="text-sm text-slate-600">Senior Software Engineer @ Google</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-3">Ready to transform your resume?</h4>
                <p className="text-slate-600 mb-4 text-sm">
                  Join thousands who've accelerated their career growth with our AI-powered platform.
                </p>
                <Link
                  to="/analyze"
                  className="inline-flex items-center justify-center w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Analyze Your Resume First
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizePage;