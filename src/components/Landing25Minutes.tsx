"use client";

import React, { useEffect, useMemo, useState } from "react";

type ThemeKey = "a" | "b" | "c";

export default function Landing25Minutes() {
  const [theme, setTheme] = useState<ThemeKey>("a");
  const [startTime, setStartTime] = useState<string>("19:30");
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isOfferOpen, setIsOfferOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const searchTheme = new URLSearchParams(window.location.search).get("theme") as ThemeKey | null;
    if (searchTheme && ["a", "b", "c"].includes(searchTheme)) {
      setTheme(searchTheme);
    }
  }, []);

  const payLink = useMemo(() => "https://example.com/yookassa-link", []);
  const YM_COUNTER_ID = 12345678;

  const todayHuman = useMemo(
    () => new Date().toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" }),
    []
  );
  const thisYear = useMemo(() => new Date().getFullYear(), []);

  const themeClasses = useMemo(() => {
    return {
      a: {
        cta: "bg-amber-500 hover:bg-amber-600 text-white",
        ctaOutline: "border-amber-200 text-amber-700",
        heroWrap: "bg-white text-gray-900",
        heroTitleAccent: "text-amber-600",
        heroPanel: "from-amber-50 to-white",
      },
      b: {
        cta: "bg-teal-600 hover:bg-teal-700 text-white",
        ctaOutline: "border-teal-200 text-teal-700",
        heroWrap: "bg-white text-gray-900",
        heroTitleAccent: "text-teal-600",
        heroPanel: "from-teal-50 to-white",
      },
      c: {
        cta: "bg-white text-indigo-700 hover:bg-gray-50",
        ctaOutline: "border-white/70 text-white",
        heroWrap: "bg-indigo-700 text-white",
        heroTitleAccent: "text-white",
        heroPanel: "from-indigo-600 to-indigo-700",
      },
    } as const;
  }, []);
  const T = themeClasses[theme];

  function openPay(e?: React.MouseEvent) {
    if (e) e.preventDefault();
    setIsPayOpen(true);
    if (typeof window !== "undefined") {
      const maybeYM = (window as typeof window & { ym?: (...args: unknown[]) => void }).ym;
      maybeYM?.(YM_COUNTER_ID, "reachGoal", "pay_click");
    }
  }

  function closePay() {
    setIsPayOpen(false);
  }

  function imageFallback(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget as HTMLImageElement & { srcset?: string; sizes?: string };
    const placeholder = `data:image/svg+xml;utf8,${encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#eef2ff"/><stop offset="1" stop-color="#ffffff"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><g fill="#64748b" font-family="system-ui,Segoe UI,Roboto" text-anchor="middle"><text x="50%" y="48%" font-size="22">Фото загрузить не удалось</text><text x="50%" y="60%" font-size="16">Замените URL в heroImageUrl/scenarioImages</text></g></svg>'
    )}`;
    img.srcset = "";
    img.sizes = "";
    img.src = placeholder;
  }

  useEffect(() => {
    if (typeof document === "undefined") return;
    type Tst = { name: string; pass: boolean; note?: string };
    const tests: Tst[] = [];

    tests.push({ name: "renders hero CTA", pass: !!document.querySelector('[data-testid="cta-hero"]') });
    tests.push({ name: "renders sticky CTA", pass: !!document.querySelector('[data-testid="cta-sticky"]') });
    tests.push({ name: "modal closed by default", pass: !document.querySelector('[data-testid="pay-modal"]') });
    tests.push({ name: "has price cards", pass: document.querySelectorAll('[data-testid="price-card"]').length >= 2 });
    tests.push({ name: "theme toggle present", pass: !!document.querySelector('[data-testid="theme-a"]') });

    tests.push({ name: "offer modal closed by default", pass: !document.querySelector('[data-testid="offer-modal"]') });
    tests.push({ name: "privacy modal closed by default", pass: !document.querySelector('[data-testid="privacy-modal"]') });
    tests.push({ name: "offer button present", pass: !!document.querySelector('[data-testid="open-offer"]') });
    tests.push({ name: "privacy button present", pass: !!document.querySelector('[data-testid="open-privacy"]') });
    tests.push({ name: "hero image present", pass: !!document.querySelector('[data-testid="hero-image"]') });

    const allPass = tests.every((t) => t.pass);
    console.log("[Landing smoke tests]", { allPass, tests });
  }, []);

  const heroImageUrl = "https://images.unsplash.com/photo-1695400090309-6b0d6c2a1a6b?q=80&w=1200&auto=format&fit=crop";
  const scenarioImages = [
    "https://images.unsplash.com/photo-1674699889972-0b3e8f8e4a6d?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1667485271634-1b4b1b5a66de?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1728133902711-84e17dc75f47?q=80&w=900&auto=format&fit=crop",
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-2xl bg-indigo-600" />
            <span className="font-semibold">25‑минутные окна</span>
          </div>

          <div className="flex items-center gap-2 mr-2">
            <button
              data-testid="theme-a"
              aria-label="Theme A (amber)"
              className={`h-6 w-6 rounded-full bg-amber-500 border ${theme === "a" ? "ring-2 ring-amber-600" : ""}`}
              onClick={() => setTheme("a")}
            />
            <button
              data-testid="theme-b"
              aria-label="Theme B (teal)"
              className={`h-6 w-6 rounded-full bg-teal-600 border ${theme === "b" ? "ring-2 ring-teal-700" : ""}`}
              onClick={() => setTheme("b")}
            />
            <button
              data-testid="theme-c"
              aria-label="Theme C (invert)"
              className={`h-6 w-6 rounded-full bg-indigo-700 border ${theme === "c" ? "ring-2 ring-white" : ""}`}
              onClick={() => setTheme("c")}
            />
          </div>

          <a
            href={payLink}
            onClick={openPay}
            data-testid="cta-hero"
            className={`px-4 py-2 min-h-[44px] rounded-xl text-sm font-semibold ${T.cta}`}
          >
            Начать 7 дней / 99 ₽
          </a>
        </div>
      </header>

      <section className={`max-w-6xl mx-auto px-4 pt-10 pb-8 grid md:grid-cols-2 gap-8 items-center ${theme === "c" ? "text-white" : ""}`}>
        <div>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Каждый пропущенный день — минус 25 минут близости.{" "}
            <span className={T.heroTitleAccent}>Верните их сегодня</span>
          </h1>
          <p className={`mt-3 text-lg ${theme === "c" ? "text-indigo-50" : "text-gray-700"}`}>
            Готовые офлайн‑сценарии без подготовки. Старт на 7 дней за 99 ₽. Оплата картой / СБП / SberPay, отмена в один клик.
          </p>

          <div className="mt-5 flex flex-col sm:flex-row gap-3 max-w-md">
            <label className={`flex items-center gap-2 border rounded-xl px-3 py-2 text-sm ${theme === "c" ? "border-white/40" : ""}`}>
              <span className={theme === "c" ? "text-indigo-50" : "text-gray-600"}>Время первого окна:</span>
              <input
                aria-label="Время первого окна"
                className={`outline-none bg-transparent ${theme === "c" ? "text-white placeholder-indigo-100" : ""}`}
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                type="time"
              />
            </label>
            <a href={payLink} onClick={openPay} className={`px-6 py-3 min-h-[44px] rounded-2xl font-semibold text-center ${T.cta}`}>
              Начать сегодня
            </a>
            <a
              href="#how"
              className={`px-6 py-3 min-h-[44px] rounded-2xl border font-semibold text-center ${
                theme === "c" ? "border-white/60 text-white hover:bg-white/10" : "hover:bg-gray-50"
              }`}
            >
              Как это работает
            </a>
          </div>
          <div className={`mt-2 text-xs ${theme === "c" ? "text-indigo-100" : "text-gray-600"}`}>
            If‑Then: «Если {todayHuman} в {startTime} — то семейное окно (мы напомним)». План фиксирует намерение и повышает шанс старта.
          </div>
          <div className={`mt-4 flex flex-wrap items-center gap-4 text-xs ${theme === "c" ? "text-indigo-100" : "text-gray-500"}`}>
            <span>1 274 семей уже провели 9 836 «окон»</span>
            <span>Оценка 4.8★ — «стало спокойнее вечерами»</span>
          </div>
        </div>

        <div className="relative">
          <div className={`aspect-video rounded-3xl bg-gradient-to-br ${T.heroPanel} border shadow-sm p-4 flex flex-col overflow-hidden`}>
            <img
              data-testid="hero-image"
              src={heroImageUrl}
              alt="Родитель и ребёнок выполняют 25‑минутный сценарий без экранов"
              className="w-full h-full object-cover rounded-2xl"
              loading="lazy"
              onError={imageFallback}
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
        {[
          { h: "Без подготовки", p: "Откройте сценарий — 3 шага, 25 минут, готово." },
          { h: "Меньше экранов", p: "Оффлайн‑игры и ритуалы, которые дети ждут." },
          { h: "Видимый след", p: "Медальки, фото‑момент и общий счётчик «окон»." },
        ].map((b, i) => (
          <div key={i} className="rounded-2xl border p-6">
            <div className="text-lg font-semibold">{b.h}</div>
            <p className="mt-2 text-gray-600">{b.p}</p>
          </div>
        ))}
      </section>

      <section id="how" className="bg-gray-50 border-y">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-semibold">Как это работает</h2>
          <ol className="mt-6 grid md:grid-cols-3 gap-6 text-sm">
            {[
              { t: "1) Выберите 2 дня и время", d: "If‑Then: «Если наступит время — напомним»." },
              { t: "2) Откройте сценарий (3 шага)", d: "Дом/улица/учёба. 25 минут без подготовки." },
              { t: "3) Завершите «пиком»", d: "Общий ритуал + медалька/фото — хочется повторять." },
            ].map((s, i) => (
              <li key={i} className="rounded-2xl border bg-white p-5">
                <div className="font-semibold">{s.t}</div>
                <p className="mt-2 text-gray-600">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold">Сценарии на любой день</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {[
            { t: "Шпион‑слова", d: "Разгадываем подсказки дома → секретное рукопожатие", a: "7–9 лет" },
            { t: "Командир кухни", d: "Готовим быстрый тост‑сет → медаль повара", a: "9–11 лет" },
            { t: "Охота на буквы", d: "Играем «буквы вокруг» → мини‑награда", a: "5–7 лет" },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl border p-0 overflow-hidden hover:shadow">
              <img
                src={scenarioImages[i]}
                alt={`${s.t}: демонстрация шага из сценария`}
                className="w-full h-40 object-cover"
                loading="lazy"
                onError={imageFallback}
              />
              <div className="p-5">
                <div className="text-lg font-semibold">{s.t}</div>
                <div className="mt-1 text-xs text-gray-500">{s.a}</div>
                <p className="mt-2 text-sm text-gray-700">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="price" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold">Попробуйте по‑настоящему</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div data-testid="price-card" className="rounded-2xl border p-6 ring-2 ring-indigo-600">
            <div className="text-sm font-semibold text-indigo-700">Старт • лучший выбор</div>
            <div className="mt-2 text-3xl font-bold">99 ₽</div>
            <div className="text-xs text-gray-500">7 дней доступа</div>
            <ul className="mt-4 text-sm text-gray-700 space-y-2 list-disc pl-4">
              <li>Все сценарии на неделю</li>
              <li>Напоминания и ритуалы</li>
              <li>Отмена в один клик</li>
            </ul>
            <a href={payLink} onClick={openPay} className={`mt-5 inline-flex w-full justify-center px-4 py-3 rounded-xl font-semibold ${T.cta}`}>
              Оплатить и начать
            </a>
          </div>

          <div data-testid="price-card" className="rounded-2xl border p-6">
            <div className="text-sm font-semibold text-indigo-700">Подписка • месяц</div>
            <div className="mt-2 text-3xl font-bold">349 ₽</div>
            <div className="text-xs text-gray-500">в месяц</div>
            <ul className="mt-4 text-sm text-gray-700 space-y-2 list-disc pl-4">
              <li>Полная библиотека сценариев</li>
              <li>Семейные челленджи</li>
              <li>История прогресса и медальки</li>
            </ul>
            <a href={payLink} onClick={openPay} className={`mt-5 inline-flex w-full justify-center px-4 py-3 rounded-xl font-semibold ${T.cta}`}>
              Оформить подписку
            </a>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-gray-500">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border">🔒 SSL‑защита</span>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border">💳 Карта</span>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border">🏦 СБП</span>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border">🅂 SberPay</span>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border">↩︎ Возврат без вопросов</span>
        </div>
      </section>

      <section className="bg-gray-50 border-y">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-semibold">Родители говорят</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6 text-sm">
            {[
              { q: "За 7 дней провели 5 окон — сын сам спрашивает: «наш тайм?»", n: "Анна, 33" },
              { q: "Меньше «экранной вины», я спокойнее к вечеру.", n: "Илья, 36" },
              { q: "Наконец есть простой ритуал — без подготовки и беготни.", n: "Мария, 29" },
            ].map((r, i) => (
              <figure key={i} className="rounded-2xl border bg-white p-5">
                <blockquote className="text-gray-700">“{r.q}”</blockquote>
                <figcaption className="mt-3 text-xs text-gray-500">{r.n}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-600">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="font-semibold">25‑минутные окна</div>
            <p className="mt-2">Простые семейные ритуалы каждый день.</p>
          </div>
          <div>
            <div className="font-semibold">Контакты</div>
            <p className="mt-2">hi@25windows.ru</p>
            <p>Telegram: @twentyfive_windows</p>
          </div>
          <div>
            <div className="font-semibold">Документы</div>
            <ul className="mt-2 space-y-1">
              <li>
                <button
                  type="button"
                  data-testid="open-offer"
                  className="hover:text-indigo-700 underline"
                  onClick={() => setIsOfferOpen(true)}
                >
                  Публичная оферта
                </button>
              </li>
              <li>
                <button
                  type="button"
                  data-testid="open-privacy"
                  className="hover:text-indigo-700 underline"
                  onClick={() => setIsPrivacyOpen(true)}
                >
                  Политика конфиденциальности
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-xs">© {thisYear} 25‑минутные окна</div>
      </footer>

      <div
        className="fixed z-40 left-4 right-4 md:right-6 bottom-4 md:bottom-6 flex items-center justify-center gap-3 p-3 border bg-white rounded-xl shadow-lg"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <span className="text-xs text-gray-600">Готовы вернуть 25 минут сегодня?</span>
        <a
          href={payLink}
          onClick={openPay}
          data-testid="cta-sticky"
          className={`px-4 py-2 min-h-[44px] rounded-xl text-sm font-semibold ${T.cta}`}
        >
          Начать 7 дней / 99 ₽
        </a>
      </div>

      {isPayOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          data-testid="pay-modal"
          onClick={closePay}
        >
          <div
            className="w-full max-w-lg max-h-[85vh] overflow-auto rounded-2xl bg-white border shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold">Оплата доступа</h3>
              <button className="text-gray-400 hover:text-gray-600" onClick={closePay} aria-label="Закрыть">
                ✕
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Безопасная оплата • SSL. Выберите удобный способ: карта / СБП / SberPay.
            </p>
            <div className="mt-4 rounded-xl border p-4">
              <div className="text-sm font-medium">ЮKassa (пример ссылки)</div>
              <p className="mt-1 text-xs text-gray-600">Ссылка на платёжную форму (invoice / QuickPay):</p>
              <a className="mt-2 inline-block text-indigo-700 underline" href={payLink} target="_blank" rel="noreferrer">
                Перейти к оплате
              </a>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full border">💳 Карта</span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full border">🏦 СБП</span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full border">🅂 SberPay</span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full border">🔒 256‑bit SSL</span>
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button onClick={closePay} className="px-4 py-2 min-h-[44px] rounded-xl border">
                Отмена
              </button>
              <a href={payLink} target="_blank" rel="noreferrer" className={`px-4 py-2 min-h-[44px] rounded-xl font-semibold ${T.cta}`}>
                Оплатить
              </a>
            </div>
            <p className="mt-4 text-[11px] text-gray-500">
              Нажимая «Оплатить», вы соглашаетесь с условиями оферты и политикой конфиденциальности.
            </p>
          </div>
        </div>
      )}

      {isOfferOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          data-testid="offer-modal"
          onClick={() => setIsOfferOpen(false)}
        >
          <div
            className="w-full max-w-3xl max-h-[85vh] overflow-auto rounded-2xl bg-white border shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold">Публичная оферта (пример)</h3>
              <button className="text-gray-400 hover:text-gray-600" onClick={() => setIsOfferOpen(false)} aria-label="Закрыть">
                ✕
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Последнее обновление: {todayHuman}. Этот шаблон подготовлен для онлайн‑сервиса цифровых сценариев «25‑минутные окна». Заполните реквизиты и проверьте у юриста.
            </p>
            <div className="prose prose-sm max-w-none">
              <h4>1. Термины</h4>
              <p>
                <strong>Оферта</strong> — настоящий документ; <strong>Продавец/Исполнитель</strong> — ООО «_____», ОГРН _____, ИНН _____, адрес: _____;
                <strong>Покупатель</strong> — совершеннолетнее дееспособное лицо, акцептовавшее Оферту; <strong>Сервис</strong> — доступ к цифровым сценариям и напоминаниям «25‑минутные окна».
              </p>
              <h4>2. Предмет</h4>
              <p>
                Продавец предоставляет Покупателю доступ к Сервису (цифровой контент/услуги), а Покупатель оплачивает доступ на условиях Оферты. Предложение адресовано неопределенному кругу лиц и является публичной офертой в смысле ст. 437 ГК РФ. Акцептом считается оплата и/или явное согласие на сайте (нажатие кнопки «Оплатить/Оформить»).
              </p>
              <h4>3. Тарифы и оплата</h4>
              <ul>
                <li>«Старт»: 99 ₽ за 7 дней доступа.</li>
                <li>«Месяц»: 349 ₽/месяц, автопродление до отмены.</li>
                <li>Оплата: банковские карты/СБП/SberPay через платёжного провайдера. Квитанция направляется электронно.</li>
              </ul>
              <h4>4. Доступ и ограничения</h4>
              <p>
                Доступ предоставляется сразу после акцепта. Нельзя перепродавать, публиковать сценарии публично, использовать в коммерческих целях без согласия Продавца. Возраст: 18+ (родители/законные представители).
              </p>
              <h4>5. Отмена и возвраты</h4>
              <p>
                Покупатель может отменить автопродление в любой момент. При помесячной подписке возврат делается за неиспользованный период по заявлению Покупателя (если иное не предусмотрено законом). Для «Старт 7 дней» возврат не предусмотрен после начала доступа, если иное не предусмотрено законом о защите прав потребителей.
              </p>
              <h4>6. Ответственность</h4>
              <p>
                Продавец не отвечает за невозможность доступа по причинам на стороне Покупателя/третьих лиц/форс-мажора. Совокупная ответственность ограничена количеством уплаченных средств за последний оплаченный период.
              </p>
              <h4>7. Персональные данные</h4>
              <p>Обработка ПДн осуществляется согласно «Политике конфиденциальности». Нажимая «Оплатить», Покупатель подтверждает ознакомление и согласие.</p>
              <h4>8. Поддержка и претензии</h4>
              <p>
                Контакты для обращений: hi@25windows.ru, Telegram: @twentyfive_windows. Претензионный порядок — 10 рабочих дней. Право: РФ. Споры — по месту регистрации Продавца.
              </p>
              <h4>9. Реквизиты</h4>
              <p>ООО «_____», ОГРН _____, ИНН _____, КПП _____, юр. адрес: _____, р/с _____, к/с _____, БИК _____.</p>
            </div>
          </div>
        </div>
      )}

      {isPrivacyOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          data-testid="privacy-modal"
          onClick={() => setIsPrivacyOpen(false)}
        >
          <div
            className="w-full max-w-3xl max-h-[85vh] overflow-auto rounded-2xl bg-white border shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold">Политика конфиденциальности (пример)</h3>
              <button className="text-gray-400 hover:text-gray-600" onClick={() => setIsPrivacyOpen(false)} aria-label="Закрыть">
                ✕
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Последнее обновление: {todayHuman}. Политика подготовлена с учётом 152‑ФЗ и рекомендаций Роскомнадзора. Заполните реквизиты Оператора и перечень используемых сервисов.
            </p>
            <div className="prose prose-sm max-w-none">
              <h4>1. Оператор и область действия</h4>
              <p>
                Оператор: ООО «_____», ОГРН _____, ИНН _____, адрес: _____, e‑mail: hi@25windows.ru. Политика действует в отношении всех персональных данных, которые Оператор получает от пользователей Сервиса и сайта.
              </p>
              <h4>2. Обрабатываемые данные</h4>
              <ul>
                <li>Идентификационные: имя (при наличии), e‑mail, телефон.</li>
                <li>Платёжные метаданные: факт оплаты/статус (через провайдера; реквизиты карт не хранятся у Оператора).</li>
                <li>Технические данные: cookies, IP‑адрес, user-agent, данные Метрики/аналитики.</li>
              </ul>
              <h4>3. Цели и правовые основания</h4>
              <ul>
                <li>Заключение и исполнение договора (оферты), биллинг и доступ к Сервису.</li>
                <li>Коммуникации по продукту, поддержка, информирование о изменениях.</li>
                <li>Аналитика использования Сервиса, улучшение качества.</li>
              </ul>
              <p>Основания: ст. 6, 9 152‑ФЗ; согласие субъекта ПДн и/или необходимость для исполнения договора.</p>
              <h4>4. Действия с ПДн и срок хранения</h4>
              <p>
                Сбор, запись, систематизация, хранение, уточнение, использование, обезличивание, блокирование и удаление. Хранение — в срок действия договора и 3 года после прекращения (если больший срок не требуется законом по бухучёту/налогам).
              </p>
              <h4>5. Передача третьим лицам</h4>
              <p>
                Передача ПДн возможна провайдерам, действующим по поручению Оператора (платёжный провайдер, e‑mail/SMS, аналитика). С такими лицами заключены договоры поручения обработки. Трансграничная передача — не осуществляется, за исключением сервисов, указанных Оператором отдельно в этой Политике.
              </p>
              <h4>6. Права субъекта ПДн</h4>
              <p>
                Пользователь вправе запросить сведения об обработке, потребовать уточнения/блокирования/удаления ПДн, отозвать согласие, обжаловать действия Оператора в Роскомнадзор или суд. Обращения: hi@25windows.ru.
              </p>
              <h4>7. Безопасность</h4>
              <p>
                Оператор применяет необходимые правовые, организационные и технические меры для защиты ПДн от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования и распространения.
              </p>
              <h4>8. Cookies и аналитика</h4>
              <p>
                Сайт использует cookies и инструменты аналитики (напр., Яндекс.Метрика). Пользователь может ограничить cookies в настройках браузера; это может повлиять на некоторые функции Сервиса.
              </p>
              <h4>9. Детские данные</h4>
              <p>
                Сервис предназначен для родителей. Оператор не собирает напрямую данные детей; если родитель предоставляет данные ребёнка, он подтверждает наличие законного основания и согласия.
              </p>
              <h4>10. Контакты Оператора</h4>
              <p>ООО «_____», адрес: _____, e‑mail: hi@25windows.ru. Для реализации прав направляйте запрос с темой «ПДн».</p>
              <h4>11. Изменение Политики</h4>
              <p>Оператор может обновлять Политику. Новая редакция вступает в силу с момента публикации на сайте; действующая версия доступна по ссылке в футере.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
