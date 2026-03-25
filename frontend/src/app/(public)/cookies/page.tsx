"use client";
import Link from "next/link";
import { 
  Shield, 
  Cookie, 
  Settings, 
  Eye, 
 
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useState } from "react";

const CookiePolicyPage=()=> {
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({
    whatAreCookies: true,
    howWeUse: false,
    types: false,
    manage: false,
    changes: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const cookieTypes = [
    {
      name: "Essential Cookies",
      description: "Required for basic site functionality",
      purpose: "Authentication, security, and core features",
      duration: "Session to 1 year",
      necessary: true
    },
    {
      name: "Performance Cookies",
      description: "Help us understand how visitors interact",
      purpose: "Analytics and site performance monitoring",
      duration: "1 hour to 2 years",
      necessary: false
    },
    {
      name: "Functionality Cookies",
      description: "Remember your preferences and choices",
      purpose: "Language, theme, and layout preferences",
      duration: "1 month to 1 year",
      necessary: false
    },
    {
      name: "Targeting Cookies",
      description: "Used for marketing and personalization",
      purpose: "Advertising and content recommendations",
      duration: "3 months to 2 years",
      necessary: false
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Cookie className="h-8 w-8" />
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Understanding how we use cookies to enhance your experience on SageMate
          </p>
          <div className="mt-6 text-blue-200 text-sm">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">On this page</h3>
              <nav className="space-y-1">
                {[
                  { id: 'whatAreCookies', label: 'What Are Cookies?' },
                  { id: 'howWeUse', label: 'How We Use Cookies' },
                  { id: 'types', label: 'Types of Cookies' },
                  { id: 'manage', label: 'Managing Cookies' },
                  { id: 'changes', label: 'Policy Changes' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Quick Actions */}
              <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded transition-colors">
                    <span>Cookie Settings</span>
                    <Settings className="h-4 w-4" />
                  </button>
                  <Link 
                    href="/privacy" 
                    className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded transition-colors"
                  >
                    <span>Privacy Policy</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Introduction */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                At SageMate, we believe in being transparent about how we collect and use data. 
                This Cookie Policy explains what cookies are, how we use them, and how you can manage your preferences.
              </p>
            </div>

            {/* What Are Cookies */}
            <section id="whatAreCookies" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <button
                onClick={() => toggleSection('whatAreCookies')}
                className="w-full flex items-center justify-between text-left"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What Are Cookies?</h2>
                {openSections.whatAreCookies ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              
              {openSections.whatAreCookies && (
                <div className="mt-6 space-y-4 text-gray-600 dark:text-gray-400">
                  <p>
                    Cookies are small text files that are stored on your device when you visit a website. 
                    They help the website remember your actions and preferences over time.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Cookie className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Did You Know?</h4>
                        <p className="text-blue-800 dark:text-blue-200 text-sm">
                          Cookies cannot contain viruses or malware, and they cannot access other information on your computer.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* How We Use Cookies */}
            <section id="howWeUse" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <button
                onClick={() => toggleSection('howWeUse')}
                className="w-full flex items-center justify-between text-left"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How We Use Cookies</h2>
                {openSections.howWeUse ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              
              {openSections.howWeUse && (
                <div className="mt-6 space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    We use cookies to make SageMate work properly and to provide you with the best possible experience. 
                    Specifically, cookies help us:
                  </p>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Keep you signed in securely across different pages</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Remember your preferences and settings</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Understand how you use our platform to make improvements</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Ensure the security and proper functioning of our services</span>
                    </li>
                  </ul>
                </div>
              )}
            </section>

            {/* Types of Cookies */}
            <section id="types" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <button
                onClick={() => toggleSection('types')}
                className="w-full flex items-center justify-between text-left"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Types of Cookies We Use</h2>
                {openSections.types ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              
              {openSections.types && (
                <div className="mt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cookieTypes.map((cookie, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg border ${
                          cookie.necessary 
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                            : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{cookie.name}</h3>
                          {cookie.necessary ? (
                            <div className="flex items-center space-x-1 text-green-600 dark:text-green-400 text-sm">
                              <CheckCircle className="h-4 w-4" />
                              <span>Required</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 text-sm">
                              <Settings className="h-4 w-4" />
                              <span>Optional</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{cookie.description}</p>
                        <div className="space-y-1 text-xs text-gray-500 dark:text-gray-500">
                          <div><strong>Purpose:</strong> {cookie.purpose}</div>
                          <div><strong>Duration:</strong> {cookie.duration}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">Important Note</h4>
                        <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                          Essential cookies cannot be disabled as they are necessary for the basic functionality and security of SageMate. 
                          Disabling them may prevent you from using certain features of our platform.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Managing Cookies */}
            <section id="manage" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <button
                onClick={() => toggleSection('manage')}
                className="w-full flex items-center justify-between text-left"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Managing Your Cookie Preferences</h2>
                {openSections.manage ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              
              {openSections.manage && (
                <div className="mt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Browser Settings */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                        <Settings className="h-5 w-5" />
                        <span>Browser Settings</span>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Most web browsers allow you to control cookies through their settings preferences. 
                        However, limiting cookies may affect your experience on our site.
                      </p>
                      <div className="space-y-2 text-sm">
                        <Link href="https://support.google.com/chrome/answer/95647" className="block text-blue-600 dark:text-blue-400 hover:underline">
                          Google Chrome
                        </Link>
                        <Link href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" className="block text-blue-600 dark:text-blue-400 hover:underline">
                          Mozilla Firefox
                        </Link>
                        <Link href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="block text-blue-600 dark:text-blue-400 hover:underline">
                          Safari
                        </Link>
                        <Link href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="block text-blue-600 dark:text-blue-400 hover:underline">
                          Microsoft Edge
                        </Link>
                      </div>
                    </div>

                    {/* Our Cookie Settings */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                        <Eye className="h-5 w-5" />
                        <span>Cookie Consent Manager</span>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Use our cookie settings tool to customize your preferences for optional cookies.
                      </p>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                        <Settings className="h-4 w-4" />
                        <span>Manage Cookie Preferences</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Third-Party Cookies</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Some cookies are placed by third-party services that appear on our pages. 
                      We have no control over these cookies and you should check the respective privacy policies 
                      of these third parties for more information.
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Policy Changes */}
            <section id="changes" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <button
                onClick={() => toggleSection('changes')}
                className="w-full flex items-center justify-between text-left"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Changes to This Policy</h2>
                {openSections.changes ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              
              {openSections.changes && (
                <div className="mt-6 space-y-4 text-gray-600 dark:text-gray-400">
                  <p>
                    We may update this Cookie Policy from time to time to reflect changes in technology, 
                    legislation, or our operations. We will notify you of any significant changes by 
                    posting a notice on our website or through other communication channels.
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-500">
                    <span>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
              )}
            </section>

            {/* Contact Information */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Questions About Our Cookie Policy?</h3>
                  <p className="text-blue-800 dark:text-blue-200 mb-4">
                    If you have any questions about how we use cookies or your privacy choices, 
                    please don&apos;t hesitate to contact us.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link 
                      href="/contact" 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
                    >
                      Contact Us
                    </Link>
                    <Link 
                      href="/privacy" 
                      className="border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-600 hover:text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
                    >
                      View Privacy Policy
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CookiePolicyPage;