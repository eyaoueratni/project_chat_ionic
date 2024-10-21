import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  selectedTab = signal<string>('chats'); // Default selected tab

  constructor() {}

  ngOnInit() {}

  // Update the selected tab when tab changes
  getSelected(event: any) {
    console.log(event);
    this.selectedTab.set(event?.tab); // Update the signal with the selected tab
  }
}
