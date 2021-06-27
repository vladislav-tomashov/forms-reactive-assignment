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
  signupForm: FormGroup;

  constructor() {
    this.signupForm = new FormGroup({
      projectName: new FormControl(
        null,
        [Validators.required],
        this._forbiddenNames.bind(this)
      ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl("Stable"),
    });
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }

  private _forbiddenNames(
    control: FormControl
  ): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value?.toUpperCase() === "TEST") {
          resolve({ nameIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 0);
    });
    return promise;
  }
}
