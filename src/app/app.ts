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
    this.container!!.innerHTML = '';
    if (mode == 'nodes') {
      //Displays Nodes
      //Fetch users nodes / folders


      //Load nodes in panel
      //Placeholder node
      this.container!!.innerHTML = `<div class="list_node"> <div class="list_node_img"></div> <div class="list_node_name">placeholder</div> <div class="list_node_info">info placeholder</div> </div>`;
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

      this.container!!.appendChild(channelCont);
    } else {
      //Displays Dms
      //Placeholder dms
      this.container!!.innerHTML = `<div class="list_node"> <div class="list_node_img" style="border: 2px solid var(--green_accent)"></div> <div class="list_node_name">placeholder</div> <div class="list_node_info">info placeholder</div> </div>`;
    }
  }

  sectionToggleHide(div: HTMLDivElement): void {
    console.log(div);
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
    this.messageInput!!.style.height = "auto"
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
    this.messageBoxHeight()
  }

  sendMessage(name:string, content: string): void {

    const d = new Date();
    let time = d.getMonth()+1 + ' / ' + d.getDate() + ' ' + d.toLocaleTimeString();

    //Get previous messages sender to check if the message will be shortened
    let prevUser: string | null = null;
    try {
      prevUser = this.pageMessages!!.children[0].getAttribute('data-user');
    } catch (e) {}

    //compares to see if previous messages was sent by the same user to save space
    let message = ""
    if (prevUser != null && prevUser == 'RedThunder117') {
      message = "<div class='user_message shortened_msg' data-user=" + name + " data-time=" + time + "><div class=\"user_message_content\">" + content + "</div><div class='shortened_msg_time'>" + time + "</div></div>"
    } else {
      message = "<div class='user_message' data-user=" + name + "><div class=\"user_message_img\"></div><div class=\"user_message_name\">" + name + " <div class=\"user_message_time\">" + time + "</div> </div><div class=\"user_message_content\">" + content + "</div></div>"
    }

    //Send msg to server


    this.pageMessages!!.innerHTML = message + this.pageMessages!!.innerHTML;
  }

  addMessage(content: string): void {
    //method for adding msgs from the server once I get to the backend
  }
}
