
import GitHubIcon from '@mui/icons-material/GitHub'
import { useAuth } from '@context/index'
import { Stack, Typography } from '@mui/material'
import { StyledGithubButton } from '..'


export default function LoginPage() {
	const { login } = useAuth()
	return (
		<Stack
		height={'100%'}
		spacing={3}
		alignItems="center"
		justifyContent="center"
		role="main"
		aria-label="Login page"
	>
		<Typography
			variant="h4"
			component="h1"
			fontWeight="bold"
			color="primary"
			role="heading"
			aria-level={1}
		>
			Login
		</Typography>

		<StyledGithubButton
			variant="contained"
			size="large"
			onClick={() => login()}
			startIcon={<GitHubIcon />}
			aria-label="Login with GitHub"
			tabIndex={0}
		>
			Continue with GitHub
		</StyledGithubButton>
	</Stack>
	)
}
