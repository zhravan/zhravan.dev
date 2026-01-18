import { ImageResponse } from 'next/og';
import { getContentTypeById } from '@/lib/content-types';
import { getContentForType, getContentBySlug } from '@/lib/content';

export const alt = 'Talk';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export async function generateStaticParams() {
  const contentTypeObj = getContentTypeById('talks');
  if (!contentTypeObj) return [];
  
  const allItems = getContentForType(contentTypeObj, false);
  return allItems.map((item) => ({
    slug: item.slug,
  }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const contentTypeObj = getContentTypeById('talks');
  const talk = contentTypeObj ? getContentBySlug(contentTypeObj, slug, true) : null;

  const title = talk?.title || 'Talk';
  const description = talk?.description || '';
  const tags = talk?.tags?.slice(0, 3) || [];

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#0a0a0a',
          padding: '60px 80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top section with branding */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #22d3ee 0%, #0891b2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              S
            </div>
            <span
              style={{
                fontSize: '24px',
                color: '#a1a1aa',
                fontWeight: '500',
              }}
            >
              ohmyscript.com
            </span>
          </div>
          <span
            style={{
              fontSize: '18px',
              color: '#71717a',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            Talk
          </span>
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            maxWidth: '100%',
          }}
        >
          <h1
            style={{
              fontSize: title.length > 60 ? '48px' : '56px',
              fontWeight: 'bold',
              color: '#fafafa',
              lineHeight: 1.2,
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              style={{
                fontSize: '24px',
                color: '#a1a1aa',
                lineHeight: 1.4,
                margin: 0,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                maxWidth: '900px',
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Bottom section with tags */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          {tags.map((tag, index) => (
            <span
              key={index}
              style={{
                fontSize: '16px',
                color: '#22d3ee',
                backgroundColor: 'rgba(34, 211, 238, 0.1)',
                padding: '8px 16px',
                borderRadius: '9999px',
                border: '1px solid rgba(34, 211, 238, 0.2)',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Gradient accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #22d3ee 0%, #0891b2 50%, #0e7490 100%)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
