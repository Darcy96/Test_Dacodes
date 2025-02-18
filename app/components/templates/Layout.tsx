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
		<Box 
			component="div"
			role="application"
			sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
		>
			<CssBaseline />
			<AppBar 
				position="static"
				component="header"
				role="banner"
			>
				<Toolbar 
					sx={{ justifyContent: 'space-between' }}
					role="navigation"
					aria-label="Main navigation"
				>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, cursor: 'pointer' }}
						onClick={() => router.push('/transfers')}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								router.push('/transfers')
							}
						}}
						tabIndex={0}
						role="link"
						aria-label="Go to transfers page"
					>
						Test Dacodes
					</Typography>
					<ButtonMenu />
				</Toolbar>
			</AppBar>

			<Box 
				component="main"
				role="main"
				sx={{ 
					flexGrow: 1, 
					overflowY: 'auto', 
					paddingX: '8vw', 
					paddingY: '8vh', 
					background: 'rgb(250, 250, 251)' 
				}}
			> 
				{children}
			</Box>
		</Box>
	)
}

export default Layout
