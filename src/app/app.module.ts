import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { ApolloModule, Apollo } from 'apollo-angular'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { AppComponent } from './app.component'
import { TopicsService } from './topics/topics.service'
import { TopicsComponent } from './topics/topics.component'
import { MaterialModule } from './material/material.module'
import { WelcomeComponent } from './welcome/welcome.component'

const routes: Routes = [
  { path: 'topics', component: TopicsComponent, data: { pageName: 'Topics' } },
  { path: '', component: WelcomeComponent, data: { pageName: 'Home' } },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    TopicsComponent,
    WelcomeComponent
  ],
  imports: [
    RouterModule.forRoot(
      routes,
      { useHash: true }
    ),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [TopicsService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo,
              httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: 'http://localhost:8080/graphql' }),
      cache: new InMemoryCache()
    })
  }
}
