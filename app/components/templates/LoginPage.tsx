import { Button } from "@mui/material"
import GitHubIcon from '@mui/icons-material/GitHub'
import { useAuth } from "@context/index"
import { Stack, Typography } from "@mui/material"

export default function LoginPage() {
	const { login } = useAuth()
	return (
		<Stack
			spacing={3} 
			alignItems="center"
			justifyContent="center"
			sx={{
				minHeight: '100vh',
			}}
			role="main"
			aria-label="Página de inicio de sesión"
		>
			<Typography
				variant="h4"
				component="h1"
				fontWeight="bold"
				color="primary"
				role="heading"
				aria-level={1}
			>
				Iniciar Sesión
			</Typography>

			<Button
				variant="contained"
				size="large"
				onClick={() => login()}
				startIcon={<GitHubIcon />}
				aria-label="Iniciar sesión con GitHub"
				tabIndex={0}
				sx={{
					bgcolor: '#24292e',
					color: '#fff',
					px: 4,
					py: 1.5,
					borderRadius: 2,
					textTransform: 'none',
					fontSize: '1.1rem',
					'&:hover': {
						bgcolor: '#1a1f24'
					},
					'&:focus-visible': {
						outline: '2px solid #fff',
						outlineOffset: '2px',
					}
				}}
			>
				Continuar con GitHub
			</Button>
		</Stack>
	)
}

