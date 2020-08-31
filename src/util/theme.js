export default {
	palette: {
		primary: {
			main: '#4caf50'
		},
		secondary: {
			main: '#1de9b6'
		}
	},
	typography: {
		useNextVariants: true,
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(',')
	},
	form: {
		textAlign: 'center',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	pageTitle: {
		margin: '15px auto 15px auto'
	},
	textField: {
		margin: '10px auto 10px auto'
	},
	button: {
		marginTop: 20,
		position: 'relative'
	}
};
