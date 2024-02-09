import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitlistComponent } from '../../components/waitlist/waitlist.component';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [CommonModule, WaitlistComponent],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css'
})
export class LobbyComponent {

}
