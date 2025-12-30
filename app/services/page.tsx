import { PageHeader } from '@/components/PageHeader';
import { getPageMetadata } from '@/lib/seo';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import { HeroAnimation } from '@/components/HeroAnimation';
import { ServiceCard } from '@/components/ServiceCard';
import { ProcessStep } from '@/components/ProcessStep';
import { FAQSection } from '@/components/FAQSection';
import { ClienteleList } from '@/components/ClienteleList';
import { AnimatedCounter } from '@/components/AnimatedCounter';
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
    <div className="space-y-12 text-xxs">
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
        <div className="mb-8">
          <h2 className="text-base mb-2 font-semibold">Services</h2>
          <div className="h-px w-12" style={{ backgroundColor: 'var(--color-border)' }}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ServiceCard
            iconName="Rocket"
            title="Zero to One"
            description="Build MVPs fast. Validate ideas. Scale."
            tag="build"
            bgColor="var(--color-card)"
            borderColor="var(--color-border)"
            iconColor="var(--color-link)"
          />
          <ServiceCard
            iconName="TrendingUp"
            title="Scaling"
            description="Architect for growth. Before it breaks."
            tag="scale"
            bgColor="var(--color-card)"
            borderColor="var(--color-border)"
            iconColor="var(--color-link)"
          />
          <ServiceCard
            iconName="MessageSquare"
            title="Advisory"
            description="Architecture. Tech decisions. Mentorship."
            tag="consult"
            bgColor="var(--color-card)"
            borderColor="var(--color-border)"
            iconColor="var(--color-link)"
          />
        </div>
      </section>


      {/* Process Section */}
      <section className="animate-fade-up" style={{ animationDelay: '150ms' }}>
        <div className="mb-8">
          <h2 className="text-base mb-2 font-semibold">Process</h2>
          <div className="h-px w-12" style={{ backgroundColor: 'var(--color-border)' }}></div>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-2">
          <ProcessStep
            number="01"
            iconName="MessageSquare"
            title="Discovery"
          />
          <ProcessStep
            number="02"
            iconName="FileText"
            title="Proposal"
          />
          <ProcessStep
            number="03"
            iconName="Code"
            title="Iteratively Build"
          />
          <ProcessStep
            number="04"
            iconName="Rocket"
            title="Launch"
            showArrow={false}
          />
        </div>
      </section>

      {/* Stats - Compact Preview */}
      <section className="prose animate-fade-up" style={{ animationDelay: '200ms' }}>
        <div className="mb-8">
          <h2 className="text-base mb-2 font-semibold">Experience</h2>
          <div className="h-px w-12 mb-6" style={{ backgroundColor: 'var(--color-border)' }}></div>
        </div>
        <div className="flex justify-center mb-6">
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            <div className="px-3 py-3 border rounded text-center" style={{ borderColor: 'rgba(0, 0, 0, 0.2)', borderWidth: '1px', backgroundColor: 'var(--color-card)' }}>
              <div className="text-lg md:text-xl mb-1 font-light tracking-tight" style={{ color: 'var(--color-foreground)' }}>
                <AnimatedCounter end={6} duration={2000} suffix="+" />
              </div>
              <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--code-font-family)' }}>Years</div>
            </div>
            <div className="px-3 py-3 border rounded text-center" style={{ borderColor: 'rgba(0, 0, 0, 0.2)', borderWidth: '1px', backgroundColor: 'var(--color-card)' }}>
              <div className="text-lg md:text-xl mb-1 font-light tracking-tight" style={{ color: 'var(--color-foreground)' }}>
                <AnimatedCounter end={10} duration={2500} suffix="+" />
              </div>
              <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--code-font-family)' }}>Projects</div>
            </div>
            <div className="px-3 py-3 border rounded text-center" style={{ borderColor: 'rgba(0, 0, 0, 0.2)', borderWidth: '1px', backgroundColor: 'var(--color-card)' }}>
              <div className="text-lg md:text-xl mb-1 font-light tracking-tight" style={{ color: 'var(--color-foreground)' }}>
                <AnimatedCounter infinity={true} />
              </div>
              <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--code-font-family)' }}>Problems</div>
            </div>
          </div>
        </div>
      </section>


      {/* Clientele Section */}
      <section className="animate-fade-up" style={{ animationDelay: '250ms' }}>
        <div className="mb-8">
          <h2 className="text-base mb-2 font-semibold">Clients</h2>
          <div className="h-px w-12" style={{ backgroundColor: 'var(--color-border)' }}></div>
        </div>
        <ClienteleList
          clients={[
            { name: 'AbsorbX', url: 'https://www.linkedin.com/company/absorbx/', status: 'active' },
            { name: 'Acies', url: 'https://www.acies.consulting/', status: 'past' },
            { name: 'CodeVyasa', url: 'https://www.codevyasa.com/', status: 'past' },
            { name: 'Codive', url: 'https://codive.co/', status: 'past' },
            { name: 'Freight Tiger', url: 'https://www.freighttiger.com/about/', status: 'past' },
            { name: 'Furrever', url: 'https://furrever.io/', status: 'active' },
            { name: 'Waste Wallet', status: 'active' },
          ]}
        />
      </section>

      {/* FAQ Section */}
      <FAQSection />
      
      {/* CTA - Beautiful Minimalistic */}
      <section className="animate-fade-up" style={{ animationDelay: '300ms' }}>
        <div className="mb-8">
          <h2 className="text-base mb-2 font-semibold">Let's Talk</h2>
          <div className="h-px w-12" style={{ backgroundColor: 'var(--color-border)' }}></div>
        </div>
        <div className="flex flex-wrap items-center gap-4 mb-6">
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
            <Calendar size={18} strokeWidth={2} />
            <span className="text-sm font-semibold">Schedule a meeting</span>
          </a>
          <a
            href="mailto:hi@ohmyscript.com"
            className="flex items-center gap-2 transition-all duration-200 hover:opacity-100 email-link-hover"
            style={{
              color: 'var(--color-muted-foreground)',
              borderBottom: 'none',
              paddingBottom: '0',
              opacity: 0.7,
            }}
          >
            <Mail size={18} strokeWidth={2} />
            <span className="text-sm">Email</span>
          </a>
        </div>
      </section>
    </div>
  );
}
