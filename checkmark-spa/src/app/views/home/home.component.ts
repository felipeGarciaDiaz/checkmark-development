import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast } from '../../_models/toast';

@Component({
  selector: 'app-home',

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public search: FormGroup;
  public toast: Toast & {isError?: boolean} = {
    status: 'success',
    message: 'Succesfully Indexed Dataset',
    time: 3500,
  }
  constructor(private formsBuilder: FormBuilder) {
    this.search = this.formsBuilder.group({
      query: ['', [Validators.required, Validators.minLength(3)]]
    })
  }



  public onSubmit() {
    if (this.search.valid) {
      console.log(this.search.value);
    } else {
      this.toast = {
        status: 'fail',
        message: 'Invalid search query',
        time: 3500,
        isError: true,
      }
      console.log('Form is invalid');
      this.resetToastMessageBox();
    }
  }
  private resetToastMessageBox(): void {
    setTimeout(() => {
      this.toast.isError = false;
      setTimeout(() => {
        this.toast.isError = true;
      }, 50)
    }, 50)
  }

  public onReqNewItem(): void {

  }

  public onViewExpiring(): void {

  }

  public onCrossReference(): void {
    
  }
}
