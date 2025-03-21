# Rich Text Editor with Variables

A powerful rich text editor built with React, TipTap, and Tailwind CSS that supports dynamic variable insertion.


## Features

- 📝 Rich text editing with formatting options
- 🔄 Dynamic variable insertion using `{{` trigger
- 💅 Clean and modern UI with Tailwind CSS
- ⚡ Built with Vite for fast development
- 🎯 TypeScript for type safety

## Variable Insertion

1. Type `{{` anywhere in the editor
2. A dropdown will appear with available variables
3. Select a variable using arrow keys or mouse
4. Press Enter or click to insert the variable

Available variables:
- User Name (`{{user_name}}`)
- Company (`{{company}}`)
- Email Address (`{{email}}`)
- Current Date (`{{date}}`)
- Subscription Plan (`{{subscription_plan}}`)
- Account Balance (`{{account_balance}}`)
- Support Phone (`{{support_phone}}`)
- Website URL (`{{website_url}}`)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage Example

```tsx
import Editor from './components/Editor';

function App() {
  return (
    <div>
      <Editor />
    </div>
  );
}
```

## Editor Features

- **Text Formatting**: Bold, Italic
- **Headings**: H1, H2
- **Lists**: Bullet and Ordered lists
- **Code**: Inline code formatting
- **Blockquotes**: For quotations
- **Variables**: Dynamic content insertion

## Customization

You can customize the available variables by modifying the `VARIABLES` array in `src/types/variables.ts`:


## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

