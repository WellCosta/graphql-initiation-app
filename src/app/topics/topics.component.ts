import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import {TopicsService} from './topics.service'
import Topic from './Topic'
import {Observable} from 'rxjs/Observable'
import {Subject} from 'rxjs/Subject'
import {
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators'

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  private topicsService: TopicsService
  searchController: FormControl
  topics: Subject<Topic[]> = new Subject<Topic[]>()
  selectedTopic: Topic

  constructor(topicsService: TopicsService) {
    this.topicsService = topicsService
  }

  ngOnInit(): void {
    this.searchController = new FormControl()
    this.searchController.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(() => {
          return this.topicsService.findAllLike(this.searchController.value)
        })
      ).subscribe((topics: any) => {
      this.topics.next(topics)
    })
  }

  public selectTopic(topic: any) {
    this.selectedTopic = topic
  }

  public formatTopic(topic: any): string {
    if (!topic) {
      return ''
    }
    return topic.name
  }
}
