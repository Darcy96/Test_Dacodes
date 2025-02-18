

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Transfers',
	description: 'Transfers page'
}

export default function Layout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return children
}

