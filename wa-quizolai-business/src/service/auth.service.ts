import {includeAll} from "../../../wa-quizolai-shared/util";


export function hasPermission(permission : string [], foundPermissions : string[]) {
    if (!foundPermissions || !permission) {
      return false;
    }
    return includeAll(permission, foundPermissions)
}


