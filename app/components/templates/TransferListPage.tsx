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
		<Box>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: '20px'
				}}
			>
				<Typography
					variant="h4"
					gutterBottom
				>
					Transfers
				</Typography>
			
					<Button
						variant="contained"
						color="primary"
						onClick={handleAddTransferencia}
					>
						Add transfer
					</Button>
				
			</Box>

			<TransferTable />
		</Box>
	)
}
