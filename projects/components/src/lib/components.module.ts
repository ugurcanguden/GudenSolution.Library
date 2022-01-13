import { NgModule } from '@angular/core';
import { ComponentsComponent } from './components.component';
import { AlertComponent } from './util/alert/pages/alert/alert.component';
import { AlertService } from './util/alert/services/alert.service';



@NgModule({
  providers: [AlertService],
  declarations: [
    ComponentsComponent,
    AlertComponent
  ],
  imports: [
  ],
  exports: [
    ComponentsComponent,
    AlertComponent
  ],
  entryComponents: [
    ComponentsComponent,
    AlertComponent
  ]
})
export class ComponentsModule { }
