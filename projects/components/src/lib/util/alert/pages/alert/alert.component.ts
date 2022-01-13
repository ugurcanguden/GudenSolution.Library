import { Component, Input, OnInit } from '@angular/core';
import { Alert } from '../../models/Alert';
import { Subscription } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AlertType } from '../../enums/alertType';

type NewType = Subscription;

@Component({
  selector: 'lib-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription!: Subscription;
  routeSubscription!: Subscription;

  constructor(private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    // subscribe to new alert notifications
    this.alertSubscription = this.alertService.onAlert(this.id)
        .subscribe(alert => {
            // clear alerts when an empty alert is received
            if (!alert.message) {
                // filter out alerts without 'keepAfterRouteChange' flag
                this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

                // remove 'keepAfterRouteChange' flag on the rest
                this.alerts.forEach(x => delete x.keepAfterRouteChange);
                return;
            }

            // add alert to array
            this.alerts.push(alert);

            // auto close alert if required
            if (alert.autoClose) {
                setTimeout(() => this.removeAlert(alert), 3000);
            }
       });

    // clear alerts on location change
    this.routeSubscription = this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
            this.alertService.clear(this.id);
        }
    });
}

ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
}

removeAlert(alert: Alert) {
    // check if already removed to prevent error on auto close
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {
        // fade out alert
        alert.fade = true;

        // remove alert after faded out
        setTimeout(() => {
            this.alerts = this.alerts.filter(x => x !== alert);
        }, 250);
    } else {
        // remove alert
        this.alerts = this.alerts.filter(x => x !== alert);
    }
}

cssClass(alert: Alert) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissable', 'mt-4', 'container'];

    var alertType :string =''
    switch(alert.type) {
      case AlertType.Success: {
        alertType =  'alert alert-success';
         break;
      }
      case AlertType.Error : {
        alertType =  'alert alert-success';
         break;
      }
      case AlertType.Info : {
        alertType =  'alert alert-info';
         break;
      }
      case AlertType.Warning : {
        alertType =  'alert alert-warning';
         break;
      }
   }
    classes.push(alertType);

    if (alert.fade) {
        classes.push('fade');
    }

    return classes.join(' ');
}

}
