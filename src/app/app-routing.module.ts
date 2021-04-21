import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { PlantesComponent } from './plantes/plantes.component';

const routes: Routes = [
	{
		path: '',
		component: PlantesComponent,
		children: [
			{
				path: '',
				redirectTo: 'home',
				pathMatch: 'full'
			},
			{
				path: '',
				loadChildren: () => import('./plantes/plantes.module').then((module) => module.PlantesModule)
			}
		]
	},
	{
		path: '',
		component: AdminComponent,
		children: [
			{
				path: '',
				redirectTo: 'admin',
				pathMatch: 'full'
			},
			{
				path: '',
				loadChildren: () => import('./admin/admin.module').then((module) => module.AdminModule)
			}
		]
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
