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
				url: '/dashboard',
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
				icon: 'feather icon-file-plus'
			},
			{
				id: 'addCategory',
				title: 'Ajouter une catégorie',
				type: 'item',
				url: '/category',
				icon: 'feather icon-server'
			}
		]
	},
	{
		id: 'navigation',
		title: 'Gérer le blog',
		type: 'group',
		icon: 'feather icon-monitor',
		children: [
			{
				id: 'orders',
				title: 'Gérer les commandes',
				type: 'item',
				url: '/adminOrders',
				icon: 'feather icon-check-circle'
			}
		]
	},
	{
		id: 'Gérer le forum',
		title: 'Gérer blog et forum',
		type: 'group',
		icon: 'feather icon-align-left',
		children: [
			{
				id: 'questions',
						title: 'Les questions',
						type: 'item',
						url: '/questions',
						icon: 'feather icon-help-circle'
			},
			{
				id: 'blog',
				title: 'Ajouter un article',
				type: 'item',
				url: '/adminBlog',
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
