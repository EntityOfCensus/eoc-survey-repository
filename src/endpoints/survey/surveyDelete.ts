import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path,
} from "@cloudflare/itty-router-openapi";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export class SurveyDelete extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["SurveyRepository"],
		summary: "deletes a single Survey based on the ID supplied",
        description: "deletes a single Survey based on the ID supplied",
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
			"204": {
				description: "Survey response",
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
		  await prisma.clientSurveyRef.update({
			where: { surveyId: decodeURIComponent((data.params.id + '').replace(/\+/g, '%20')) },
			data: {
			  'state': 'deleted',
			}      
		  });
		  return Response.json(
            {
                status: 204,
            }
        );	
	}
    
}