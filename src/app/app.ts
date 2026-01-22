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
  messageInput: HTMLTextAreaElement | undefined;
  messageTools: HTMLElement | undefined;
  pageMessages: HTMLElement | undefined;


  ngOnInit(): void {
    this.container = document.getElementById('node_list_container')!!;
    this.panel = document.getElementById('channel_settings')!!;
    this.centerPage = document.getElementById('center_page')!!;
    this.messageInput = document.getElementById('message_input')!! as HTMLTextAreaElement;
    this.messageTools = document.getElementById('message_tools')!!;
    this.pageMessages = document.getElementById('center_page_messages')!!;

    this.changeListMode('channels')
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

      this.messageInput!!.style.display = "";
      this.messageTools!!.style.display = "";

      this.currentSettingsMode = '';
      return;
    } else if (mode == 'users') {
      this.panel!!.style.height = this.centerPage!!.offsetHeight.toString() + "px";
      this.panel!!.style.width = "200px";

      this.messageInput!!.style.display = "";
      this.messageTools!!.style.display = "";
    } else if (mode == 'settings') {
      this.panel!!.style.height = this.centerPage!!.offsetHeight.toString() + "px";
      this.panel!!.style.width = this.centerPage!!.offsetWidth.toString() + "px";

      //Hides message bar since channel isn't viewable with settings panel open
      this.messageInput!!.style.display = "none";
      this.messageTools!!.style.display = "none";
    }
    this.currentSettingsMode = mode;
  }

  messageBoxHeight(): void {
    console.log('messageBoxHeight');
    this.messageInput!!.style.height = this.messageInput!!.scrollHeight + "px"
  }

  messageEnter(event: Event | undefined): void {
    event?.preventDefault()
    let keyevent = event!! as KeyboardEvent;

    if (keyevent.key === 'Enter' || keyevent.keyCode === 13) {
      if (this.messageInput!!.value.length == 0) { return }

      this.sendMessage('RedThunder117', this.messageInput!!.value)
    }
    this.messageInput!!.value = '';
  }

  sendMessage(name:string, content: string): void {
    let message = "<div class=\"user_message\"><div class=\"user_message_img\"></div><div class=\"user_message_name\">" + name + "</div><div class=\"user_message_content\">" + content + "</div></div>"
    //server stuff here

    this.addMessage(message);
  }

  addMessage(message: string): void {
    console.log(message);
    this.pageMessages!!.innerHTML += message;
  }
}
