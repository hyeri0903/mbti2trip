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
          flexDirection: 'column',
          backgroundImage: 'linear-gradient(to bottom, #296e9D, #1B3A4B)',
          fontSize: 60,
          letterSpacing: -2,
          fontWeight: 700,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div style={{ fontSize: 80, marginBottom: 20 }}>MBTI to Trip</div>
          <div style={{ fontSize: 40, marginBottom: 20 }}>나만의 MBTI 여행지 찾기</div>
          <div style={{ fontSize: 30, opacity: 0.8 }}>당신의 MBTI에 맞는 해외 여행지를 추천합니다</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
} 