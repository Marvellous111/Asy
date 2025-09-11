"use client";

import { TamboProvider } from "@tambo-ai/react";
import { components, tools } from "@/lib/tambo";
import Asy from "@/components/ui/mode-toggle";


export default function Home() {
  return (
    <div>
      <TamboProvider
        apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
        components={components}
        tools={tools}
        tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
      >
        <Asy>
          <main className="container mx-auto px-4 py-8">
            {/* Main Image */}
            <div className="mb-8 w-full flex justify-center">
              <img
                src="https://unsplash.com/illustrations/abstract-geometric-shape-with-gradient-blocks-n-9kWljv5GQ"
                alt="abstract geometric shape with gradient blocks"
                className="w-[850px] h-[450px] object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Article Content */}
            <article className="prose prose-lg max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-4xl font-bold mb-4">Agentic AI: Revolutionizing Software Development in 2025</h1>
              <p className="text-gray-500 mb-6">By Tech Enthusiast | September 11, 2025</p>

              <p className="mb-4">
                In the ever-evolving landscape of technology, few advancements have captured the programming
                community&apos;s attention like Agentic AI. As we step into 2025, this trend—highlighted by Gartner&apos;s
                Top 10 Strategic Technology Trends—is poised to transform how developers build, debug, and
                deploy software. But what exactly is Agentic AI, and why is it trending now?
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">What is Agentic AI?</h2>
              <p className="mb-4">
                Agentic AI refers to autonomous AI systems that can take actions on behalf of users, making
                decisions and executing tasks with minimal human intervention. Unlike traditional AI models
                that respond passively to queries, agentic systems are proactive. In software development,
                these agents can handle everything from code generation to testing and even deployment
                orchestration.
              </p>
              <p className="mb-4">
                Think of it as an evolution of tools like GitHub Copilot. Today&apos;s agentic AI, powered by
                advanced large language models (LLMs) and reinforced learning, can manage entire workflows.
                For instance, an agent might detect a bug in your codebase, suggest fixes, run tests, and
                merge changes—all while learning from your preferences.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Why It&apos;s Trending in the Programming Community</h2>
              <p className="mb-4">
                The programming community is buzzing about Agentic AI for several reasons. First, it addresses
                the growing complexity of modern software stacks. With microservices, cloud-native apps, and
                DevOps pipelines becoming the norm, developers are overwhelmed. Agentic AI simplifies this by
                automating repetitive tasks, allowing coders to focus on creative problem-solving.
              </p>
              <p className="mb-4">
                Recent surveys, such as those from Exploding Topics and Developer Tech, show a surge in
                adoption. In 2025, over 60% of enterprises are expected to integrate AI agents into their
                development processes, driven by efficiency gains of up to 40%. Trends like AI development
                simplification and cross-functional teams further amplify its appeal, as agents bridge gaps
                between developers, testers, and ops teams.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Benefits for Developers</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>Increased Productivity:</strong> Agents can generate boilerplate code, refactor
                  legacy systems, and even write documentation, slashing development time.
                </li>
                <li>
                  <strong>Better Collaboration:</strong> In team settings, AI agents act as virtual
                  assistants, reviewing pull requests in real-time and suggesting improvements.
                </li>
                <li>
                  <strong>Enhanced Security:</strong> With built-in governance, agents can scan for
                  vulnerabilities and enforce best practices automatically.
                </li>
                <li>
                  <strong>Accessibility for All:</strong> No-code/low-code integrations make advanced AI
                  accessible to junior developers and non-technical users.
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Challenges and Considerations</h2>
              <p className="mb-4">
                Despite the hype, Agentic AI isn&apos;t without hurdles. Ethical concerns, such as bias in
                decision-making and job displacement, are hot topics in forums like DEV Community.
                Reliability is another issue—agents might make erroneous decisions in complex scenarios,
                requiring robust oversight.
              </p>
              <p className="mb-4">
                Moreover, integrating these systems demands strong AI governance platforms to ensure
                compliance and transparency. As O&apos;Reilly Media&apos;s trends report notes, while Python and
                machine learning dominate searches, the real challenge lies in scaling AI ethically.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">The Future Outlook</h2>
              <p className="mb-4">
                Looking ahead, Agentic AI will likely converge with other trends like post-quantum
                cryptography and spatial computing, creating hybrid systems for secure, immersive
                development environments. For programmers, staying ahead means experimenting with tools like
                OpenAI&apos;s latest agents or custom frameworks in Rust and Python.
              </p>
              <p className="mb-4">
                In conclusion, Agentic AI isn't just a trend—it&apos;s a paradigm shift. As we navigate 2025,
                embracing it could redefine your career. What's your take? Share in the comments below!
              </p>
            </article>
          </main>
        </Asy>
      </TamboProvider>
    </div>
  )
}