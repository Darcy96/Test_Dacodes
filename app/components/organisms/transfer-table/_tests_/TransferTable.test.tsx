/* eslint-disable @typescript-eslint/no-require-imports */
'use client'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TransferTable from '../TransferTable'
import { Transfers } from 'app/types'

// Complete mock of the hooks module
jest.mock('@api/transfers/hooks', () => ({
	useTransfers: jest.fn()
}))

// Mock of next/navigation
jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn()
	})
}))

// Import the mocked hook
import { useTransfers } from '@api/transfers/hooks'

describe('TransferTable', () => {
	const mockTransfers: Transfers[] = [
		{
			id: 1,
			plate: 'ABC123',
			type: 'Venta',
			client: 'Client1',
			transmitter: 'Trans1',
			service: 100,
			created_at: '2024-03-20T10:00:00Z'
		},
		{
			id: 2,
			plate: 'XYZ789',
			type: 'Cesión',
			client: 'Client2',
			transmitter: 'Trans2',
			service: 200,
			created_at: '2024-03-21T10:00:00Z'
		}
	]

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('renders loading state', () => {
		;(useTransfers as jest.Mock).mockReturnValue({
			data: undefined,
			isLoading: true,
			isError: false,
			error: null
		})

		render(<TransferTable />)
		expect(screen.getByText('Loading transfers')).toBeInTheDocument()
	})

	it('renders error state', () => {
		const errorMessage = 'Failed to fetch'
		;(useTransfers as jest.Mock).mockReturnValue({
			data: undefined,
			isLoading: false,
			isError: true,
			error: new Error(errorMessage)
		})

		render(<TransferTable />)
		expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument()
	})

	it('renders no transfers message', () => {
		;(useTransfers as jest.Mock).mockReturnValue({
			data: [],
			isLoading: false,
			isError: false,
			error: null
		})

		render(<TransferTable />)
		expect(screen.getByText('No transfers available')).toBeInTheDocument()
	})

	it('renders transfers data correctly', () => {
		;(useTransfers as jest.Mock).mockReturnValue({
			data: mockTransfers,
			isLoading: false,
			isError: false,
			error: null
		})

		render(<TransferTable />)

		// Verify that the headers are present using getAllByText
		const headers = ['id', 'plate', 'type', 'client', 'transmitter', 'service', 'created_at']
		headers.forEach((header) => {
			const headerElement = screen.getAllByText(header, { exact: false })[0]
			expect(headerElement).toBeInTheDocument()
		})

		// Verify the transfer data
		mockTransfers.forEach((transfer) => {
			expect(screen.getByText(transfer.plate)).toBeInTheDocument()
			expect(screen.getByText(transfer.type)).toBeInTheDocument()
			expect(screen.getByText(transfer.client)).toBeInTheDocument()
			expect(screen.getByText(transfer.transmitter)).toBeInTheDocument()
			expect(screen.getByText(transfer.service.toString())).toBeInTheDocument()
			const formattedDate = transfer.created_at ? new Date(transfer.created_at).toLocaleString() : ''
			expect(screen.getByText(formattedDate)).toBeInTheDocument()
		})
	})

	it('filters transfers by plate', async () => {
		;(useTransfers as jest.Mock).mockReturnValue({
			data: mockTransfers,
			isLoading: false,
			isError: false,
			error: null
		})

		render(<TransferTable />)

		const plateInput = screen.getByLabelText('Plate')
		await userEvent.type(plateInput, 'ABC')

		expect(screen.getByText('ABC123')).toBeInTheDocument()
		expect(screen.queryByText('XYZ789')).not.toBeInTheDocument()
	})

	it('filters transfers by type', async () => {
		;(useTransfers as jest.Mock).mockReturnValue({
			data: mockTransfers,
			isLoading: false,
			isError: false,
			error: null
		})

		render(<TransferTable />)

		// Simulate clicking on the select to open the options
		const typeSelect = screen.getByLabelText('Type')
		await userEvent.click(typeSelect)

		// Select the Type A option
		const option = screen.getByText('Type A')
		await userEvent.click(option)

		expect(screen.getByText('ABC123')).toBeInTheDocument()
		expect(screen.queryByText('XYZ789')).not.toBeInTheDocument()
	})

	it('navigates to edit page when clicking a row', async () => {
		const mockPush = jest.fn()
		jest.spyOn(require('next/navigation'), 'useRouter').mockImplementation(() => ({
			push: mockPush
		}))
		;(useTransfers as jest.Mock).mockReturnValue({
			data: mockTransfers,
			isLoading: false,
			isError: false,
			error: null
		})

		render(<TransferTable />)

		const firstRow = screen.getByText('ABC123').closest('tr')
		await userEvent.click(firstRow!)

		expect(mockPush).toHaveBeenCalledWith('/transfers/edit/1')
	})
})
