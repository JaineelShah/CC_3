import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http:HttpClient) { }

  uploadFile(file: File, tags: string[]) {
    let that = this
    const headers = {
      "X-Amz-Meta-CustomLabels": tags.join(","),
      "x-api-key": "3iuLqQicIx4zaCkgs1Axm6h2utPiXvUS6hQDyhUM",
      "Content-Type": "image/png"
    }
    console.log(file);
    return that.http.put("https://u1m1p8i77a.execute-api.us-east-1.amazonaws.com/dev/upload?key="+file.name, file,{headers: headers});
  };

  searchFile(query: string) {
    const headers = {
      "x-api-key": "3iuLqQicIx4zaCkgs1Axm6h2utPiXvUS6hQDyhUM"
    }
    return this.http.get("https://u1m1p8i77a.execute-api.us-east-1.amazonaws.com/dev/search?q="+query,{headers: headers});
  }
    
}
