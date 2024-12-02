import { NextResponse } from 'next/server';
import pdf from 'pdf-parse';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ 
        error: 'No file provided',
        keyTerms: [],
        mainConcepts: [],
        keyPoints: [],
        summary: ''
      }, { status: 400 });
    }

    let textContent = '';
    
    try {
      if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const data = await pdf(buffer);
        textContent = data.text;
        
        console.log('Extracted PDF Content Length:', textContent.length);
        console.log('First 500 characters:', textContent.substring(0, 500));
        console.log('Last 500 characters:', textContent.substring(textContent.length - 500));
        
      } else if (file.type === 'text/plain') {
        textContent = await file.text();
        
        console.log('Text File Content Length:', textContent.length);
        console.log('First 500 characters:', textContent.substring(0, 500));
        console.log('Last 500 characters:', textContent.substring(textContent.length - 500));
      } else {
        throw new Error('Unsupported file type');
      }

      console.log('Sending to OpenAI - Content Length:', textContent.length);

      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "user",
            content: `Create a detailed cheat sheet from this document. Extract the most important information and organize it clearly.
            
            Please format your response in this exact JSON structure:
            {
              "keyTerms": [
                {"term": "Important Term", "explanation": "Clear, concise explanation"}
              ],
              "mainConcepts": [
                {"title": "Main Idea", "description": "Detailed explanation of the concept"}
              ],
              "keyPoints": [
                "Key takeaway 1",
                "Key takeaway 2"
              ],
              "summary": "Concise overview of the main content"
            }

            Document text:
            ${textContent}`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 4096,
      });

      const content = response.choices[0].message.content;
      
      console.log('OpenAI Response:', content);

      return NextResponse.json(JSON.parse(content));

    } catch (error) {
      console.error('Processing error:', error);
      return NextResponse.json({
        error: 'Failed to process document',
        keyTerms: [],
        mainConcepts: [],
        keyPoints: [],
        summary: ''
      }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Request error:', error);
    return NextResponse.json({
      error: error.message || 'Failed to analyze document',
      keyTerms: [],
      mainConcepts: [],
      keyPoints: [],
      summary: ''
    }, { status: 500 });
  }
}