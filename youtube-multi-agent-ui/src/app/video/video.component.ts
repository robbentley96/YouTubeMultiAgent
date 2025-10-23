import { Component, Input } from '@angular/core';
import { Video } from '../models/video';
import { MatCardModule } from '@angular/material/card';
import { DurationPipe } from "../duration.pipe";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-video',
  imports: [MatCardModule, DurationPipe, DatePipe],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent {
@Input() video!: Video;

onVideoClick() {
  console.log(`Clicked: ${this.video.id}`)
}
}
