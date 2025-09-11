'use client'

import React from 'react'
import { Modal, Typography } from 'antd'
import SubscriptionForm from './SubscriptionForm'

const { Title, Paragraph } = Typography

interface OrderModalProps {
	open: boolean
	onClose: () => void
}

const OrderModal: React.FC<OrderModalProps> = ({ open, onClose }) => {
        return (
                <Modal
                        open={open}
                        onCancel={onClose}
			footer={null}
			centered
			destroyOnClose
			maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
		>
			<div className='text-center p-4'>
                                <Title level={4}>Получить гайд</Title>
                                <Paragraph>Оставьте телефон или email — мы отправим материалы</Paragraph>

				<SubscriptionForm />
			</div>
		</Modal>
	)
}

export default OrderModal
