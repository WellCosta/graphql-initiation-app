import { browser, by, element } from 'protractor'

export class AppPage {
  navigateTo() {
    return browser.get('/')
  }

  isWelcomePage() {
    return element.all(by.css('.welcome-content')).count() === 1
  }
}
