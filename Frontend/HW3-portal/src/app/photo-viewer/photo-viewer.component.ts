import { Component, ViewEncapsulation } from '@angular/core';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.scss'],
  encapsulation : ViewEncapsulation.None,
})
export class PhotoViewerComponent {
  // method search that calls the API
  constructor(private uploadService: UploadService) { }
  output_image = null
  searchText: string = '';
  search() {
    this.uploadService.searchFile(this.searchText).subscribe((data: any) => {
      console.log(data)
      this.output_image = data["results"]
    });
  }
}


