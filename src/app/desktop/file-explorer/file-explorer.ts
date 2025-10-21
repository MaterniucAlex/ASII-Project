import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FileExplorerService, FileItem } from './file-explorer.service';
import { Notepad } from '../notepad/notepad'; // Importăm componenta Notepad

@Component({
  selector: 'app-file-explorer',
  standalone: true,
  imports: [CommonModule, NgIf],
  template: `
    <div class="file-explorer">
      <div class="toolbar">
        <button (click)="goBack()" [disabled]="service.currentPath() === '/'">⬅️ Înapoi</button>
        <input type="text" [value]="service.currentPath()" readonly />
        
        <button (click)="createFolderPrompt()">➕ Folder</button>
        
        <button (click)="fileInput.click()">📤 Adaugă fișier</button> 
        <input 
          type="file" 
          #fileInput 
          style="display: none;" 
          (change)="uploadFile($event)" 
        /> 
        
        <button (click)="service.refresh()">🔄 Actualizează</button>
      </div>

      <div class="items-list">
        @for (item of service.currentItems(); track item._id) {
          <div 
            class="file-item" 
            (dblclick)="service.openItem(item, Notepad)" 
            (contextmenu)="showContextMenu($event, item)"
          >
            <img [src]="item.isFolder ? 'assets/img/folder.png' : 'assets/img/file.png'" alt="icon" />
            <p>{{ item.name }}</p>
          </div>
        }
        @empty {
          <p class="empty-message">Acest folder este gol.</p>
        }
      </div>
    </div>
  `,
  styleUrl: './file-explorer.scss'
})
export class FileExplorer {
  service = inject(FileExplorerService);
  
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  
  // Componenta Notepad pentru a fi trimisă la Service
  Notepad = Notepad;

  goBack() {
      this.service.goBack();
  }
  
  createFolderPrompt() {
    const folderName = prompt("Introduceți numele noului folder:");
    if (folderName && folderName.trim()) {
      this.service.createFolder(folderName.trim()).subscribe({
        next: () => {
          this.service.refresh();
        },
        error: (err) => alert(`Eroare la creare: ${err.error.message}`)
      });
    }
  }

  uploadFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const originalName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      const newName = prompt(`Introduceți un nume pentru fișier (fără extensie):`, originalName);

      if (newName && newName.trim()) {
        this.service.uploadFile(file, newName.trim()).subscribe({
          next: () => {
            this.service.refresh();
            if (this.fileInput) this.fileInput.nativeElement.value = '';
          },
          error: (err) => {
            alert(`Eroare la încărcare: ${err.error.message}`);
            if (this.fileInput) this.fileInput.nativeElement.value = '';
          }
        });
      }
    }
  }

  showContextMenu(event: MouseEvent, item: FileItem) {
    event.preventDefault();
    if (confirm(`Sigur dorești să ștergi permanent "${item.name}"?`)) {
      this.service.deleteItem(item._id).subscribe({
        next: () => {
          this.service.refresh();
        },
        error: (err) => alert(`Eroare la ștergere: ${err.error.message}`)
      });
    }
  }
}