import { Injectable } from "@angular/core";
export const STORAGE_KEY = "user";
import * as CryptoJS from "crypto-js";

/**
 * Service for operations with user.
 */
@Injectable()
export class CommonService {
  private namespace = "1b671a64-40d5-491e-99b0-da01ff1f3341";
  generateHash = (id: string): string => {
    let hash = CryptoJS.AES.encrypt(id, this.namespace).toString();
    
    return hash;
  };

  parseHash = (uuid: string): string => {
    let bytes = CryptoJS.AES.decrypt(uuid, this.namespace);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  };
}
