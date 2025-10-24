"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";

// Ultra‑clean, orange‑only landing focused on conversion
// Changes in this iteration ("переделай"):
// 1) Ещё проще первый экран: один главный CTA, минимум текста.
// 2) Аккуратный топ‑бар с логотипом и дублем CTA справа.
// 3) Блоки «Как это работает» и «Родители говорят» — удалены (по вашему запросу ранее).
// 4) «Сценарии недели» — остались кликабельными (slide‑over), но карточки стали крупнее и проще.
// 5) Модал оплаты стал ещё чище: единая кнопка, аккуратный чек, плавные переходы.
// 6) Жёсткая моно‑палитра: оранжевый как единственный акцент, остальное — чёрно‑серое/белое.

export default function Landing25Minutes() {
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isOfferOpen, setIsOfferOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const [isScenarioOpen, setIsScenarioOpen] = useState(false);
  const [activeScenarioIndex, setActiveScenarioIndex] = useState<number | null>(null);
  const closeScenarioBtnRef = useRef<HTMLButtonElement | null>(null);

  const payLink = useMemo(() => "https://example.com/yookassa-link", []);
  const thisYear = useMemo(() => new Date().getFullYear(), []);

  function openScenario(i: number) {
    setActiveScenarioIndex(i);
    setIsScenarioOpen(true);
    setTimeout(() => closeScenarioBtnRef.current?.focus(), 0);
  }
  function closeScenario() {
    setIsScenarioOpen(false);
    setActiveScenarioIndex(null);
  }

  function imageFallback(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget as HTMLImageElement;
    img.src = `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><rect width="100%" height="100%" fill="#fff7ed"/><text x="50%" y="52%" text-anchor="middle" font-size="16" fill="#7c2d12" font-family="system-ui,Segoe UI,Roboto">Фото недоступно</text></svg>')}`;
  }

  // Content
  const heroImageUrl = "https://images.unsplash.com/photo-1695400090309-6b0d6c2a1a6b?q=80&w=1600&auto=format&fit=crop";
  const scenarios = [
    {
      key: "spy",
      t: "Шпион‑слова",
      age: "7–9 лет",
      dur: "25 минут",
      img: "https://images.unsplash.com/photo-1674699889972-0b3e8f8e4a6d?q=80&w=1200&auto=format&fit=crop",
      short: "Квест по дому с подсказками → секретное рукопожатие.",
      materials: "Бумага, маркер, 3–5 стикеров",
      steps: ["Выберите 3 слова‑цели", "Спрячьте 3 подсказки по дому", "Финал: рукопожатие/обнимашка"],
      goal: "Внимание и командность",
    },
    {
      key: "kitchen",
      t: "Командир кухни",
      age: "9–11 лет",
      dur: "25 минут",
      img: "https://images.unsplash.com/photo-1667485271634-1b4b1b5a66de?q=80&w=1200&auto=format&fit=crop",
      short: "Мини‑миссия на кухне: тост‑сет → медаль повара.",
      materials: "Тостер/сковорода, хлеб, бумажная «медаль»",
      steps: ["Роли: командир/ассистент", "3 шага тоста", "Финал: «медаль повара» + фото‑жест"],
      goal: "Ответственность и результат",
    },
    {
      key: "letters",
      t: "Охота на буквы",
      age: "5–7 лет",
      dur: "25 минут",
      img: "https://images.unsplash.com/photo-1728133902711-84e17dc75f47?q=80&w=1200&auto=format&fit=crop",
      short: "Ищем буквы вокруг дома → мини‑награда.",
      materials: "Магнитные буквы, бумага, наклейки",
      steps: ["Буква дня", "5 предметов на букву", "Наклейка/медалька"],
      goal: "Играем со звуками/буквами",
    },
  ] as const;

  const UI = {
    cta: "bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white",
    pill: "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-200 text-orange-800",
  } as const;

  // Simple smoke log
  useEffect(() => {
    console.log("[Smoke] mounted, sections: hero, scenarios, pricing, payment-modal");
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* TOP BAR */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-orange-600" aria-hidden />
            <span className="font-semibold">25‑минутные окна</span>
          </div>
          <button
            onClick={() => setIsPayOpen(true)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold ${UI.cta}`}
          >
            Начать 7 дней / 99 ₽
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 pt-10 pb-8 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-gray-900">
            Вечер без экранов за 25 минут.
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Готовые офлайн‑сценарии без подготовки. Пробный доступ на 7 дней — 99 ₽.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md">
            <button
              onClick={() => setIsPayOpen(true)}
              className={`w-full sm:w-auto px-6 py-3 min-h-[48px] rounded-2xl font-semibold ${UI.cta}`}
            >
              Оплатить и начать
            </button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span className={UI.pill}>⭐ 4.8/5</span>
            <span className={UI.pill}>👨‍👩‍👧 1 274 семей</span>
            <span className={UI.pill}>↩︎ Отмена в 1 клик</span>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-video rounded-3xl bg-gradient-to-br from-orange-50 to-white border shadow-sm p-3 overflow-hidden">
            <img
              src={heroImageUrl}
              alt="Семейный ритуал 25 минут"
              className="w-full h-full object-cover rounded-2xl"
              loading="lazy"
              onError={imageFallback}
            />
          </div>
        </div>
      </section>

      {/* SCENARIOS — clickable */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold">Сценарии недели</h2>
        <p className="mt-2 text-sm text-gray-600">Нажмите на карточку — выедет краткое описание и шаги.</p>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {scenarios.map((s, i) => (
            <button
              key={s.key}
              onClick={() => openScenario(i)}
              className="text-left rounded-2xl border overflow-hidden hover:shadow focus:outline-none focus:ring-2 focus:ring-orange-600"
            >
              <img src={s.img} alt={s.t} className="w-full h-48 object-cover" loading="lazy" onError={imageFallback} />
              <div className="p-5">
                <div className="text-lg font-semibold">{s.t}</div>
                <div className="mt-1 text-xs text-orange-700">
                  {s.age} • {s.dur}
                </div>
                <p className="mt-2 text-sm text-gray-700">{s.short}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS — refined, elegant */}
      <section id="how" className="bg-orange-50/50 border-y">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-semibold">Как это работает</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              {
                t: "1) Выберите 2 вечера",
                d: "Назначьте время. Если наступит — мы напомним.",
              },
              {
                t: "2) Откройте сценарий (3 шага)",
                d: "25 минут офлайн без подготовки. Всё под рукой.",
              },
              {
                t: "3) Завершите «пиком»",
                d: "Общий финал — медалька/обнимашка и фото‑жест.",
              },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border bg-white p-6">
                <div className="text-lg font-semibold">{s.t}</div>
                <p className="mt-2 text-gray-600">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-gray-600">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-200 text-orange-800">⏱ 25 минут</span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-200 text-orange-800">🧰 Без подготовки</span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-200 text-orange-800">📣 Напоминания If‑Then</span>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — cleaner social proof */}
      <section id="reviews" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold">Родители говорят</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {[
            {
              q: "За 7 дней сделали 5 окон — теперь сын сам спрашивает: «наш тайм?»",
              n: "Анна, 33, Санкт‑Петербург",
            },
            {
              q: "Ушли истерики у экрана. 20:00 — и мы уже в финале с медалькой.",
              n: "Илья, 36, Казань",
            },
            {
              q: "Хватает 25 минут. Не готовлюсь заранее — всё в 3 шагах.",
              n: "Мария, 29, Екатеринбург",
            },
          ].map((r, i) => (
            <figure key={i} className="rounded-2xl border p-6 bg-white">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 font-semibold">
                  {r.n.split(",")[0].slice(0, 1)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-orange-700" aria-hidden>
                    <span>★★★★★</span>
                    <span className="text-[11px] text-gray-500">проверенный отзыв</span>
                  </div>
                  <blockquote className="mt-2 text-gray-800">“{r.q}”</blockquote>
                  <figcaption className="mt-3 text-xs text-gray-500">{r.n}</figcaption>
                </div>
              </div>
            </figure>
          ))}
        </div>
      </section>

      {/* PRICING — two options only */}
      <section id="price" className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border p-6 ring-2 ring-orange-600">
            <div className="text-sm font-semibold text-orange-700">Старт • лучший выбор</div>
            <div className="mt-2 text-3xl font-bold">99 ₽</div>
            <div className="text-xs text-gray-500">7 дней доступа</div>
            <ul className="mt-4 text-sm text-gray-700 space-y-2 list-disc pl-4">
              <li>Все сценарии недели</li>
              <li>Напоминания «If‑Then»</li>
              <li>Отмена в один клик</li>
            </ul>
            <button
              onClick={() => setIsPayOpen(true)}
              className={`mt-5 inline-flex w-full justify-center px-4 py-3 rounded-xl font-semibold ${UI.cta}`}
            >
              Оплатить и начать
            </button>
          </div>
          <div className="rounded-2xl border p-6">
            <div className="text-sm font-semibold text-orange-700">Подписка • месяц</div>
            <div className="mt-2 text-3xl font-bold">349 ₽</div>
            <div className="text-xs text-gray-500">в месяц</div>
            <ul className="mt-4 text-sm text-gray-700 space-y-2 list-disc pl-4">
              <li>Полная библиотека сценариев</li>
              <li>Семейные челленджи</li>
              <li>История прогресса</li>
            </ul>
            <button
              onClick={() => setIsPayOpen(true)}
              className={`mt-5 inline-flex w-full justify-center px-4 py-3 rounded-xl font-semibold ${UI.cta}`}
            >
              Оформить подписку
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
                  className="hover:text-orange-700 underline"
                  onClick={() => setIsOfferOpen(true)}
                >
                  Публичная оферта
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-orange-700 underline"
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

      {/* STICKY CTA */}
      <div
        className="fixed z-40 left-4 right-4 md:right-6 bottom-4 md:bottom-6 flex items-center justify-center gap-3 p-3 border bg-white rounded-xl shadow-lg"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <span className="text-xs text-gray-600">Готовы вернуть 25 минут сегодня?</span>
        <button
          onClick={() => setIsPayOpen(true)}
          className={`px-4 py-2 min-h-[44px] rounded-xl text-sm font-semibold ${UI.cta}`}
        >
          Начать 7 дней / 99 ₽
        </button>
      </div>

      {/* PAYMENT MODAL — ultra clean */}
      {isPayOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsPayOpen(false)}
        >
          <div className="absolute inset-0 bg-black/45" />
          <div
            className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-1.5 bg-gradient-to-r from-orange-500 to-orange-700" />
            <div className="p-7">
              <div className="flex items-start justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Оплата доступа</h3>
                <button
                  onClick={() => setIsPayOpen(false)}
                  className="text-gray-400 hover:text-gray-700 text-xl"
                  aria-label="Закрыть"
                >
                  ×
                </button>
              </div>
              <div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50 p-5">
                <div className="text-sm text-gray-600">Тариф</div>
                <div className="mt-1 flex items-baseline justify-between">
                  <div className="font-semibold">Старт — 7 дней</div>
                  <div className="text-2xl font-extrabold text-gray-900">99 ₽</div>
                </div>
                <ul className="mt-3 text-sm text-gray-700 space-y-1 list-disc pl-5">
                  <li>Моментальный доступ ко всем сценариям недели</li>
                  <li>Напоминания и «If‑Then» план</li>
                  <li>Отмена в 1 клик в любое время</li>
                </ul>
              </div>
              <a
                href={payLink}
                target="_blank"
                rel="noreferrer"
                className={`mt-6 block w-full text-center py-3 rounded-2xl font-semibold ${UI.cta}`}
              >
                Перейти к оплате
              </a>
              <p className="mt-4 text-[11px] leading-snug text-gray-500 text-center">
                Нажимая «Перейти к оплате», вы соглашаетесь с{" "}
                <button className="underline hover:text-orange-700" onClick={() => setIsOfferOpen(true)}>
                  офертой
                </button>{" "}
                и{" "}
                <button className="underline hover:text-orange-700" onClick={() => setIsPrivacyOpen(true)}>
                  политикой конфиденциальности
                </button>
                .
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SCENARIO SLIDE‑OVER */}
      {isScenarioOpen && activeScenarioIndex !== null && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/45" onClick={closeScenario} />
          <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white border-l shadow-2xl flex flex-col">
            <header className="p-5 border-b flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{scenarios[activeScenarioIndex].t}</h3>
                <div className="mt-1 text-xs text-orange-700">
                  {scenarios[activeScenarioIndex].age} • {scenarios[activeScenarioIndex].dur}
                </div>
              </div>
              <button
                ref={closeScenarioBtnRef}
                onClick={closeScenario}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Закрыть"
              >
                ✕
              </button>
            </header>
            <div className="p-5 overflow-y-auto space-y-4">
              <img
                src={scenarios[activeScenarioIndex].img}
                alt={scenarios[activeScenarioIndex].t}
                className="w-full h-40 object-cover rounded-xl border"
                onError={imageFallback}
              />
              <p className="text-sm text-gray-700">{scenarios[activeScenarioIndex].short}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className={UI.pill}>🎯 {scenarios[activeScenarioIndex].goal}</span>
                <span className={UI.pill}>🧰 {scenarios[activeScenarioIndex].materials}</span>
              </div>
              <div>
                <div className="font-semibold">Шаги</div>
                <ol className="mt-2 list-decimal pl-5 text-sm text-gray-700 space-y-2">
                  {scenarios[activeScenarioIndex].steps.map((st, idx) => (
                    <li key={idx}>{st}</li>
                  ))}
                </ol>
              </div>
            </div>
            <footer className="p-5 border-t">
              <button
                onClick={() => setIsPayOpen(true)}
                className={`w-full inline-flex justify-center px-4 py-3 rounded-xl font-semibold ${UI.cta}`}
              >
                Запустить сценарий
              </button>
            </footer>
          </aside>
        </div>
      )}

      {/* Simple doc modals */}
      {isOfferOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsOfferOpen(false)}
        >
          <div
            className="bg-white max-w-2xl w-full rounded-2xl shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h4 className="text-lg font-semibold">Публичная оферта</h4>
              <button className="text-gray-400 hover:text-gray-700" onClick={() => setIsOfferOpen(false)}>
                ×
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Здесь будет текст оферты. Замените на юридически утверждённый документ.
            </p>
          </div>
        </div>
      )}

      {isPrivacyOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsPrivacyOpen(false)}
        >
          <div
            className="bg-white max-w-2xl w-full rounded-2xl shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h4 className="text-lg font-semibold">Политика конфиденциальности</h4>
              <button className="text-gray-400 hover:text-gray-700" onClick={() => setIsPrivacyOpen(false)}>
                ×
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Здесь будет текст политики. Укажите оператора ПДн и перечень сервисов.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
