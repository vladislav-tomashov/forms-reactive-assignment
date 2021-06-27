import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  projectStatuses = ["Stable", "Critical", "Finished"];
  projectForm: FormGroup;

  constructor() {
    this.projectForm = new FormGroup({
      projectName: new FormControl(
        null,
        [Validators.required, this._invalidProjectName.bind(this)],
        this._asyncInvalidProjectName.bind(this)
      ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl("Critical"),
    });
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }

  private _asyncInvalidProjectName(
    control: FormControl
  ): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value?.toUpperCase() === "TEST2") {
          resolve({ invalidProjectName: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });

    return promise;
  }

  private _invalidProjectName(control: FormControl): { [s: string]: boolean } {
    if (control.value?.toUpperCase() === "TEST") {
      return { invalidProjectName: true };
    }

    return null;
  }
}
