# Smart Document Summaries

A powerful web application that transforms documents into intelligent, organized summaries using AI. The application processes documents differently based on their type (Academic Papers, Resumes, or General Documents) to provide the most relevant analysis.

## Features

- **Smart Document Processing**: Upload PDFs or text files for instant AI-powered analysis
- **Document Type Specialization**: 
  - Academic Papers: Focuses on research components, methodology, and findings
  - Resumes: Analyzes professional experience, skills, and qualifications
  - General Documents: Provides comprehensive content summaries
- **Structured Output**:
  - Key Terms & Definitions
  - Main Concepts
  - Key Points
  - Numerical Data
  - Document-specific insights

## How It Works

1. **Select Document Type**
   - Choose between Academic Paper, Resume, or General Document
   - Each type uses specialized AI prompts for optimal analysis

2. **Upload Document**
   - Drag & drop or click to upload
   - Supports PDF and text files

3. **AI Processing**
   - Document is analyzed using advanced AI
   - Content is structured based on document type
   - Key information is extracted and organized

4. **View & Share**
   - Clean, organized layout
   - Interactive key terms highlighting
   - Easy sharing and export options
   - Access to previous summaries

## Technical Stack

- Next.js 13+ with App Router
- TypeScript for type safety
- Supabase for backend & authentication
- Tailwind CSS for styling
- GPT-4 for document analysis

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   OPENAI_API_KEY=your_openai_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Future Enhancements

- Additional document type specializations
- Enhanced export options
- Collaborative features
- Custom AI analysis parameters
- Advanced sharing capabilities
