# Asy: Accessibility Toolkit for React
Asy is a lightweight React library that enhances web accessibility by providing AI-driven tools for users with disabilities. Powered by Tambo AI, Asy enables dynamic UI adjustments like font resizing, color blindness filters, and text-to-speech through voice or text input. It’s designed for developers who want to make their web apps inclusive for users with visual, auditory, motor, or cognitive impairments.

## Table of Contents
- Features
- Installation
- Usage
- Using the Starter Template
- Contributing
- License

### Features

- Font Resizing: Adjust text size for low-vision users (e.g., "Increase font to 1.5x").
- Color Blindness Filters: Apply CSS filters for protanopia, deuteranopia, or tritanopia.
- Text-to-Speech: Narrate page content for blind users using the Web Speech API.
- AI-Driven Interaction: Voice or text input via Tambo AI to trigger accessibility tools.
- Customizable Template: Drop-in starter template for quick setup.
- WCAG Compliance: Aligns with accessibility standards for inclusive design.

### Installation (Using Starter template is best!!!)
To use Asy in your project, follow these steps:

#### Prerequisites:

- Node.js (v16 or higher)
- A Tambo AI API key (sign up at https://tambo.co)
- A React project (v18 or higher)


#### Install Asy via tambo and Dependencies:
``` bash
npm install @tambo-ai/react zod
```

@tambo-ai/react: For AI-driven input handling.
zod: For tool schema validation.


#### Set Up Environment:Create a .env file in your project root and add your Tambo API key:
```bash
TAMBO_API_KEY=your-tambo-api-key
```


### Usage
Asy provides a ModeToggle component that wraps your app or specific components (e.g., a blog post) to enable accessibility features. Here’s how to integrate it:

- **Import and Configure**:Wrap your app with TamboProvider and pass the Asy tools. Then, use ModeToggle to wrap content.

```tsx src/app.tsx
//src/app.tsx
import { TamboProvider } from "@tambo-ai/react";
import { tools } from "asy";
import ModeToggle from "asy/components/ModeToggle";
import BlogPost from "./components/BlogPost";

const App: React.FC = () => {
  return (
    <TamboProvider apiKey={process.env.TAMBO_API_KEY} tools={tools}>
      <ModeToggle>
        <BlogPost />
      </ModeToggle>
    </TamboProvider>
  );
};

export default App;
```

- **Interact with Accessibility Features:**

- Voice Mode: Click the microphone button (bottom-right), say, e.g., "Increase font to 1.5x" or "Apply protanopia filter." The AI processes the input and adjusts the UI.
- Text Mode: Click the keyboard button, type a command (e.g., "Read the content"), and submit.
Example: For a BlogPost component:
```tsx src/components/BlogPost.tsx
// src/components/BlogPost.tsx
const BlogPost: React.FC = () => (
  <div>
    <h1>My Blog Post</h1>
    <p>This is a sample post.</p>
  </div>
);
export default BlogPost;
```
When the user says "Increase font to 1.5x," the text scales to 1.5rem while preserving the component’s original styles (e.g., colors, margins).


**Supported Commands:**

- Font size: "Make text bigger to 1.5x," "Reduce font to 0.8x."
- Color blindness: "I have protanopia," "Apply deuteranopia filter."
- Text-to-speech: "Read the content."



### Using the Starter Template (Recommended)
Asy includes a starter template via tambo to quickly bootstrap an accessible React app:

**Clone the Template:**
```bash
git clone https://github.com/Marvellous111/Asy
cd Asy
npm install
```

**Configure:**

Add your Tambo API key to .env (see Installation).
The template includes:
<mark>src/app.tsx:</mark> Preconfigured with TamboProvider and ModeToggle.
<mark>src/tools/tamboTools.ts:</mark> Predefined tools (font resize, color filters, TTS).
<mark>src/components/BlogPost.tsx:</mark> Sample component for testing.


#### Run the Template:
```bash
npm run dev
```

Open http://localhost:3000 to test voice/text inputs.

#### Customize:

- Replace BlogPost.tsx with your components.
- Add new tools to tamboTools.ts (e.g., for motor or cognitive aids).
- Style with Tailwind CSS (included) or your preferred framework.


### Contributing
I welcome contributions to make Asy more inclusive! To contribute:

**Fork the repository:** https://github.com/Marvellous111/Asy
**Create a branch:** 
```bash
git checkout -b feature/your-feature
```
**Commit changes:** 
```bash
git commit -m "Add your feature"
```
**Submit a pull request.**

License
Asy is licensed under the MIT License. See LICENSE for details.