import { TestBed, async } from '@angular/core/testing'
import { MaterialModule } from './material/material.module'
import { AppComponent } from './app.component'
import { RouterTestingModule } from '@angular/router/testing'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, RouterTestingModule],
      providers: [],
      declarations: [
        AppComponent
      ]
    }).compileComponents()
  }))

  it(`should have as title 'Graphql initiation'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    fixture.detectChanges()
    expect(app.title).toEqual('Graphql initiation')
  }))
})
