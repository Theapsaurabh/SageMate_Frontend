// app/support/page.tsx
"use client";

import { Container } from "@/components/ui/container";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Users,
  FileText,
  HelpCircle,
  Search,
  ChevronRight,
  Heart,
  Shield,
  Zap,
  BookOpen,
  Video,
  Calendar,
  Star,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  HeadphonesIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const supportCategories = [
  {
    icon: MessageCircle,
    title: "Live Chat Support",
    description: "Get instant help from our support team",
    responseTime: "2-5 minutes",
    availability: "24/7",
    color: "from-blue-500 to-cyan-500",
    action: "Start Chat",
    href: "/support/chat",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Talk directly with a mental health specialist",
    responseTime: "Immediate",
    availability: "8 AM - 10 PM EST",
    color: "from-green-500 to-emerald-500",
    action: "Call Now",
    href: "tel:+1-800-HELP-NOW",
  },
  {
    icon: Video,
    title: "Video Session",
    description: "Face-to-face support with certified professionals",
    responseTime: "Schedule appointment",
    availability: "Based on availability",
    color: "from-purple-500 to-pink-500",
    action: "Book Session",
    href: "/support/video",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Detailed assistance via email",
    responseTime: "4-12 hours",
    availability: "24/7",
    color: "from-amber-500 to-orange-500",
    action: "Send Email",
    href: "mailto:support@sagemate.com",
  },
];

const faqCategories = [
  {
    title: "Account & Billing",
    icon: Users,
    questions: [
      {
        question: "How do I reset my password?",
        answer: "You can reset your password by clicking 'Forgot Password' on the login page. We'll send a reset link to your registered email address.",
      },
      {
        question: "How do I update my payment method?",
        answer: "Go to your account settings, then navigate to the 'Billing' section where you can update your payment information.",
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period.",
      },
    ],
  },
  {
    title: "Technical Issues",
    icon: Zap,
    questions: [
      {
        question: "The app is running slow, what should I do?",
        answer: "Try clearing your browser cache, ensure you have a stable internet connection, or try using our mobile app for better performance.",
      },
      {
        question: "How do I enable notifications?",
        answer: "Go to Settings > Notifications and enable the types of notifications you'd like to receive. Make sure your browser allows notifications for our site.",
      },
      {
        question: "Is my data secure and private?",
        answer: "Yes, we use end-to-end encryption and comply with HIPAA regulations to ensure your mental health data remains completely confidential.",
      },
    ],
  },
  {
    title: "Therapy & Courses",
    icon: BookOpen,
    questions: [
      {
        question: "How do I schedule a therapy session?",
        answer: "Navigate to the 'My Therapist' section, select your preferred therapist, and choose an available time slot that works for you.",
      },
      {
        question: "Can I change my assigned therapist?",
        answer: "Yes, you can request a therapist change by contacting our support team. We'll help match you with a professional who better suits your needs.",
      },
      {
        question: "Do courses have expiration dates?",
        answer: "No, once you purchase a course, you have lifetime access to the content and any future updates.",
      },
    ],
  },
  {
    title: "Crisis Support",
    icon: Heart,
    questions: [
      {
        question: "What if I need immediate crisis support?",
        answer: "For immediate crisis support, please call the National Suicide Prevention Lifeline at 988 or text HOME to 741741. We're here for non-emergency support.",
      },
      {
        question: "Is this service suitable for emergencies?",
        answer: "While we provide mental health support, we are not an emergency service. For life-threatening situations, please call 911 or your local emergency number.",
      },
      {
        question: "How quickly can I get help in a crisis?",
        answer: "Our crisis chat support is available 24/7 with response times under 5 minutes for urgent mental health concerns.",
      },
    ],
  },
];

const emergencyContacts = [
  {
    name: "National Suicide Prevention Lifeline",
    number: "988",
    description: "24/7 free and confidential support",
    type: "crisis",
  },
  {
    name: "Crisis Text Line",
    number: "Text HOME to 741741",
    description: "Free 24/7 crisis support via text",
    type: "crisis",
  },
  {
    name: "SAMHSA National Helpline",
    number: "1-800-662-HELP (4357)",
    description: "Treatment referral and information service",
    type: "support",
  },
  {
    name: "The Trevor Project",
    number: "1-866-488-7386",
    description: "Crisis intervention for LGBTQ youth",
    type: "specialized",
  },
];

const resources = [
  {
    title: "Help Center Articles",
    description: "Comprehensive guides and tutorials",
    icon: FileText,
    count: "150+ articles",
    href: "/support/articles",
  },
  {
    title: "Community Forum",
    description: "Connect with other users for peer support",
    icon: Users,
    count: "10K+ members",
    href: "/community",
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step video guides",
    icon: Video,
    count: "50+ videos",
    href: "/support/tutorials",
  },
  {
    title: "Therapy Resources",
    description: "Worksheets and therapeutic tools",
    icon: BookOpen,
    count: "25+ resources",
    href: "/resources",
  },
];

export default function SupportPage() {
  const router = useRouter();
  const [activeFaqCategory, setActiveFaqCategory] = useState(0);
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    urgency: "normal",
  });

  const toggleFaq = (index: number) => {
    setExpandedFaqs(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Contact form submitted:", contactForm);
    // Reset form
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
      urgency: "normal",
    });
    // Show success message
    alert("Thank you for your message! We'll get back to you soon.");
  };

  const filteredFaqs = faqCategories.flatMap(category =>
    category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20">
      <Container className="pt-20 pb-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            <HeadphonesIcon className="w-3 h-3 mr-1" />
            We&apos;re Here to Help
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Support Center
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Get the help you need with our comprehensive support resources, live assistance, and mental health professionals.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">2 min</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Response</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">98%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Experts</div>
            </div>
          </div>
        </motion.div>

        {/* Emergency Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="border-2 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
                    Need Immediate Crisis Support?
                  </h3>
                  <p className="text-red-700 dark:text-red-300 text-sm">
                    If you&apos;re experiencing a mental health emergency, please contact these resources immediately:
                  </p>
                  <div className="flex flex-wrap gap-4 mt-3">
                    {emergencyContacts.slice(0, 2).map((contact, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-white dark:bg-red-800 text-red-700 dark:text-red-300">
                          {contact.number}
                        </Badge>
                        <span className="text-sm text-red-600 dark:text-red-400">{contact.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Support Options Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Get Help Now
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Choose the support option that works best for you
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 h-full">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center shadow-lg mb-4`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      {category.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>Response: {category.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Zap className="w-4 h-4" />
                      <span>Available: {category.availability}</span>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button
                      onClick={() => {
                        if (category.href.startsWith('http') || category.href.startsWith('tel') || category.href.startsWith('mailto')) {
                          window.open(category.href, '_blank');
                        } else {
                          router.push(category.href);
                        }
                      }}
                      className="w-full flex items-center gap-2"
                    >
                      {category.action}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Quick answers to common questions
              </p>
            </div>
          </div>

          {/* FAQ Search */}
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            />
          </div>

          {/* FAQ Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Category Navigation */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {faqCategories.map((category, index) => (
                    <button
                      key={category.title}
                      onClick={() => setActiveFaqCategory(index)}
                      className={cn(
                        "w-full text-left p-3 rounded-lg transition-colors duration-200 flex items-center gap-3",
                        activeFaqCategory === index
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      )}
                    >
                      <category.icon className="w-4 h-4" />
                      <span className="font-medium">{category.title}</span>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                   
                    {faqCategories[activeFaqCategory].title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {faqCategories[activeFaqCategory].questions.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 flex items-center justify-between"
                      >
                        <span className="font-medium text-gray-900 dark:text-white">
                          {faq.question}
                        </span>
                        <ChevronRight
                          className={cn(
                            "w-5 h-5 text-gray-400 transition-transform duration-200",
                            expandedFaqs.includes(index) && "rotate-90"
                          )}
                        />
                      </button>
                      {expandedFaqs.includes(index) && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-200 dark:border-gray-600">
                          <p className="text-gray-600 dark:text-gray-400">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Helpful Resources
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Additional support materials and tools
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <Card 
                  className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 h-full cursor-pointer"
                  onClick={() => router.push(resource.href)}
                >
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                      <resource.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                      {resource.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>

                  <CardFooter className="flex items-center justify-between">
                    <Badge variant="secondary">
                      {resource.count}
                    </Badge>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Still Need Help?
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 dark:text-gray-400">
                Send us a message and we&apos;ll get back to you as soon as possible
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-6 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name
                    </label>
                    <Input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <Input
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="What can we help you with?"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Urgency
                    </label>
                    <select
                      value={contactForm.urgency}
                      onChange={(e) => setContactForm(prev => ({ ...prev, urgency: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                    >
                      <option value="low">Low - General Question</option>
                      <option value="normal">Normal - Need Help</option>
                      <option value="high">High - Urgent Issue</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <Textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Please describe your issue in detail..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full flex items-center gap-2" size="lg">
                  <MessageSquare className="w-5 h-5" />
                  Send Message
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col items-center text-center pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>100% Confidential</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span>Certified Professionals</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
}