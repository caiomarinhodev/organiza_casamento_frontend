import { Component, Input, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BaseComponent } from "src/app/core/interface/base.component";
import { UserService } from "src/app/service/user/user.service";

@Component({
  selector: "app-modal-send",
  templateUrl: "./modal-send.component.html",
  styleUrls: ["./modal-send.component.css"],
})
export class ModalSendComponent extends BaseComponent implements OnInit {
  @Input() phone? = "";

  @Input() email? = "";

  user: any;
  selectEmail = false;
  selectWhatsapp = false;

  @Input() url?: string = "";

  constructor(
    private translate: TranslateService,
    private userService: UserService
  ) {
    super();
    this.translate = translate;
    this.user = this.userService.getUser();
  }

  selectEmailMethod() {
    this.selectEmail = true;
    this.selectWhatsapp = false;
  }
  selectWhatsappMethod() {
    this.selectEmail = false;
    this.selectWhatsapp = true;
  }

  sendEmailMessage() {
    const email = this.email; // endereço de email para enviar a mensagem
    const subject = "Confirmação de Presença";
    const linkURL = String(location.origin) + this.url;
    const body =
      "Olá, estou enviando uma mensagem por email de RSVP do meu casamento! \n Por favor confirme sua presença no meu casamento:\n" +
      linkURL +
      "\n Obrigado!";
    const url = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    console.log("[modal-send] UrlSEND ", url);
    window.location.href = url;
  }

  sendWhatsappMessage() {
    console.log("[modal-send] send whatsapp");
    console.log(location.origin)
    const linkURL = String(location.origin) + this.url;
    const message =
      "Olá, estou enviando uma mensagem pelo Whatsapp! \n Por favor confirme sua presença no meu casamento:\n\n" +
      linkURL +
      "\n\n Obrigado!";
    const url = `https://api.whatsapp.com/send?phone=${
      this.phone
    }&text=${encodeURIComponent(message)}`;
    console.log("[modal-send] UrlSEND ", url);
    window.open(url, "_blank");
  }

  isValidForm() {
    if (this.selectEmail) {
      return this.email !== "";
    }
    if (this.selectWhatsapp) {
      return this.phone !== "";
    }
    return false;
  }

  sendInvite() {
    console.log("[modal-send] send invite");
    if (this.selectEmail) {
      this.sendEmailMessage();
    }
    if (this.selectWhatsapp) {
      this.sendWhatsappMessage();
    }
  }

  closeModal() {
    console.log("[modal-send] close modal");
    this.email = "";
    this.phone = "";
    this.selectEmail = false;
    this.selectWhatsapp = false;
  }

  override ngOnInit() {
    super.ngOnInit();
    console.log("[modal-send] Url ", this.url);
  }
}
