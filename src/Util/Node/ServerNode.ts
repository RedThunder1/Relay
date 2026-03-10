import {User} from '../User/User';
import {Channel} from '../Channel/Channel';


export class ServerNode {

  private name: string;
  private owner: User;
  private channels: Array<Channel>;
  private users: Array<User>;
  private desc: string;


  constructor(name: string, owner : User, desc: string) {
    this.name = name;
    this.owner = owner;
    this.channels = [];
    this.users = [];
    this.desc = desc;

    this.users.push(owner);
  }

  public getName(): string {return this.name;}
  public setName(name: string) {this.name = name;}

  public getOwner(): User {return this.owner;}
  public setOwner(owner: User) {return this.owner = owner;}

  public getChannels(): Array<Channel> {return this.channels;}
  public addChannel(channel: Channel) {this.channels.push(channel);}

  public getDesc(): String {return this.desc;}
  public setDesc(desc: string) {this.desc = desc;}

  public removeChannel(channel: Channel) {
    for (let i = 0, l = this.channels.length; i < l; i++) {
      if (this.channels[i] === channel) {this.channels.splice(i, 1);}
    }
  }

  public getUsers(): Array<User> {return this.users;}
  public addUser(user: User) {return this.users.push(user);}
  public removeUser(user: User) {
    for (let i = 0, l = this.users.length; i < l; i++) {
      if (this.users[i] === user) {this.users.splice(i, 1);}
    }
  }


}
