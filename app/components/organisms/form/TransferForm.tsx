'use client'

import { Box, Button, MenuItem, TextField } from '@mui/material'
import React, { useState } from 'react'

import { Transfers, Users } from 'app/types'

import { transferTypes } from '@constants/general'
import { UseMutationResult } from '@tanstack/react-query'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

interface Props {
	formData: Omit<Transfers, 'id'>
	setFormData: React.Dispatch<React.SetStateAction<Omit<Transfers, 'id'>>>
	clients?: Users[]
	
	transferId?: number
	create: UseMutationResult<Transfers, Error, Omit<Transfers, 'id'>, unknown>
	router: AppRouterInstance
	edit: UseMutationResult<
		Transfers,
		Error,
		{
			id: number
			data: Partial<Transfers>
		},
		unknown
	>
}
export default function TransferForm({ transferId, create, edit, router, formData, setFormData, clients }: Props) {
	const [errors, setErrors] = useState<Record<keyof Omit<Transfers, 'id' | 'created_at'>, boolean>>({
		plate: false,
		type: false,
		client: false,
		transmitter: false,
		service: false,
		
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: name === 'service' ? Number(value) : value }))
	}

	const getCommonTextFieldProps = (name: keyof typeof errors, label: string) => ({
		label,
		name,
		value: formData[name],
		onChange: handleChange,
		error: errors[name],
		helperText: errors[name] && 'This field is required',
		slotProps: {
			htmlInput: {
				'aria-label': `${label}`,
				'aria-required': 'true',
				'aria-invalid': errors[name]
			}
		}
	})

	const validateField = (value: string | number | undefined) =>
		value === undefined || (typeof value === 'string' && value.trim() === '') || (typeof value === 'number' && value <= 0)

	const validateForm = () => {
		const newErrors = {
			plate: validateField(formData.plate),
			type: validateField(formData.type),
			client: validateField(formData.client),
			transmitter: validateField(formData.transmitter),
			service: validateField(formData.service),
			
		}
		setErrors(newErrors)
		return !Object.values(newErrors).some(Boolean)
	}

	const handleSubmit = async () => {
		if (!validateForm()) return
		try {
			await (transferId 
				? edit.mutateAsync({ id: transferId, data: formData })
				: create.mutateAsync(formData))
			router.replace('/transfers')
		} catch (error) {
			console.error('Error creating transfer:', error)
		}
	}

	const isLoading = create.status === 'pending' || edit.status === 'pending'

	return (
		<Box
			component="form"
			noValidate
			autoComplete="off"
			sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
			onSubmit={(e) => {
				e.preventDefault()
				handleSubmit()
			}}
			role="form"
			aria-label="Transfer Form"
		>
			<TextField {...getCommonTextFieldProps('plate', 'Plate')} />
			
			<TextField
				select
				{...getCommonTextFieldProps('type', 'Transfer Type')}
			>
				{transferTypes.map(type => (
					<MenuItem key={type} value={type} role="option" aria-selected={formData.type === type}>
						{type}
					</MenuItem>
				))}
			</TextField>

			{['client', 'transmitter'].map(field => (
				<TextField
					key={field}
					select
					{...getCommonTextFieldProps(field as keyof typeof errors, field.charAt(0).toUpperCase() + field.slice(1))}
				>
					{!clients ? (
						<MenuItem value="">Loading {field}s...</MenuItem>
					) : (
						clients
							.filter(client => client.type === (field === 'client' ? 'Cliente' : 'Transmitente'))
							.map(client => (
								<MenuItem
									key={client.id}
									value={client.document}
									role="option"
									aria-selected={formData[field as keyof typeof formData] === client.document}
								>
									{client.name} - {client.document}
								</MenuItem>
							))
					)}
				</TextField>
			))}

			<TextField
				type="number"
				{...getCommonTextFieldProps('service', 'Service')}
				helperText={errors.service && 'This field must be a valid number'}
			/>

			<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }} role="group" aria-label="Form actions">
				<Button
					variant="outlined"
					color="info"
					onClick={() => router.replace('/transfers')}
					aria-label="Cancel and return to transfers"
				>
					Cancel
				</Button>
				
				<Button
					variant="contained"
					color="primary"
					onClick={handleSubmit}
					disabled={isLoading}
					aria-busy={isLoading}
					aria-label={isLoading ? 'Saving transfer' : 'Save transfer'}
				>
					{isLoading ? 'Saving...' : 'Save'}
				</Button>
			</Box>
		</Box>
	)
}
