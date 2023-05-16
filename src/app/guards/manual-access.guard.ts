import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ManualAccessGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const manualAccess = next.data["manualAccess"];
    const isManualAccessAllowed = manualAccess === true;

    if (isManualAccessAllowed) {
      return true;
    }

    // Redirecionar para uma página de acesso negado ou qualquer outra página desejada
    return false;
  }
}
