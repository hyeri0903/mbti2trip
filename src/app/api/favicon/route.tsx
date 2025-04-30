import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#296e9D',
          fontSize: 20,
          fontWeight: 700,
          color: 'white',
        }}
      >
        M2T
      </div>
    ),
    {
      width: 32,
      height: 32,
    },
  );
} 