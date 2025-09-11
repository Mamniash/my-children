'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Row, Col, Modal, Progress } from 'antd'
import {
        ResponsiveContainer,
        LineChart,
        Line,
        CartesianGrid,
        XAxis,
        YAxis,
        Tooltip
} from 'recharts'

interface Benefit {
        title: string
        description: string
        details: string
        research: string
        chartData: { name: string; value: number }[]
        metrics: { label: string; value: number }[]
}

const defaultChart = [
        { name: 'Нед 1', value: 40 },
        { name: 'Нед 2', value: 55 },
        { name: 'Нед 3', value: 70 },
        { name: 'Нед 4', value: 82 }
]

const WhyChooseSection = () => {
        const benefits: Benefit[] = [
                {
                        title: 'База знаний без инфошума',
                        description: 'Только проверенные ответы на вопросы новых ИП — ничего лишнего.',
                        details:
                                'Мы собрали обязательные шаги и объяснения простым языком, чтобы вы не терялись в тоннах советов из интернета.',
                        research: 'Внутренние данные, 2024',
                        chartData: defaultChart,
                        metrics: [
                                { label: 'Экономия времени', value: 80 },
                                { label: 'Понимание', value: 90 }
                        ]
                },
                {
                        title: 'Пошаговый план 0→1',
                        description: 'Следуйте нашему маршруту от первых документов до первых продаж.',
                        details:
                                'План помогает не пропустить важные действия и сосредоточиться на развитии бизнеса.',
                        research: 'Опрос участников, 2024',
                        chartData: defaultChart,
                        metrics: [
                                { label: 'Уверенность', value: 85 },
                                { label: 'Старт продаж', value: 70 }
                        ]
                },
                {
                        title: 'Комьюнити и поддержка менторов',
                        description: 'Опытные предприниматели и такие же новички рядом, чтобы не оставаться одним.',
                        details:
                                'Получайте советы, делитесь прогрессом и находите ответы быстрее.',
                        research: 'Сообщество 0→1',
                        chartData: defaultChart,
                        metrics: [
                                { label: 'Поддержка', value: 95 },
                                { label: 'Рост', value: 60 }
                        ]
                }
        ]

        const [activeIdx, setActiveIdx] = React.useState<number | null>(null)

        return (
                <section className='pt-16 pb-6 bg-[var(--primary)] text-white'>
                        <div className='container mx-auto px-4'>
                                <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        viewport={{ once: true }}
                                        className='text-center mb-12'
                                >
                                        <h2 className='text-3xl md:text-4xl font-bold mb-6'>
                                                Почему это работает
                                        </h2>

                                        <Row gutter={[32, 32]} className='mt-12'>
                                                {benefits.map(({ title, description }, idx) => (
                                                        <Col xs={24} md={12} key={idx}>
                                                                <motion.div
                                                                        whileHover={{ scale: 1.03 }}
                                                                        transition={{ duration: 0.3 }}
                                                                        className='bg-[#4A154B] rounded-xl p-8 h-full cursor-pointer'
                                                                        onClick={() => setActiveIdx(idx)}
                                                                >
                                                                        <h4 className='text-2xl font-bold mb-4'>{title}</h4>
                                                                        <p className='text-gray-300'>{description}</p>
                                                                </motion.div>
                                                        </Col>
                                                ))}
                                        </Row>
                                </motion.div>
                        </div>

                        <Modal
                                open={activeIdx !== null}
                                onCancel={() => setActiveIdx(null)}
                                footer={null}
                                centered
                                width={700}
                                bodyStyle={{ background: '#fff', borderRadius: '8px' }}
                        >
                                {activeIdx !== null && (
                                        <div>
                                                <h3 className='text-2xl font-bold mb-2 text-center'>
                                                        {benefits[activeIdx].title}
                                                </h3>
                                                <p className='mb-4 text-gray-700 text-center'>
                                                        {benefits[activeIdx].details}
                                                </p>
                                                <ResponsiveContainer width='100%' height={200}>
                                                        <LineChart data={benefits[activeIdx].chartData}>
                                                                <CartesianGrid strokeDasharray='3 3' />
                                                                <XAxis dataKey='name' />
                                                                <YAxis />
                                                                <Tooltip />
                                                                <Line type='monotone' dataKey='value' stroke='#4A154B' strokeWidth={2} />
                                                        </LineChart>
                                                </ResponsiveContainer>
                                                <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
                                                        {benefits[activeIdx].metrics.map(({ label, value }) => (
                                                                <div key={label}>
                                                                        <span className='text-sm font-semibold'>{label}</span>
                                                                        <Progress percent={value} strokeColor='#4A154B' showInfo={false} />
                                                                </div>
                                                        ))}
                                                </div>
                                                <p className='mt-6 text-xs text-gray-500 text-center'>
                                                        Источник: {benefits[activeIdx].research}
                                                </p>
                                        </div>
                                )}
                        </Modal>
                </section>
        )
}

export default WhyChooseSection
