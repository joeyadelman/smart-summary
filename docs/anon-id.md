# Anonymous IDs in Smart Document Summaries

## Overview
Anonymous IDs are used to track and associate document summaries with non-authenticated users. This allows users to access their previous summaries even without creating an account.

## Implementation Details

### 1. Generation and Storage
- Anonymous IDs are generated using `crypto.randomUUID()` when a user first uploads a document without being logged in
- The ID is stored in an HTTP-only cookie that:
  - Lasts for 1 year
  - Is secure in production
  - Uses strict same-site policy
  - Is not accessible via JavaScript for security

### 2. Database Structure
The summaries table supports both authenticated and anonymous users through:
- `user_id`: For authenticated users (references auth.users)
- `anonymous_id`: For non-authenticated users
- A constraint ensures exactly one of these fields is populated

### 3. Flow

#### First Upload:
1. User uploads a document
2. System checks for existing anonymous_id cookie
3. If none exists:
   - Generates new UUID
   - Sets cookie
4. Saves summary with anonymous_id

#### Subsequent Visits:
1. System checks for anonymous_id cookie
2. If found, fetches all summaries associated with that ID
3. User can view their previous summaries

### 4. Code References

The anonymous ID handling occurs in three main places:

1. API Route: Creates and manages the anonymous ID cookie 
2. Summaries Hook: Uses the anonymous ID to fetch relevant summaries
3. Database Schema: Enforces the user_id/anonymous_id constraint

## Security Considerations

1. **Cookie Security**
   - HTTP-only prevents XSS attacks
   - Secure flag ensures HTTPS-only in production
   - Strict same-site policy prevents CSRF attacks

2. **Database Security**
   - Constraint ensures no mixing of anonymous and authenticated users
   - Indexes optimize query performance
   - No personal data is stored with anonymous IDs

## Migration Path
When a user creates an account, their summaries can be migrated by:
1. Querying summaries with their anonymous_id
2. Updating the records with their new user_id
3. Setting anonymous_id to null

This ensures a smooth transition from anonymous to authenticated usage.