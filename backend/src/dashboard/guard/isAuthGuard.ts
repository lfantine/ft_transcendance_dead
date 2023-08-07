import { CanActivate, ExecutionContext, Injectable, Req } from "@nestjs/common";
import { DashboardService } from "../dashboard.service";

@Injectable()
export class isAuthGuard implements CanActivate {

	constructor(private dashService: DashboardService) {}

	async canActivate(
		context: ExecutionContext,
	  ): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const user = await this.dashService.isAuthVerif(request);
		request.UserId = user;
		return true;
	  }
}
