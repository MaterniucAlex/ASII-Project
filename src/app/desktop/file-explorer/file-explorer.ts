import { Component, inject, ViewChild, ElementRef, signal, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileExplorerService, FileItem } from './file-explorer.service';
import { Notepad } from '../notepad/notepad';

@Component({
  selector: 'app-file-explorer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-explorer.html',
  styleUrl: './file-explorer.scss'
})
export class FileExplorer {
  service = inject(FileExplorerService);

  notepad = signal<Type<any>>(Notepad);

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

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
