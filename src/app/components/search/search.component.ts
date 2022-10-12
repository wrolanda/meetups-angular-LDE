import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, fromEvent, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private notifier: Subject<void> = new Subject();
  
  @ViewChild('searchInput') searchInput!: ElementRef;
  
  @Output() 
  searchTerm2: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
      const searchInput = this.searchInput.nativeElement;
      fromEvent(searchInput, "keyup")
    .pipe(
      map((event: any) => {
        console.log(event.target.value);
        return event.target.value;
      }),
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.notifier),
    )
    .subscribe((val) => {
      console.log("Запрос к бэкенду:", val);
      //BehaviorSubject.next(val);
    });
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
