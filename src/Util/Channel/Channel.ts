export class Channel {

  name: string;
  section: string | undefined;

  //For now the messages will just be stored as html string. I will probably make a proper class to add better functionality
  messages: Array<string>;

  constructor(name: string, section: string | undefined) {
    this.name = name;
    this.section = section; //if undefined the channel won't have a section
    this.messages = [];
  }

}
