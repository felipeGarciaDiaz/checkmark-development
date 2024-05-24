import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ICopyrightMain } from '../../_models/copyrights';

@Component({
  selector: 'app-results',

  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {



  public data: ICopyrightMain[] = [];
  constructor(public api: ApiService, public routes: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchSearchResults();
  }

  public fetchSearchResults() {
    this.routes.queryParams.subscribe((params) => {
      const query = params['q'];
      this.api.getSearchRequests(query).subscribe({
        next: (data: ICopyrightMain[]) => {
          
          console.log(data);
          this.data = data;
          this.cdr.detectChanges();  // Manually trigger change detection

        },
        error: (error: any) => {
          console.log(error);
        }
      })
    })
  }
}
