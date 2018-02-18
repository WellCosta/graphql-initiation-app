import {Injectable} from '@angular/core'
import Topic from './Topic'
import {Observable} from 'rxjs/Observable'
import {of} from 'rxjs/observable/of'
import {map} from 'rxjs/operators'
import queries from '../graphql-queries/queries'
import {Apollo} from 'apollo-angular/Apollo'
import {ApolloQueryResult} from 'apollo-client/index'
import {WatchQueryOptions} from 'apollo-client/index'

@Injectable()
export class TopicsService {
  private resultToTopics = map((result: any) => result.data.topicsLike)
  private apollo: Apollo

  constructor(apollo: Apollo) {
    this.apollo = apollo
  }

  public findAll(): Observable<Topic[]> {
    return this.queryAndMap({ query: queries.allTopics })
  }

  public findAllLike(searchTerm: String): Observable<Topic[]> {
    return this.queryAndMap({
      query: queries.allTopicsLike,
      variables: {
        searchTerm: searchTerm
      }
    })
  }

  private queryAndMap(queryOptions: WatchQueryOptions) {
    return this.apollo.query(queryOptions)
      .pipe(this.resultToTopics)
  }
}
