import Topic from '../app/topics/Topic'
import { of } from 'rxjs/observable/of'

export default class TopicsServiceSpy {
  public static topicMock = new Topic('Queries and Mutations', 'http://graphql.org/learn/queries/')

  findAllLike = jasmine.createSpy('findAllLike').and.callFake(() => of([TopicsServiceSpy.topicMock]))
  findAll = jasmine.createSpy('findAll').and.callFake(() => of([TopicsServiceSpy.topicMock]))
}
