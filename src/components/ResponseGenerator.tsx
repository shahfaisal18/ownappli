import React, { useState, useCallback } from 'react';
import { Copy, CheckCircle, MessageSquare, Building, Package, Mic } from 'lucide-react';

interface FormData {
  companyName: string;
  customerMessage: string;
  productService: string;
  tone: string;
}

const toneOptions = [
  { value: 'professional', label: 'Professional', description: 'Formal and business-like' },
  { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
  { value: 'empathetic', label: 'Empathetic', description: 'Understanding and caring' },
  { value: 'apologetic', label: 'Apologetic', description: 'Acknowledging and regretful' },
  { value: 'enthusiastic', label: 'Enthusiastic', description: 'Positive and energetic' },
  { value: 'reassuring', label: 'Reassuring', description: 'Calming and confident' }
];

export default function ResponseGenerator() {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    customerMessage: '',
    productService: '',
    tone: 'professional'
  });
  const [generatedResponse, setGeneratedResponse] = useState('');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateResponse = useCallback(() => {
    const { companyName, customerMessage, productService, tone } = formData;
    
    if (!companyName || !customerMessage || !productService) {
      setGeneratedResponse('Please fill in all required fields to generate a response.');
      return;
    }

    // Analyze the customer message to determine if it's a complaint or question
    const isComplaint = /problem|issue|wrong|bad|terrible|awful|disappointed|frustrated|angry|upset|broken|doesn't work|not working/i.test(customerMessage);
    const isQuestion = /\?|how|what|when|where|why|can you|could you|would you|help me understand/i.test(customerMessage);

    let response = `Thank you for contacting ${companyName}.\n\n`;

    // Adjust greeting based on tone
    const toneAdjustments = {
      friendly: `Hi there! Thanks so much for reaching out to ${companyName}. `,
      empathetic: `Thank you for taking the time to contact ${companyName}. I understand your concern, `,
      apologetic: `Thank you for contacting ${companyName}. I sincerely apologize for any inconvenience, `,
      enthusiastic: `Hello! We're delighted to hear from you at ${companyName}! `,
      reassuring: `Thank you for contacting ${companyName}. I'm here to help resolve this for you, `,
      professional: `Thank you for contacting ${companyName}. `
    };

    response = toneAdjustments[tone as keyof typeof toneAdjustments] || toneAdjustments.professional;

    if (isComplaint) {
      response += `and I want to acknowledge the issue you've experienced with ${productService}.\n\n`;
      response += `Your feedback is invaluable to us, and I'm committed to making this right. `;
      
      switch (tone) {
        case 'empathetic':
          response += `I can understand how frustrating this must be for you. `;
          break;
        case 'apologetic':
          response += `I'm truly sorry this happened and want to resolve it immediately. `;
          break;
        case 'reassuring':
          response += `Please know that we take all concerns seriously and will work diligently to resolve this. `;
          break;
      }
      
      response += `I'd like to help you resolve this matter promptly. Could you please provide any additional details about the specific issue you encountered? This will help me ensure we address your concern thoroughly.\n\n`;
      response += `In the meantime, I'm escalating your case to our specialized team to ensure you receive the best possible solution.`;
    } else if (isQuestion) {
      response += `and I'm happy to help answer your question about ${productService}.\n\n`;
      
      switch (tone) {
        case 'friendly':
          response += `I'd love to help you out with this! `;
          break;
        case 'enthusiastic':
          response += `I'm excited to share more information about our ${productService}! `;
          break;
        case 'professional':
          response += `I'll be pleased to provide you with the information you need. `;
          break;
      }
      
      response += `Based on your inquiry, I want to make sure I give you the most accurate and helpful information possible.\n\n`;
      response += `Could you please provide a bit more detail about your specific question? This will allow me to give you a comprehensive and tailored response that addresses exactly what you're looking for.`;
    } else {
      response += `and I appreciate you taking the time to share your thoughts about ${productService}.\n\n`;
      response += `Your message is important to us, and I want to ensure I provide you with the most helpful response possible. `;
      response += `Could you please let me know how I can best assist you today?`;
    }

    // Add closing based on tone
    const closings = {
      friendly: `\n\nI'm here to help and looking forward to hearing back from you soon!\n\nWarm regards,\nCustomer Service Team\n${companyName}`,
      empathetic: `\n\nI'm personally committed to ensuring your experience with ${companyName} meets your expectations. Please don't hesitate to reach out if you need anything else.\n\nWith care,\nCustomer Service Team\n${companyName}`,
      apologetic: `\n\nOnce again, I apologize for any inconvenience this may have caused. We truly value your business and are committed to making this right.\n\nSincerely,\nCustomer Service Team\n${companyName}`,
      enthusiastic: `\n\nWe're so grateful for customers like you! Can't wait to help make your experience with ${productService} absolutely amazing!\n\nWith enthusiasm,\nCustomer Service Team\n${companyName}`,
      reassuring: `\n\nPlease rest assured that we're here to support you every step of the way. You can count on us to resolve this matter to your satisfaction.\n\nBest regards,\nCustomer Service Team\n${companyName}`,
      professional: `\n\nI look forward to your response and the opportunity to assist you further.\n\nBest regards,\nCustomer Service Team\n${companyName}`
    };

    response += closings[tone as keyof typeof closings] || closings.professional;

    setGeneratedResponse(response);
  }, [formData]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedResponse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Customer Service Response Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create professional, personalized customer service responses that build trust and resolve issues effectively.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <MessageSquare className="text-blue-600" size={24} />
              Response Details
            </h2>

            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Building size={16} className="text-blue-600" />
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Enter your company name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Package size={16} className="text-blue-600" />
                  Product/Service Description *
                </label>
                <textarea
                  value={formData.productService}
                  onChange={(e) => handleInputChange('productService', e.target.value)}
                  placeholder="Describe your product or service"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Mic size={16} className="text-blue-600" />
                  Response Tone *
                </label>
                <select
                  value={formData.tone}
                  onChange={(e) => handleInputChange('tone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  {toneOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label} - {option.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Message *
                </label>
                <textarea
                  value={formData.customerMessage}
                  onChange={(e) => handleInputChange('customerMessage', e.target.value)}
                  placeholder="Paste the customer's message here..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
                />
              </div>

              <button
                onClick={generateResponse}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Generate Response
              </button>
            </div>
          </div>

          {/* Generated Response */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                <MessageSquare className="text-green-600" size={24} />
                Generated Response
              </h2>
              {generatedResponse && (
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
                >
                  {copied ? (
                    <>
                      <CheckCircle size={16} className="text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-6 min-h-[400px]">
              {generatedResponse ? (
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {generatedResponse}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Fill in the form and click "Generate Response" to see your customized customer service response here.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Tips for Effective Customer Service Responses</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Be Timely</h4>
              <p className="text-sm text-gray-600">Respond to customer inquiries within 24 hours, or sooner when possible.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Personalize</h4>
              <p className="text-sm text-gray-600">Use the customer's name and reference specific details from their message.</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Follow Up</h4>
              <p className="text-sm text-gray-600">Always close with clear next steps or an invitation for further communication.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}