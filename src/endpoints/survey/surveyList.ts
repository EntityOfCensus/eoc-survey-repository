import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Query,
} from "@cloudflare/itty-router-openapi";
import { Survey } from "../../types";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export class SurveyList extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["SurveyRepository"],
		summary: "Returns all Surveys from the system that the user has access to",
        description: "Returns all Surveys from the system that the user has access to",
        security: [
            {
                BearerAuth: [],
            },
          ],
        parameters: {
			page: Query(Number, {
				description: "Page number",
				default: 0,
			}),
			isCompleted: Query(Boolean, {
				description: "Filter by completed flag",
				required: false,
			}),
		},
		responses: {
			"200": {
				description: "Returns a list of Surveys",
				schema: {
					success: Boolean,
					result: {
						Surveys: [Survey],
					},
				},
			},
		},
	};

	async handle(
		request: Request,
		env: any,
		context: any,
		data: Record<string, any>
	) {
		const { page, isCompleted } = data.query;
        const prisma = new PrismaClient({
            datasources: {
              db: {
                url: env.DATABASE_URL,
              },
            },
          }).$extends(withAccelerate());
        return await prisma.clientSurveyRef.findMany({
            where: {othentId: request.claims.sub, AND: {state: {not: 'deleted'}}}
          });
	}
    
}