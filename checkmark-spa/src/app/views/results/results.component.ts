import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ICopyrightMain, ICopyrightResponse } from '../../_models/copyrights';

@Component({
  selector: 'app-results',

  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {



  public data: ICopyrightMain[] = [];
  public raw!: ICopyrightResponse;
  constructor(public api: ApiService, public routes: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchSearchResults();
  }

  public fetchSearchResults() {
    console.log('fetchSearchResults')
    this.routes.queryParams.subscribe((params) => {
      const query = params['q'];
      this.api.getSearchRequests(query).subscribe({
        next: (res: ICopyrightResponse) => {
          console.log(res);
          if (!res.isSuccessful) {
            this.raw.message = 'No records found';
            console.log('error check msg:', res.message, res.data)
            return;
          }
          console.log('sys check here:', res.data)
          this.data = res.data;
          this.raw = res;
          this.cdr.detectChanges();  // Manually trigger change detection


        },
        error: (error: any) => {
          console.log('system manu');
          this.raw = {
            data: [],
            isSuccessful: false,
            message: 'Error getting servers search requests'
          }
          this.raw.message = 'example main';
        }
      });
    });
  }
}
