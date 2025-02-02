<script lang="ts">
  import { 
    Download, 
    Shield, 
    Zap, 
    LayoutGrid, 
    Globe,
    Cpu,
    Github,
    Chrome,
    Terminal,
    MonitorSmartphone,
    Rocket,
    ArrowRight,
    Languages,
    Menu,
    X
  } from 'lucide-svelte';
  import { translations, type Language } from './lib/i18n/translations';
  import { currentLanguage } from './lib/i18n/LanguageStore';
  import { onMount } from 'svelte';
  import { slide, fade } from 'svelte/transition';

  let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let isMobileMenuOpen = false;
  let isScrolled = false;
  let lastScrollY = 0;
  let isHeaderVisible = true;
  let isLogoSpinning = false;
  
  onMount(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      isScrolled = currentScrollY > 0;
      isHeaderVisible = currentScrollY <= lastScrollY || currentScrollY < 50;
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const availableLanguages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'ko' as Language, name: '한국어', flag: '🇰🇷' },
    { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' },
    { code: 'zh' as Language, name: '中文', flag: '🇨🇳' },
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
    { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
    { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it' as Language, name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt' as Language, name: 'Português', flag: '🇵🇹' },
    { code: 'ru' as Language, name: 'Русский', flag: '🇷🇺' },
    { code: 'hi' as Language, name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ar' as Language, name: 'العربية', flag: '🇸🇦' },
    { code: 'tr' as Language, name: 'Türkçe', flag: '🇹🇷' },
    { code: 'vi' as Language, name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'th' as Language, name: 'ไทย', flag: '🇹🇭' }
  ];

  function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.documentElement.classList.toggle('dark', isDarkMode);
  }

  function handleLanguageChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    currentLanguage.set(select.value as Language);
    isMobileMenuOpen = false;
  }

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  function toggleLogoSpin() {
    isLogoSpinning = !isLogoSpinning;
  }

  const downloads = [
    { system: "Linux", icon: Terminal, size: "x64", url: "https://github.com/Alex313031/Thorium/releases" },
    { system: "Windows", icon: Globe, size: "x64", url: "https://github.com/Alex313031/Thorium-Win/releases" },
    { system: "MacOS", icon: Globe, size: "Universal", url: "https://github.com/Alex313031/Thorium-Mac/releases" },
    { system: "Android", icon: MonitorSmartphone, size: "arm64", url: "https://github.com/Alex313031/Thorium-Android/releases" },
    { system: "Raspberry Pi", icon: Cpu, size: "arm64", url: "https://github.com/Alex313031/Thorium-Raspi/releases" }
  ];

  const features = [
    { icon: Zap, key: 'performance' },
    { icon: Shield, key: 'security' },
    { icon: Chrome, key: 'chromium' },
    { icon: LayoutGrid, key: 'ui' },
    { icon: Cpu, key: 'platform' },
    { icon: Rocket, key: 'optimization' }
  ];

  $: t = translations[$currentLanguage];
  $: currentLang = availableLanguages.find(lang => lang.code === $currentLanguage);
</script>

<div class="min-h-screen bg-gradient-to-br from-cyan-900 via-teal-800 to-emerald-900 text-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
  <!-- Header -->
  <header 
    class="fixed w-full top-0 z-50 transition-all duration-300" 
    class:translate-y-0={isHeaderVisible} 
    class:-translate-y-full={!isHeaderVisible}
  >
    <nav class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center bg-white/5 backdrop-blur-md p-4 rounded-full border border-white/10">
        <div class="flex items-center space-x-3">
          <button 
            class="bg-gradient-to-r from-cyan-400 to-teal-400 p-2 rounded-full hover:scale-110 transition-transform duration-300"
            on:click={toggleLogoSpin}
            aria-label="Toggle logo spin"
          >
            <img 
              src="https://thorium.rocks/imgs/thorium.svg" 
              alt="Thorium Logo"
              class="w-8 h-8 {isLogoSpinning ? 'animate-spin' : ''}"
            />
          </button>
          <span class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-teal-200">
            Thorium
          </span>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6">
          <a href="#features" class="hover:text-cyan-300 transition-colors">{t.nav.features}</a>
          <a href="#download" class="hover:text-cyan-300 transition-colors">{t.nav.download}</a>
          
          <div class="relative group">
            <div class="flex items-center space-x-2 bg-white/5 hover:bg-white/10 rounded-full px-3 py-1.5 cursor-pointer transition-colors">
              <Languages size={16} class="text-cyan-300" />
              <select
                class="bg-transparent border-none text-sm font-medium focus:outline-none focus:ring-0 cursor-pointer appearance-none pr-6 py-0.5 min-w-[100px] hover:text-cyan-300 transition-colors"
                value={$currentLanguage}
                on:change={handleLanguageChange}
              >
                {#each availableLanguages as lang}
                  <option 
                    value={lang.code}
                    class="bg-gray-800 text-white py-2"
                  >
                    {lang.flag} {lang.name}
                  </option>
                {/each}
              </select>
            </div>
          </div>

          <a 
            href="https://github.com/Alex313031/Thorium" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="hover:text-cyan-300 transition-colors"
          >
            <Github size={24} />
          </a>
          
          <button 
            on:click={toggleDarkMode}
            class="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          class="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300" 
          on:click={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {#if isMobileMenuOpen}
            <X size={24} class="text-cyan-300" />
          {:else}
            <Menu size={24} class="text-cyan-300" />
          {/if}
        </button>
      </div>

      <!-- Mobile Menu -->
      {#if isMobileMenuOpen}
        <div 
          class="fixed inset-x-4 top-28 h-auto max-h-[calc(100vh-8rem)] md:hidden overflow-y-auto"
          transition:slide|local={{ duration: 300 }}
        >
          <div 
            class="bg-gradient-to-br from-cyan-900 via-teal-800 to-emerald-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
            in:fade|local={{ duration: 200, delay: 150 }}
          >
            <div class="px-4 py-4">
              <div class="flex flex-col space-y-1">
                <a 
                  href="#features" 
                  class="flex items-center space-x-3 text-base font-medium text-white hover:text-cyan-300 transition-all duration-300 p-3 rounded-xl hover:bg-white/5 active:bg-white/10 active:scale-[0.98]"
                  on:click={toggleMobileMenu}
                >
                  <div class="bg-gradient-to-r from-cyan-500/20 to-teal-500/20 p-2 rounded-lg">
                    <LayoutGrid size={18} class="text-cyan-300" />
                  </div>
                  <span>{t.nav.features}</span>
                </a>
                
                <a 
                  href="#download" 
                  class="flex items-center space-x-3 text-base font-medium text-white hover:text-cyan-300 transition-all duration-300 p-3 rounded-xl hover:bg-white/5 active:bg-white/10 active:scale-[0.98]"
                  on:click={toggleMobileMenu}
                >
                  <div class="bg-gradient-to-r from-cyan-500/20 to-teal-500/20 p-2 rounded-lg">
                    <Download size={18} class="text-cyan-300" />
                  </div>
                  <span>{t.nav.download}</span>
                </a>

                <div class="py-2 my-1 border-t border-white/10">
                  <label class="text-sm text-gray-300 mb-2 block px-3">{t.nav.selectLanguage}</label>
                  <div class="relative">
                    <select
                      class="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 appearance-none cursor-pointer transition-colors hover:bg-white/10"
                      value={$currentLanguage}
                      on:change={handleLanguageChange}
                    >
                      {#each availableLanguages as lang}
                        <option value={lang.code} class="bg-gray-800/90 py-2">
                          {lang.flag} {lang.name}
                        </option>
                      {/each}
                    </select>
                    <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg class="w-4 h-4 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div class="py-2 border-t border-white/10">
                  <a 
                    href="https://github.com/Alex313031/Thorium" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="flex items-center space-x-3 text-base font-medium text-white hover:text-cyan-300 transition-all duration-300 p-3 rounded-xl hover:bg-white/5 active:bg-white/10 active:scale-[0.98]"
                  >
                    <div class="bg-gradient-to-r from-cyan-500/20 to-teal-500/20 p-2 rounded-lg">
                      <Github size={18} class="text-cyan-300" />
                    </div>
                    <span>GitHub</span>
                  </a>
                </div>

                <div class="py-2 border-t border-white/10">
                  <button 
                    on:click={toggleDarkMode}
                    class="flex items-center space-x-3 text-base font-medium text-white hover:text-cyan-300 transition-all duration-300 w-full p-3 rounded-xl hover:bg-white/5 active:bg-white/10 active:scale-[0.98]"
                  >
                    <div class="bg-gradient-to-r from-cyan-500/20 to-teal-500/20 p-2 rounded-lg">
                      <span class="text-xl">{isDarkMode ? '🌞' : '🌙'}</span>
                    </div>
                    <span>{isDarkMode ? t.nav.lightMode : t.nav.darkMode}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </nav>
  </header>

  <!-- Main Content -->
  <main class="pt-24">
    <!-- Hero Section -->
    <section class="container mx-auto px-4 py-16 md:py-24 relative">
      <div class="absolute inset-0 bg-[url('https://thorium.rocks/imgs/thorium.svg')] opacity-5 bg-center bg-no-repeat bg-contain" />
      <div class="relative text-center max-w-4xl mx-auto">
        <div class="flex justify-center mb-8">
          <div class="bg-gradient-to-r from-cyan-400/20 to-teal-400/20 p-8 rounded-full backdrop-blur-xl">
            <img 
              src="https://thorium.rocks/imgs/thorium.svg" 
              alt="Thorium Logo"
              class="w-24 h-24 md:w-32 md:h-32 animate-pulse"
            />
          </div>
        </div>
        <h1 class="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-teal-200">
          {t.hero.title}
        </h1>
        <p class="text-lg md:text-xl text-cyan-100 mb-8 md:mb-12 leading-relaxed px-4">
          {t.hero.subtitle}
        </p>
        <div class="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
          <a
            href="#download"
            class="group w-full md:w-auto inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
          >
            <Download size={20} class="mr-2" />
            {t.hero.downloadButton}
            <ArrowRight size={20} class="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="https://github.com/Alex313031/Thorium"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full md:w-auto inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full transition-all duration-300"
          >
            <Github size={20} class="mr-2" />
            {t.hero.sourceCode}
          </a>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="relative py-16 md:py-32 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-cyan-950/50 to-transparent backdrop-blur-sm" />
      <div class="container relative mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-teal-200">
          {t.features.title}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {#each features as feature}
            <div class="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-6 md:p-8 rounded-3xl hover:scale-105 transition-all duration-300 border border-white/10 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10">
              <div class="mb-6 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 p-4 rounded-2xl inline-block">
                <div class="text-cyan-400 transform group-hover:scale-110 transition-transform duration-300">
                  <svelte:component this={feature.icon} size={32} />
                </div>
              </div>
              <h3 class="text-lg md:text-xl font-semibold mb-4">{t.features[feature.key].title}</h3>
              <p class="text-sm md:text-base text-cyan-100/90 dark:text-gray-300/90 leading-relaxed">{t.features[feature.key].description}</p>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Installation Section -->
    <section class="container mx-auto px-4 py-16 md:py-32">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-teal-200">
          {t.installation.title}
        </h2>
        <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/10">
          <p class="text-base md:text-lg mb-6 text-cyan-100">
            {t.installation.description}
          </p>
          <div class="overflow-x-auto">
            <pre class="bg-black/30 p-4 md:p-6 rounded-2xl text-sm md:text-base mb-4 font-mono border border-cyan-500/20 whitespace-pre-wrap break-words">
sudo rm -fv /etc/apt/sources.list.d/thorium.list && \
sudo wget --no-hsts -P /etc/apt/sources.list.d/ \
http://dl.thorium.rocks/debian/dists/stable/thorium.list && \
sudo apt update

sudo apt install thorium-browser</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Download Section -->
    <section id="download" class="container mx-auto px-4 py-16 md:py-32">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-12 md:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-teal-200">
          {t.download.title}
        </h2>
        <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-6 md:p-12 rounded-3xl border border-white/10">
          <p class="text-lg md:text-xl mb-8 md:mb-12 text-cyan-100">
            {t.download.version}
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {#each downloads as download}
              <a
                href={download.url}
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-center justify-center bg-gradient-to-r from-cyan-500/20 to-teal-500/20 hover:from-cyan-500/30 hover:to-teal-500/30 p-4 md:p-6 rounded-2xl transition-all duration-300 border border-white/10 hover:border-cyan-500/50 hover:scale-105"
              >
                <div class="bg-gradient-to-r from-cyan-400/20 to-teal-400/20 p-2 rounded-full mr-3">
                  <svelte:component this={download.icon} size={24} class="group-hover:scale-110 transition-transform text-cyan-300" />
                </div>
                <div class="text-left">
                  <div class="font-semibold text-base md:text-lg">{download.system}</div>
                  <div class="text-xs md:text-sm text-cyan-300/90 dark:text-gray-300/90">{download.size}</div>
                </div>
              </a>
            {/each}
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="container mx-auto px-4 py-8 md:py-12">
      <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-full p-6 md:p-8 text-center text-cyan-200/75 dark:text-gray-400/75">
        <div class="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-6 md:mb-8">
          <a 
            href="https://github.com/Alex313031/Thorium/blob/main/docs/PATCHES.md" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="hover:text-cyan-300 dark:hover:text-gray-300 transition-colors"
          >
            {t.footer.patches}
          </a>
          <span class="hidden md:inline text-cyan-500/50">•</span>
          <a 
            href="https://github.com/Alex313031/Thorium/issues" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="hover:text-cyan-300 dark:hover:text-gray-300 transition-colors"
          >
            {t.footer.issues}
          </a>
        </div>
        <p class="text-xs md:text-sm">{t.footer.copyright}</p>
      </div>
    </footer>
  </main>
</div>

<style>
  :global(html) {
    scroll-behavior: smooth;
    -webkit-tap-highlight-color: transparent;
  }
  
  :global(html.dark) {
    color-scheme: dark;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .animate-spin {
    animation: spin 2s linear infinite;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.5rem center;
    background-size: 1em;
  }

  select:focus {
    outline: none;
  }

  select option {
    margin: 0.5rem;
    padding: 0.5rem;
  }

  select:hover {
    color: rgb(103 232 249);
  }

  @media (max-width: 640px) {
    select {
      background-position: right 1rem center;
    }
  }

  /* Prevent body scroll when mobile menu is open */
  :global(body) {
    overflow-x: hidden;
  }

  /* Smooth header transition */
  header {
    transition: transform 0.3s ease-in-out;
  }

  /* Better touch targets for mobile */
  @media (max-width: 640px) {
    button, a {
      min-height: 44px;
      min-width: 44px;
    }
  }
</style>