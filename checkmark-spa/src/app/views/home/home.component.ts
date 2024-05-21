import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast } from '../../_models/toast';
import { ApiService } from '../../_services/api.service';
import { Router } from '@angular/router';

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
  constructor(private formsBuilder: FormBuilder, public router: Router, public api: ApiService) {
    this.search = this.formsBuilder.group({
      query: ['', [Validators.required, Validators.minLength(3)]]
    })
  }



  public onSubmit() {
    if (this.search.valid) {
      console.log(this.search.value);
      const query = this.search.get('query')?.value;
      this.api.getSearchRequests(query).subscribe({
        next: (data: any) => {
          this.router.navigate(['/search'], {queryParams: {
            q: query
          }})
        },
        error: (error: any) => {
          console.log(error);
          this.toast = {
            status: 'warn',
            message: 'Server error',
            time: 3500,
            isError: true,
          }
          this.resetToastMessageBox();
        }
    })
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