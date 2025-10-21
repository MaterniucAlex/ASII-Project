import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { AppServices } from '../app-services';

// Definește structura unui element de fișier (corespunde cu FileModel din backend)
export interface FileItem {
  _id: string; // ID-ul din MongoDB
  name: string;
  parent: string | null;
  isFolder: boolean;
  path: string; // Path-ul directorului care-l conține
  metadata?: {
    createdAt: Date;
    updatedAt: Date;
  };
}

@Injectable({
  providedIn: 'root'
})
export class FileExplorerService {
  private http = inject(HttpClient);
  private appService = inject(AppServices); // Adăugat pentru a accesa datele despre aplicații
  
  // TODO: Schimbă portul dacă backend-ul rulează pe alt port!
  private API_URL = 'http://localhost:5000/api/files'; 

  currentPath = signal<string>('/');
  currentItems = signal<FileItem[]>([]);
  currentParentId = signal<string | null>(null); // ID-ul MongoDB al folderului curent

  pathHistory: string[] = ['/'];

  constructor() {
    this.getFiles('/'); // Încărcăm rădăcina la inițializare
  }

  // Obține fișierele dintr-un anumit path
  getFiles(path: string): void {
    const searchPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
    const url = `${this.API_URL}?currentPath=${encodeURIComponent(searchPath)}`;
    
    this.http.get<FileItem[]>(url).subscribe({
      next: (files) => {
        this.currentItems.set(files);
        this.currentPath.set(path);
        
        // Căutăm ID-ul părinte din directorul curent.
        // Când navigăm, trebuie să știm ID-ul directorului în care ne aflăm. 
        // Dacă path-ul e '/A/B/', directorul 'B' este Părintele.
        // Pentru simplitate, presupunem că ID-ul Părintelui este null în rădăcină.
        // *Într-o aplicație reală, această logică ar necesita o rută de backend suplimentară.*
        this.currentParentId.set(null); // Resetare temporară
        
        if (this.pathHistory[this.pathHistory.length - 1] !== path) {
             this.pathHistory.push(path);
        }

      },
      error: (err) => console.error('Eroare la încărcarea fișierelor', err)
    });
  }

  // Navigare înainte / Deschiderea fișierului
  openItem(item: FileItem, notepadComponent: any): void {
    if (item.isFolder) {
      // Calculează noul path: calea directorului curent + numele folderului
      const newPath = `${item.path === '/' ? '/' : item.path}${item.name}/`;
      this.getFiles(newPath);
      
    } else if (item.name.toLowerCase().endsWith('.txt')) {
      // Deschide în Notepad
      this.getFileContent(item._id).subscribe({
        next: (content) => {
          this.appService.openApp({
              appIcon: 'assets/img/defaultAppPic.png',
              appName: 'Notepad',
              appId: Date.now(),
              appContent: notepadComponent,
              fileContent: content, 
              fileName: item.name,
              fileId: item._id, // Adăugăm ID-ul pentru salvare
          });
        },
        error: (err) => alert(`Eroare la citirea fișierului: ${err.error.message}`)
      });
    } else {
      alert(`Deschiderea fișierelor de tip "${item.name.split('.').pop()}" nu este suportată.`);
    }
  }
  
  // Navigare înapoi
  goBack(): void {
    if (this.pathHistory.length > 1) {
      this.pathHistory.pop(); // Șterge path-ul curent
      const previousPath = this.pathHistory[this.pathHistory.length - 1];
      this.getFiles(previousPath);
    }
  }

  // Creare director
  createFolder(name: string): Observable<FileItem> {
    const body = { 
        name: name, 
        parent: this.currentParentId() // ID-ul Părintelui
    };
    return this.http.post<FileItem>(this.API_URL, body);
  }
  
  // Încărcare fișier
  uploadFile(file: File, name: string): Observable<FileItem> {
    const formData = new FormData();
    
    // Multer pe backend așteaptă "file"
    formData.append('file', file, file.name); 
    formData.append('name', name); 
    
    if (this.currentParentId()) {
      formData.append('parent', this.currentParentId()!);
    }
    
    return this.http.post<FileItem>(this.API_URL, formData);
  }
  
  // Ștergere element
  deleteItem(itemId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_URL}/${itemId}`);
  }
  
  // Obține conținutul unui fișier (pentru vizualizare)
  getFileContent(itemId: string): Observable<string> {
    // Aici presupunem că ai o rută de backend: GET /api/files/content/:id
    // Trebuie să o implementezi pe backend (citește conținutul fizic al fișierului)
    return this.http.get(`${this.API_URL}/content/${itemId}`, { responseType: 'text' });
  }

  // Refresh
  refresh(): void {
    this.getFiles(this.currentPath());
  }
}