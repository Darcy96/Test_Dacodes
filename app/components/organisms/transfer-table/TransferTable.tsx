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
		<Box 
			role="region" 
			aria-label="Transfers table section"
		>
			<Filter
				filters={filters}
				setFilters={setFilters}
				transfers={transfers}
				aria-labelledby="transfer-filters"
				aria-label="Transfer filters"
			/>
			{spinnerMessage ? (
				<MySpinner message={spinnerMessage} />
			) : (
				<Paper 
					sx={{ borderRadius: '8px', boxShadow: 'inherit', color: 'rgb(230, 235, 241)', border: '1px solid' }}
					role="region"
					aria-label="Transfers data"
				>
					{headers && (
						<TableContainer 
							sx={{ maxHeight: '80vh', borderRadius: '8px' }}
							tabIndex={0}
							role="region"
							aria-label="Scrollable transfers table"
						>
							<Table 
								stickyHeader
								aria-labelledby="transfer-filters"
								role="grid"
							>
								<TableHead>
									<TableRow role="row">
										{headers.map((header) => (
											<TableCell 
												key={header}
												role="columnheader"
												aria-sort="none"
											>
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
											onKeyDown={(e) => {
												if (e.key === 'Enter' || e.key === ' ') {
													router.push(`/transfers/edit/${transfer.id}`)
												}
											}}
											tabIndex={0}
											role="row"
											aria-label={`Transfer ${transfer.id} - ${transfer.plate}`}
										>
											{headers.map((header) => (
												<TableCell 
													key={header}
													role="gridcell"
												>
													{header === 'created_at' 
														? new Date(transfer[header] as string).toLocaleString() 
														: transfer[header]}
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
