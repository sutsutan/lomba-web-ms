import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\UploadController::upload
 * @see app/Http/Controllers/Api/UploadController.php:9
 * @route '/api/admin/upload'
 */
export const upload = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(options),
    method: 'post',
})

upload.definition = {
    methods: ["post"],
    url: '/api/admin/upload',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\UploadController::upload
 * @see app/Http/Controllers/Api/UploadController.php:9
 * @route '/api/admin/upload'
 */
upload.url = (options?: RouteQueryOptions) => {
    return upload.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\UploadController::upload
 * @see app/Http/Controllers/Api/UploadController.php:9
 * @route '/api/admin/upload'
 */
upload.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\UploadController::upload
 * @see app/Http/Controllers/Api/UploadController.php:9
 * @route '/api/admin/upload'
 */
    const uploadForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: upload.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\UploadController::upload
 * @see app/Http/Controllers/Api/UploadController.php:9
 * @route '/api/admin/upload'
 */
        uploadForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: upload.url(options),
            method: 'post',
        })
    
    upload.form = uploadForm
const UploadController = { upload }

export default UploadController