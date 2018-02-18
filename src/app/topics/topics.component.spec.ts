import { DebugElement } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { TopicsComponent } from './topics.component'
import { TopicsService } from './topics.service'
import { MaterialModule } from '../material/material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import Topic from './Topic'
import { Apollo } from 'apollo-angular/Apollo'
import ApolloSpy from '../../testing/ApolloSpy.stub'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import TopicsServiceSpy from '../../testing/TopicsServiceSpy.stub'

describe('TopicsComponent', () => {
  const debounceSearchTime = 500

  let component: TopicsComponent
  let fixture: ComponentFixture<TopicsComponent>
  let topicsService: TopicsServiceSpy

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule, ReactiveFormsModule, FormsModule],
      declarations: [TopicsComponent],
      providers: [{ provide: TopicsService, useClass: TopicsServiceSpy }, { provide: Apollo, useClass: ApolloSpy }]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsComponent)
    component = fixture.componentInstance
    topicsService = fixture.debugElement.injector.get(TopicsService) as any
  })

  it('should create an autocomplete material field', () => {
    const autocompleteElement = findElement('.topics-component mat-autocomplete')
    expect(autocompleteElement).toBeDefined()
  })

  it('should call search on formControl value changed after debounce time', (done) => {
    fixture.detectChanges()
    component.searchController.setValue('Queries')
    fixture.detectChanges()
    setTimeout(() => {
      fixture.detectChanges()
      expect(topicsService.findAllLike).toHaveBeenCalledWith('Queries')
      done()
    }, debounceSearchTime)
  })


  it('should populate topics when formControl value changed', (done) => {
    fixture.detectChanges()
    component.searchController.setValue('Queries')
    fixture.detectChanges()
    setTimeout(() => {
      component.topics.subscribe((topic) => {
        expect(topic).toEqual([TopicsServiceSpy.topicMock])
      })
      done()
    }, debounceSearchTime)
  })

  it('should format selected topic', (done) => {
    fixture.detectChanges()
    setTimeout(() => {
      expect(findElement('a[name="selectedTopicAnchor"]')).toBeNull()
      expect(component.selectedTopic).toBeUndefined()
      component.selectedTopic = TopicsServiceSpy.topicMock
      fixture.detectChanges()
      const selectedTopicName = findElement('a[name="selectedTopicAnchor"] [name="selectedTopicName"]').nativeElement
      expect(selectedTopicName.textContent).toEqual(TopicsServiceSpy.topicMock.getName())
      done()
    }, debounceSearchTime)
  })

  function findElement(selector) {
    return fixture.debugElement.query(By.css(selector))
  }
})
