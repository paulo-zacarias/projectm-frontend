import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss']
})
export class UploadPictureComponent implements OnInit {

  selectedFile: File = null;
  user = this.data;

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<UploadPictureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser) {}

  ngOnInit(): void {
  }

  onFileSelected(input: any) {
    this.selectedFile = input.target.files.item(0);
  }

  uploadFile() {
    this.userService.uploadUserProfilePiture(this.user.profile.id, this.selectedFile).subscribe(profile => {
      this.user.profile = profile;
      this.dialogRef.close(this.user);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
