import { Component, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notepad',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './notepad.html',
  styleUrl: './notepad.scss'
})
export class Notepad implements OnInit {

  appData = input<any>();

  content = signal('');
  fileName = signal('Untitled');
  fileId: string | null = null;

  ngOnInit() {
      if (this.appData() && this.appData().fileContent) {
          this.content.set(this.appData().fileContent);
          this.fileName.set(this.appData().fileName);
          this.fileId = this.appData().fileId;
      }
  }
}
