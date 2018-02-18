import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { WelcomeComponent } from './welcome.component'
import { By } from '@angular/platform-browser'

describe('WelcomeComponent', () => {
  let fixture: ComponentFixture<WelcomeComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [WelcomeComponent]
      })
      .compileComponents()
    fixture = TestBed.createComponent(WelcomeComponent)
  }))

  it('should display welcome content', () => {
    expect(fixture.debugElement.query(By.css('.welcome-content'))).toBeDefined()
  })
})
