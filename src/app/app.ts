import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('Relay');
  node_list_mode: boolean = true; //If true the list mode will display nodes. If not it will display channels

  changeListMode(): void {
    if (this.node_list_mode) {
      //Displays channels

    } else {
      //Displays Nodes

    }


    this.node_list_mode = !this.node_list_mode
  }



}
