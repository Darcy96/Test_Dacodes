'use client'
import { Box, Button, Typography } from '@mui/material'

import { TransferTable } from '@components/organisms'

import { useRouter } from 'next/navigation'

export default function TransferListPage() {
	
	const router = useRouter() // 🧭 Accessing the Next.js router for navigation

	// 🚀 Handling the creation of a new transfer
	const handleAddTransferencia = () => {
		router.push('/transfers/create') // 🧭 Navigating to the transfer creation page
	}

	return (
		<Box role="main" aria-label="Transfer list page">
			<Box
				component="header"
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: '20px'
				}}
			>
				<Typography
					variant="h1"
					gutterBottom
					tabIndex={0}
					aria-label="Transfers section"
				>
					Transfers
				</Typography>

				<Button
					variant="contained"
					color="primary"
					onClick={handleAddTransferencia}
					aria-label="Create new transfer"
					accessKey="n"
				>
					Add transfer
				</Button>
			</Box>

			<TransferTable />
		</Box>
	)
}
