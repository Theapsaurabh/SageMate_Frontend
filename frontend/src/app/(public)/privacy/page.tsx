"use client";

import Link from "next/link";
import { 
  Shield,
  Lock,
  Eye,
  User,
  FileText,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Download,
  Globe,
  Server,
  Key
} from "lucide-react";
import { useState } from "react";

const PrivacyPolicyPage=()=> {
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({
    introduction: true,
    informationWeCollect: false,
    howWeUse: false,
    dataSharing: false,
    dataSecurity: false,
    yourRights: false,
    cookies: false,
    childrenPrivacy: false,
    changes: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const dataCategories = [
    {
      category: "Personal Information",
      items: ["Name", "Email address", "Phone number", "Date of birth", "Emergency contact"],
      purpose: "Account creation and identification"
    },
    {
      category: "Health Information",
      items: ["Medical history", "Therapy notes", "Treatment goals", "Session records", "Medication information"],
      purpose: "Providing mental health services"
    },
    {
      category: "Technical Information",
      items: ["IP address", "Device information", "Browser type", "Usage analytics", "Cookie data"],
      purpose: "Service improvement and security"
    },
    {
      category: "Payment Information",
      items: ["Billing address", "Payment method", "Insurance details", "Transaction history"],
      purpose: "Processing payments and insurance"
    }
  ];

  const yourRights = [
    {
      right: "Access Your Data",
      description: "Request a copy of your personal information",
      icon: <Eye className="h-5 w-5" />
    },
    {
      right: "Correct Information",
      description: "Update or correct inaccurate data",
      icon: <CheckCircle className="h-5 w-5" />
    },
    {
      right: "Data Deletion",
      description: "Request deletion of your personal data",
      icon: <User className="h-5 w-5" />
    },
    {
      right: "Export Data",
      description: "Receive your data in a portable format",
      icon: <Download className="h-5 w-5" />
    },
    {
      right: "Restrict Processing",
      description: "Limit how we use your data",
      icon: <Lock className="h-5 w-5" />
    },
    {
      right: "Object to Processing",
      description: "Opt-out of certain data uses",
      icon: <AlertTriangle className="h-5 w-5" />
    }
  ];

  const securityMeasures = [
    {
      measure: "End-to-End Encryption",
      description: "All data is encrypted in transit and at rest",
      icon: <Lock className="h-5 w-5" />
    },
    {
      measure: "HIPAA Compliance",
      description: "Fully compliant with healthcare privacy regulations",
      icon: <Shield className="h-5 w-5" />
    },
    {
      measure: "Regular Audits",
      description: "Third-party security assessments and penetration testing",
      icon: <CheckCircle className="h-5 w-5" />
    },
    {
      measure: "Access Controls",
      description: "Strict role-based access to sensitive data",
      icon: <Key className="h-5 w-5" />
    },
    {
      measure: "Data Backup",
      description: "Secure, encrypted backups and disaster recovery",
      icon: <Server className="h-5 w-5" />
    },
    {
      measure: "Employee Training",
      description: "Regular privacy and security training for all staff",
      icon: <User className="h-5 w-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="h-8 w-8" />
            <Lock className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Protecting your privacy and maintaining the confidentiality of your mental health information
          </p>
          <div className="mt-6 text-blue-200 text-sm">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">Sections</h3>
              <nav className="space-y-1">
                {[
                  { id: 'introduction', label: 'Introduction' },
                  { id: 'informationWeCollect', label: 'Information We Collect' },
                  { id: 'howWeUse', label: 'How We Use Information' },
                  { id: 'dataSharing', label: 'Data Sharing' },
                  { id: 'dataSecurity', label: 'Data Security' },
                  { id: 'yourRights', label: 'Your Rights' },
                  { id: 'cookies', label: 'Cookies & Tracking' },
                  { id: 'childrenPrivacy', label: "Children's Privacy" },
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
                  <Link 
                    href="/cookies" 
                    className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded transition-colors"
                  >
                    <span>Cookie Policy</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link 
                    href="/contact" 
                    className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded transition-colors"
                  >
                    <span>Contact DPO</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button className="w-full flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded transition-colors">
                    <span>Download Policy</span>
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Privacy Badge */}
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="font-semibold text-green-900 dark:text-green-100 text-sm">HIPAA Compliant</span>
                </div>
                <p className="text-green-800 dark:text-green-200 text-xs">
                  Fully compliant with healthcare privacy and security regulations
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Introduction */}
            <section id="introduction" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <button
                onClick={() => toggleSection('introduction')}
                className="w-full flex items-center justify-between text-left"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Introduction</h2>
                {openSections.introduction ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              
              {openSections.introduction && (
                <div className="mt-6 space-y-4 text-gray-600 dark:text-gray-400">
                  <p>
                    At SageMate, we understand that privacy and confidentiality are fundamental to the therapeutic relationship. 
                    We are committed to protecting your personal information and maintaining the highest standards of data security.
                  </p>
                  <p>
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                    mental health platform. Please read this policy carefully to understand our practices regarding your personal data.
                  </p>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">HIPAA Compliance</h4>
                        <p className="text-blue-800 dark:text-blue-200 text-sm">
                          SageMate is fully compliant with the Health Insurance Portability and Accountability Act (HIPAA) 
                          and other applicable healthcare privacy regulations. Your mental health information receives the 
                          highest level of protection.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Information We Collect */}
            <section id="informationWeCollect" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <button
                onClick={() => toggleSection('informationWeCollect')}
                className="w-full flex items-center justify-between text-left"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Information We Collect</h2>
                {openSections.informationWeCollect ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              
              {openSections.informationWeCollect && (
                <div className="mt-6 space-y-6">
                  <p className="text-gray-600 dark:text-gray-400">
                    We collect several types of information to provide and improve our mental health services:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dataCategories.map((category, index) => (
                      <div 
                        key={index}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                      >
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{category.category}</h4>
                        <ul className="space-y-1 mb-3">
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="text-xs text-gray-500 dark:text-gray-500 bg-gray-50 dark:bg-gray-800/50 p-2 rounded">
                          <strong>Purpose:</strong> {category.purpose}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">Sensitive Health Information</h4>
                        <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                          Your mental health information is treated with the utmost confidentiality and is only accessible 
                          to authorized healthcare providers involved in your care. We implement additional security measures 
                          to protect this sensitive data.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* How We Use Information */}
            <section id="howWeUse" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <button
                onClick={() => toggleSection('howWeUse')}
                className="w-full flex items-center justify-between text-left"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How We Use Your Information</h2>
                {openSections.howWeUse ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              
              {openSections.howWeUse && (
                <div className="mt-6 space-y-4 text-gray-600 dark:text-gray-400">
                  <p>We use your information for the following purposes:</p>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Providing Mental Health Services</strong>
                        <p className="text-sm mt-1">To connect you with therapists, facilitate sessions, and maintain treatment records</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Personalizing Your Experience</strong>
                        <p className="text-sm mt-1">To tailor therapy approaches and recommend relevant resources</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Processing Payments</strong>
                        <p className="text-sm mt-1">To handle billing, insurance claims, and payment processing</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Improving Our Services</strong>
                        <p className="text-sm mt-1">To analyze usage patterns and enhance platform functionality</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Ensuring Security</strong>
                        <p className="text-sm mt-1">To protect against fraud, abuse, and security threats</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Legal Compliance</strong>
                        <p className="text-sm mt-1">To meet regulatory requirements and respond to legal requests</p>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </section>

            {/* Data Sharing */}
            <section id="dataSharing" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <button
                onClick={() => toggleSection('dataSharing')}
                className="w-full flex items-center justify-between text-left"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Sharing and Disclosure</h2>
                {openSections.dataSharing ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              
              {openSections.dataSharing && (
                <div className="mt-6 space-y-6 text-gray-600 dark:text-gray-400">
                  <p>
                    We do not sell your personal information. We may share your information only in the following circumstances:
                  </p>

                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white">With Your Consent</h4>
                      <p className="text-sm mt-1">When you explicitly authorize us to share information with specific parties</p>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white">Healthcare Providers</h4>
                      <p className="text-sm mt-1">With therapists and mental health professionals involved in your treatment</p>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white">Service Providers</h4>
                      <p className="text-sm mt-1">With vendors who help us operate our platform (under strict confidentiality agreements)</p>
                    </div>
                    
                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white">Legal Requirements</h4>
                      <p className="text-sm mt-1">When required by law or to protect against legal liability</p>
                    </div>
                    
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white">Safety Emergencies</h4>
                      <p className="text-sm mt-1">When necessary to prevent serious harm to you or others</p>
                    </div>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-red-900 dark:text-red-100 mb-1">Mandatory Reporting</h4>
                        <p className="text-red-800 dark:text-red-200 text-sm">
                          Therapists are legally required to report certain situations, such as suspected child abuse, 
                          elder abuse, or threats of harm to self or others. These reporting obligations override confidentiality.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Data Security */}
            <section id="dataSecurity" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <button
                onClick={() => toggleSection('dataSecurity')}
                className="w-full flex items-center justify-between text-left"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Security</h2>
                {openSections.dataSecurity ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              
              {openSections.dataSecurity && (
                <div className="mt-6 space-y-6">
                  <p className="text-gray-600 dark:text-gray-400">
                    We implement comprehensive security measures to protect your personal and health information:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {securityMeasures.map((measure, index) => (
                      <div 
                        key={index}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center"
                      >
                        <div className="text-blue-600 dark:text-blue-400 mb-3 flex justify-center">
                          {measure.icon}
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                          {measure.measure}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-xs">
                          {measure.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">HIPAA Compliance</h4>
                        <p className="text-green-800 dark:text-green-200 text-sm">
                          Our security practices exceed HIPAA requirements for protected health information (PHI). 
                          We conduct regular risk assessments, maintain audit logs, and ensure all business associates 
                          are fully compliant with healthcare privacy standards.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Your Rights */}
            <section id="yourRights" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <button
                onClick={() => toggleSection('yourRights')}
                className="w-full flex items-center justify-between text-left"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Privacy Rights</h2>
                {openSections.yourRights ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              
              {openSections.yourRights && (
                <div className="mt-6 space-y-6">
                  <p className="text-gray-600 dark:text-gray-400">
                    You have the following rights regarding your personal information:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {yourRights.map((right, index) => (
                      <div 
                        key={index}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="text-blue-600 dark:text-blue-400 mb-3">
                          {right.icon}
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                          {right.right}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-xs">
                          {right.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Exercising Your Rights</h4>
                        <p className="text-blue-800 dark:text-blue-200 text-sm">
                          To exercise any of these rights, please contact our Data Protection Officer at{' '}
                          <a href="mailto:privacy@sagemate.com" className="underline">privacy@sagemate.com</a>. 
                          We will respond to your request within 30 days.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Cookies */}
            <section id="cookies" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <button
                onClick={() => toggleSection('cookies')}
                className="w-full flex items-center justify-between text-left"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cookies and Tracking</h2>
                {openSections.cookies ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              
              {openSections.cookies && (
                <div className="mt-6 space-y-4 text-gray-600 dark:text-gray-400">
                  <p>
                    We use cookies and similar tracking technologies to enhance your experience on our platform. 
                    For detailed information about the cookies we use and how to manage your preferences, please 
                    see our comprehensive Cookie Policy.
                  </p>
                  
                  <Link 
                    href="/cookies" 
                    className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    <span>View Cookie Policy</span>
                  </Link>
                </div>
              )}
            </section>

            {/* Children's Privacy */}
            <section id="childrenPrivacy" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <button
                onClick={() => toggleSection('childrenPrivacy')}
                className="w-full flex items-center justify-between text-left"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Children&apos;s Privacy</h2>
                {openSections.childrenPrivacy ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              
              {openSections.childrenPrivacy && (
                <div className="mt-6 space-y-4 text-gray-600 dark:text-gray-400">
                  <p>
                    Our services are not directed to individuals under the age of 13. We do not knowingly collect 
                    personal information from children under 13. If you are a parent or guardian and believe your 
                    child has provided us with personal information, please contact us immediately.
                  </p>
                  
                  <p>
                    For minors aged 13-17, we require parental consent before providing mental health services. 
                    Parents or guardians have the right to review, update, or delete their child&apos;s personal information.
                  </p>
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
                    We may update this Privacy Policy from time to time to reflect changes in our practices, 
                    technology, legal requirements, or other factors. We will notify you of any material changes 
                    by posting the updated policy on our website and, if appropriate, through other communication channels.
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
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Questions About Our Privacy Policy?</h3>
                  <p className="text-blue-800 dark:text-blue-200 mb-4">
                    If you have any questions about this Privacy Policy or how we handle your personal information, 
                    please contact our Data Protection Officer.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Data Protection Officer</h4>
                      <a href="mailto:privacy@sagemate.com" className="text-blue-600 dark:text-blue-400 hover:underline block">
                        privacy@sagemate.com
                      </a>
                      <a href="tel:1-800-SAGEMATE" className="text-blue-600 dark:text-blue-400 hover:underline block">
                        1-800-SAGEMATE
                      </a>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Mailing Address</h4>
                      <p className="text-blue-800 dark:text-blue-200 text-sm">
                        SageMate Privacy Office<br />
                        123 Wellness Street<br />
                        San Francisco, CA 94105<br />
                        United States
                      </p>
                    </div>
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
export default PrivacyPolicyPage;