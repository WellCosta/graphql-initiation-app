import { of } from 'rxjs/observable/of'

export default class ApolloSpy {
  query = jasmine.createSpy('query').and.callFake(() => of([]))
}
