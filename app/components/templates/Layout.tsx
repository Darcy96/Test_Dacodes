'use client'
import { ButtonMenu } from '@components/organisms'

import { AppBar, Toolbar, Typography, Box, CssBaseline } from '@mui/material'

import React from 'react'
import { useRouter } from 'next/navigation'
interface LayoutProps {
	children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
	const router = useRouter()
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
			<CssBaseline />
			<AppBar position="static">
				<Toolbar sx={{ justifyContent: 'space-between' }}>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, cursor: 'pointer' }}
						onClick={() => router.push('/transfers')}
					>
						Test Dacodes
					</Typography>
					<ButtonMenu />
				</Toolbar>
			</AppBar>

			<Box sx={{ flexGrow: 1, overflowY: 'auto', paddingX: '8vw', paddingY: '8vh', background: 'rgb(250, 250, 251)' }}> {children}</Box>
		</Box>
	)
}

export default Layout
