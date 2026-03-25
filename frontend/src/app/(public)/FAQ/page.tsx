"use client";

import Link from "next/link";
import { 
  Search,
  ChevronDown,
  ChevronUp,
  Heart,

  Shield,
  CreditCard,

  MessageCircle,
  Phone,
  Mail,
  BookOpen,
 

  Star,
  Clock,

  HelpCircle
} from "lucide-react";
import { useState } from "react";

 const FAQPage=() =>{
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<{[key: string]: boolean}>({});
  const [activeCategory, setActiveCategory] = useState("all");

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categories = [
    { id: "all", name: "All Questions", icon: <HelpCircle className="h-5 w-5" />, count: 24 },
    { id: "getting-started", name: "Getting Started", icon: <Star className="h-5 w-5" />, count: 6 },
    { id: "account", name: "Account & Billing", icon: <CreditCard className="h-5 w-5" />, count: 5 },
    { id: "technical", name: "Technical", icon: <Shield className="h-5 w-5" />, count: 4 },
    { id: "therapy", name: "Therapy Services", icon: <Heart className="h-5 w-5" />, count: 6 },
    { id: "privacy", name: "Privacy & Security", icon: <Shield className="h-5 w-5" />, count: 3 }
  ];

  const faqs = [
    {
      id: "getting-started-1",
      category: "getting-started",
      question: "How do I sign up for SageMate?",
      answer: "Signing up is easy! Click the 'Get Started' button on our homepage, enter your email address, create a password, and complete our brief intake questionnaire. This helps us understand your needs and match you with the right therapist.",
      popular: true
    },
    {
      id: "getting-started-2",
      category: "getting-started",
      question: "Is there a free trial?",
      answer: "Yes, we offer a 7-day free trial that includes one therapy session and full access to our resources. No credit card is required to start your trial.",
      popular: true
    },
    {
      id: "getting-started-3",
      category: "getting-started",
      question: "How does the therapist matching work?",
      answer: "Our matching algorithm considers your therapy goals, preferences, schedule availability, and specific concerns. You'll be matched with licensed therapists who specialize in your areas of need. You can always request a new match if needed."
    },
    {
      id: "getting-started-4",
      category: "getting-started",
      question: "What types of therapy do you offer?",
      answer: "We offer various evidence-based approaches including CBT (Cognitive Behavioral Therapy), DBT (Dialectical Behavior Therapy), psychodynamic therapy, mindfulness-based therapy, and more. Your therapist will recommend the best approach for your needs."
    },
    {
      id: "getting-started-5",
      category: "getting-started",
      question: "Do you offer couples or family therapy?",
      answer: "Currently, we focus on individual therapy sessions. However, we're working on expanding our services to include couples and family therapy in the near future."
    },
    {
      id: "getting-started-6",
      category: "getting-started",
      question: "Can I use SageMate outside the US?",
      answer: "We currently serve clients in the United States and Canada. Our therapists are licensed to practice in specific states/provinces, so we'll match you with someone licensed in your location."
    },
    {
      id: "account-1",
      category: "account",
      question: "How much does SageMate cost?",
      answer: "We offer several subscription plans starting at $99/month for weekly sessions. You can also purchase individual sessions. Financial assistance may be available for those who qualify.",
      popular: true
    },
    {
      id: "account-2",
      category: "account",
      question: "Do you accept insurance?",
      answer: "We work with several major insurance providers and can provide superbills for out-of-network reimbursement. Contact our support team to verify your insurance coverage."
    },
    {
      id: "account-3",
      category: "account",
      question: "Can I change or cancel my subscription?",
      answer: "Yes, you can change or cancel your subscription at any time from your account settings. Changes take effect at the start of your next billing cycle."
    },
    {
      id: "account-4",
      category: "account",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), HSA/FSA cards, and Apple Pay/Google Pay."
    },
    {
      id: "account-5",
      category: "account",
      question: "How do I update my payment information?",
      answer: "You can update your payment method in the 'Billing' section of your account settings. Your new payment method will be used for future charges."
    },
    {
      id: "technical-1",
      category: "technical",
      question: "What devices and browsers are supported?",
      answer: "SageMate works on Chrome, Safari, Firefox, and Edge browsers. We also have dedicated iOS and Android apps available in their respective app stores.",
      popular: true
    },
    {
      id: "technical-2",
      category: "technical",
      question: "What should I do if I'm having video call issues?",
      answer: "First, check your internet connection and ensure you've allowed camera/microphone permissions. If issues persist, try refreshing the page or switching to a different browser. Our support team is available 24/7 for technical assistance."
    },
    {
      id: "technical-3",
      category: "technical",
      question: "How do I reset my password?",
      answer: "Click 'Forgot Password' on the login page and enter your email address. We'll send you a secure link to reset your password. The link expires in 2 hours for security."
    },
    {
      id: "technical-4",
      category: "technical",
      question: "Is the mobile app different from the website?",
      answer: "The mobile app offers all the same features as our website, optimized for mobile devices. You can schedule sessions, message your therapist, and access resources on the go."
    },
    {
      id: "therapy-1",
      category: "therapy",
      question: "Are your therapists licensed and qualified?",
      answer: "All SageMate therapists are fully licensed, accredited professionals with advanced degrees in their fields. They undergo rigorous background checks and continuous training to ensure the highest quality care.",
      popular: true
    },
    {
      id: "therapy-2",
      category: "therapy",
      question: "What if I don't connect with my therapist?",
      answer: "The therapeutic relationship is crucial. If you don't feel connected with your therapist, you can request a new match at any time through your account dashboard. There's no extra cost or awkward conversation required."
    },
    {
      id: "therapy-3",
      category: "therapy",
      question: "How often should I have therapy sessions?",
      answer: "Most clients start with weekly sessions, but frequency depends on your individual needs and goals. Your therapist will work with you to determine the optimal schedule."
    },
    {
      id: "therapy-4",
      category: "therapy",
      question: "Can I message my therapist between sessions?",
      answer: "Yes! You can message your therapist securely through our platform between sessions. They typically respond within 24-48 hours for non-urgent matters."
    },
    {
      id: "therapy-5",
      category: "therapy",
      question: "What happens during my first session?",
      answer: "Your first session is an opportunity to get to know your therapist and discuss your goals. They'll ask about your background, current challenges, and what you hope to achieve through therapy."
    },
    {
      id: "therapy-6",
      category: "therapy",
      question: "Is online therapy as effective as in-person therapy?",
      answer: "Research shows that online therapy can be just as effective as in-person therapy for many conditions. The convenience and accessibility often lead to better consistency and engagement."
    },
    {
      id: "privacy-1",
      category: "privacy",
      question: "Is my information confidential and secure?",
      answer: "Absolutely. We use bank-level encryption and are fully HIPAA compliant. Your sessions and personal information are completely confidential and protected. We never share your information without your explicit consent.",
      popular: true
    },
    {
      id: "privacy-2",
      category: "privacy",
      question: "Who can access my therapy notes and sessions?",
      answer: "Only you and your therapist have access to your therapy notes and session content. Even SageMate staff cannot access your clinical information without your permission, except in rare circumstances required by law."
    },
    {
      id: "privacy-3",
      category: "privacy",
      question: "How do you protect my data?",
      answer: "We use end-to-end encryption for all video sessions and messages. Data is stored on secure, HIPAA-compliant servers with regular security audits and monitoring."
    }
  ];

  const filteredFaqs = activeCategory === "all" 
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory);

  const popularFaqs = faqs.filter(faq => faq.popular);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Find answers to common questions about SageMate
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">Categories</h3>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center justify-between text-left px-4 py-3 rounded-lg transition-colors ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`${activeCategory === category.id ? 'text-white' : 'text-gray-400'}`}>
                      {category.icon}
                    </div>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    activeCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}

              {/* Popular Questions */}
              <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-3 flex items-center">
                  <Star className="h-4 w-4 mr-2" />
                  Popular Questions
                </h4>
                <div className="space-y-2">
                  {popularFaqs.slice(0, 3).map((faq) => (
                    <button
                      key={faq.id}
                      onClick={() => {
                        setActiveCategory(faq.category);
                        document.getElementById(faq.id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="block w-full text-left text-sm text-yellow-800 dark:text-yellow-200 hover:text-yellow-900 dark:hover:text-yellow-100 p-2 rounded hover:bg-yellow-100 dark:hover:bg-yellow-800/30 transition-colors"
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Help */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Need More Help?</h4>
                <div className="space-y-2 text-sm">
                  <Link href="/contact" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Support
                  </Link>
                  <Link href="/resources" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Help Resources
                  </Link>
                  <a href="tel:1-800-SAGEMATE" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            {/* Category Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {categories.find(cat => cat.id === activeCategory)?.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {filteredFaqs.length} questions
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>Last updated: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  id={faq.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all hover:shadow-md"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-start space-x-4 flex-1">
                      {faq.popular && (
                        <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white pr-4">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    {openItems[faq.id] ? (
                      <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openItems[faq.id] && (
                    <div className="px-6 pb-6">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No questions found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try searching for something else or browse different categories.
                </p>
                <button
                  onClick={() => setActiveCategory("all")}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  View All Questions
                </button>
              </div>
            )}

            {/* Still Need Help Section */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
              <div className="text-center">
                <HelpCircle className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Still have questions?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                  Our support team is here to help you get the answers you need. 
                  We&apos;re available 24/7 for urgent matters and typically respond within a few hours for other inquiries.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/contact" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Contact Support</span>
                  </Link>
                  <a 
                    href="mailto:support@sagemate.com" 
                    className="border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-600 hover:text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Mail className="h-5 w-5" />
                    <span>Email Us</span>
                  </a>
                </div>
                <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                  <p>Or call us directly: <span className="font-semibold">1-800-SAGEMATE</span></p>
                </div>
              </div>
            </div>

            {/* Emergency Resources */}
            <div className="mt-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <Heart className="h-6 w-6 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">
                    Need Immediate Help?
                  </h4>
                  <p className="text-red-800 dark:text-red-200 mb-4">
                    If you&apos;re in crisis or experiencing thoughts of self-harm, please contact these resources immediately:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white dark:bg-red-800/30 border border-red-200 dark:border-red-700 rounded-lg p-3">
                      <p className="font-semibold text-red-900 dark:text-red-100">National Suicide Prevention Lifeline</p>
                      <p className="text-red-700 dark:text-red-300 font-bold">988</p>
                    </div>
                    <div className="bg-white dark:bg-red-800/30 border border-red-200 dark:border-red-700 rounded-lg p-3">
                      <p className="font-semibold text-red-900 dark:text-red-100">Crisis Text Line</p>
                      <p className="text-red-700 dark:text-red-300 font-bold">Text HOME to 741741</p>
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
export default FAQPage