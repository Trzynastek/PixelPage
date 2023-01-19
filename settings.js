const settings = {
	styling: {
		background: '#202020', // in hex format
		primary: '#1a1a1a', // in hex format
		secondary: '#5800e6', // in hex format
		foreground: '#d8dee9', // in hex format
		roundness: '5px', // with "px" at the end
	},
	layout: {
		columns: '3',
		rows: '2',
		lists: '1',
		time: true, // true or false
		date: true, // true or false
		greeting: true, // true or false
		notes: true, // true or false
	},
	other: {
		name: 'User',
		openinnewpage: false, // true or false
		notifications: false, // true or false - enable notifications for github entry in list
		token: '', // github token for notification count
	},
    ButtonsContainer: [
		{
			icon: 'youtube', // icons can be found here: https://lucide.dev/
			link: 'https://youtube.com/',
		},
		{
			icon: 'twitch', // icons can be found here: https://lucide.dev/
			link: 'https://twitch.tv/',
		},
		{
			icon: 'play', // icons can be found here: https://lucide.dev/
			link: 'https://animesuge.to/home',
		},
		{
			icon: 'mail', // icons can be found here: https://lucide.dev/
			link: 'https://mail.google.com',
		},
		{
			icon: 'server', // icons can be found here: https://lucide.dev/
			link: 'https://drive.google.com',
		},
		{
			icon: 'message-circle', // icons can be found here: https://lucide.dev/
			link: 'https://messenger.com/',
		},
	],
    listContainer: {
		icon: 'code-2', // icons can be found here: https://lucide.dev/
		id: '1',
		links: [
			{
				name: 'Github', // icons can be found here: https://lucide.dev/
				link: 'https://github.com/Trzynastek',
			},
			{
				name: 'ChatGPT', // icons can be found here: https://lucide.dev/
				link: 'https://chat.openai.com',
			},
			{
				name: 'Vercel', // icons can be found here: https://lucide.dev/
				link: 'https://vercel.com',
			},
			{
				name: 'Reddit', // icons can be found here: https://lucide.dev/
				link: 'https://reddit.com',
			},
			
		],
	},
	notes: "notes"
}