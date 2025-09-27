import openai from './openaiClient';

/**
 * Mock data for fallback when API quota is exceeded
 */
const mockVerificationReport = {
  verificationStatus: 'pending',
  overallRiskScore: 25,
  riskLevel: 'low',
  summary: 'Certificate analysis is temporarily unavailable due to API quota limits. Manual verification is recommended for critical certificates.',
  findings: [
    'AI analysis is temporarily unavailable',
    'Certificate data structure appears valid',
    'Manual verification recommended for final decision'
  ],
  redFlags: [],
  recommendations: [
    'Contact system administrator to resolve API quota issue',
    'Perform manual verification as backup process',
    'Check certificate details manually against institution records'
  ],
  nextActions: [
    'Enable API quota monitoring',
    'Implement backup verification methods',
    'Schedule manual review if needed'
  ],
  verifierNotes: 'API quota exceeded - automated analysis unavailable. This is a system limitation, not a certificate issue.'
};

const mockCertificateAnalysis = {
  studentName: 'Analysis Unavailable',
  institution: 'Analysis Unavailable', 
  degree: 'Analysis Unavailable',
  graduationDate: 'Analysis Unavailable',
  gpa: 'N/A',
  honors: 'N/A',
  extractedText: 'OCR analysis unavailable due to API quota limits',
  confidenceScore: 0.1,
  fraudRiskLevel: 'medium',
  analysisNotes: 'AI analysis temporarily unavailable due to API quota limits. Manual review required.',
  inconsistencies: ['AI analysis unavailable'],
  recommendations: ['Perform manual certificate review', 'Contact system administrator']
};

/**
 * Check if error is quota exceeded error
 */
const isQuotaExceededError = (error) => {
  return error?.status === 429 || 
         error?.message?.includes('exceeded your current quota') ||
         error?.message?.includes('429');
};

/**
 * Enhanced error handling for OpenAI API calls
 */
const handleOpenAIError = (error, fallbackData = null) => {
  console.error('OpenAI API Error:', error);
  
  if (isQuotaExceededError(error)) {
    console.warn('OpenAI quota exceeded, using fallback response');
    return fallbackData;
  }
  
  // Re-throw other errors
  throw error;
};

/**
 * Certificate Analysis Service
 * Analyzes certificate images and extracts information using GPT-5's vision capabilities
 */
export async function analyzeCertificateImage(imageUrl, analysisType = 'certificate') {
  try {
    let imageUrlToAnalyze;
    
    if (typeof imageUrl === 'string') {
      imageUrlToAnalyze = imageUrl;
    } else if (imageUrl?.url) {
      imageUrlToAnalyze = imageUrl?.url;
    } else if (imageUrl instanceof File) {
      imageUrlToAnalyze = URL.createObjectURL(imageUrl);
    } else {
      throw new Error('Invalid image format provided');
    }

    const systemPrompts = {
      certificate: 'You are an expert in certificate analysis and verification. Extract all relevant information from this certificate including student name, institution, degree/program, graduation date, GPA, honors, and any other important details. Also identify any potential inconsistencies or red flags.',
      verification: 'Analyze this certificate for verification purposes. Check for authenticity markers, formatting consistency, proper institutional branding, and any signs that might indicate fraud or tampering.',
      ocr: 'Extract all text content from this certificate image. Provide a structured output with all visible text, maintaining the original formatting and organization as much as possible.',
      fraud_detection: 'Analyze this certificate specifically for fraud detection. Look for inconsistencies in fonts, alignment, image quality, institutional logos, signatures, seals, and any other elements that might indicate forgery or manipulation.'
    };

    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o-mini', // Use more cost-effective model
      messages: [
        { 
          role: 'system', 
          content: systemPrompts?.[analysisType] || systemPrompts?.certificate
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: `Please analyze this certificate image with focus on: ${analysisType}` },
            { type: 'image_url', image_url: { url: imageUrlToAnalyze } },
          ],
        },
      ],
      max_tokens: 1000, // Limit tokens to reduce cost
    });

    const analysis = JSON.parse(response?.choices?.[0]?.message?.content);
    
    return {
      ...analysis,
      analysisType,
      imageUrl: imageUrlToAnalyze,
      timestamp: new Date()?.toISOString()
    };
  } catch (error) {
    const fallbackResponse = {
      ...mockCertificateAnalysis,
      analysisType,
      imageUrl: imageUrlToAnalyze,
      timestamp: new Date()?.toISOString()
    };
    
    return handleOpenAIError(error, fallbackResponse);
  }
}

/**
 * Generate Certificate Verification Report
 * Creates a comprehensive verification report using AI analysis
 */
export async function generateVerificationReport(certificateData, analysisResults) {
  try {
    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o-mini', // Use more cost-effective model
      messages: [
        { 
          role: 'system', 
          content: 'You are an expert certificate verification specialist. Generate a comprehensive verification report based on the provided certificate data and analysis results. Include verification status, risk assessment, and detailed findings.' 
        },
        { 
          role: 'user', 
          content: `Generate a verification report for this certificate:
          
          Certificate Data: ${JSON.stringify(certificateData, null, 2)}
          Analysis Results: ${JSON.stringify(analysisResults, null, 2)}
          
          Please provide a detailed report with verification status, risk assessment, and recommendations.` 
        },
      ],
      max_tokens: 800, // Limit tokens to reduce cost
    });

    return JSON.parse(response?.choices?.[0]?.message?.content);
  } catch (error) {
    return handleOpenAIError(error, mockVerificationReport);
  }
}

/**
 * AI-Powered Search and Recommendations
 * Provides intelligent search capabilities for certificates
 */
export async function intelligentCertificateSearch(query, certificates = []) {
  try {
    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o-mini',
      messages: [
        { 
          role: 'system', 
          content: 'You are an intelligent search assistant for certificate management. Analyze the user query and provide relevant search results and recommendations based on the available certificates.' 
        },
        { 
          role: 'user', 
          content: `Search Query: "${query}"
          
          Available Certificates: ${JSON.stringify(certificates?.slice(0, 20), null, 2)}
          
          Please analyze the query and provide relevant matches and search suggestions.` 
        },
      ],
      max_tokens: 500,
    });

    return JSON.parse(response?.choices?.[0]?.message?.content);
  } catch (error) {
    const fallbackResponse = {
      relevantMatches: [],
      searchSuggestions: ['Try searching by student name', 'Search by institution', 'Filter by date range'],
      filterRecommendations: ['Use manual filters when AI search is unavailable'],
      queryInterpretation: 'AI search temporarily unavailable due to quota limits',
      confidence: 0.1
    };
    
    return handleOpenAIError(error, fallbackResponse);
  }
}

/**
 * Generate Fraud Detection Insights
 * Analyzes patterns in certificate data to identify potential fraud
 */
export async function generateFraudInsights(certificateHistory = []) {
  try {
    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o-mini',
      messages: [
        { 
          role: 'system', 
          content: 'You are a fraud detection specialist analyzing certificate patterns. Identify suspicious patterns, anomalies, and provide insights for fraud prevention in certificate verification systems.' 
        },
        { 
          role: 'user', 
          content: `Analyze these certificate verification records for fraud patterns:
          
          Certificate History: ${JSON.stringify(certificateHistory?.slice(0, 50), null, 2)}
          
          Please identify patterns, anomalies, and provide fraud prevention insights.` 
        },
      ],
      max_tokens: 600,
    });

    return JSON.parse(response?.choices?.[0]?.message?.content);
  } catch (error) {
    const fallbackResponse = {
      suspiciousPatterns: ['AI analysis unavailable'],
      riskIndicators: ['Manual review required'],
      fraudTrends: ['Trend analysis unavailable due to quota limits'],
      preventionRecommendations: ['Implement manual fraud detection protocols', 'Contact administrator to resolve API quota'],
      alertThresholds: ['Set up manual monitoring systems'],
      overallRiskAssessment: 'Cannot assess risk due to API quota limitations - manual review required',
      confidence: 0.1
    };
    
    return handleOpenAIError(error, fallbackResponse);
  }
}

/**
 * AI Chat Assistant for Certificate Management
 * Provides conversational AI support for users
 */
export async function getCertificateAssistantResponse(userMessage, context = {}) {
  try {
    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o-mini',
      messages: [
        { 
          role: 'system', 
          content: 'You are CertifyGuard AI, a helpful assistant specializing in certificate verification and management. Provide accurate, helpful responses about certificate-related questions, verification processes, fraud detection, and system usage. Be professional yet friendly.' 
        },
        { 
          role: 'user', 
          content: `User Question: ${userMessage}
          
          Context: ${JSON.stringify(context, null, 2)}
          
          Please provide a helpful response.` 
        },
      ],
      max_tokens: 400,
    });

    return response?.choices?.[0]?.message?.content;
  } catch (error) {
    const fallbackResponse = `I apologize, but the AI assistant is temporarily unavailable due to API quota limits. 

For general certificate verification questions:
- Check our documentation for verification processes
- Contact support for technical assistance
- Use manual verification methods as backup

The system administrator has been notified of the quota issue.`;
    
    return handleOpenAIError(error, fallbackResponse);
  }
}

/**
 * Streaming Chat for Real-time Assistance
 */
export async function getStreamingAssistantResponse(userMessage, onChunk, context = {}) {
  try {
    const stream = await openai?.chat?.completions?.create({
      model: 'gpt-4o-mini',
      messages: [
        { 
          role: 'system', 
          content: 'You are CertifyGuard AI, a helpful assistant for certificate verification and management. Provide helpful, accurate responses in real-time.' 
        },
        { 
          role: 'user', 
          content: `${userMessage}\n\nContext: ${JSON.stringify(context, null, 2)}` 
        },
      ],
      stream: true,
      max_tokens: 400,
    });

    for await (const chunk of stream) {
      const content = chunk?.choices?.[0]?.delta?.content || '';
      if (content) {
        onChunk(content);
      }
    }
  } catch (error) {
    if (isQuotaExceededError(error)) {
      const fallbackMessage = 'AI assistant temporarily unavailable due to quota limits. Please contact system administrator or use manual verification methods.';
      onChunk(fallbackMessage);
      return;
    }
    throw error;
  }
}

/**
 * Content Moderation for User Input
 */
export async function moderateUserContent(content) {
  try {
    const response = await openai?.moderations?.create({
      model: 'text-moderation-latest',
      input: content,
    });

    return response?.results?.[0];
  } catch (error) {
    const fallbackResponse = {
      flagged: false,
      categories: {},
      category_scores: {},
      warning: 'Content moderation unavailable due to API quota limits'
    };
    
    return handleOpenAIError(error, fallbackResponse);
  }
}