import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, fromEvent, map, Subject, takeUntil } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
  private notifier: Subject<void> = new Subject();
  
  message: string = '';
  searchField!: string;

  @ViewChild('searchInput') searchInput!: ElementRef;
  
  constructor(
    private searchService: SearchService,
  ) { }

  ngOnInit(): void {
    this.searchService.currentMessage.subscribe(message => this.message = message);
  }

  ngAfterViewInit() {
      const searchInput = this.searchInput.nativeElement;
      fromEvent(searchInput, "keyup")
    .pipe(
      map((event: any) => {
        return event.target.value;
      }),
      filter((val) => {
        return val.length >= 0;
      }),
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.notifier),
    )
    .subscribe((value) => {
      this.searchService.changeMessage(value);
    });
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
