import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoViewerComponent } from './photo-viewer/photo-viewer.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: '', pathMatch: "full", component: PhotoViewerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
