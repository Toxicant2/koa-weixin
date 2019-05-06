import {
    SwaggerRouter
} from 'koa-swagger-decorator'

const router = new SwaggerRouter()

// swagger docs avaliable at http://localhost:3300/swagger-html
router.swagger({
    title: 'Koa Weixin Test',
    description: 'Koa Server Test API DOC',
    version: '1.0.0',

    // [optional] default is root path.
    prefix: '/',

    // [optional] default is /swagger-html
    swaggerHtmlEndpoint: '/swagger-html',

    // [optional] default is /swagger-json
    swaggerJsonEndpoint: '/swagger-json',

    // [optional] additional options for building swagger doc
    // eg. add api_key as shown below
    swaggerOptions: {
        securityDefinitions: {
            ApiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization'
            }
        }
    },

    swaggerConfiguration: {
        display: {
            defaultModelsExpandDepth: 4,
            defaultModelExpandDepth: 3,
            docExpansion: 'list',
            defaultModelRendering: 'model'
        }
    }
})

// mapDir will scan the input dir, and automatically call router.map to all Router Class
router.mapDir(__dirname, {
    // default: true .To recursively scan the dir to make router. If false, will not scan subroutes dir
    // recursive: true,
    // default: true, if true, you can call ctx.validatedBody[Query|Params] to get validated data.
    // doValidation: true,
})

export default router
