import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\ExtracurricularController::index
 * @see app/Http/Controllers/Api/ExtracurricularController.php:25
 * @route '/api/extracurriculars'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/extracurriculars',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ExtracurricularController::index
 * @see app/Http/Controllers/Api/ExtracurricularController.php:25
 * @route '/api/extracurriculars'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ExtracurricularController::index
 * @see app/Http/Controllers/Api/ExtracurricularController.php:25
 * @route '/api/extracurriculars'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\ExtracurricularController::index
 * @see app/Http/Controllers/Api/ExtracurricularController.php:25
 * @route '/api/extracurriculars'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\ExtracurricularController::index
 * @see app/Http/Controllers/Api/ExtracurricularController.php:25
 * @route '/api/extracurriculars'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\ExtracurricularController::index
 * @see app/Http/Controllers/Api/ExtracurricularController.php:25
 * @route '/api/extracurriculars'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\ExtracurricularController::index
 * @see app/Http/Controllers/Api/ExtracurricularController.php:25
 * @route '/api/extracurriculars'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Api\ExtracurricularController::store
 * @see app/Http/Controllers/Api/ExtracurricularController.php:36
 * @route '/api/admin/extracurriculars'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/admin/extracurriculars',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ExtracurricularController::store
 * @see app/Http/Controllers/Api/ExtracurricularController.php:36
 * @route '/api/admin/extracurriculars'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ExtracurricularController::store
 * @see app/Http/Controllers/Api/ExtracurricularController.php:36
 * @route '/api/admin/extracurriculars'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\ExtracurricularController::store
 * @see app/Http/Controllers/Api/ExtracurricularController.php:36
 * @route '/api/admin/extracurriculars'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ExtracurricularController::store
 * @see app/Http/Controllers/Api/ExtracurricularController.php:36
 * @route '/api/admin/extracurriculars'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\ExtracurricularController::update
 * @see app/Http/Controllers/Api/ExtracurricularController.php:42
 * @route '/api/admin/extracurriculars/{extracurricular}'
 */
export const update = (args: { extracurricular: string | number } | [extracurricular: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/admin/extracurriculars/{extracurricular}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\ExtracurricularController::update
 * @see app/Http/Controllers/Api/ExtracurricularController.php:42
 * @route '/api/admin/extracurriculars/{extracurricular}'
 */
update.url = (args: { extracurricular: string | number } | [extracurricular: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { extracurricular: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    extracurricular: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        extracurricular: args.extracurricular,
                }

    return update.definition.url
            .replace('{extracurricular}', parsedArgs.extracurricular.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ExtracurricularController::update
 * @see app/Http/Controllers/Api/ExtracurricularController.php:42
 * @route '/api/admin/extracurriculars/{extracurricular}'
 */
update.put = (args: { extracurricular: string | number } | [extracurricular: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\ExtracurricularController::update
 * @see app/Http/Controllers/Api/ExtracurricularController.php:42
 * @route '/api/admin/extracurriculars/{extracurricular}'
 */
update.patch = (args: { extracurricular: string | number } | [extracurricular: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\ExtracurricularController::update
 * @see app/Http/Controllers/Api/ExtracurricularController.php:42
 * @route '/api/admin/extracurriculars/{extracurricular}'
 */
    const updateForm = (args: { extracurricular: string | number } | [extracurricular: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ExtracurricularController::update
 * @see app/Http/Controllers/Api/ExtracurricularController.php:42
 * @route '/api/admin/extracurriculars/{extracurricular}'
 */
        updateForm.put = (args: { extracurricular: string | number } | [extracurricular: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Api\ExtracurricularController::update
 * @see app/Http/Controllers/Api/ExtracurricularController.php:42
 * @route '/api/admin/extracurriculars/{extracurricular}'
 */
        updateForm.patch = (args: { extracurricular: string | number } | [extracurricular: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Api\ExtracurricularController::destroy
 * @see app/Http/Controllers/Api/ExtracurricularController.php:50
 * @route '/api/admin/extracurriculars/{extracurricular}'
 */
export const destroy = (args: { extracurricular: string | number } | [extracurricular: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/extracurriculars/{extracurricular}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\ExtracurricularController::destroy
 * @see app/Http/Controllers/Api/ExtracurricularController.php:50
 * @route '/api/admin/extracurriculars/{extracurricular}'
 */
destroy.url = (args: { extracurricular: string | number } | [extracurricular: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { extracurricular: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    extracurricular: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        extracurricular: args.extracurricular,
                }

    return destroy.definition.url
            .replace('{extracurricular}', parsedArgs.extracurricular.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ExtracurricularController::destroy
 * @see app/Http/Controllers/Api/ExtracurricularController.php:50
 * @route '/api/admin/extracurriculars/{extracurricular}'
 */
destroy.delete = (args: { extracurricular: string | number } | [extracurricular: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\ExtracurricularController::destroy
 * @see app/Http/Controllers/Api/ExtracurricularController.php:50
 * @route '/api/admin/extracurriculars/{extracurricular}'
 */
    const destroyForm = (args: { extracurricular: string | number } | [extracurricular: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ExtracurricularController::destroy
 * @see app/Http/Controllers/Api/ExtracurricularController.php:50
 * @route '/api/admin/extracurriculars/{extracurricular}'
 */
        destroyForm.delete = (args: { extracurricular: string | number } | [extracurricular: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ExtracurricularController = { index, store, update, destroy }

export default ExtracurricularController