import {Injectable} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import jwt_decode from "jwt-decode";
import {includeAll} from "@quizolai-shared/util";
import {firstValueFrom} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public auth: AuthService) {
  }



  async getPermissions() {
    const authenticated = await firstValueFrom(this.auth.isAuthenticated$);
    if (authenticated) {
      const token: string = await firstValueFrom(this.auth.getAccessTokenSilently())
      const decodedToken: any = jwt_decode(token);
      if (decodedToken && decodedToken.permissions) {
        return decodedToken.permissions as string[];
      }
    }
    return [];
  }

  async hasPermission(permissions: string []) {
    if (!permissions || permissions.length === 0) {
      return false
    }
    const userPermissions = await this.getPermissions();
    if(!userPermissions || userPermissions.length === 0) {
      return false
    }


    return includeAll(permissions, userPermissions);
  }

  canEdit() {
    return this.hasPermission(['edit:questions']);
  }

  canDelete() {
    return this.hasPermission(['delete:questions']);
  }

  canAdd() {
    return this.hasPermission(['add:questions']);
  }

  canRead() {
    return this.hasPermission(['read:questions']);
  }

  canReadSafe() {
    return this.hasPermission(['read:safequestions'])
  }

}


