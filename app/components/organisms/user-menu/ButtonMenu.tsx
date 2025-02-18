'use client'

import { useAuth } from '@context/index'
import { Logout } from '@mui/icons-material'
import { Box, ButtonBase, Avatar, Popper, Fade, Paper, Typography, IconButton } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { stringAvatar } from '@utils/globalFuntions'
import React, { useState, memo } from 'react'
import { usePathname } from 'next/navigation'
const avatarStyles = {
	width: 30,
	height: 30,
	bgcolor: deepOrange[500]
}

const ButtonMenu = memo(() => {
	const pathname = usePathname()
	const { user, logout } = useAuth()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [open, setOpen] = useState(false)

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
		setOpen((prev) => !prev)
	}

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault()
			handleClick(event as unknown as React.MouseEvent<HTMLElement>)
		}
		if (event.key === 'Escape' && open) {
			setAnchorEl(null)
			setOpen(false)
		}
	}

	const handleLogout = () => {
		setAnchorEl(null)
		setOpen(false)
		logout()
	}

	if (!user?.name || pathname === '/login') return null

	const menuId = 'user-menu'
	const buttonId = 'user-menu-button'

	return (
		<Box role="navigation">
			<ButtonBase
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				aria-controls={open ? menuId : undefined}
				aria-expanded={open}
				aria-haspopup="menu"
				id={buttonId}
				sx={{
					bgcolor: open ? 'rgb(195 187 187 / 50%)' : 'transparent',
					gap: '5px',
					padding: '10px',
					borderRadius: '6px',
					textTransform: 'capitalize'
				}}
			>
				<Avatar
					sx={avatarStyles}
					src={user.image as string}
					alt={`${user.name}'s profile picture`}
				>
					{!user.image && stringAvatar(user.name)}
				</Avatar>
				{user.name}
			</ButtonBase>

			{open && (
				<Popper
					sx={{ zIndex: 1200, width: '200px' }}
					open={open}
					anchorEl={anchorEl}
					placement={'bottom-end'}
					transition
					role="menu"
					id={menuId}
					aria-labelledby={buttonId}
					modifiers={[
						{
							name: 'offset',
							options: {
								offset: [0, 2]
							}
						}
					]}
				>
					{({ TransitionProps }) => (
						<Fade
							{...TransitionProps}
							timeout={350}
						>
							<Paper
								sx={{ height: '-webkit-fill-available', display: 'flex', justifyContent: 'space-between', padding: 2 }}
								role="menuitem"
							>
								<Box
									display={'flex'}
									flexDirection={'row'}
									alignItems={'center'}
									gap={'5px'}
								>
									<Avatar
										sx={avatarStyles}
										src={user.image as string}
										alt={`${user.name}'s profile picture`}
									>
										{!user.image && stringAvatar(user.name as string)}
									</Avatar>
									<Typography
										textTransform={'capitalize'}
										variant="subtitle1"
									>
										{user.name}
									</Typography>
								</Box>

								<IconButton
									color="info"
									onClick={handleLogout}
									size="small"
									aria-label="Cerrar sesión"
									title="Cerrar sesión"
								>
									<Logout />
								</IconButton>
							</Paper>
						</Fade>
					)}
				</Popper>
			)}
		</Box>
	)
})

ButtonMenu.displayName = 'ButtonMenu'

export default ButtonMenu
