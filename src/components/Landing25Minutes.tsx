"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react'

// Single-file TSX landing for preview.
// Tailwind CSS expected. No sticky header. Hero = short description + photo.
// Bottom sticky CTA appears only after 15 minutes on screen (debug: add ?preview=1 to show in 6s).

// Types
interface Scenario {
	key: string
	t: string
	age: string
	dur: string
	img: string
	short: string
	long?: string
	materials?: string
	steps: string[]
	goal: string
	tips?: string[]
	adapt?: { younger?: string; older?: string; siblings?: string }
	timeplan?: string[]
	safety?: string
}

export default function Landing25Minutes(): JSX.Element {
	const [isPayOpen, setIsPayOpen] = useState(false)
	const [isOfferOpen, setIsOfferOpen] = useState(false)
	const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)

	const [isScenarioOpen, setIsScenarioOpen] = useState(false)
	const [activeScenarioIndex, setActiveScenarioIndex] = useState<
		number | null
	>(null)
	const closeScenarioBtnRef = useRef<HTMLButtonElement | null>(null)

	// Slider state
	const sliderRef = useRef<HTMLDivElement | null>(null)
	const [slideIdx, setSlideIdx] = useState(0)
	const isReducedMotion =
		typeof window !== 'undefined' &&
		'matchMedia' in window &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches

	// Sticky CTA delayed show
	const [showSticky, setShowSticky] = useState(false)
	const [stickyBoom, setStickyBoom] = useState(false) // accent animation flag
	useEffect(() => {
		// dev/preview shortcut
		const url = new URL(
			typeof window !== 'undefined' ? window.location.href : 'https://local'
		)
		const isPreview = url.searchParams.get('preview') === '1'
		const delayMs = 15000
		const t = setTimeout(() => {
			setShowSticky(true)
		}, delayMs)

		return () => clearTimeout(t)
	}, [])

	function scrollToIdx(idx: number) {
		const container = sliderRef.current
		if (!container) return
		const cards = container.querySelectorAll<HTMLElement>('[data-slide]')
		const clamped = Math.max(0, Math.min(idx, cards.length - 1))
		const target = cards[clamped]
		if (!target) return
		target.scrollIntoView({
			behavior: isReducedMotion ? 'auto' : 'smooth',
			inline: 'start',
			block: 'nearest'
		})
		setSlideIdx(clamped)
	}
	const nextSlide = () => scrollToIdx(slideIdx + 1)
	const prevSlide = () => scrollToIdx(slideIdx - 1)

	// keep indicator in sync on manual scroll
	function onSliderScroll() {
		const container = sliderRef.current
		if (!container) return
		const firstCard = container.querySelector<HTMLElement>('[data-slide]')
		if (!firstCard) return
		const cardWidth = firstCard.clientWidth + 24 // gap-6 ~ 24px
		const idx = Math.round(container.scrollLeft / cardWidth)
		setSlideIdx(Math.max(0, Math.min(idx, scenarios.length - 1)))
	}

	const payLink = useMemo(() => 'https://example.com/yookassa-link', [])
	const thisYear = useMemo(() => new Date().getFullYear(), [])

	function openScenario(i: number) {
		setActiveScenarioIndex(i)
		setIsScenarioOpen(true)
		setTimeout(() => closeScenarioBtnRef.current?.focus?.(), 0)
	}
	function closeScenario() {
		setIsScenarioOpen(false)
		setActiveScenarioIndex(null)
	}

	function imageFallback(e: React.SyntheticEvent<HTMLImageElement>) {
		const img = e.currentTarget
		img.src = `data:image/svg+xml;utf8,${encodeURIComponent(
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><rect width="100%" height="100%" fill="#fff7ed"/><text x="50%" y="52%" text-anchor="middle" font-size="16" fill="#7c2d12" font-family="system-ui,Segoe UI,Roboto">Фото недоступно</text></svg>'
		)}`
	}

	// Content
	const heroImageUrl =
		'https://images.unsplash.com/photo-1695400090309-6b0d6c2a1a6b?q=80&w=1600&auto=format&fit=crop'
	const scenarios: Scenario[] = [
		{
			key: 'spy',
			t: 'Шпион‑слова',
			age: '7–9 лет',
			dur: '25 минут',
			img: 'https://images.unsplash.com/photo-1674699889972-0b3e8f8e4a6d?q=80&w=1200&auto=format&fit=crop',
			short: 'Квест по дому с подсказками → секретное рукопожатие.',
			long: 'Делаем мини‑квест из 3 подсказок. В каждой — слово‑улика. Ребёнок находит слово, произносит «пароль» и получает следующую подсказку. В финале — секретное рукопожатие/обнимашка и короткая похвала за конкретное действие.',
			materials: 'Бумага, маркер, 3–5 стикеров, скотч',
			steps: [
				'Выберите 3 слова‑цели (например, ЛИСА, МЕД, КОТ).',
				'Спрячьте 3 подсказки по дому (на уровне глаз ребёнка).',
				'Финал: рукопожатие/обнимашка + конкретная похвала.'
			],
			goal: 'Внимание и командность',
			tips: [
				'Делайте крупные печатные буквы — легче считывать.',
				'Хвалите конкретно: «нашёл подсказку — классная наблюдательность».',
				'Если застрял — короткая наводка.'
			],
			adapt: {
				younger: '5–6 лет: 2–3 буквы; подсказки на видном месте.',
				older: '10–11 лет: добавьте шифр.',
				siblings: 'Роли «следопыт» и «чтец пароля», меняйтесь.'
			},
			timeplan: [
				'0–3 мин: подготовка',
				'3–20 мин: поиск',
				'20–25 мин: финал + похвала'
			],
			safety: 'Без высоких полок и скользких поверхностей.'
		},
		{
			key: 'kitchen',
			t: 'Командир кухни',
			age: '9–11 лет',
			dur: '25 минут',
			img: 'https://images.unsplash.com/photo-1667485271634-1b4b1b5a66de?q=80&w=1200&auto=format&fit=crop',
			short: 'Мини‑миссия на кухне: тост‑сет → медаль повара.',
			long: 'Ребёнок — «командир кухни», взрослый — ассистент. Задача: собрать тост‑сет. Важное: короткие команды, безопасные действия, финальная «медаль повара».',
			materials: 'Хлеб/лаваш, намазка, тарелка, стакан, бумажная «медаль».',
			steps: [
				'Роли: кто командует, кто помогает.',
				'Намазать — собрать — сервировать.',
				'Финал: «медаль повара» + фото‑жест.'
			],
			goal: 'Ответственность и результат',
			tips: [
				'Одна команда — одно действие.',
				'Покажите «безопасную зону».',
				'Выбор из двух топпингов.'
			],
			adapt: {
				younger: '7–8 лет: без нагрева; только намазка.',
				older: '10–11: тайм‑челлендж 6 минут.',
				siblings: 'Один руководит, другой сервирует.'
			},
			timeplan: [
				'0–4 мин: подготовка',
				'4–18 мин: сборка',
				'18–25 мин: награда'
			],
			safety: 'Без острых ножей и открытого огня для младших.'
		},
		{
			key: 'letters',
			t: 'Охота на буквы',
			age: '5–7 лет',
			dur: '25 минут',
			img: 'https://images.unsplash.com/photo-1728133902711-84e17dc75f47?q=80&w=1200&auto=format&fit=crop',
			short: 'Ищем буквы вокруг дома → мини‑награда.',
			long: 'Выбираем «букву дня» и ищем 5 предметов на эту букву. Фотографируем/отмечаем галочкой. В финале — наклейка и проговаривание слов.',
			materials: 'Карточки/наклейки, бумага, маркер.',
			steps: [
				'Назовите букву дня и звук.',
				'Найдите 5 предметов на эту букву.',
				'Финал: наклейка + повтор слов.'
			],
			goal: 'Играем со звуками/буквами',
			tips: [
				'Корректируйте мягко: «звучит как…»',
				'Покажите букву руками/верёвкой.',
				'Меняйте комнату.'
			],
			adapt: {
				younger: '4–5 лет: 3 предмета; можно по картинкам.',
				older: '7–8 лет: добавьте рифму/предложение.',
				siblings: 'Старший подсказывает звук, младший ищет.'
			},
			timeplan: [
				'0–2 мин: выбор буквы',
				'2–20 мин: охота',
				'20–25 мин: повтор'
			],
			safety: 'Только лёгкие и безопасные предметы.'
		}
	]

	const UI = {
		cta: 'bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white',
		pill: 'inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-200 text-orange-800'
	} as const

	// Runtime smoke (console)
	useEffect(() => {
		const results = [] as Array<{ name: string; pass: boolean }>
		results.push({
			name: 'Hero CTA exists',
			pass: !!document.querySelector('#hero-cta')
		})
		results.push({
			name: 'Scenarios count matches dots',
			pass:
				document.querySelectorAll('[data-slide]').length ===
				document.querySelectorAll('[role="tab"]').length
		})
		results.push({
			name: 'Price cards x2',
			pass: document.querySelectorAll('#price [data-price-card]').length >= 2
		})
		results.push({
			name: 'FAQ items >=4',
			pass: document.querySelectorAll('#faq .rounded-2xl').length >= 4
		})
		console.log(
			'[Smoke]',
			results.every((r) => r.pass),
			results
		)
	}, [])

	return (
		<div className='min-h-screen bg-white text-gray-900'>
			{/* Оранжевая декоративная шапка */}
			<div className='h-2 w-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600' />
			{/* HERO */}
			<section className='relative isolate px-4 pt-0 md:pt-6 pb-0'>
				<div className='max-w-6xl mx-auto md:grid md:grid-cols-2 md:gap-10'>
					<div className='flex flex-col min-h-[100svh] md:min-h-0 justify-between'>
						<div className='pt-5'>
							<h1 className='text-3xl md:text-5xl font-semibold leading-tight text-gray-900'>
								Короткие семейные миссии по 25 минут
							</h1>
							<p className='mt-4 text-base md:text-lg text-gray-800'>
								Это готовые офлайн‑миссии для родителя и ребёнка 5–11
								лет. В формате Telegram‑бот — для осознанного
								25‑минутного времени с ребёнком. Когда времени совсем не
								много.
							</p>
						</div>

						<div className='mt-4 md:hidden'>
							<div className='relative aspect-video rounded-3xl bg-gradient-to-br from-orange-50 to-white border shadow-sm p-3 overflow-hidden'>
								<img
									src={heroImageUrl}
									alt='Родитель и ребёнок выполняют миссию'
									className='w-full h-full object-cover rounded-2xl'
									loading='lazy'
									onError={imageFallback}
								/>
								<span className='absolute top-3 left-3 text-xs px-2 py-1 rounded-full bg-white/85 border'>
									25:00
								</span>
							</div>
						</div>

						<div className='rounded-2xl border bg-orange-50/60 p-5 md:p-6'>
							<div className='text-base md:text-lg font-semibold text-gray-900'>
								25 минут — достаточно
							</div>
							<p className='mt-2 text-sm text-gray-700'>
								Короткие, но регулярные ритуалы дают больше пользы, чем
								редкие длинные попытки.
							</p>
						</div>

						<div
							className='pt-4'
							style={{
								paddingBottom: 'max(12px, env(safe-area-inset-bottom))'
							}}
						>
							<div className='grid grid-cols-2 gap-2'>
								<button
									id='hero-cta'
									onClick={() => setIsPayOpen(true)}
									className={`px-3 py-3 min-h-[44px] rounded-2xl font-semibold text-[15px] ${UI.cta}`}
								>
									Начать 7 дней / 99 ₽
								</button>
								<a
									href='#scenarios-title'
									className='px-3 py-3 min-h-[44px] rounded-2xl font-semibold text-[15px] border text-gray-800 text-center'
								>
									Посмотреть сценарии
								</a>
							</div>
							<div className='mt-2 text-[11px] text-gray-400'>
								★ 4.8 · 1 274 семей
							</div>
						</div>
					</div>

					<div className='hidden md:block'>
						<div className='relative aspect-video rounded-3xl bg-gradient-to-br from-orange-50 to-white border shadow-sm p-3 overflow-hidden'>
							<img
								src={heroImageUrl}
								alt='Родитель и ребёнок выполняют миссию'
								className='w-full h-full object-cover rounded-2xl'
								loading='lazy'
								onError={imageFallback}
							/>
							<span className='absolute top-3 left-3 text-xs px-2 py-1 rounded-full bg-white/85 border'>
								25:00
							</span>
						</div>
					</div>
				</div>

				<div className='md:hidden flex items-center justify-center h-10 text-gray-300'>
					<span className='text-xl'>▾</span>
				</div>
			</section>

			{/* SCENARIOS — slider */}
			<section
				className='max-w-6xl mx-auto px-4 py-12'
				aria-labelledby='scenarios-title'
			>
				<div className='flex items-center justify-between gap-3'>
					<div>
						<h2
							id='scenarios-title'
							className='text-2xl md:text-3xl font-semibold'
						>
							Сценарии недели
						</h2>
						<p className='mt-2 text-sm text-gray-600'>
							Листайте и выбирайте. Нажмите на карточку — увидите
							короткое описание и 3 шага.
						</p>
					</div>
					<div className='hidden md:flex items-center gap-2' aria-hidden>
						<button
							onClick={prevSlide}
							className='h-10 w-10 rounded-full border hover:bg-orange-50'
							aria-label='Предыдущий сценарий'
						>
							‹
						</button>
						<button
							onClick={nextSlide}
							className='h-10 w-10 rounded-full border hover:bg-orange-50'
							aria-label='Следующий сценарий'
						>
							›
						</button>
					</div>
				</div>

				<div
					ref={sliderRef}
					onScroll={onSliderScroll}
					className='mt-6 flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-px-4 pb-2'
					role='region'
					aria-roledescription='carousel'
					aria-label='Сценарии недели'
				>
					{scenarios.map((s, i) => (
						<button
							key={s.key}
							data-slide
							onClick={() => openScenario(i)}
							className='snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[33%] text-left rounded-2xl border overflow-hidden hover:shadow focus:outline-none focus:ring-2 focus:ring-orange-600'
							aria-describedby={`scenario-${s.key}-desc`}
						>
							<img
								src={s.img}
								alt={s.t}
								className='w-full h-48 object-cover'
								loading='lazy'
								onError={imageFallback}
							/>
							<div className='p-5'>
								<div className='text-lg font-semibold'>{s.t}</div>
								<div className='mt-1 text-xs text-orange-700'>
									{s.age} • {s.dur}
								</div>
								<p
									id={`scenario-${s.key}-desc`}
									className='mt-2 text-sm text-gray-700'
								>
									{s.short}
								</p>
								<div className='mt-3 flex flex-wrap gap-2 text-xs'>
									<span className={UI.pill}>🎯 Цель: {s.goal}</span>
									<span className={UI.pill}>
										🧰 Материалы за 1 минуту
									</span>
								</div>
							</div>
						</button>
					))}
				</div>

				<div className='mt-4 flex items-center justify-center gap-3'>
					<button
						onClick={prevSlide}
						className='md:hidden h-9 w-9 rounded-full border'
						aria-label='Назад'
					>
						‹
					</button>
					<div
						className='flex items-center gap-2'
						role='tablist'
						aria-label='Навигация по сценариям'
					>
						{scenarios.map((_, i) => (
							<button
								key={i}
								onClick={() => scrollToIdx(i)}
								role='tab'
								aria-selected={slideIdx === i}
								aria-label={`Слайд ${i + 1}`}
								className={`h-2.5 w-2.5 rounded-full ${
									slideIdx === i ? 'bg-orange-600' : 'bg-orange-200'
								}`}
							/>
						))}
					</div>
					<button
						onClick={nextSlide}
						className='md:hidden h-9 w-9 rounded-full border'
						aria-label='Вперёд'
					>
						›
					</button>
				</div>

				<p className='sr-only' aria-live='polite'>
					Показан слайд {slideIdx + 1} из {scenarios.length}
				</p>
			</section>

			{/* WHAT YOU GET */}
			<section id='what-you-get' className='max-w-6xl mx-auto px-4 py-12'>
				<h2 className='text-2xl md:text-3xl font-semibold'>
					Что вы получите за 7 дней
				</h2>
				<div className='mt-6 grid md:grid-cols-4 gap-6'>
					<div className='rounded-2xl border p-6 bg-white'>
						<div className='text-lg font-semibold'>Готовые занятия</div>
						<p className='mt-2 text-gray-700'>
							6–8 коротких сценариев по возрастам 5–11 лет. Без
							подготовки.
						</p>
					</div>
					<div className='rounded-2xl border p-6 bg-white'>
						<div className='text-lg font-semibold'>Напоминания</div>
						<p className='mt-2 text-gray-700'>
							«Если 19:30 — то играем». Помогаем не забыть и не
							сорваться.
						</p>
					</div>
					<div className='rounded-2xl border p-6 bg-white'>
						<div className='text-lg font-semibold'>Отметки прогресса</div>
						<p className='mt-2 text-gray-700'>
							Простой чек‑лист «сделали». Видно, как у вас получается.
						</p>
					</div>
					<div className='rounded-2xl border p-6 bg-white'>
						<div className='text-lg font-semibold'>Награды и похвала</div>
						<p className='mt-2 text-gray-700'>
							Медальки/обнимашки и понятные фразы похвалы.
						</p>
					</div>
				</div>
			</section>

			{/* WHY SECTION — как слайдер */}
			<section id='why-slider' className='max-w-6xl mx-auto px-4 py-12'>
				<h2 className='text-2xl md:text-3xl font-semibold mb-4'>
					Почему это работает
				</h2>
				<div className='flex overflow-x-auto gap-4 snap-x snap-mandatory pb-2'>
					{[
						{
							title: 'Регулярность вместо марафона',
							text: '2–3 коротких ритуала в неделю приносят больше спокойствия, чем редкие «большие» проекты.'
						},
						{
							title: 'Понятные правила',
							text: 'Мы не запрещаем — просто задаём время без экранов и держимся плана.'
						},
						{
							title: 'Тёплый финал',
							text: 'Маленький ритуал завершения даёт чувство близости и уверенности для обоих.'
						},
						{
							title: 'Минимум подготовки',
							text: 'Все сценарии собраны так, чтобы начать за минуту и не искать материалы.'
						}
					].map((card, i) => (
						<div
							key={i}
							className='snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[40%] border rounded-2xl p-6 bg-white shadow-sm'
						>
							<div className='text-lg font-semibold text-gray-900'>
								{card.title}
							</div>
							<p className='mt-2 text-gray-700 text-sm'>{card.text}</p>
						</div>
					))}
				</div>
			</section>

			{/* DIFFERENTIATORS */}
			<section id='why-us' className='max-w-6xl mx-auto px-4 py-12'>
				<h2 className='text-2xl md:text-3xl font-semibold'>
					Чем мы отличаемся
				</h2>
				<div className='mt-6 grid md:grid-cols-3 gap-6'>
					<div className='rounded-2xl border p-6 bg-white'>
						<div className='text-lg font-semibold'>
							Альтернатива экрану
						</div>
						<p className='mt-2 text-gray-700'>
							Не «нельзя телефон», а «давай сыграем вместе 25 минут».
						</p>
					</div>
					<div className='rounded-2xl border p-6 bg-white'>
						<div className='text-lg font-semibold'>Быстрый старт</div>
						<p className='mt-2 text-gray-700'>
							Никакой подготовки. Открыли сценарий — и пошли.
						</p>
					</div>
					<div className='rounded-2xl border p-6 bg-white'>
						<div className='text-lg font-semibold'>Тёплый финал</div>
						<p className='mt-2 text-gray-700'>
							Медалька/обнимашка. Хорошее настроение перед сном.
						</p>
					</div>
				</div>
			</section>

			{/* TESTIMONIALS */}
			<section id='reviews' className='max-w-6xl mx-auto px-4 py-12'>
				<h2 className='text-2xl md:text-3xl font-semibold'>
					Родители говорят
				</h2>
				<div className='mt-6 grid md:grid-cols-3 gap-6'>
					{[
						{
							q: 'За 7 дней сделали 5 окон — теперь сын сам спрашивает: «наш тайм?»',
							n: 'Анна, 33, Санкт‑Петербург'
						},
						{
							q: 'Ушли истерики у экрана. 20:00 — и мы уже в финале с медалькой.',
							n: 'Илья, 36, Казань'
						},
						{
							q: 'Хватает 25 минут. Не готовлюсь заранее — всё в 3 шагах.',
							n: 'Мария, 29, Екатеринбург'
						}
					].map((r, i) => (
						<figure key={i} className='rounded-2xl border p-6 bg-white'>
							<div className='flex items-start gap-3'>
								<div className='h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 font-semibold'>
									{r.n.split(',')[0].slice(0, 1)}
								</div>
								<div className='flex-1'>
									<div
										className='flex items-center gap-2 text-sm text-orange-700'
										aria-hidden
									>
										<span>★★★★★</span>
										<span className='text-[11px] text-gray-500'>
											проверенный отзыв
										</span>
									</div>
									<blockquote className='mt-2 text-gray-800'>
										“{r.q}”
									</blockquote>
									<figcaption className='mt-3 text-xs text-gray-500'>
										{r.n}
									</figcaption>
								</div>
							</div>
						</figure>
					))}
				</div>
			</section>

			{/* FAQ */}

			{/* PRICING */}
			<section id='price' className='max-w-6xl mx-auto px-4 pb-12'>
				<h2 className='text-2xl md:text-3xl font-semibold'>Тарифы</h2>
				<p className='mt-1 text-sm text-gray-600'>
					Начните с недели, а потом переходите на месяц — когда войдёте в
					ритм.
				</p>
				<div className='mt-6 grid md:grid-cols-2 gap-6'>
					{/* Старт */}
					<div
						data-price-card
						className='rounded-3xl border p-6 ring-2 ring-orange-600'
					>
						<div className='text-sm font-semibold text-orange-700'>
							Старт • лучший выбор
						</div>
						<div className='mt-2 text-4xl font-extrabold'>99 ₽</div>
						<div className='text-xs text-gray-500'>7 дней доступа</div>
						<ul className='mt-4 text-sm text-gray-700 space-y-2 list-disc pl-4'>
							<li>Все сценарии недели</li>
							<li>Напоминания «If‑Then»</li>
							<li>Отмена в один клик</li>
						</ul>
						<button
							onClick={() => setIsPayOpen(true)}
							className={`mt-5 inline-flex w-full justify-center px-4 py-3 rounded-2xl font-semibold ${UI.cta}`}
						>
							Оплатить 99 ₽ и начать
						</button>
					</div>

					{/* Подписка */}
					<div data-price-card className='rounded-3xl border p-6'>
						<div className='text-sm font-semibold text-orange-700'>
							Подписка • месяц
						</div>
						<div className='mt-2 text-4xl font-extrabold'>349 ₽</div>
						<div className='text-xs text-gray-500'>в месяц</div>
						<ul className='mt-4 text-sm text-gray-700 space-y-2 list-disc pl-4'>
							<li>Полная библиотека сценариев</li>
							<li>Семейные челленджи</li>
							<li>История прогресса</li>
						</ul>
						<button
							onClick={() => setIsPayOpen(true)}
							className={`mt-5 inline-flex w-full justify-center px-4 py-3 rounded-2xl font-semibold ${UI.cta}`}
						>
							Оформить подписку
						</button>
					</div>
				</div>

				{/* Лейблы под тарифами */}
				<div className='mt-4 flex flex-wrap items-center gap-2 text-sm'>
					<span className={UI.pill}>↩︎ Отмена в 1 клик</span>
					<span className={UI.pill}>🔒 Оплата защищена</span>
					<span className={UI.pill}>⚡ Моментальный доступ</span>
				</div>
			</section>

			{/* FAQ — после тарифов, сворачиваемые items */}
			<section id='faq' className='max-w-6xl mx-auto px-4 py-12'>
				<h2 className='text-2xl md:text-3xl font-semibold'>
					Частые вопросы
				</h2>
				<div className='mt-6 grid md:grid-cols-2 gap-6'>
					{[
						{
							q: 'Почему 25 минут?',
							a: 'Потому что это реально выполнить даже в загруженный день. Этого хватает, чтобы поиграть, услышать друг друга и завершить вечер «тёплой точкой». Важно делать регулярно.'
						},
						{
							q: 'Двое детей разного возраста?',
							a: 'Берём сценарий под старшего. Младшему — простые роли. Подсказки есть в описании.'
						},
						{
							q: 'Пропустили вечер?',
							a: 'Ок. Перенесём на завтра. Напоминания вернут в ритм.'
						},
						{
							q: 'Оплата безопасна?',
							a: 'Да, через проверенного провайдера. Данные карты не храним.'
						},
						{
							q: 'Можно отменить?',
							a: 'Да, в один клик в любой момент. Без звонков и объяснений.'
						}
					].map((item, i) => (
						<details
							key={i}
							className='rounded-2xl border bg-white p-5 group'
						>
							<summary className='cursor-pointer select-none font-semibold text-gray-900 flex items-center justify-between'>
								{item.q}
								<span
									aria-hidden
									className='ml-3 text-orange-700 group-open:rotate-180 transition-transform'
								>
									▾
								</span>
							</summary>
							<p className='mt-3 text-gray-700 text-sm'>{item.a}</p>
						</details>
					))}
				</div>
			</section>

			{/* FOOTER */}
			<footer className='max-w-6xl mx-auto px-4 py-10 text-sm text-gray-600'>
				<div className='grid md:grid-cols-3 gap-6'>
					<div>
						<div className='font-semibold'>25‑минутные окна</div>
						<p className='mt-2'>Простые семейные ритуалы каждый день.</p>
					</div>
					<div>
						<div className='font-semibold'>Контакты</div>
						<p className='mt-2'>hi@25windows.ru</p>
						<p>Telegram: @twentyfive_windows</p>
					</div>
					<div>
						<div className='font-semibold'>Документы</div>
						<ul className='mt-2 space-y-1'>
							<li>
								<button
									type='button'
									className='hover:text-orange-700 underline'
									onClick={() => setIsOfferOpen(true)}
								>
									Публичная оферта
								</button>
							</li>
							<li>
								<button
									type='button'
									className='hover:text-orange-700 underline'
									onClick={() => setIsPrivacyOpen(true)}
								>
									Политика конфиденциальности
								</button>
							</li>
						</ul>
					</div>
				</div>
				<div className='mt-8 text-xs'>© {thisYear} 25‑минутные окна</div>
			</footer>

			{/* STICKY CTA — appears after 15 min (or 6s with ?preview=1). Accent animation for a few seconds */}
			{showSticky && (
				<div
					className='fixed z-40 left-4 right-4 md:right-6 bottom-4 md:bottom-6 flex items-center justify-center gap-3 p-3 border bg-white rounded-xl shadow-lg'
					style={{
						paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))'
					}}
				>
					<span className='text-xs text-gray-600'>
						Готовы вернуть 25 минут сегодня?
					</span>
					<button
						onClick={() => setIsPayOpen(true)}
						className={`px-4 py-2 min-h-[44px] rounded-xl text-sm font-semibold ${UI.cta} `}
					>
						Начать 7 дней / 99 ₽
					</button>
				</div>
			)}

			{/* PAYMENT MODAL */}
			{isPayOpen && (
				<div
					className='fixed inset-0 z-50 grid place-items-center p-4'
					role='dialog'
					aria-modal='true'
					onClick={() => setIsPayOpen(false)}
				>
					<div className='absolute inset-0 bg-black/45' />
					<div
						className='relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden'
						onClick={(e) => e.stopPropagation()}
					>
						<div className='h-1.5 bg-gradient-to-r from-orange-500 to-orange-700' />
						<div className='p-7'>
							<div className='flex items-start justify-between'>
								<h3 className='text-2xl font-bold text-gray-900'>
									Оплата доступа
								</h3>
								<button
									onClick={() => setIsPayOpen(false)}
									className='text-gray-400 hover:text-gray-700 text-xl'
									aria-label='Закрыть'
								>
									×
								</button>
							</div>
							<div className='mt-5 rounded-2xl border border-orange-100 bg-orange-50 p-5'>
								<div className='text-sm text-gray-600'>Тариф</div>
								<div className='mt-1 flex items-baseline justify-between'>
									<div className='font-semibold'>Старт — 7 дней</div>
									<div className='text-2xl font-extrabold text-gray-900'>
										99 ₽
									</div>
								</div>
								<ul className='mt-3 text-sm text-gray-700 space-y-1 list-disc pl-5'>
									<li>Моментальный доступ ко всем сценариям недели</li>
									<li>Напоминания и «If‑Then» план</li>
									<li>Отмена в 1 клик в любое время</li>
								</ul>
							</div>
							<a
								href={payLink}
								target='_blank'
								rel='noreferrer'
								className={`mt-6 block w-full text-center py-3 rounded-2xl font-semibold ${UI.cta}`}
							>
								Перейти к оплате
							</a>
							<p className='mt-4 text-[11px] leading-snug text-gray-500 text-center'>
								Нажимая «Перейти к оплате», вы соглашаетесь с{' '}
								<button
									className='underline hover:text-orange-700'
									onClick={() => setIsOfferOpen(true)}
								>
									офертой
								</button>{' '}
								и{' '}
								<button
									className='underline hover:text-orange-700'
									onClick={() => setIsPrivacyOpen(true)}
								>
									политикой конфиденциальности
								</button>
								.
							</p>
						</div>
					</div>
				</div>
			)}

			{/* SCENARIO SLIDE-OVER */}
			{isScenarioOpen && activeScenarioIndex !== null && (
				<div className='fixed inset-0 z-50' role='dialog' aria-modal='true'>
					<div
						className='absolute inset-0 bg-black/45'
						onClick={closeScenario}
					/>
					<aside className='absolute right-0 top-0 h-full w-full max-w-md bg-white border-l shadow-2xl flex flex-col'>
						<header className='p-5 border-b flex items-start justify-between'>
							<div>
								<h3 className='text-lg font-semibold'>
									{scenarios[activeScenarioIndex].t}
								</h3>
								<div className='mt-1 text-xs text-orange-700'>
									{scenarios[activeScenarioIndex].age} •{' '}
									{scenarios[activeScenarioIndex].dur}
								</div>
							</div>
							<button
								ref={closeScenarioBtnRef}
								onClick={closeScenario}
								className='text-gray-400 hover:text-gray-600'
								aria-label='Закрыть'
							>
								✕
							</button>
						</header>
						<div className='p-5 overflow-y-auto space-y-4'>
							<img
								src={scenarios[activeScenarioIndex].img}
								alt={scenarios[activeScenarioIndex].t}
								className='w-full h-40 object-cover rounded-xl border'
								onError={imageFallback}
							/>
							<p className='text-sm text-gray-700'>
								{scenarios[activeScenarioIndex].short}
							</p>

							{scenarios[activeScenarioIndex].long && (
								<details className='rounded-xl border bg-orange-50/40 p-4 group'>
									<summary className='cursor-pointer select-none font-semibold text-gray-900 flex items-center justify-between'>
										Подробнее о сценарии
										<span
											aria-hidden
											className='ml-3 text-orange-700 group-open:rotate-180 transition-transform'
										>
											▾
										</span>
									</summary>
									<p className='mt-3 text-sm text-gray-700'>
										{scenarios[activeScenarioIndex].long}
									</p>
								</details>
							)}

							<div className='flex flex-wrap gap-2 text-xs'>
								{scenarios[activeScenarioIndex].goal && (
									<span className={UI.pill}>
										🎯 {scenarios[activeScenarioIndex].goal}
									</span>
								)}
								{scenarios[activeScenarioIndex].materials && (
									<span className={UI.pill}>
										🧰 {scenarios[activeScenarioIndex].materials}
									</span>
								)}
							</div>

							<div>
								<div className='font-semibold'>Шаги</div>
								<ol className='mt-2 list-decimal pl-5 text-sm text-gray-700 space-y-2'>
									{scenarios[activeScenarioIndex].steps.map(
										(st, idx) => (
											<li key={idx}>{st}</li>
										)
									)}
								</ol>
							</div>

							{(scenarios[activeScenarioIndex].tips ||
								scenarios[activeScenarioIndex].adapt) && (
								<details className='rounded-xl border p-4'>
									<summary className='cursor-pointer select-none font-semibold text-gray-900'>
										Советы и адаптация
									</summary>
									{scenarios[activeScenarioIndex].tips && (
										<ul className='mt-3 list-disc pl-5 text-sm text-gray-700 space-y-1'>
											{scenarios[activeScenarioIndex].tips.map(
												(t, i) => (
													<li key={i}>{t}</li>
												)
											)}
										</ul>
									)}
									{scenarios[activeScenarioIndex].adapt && (
										<div className='mt-3 grid grid-cols-1 gap-3 text-sm'>
											{scenarios[activeScenarioIndex].adapt
												.younger && (
												<div className='rounded-lg bg-orange-50/60 p-3'>
													<strong>Младшим:</strong>{' '}
													{
														scenarios[activeScenarioIndex].adapt
															.younger
													}
												</div>
											)}
											{scenarios[activeScenarioIndex].adapt
												.older && (
												<div className='rounded-lg bg-orange-50/60 p-3'>
													<strong>Старшим:</strong>{' '}
													{
														scenarios[activeScenarioIndex].adapt
															.older
													}
												</div>
											)}
											{scenarios[activeScenarioIndex].adapt
												.siblings && (
												<div className='rounded-lg bg-orange-50/60 p-3'>
													<strong>Если двое детей:</strong>{' '}
													{
														scenarios[activeScenarioIndex].adapt
															.siblings
													}
												</div>
											)}
										</div>
									)}
								</details>
							)}

							{(scenarios[activeScenarioIndex].timeplan ||
								scenarios[activeScenarioIndex].safety) && (
								<details className='rounded-xl border p-4'>
									<summary className='cursor-pointer select-none font-semibold text-gray-900'>
										Время по минутам и безопасность
									</summary>
									{scenarios[activeScenarioIndex].timeplan && (
										<ul className='mt-3 list-disc pl-5 text-sm text-gray-700 space-y-1'>
											{scenarios[activeScenarioIndex].timeplan.map(
												(t, i) => (
													<li key={i}>{t}</li>
												)
											)}
										</ul>
									)}
									{scenarios[activeScenarioIndex].safety && (
										<p className='mt-3 text-sm text-gray-700'>
											<strong>Важно:</strong>{' '}
											{scenarios[activeScenarioIndex].safety}
										</p>
									)}
								</details>
							)}
						</div>
						<footer className='p-5 border-t'>
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
		</div>
	)
}
