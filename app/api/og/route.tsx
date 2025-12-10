import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'zhravan';
    const description = searchParams.get('description') || 'tinkerer, polymathic indie computer scientist, systems engineer, and data-science aficionado.';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#0f1419',
            padding: '80px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: '#d9d9d9',
                lineHeight: 1.2,
                maxWidth: '1000px',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 32,
                color: '#808080',
                lineHeight: 1.5,
                maxWidth: '900px',
              }}
            >
              {description}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '40px',
                fontSize: 28,
                color: '#b3b3b3',
              }}
            >
              zhravan.dev
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
