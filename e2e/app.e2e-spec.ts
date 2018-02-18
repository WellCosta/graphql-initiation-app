import { AppPage } from './app.po'

describe('graphql-initiation App', () => {
  let page: AppPage

  beforeEach(() => {
    page = new AppPage()
  })

  it('should start in welcome page', () => {
    console.log('Welcome page')
    page.navigateTo()
    expect(page.isWelcomePage()).toBeTrue()
  })
})
