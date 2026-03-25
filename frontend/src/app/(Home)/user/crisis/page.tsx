"use client";

import Link from "next/link";
import { 
  Phone,
  Heart,
  Shield,
  Clock,
  MapPin,
  MessageCircle,
  Globe,
  Users,
  BookOpen,
  ArrowRight,
  AlertTriangle,
  Star,
  CheckCircle
} from "lucide-react";
import { useState } from "react";

const  CrisisPageIndia=()=> {
  const [activeTab, setActiveTab] = useState("immediate");

  const immediateHelplines = [
    {
      name: "Vandrevala Foundation",
      number: "1860 2662 345",
      altNumber: "1800 2333 330",
      hours: "24/7",
      languages: "English, Hindi",
      description: "Mental health support and crisis intervention",
      type: "mental-health",
      verified: true
    },
    {
      name: "iCall",
      number: "9152987821",
      hours: "Mon-Sat, 10AM-8PM",
      languages: "English, Hindi",
      description: "Psychosocial helpline by TISS",
      type: "mental-health",
      verified: true
    },
    {
      name: "AASRA",
      number: "9820466726",
      hours: "24/7",
      languages: "English, Hindi",
      description: "Suicide prevention helpline",
      type: "suicide-prevention",
      verified: true
    },
    {
      name: "National Mental Health Helpline",
      number: "08046110007",
      hours: "24/7",
      languages: "Multiple Indian languages",
      description: "Government of India initiative",
      type: "mental-health",
      verified: true
    },
    {
      name: "Snehi",
      number: "9582270158",
      hours: "10AM-6PM",
      languages: "English, Hindi",
      description: "Mental health support",
      type: "mental-health",
      verified: true
    }
  ];

  const emergencyServices = [
    {
      name: "Police",
      number: "100",
      description: "Emergency police response",
      type: "emergency"
    },
    {
      name: "Ambulance",
      number: "102",
      description: "Medical emergency services",
      type: "emergency"
    },
    {
      name: "Disaster Management",
      number: "108",
      description: "Emergency response services",
      type: "emergency"
    },
    {
      name: "Women Helpline",
      number: "1091",
      description: "Women in distress",
      type: "specialized"
    },
    {
      name: "Child Helpline",
      number: "1098",
      description: "Children in need of care",
      type: "specialized"
    }
  ];

  const onlineResources = [
    {
      name: "YourDOST",
      description: "Online counseling and emotional support",
      link: "https://yourdost.com",
      type: "counseling",
      free: true
    },
    {
      name: "MindClan",
      description: "Mental health community and resources",
      link: "https://themindclan.com",
      type: "community",
      free: true
    },
    {
      name: "The Live Love Laugh Foundation",
      description: "Mental health awareness and resources",
      link: "https://thelivelovelaughfoundation.org",
      type: "education",
      free: true
    },
    {
      name: "Manas",
      description: "Government mental health initiative",
      link: "https://manas.mohfw.gov.in",
      type: "resources",
      free: true
    }
  ];

  const copingStrategies = [
    {
      title: "Grounding Techniques",
      steps: [
        "Name 5 things you can see around you",
        "Identify 4 things you can touch",
        "Notice 3 things you can hear",
        "Find 2 things you can smell",
        "Recognize 1 thing you can taste"
      ],
      icon: "🌍"
    },
    {
      title: "Breathing Exercise",
      steps: [
        "Breathe in slowly for 4 seconds",
        "Hold your breath for 4 seconds",
        "Breathe out slowly for 6 seconds",
        "Repeat 5-10 times"
      ],
      icon: "🌬️"
    },
    {
      title: "Reach Out",
      steps: [
        "Contact a trusted friend or family member",
        "Call one of the helplines listed above",
        "Visit a nearby hospital emergency room",
        "Don't hesitate to ask for professional help"
      ],
      icon: "🤝"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Emergency Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <AlertTriangle className="h-8 w-8" />
            <h1 className="text-4xl md:text-5xl font-bold">Emergency Support - India</h1>
          </div>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Immediate mental health support and crisis resources for India
          </p>
          <div className="mt-6 bg-red-700/50 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-red-100 font-semibold">
              🚨 If you&apos;re in immediate danger or experiencing a medical emergency, please call your local emergency services first.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 py-4">
            <a 
              href="tel:18602662345"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Phone className="h-5 w-5" />
              <span>Call Vandrevala (24/7)</span>
            </a>
            <a 
              href="tel:100"
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Phone className="h-5 w-5" />
              <span>Police - 100</span>
            </a>
            <a 
              href="tel:102"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Phone className="h-5 w-5" />
              <span>Ambulance - 102</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
          {[
            { id: "immediate", label: "Immediate Help", icon: <Phone className="h-4 w-4" /> },
            { id: "emergency", label: "Emergency Services", icon: <AlertTriangle className="h-4 w-4" /> },
            { id: "online", label: "Online Resources", icon: <Globe className="h-4 w-4" /> },
            { id: "coping", label: "Coping Strategies", icon: <Heart className="h-4 w-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-red-600 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Immediate Help Tab */}
        {activeTab === "immediate" && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                24/7 Mental Health Helplines
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                These helplines provide confidential support from trained professionals across India
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {immediateHelplines.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                        {service.name}
                        {service.verified && (
                          <CheckCircle className="h-4 w-4 text-green-500 inline ml-2" />
                        )}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {service.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">{service.hours}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <a 
                      href={`tel:${service.number.replace(/\s/g, '')}`}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Phone className="h-5 w-5" />
                      <span className="text-lg">{service.number}</span>
                    </a>
                    
                    {service.altNumber && (
                      <a 
                        href={`tel:${service.altNumber.replace(/\s/g, '')}`}
                        className="w-full border border-red-600 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                      >
                        <Phone className="h-4 w-4" />
                        <span>{service.altNumber}</span>
                      </a>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>🌐 {service.languages}</span>
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">
                        {service.type.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Important Notes */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                    Important Information
                  </h4>
                  <ul className="space-y-2 text-yellow-800 dark:text-yellow-200">
                    <li>• All calls are confidential and free or at standard calling rates</li>
                    <li>• Most helplines have trained counselors and mental health professionals</li>
                    <li>• If one helpline is busy, please try another - help is available</li>
                    <li>• You can call anonymously if you prefer not to share your identity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Services Tab */}
        {activeTab === "emergency" && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Emergency Services in India
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Immediate response services for emergencies and specialized support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emergencyServices.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    service.type === 'emergency' 
                      ? 'bg-red-100 dark:bg-red-900' 
                      : 'bg-orange-100 dark:bg-orange-900'
                  }`}>
                    <Phone className={`h-8 w-8 ${
                      service.type === 'emergency' 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-orange-600 dark:text-orange-400'
                    }`} />
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {service.description}
                  </p>
                  
                  <a 
                    href={`tel:${service.number}`}
                    className={`font-bold text-2xl ${
                      service.type === 'emergency' 
                        ? 'text-red-600 dark:text-red-400 hover:text-red-700' 
                        : 'text-orange-600 dark:text-orange-400 hover:text-orange-700'
                    }`}
                  >
                    {service.number}
                  </a>
                </div>
              ))}
            </div>

            {/* Hospital Information */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Hospital Emergency Rooms
                  </h4>
                  <p className="text-blue-800 dark:text-blue-200 mb-4">
                    For immediate medical or psychiatric emergencies, you can visit the emergency department of any major hospital. They are equipped to handle mental health crises and can provide immediate care and referrals.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">What to expect:</h5>
                      <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                        <li>• Triage assessment</li>
                        <li>• Medical evaluation</li>
                        <li>• Psychiatric consultation</li>
                        <li>• Safety planning</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">What to bring:</h5>
                      <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                        <li>• ID proof</li>
                        <li>• Medical insurance</li>
                        <li>• List of medications</li>
                        <li>• Emergency contact</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Online Resources Tab */}
        {activeTab === "online" && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Online Mental Health Resources
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Digital platforms and websites for mental health support in India
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {onlineResources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                        {resource.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {resource.description}
                      </p>
                    </div>
                    <Globe className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded ${
                      resource.free 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                    }`}>
                      {resource.free ? 'Free' : resource.type}
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </a>
              ))}
            </div>

            {/* Additional Support */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <MessageCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100">
                    Chat Support
                  </h4>
                </div>
                <p className="text-purple-800 dark:text-purple-200 text-sm mb-4">
                  Many platforms offer text-based counseling if you&apos;re not comfortable with phone calls
                </p>
                <ul className="space-y-2 text-purple-700 dark:text-purple-300 text-sm">
                  <li>• YourDOST - Online chat counseling</li>
                  <li>• iCall - Email and chat support</li>
                  <li>• MindClan - Community support</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <h4 className="font-semibold text-green-900 dark:text-green-100">
                    Self-Help Resources
                  </h4>
                </div>
                <p className="text-green-800 dark:text-green-200 text-sm mb-4">
                  Educational materials and self-guided mental health support
                </p>
                <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                  <li>• Mental health articles and blogs</li>
                  <li>• Meditation and mindfulness guides</li>
                  <li>• Coping strategy worksheets</li>
                  <li>• Community forums</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Coping Strategies Tab */}
        {activeTab === "coping" && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Immediate Coping Strategies
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Techniques to help you get through difficult moments while you wait for support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {copingStrategies.map((strategy, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl mb-4">{strategy.icon}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">
                    {strategy.title}
                  </h3>
                  <ol className="space-y-2">
                    {strategy.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start space-x-2 text-gray-600 dark:text-gray-400">
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                          {stepIndex + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>

            {/* Safety Planning */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <Shield className="h-6 w-6 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">
                    Create a Safety Plan
                  </h4>
                  <p className="text-red-800 dark:text-red-200 mb-4">
                    A safety plan can help you navigate difficult moments. Consider writing down:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-red-900 dark:text-red-100 mb-2">Warning Signs</h5>
                      <ul className="space-y-1 text-red-800 dark:text-red-200">
                        <li>• What triggers distress for you?</li>
                        <li>• Early warning signs of crisis</li>
                        <li>• Physical symptoms you experience</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-900 dark:text-red-100 mb-2">Coping Strategies</h5>
                      <ul className="space-y-1 text-red-800 dark:text-red-200">
                        <li>• Activities that calm you</li>
                        <li>• People you can contact</li>
                        <li>• Places that feel safe</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Long-term Support */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
                    Building Long-term Support
                  </h4>
                  <p className="text-indigo-800 dark:text-indigo-200 mb-4">
                    While immediate help is crucial, long-term support can help prevent future crises
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">Professional Help</h5>
                      <ul className="space-y-1 text-indigo-800 dark:text-indigo-200">
                        <li>• Regular therapy sessions</li>
                        <li>• Psychiatric consultation</li>
                        <li>• Support groups</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">Social Support</h5>
                      <ul className="space-y-1 text-indigo-800 dark:text-indigo-200">
                        <li>• Trusted friends/family</li>
                        <li>• Community groups</li>
                        <li>• Online communities</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">Self-Care</h5>
                      <ul className="space-y-1 text-indigo-800 dark:text-indigo-200">
                        <li>• Regular routine</li>
                        <li>• Healthy habits</li>
                        <li>• Stress management</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Remember: Reaching out for help is a sign of strength. You don&apos;t have to face difficult moments alone.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/therapy" className="text-blue-600 dark:text-blue-400 hover:underline">
              Find a Therapist
            </Link>
            <Link href="/resources" className="text-blue-600 dark:text-blue-400 hover:underline">
              Mental Health Resources
            </Link>
            <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
              Contact SageMate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CrisisPageIndia;