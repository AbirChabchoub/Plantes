import { Injectable } from '@angular/core';

export interface NavigationItem {
	id: string;
	title: string;
	type: 'item' | 'collapse' | 'group';
	translate?: string;
	icon?: string;
	hidden?: boolean;
	url?: string;
	classes?: string;
	exactMatch?: boolean;
	external?: boolean;
	target?: boolean;
	breadcrumbs?: boolean;
	function?: any;
	badge?: {
		title?: string;
		type?: string;
	};
	children?: Navigation[];
}

export interface Navigation extends NavigationItem {
	children?: NavigationItem[];
}

const NavigationItems = [
	{
		id: 'navigation',
		title: 'Navigation',
		type: 'group',
		icon: 'feather icon-monitor',
		children: [
			{
				id: 'dashboard',
				title: 'Dashboard',
				type: 'item',
				url: '/dashboard/analytics',
				icon: 'feather icon-home'
			}
		]
	},
	{
		id: 'Add',
		title: 'Gérer les utilisateurs',
		type: 'group',
		icon: 'feather icon-layers',
		children: [
			{
				id: 'users',
				title: 'Les utilisateurs',
				type: 'item',
				url: '/users',
				icon: 'feather icon-user'
			},
			{
				id: 'addUser',
				title: 'Ajouter un utilisateurs',
				type: 'item',
				url: '/addUser',
				icon: 'feather icon-user-plus'
			}
		]
	},
	{
		id: 'table',
		title: 'Gérer les annonces',
		type: 'group',
		icon: 'feather icon-list',
		children: [
			{
				id: 'ads',
				title: 'Les annonces',
				type: 'item',
				url: '/adminAds',
				icon: 'feather icon-server'
			},
			{
				id: 'adForm',
				title: 'Ajouter une annonce',
				type: 'item',
				url: '/addAds',
				icon: 'feather icon-pie-chart'
			}
		]
	},
	{
		id: 'pages',
		title: 'Pages',
		type: 'group',
		icon: 'feather icon-file-text',
		children: [
			{
				id: 'auth',
				title: 'Authentication',
				type: 'collapse',
				icon: 'feather icon-lock',
				children: [
					{
						id: 'signup',
						title: 'Sign up',
						type: 'item',
						url: '/auth/signup',
						target: true,
						breadcrumbs: false
					},
					{
						id: 'signin',
						title: 'Sign in',
						type: 'item',
						url: '/auth/signin',
						target: true,
						breadcrumbs: false
					},
					{
						id: 'reset-password',
						title: 'Reset Password',
						type: 'item',
						url: '/auth/reset-password',
						target: true,
						breadcrumbs: false
					},
					{
						id: 'change-password',
						title: 'Change Password',
						type: 'item',
						url: '/auth/change-password',
						target: true,
						breadcrumbs: false
					}
				]
			},
			{
				id: 'maintenance',
				title: 'Maintenance',
				type: 'collapse',
				icon: 'feather icon-sliders',
				children: [
					{
						id: 'error',
						title: 'Error',
						type: 'item',
						url: '/maintenance/error',
						target: true,
						breadcrumbs: false
					},
					{
						id: 'coming-soon',
						title: 'Maintenance',
						type: 'item',
						url: '/maintenance/coming-soon',
						target: true,
						breadcrumbs: false
					}
				]
			}
		]
	},
	{
		id: 'other',
		title: 'Other',
		type: 'group',
		icon: 'feather icon-align-left',
		children: [
			{
				id: 'menu-level',
				title: 'Menu Levels',
				type: 'collapse',
				icon: 'feather icon-menu',
				children: [
					{
						id: 'menu-level-2.1',
						title: 'Menu Level 2.1',
						type: 'item',
						url: 'javascript:',
						external: true
					},
					{
						id: 'menu-level-2.2',
						title: 'Menu Level 2.2',
						type: 'collapse',
						children: [
							{
								id: 'menu-level-2.2.1',
								title: 'Menu Level 2.2.1',
								type: 'item',
								url: 'javascript:',
								external: true
							},
							{
								id: 'menu-level-2.2.2',
								title: 'Menu Level 2.2.2',
								type: 'item',
								url: 'javascript:',
								external: true
							}
						]
					}
				]
			},
			{
				id: 'disabled-menu',
				title: 'Disabled Menu',
				type: 'item',
				url: 'javascript:',
				classes: 'nav-item disabled',
				icon: 'feather icon-power',
				external: true
			},
			{
				id: 'sample-page',
				title: 'Sample Page',
				type: 'item',
				url: '/sample-page',
				classes: 'nav-item',
				icon: 'feather icon-sidebar'
			}
		]
	}
];

@Injectable()
export class NavigationItem {
	public get() {
		return NavigationItems;
	}
}
