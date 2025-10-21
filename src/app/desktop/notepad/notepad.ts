import { Component, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

// TODO: Trebuie să te asiguri că ai importat NotepadService pentru logica de salvare.
// import { NotepadService } from './notepad.service';

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

  // TODO: Injectează serviciul de salvare
  // saveService = inject(NotepadService);

  ngOnInit() {
      if (this.appData() && this.appData().fileContent) {
          this.content.set(this.appData().fileContent);
          this.fileName.set(this.appData().fileName);
          this.fileId = this.appData().fileId;
      }
  }

  saveFile() {
      if (this.fileId) {
          console.log(`Salvare fișier ID: ${this.fileId} cu conținut: ${this.content()}`);
          alert(`Salvarea fișierului ${this.fileName()} nu este încă implementată.`);
      } else {
          alert('Acesta este un fișier nou, folosește "Save As" (neimplementat).');
      }
  }
}
