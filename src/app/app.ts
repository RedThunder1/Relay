import {Component, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  protected readonly title = signal('Relay');
  container: HTMLElement | undefined;
  panel: HTMLElement | undefined;
  centerPage: HTMLElement | undefined;
  messageBarChildren: HTMLElement[] = [];

  ngOnInit(): void {
    this.container = document.getElementById('node_list_container')!!;
    this.panel = document.getElementById('channel_settings')!!;
    this.centerPage = document.getElementById('center_page')!!;

    this.changeListMode('channels')

    for (let child of document.getElementById('message_bar')!!.children) {
      this.messageBarChildren.push(document.getElementById(child.id)!!);
    }
  }

  changeListMode(mode: string): void {
    if (mode == 'nodes') {
      //Displays Nodes
      //Fetch users nodes / folders


      //Load nodes in panel
      //Placeholder node
      this.container!!.innerHTML = '<div class="list_node"> <div class="list_node_img"></div> <div class="list_node_name">placeholder</div> <div class="list_node_info">info placeholder</div> </div>';
    } else if (mode == 'channels') {
      //Displays channels

      //Placeholder channels
      this.container!!.innerHTML = '<div class="list_channel">channel name</div>';
    } else {
      //Displays Dms
      //Placeholder dms
      this.container!!.innerHTML = '<div class="list_node"> <div class="list_node_img" style="border: 2px solid var(--green_accent)"></div> <div class="list_node_name">placeholder</div> <div class="list_node_info">info placeholder</div> </div>';
    }
  }

  currentSettingsMode: string = ''
  toggleSettingsMode(mode: string): void {
    if (mode == this.currentSettingsMode)  {
      this.panel!!.style.height = "";
      this.panel!!.style.width = "";

      for (let child of this.messageBarChildren) { child.style.display = ""; }

      this.currentSettingsMode = '';
      return;
    } else if (mode == 'users') {
      this.panel!!.style.height = this.centerPage!!.offsetHeight.toString() + "px";
      this.panel!!.style.width = "200px";

      for (let child of this.messageBarChildren) { child.style.display = ''; }
    } else if (mode == 'settings') {
      this.panel!!.style.height = this.centerPage!!.offsetHeight.toString() + "px";
      this.panel!!.style.width = this.centerPage!!.offsetWidth.toString() + "px";

      //Hides message bar since channel isn't viewable with settings panel open
      for (let child of this.messageBarChildren) { child.style.display = 'none'; }
    }
    this.currentSettingsMode = mode;
  }
}
