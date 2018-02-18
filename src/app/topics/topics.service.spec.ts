import { TestBed, inject } from '@angular/core/testing'
import { Apollo } from 'apollo-angular/Apollo'
import ApolloSpy from '../../testing/ApolloSpy.stub'
import { TopicsService } from './topics.service'
import { of } from 'rxjs/observable/of'
import Topic from './Topic'


describe('TopicsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopicsService, { provide: Apollo, useClass: ApolloSpy }]
    })
  })

  it('should query GraphQL from Apollo', inject([TopicsService], (service: TopicsService) => {
    const apolloSpy = TestBed.get(Apollo)
    const resultTopicMock = new Topic('Stubbed value returned', 'link')
    apolloSpy.query.and.returnValue(of({
      data: {
        topicsLike: [resultTopicMock]
      }
    }))

    service.findAllLike('Stubbed value').subscribe((result) => {
      expect(result).toEqual([resultTopicMock])
    })
  }))
})
