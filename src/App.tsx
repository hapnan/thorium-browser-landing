import React from 'react';
import { Download, Shield, Zap, Layout, Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8" />
            <span className="text-2xl font-bold">Thorium</span>
          </div>
          <div className="space-x-6">
            <a href="#features" className="hover:text-purple-300 transition-colors">기능</a>
            <a href="#download" className="hover:text-purple-300 transition-colors">다운로드</a>
          </div>
        </nav>

        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            더 빠르고 안전한 웹 브라우징을 경험하세요
          </h1>
          <p className="text-xl text-purple-200 mb-8">
            Thorium 브라우저는 크로미움 기반의 초고속 브라우저로, 
            최적화된 성능과 향상된 보안을 제공합니다.
          </p>
          <a
            href="#download"
            className="inline-flex items-center bg-purple-500 hover:bg-purple-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            <Download className="w-5 h-5 mr-2" />
            지금 다운로드
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-purple-950/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">주요 기능</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="초고속 성능"
              description="크로미움 기반 최적화로 웹페이지를 번개처럼 빠르게 로드합니다."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="강화된 보안"
              description="최신 보안 기술로 개인정보를 안전하게 보호합니다."
            />
            <FeatureCard
              icon={<Layout className="w-8 h-8" />}
              title="현대적인 인터페이스"
              description="깔끔하고 직관적인 디자인으로 편리한 사용성을 제공합니다."
            />
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div id="download" className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Thorium 브라우저 다운로드</h2>
          <div className="bg-purple-800/50 p-8 rounded-xl">
            <p className="text-lg mb-6">
              최신 버전: v1.0.0
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <DownloadButton
                system="Windows"
                size="64-bit"
                url="#"
              />
              <DownloadButton
                system="macOS"
                size="Universal"
                url="#"
              />
              <DownloadButton
                system="Linux"
                size="64-bit"
                url="#"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-purple-800/30 p-6 rounded-xl hover:bg-purple-800/40 transition-colors">
      <div className="mb-4 text-purple-400">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-purple-200">{description}</p>
    </div>
  );
}

function DownloadButton({ system, size, url }) {
  return (
    <a
      href={url}
      className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition-colors"
    >
      <Download className="w-5 h-5 mr-2" />
      <div>
        <div className="font-semibold">{system}</div>
        <div className="text-sm text-purple-300">{size}</div>
      </div>
    </a>
  );
}

export default App;