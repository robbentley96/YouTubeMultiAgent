import { Component, inject, Input } from '@angular/core';
import { Video } from '../models/video';
import { MatCardModule } from '@angular/material/card';
import { DurationPipe } from "../duration.pipe";
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { VideoDialogComponent } from '../video-dialog/video-dialog.component';

@Component({
  selector: 'app-video',
  imports: [MatCardModule, DurationPipe, DatePipe],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent {
@Input() video!: Video;
readonly dialog = inject(MatDialog);

onVideoClick() {
  this.dialog.open(VideoDialogComponent, {
      data: {title: this.video.name, id: this.video.id},
    });
}


}
