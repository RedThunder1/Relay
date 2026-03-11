export class Channel {

  name: string;
  section: string | undefined;

  //For now the messages will just be stored as html string. I will probably make a proper class to add better functionality
  messages: Array<Object>;

  constructor(name: string, section: string | undefined) {
    this.name = name;
    this.section = section; //if undefined the channel won't have a section
    this.messages = [];
  }

  public getName() { return this.name; }
  public setName(name: string) { this.name = name; }

  public getSection() { return this.section; }
  public setSection(section: string | undefined) { this.section = section; }

  public getMessages() { return this.messages; }
  public addMessage(messages: Object) { this.messages.push(messages); }

}
