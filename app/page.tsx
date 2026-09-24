"use client";

import Link from "next/link";
import { useEffect, useRef, ReactNode } from "react";

// Компонент для анимации появления/исчезновения при каждой прокрутке
function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Сбрасываем предыдущий таймер, чтобы не было конфликтов
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        if (entry.isIntersecting) {
          // Элемент появился — добавляем класс с задержкой
          timeoutRef.current = setTimeout(() => {
            element.classList.add("is-visible");
          }, delay);
        } else {
          // Элемент ушёл — сразу убираем класс (без задержки, чтобы исчезновение было мгновенным при свайпе вверх)
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

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <img 
              src="/photo_2026-09-23_18-56-57.jpg" 
              alt="Логотип" 
              className="h-8 w-8 rounded-lg object-cover"
            />
            <span className="text-sm font-medium tracking-tight">
              BULAT.IKHSANOV
            </span>
          </Link>
          <div className="flex items-center gap-8">
            <Link href="#stack" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Стек
            </Link>
            <Link href="#project" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Проект
            </Link>
            <Link href="#contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Контакты
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col justify-center px-6 pt-16">
        <div className="absolute inset-0 z-0">
          <img
            src="/nRli5XhQn42B9U1te-Ox4fdj2UNZ_6j6G1HZxbCPDWyUMhTosAno210pvIqb5rco2Auq0sHUzUB5HR4gl-75xq5d.jpg"
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl w-full space-y-8">
          <Reveal>
            <p className="mb-4 text-sm text-muted-foreground font-mono">
              Junior .NET Backend Developer · 18 лет · МЦК-КТИТС
            </p>
          </Reveal>
          
          <Reveal delay={100}>
            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl lg:text-8xl">
              Проектирую API<br />
              <span className="text-muted-foreground">и архитектуру баз данных</span>
            </h1>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Фокус на чистом коде, производительности и масштабируемости. 
              Основной стек — .NET. Так же работаю с Python, Flutter и облачными решениями.
            </p>
          </Reveal>
          
          <Reveal delay={300}>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#contact"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Связаться
              </Link>
              <Link
                href="https://github.com/bulitt-ikhs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-transparent px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                GitHub
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stack Section */}
      <section id="stack" className="border-t border-border py-32 px-6">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="mb-16 text-3xl font-semibold tracking-tight">Технический стек</h2>
          </Reveal>
          
          <div className="grid gap-16 md:grid-cols-2">
            <Reveal delay={100}>
              <div className="space-y-6">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Основной
                </h3>
                <ul className="space-y-3">
                  {["C# / .NET 8", "ASP.NET Core WebAPI", "Entity Framework Core", "PostgreSQL / MS SQL", "Docker", "Git / GitHub", "Blazor"].map((skill) => (
                    <li key={skill} className="flex items-center gap-3 text-foreground transition-colors hover:text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <div className="space-y-6">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Дополнительно
                </h3>
                <ul className="space-y-3">
                  {["Python (FastAPI)", "Flutter (Mobile)", "Yandex Cloud (S3)", "AWS SDK", "RESTful Architecture", "JWT Authentication"].map((skill) => (
                    <li key={skill} className="flex items-center gap-3 text-foreground transition-colors hover:text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                      {skill}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 rounded-lg border border-border p-6 transition-colors hover:border-primary/30">
                  <h4 className="mb-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Английский
                  </h4>
                  <p className="text-sm text-foreground">
                    A2 Technical. Чтение документации, работа с AI-инструментами.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Project Section */}
      <section id="project" className="border-t border-border py-32 px-6">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="mb-16 text-3xl font-semibold tracking-tight">Пример работы</h2>
          </Reveal>
          
          <Reveal delay={100}>
            <div className="rounded-lg border border-border p-8 md:p-12 transition-all duration-300 hover:border-primary/50 hover:bg-accent/5">
              <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
                <h3 className="text-2xl font-semibold md:text-3xl">
                  Backend для мобильного видеохостинга
                </h3>
                <Link
                  href="https://github.com/bulitt-ikhs/IndividualWorkAPIv2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
                >
                  Исходный код →
                </Link>
              </div>
              
              <p className="mb-8 max-w-3xl text-muted-foreground leading-relaxed">
                REST API на <span className="text-foreground font-medium">ASP.NET Core WebAPI</span> для мобильного приложения на Flutter. 
                Безопасная аутентификация, управление метаданными видео, интеграция с{" "}
                <span className="text-foreground font-medium">Yandex Object Storage</span> через AWS SDK для хранения пользовательского контента.
              </p>
              
              <div className="flex flex-wrap gap-2 border-t border-border pt-6">
                {["C#", "Entity Framework", "PostgreSQL", "AWS SDK", "S3 API", "Docker"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Также pet-проект на базе {" "}
              <Link
                href="https://github.com/unidoka/g-docs-any-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
              >
                Unidoka
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="border-t border-border py-32 px-6">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="mb-16 text-3xl font-semibold tracking-tight">Контакты</h2>
          </Reveal>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Telegram", value: "@bulat_ikhs", href: "https://t.me/bulat_ikhs" },
              { label: "Email", value: "ikhsanovbulitt@icloud.com", href: "mailto:ikhsanovbulitt@icloud.com" },
              { label: "GitHub", value: "bulitt-ikhs", href: "https://github.com/bulitt-ikhs" },
              { label: "GitHub (pet)", value: "lfiddd", href: "https://github.com/lfiddd" },
              { 
                label: "Быстрая связь", 
                value: "Написать мне →", 
                href: "https://t.me/bulat_ikhs",
                isPrimary: true 
              },
              { label: "VK", value: "bulat_ikhs", href: "https://vk.ru/bulat_ikhs" },
            ].map((contact, index) => (
              <Reveal key={contact.label} delay={100 + index * 100}>
                {contact.isPrimary ? (
                  <Link
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center justify-center rounded-lg border border-primary/20 bg-primary/5 p-6 text-center transition-all duration-300 hover:border-primary hover:bg-primary/10"
                  >
                    <span className="mb-2 block text-xs font-medium text-primary uppercase tracking-wider">
                      {contact.label}
                    </span>
                    <span className="text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                      {contact.value}
                    </span>
                  </Link>
                ) : (
                  <Link
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-lg border border-border p-6 transition-all duration-300 hover:border-primary/50 hover:bg-accent/5"
                  >
                    <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {contact.label}
                    </span>
                    <span className="text-sm text-foreground transition-colors group-hover:text-primary">
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
      <footer className="border-t border-border py-8 px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Булат Ихсанов</p>
          <p className="font-mono text-xs">made by Amorfa (Unidoka)</p>
        </div>
      </footer>
    </main>
  );
}