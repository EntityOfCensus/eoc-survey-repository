import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { TaskCreate } from "./endpoints/taskCreate";
import { TaskDelete } from "./endpoints/taskDelete";
import { TaskFetch } from "./endpoints/taskFetch";
import { TaskList } from "./endpoints/taskList";
import { SurveyList } from "./endpoints/survey/surveyList";
import { SurveyCreateUpdate } from "./endpoints/survey/surveyCreateUpdate";
import { SurveyGet } from "./endpoints/survey/surveyGet";
import { SurveyDelete } from "./endpoints/survey/surveyDelete";
import { createCors } from 'itty-router';
import secure from './utils/secure';
export const router = OpenAPIRouter({
	docs_url: "/",
});
const { preflight, corsify } = createCors({
	origins: ['*'],
	methods: ['*'],
	maxAge: 84600,
  });

router.all('*', preflight);


router.get("/api/tasks/", TaskList);
router.post("/api/tasks/", TaskCreate);
router.get("/api/tasks/:taskSlug/", TaskFetch);
router.delete("/api/tasks/:taskSlug/", TaskDelete);


router.get("/survey/", secure, SurveyList);
router.post("/survey/", secure, SurveyCreateUpdate);
router.get("/survey/:id", secure, SurveyGet);
router.delete("/survey/:id", secure, SurveyDelete);

router.registry.registerComponent(
	'securitySchemes',
	'BearerAuth',
	{
	  type: 'http',
	  scheme: 'bearer',
	},
  )

// 404 for everything else
router.all("*", () =>
	Response.json(
		{
			success: false,
			error: "Route not found",
		},
		{ status: 404 }
	)
);



export default {
    fetch: async (request, env, ctx) => {
		return router.handle(request, env, ctx).then(corsify)
	 },
};