import { AdminGuard } from "./admin.guard";
import { LoggedInGuard } from "./logged-in.guard";

export const authGuards: any[] = [AdminGuard, LoggedInGuard];