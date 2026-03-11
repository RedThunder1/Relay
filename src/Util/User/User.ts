import {ServerNode} from '../Node/ServerNode';

export class User {

  private name: string;
  private userID: string;
  private email: string;
  private password: string;
  private servers: Array<ServerNode>;

  constructor(name: string, userID: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.userID = userID;
    this.servers = [];
  }

  public getName(): string {return this.name;}
  public setName(name: string) {
    //Verify this can be a name
    this.name = name;
  }

  public getEmail(): string { return this.email;}
  public setEmail(email: string) {
    //Verify it's a correct email
    this.email = email;
  }

  public getUserID(): string { return this.userID;}

  public getPassword(): string { return this.password; }
  public setPassword(email: string) {
    //Verify this can be a password
    this.password = email;
  }

  public getServers(): Array<ServerNode> { return this.servers; }
  public addServer(server: ServerNode) { this.servers.push(server); }
  public removeServer(server: ServerNode) {
    for (let i = 0; i < this.servers.length; i++) {
      if (this.servers[i] === server) {
        this.servers.splice(i, 1);
      }
    }
  }
}
