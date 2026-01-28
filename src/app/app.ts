import {Component, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgOptimizedImage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  protected readonly title = signal('Relay');
  container!: HTMLElement;
  panel!: HTMLElement;
  centerPage!: HTMLElement;
  messageInput!: HTMLTextAreaElement;
  messageTools!: HTMLElement;
  pageMessages!: HTMLElement;
  errorPanel!: HTMLElement;
  websocket!: WebSocket;

  ngOnInit(): void {
    this.container = <HTMLElement>document.getElementById('node_list_container');
    this.panel = <HTMLElement>document.getElementById('channel_settings');
    this.centerPage = <HTMLElement>document.getElementById('center_page');
    this.messageInput = <HTMLTextAreaElement>document.getElementById('message_input') as HTMLTextAreaElement;
    this.messageTools = <HTMLElement>document.getElementById('message_tools');
    this.pageMessages = <HTMLElement>document.getElementById('center_page_messages');
    this.errorPanel = <HTMLElement>document.getElementById('error_message_panel');

    this.websocket = new WebSocket('ws://localhost:8080');

    this.websocket.onmessage = (event: MessageEvent) => {
      let pMessage = JSON.parse(event.data);
      //This is where msgs from backend are handled. Types are attached to the msg to show its purpose.
      //message is for messages being sent to be added to pages
      //There aren't any other yet
      switch (pMessage.type) {
        case 'message':
          this.addMessage(pMessage);
          break;
        default:
          console.log('Message Received, idk what to do with it');
      }
    }

    this.changeListMode('channels')
  }

  changeListMode(mode: string): void {
    this.container.innerHTML = '';
    if (mode == 'nodes') {
      //Displays Nodes
      //Fetch users nodes / folders


      //Load nodes in panel
      //Placeholder node
      this.container.innerHTML = `<div class="list_node"> <div class="list_node_img"></div> <div class="list_node_name">placeholder</div> <div class="list_node_info">info placeholder</div> </div>`;
    } else if (mode == 'channels') {
      //Displays channels

      //Placeholder channels
      let channelCont = document.createElement('div');
      channelCont.innerHTML = `Section 1 <div class="list_channel">channel name</div>`;
      channelCont.classList.add('list_channel_section');
      channelCont.addEventListener('click', (event) => {
        if (channelCont != event.target) { return }
        this.sectionToggleHide(channelCont);
      })

      this.container.appendChild(channelCont);
    } else {
      //Displays Dms
      //Placeholder dms
      this.container.innerHTML = `<div class="list_node"> <div class="list_node_img" style="border: 2px solid var(--green_accent)"></div> <div class="list_node_name">placeholder</div> <div class="list_node_info">info placeholder</div> </div>`;
    }
  }

  sectionToggleHide(div: HTMLDivElement): void {
    if (div.children == null) {
      return
    }
    for (let child of div.children) {
      child.classList.toggle('hide');
    }
  }

  currentSettingsMode: string = ''
  toggleSettingsMode(mode: string): void {
    if (mode == this.currentSettingsMode)  {
      this.panel.style.height = "";
      this.panel.style.width = "";

      this.messageInput.style.display = "";
      this.messageTools.style.display = "";

      this.currentSettingsMode = '';
      return;
    } else if (mode == 'users') {
      this.panel.style.height = this.centerPage.offsetHeight.toString() + "px";
      this.panel.style.width = "200px";

      this.messageInput.style.display = "";
      this.messageTools.style.display = "";
    } else if (mode == 'settings') {
      this.panel.style.height = this.centerPage.offsetHeight.toString() + "px";
      this.panel.style.width = this.centerPage.offsetWidth.toString() + "px";

      //Hides message bar since channel isn't viewable with settings panel open
      this.messageInput.style.display = "none";
      this.messageTools.style.display = "none";
    }
    this.currentSettingsMode = mode;
  }

  messageBoxHeight(): void {
    this.messageInput.style.height = "auto"
    this.messageInput.style.height = this.messageInput.scrollHeight + "px"
  }

  messageEnter(event: Event | undefined): void {
    event?.preventDefault()
    let keyevent = event as KeyboardEvent;

    if (keyevent.key === 'Enter' || keyevent.keyCode === 13) {
      if (this.messageInput.value.length == 0) { return }

      this.sendMessage('RedThunder117', this.messageInput.value)
    }
    this.messageInput.value = '';
    this.messageBoxHeight()
  }

  async sendMessage(name: string, content: string): Promise<void> {
    //Sends message data to backend
    const d = new Date();
    let time = d.getMonth()+1 + ' / ' + d.getDate() + ' ' + d.toLocaleTimeString();

    //Send msg to server
    try {
      this.websocket.send(JSON.stringify({
        user:'RedThunder117',
        time: time,
        message: content,
      }));
    } catch (e) {
      console.log('Websocket connection failed');
      this.errorPanel!!.style.opacity = '1';
      this.errorPanel!!.innerText = 'There was an error sending the message!';
      setTimeout(() => { this.errorPanel!!.style.opacity = '' }, 5000);
    }
  }

  addMessage(pMessage: any): void {
    //Loads message from backend onto page. The users msgs are also only added when received from the backend.
    let prevUser: string | null = null;
    try {
      prevUser = this.pageMessages.children[0].getAttribute('data-user');
    } catch (e) {}

    let message: string
    if (prevUser != null && prevUser == 'RedThunder117') {
      message = "<div class='user_message shortened_msg' data-user=" + pMessage.user + " data-time=" + pMessage.time + "><div class=\"user_message_content\">" + pMessage.message + "</div><div class='shortened_msg_time'>" + pMessage.time + "</div></div>"
    } else {
      message = "<div class='user_message' data-user=" + pMessage.user + "><div class=\"user_message_img\"></div><div class=\"user_message_name\">" + pMessage.user + " <div class=\"user_message_time\">" + pMessage.time + "</div> </div><div class=\"user_message_content\">" + pMessage.message + "</div></div>"
    }

    this.pageMessages.innerHTML = message + this.pageMessages.innerHTML;
  }
}
