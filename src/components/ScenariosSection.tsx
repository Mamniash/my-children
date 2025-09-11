'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import { motion } from 'framer-motion'
import OrderModal from './OrderModal'

const scenarios = [
        {
                title: 'Налоги и отчётность',
                description:
                        'Разбираемся с режимами, взносами и календарём обязательных отчётов.',
                image: 'https://images.unsplash.com/photo-1581091215367-1a831416638b?auto=format&fit=crop&w=600&q=80'
        },
        {
                title: 'План действий на первый месяц',
                description:
                        'Список задач, который поможет выйти на первые продажи.',
                image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80'
        },
        {
                title: 'Первые клиенты',
                description:
                        'Проверенные способы найти заказчиков и запустить продажи.',
                image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80'
        },
        {
                title: 'Комьюнити и менторы',
                description:
                        'Чат с участниками и доступ к менторам, когда нужно больше.',
                image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80'
        }
]

const ScenariosSection = () => {
        const [currentSlide, setCurrentSlide] = useState(0)
        const [isModalOpen, setIsModalOpen] = useState(false)
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
                <section className='py-16 bg-white'>
                        <div className='container mx-auto px-4 text-center'>
                                <h2 className='text-3xl md:text-4xl font-bold mb-8'>Темы курса</h2>
                                <div className='relative'>
                                        <div ref={sliderRef} className='keen-slider'>
                                                {scenarios.map(({ title, description, image }, idx) => (
                                                        <div key={idx} className='keen-slider__slide'>
                                                                <div className='bg-gray-50 rounded-xl overflow-hidden shadow'>
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
                                                {scenarios.map((_, idx) => (
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
                                <motion.button
                                        onClick={() => setIsModalOpen(true)}
                                        className='btn-primary px-8 py-3 mt-8'
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                >
                                        Присоединиться
                                </motion.button>
                                <OrderModal
                                        open={isModalOpen}
                                        onClose={() => setIsModalOpen(false)}
                                />
                        </div>
                </section>
        )
}

export default ScenariosSection

