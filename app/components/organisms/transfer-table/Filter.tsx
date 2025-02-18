'use client'
import React from 'react'

import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, styled, TextField, Typography } from '@mui/material'
import { transferTypes } from '@constants/general'
import { Transfers } from 'app/types'

interface Props {
	transfers: Transfers[] | undefined
	filters: {
		plate: string
		type: string
	}
	setFilters: React.Dispatch<
		React.SetStateAction<{
			plate: string
			type: string
		}>
	>
}

const FilterContainer = styled(Box)`
	padding: 10px;
	display: flex;
	gap: 8px;
	margin-bottom: 16px;
	align-items: center;
	border-radius: 8px;
	box-shadow: inherit;
	color: rgb(230, 235, 241);
	border: 1px solid;
	background: white;
`

const StyledFormControl = styled(FormControl)`
	min-width: 150px;
`

export default function Filter({ filters, setFilters }: Props) {
	const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFilters((prev) => ({ ...prev, [name]: value }))
	}

	const handleSelectChange = (e: SelectChangeEvent<string>) => {
		const { name, value } = e.target
		setFilters((prev) => ({ ...prev, [name!]: value === 'Show all' ? '' : value }))
	}

	return (
		<FilterContainer
			role="search"
			aria-label="Transfer filters"
		>
			<Typography
				color="textPrimary"
				variant="h6"
				component="h2"
				id="filter-section-title"
			>
				Filter
			</Typography>
			<TextField
				label="Plate"
				name="plate"
				value={filters.plate}
				onChange={handleTextFieldChange}
				variant="outlined"
				size="small"
				aria-label="Filter by plate number"
				slotProps={{
					htmlInput: {
						'aria-describedby': 'plate-hint',
					},
				}}
			/>
			<StyledFormControl size="small">
				<InputLabel id="type-label">Type</InputLabel>
				<Select
					labelId="type-label"
					name="type"
					label="Type"
					value={filters.type}
					onChange={handleSelectChange}
					aria-label="Filter by transfer type"
					inputProps={{
						'aria-describedby': 'type-hint',
					}}
				>
					<MenuItem 
						value="Show all"
						role="option"
						aria-label="Show all types"
					>
						<em>Show all</em>
					</MenuItem>
					{transferTypes.map((type) => (
						<MenuItem
							key={type}
							value={type}
							role="option"
							aria-label={`Filter by ${type}`}
						>
							{type}
						</MenuItem>
					))}
				</Select>
			</StyledFormControl>
		</FilterContainer>
	)
}
