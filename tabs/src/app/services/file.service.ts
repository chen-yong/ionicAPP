import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    public fileUploadOptions: FileUploadOptions,
    public fileTransferObject: FileTransferObject,
    public fileOpener: FileOpener,
  ) { }
}
