import { PageHeader } from '@/components/PageHeader';
import { getPageMetadata } from '@/lib/seo';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import { HeroAnimation } from '@/components/HeroAnimation';
import { ServiceCard } from '@/components/ServiceCard';
import { ProcessStep } from '@/components/ProcessStep';
import { FAQSection } from '@/components/FAQSection';
import { ClienteleList } from '@/components/ClienteleList';
import { Calendar, Mail } from 'lucide-react';
import type { Metadata } from 'next';

const pageMetadata = {
  title: 'Services',
  description: ''
};

export const metadata: Metadata = getPageMetadata({
  title: pageMetadata.title,
  description: pageMetadata.description,
  path: '/services/'
});

export default function Services() {
  return (
    <div className="space-y-6 text-xxs">
      <AnalyticsTracker
        contentType="page"
        contentTitle={pageMetadata.title}
        contentSlug="services"
      />
      <PageHeader metadata={pageMetadata} hideTitle={true} />

      {/* Hero Section - Beautiful Preview */}
      <section className="prose animate-fade-up -mt-18" style={{ animationDelay: '50ms' }}>
        <HeroAnimation />
      </section>

      {/* Services Section */}
      <section className="animate-fade-up" style={{ animationDelay: '100ms' }}>
        <div className="mb-6">
          <h2 className="text-sm mb-2">Services</h2>
          <div className="h-px w-12" style={{ backgroundColor: 'var(--color-border)' }}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ServiceCard
            iconName="Rocket"
            title="Driving zero to one"
            description="Turn your vision into a working product. I help founders validate ideas fast with lean, scalable MVPs that can grow with your business."
            tag="build"
            bgColor="var(--color-card)"
            borderColor="var(--color-border)"
            iconColor="var(--color-link)"
          />
          <ServiceCard
            iconName="TrendingUp"
            title="Startup Scaling"
            description="Systems that worked at 100 users break at 10,000. I architect for scale before it becomes a crisis."
            tag="scale"
            bgColor="var(--color-card)"
            borderColor="var(--color-border)"
            iconColor="var(--color-link)"
          />
          <ServiceCard
            iconName="MessageSquare"
            title="Technical Advisory"
            description="Architecture reviews, tech stack decisions, team mentorship. Sometimes the best code is the code you don't write."
            tag="consult"
            bgColor="var(--color-card)"
            borderColor="var(--color-border)"
            iconColor="var(--color-link)"
          />
        </div>
      </section>

      {/* Process Section */}
      <section className="animate-fade-up" style={{ animationDelay: '150ms' }}>
        <div className="mb-6">
          <h2 className="text-sm mb-2">Process</h2>
          <div className="h-px w-12" style={{ backgroundColor: 'var(--color-border)' }}></div>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-2">
          <ProcessStep
            number="01"
            iconName="MessageSquare"
            title="Discovery"
            description="Understand your vision, constraints, and success metrics."
          />
          <ProcessStep
            number="02"
            iconName="FileText"
            title="Proposal"
            description="Clear scope, timeline, and investment. No surprises."
          />
          <ProcessStep
            number="03"
            iconName="Code"
            title="Build"
            description="Iterative development with regular demos and feedback."
          />
          <ProcessStep
            number="04"
            iconName="Rocket"
            title="Launch"
            description="Deployment, documentation, and knowledge transfer."
            showArrow={false}
          />
        </div>
      </section>

      <hr></hr>
      {/* Stats - Compact Preview */}
      <section className="prose animate-fade-up" style={{ animationDelay: '200ms' }}>
        <div className="flex justify-center mb-6">
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            <div className="px-3 py-3 border rounded text-center" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
              <div className="text-lg md:text-xl mb-1 font-light tracking-tight" style={{ color: 'var(--color-foreground)' }}>6+</div>
              <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--code-font-family)' }}>Years</div>
            </div>
            <div className="px-3 py-3 border rounded text-center" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
              <div className="text-lg md:text-xl mb-1 font-light tracking-tight" style={{ color: 'var(--color-foreground)' }}>10+</div>
              <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--code-font-family)' }}>Projects</div>
            </div>
            <div className="px-3 py-3 border rounded text-center" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
              <div className="text-lg md:text-xl mb-1 font-light tracking-tight" style={{ color: 'var(--color-foreground)' }}>∞</div>
              <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--code-font-family)' }}>Problems</div>
            </div>
          </div>
        </div>
      </section>

      <hr></hr>
      {/* Clientele Section */}
      <section className="animate-fade-up" style={{ animationDelay: '250ms' }}>
        <div className="mb-6">
          <h2 className="text-sm mb-2">Clientele</h2>
          <div className="h-px w-12" style={{ backgroundColor: 'var(--color-border)' }}></div>
        </div>
        <ClienteleList
          clients={[
            { name: 'Acies', url: 'https://www.acies.consulting/' },
            { name: 'Codive', url: 'https://codive.co/' },
            { name: 'Freight Tiger', url: 'https://www.freighttiger.com/about/' },
            { name: 'CodeVyasa', url: 'https://www.codevyasa.com/' },
            { name: 'AbsorbX', url: 'https://www.linkedin.com/company/absorbx/' },
            { name: 'Waste Wallet' },
            { name: '7+ Independent Products' },
          ]}
        />
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA - Beautiful Minimalistic */}
      <section className="animate-fade-up" style={{ animationDelay: '300ms' }}>
        <div className="mb-6">
          <h2 className="text-sm mb-2">Let's Talk</h2>
          <div className="h-px w-12" style={{ backgroundColor: 'var(--color-border)' }}></div>
        </div>
        <p className="text-xs leading-relaxed mb-5" style={{ color: 'var(--color-muted-foreground)', fontSize: '0.7rem', lineHeight: '1.6' }}>
          Whether you're a solo founder with a napkin sketch or a team ready to scale; I'm interested in hearing about ambitious problems worth solving.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://cal.com/zhravan/1hr-discussion?overlayCalendar=true&duration=30"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-opacity hover:opacity-70"
            style={{
              color: 'var(--color-link)',
              borderBottom: 'none',
              paddingBottom: '0',
            }}
          >
            <Calendar size={16} strokeWidth={2} />
            <span className="text-xs font-medium">Schedule a meeting</span>
          </a>
          <span className="text-xs" style={{ color: 'var(--color-muted-foreground)', opacity: 0.5 }}>or</span>
          <a
            href="mailto:hi@ohmyscript.com"
            className="flex items-center gap-2 transition-opacity hover:opacity-70"
            style={{
              color: 'var(--color-link)',
              borderBottom: 'none',
              paddingBottom: '0',
            }}
          >
            <Mail size={16} strokeWidth={2} />
            <span className="text-xs font-medium">Email</span>
          </a>
        </div>
      </section>
    </div>
  );
}
