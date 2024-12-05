import { NextResponse } from 'next/server';
// @ts-ignore
import pdf from 'pdf-parse';
import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

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

      const prompt = `Analyze the following document and structure the information into these categories:

1. Summary: A concise overview of the main points
2. Key Terms: Important terminology with explanations
3. Main Concepts: Core ideas and their descriptions
4. Key Points: Bullet points of crucial information
5. Numerical Data: Extract and explain significant statistics, dates, or measurements

For numerical data, include:
- The actual value
- The context it appears in
- Its significance or implications

Format the response as a JSON object with this structure:
{
  "summary": "string",
  "keyTerms": [{ "term": "string", "explanation": "string" }],
  "mainConcepts": [{ "title": "string", "description": "string" }],
  "keyPoints": ["string"],
  "numericalData": [{ "value": "string", "context": "string", "significance": "string" }]
}

Document content:
${textContent}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "user",
            content: prompt,
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 4096,
      });

      const content = response.choices[0].message.content;
      
      console.log('OpenAI Response:', content);

      if (!content) {
        throw new Error('No content received from OpenAI');
      }

      const processedContent = JSON.parse(content || '{}');

      // Get anonymous ID from cookies or create new one
      const cookieStore = cookies();
      let anonymousId = (await cookieStore).get('anonymous_id')?.value;
      
      if (!anonymousId) {
        anonymousId = crypto.randomUUID();
        (await cookieStore).set('anonymous_id', anonymousId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 365 // 1 year
        });
      }

      // Try to get authenticated user
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data: { user } } = await supabase.auth.getUser();

      // Save to Supabase
      const { error: saveError } = await supabase
        .from('summaries')
        .insert([
          {
            user_id: user?.id || null,
            anonymous_id: user ? null : anonymousId,
            document_name: file.name,
            content: processedContent,
          },
        ]);

      if (saveError) {
        console.error('Error saving to Supabase:', saveError);
        // Continue anyway - we'll still return the processed content
      }

      return NextResponse.json(processedContent);

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