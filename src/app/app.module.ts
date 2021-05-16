import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { PlantesComponent } from './plantes/plantes.component';
import { NavItemComponent } from './admin/navigation/nav-content/nav-item/nav-item.component';
import { NavGroupComponent } from './admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavRightComponent } from './admin/nav-bar/nav-right/nav-right.component';
import { NavLeftComponent } from './admin/nav-bar/nav-left/nav-left.component';
import { NavContentComponent } from './admin/navigation/nav-content/nav-content.component';
import { NavigationComponent } from './admin/navigation/navigation.component';
import { NavBarComponent } from './admin/nav-bar/nav-bar.component';
import { FooterAdminComponent } from './admin/footer-admin/footer-admin.component';
import { AdminModule } from './admin/admin.module';
import { PlantesModule } from './plantes/plantes.module';
import { NavigationItem } from './admin/navigation/navigation';
import { HeaderComponent } from './plantes/header/header.component';
import { FooterComponent } from './plantes/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { SignupAdminComponent } from './admin/signup-admin/signup-admin.component';
import { ChartsModule } from 'ng2-charts' ; 


@NgModule({
	declarations: [
		AppComponent,
		AdminComponent,
		PlantesComponent,
		FooterAdminComponent,
		NavBarComponent,
		NavigationComponent,
		NavContentComponent,
		NavLeftComponent,
		NavRightComponent,
		NavCollapseComponent,
		NavGroupComponent,
		NavItemComponent,
		HeaderComponent,
		FooterComponent,
		LoginAdminComponent,
		SignupAdminComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		SharedModule,
		AdminModule,
		PlantesModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
	ChartsModule
	],
	exports: [ FormsModule, ReactiveFormsModule ],
	providers: [ NavigationItem ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
