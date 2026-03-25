"use client";

import Link from "next/link";
import { 
  Search,
  MessageCircle,
  Mail,
  Phone,
 
  Users,
  BookOpen,
  Shield,
  Heart,
  ArrowRight,
  ChevronDown,
  ChevronUp,

  Video,
  Download,
  Star,

} from "lucide-react";
import { useState } from "react";

const HelpPage=()=> {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqs, setOpenFaqs] = useState<{[key: string]: boolean}>({});
  const [activeCategory, setActiveCategory] = useState("all");

  const toggleFaq = (id: string) => {
    setOpenFaqs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const supportCategories = [
    {
      id: "getting-started",
      name: "Getting Started",
      icon: <Star className="h-6 w-6" />,
      description: "New to SageMate? Start here",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "account",
      name: "Account & Billing",
      icon: <Users className="h-6 w-6" />,
      description: "Manage your account and payments",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "technical",
      name: "Technical Support",
      icon: <Shield className="h-6 w-6" />,
      description: "App issues and troubleshooting",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "therapy",
      name: "Therapy Services",
      icon: <Heart className="h-6 w-6" />,
      description: "About our therapy sessions",
      color: "from-red-500 to-orange-500"
    }
  ];

  const faqSections = [
    {
      category: "getting-started",
      questions: [
        {
          id: "gs-1",
          question: "How do I create a SageMate account?",
          answer: "You can create an account by clicking the 'Get Started' button on our homepage. You'll need to provide your email address, create a password, and complete a brief intake questionnaire to help us match you with the right therapist."
        },
        {
          id: "gs-2",
          question: "Is there a free trial available?",
          answer: "Yes, we offer a 7-day free trial for new users. During this period, you can explore our platform, complete matching assessments, and have your first therapy session at no cost."
        },
        {
          id: "gs-3",
          question: "How does the therapist matching process work?",
          answer: "Our matching algorithm considers your preferences, therapy goals, schedule availability, and specific concerns. You'll be matched with licensed therapists who specialize in your areas of need."
        }
      ]
    },
    {
      category: "account",
      questions: [
        {
          id: "ac-1",
          question: "How do I update my payment information?",
          answer: "You can update your payment method by going to Settings > Billing in your account dashboard. We accept all major credit cards and some insurance plans."
        },
        {
          id: "ac-2",
          question: "Can I change my subscription plan?",
          answer: "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes will take effect at the start of your next billing cycle."
        },
        {
          id: "ac-3",
          question: "How do I cancel my subscription?",
          answer: "You can cancel your subscription from the Billing section in your account settings. We offer a no-questions-asked cancellation policy."
        }
      ]
    },
    {
      category: "technical",
      questions: [
        {
          id: "tech-1",
          question: "The video call isn't working. What should I do?",
          answer: "First, check your internet connection and browser permissions. Make sure you've allowed camera and microphone access. If issues persist, try using a different browser or our mobile app."
        },
        {
          id: "tech-2",
          question: "How do I reset my password?",
          answer: "Click 'Forgot Password' on the login page, and we'll send you a secure link to reset your password. The link will expire in 2 hours for security reasons."
        },
        {
          id: "tech-3",
          question: "Is SageMate available on mobile devices?",
          answer: "Yes! You can download our iOS and Android apps from the App Store and Google Play Store. All features are available on mobile."
        }
      ]
    },
    {
      category: "therapy",
      questions: [
        {
          id: "th-1",
          question: "Are your therapists licensed and qualified?",
          answer: "All SageMate therapists are fully licensed, accredited, and have undergone rigorous background checks. They hold advanced degrees in their fields and have substantial clinical experience."
        },
        {
          id: "th-2",
          question: "What if I don't connect with my therapist?",
          answer: "We want you to have the best possible experience. If you don't feel connected with your therapist, you can request a new match at any time through your account dashboard."
        },
        {
          id: "th-3",
          question: "Is my information confidential and secure?",
          answer: "Absolutely. We use bank-level encryption and are fully HIPAA compliant. Your sessions and personal information are completely confidential and protected."
        }
      ]
    }
  ];

  const resources = [
    {
      title: "Mental Health Resources",
      description: "Curated articles and guides for mental wellness",
      icon: <BookOpen className="h-8 w-8" />,
      link: "/resources",
      count: "50+ articles"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step guides for using SageMate",
      icon: <Video className="h-8 w-8" />,
      link: "/tutorials",
      count: "15+ videos"
    },
    {
      title: "Downloadable Guides",
      description: "PDF resources for mental health techniques",
      icon: <Download className="h-8 w-8" />,
      link: "/guides",
      count: "25+ guides"
    },
    {
      title: "Community Forum",
      description: "Connect with others on similar journeys",
      icon: <Users className="h-8 w-8" />,
      link: "/community",
      count: "10k+ members"
    }
  ];

  const filteredFaqs = activeCategory === "all" 
    ? faqSections.flatMap(section => section.questions)
    : faqSections.find(section => section.category === activeCategory)?.questions || [];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How can we help you?</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Find answers, get support, and access mental health resources
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for help articles, FAQs, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Support Options */}
      <div className="max-w-6xl mx-auto py-12 px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Live Chat */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Live Chat</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Instant help from our support team
            </p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Start Chat
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Available 24/7 for urgent issues
            </p>
          </div>

          {/* Email Support */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email Support</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Detailed responses within 24 hours
            </p>
            <a 
              href="mailto:support@sagemate.com" 
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Email Us
            </a>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              support@sagemate.com
            </p>
          </div>

          {/* Phone Support */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Phone Support</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Speak directly with our team
            </p>
            <a 
              href="tel:1-800-SAGEMATE" 
              className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Call Now
            </a>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              1-800-SAGEMATE
            </p>
          </div>
        </div>

        {/* Support Categories */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Browse Help Topics
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find answers organized by topic to quickly get the help you need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`text-left p-6 rounded-xl border-2 transition-all ${
                  activeCategory === category.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center text-white mb-4`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {category.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Quick answers to common questions
              </p>
            </div>
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                activeCategory === "all"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-blue-300"
              }`}
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </h3>
                  {openFaqs[faq.id] ? (
                    <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaqs[faq.id] && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Helpful Resources
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our library of mental health resources and guides
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <Link
                key={index}
                href={resource.link}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105 group"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  {resource.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {resource.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {resource.count}
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Crisis Support Banner */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Heart className="h-6 w-6 text-red-600 dark:text-red-400" />
            <h3 className="text-xl font-bold text-red-900 dark:text-red-100">
              Need Immediate Help?
            </h3>
          </div>
          <p className="text-red-800 dark:text-red-200 mb-4 max-w-2xl mx-auto">
            If you&apos;re experiencing a mental health crisis or having thoughts of self-harm, 
            please contact these resources immediately. You are not alone, and help is available.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="bg-white dark:bg-red-800/30 border border-red-200 dark:border-red-700 rounded-lg p-4">
              <p className="font-semibold text-red-900 dark:text-red-100">National Suicide Prevention Lifeline</p>
              <p className="text-red-700 dark:text-red-300 font-bold text-lg">988</p>
              <p className="text-red-600 dark:text-red-400 text-sm">Available 24/7</p>
            </div>
            <div className="bg-white dark:bg-red-800/30 border border-red-200 dark:border-red-700 rounded-lg p-4">
              <p className="font-semibold text-red-900 dark:text-red-100">Crisis Text Line</p>
              <p className="text-red-700 dark:text-red-300 font-bold text-lg">Text HOME to 741741</p>
              <p className="text-red-600 dark:text-red-400 text-sm">Free, 24/7 support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default  HelpPage