'use client'
import { useTransfers } from '@api/transfers/hooks'

import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Transfers } from 'app/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import Filter from './Filter'
import { MySpinner } from '@components/index'

export default function TransferTable() {
	const router = useRouter()
	const { data: transfers, isLoading, isError, error } = useTransfers()
	const [spinnerMessage, setSpinnerMessage] = useState('')
	const [headers, setHeaders] = useState<(keyof Transfers)[] | null>(null)
	const [filters, setFilters] = useState({ plate: '', type: '' })

	// Optimized filtering
	const filteredTransfers = useMemo(() => {
		if (!transfers?.length) return []
		return transfers.filter((t) => t.plate.toLowerCase().includes(filters.plate.toLowerCase()) && (!filters.type || t.type === filters.type))
	}, [transfers, filters])

	// Simplified useEffect
	useEffect(() => {
		if (isLoading) return setSpinnerMessage('Loading transfers')
		if (isError) return setSpinnerMessage(`Error: ${error.message}`)
		if (!filteredTransfers.length) return setSpinnerMessage('No transfers available')

		if (!headers && filteredTransfers.length) {
			setHeaders(Object.keys(filteredTransfers[0]) as (keyof Transfers)[])
		}
		setSpinnerMessage('')
	}, [isLoading, isError, error, filteredTransfers, headers])

	return (
		<Box>
			<Filter
				filters={filters}
				setFilters={setFilters}
				transfers={transfers}
			/>
			{spinnerMessage ? (
				<MySpinner message={spinnerMessage} />
			) : (
				<Paper sx={{ borderRadius: '8px', boxShadow: 'inherit', color: 'rgb(230, 235, 241)', border: '1px solid' }}>
					{headers && (
						<TableContainer sx={{ maxHeight: '80vh', borderRadius: '8px' }}>
							<Table stickyHeader>
								<TableHead>
									<TableRow>
										{headers.map((header) => (
											<TableCell key={header}>
												<Typography
													variant="subtitle1"
													fontWeight={600}
													textTransform="capitalize"
												>
													{header.replace(/_/g, ' ')}
												</Typography>
											</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{filteredTransfers.map((transfer) => (
										<TableRow
											hover
											key={transfer.id}
											sx={{ cursor: 'pointer' }}
											onClick={() => router.push(`/transfers/edit/${transfer.id}`)}
										>
											{headers.map((header) => (
												<TableCell key={header}>
													{header === 'created_at' ? new Date(transfer[header] as string).toLocaleString() : transfer[header]}
												</TableCell>
											))}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</Paper>
			)}
		</Box>
	)
}
