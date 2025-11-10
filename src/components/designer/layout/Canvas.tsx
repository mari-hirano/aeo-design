"use client";

import React from 'react';
import { usePages } from '@/context/PagesContext';

const Canvas: React.FC = () => {
  const { selectedPage } = usePages();

  // Custom design system (inline) — intentionally not using existing components or theme variables
  const [viewportWidth, setViewportWidth] = React.useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1280);
  React.useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const isMobile = viewportWidth < 640;
  const isTablet = viewportWidth >= 640 && viewportWidth < 960;
  const palette = {
    bg: '#F6F8FC',
    text: '#0B1220',
    textMuted: '#5C6470',
    primary: '#4F46E5',
    primaryAlt: '#22D3EE',
    cardBg: '#FFFFFF',
    cardStroke: '#E8ECF3',
    accent: '#F59E0B',
    danger: '#EF4444'
  };

  const containerStyle: React.CSSProperties = React.useMemo(() => ({
    maxWidth: 1120,
    margin: '0 auto',
    padding: isMobile ? '0 16px' : '0 24px'
  }), [isMobile]);

  const badge = (text: string, color: string) => (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 10px',
        fontSize: 12,
        letterSpacing: 0.2,
        borderRadius: 0,
        background: 'transparent',
        border: `1px solid ${color}`,
        color
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: 6,
          height: 6,
          borderRadius: 0,
          background: color
        }}
      />
      {text}
    </span>
  );

  const GlassCard: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
    <div
      style={{
        background: palette.cardBg,
        border: `1px solid ${palette.cardStroke}`,
        borderRadius: 0,
        boxShadow: 'none',
        ...style
      }}
    >
      {children}
          </div>
        );

  const Nav: React.FC = () => (
    <div
      style={{
        position: 'relative',
        background: '#FFFFFF',
        borderBottom: `1px solid ${palette.cardStroke}`
      }}
    >
      <div style={{ ...containerStyle, display: 'flex', alignItems: 'center', height: 64 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
                  style={{ 
              width: 28,
              height: 28,
              borderRadius: 0,
              background: palette.primary
            }}
          />
          <span style={{ fontWeight: 700, letterSpacing: 0.4, fontSize: 16 }}>Aether</span>
              </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
          <a style={{ color: palette.textMuted, textDecoration: 'none', fontSize: 14 }} href="#">Product</a>
          <a style={{ color: palette.textMuted, textDecoration: 'none', fontSize: 14 }} href="#">Solutions</a>
          <a style={{ color: palette.textMuted, textDecoration: 'none', fontSize: 14 }} href="#">Pricing</a>
          <a style={{ color: palette.textMuted, textDecoration: 'none', fontSize: 14 }} href="#">Resources</a>
          <div
                  style={{ 
              height: 28,
              width: 1,
              background: palette.cardStroke,
              margin: '0 6px'
            }}
          />
          <button
            style={{
              color: palette.text,
              fontSize: 14,
              background: 'transparent',
              border: `1px solid ${palette.cardStroke}`,
              padding: '8px 12px',
              borderRadius: 0,
              cursor: 'pointer'
            }}
          >
            Sign in
          </button>
          <button
            style={{
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: 14,
              background: palette.primary,
              border: 'none',
              padding: '10px 14px',
              borderRadius: 0,
              cursor: 'pointer'
            }}
          >
            Get started
          </button>
        </div>
      </div>
              </div>
  );

  const Hero: React.FC = () => {
    const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 10, height: 10, borderRadius: 0, background: palette.primary }} />
        <div>
          <div style={{ fontSize: 12, color: palette.textMuted, letterSpacing: 0.3, textTransform: 'uppercase' }}>{label}</div>
          <div style={{ fontSize: 14 }}>{value}</div>
        </div>
      </div>
    );

    const Tile: React.FC<{ color: string }> = ({ color }) => (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: color,
          borderRadius: 0
        }}
      />
    );

    const Mosaic = () => {
      const c = {
        yellow: '#FCD34D',
        navy: '#122B57',
        blue: '#93C5FD',
        teal: '#34D399',
        orange: '#FB923C'
      };
      return (
        <div
                  style={{ 
            display: 'grid',
            gridTemplateColumns: `repeat(6, ${isMobile ? 34 : isTablet ? 48 : 56}px)`,
            gridTemplateRows: `repeat(6, ${isMobile ? 34 : isTablet ? 48 : 56}px)`,
            gap: isMobile ? 8 : 10
          }}
        >
          <Tile color={c.yellow} />
          <Tile color="#fff" />
          <Tile color={c.navy} />
          <Tile color={c.blue} />
          <Tile color={c.yellow} />
          <Tile color={c.orange} />

          <Tile color={c.navy} />
          <Tile color={c.yellow} />
          <Tile color={c.blue} />
          <Tile color={c.teal} />
          <Tile color={c.orange} />
          <Tile color={c.navy} />

          <Tile color={c.blue} />
          <Tile color={c.navy} />
          <Tile color="#fff" />
          <Tile color={c.yellow} />
          <Tile color={c.teal} />
          <Tile color={c.orange} />

          <Tile color={c.orange} />
          <Tile color={c.teal} />
          <Tile color={c.navy} />
          <Tile color={c.blue} />
          <Tile color={c.yellow} />
          <Tile color={c.navy} />

          <Tile color={c.blue} />
          <Tile color={c.yellow} />
          <Tile color={c.orange} />
          <Tile color={c.teal} />
          <Tile color={c.navy} />
          <Tile color={c.blue} />

          <Tile color={c.navy} />
          <Tile color={c.orange} />
          <Tile color={c.blue} />
          <Tile color={c.yellow} />
          <Tile color={c.teal} />
          <Tile color={c.orange} />
              </div>
      );
    };

    return (
      <div
        style={{
          position: 'relative',
          padding: isMobile ? '40px 0 24px' : '64px 0 40px'
        }}
      >
        <div style={containerStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: isMobile ? 20 : 32, alignItems: 'center' }}>
            {/* Left text block */}
            <div>
              {badge('Live session', palette.accent)}
              <h1
                style={{
                  margin: '12px 0 12px',
                  fontSize: isMobile ? 34 : isTablet ? 44 : 56,
                  lineHeight: 1.06,
                  letterSpacing: -0.6
                }}
              >
                Collaborate easier between teams to get the best of the platform.
              </h1>
              <div
                style={{ 
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0,1fr))',
                  gap: isMobile ? 12 : 16,
                  marginTop: 18
                }}
              >
                <InfoItem label="Location" value="Amsterdam, Netherlands" />
                <InfoItem label="Date" value="November 17th, 2025" />
                <InfoItem label="Time" value="10:00am (PST)" />
              </div>
            </div>
            {/* Right mosaic */}
            <div style={{ justifySelf: isMobile ? 'start' : 'end' }}>
              <Mosaic />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const FeatureCard: React.FC<{ title: string; desc: string; tag?: string }> = ({ title, desc, tag }) => (
    <GlassCard style={{ padding: 20 }}>
      {tag && <div style={{ marginBottom: 12 }}>{badge(tag, palette.primary)}</div>}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 0,
            background: palette.primary
          }}
        />
        <h3 style={{ margin: 0, fontSize: 18 }}>{title}</h3>
      </div>
      <p style={{ margin: 0, color: palette.textMuted, fontSize: 14, lineHeight: 1.6 }}>{desc}</p>
    </GlassCard>
  );

  const Features: React.FC = () => (
    <div style={{ padding: '8px 0 56px' }}>
      <div style={containerStyle}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: isMobile ? 12 : 18
          }}
        >
          <FeatureCard title="Creative-first canvas" desc="Design with a fluid composition surface that never boxes you in." tag="Design" />
          <FeatureCard title="Motion made simple" desc="Keyframe anything. Timeline controls and presets speed up iteration." tag="Animate" />
          <FeatureCard title="Data-aware blocks" desc="Connect your content, ship faster, keep everything in sync." tag="CMS" />
          <FeatureCard title="Collab live" desc="Share links, review comments, and ship together." />
          <FeatureCard title="Ship anywhere" desc="Export clean code or publish to our global edge network." />
          <FeatureCard title="Plugins API" desc="Extend the editor and automate your workflow with a modern API." />
        </div>
            </div>
          </div>
        );

  const Showcase: React.FC = () => (
    <div style={{ padding: '16px 0 72px' }}>
      <div style={containerStyle}>
        <h2 style={{ margin: '0 0 16px', fontSize: 28 }}>Recent work</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isTablet || isMobile ? '1fr' : '2fr 1fr',
            gap: isMobile ? 12 : 16
          }}
        >
          <GlassCard>
            <div
              style={{
                height: 320,
                borderRadius: 0,
                background: '#EEF2FF',
                border: `1px solid ${palette.cardStroke}`
              }}
            />
            <div style={{ padding: 16, borderTop: `1px solid ${palette.cardStroke}` }}>
              <strong>Nova Agency</strong>
              <div style={{ color: palette.textMuted, fontSize: 14, marginTop: 4 }}>Brand, Web, Motion</div>
            </div>
          </GlassCard>
          <div style={{ display: 'grid', gap: isMobile ? 12 : 16 }}>
            <GlassCard>
              <div style={{ height: 150, borderRadius: 0, background: '#E0F2FE' }} />
              <div style={{ padding: 16, borderTop: `1px solid ${palette.cardStroke}` }}>
                <strong>Kairo Studio</strong>
                <div style={{ color: palette.textMuted, fontSize: 14, marginTop: 4 }}>Ecomm, Brand</div>
              </div>
            </GlassCard>
            <GlassCard>
              <div style={{ height: 150, borderRadius: 0, background: '#F3E8FF' }} />
              <div style={{ padding: 16, borderTop: `1px solid ${palette.cardStroke}` }}>
                <strong>Orbit Labs</strong>
                <div style={{ color: palette.textMuted, fontSize: 14, marginTop: 4 }}>Product, Web</div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );

  const Testimonial: React.FC = () => (
    <div style={{ padding: '12px 0 72px' }}>
      <div style={containerStyle}>
        <GlassCard style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? 12 : 20, padding: isMobile ? 16 : 24 }}>
          <div>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 0,
                background: palette.primary,
                marginBottom: 12
              }}
            />
            <div style={{ fontWeight: 700 }}>Alex Rivera</div>
            <div style={{ color: palette.textMuted, fontSize: 14 }}>Creative Director, Orbit</div>
          </div>
          <div>
            <div style={{ fontSize: 18, lineHeight: 1.6 }}>
              “Aether lets our team ideate, animate, and deliver in one flow. It feels like the tool gets out of the way
              and the craft takes over.”
            </div>
          </div>
        </GlassCard>
            </div>
          </div>
        );

  const CTA: React.FC = () => (
    <div style={{ padding: '12px 0 80px' }}>
      <div style={containerStyle}>
        <GlassCard style={{ padding: isMobile ? 16 : 28, display: 'flex', alignItems: isMobile ? 'stretch' : 'center', justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 12 : 0 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: 0.2, marginBottom: 6 }}>Ready to build?</div>
            <div style={{ color: palette.textMuted, fontSize: 14 }}>Start free. No credit card required.</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
                style={{ 
                color: '#FFFFFF',
                fontWeight: 700,
                background: palette.primary,
                border: 'none',
                padding: '12px 16px',
                borderRadius: 0,
                cursor: 'pointer'
              }}
            >
              Create account
            </button>
              <button 
                style={{ 
                color: palette.text,
                background: 'transparent',
                border: `1px solid ${palette.cardStroke}`,
                padding: '12px 16px',
                borderRadius: 0,
                cursor: 'pointer'
              }}
            >
              Talk to sales
              </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );

  const Footer: React.FC = () => (
    <div
      style={{
        padding: '32px 0',
        borderTop: `1px solid ${palette.cardStroke}`
      }}
    >
      <div style={{ ...containerStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ color: palette.textMuted, fontSize: 14 }}>© 2025 Aether Inc.</div>
        <div style={{ display: 'flex', gap: 14 }}>
          <a href="#" style={{ color: palette.textMuted, textDecoration: 'none', fontSize: 14 }}>Privacy</a>
          <a href="#" style={{ color: palette.textMuted, textDecoration: 'none', fontSize: 14 }}>Terms</a>
          <a href="#" style={{ color: palette.textMuted, textDecoration: 'none', fontSize: 14 }}>Status</a>
        </div>
      </div>
    </div>
  );

  const HomePage = () => (
    <>
      <Nav />
      <Hero />
      <Features />
      <Showcase />
      <Testimonial />
      <CTA />
      <Footer />
    </>
  );

  const ContactPage = () => (
    <>
      <Nav />
      <div style={{ ...containerStyle, padding: '72px 0' }}>
        <h1 style={{ margin: 0, fontSize: 40, letterSpacing: -0.2 }}>Contact us</h1>
        <p style={{ color: palette.textMuted, marginTop: 10, maxWidth: 560 }}>
          We’d love to hear from you. Fill out the form and our team will get back to you within 2 business days.
        </p>
        <GlassCard style={{ marginTop: 20, padding: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: palette.textMuted, marginBottom: 6 }}>First name</label>
              <input style={{ width: '100%', padding: 12, borderRadius: 0, border: `1px solid ${palette.cardStroke}`, background: palette.cardBg, color: palette.text }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: palette.textMuted, marginBottom: 6 }}>Last name</label>
              <input style={{ width: '100%', padding: 12, borderRadius: 0, border: `1px solid ${palette.cardStroke}`, background: palette.cardBg, color: palette.text }} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: 12, color: palette.textMuted, marginBottom: 6 }}>Email</label>
              <input type="email" style={{ width: '100%', padding: 12, borderRadius: 0, border: `1px solid ${palette.cardStroke}`, background: palette.cardBg, color: palette.text }} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: 12, color: palette.textMuted, marginBottom: 6 }}>Message</label>
              <textarea rows={6} style={{ width: '100%', padding: 12, borderRadius: 0, border: `1px solid ${palette.cardStroke}`, background: palette.cardBg, color: palette.text }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
            <button 
              style={{ 
                color: '#FFFFFF',
                fontWeight: 700,
                background: palette.primary,
                border: 'none',
                padding: '12px 16px',
                borderRadius: 0,
                cursor: 'pointer'
              }}
            >
              Send message
            </button>
          </div>
        </GlassCard>
      </div>
      <Footer />
    </>
  );

  const StylesDraftPage = () => (
    <>
      <Nav />
      <div style={{ ...containerStyle, padding: '72px 0' }}>
        <h1 style={{ margin: 0, fontSize: 40 }}>[Draft] Styles</h1>
        <p style={{ color: palette.textMuted, marginTop: 10 }}>Exploring tones, gradients, and surfaces.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14, marginTop: 20 }}>
          {['#122B57','#1B2E63','#26437A','#2E528F','#3B67A8','#4D7DC1'].map((c, i) => (
            <div key={i} style={{ height: 80, borderRadius: 0, background: c }} />
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 20 }}>
          <GlassCard style={{ height: 180, background: '#DBEAFE' }} />
          <GlassCard style={{ height: 180, background: '#FDE68A' }} />
          <GlassCard style={{ height: 180, background: '#FCA5A5' }} />
        </div>
      </div>
      <Footer />
    </>
  );

  const TestimonialsPage = () => (
    <>
      <Nav />
      <div style={{ ...containerStyle, padding: '72px 0' }}>
        <h1 style={{ margin: 0, fontSize: 40 }}>Testimonials</h1>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 18, marginTop: 20 }}>
          {[1,2,3,4].map((i) => (
            <GlassCard key={i} style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 0, background: palette.primary }} />
                <div>
                  <div style={{ fontWeight: 700 }}>Customer {i}</div>
                  <div style={{ color: palette.textMuted, fontSize: 12 }}>Founder, Studio {i}</div>
                </div>
              </div>
              <div style={{ fontSize: 16, lineHeight: 1.6 }}>
                “Aether helped us launch faster than ever. The motion tools are a game changer.”
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );

  const PasswordPage = () => (
    <>
      <Nav />
      <div style={{ ...containerStyle, padding: '96px 0', display: 'flex', justifyContent: 'center' }}>
        <GlassCard style={{ padding: 28, width: 420 }}>
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 54,
                height: 54,
                margin: '0 auto 8px',
                borderRadius: 0,
                background: palette.accent
              }}
            />
            <h2 style={{ margin: '6px 0 0' }}>Enter password</h2>
            <p style={{ color: palette.textMuted, margin: '6px 0 16px' }}>This page is protected.</p>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: palette.textMuted, marginBottom: 6 }}>Password</label>
            <input type="password" style={{ width: '100%', padding: 12, borderRadius: 0, border: `1px solid ${palette.cardStroke}`, background: palette.cardBg, color: palette.text }} />
          </div>
          <button
            style={{
              marginTop: 14,
              width: '100%',
              color: '#FFFFFF',
              fontWeight: 700,
              background: palette.primary,
              border: 'none',
              padding: '12px 16px',
              borderRadius: 0,
              cursor: 'pointer'
            }}
          >
            Continue
          </button>
        </GlassCard>
      </div>
      <Footer />
    </>
  );

  const NotFoundPage = () => (
    <>
      <Nav />
      <div style={{ ...containerStyle, padding: '120px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 80, fontWeight: 800, letterSpacing: -2, marginBottom: 8, color: '#ffffff' }}>404</div>
        <div style={{ color: palette.textMuted, marginBottom: 20 }}>The page you’re looking for doesn’t exist.</div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <a
            href="#"
            style={{
              color: '#FFFFFF',
              fontWeight: 700,
              background: palette.primary,
              border: 'none',
              padding: '12px 16px',
              borderRadius: 0,
              textDecoration: 'none'
            }}
          >
            Go home
          </a>
          <a
            href="#"
            style={{
              color: palette.text,
              background: 'transparent',
              border: `1px solid ${palette.cardStroke}`,
              padding: '12px 16px',
              borderRadius: 0,
              textDecoration: 'none'
            }}
          >
            Contact support
          </a>
        </div>
      </div>
      <Footer />
    </>
  );

  const renderPageContent = () => {
    switch (selectedPage) {
      case '/':
        return <HomePage />;
      case '/contact':
        return <ContactPage />;
      case '/styles':
        return <StylesDraftPage />;
      case '/testimonials':
        return <TestimonialsPage />;
      case '/password':
        return <PasswordPage />;
      case '/404':
        return <NotFoundPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-auto"
      style={{ 
        backgroundColor: palette.bg,
        color: palette.text,
        fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, sans-serif'
      }}
    >
      {renderPageContent()}
    </div>
  );
};

export default Canvas; 