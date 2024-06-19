import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Query,
} from "@cloudflare/itty-router-openapi";
import { Survey } from "../../types";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export class SurveyCreateUpdate extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["SurveyRepository"],
		summary: "Creates \\ Update a new Survey in the store. Duplicates are not allowed ",
        description: "Creates \\ Update a new Survey in the store. Duplicates are not allowed  ",
        security: [
            {
                BearerAuth: [],
            },
          ],
		requestBody:  Survey,
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
		  const resBody =  await prisma.clientSurveyRef.upsert({
			where: { surveyId: data.body.surveyId },
			update: {
			  'state': data.body.state,
			},
			create: {
			  'surveyId': data.body.surveyId,
			  'othentId': request.claims.sub,
			  'state': data.body.state,
			}      
		  });
		  return resBody;
	}
    
}