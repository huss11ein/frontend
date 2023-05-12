import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-profile-image',
  templateUrl: './change-profile-image.component.html',
  styleUrls: ['./change-profile-image.component.css'],
})
export class ChangeProfileImageComponent implements OnInit {
  constructor(private http: HttpClient, private user: UserService) {}
  @Input() image?: string;
  // Image URL from the backend
  // Image file to upload
  imageFile: File | undefined;
  // Flag to show/hide delete icon
  showDeleteIcon: boolean = false;
  ngOnInit(): void {}
  onImageSelected(event: any) {
    if (event.target && event.target.files) {
      this.imageFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.image = reader.result.toString();
        }
      };
      if (this.imageFile) {
        reader.readAsDataURL(this.imageFile);
      }
    }
  }

  // Upload new image to backend
  onEditImage() {
    if (this.imageFile) {
      console.log(this.imageFile);
      const formData = new FormData();
      formData.append('userImage', this.imageFile);
      this.user.postImage(formData).subscribe((data: any) => {
        this.image = data.image;
      });
    }
  }

  // Delete image from backend
  onDeleteImage() {
    this.http.delete('/api/deleteImage').subscribe((data: any) => {
      this.image = '';
    });
    this.image = '';
  }

  // Show delete icon when hovering over avatar
  onMouseOver() {
    this.showDeleteIcon = true;
  }

  // Hide delete icon when not hovering over avatar
  onMouseOut() {
    this.showDeleteIcon = false;
  }
}
