import { AlertType } from "../enums/alertType";

export class Alert {
  id: string | undefined;
  type: AlertType | undefined;
  message: string | undefined;
  autoClose: boolean | undefined;
  keepAfterRouteChange: boolean | undefined;
  fade: boolean | undefined;

  constructor(init?:Partial<Alert>) {
      Object.assign(this, init);
  }
}
