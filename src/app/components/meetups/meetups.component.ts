import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Meetup } from 'src/app/entities/meetup';
import { LoadingService } from 'src/app/services/loading.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-meetups',
  templateUrl: './meetups.component.html',
  styleUrls: ['./meetups.component.scss'],
})
export class MeetupsComponent implements OnInit, OnDestroy {
  private notifier = new Subject<void>();
  loading$ = this.loadingService.loading$;
  bool = false;

  searchTerm1: string = '';
  message: string = '';

  get meetups() {
    if (!this.message) {
      return this.arrayMeetups;
    } else {
      return this.arrayMeetups.filter((meetup: Meetup) => {
        if (
          meetup.name.includes(this.message) ||
          meetup.description.includes(this.message) ||
          meetup.owner!.fio.includes(this.message)
        ) {
          return meetup;
        }
        return;
      });
    }
  }

  get isLoading() {
    if (this.bool) {
      return true;
    }
    return false;
  }

  @Input()
  arrayMeetups!: Array<Meetup>;

  @Output()
  public addEvent = new EventEmitter();
  @Output()
  public addEventUnsub = new EventEmitter();
  @Output()
  public addEventDel = new EventEmitter();

  constructor(
    private searchService: SearchService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.searchService.currentMessage
      .pipe(takeUntil(this.notifier))
      .subscribe((message) => {
        this.message = message;
      });

    this.loading$.pipe(takeUntil(this.notifier)).subscribe((data: boolean) => {
      console.log('sub');
      this.bool = data;
    });
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
