const decode = require('jwt-claims');

function getJwt(request: Request) {
	const authHeader = request.headers.get('Authorization');
	if (!authHeader || authHeader.substring(0, 6) !== 'Bearer') {
	  return null
	}
	return authHeader.substring(6).trim()
}

export default function secure(request: Request, env: any, ctx: any) {
	const idToken = getJwt(request);
	if(idToken == null) {
		return Response.json(
			{
				success: false,
				error: "No authorization id",
			},
			{
				status: 401,
			}
		);
		}
   try {
    request['claims'] = decode(idToken);    
   } catch (error) {
        return Response.json(
            {
                success: false,
                error: "Invalid id",
            },
            {
                status: 401,
            }
        );
    }
    if(request['claims']['iss'] == null || request['claims']['iss'] != 'https://auth.othent.io/') {
        return Response.json(
            {
                success: false,
            },
            {
                status: 403,
            }
        );       
    }
}