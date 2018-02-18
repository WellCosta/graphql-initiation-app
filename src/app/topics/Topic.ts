export default class Topic {
  private name: string
  private link: string

  public constructor(name: string, link: string) {
    this.name = name
    this.link = link
  }

  public getName(): string {
    return this.name
  }

  public getLink(): string {
    return this.link
  }
}
