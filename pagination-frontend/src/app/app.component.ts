import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { ApiResponse } from './interface/api-response';
import { Page } from './interface/page';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'paginationapp';
  responseSubject = new BehaviorSubject<ApiResponse<Page>>(null);
  currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();

  constructor(private userService : UserService){}

  userState$ : Observable<{appState : string, appData? : ApiResponse<Page>, error? : HttpErrorResponse}>;

  ngOnInit(): void {
    this.userState$ = this.userService.getUsers().pipe(
      map((response : ApiResponse<Page>) => {
        this.responseSubject.next(response);
        this.currentPageSubject.next(response.data.page.number);
        console.log(response);
        return ({appState : "APP_LOADED", appData : response});
      }
    ),
    startWith({appState : "APP_LOADING"}),
    catchError((error : HttpErrorResponse) => of({appState : "APP_ERROR", error}))
    ) 
  }

  goToPage(name? : string, pageNumber : number = 0): void {
    this.userState$ = this.userService.getUsers(name, pageNumber).pipe(
      map((response : ApiResponse<Page>) => {
        this.responseSubject.next(response);
        this.currentPageSubject.next(pageNumber);

        console.log(response);
        return ({appState : "APP_LOADED", appData : response});
      }
    ),
    startWith({appState : "APP_LOADED", appData : this.responseSubject.value}),
    catchError((error : HttpErrorResponse) => of({appState : "APP_ERROR", error}))
    ) 
  }

  goToNextOrPreviousPage(directive? : string, name? : string) : void {
    this.goToPage(name, directive === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  }

}
