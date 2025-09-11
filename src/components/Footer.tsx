'use client'

import React from 'react'

const Footer = () => {
        const currentYear = new Date().getFullYear()

        return (
                <footer className='bg-[var(--primary)] text-white py-8'>
                        <div className='container mx-auto px-4 text-center'>
                                <p className='mb-4'>
                                        Мы не передаём ваши контакты третьим лицам. Отправляя данные, вы
                                        соглашаетесь с обработкой персональных данных.
                                </p>
                                <p className='text-sm text-gray-400'>© {currentYear}</p>
                        </div>
                </footer>
        )
}

export default Footer

