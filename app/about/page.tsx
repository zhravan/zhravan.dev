import { PageHeader } from '@/components/PageHeader';

const pageMetadata = {
  title: 'About',
  description: 'Learn more about me and what I do.'
};

export const metadata = pageMetadata;

export default function About() {
  return (
    <div className="space-y-6 text-xxs">
      <PageHeader metadata={pageMetadata} />

      <section
        className="prose animate-fade-up"
        style={{ animationDelay: '100ms' }}
      >
        <h2 className="text-sm">Background</h2>
        <p className="" style={{ color: 'var(--color-muted-foreground)' }}>
          I am a tinkerer, polymathic indie computer scientist, systems engineer, and data-science aficionado. My experience spans backend architectures, platform engineering, distributed systems, AI agents, developer tools, and routing solvers.
          <br /><br />
          I have built products in edutech, logistics optimization, supply chain management,
          cloud infrastructure, developer utilities, and AI workflows.
        </p>

        <h2 className="text-sm">What I Do</h2>
        <p className="" style={{ color: 'var(--color-muted-foreground)' }}>
          I love building tools that make technology more accessible and enjoyable to use. I have been building and coding for over a decade and teaching for half that time.
        </p>

        <h3 className="text-sm">Focus Areas</h3>
        <ul className="space-y-1" style={{ color: 'var(--color-muted-foreground)' }}>
          <li>Backend architectures, platform engineering, distributed systems, and infrastructure</li>
          <li>AI engineering & agentic AI systems (LLMs, RAG, etc.)</li>
          <li>Developer tools, developer experience</li>
          <li>Open source contribution</li>
          <li>Technical writing</li>
        </ul>

        <h2 className="text-sm">Beyond Code</h2>
        <p className="" style={{ color: 'var(--color-muted-foreground)' }}>
          When I am not at my keyboard, you will find me exploring new music, cooking,gardening, reading about philosophy, culture, technology and design, or exploring ideas through writing.<br />  
          I believe diverse interests make for better engineers and more thoughtful problem-solving.
        </p>

        <h2 className="text-sm">Get in Touch</h2>
        <p className="" style={{ color: 'var(--color-muted-foreground)' }}>
          I am always interested in connecting with other developers, designers, and creators.
          Whether you want to discuss a project, collaborate on something new, or just chat about technology, feel free to reach out.
        </p>

        <div className="flex flex-wrap gap-4 mt-4">
          <a
            href="https://github.com/zhravan"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-150"
          >
            GitHub
          </a>
          <a
            href="https://x.com/zhravan"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-150"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com/in/zhravan"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-150"
          >
            LinkedIn
          </a>
          <a href="mailto:shravan@ohmyscript.com" className="transition-colors duration-150">
            Email
          </a>
          <span style={{ color: 'var(--color-muted-foreground)' }}>·</span>
          <a href="/feed.xml" className="transition-colors duration-150">
            RSS
          </a>
          <a href="/atom.xml" className="transition-colors duration-150">
            Atom
          </a>
          <a href="/feed.json" className="transition-colors duration-150">
            JSON
          </a>
        </div>
      </section>
    </div>
  );
}
