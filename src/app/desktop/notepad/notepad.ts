// src/app/desktop/notepad/notepad.ts (Corectat)

import { Component, input, OnInit, signal } from '@angular/core'; // <-- Adaugă 'signal'
import { FormsModule } from '@angular/forms'; // <-- NOU: Trebuie importat pentru [(ngModel)]

// TODO: Trebuie să te asiguri că ai importat NotepadService pentru logica de salvare.
// import { NotepadService } from './notepad.service'; 

@Component({
  selector: 'app-notepad',
  standalone: true,
  // Adaugă FormsModule la imports
  imports: [FormsModule], 
  template: `
    <div class="notepad">
        <textarea 
          [ngModel]="content()" 
          (ngModelChange)="content.set($event)"
        ></textarea>
        
        <p>Fișier: {{ fileName() }}</p>
        <button (click)="saveFile()">Salvare</button>
    </div>
  `,
  styleUrl: './notepad.scss'
})
export class Notepad implements OnInit {
  
  // input() este corect, dar trebuie să ai o interfață definită pentru tipul "any"
  appData = input<any>(); 
  
  // Declararea Signals-urilor:
  content = signal(''); // <-- 'signal' este acum importat
  fileName = signal('Untitled'); // <-- 'signal' este acum importat
  fileId: string | null = null;
  
  // TODO: Injectează serviciul de salvare
  // saveService = inject(NotepadService); 
  
  ngOnInit() {
      // Logică pentru a prelua conținutul fișierului deschis
      if (this.appData() && this.appData().fileContent) {
          this.content.set(this.appData().fileContent);
          this.fileName.set(this.appData().fileName);
          this.fileId = this.appData().fileId;
      }
  }
  
  saveFile() {
      if (this.fileId) {
          console.log(`Salvare fișier ID: ${this.fileId} cu conținut: ${this.content()}`);
          // Aici vei apela un serviciu pentru a trimite PUT/POST către backend
          alert(`Salvarea fișierului ${this.fileName()} nu este încă implementată.`);
      } else {
          alert('Acesta este un fișier nou, folosește "Save As" (neimplementat).');
      }
  }
}