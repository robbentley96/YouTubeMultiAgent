import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './video-dialog.component.html',
  styleUrl: './video-dialog.component.scss'
})
export class VideoDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<VideoDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  safeUrl?: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    
  }

  ngOnInit(): void {
    let videoUrl = 'https://www.youtube-nocookie.com/embed/' + this.data.id;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  title: string;
  id: string;
}
