import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path,
} from "@cloudflare/itty-router-openapi";
import { Survey } from "../../types";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export class SurveyGet extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["SurveyRepository"],
		summary: "Returns a Survey based on a single ID",
        description: "Returns a Survey based on a single ID",
        security: [
            {
                BearerAuth: [],
            },
          ],
        parameters: {
			id: Path(String, {
				description: "ID of Survey to fetch",
				default: 0,
			}),
		},
		responses: {
			"200": {
				description: "Survey response",
				schema: {
					success: Boolean,
					result: {
						Survey: Survey,
					},
				},
			},
		},
	};

	async handle(
		request: any,
		env: any,
		context: any,
		data: Record<string, any>
	) {
        const prisma = new PrismaClient({
            datasources: {
              db: {
                url: env.DATABASE_URL,
              },
            },
          }).$extends(withAccelerate());
        return await prisma.clientSurveyRef.findFirst({
			where: {surveyId: decodeURIComponent((data.params.id + '').replace(/\+/g, '%20')), 
				AND: {othentId: request.claims.sub, AND: {state: {not: 'deleted'}}}},
		  });
	}
    
}