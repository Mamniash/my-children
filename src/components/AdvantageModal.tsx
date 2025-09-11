'use client'

import React, { useState } from 'react'
import { Modal, Typography, Button } from 'antd'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	RadarChart,
	Radar,
	PolarGrid,
	PolarAngleAxis,
	LineChart,
	Line,
	AreaChart,
	Area,
	Cell
} from 'recharts'
import OrderModal from './OrderModal'

const { Title, Paragraph } = Typography

interface AdvantageModalProps {
	open: boolean
	onClose: () => void
	title: string
	description: string
	type: 'price' | 'all-in-one' | 'discounts' | 'balance'
}

const AdvantageModal: React.FC<AdvantageModalProps> = ({
	open,
	onClose,
	title,
	description,
	type
}) => {
	const [orderOpen, setOrderOpen] = useState(false)

	const chartData = {
		price: [
			{ name: 'Мы', price: 880 },
			{ name: 'Самокат', price: 1090 },
			{ name: 'Сбер', price: 1140 },
			{ name: 'Яндекс', price: 1200 }
		],
		allInOne: [
			{ week: '', time: 6 },
			{ week: '1-я', time: 5 },
			{ week: '2-я', time: 2 },
			{ week: '3-я', time: 1 }
		],
		discounts: [
			{ week: '', savings: 0 },
			{ week: '1-я', savings: 4400 },
			{ week: '2-я', savings: 6900 },
			{ week: '3-я', savings: 7800 },
			{ week: '4-я', savings: 8000 }
		],
		balance: [
			{ subject: 'Белки', A: 90 },
			{ subject: 'Жиры', A: 75 },
			{ subject: 'Углеводы', A: 85 },
			{ subject: 'Витамины', A: 80 },
			{ subject: 'Минералы', A: 70 }
		]
	}

        const chartColors = {
                price: ['#611f69', '#36c5f0', '#2eb67d', '#e01e5a'],
                allInOne: '#36c5f0',
                discounts: '#2eb67d',
                balance: '#e01e5a'
        }

	const renderChart = () => {
		switch (type) {
			case 'price':
				return (
					<>
						<div className='max-w-[320px] mx-auto text-center'>
							<ResponsiveContainer
								width={336}
								height={200}
								className='relative -left-7'
							>
								<BarChart data={chartData.price}>
									<XAxis dataKey='name' tick={{ fontSize: 11 }} />
									<YAxis />
									<Tooltip />
									<Bar
										dataKey='price'
										radius={[6, 6, 0, 0]}
										label={{
											position: 'insideTop',
											fill: '#fff',
											fontSize: 12
										}}
									>
										{chartData.price.map((_, i) => (
											<Cell key={i} fill={chartColors.price[i]} />
										))}
									</Bar>
								</BarChart>
							</ResponsiveContainer>
						</div>
						<Paragraph className='text-sm'>
							Сравнение стоимости продуктовой корзины
							в&nbsp;популярных&nbsp;сервисах.
						</Paragraph>
					</>
				)

			case 'all-in-one':
				return (
					<>
						<div className='max-w-[320px] mx-auto text-center'>
							<ResponsiveContainer
								width={320}
								height={200}
								className='relative -left-7'
							>
								<AreaChart data={chartData.allInOne}>
									<XAxis
										dataKey='week'
										tick={{ fontSize: 11 }}
										label={{
											value: 'Неделя',
											position: 'insideBottom',
											offset: -5,
											dy: -4
										}}
									/>
									<YAxis
										label={{
											value: 'Часов',
											angle: -90,
											position: 'insideLeft',
											dx: 15,
											style: { textAnchor: 'middle', fontSize: 12 }
										}}
									/>
									<Tooltip />
									<Area
										type='monotone'
										dataKey='time'
										stroke={chartColors.allInOne}
										fill='#e0f7fa'
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
						<Paragraph className='text-sm mt-2'>
							С каждой неделей вы тратите всё меньше времени на
							планирование, покупки и заказы. Система учится и
							автоматизирует всё&nbsp;под&nbsp;вас.
						</Paragraph>
					</>
				)

			case 'discounts':
				return (
					<>
						<div className='max-w-[320px] mx-auto text-center'>
							<ResponsiveContainer
								width={320}
								height={200}
								className='relative -left-7'
							>
								<LineChart data={chartData.discounts}>
									<XAxis
										dataKey='week'
										tick={{ fontSize: 11 }}
										label={{
											value: 'Неделя',
											position: 'insideBottom',
											offset: -5,
											dy: -4
										}}
									/>
									<YAxis
										label={{
											value: 'Рублей',
											angle: -90,
											position: 'insideLeft',
											dx: 4,
											style: { textAnchor: 'middle', fontSize: 12 }
										}}
									/>
									<Tooltip />
									<Line
										type='monotone'
										dataKey='savings'
										stroke={chartColors.discounts}
										strokeWidth={3}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
						<Paragraph className='text-sm mt-2'>
							Вы видите, как меняется ваша экономия с каждой неделей.
							Скидки и акции подставляются автоматически —
							вы&nbsp;просто&nbsp;заказываете.
						</Paragraph>
					</>
				)

			case 'balance':
				return (
					<>
						<div className='max-w-[320px] mx-auto'>
							<ResponsiveContainer width='100%' height={200}>
								<RadarChart outerRadius={80} data={chartData.balance}>
									<PolarGrid />
									<PolarAngleAxis
										dataKey='subject'
										tick={{ fontSize: 11 }}
									/>
									<Radar
										dataKey='A'
										stroke={chartColors.balance}
										fill={chartColors.balance}
										fillOpacity={0.4}
									/>
									<Tooltip />
								</RadarChart>
							</ResponsiveContainer>
						</div>
						<Paragraph className='text-sm'>
							Баланс нутриентов — это основа вашего здоровья. Система
							рассчитывает меню по ключевым показателям: белки, жиры,
							витамины&nbsp;и&nbsp;др.
						</Paragraph>
					</>
				)
		}
	}

	return (
		<>
			<Modal
				open={open}
				onCancel={onClose}
				footer={null}
				centered
				width={480}
			>
				<Title level={4} className='mb-2'>
					{title}
				</Title>
				<Paragraph className='text-sm'>{description}</Paragraph>
				<div className='mt-4'>{renderChart()}</div>

				<div className='text-center mt-6'>
                                        <Button
                                                type='primary'
                                                shape='round'
                                                size='large'
                                                onClick={() => setOrderOpen(true)}
                                        >
                                                Получить гайд
                                        </Button>
				</div>
			</Modal>

			<OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} />
		</>
	)
}

export default AdvantageModal
