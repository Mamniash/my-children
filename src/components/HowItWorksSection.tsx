'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'

const features = [
	{
		title: 'Всё о налогах и отчётности на одном языке',
		description:
			'Простые объяснения налоговых режимов, отчётности и обязательств без сложного жаргона.',
		image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80'
	},
	{
		title: 'Пошаговый план действий',
		description:
			'Чёткий чек-лист первых месяцев работы: от открытия счёта до первых продаж.',
		image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80'
	},
	{
		title: 'Закрытое комьюнити таких же новичков',
		description:
			'Общайтесь, делитесь опытом и находите партнёров в защищённом телеграм-канале.',
		image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80'
	},
	{
		title: 'Доступ к менторам и полезным сервисам',
		description:
			'Рекомендации проверенных экспертов и сервисов, когда вы готовы идти глубже.',
		image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80'
	}
]

const HowItWorksSection = () => {
        const [currentSlide, setCurrentSlide] = useState(0)
        const [sliderRef, instanceRef] = useKeenSlider({
                loop: true,
                slides: { perView: 1, spacing: 16 },
                breakpoints: {
                        '(min-width: 768px)': {
                                slides: { perView: 2, spacing: 24 }
                        },
                        '(min-width: 1024px)': {
                                slides: { perView: 3, spacing: 32 }
                        }
                },
                slideChanged(slider) {
                        setCurrentSlide(slider.track.details.rel)
                }
        })

        return (
                <section className='pb-16 pt-6 bg-[var(--background)]'>
                        <div className='container mx-auto px-4'>
                                <h2 className='text-3xl md:text-4xl font-bold mb-8 text-center'>
                                        Что вы получите
                                </h2>
                                <div className='relative'>
                                        <div ref={sliderRef} className='keen-slider'>
                                                {features.map(({ title, description, image }, idx) => (
                                                        <div key={idx} className='keen-slider__slide'>
                                                                <div className='bg-white rounded-xl overflow-hidden shadow'>
                                                                        <div className='relative h-48'>
                                                                                <Image
                                                                                        src={image}
                                                                                        alt={title}
                                                                                        fill
                                                                                        className='object-cover'
                                                                                />
                                                                        </div>
                                                                        <div className='p-6 text-left'>
                                                                                <h3 className='text-xl font-semibold mb-2'>
                                                                                        {title}
                                                                                </h3>
                                                                                <p className='text-gray-700'>{description}</p>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                ))}
                                        </div>
                                        <div className='flex justify-center gap-2 mt-4 md:hidden'>
                                                {features.map((_, idx) => (
                                                        <button
                                                                key={idx}
                                                                onClick={() => instanceRef.current?.moveToIdx(idx)}
                                                                className={`w-2 h-2 rounded-full ${
                                                                        currentSlide === idx
                                                                                ? 'bg-gray-800'
                                                                                : 'bg-gray-300'
                                                                }`}
                                                        />
                                                ))}
                                        </div>
                                        <button
                                                onClick={() => instanceRef.current?.prev()}
                                                className='hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white text-gray-700 p-3 rounded-full shadow hover:bg-gray-100'
                                        >
                                                <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        viewBox='0 0 24 24'
                                                        fill='none'
                                                        stroke='currentColor'
                                                        strokeWidth='2'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        className='w-5 h-5'
                                                >
                                                        <path d='M15 19l-7-7 7-7' />
                                                </svg>
                                        </button>
                                        <button
                                                onClick={() => instanceRef.current?.next()}
                                                className='hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white text-gray-700 p-3 rounded-full shadow hover:bg-gray-100'
                                        >
                                                <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        viewBox='0 0 24 24'
                                                        fill='none'
                                                        stroke='currentColor'
                                                        strokeWidth='2'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        className='w-5 h-5'
                                                >
                                                        <path d='M9 5l7 7-7 7' />
                                                </svg>
                                        </button>
                                </div>
                        </div>
                </section>
        )
}

export default HowItWorksSection

