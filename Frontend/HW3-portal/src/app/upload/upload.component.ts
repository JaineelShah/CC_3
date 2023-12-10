import { Component } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes'
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import { UploadService } from '../upload.service';
export interface Tag {
  name: string;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  constructor(private uploadService: UploadService) { }
  selectedFile: any;

  
  upload(){
      this.uploadService.uploadFile(this.selectedFile, this.tags.map(tag => tag.name)).subscribe((res) => {
        console.log(res);
      });
  }

  selectFile(event: any) {
    const files = event.target.files;
    console.log(files);
    this.selectedFile = files[0];
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tag[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tags.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  edit(tag: Tag, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove tag if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing tag
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index].name = value;
    }
  }
}
function selectFile(file: any, any: any) {
  throw new Error('Function not implemented.');
}

