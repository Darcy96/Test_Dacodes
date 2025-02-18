'use client'
import { Button, styled } from '@mui/material'

export const StyledGithubButton = styled(Button)(({ theme }) => ({
	backgroundColor: '#24292e',
	color: '#fff',
	padding: theme.spacing(1.5, 4),
	borderRadius: theme.spacing(2),
	textTransform: 'none',
	fontSize: '1.1rem',
	'&:hover': {
		backgroundColor: '#1a1f24'
	},
	'&:focus-visible': {
		outline: '2px solid #fff',
		outlineOffset: '2px'
	}
}))
