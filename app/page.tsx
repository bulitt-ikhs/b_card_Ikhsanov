"use client";

import Link from "next/link";
import { useEffect, useRef, ReactNode, useState } from "react";

// Компонент для анимации появления при прокрутке
function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        if (entry.isIntersecting) {
          timeoutRef.current = setTimeout(() => {
            element.classList.add("is-visible");
          }, delay);
        } else {
          element.classList.remove("is-visible");
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

// Мобильное меню
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <div
      className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Оверлей */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Меню */}
      <div
        className={`absolute top-16 right-0 w-64 bg-[var(--background)] border-l border-[var(--border)] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col p-6 gap-4">
          <Link
            href="#stack"
            onClick={onClose}
            className="text-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-2"
          >
            Стек
          </Link>
          <Link
            href="#project"
            onClick={onClose}
            className="text-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-2"
          >
            Проект
          </Link>
          <Link
            href="#contact"
            onClick={onClose}
            className="text-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-2"
          >
            Контакты
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 transition-opacity hover:opacity-80">
            <img
              src="/photo_2026-09-23_18-56-57.jpg"
              alt="Логотип"
              className="h-8 w-8 rounded-lg object-cover"
            />
            <span className="text-sm font-medium tracking-tight">
              BULAT.IKHSANOV
            </span>
          </Link>

          {/* Десктоп меню */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#stack" className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]">
              Стек
            </Link>
            <Link href="#project" className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]">
              Проект
            </Link>
            <Link href="#contact" className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]">
              Контакты
            </Link>
          </div>

          {/* Мобильная кнопка меню */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Меню"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Мобильное меню */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col justify-center px-4 sm:px-6 pt-24 pb-16 md:pt-16">
        <div className="absolute inset-0 z-0">
          <img
            src="/nRli5XhQn42B9U1te-Ox4fdj2UNZ_6j6G1HZxbCPDWyUMhTosAno210pvIqb5rco2Auq0sHUzUB5HR4gl-75xq5d.jpg"
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/0 via-[var(--background)]/0 to-[var(--background)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl w-full space-y-6 sm:space-y-8">
          <Reveal>
            <p className="mb-4 text-xs sm:text-sm text-[var(--text-secondary)] font-mono">
              Junior .NET Backend Developer · 18 лет · МЦК-КТИТС
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-tight">
              Проектирую API<br />
              <span className="text-[var(--text-secondary)]">и архитектуру баз данных</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="max-w-2xl text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              Фокус на чистом коде, производительности и масштабируемости.
              Основной стек — .NET. Так же работаю с Python, Flutter и облачными решениями.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="#contact"
                className="inline-flex h-11 sm:h-12 items-center justify-center rounded-lg bg-[var(--text-primary)] px-6 sm:px-8 text-sm font-medium text-[var(--background)] transition-colors hover:bg-[var(--accent)] hover:text-white"
              >
                Связаться
              </Link>
              <Link
                href="https://github.com/bulitt-ikhs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 sm:h-12 items-center justify-center rounded-lg border border-[var(--border)] bg-transparent px-6 sm:px-8 text-sm font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                GitHub
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stack Section */}
      <section id="stack" className="border-t border-[var(--border)] py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="mb-8 sm:mb-16 text-2xl sm:text-3xl font-semibold tracking-tight">Технический стек</h2>
          </Reveal>

          <div className="grid gap-12 md:gap-16 md:grid-cols-2">
            <Reveal delay={100}>
              <div className="space-y-6">
                <h3 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                  Основной
                </h3>
                <ul className="space-y-3">
                  {["C# / .NET 8", "ASP.NET Core WebAPI", "Entity Framework Core", "PostgreSQL / MS SQL", "Docker", "Git / GitHub", "Blazor"].map((skill) => (
                    <li key={skill} className="flex items-center gap-3 text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="space-y-6">
                <h3 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                  Дополнительно
                </h3>
                <ul className="space-y-3">
                  {["Python (FastAPI)", "Flutter (Mobile)", "Yandex Cloud (S3)", "AWS SDK", "RESTful Architecture", "JWT Authentication"].map((skill) => (
                    <li key={skill} className="flex items-center gap-3 text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-secondary)]" />
                      {skill}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-lg border border-[var(--border)] p-4 sm:p-6 transition-colors hover:border-[var(--accent)]/30">
                  <h4 className="mb-2 text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                    Английский
                  </h4>
                  <p className="text-sm text-[var(--text-primary)]">
                    A2 Technical. Чтение документации, работа с AI-инструментами.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Project Section */}
      <section id="project" className="border-t border-[var(--border)] py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="mb-8 sm:mb-16 text-2xl sm:text-3xl font-semibold tracking-tight">Пример работы</h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-lg border border-[var(--border)] p-6 sm:p-8 md:p-12 transition-all duration-300 hover:border-[var(--accent)]/50 hover:bg-[var(--card)]/50">
              <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                  Backend для мобильного видеохостинга
                </h3>
                <Link
                  href="https://github.com/bulitt-ikhs/IndividualWorkAPIv2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--text-secondary)] underline decoration-[var(--border)] underline-offset-4 transition-colors hover:text-[var(--text-primary)] hover:decoration-[var(--text-primary)] whitespace-nowrap"
                >
                  Исходный код →
                </Link>
              </div>

              <p className="mb-6 sm:mb-8 max-w-3xl text-[var(--text-secondary)] leading-relaxed">
                REST API на <span className="text-[var(--text-primary)] font-medium">ASP.NET Core WebAPI</span> для мобильного приложения на Flutter.
                Безопасная аутентификация, управление метаданными видео, интеграция с{" "}
                <span className="text-[var(--text-primary)] font-medium">Yandex Object Storage</span> через AWS SDK для хранения пользовательского контента.
              </p>

              <div className="flex flex-wrap gap-2 border-t border-[var(--border)] pt-6">
                {["C#", "Entity Framework", "PostgreSQL", "AWS SDK", "S3 API", "Docker"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-[var(--border)] px-3 py-1.5 text-xs sm:text-sm text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)]/50 hover:text-[var(--text-primary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 sm:mt-8 text-center text-sm text-[var(--text-secondary)]">
              Также pet-проект на базе{" "}
              <Link
                href="https://github.com/unidoka/g-docs-any-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-primary)] underline decoration-[var(--border)] underline-offset-4 transition-colors hover:decoration-[var(--text-primary)]"
              >
                Unidoka
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="border-t border-[var(--border)] py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="mb-8 sm:mb-16 text-2xl sm:text-3xl font-semibold tracking-tight">Контакты</h2>
          </Reveal>

          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Telegram", value: "@bulat_ikhs", href: "https://t.me/bulat_ikhs" },
              { label: "Email", value: "ikhsanovbulitt@icloud.com", href: "mailto:ikhsanovbulitt@icloud.com" },
              { label: "GitHub", value: "bulitt-ikhs", href: "https://github.com/bulitt-ikhs" },
              { label: "GitHub (pet)", value: "lfiddd", href: "https://github.com/lfiddd" },
              {
                label: "Быстрая связь",
                value: "Написать мне →",
                href: "https://t.me/bulat_ikhs",
                isPrimary: true,
              },
              { label: "VK", value: "bulat_ikhs", href: "https://vk.ru/bulat_ikhs" },
            ].map((contact, index) => (
              <Reveal key={contact.label} delay={100 + index * 100}>
                {contact.isPrimary ? (
                  <Link
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center justify-center rounded-lg border border-[var(--accent)]/20 bg-[var(--accent)]/5 p-4 sm:p-6 text-center transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)]/10"
                  >
                    <span className="mb-2 block text-xs font-medium text-[var(--accent)] uppercase tracking-wider">
                      {contact.label}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                      {contact.value}
                    </span>
                  </Link>
                ) : (
                  <Link
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-lg border border-[var(--border)] p-4 sm:p-6 transition-all duration-300 hover:border-[var(--accent)]/50 hover:bg-[var(--card)]/50"
                  >
                    <span className="mb-2 block text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                      {contact.label}
                    </span>
                    <span className="text-sm text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                      {contact.value}
                    </span>
                  </Link>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-6 sm:py-8 px-4 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--text-secondary)]">
          <p>© {new Date().getFullYear()} Булат Ихсанов</p>
          <p className="font-mono text-xs">Next.js + Tailwind CSS</p>
        </div>
      </footer>
    </main>
  );
}
