import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Api\TestimonyController::store
 * @see app/Http/Controllers/Api/TestimonyController.php:36
 * @route '/api/admin/testimonies'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/admin/testimonies',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\TestimonyController::store
 * @see app/Http/Controllers/Api/TestimonyController.php:36
 * @route '/api/admin/testimonies'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\TestimonyController::store
 * @see app/Http/Controllers/Api/TestimonyController.php:36
 * @route '/api/admin/testimonies'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\TestimonyController::store
 * @see app/Http/Controllers/Api/TestimonyController.php:36
 * @route '/api/admin/testimonies'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\TestimonyController::store
 * @see app/Http/Controllers/Api/TestimonyController.php:36
 * @route '/api/admin/testimonies'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\TestimonyController::update
 * @see app/Http/Controllers/Api/TestimonyController.php:42
 * @route '/api/admin/testimonies/{testimony}'
 */
export const update = (args: { testimony: string | number } | [testimony: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/admin/testimonies/{testimony}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\TestimonyController::update
 * @see app/Http/Controllers/Api/TestimonyController.php:42
 * @route '/api/admin/testimonies/{testimony}'
 */
update.url = (args: { testimony: string | number } | [testimony: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { testimony: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    testimony: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        testimony: args.testimony,
                }

    return update.definition.url
            .replace('{testimony}', parsedArgs.testimony.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\TestimonyController::update
 * @see app/Http/Controllers/Api/TestimonyController.php:42
 * @route '/api/admin/testimonies/{testimony}'
 */
update.put = (args: { testimony: string | number } | [testimony: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\TestimonyController::update
 * @see app/Http/Controllers/Api/TestimonyController.php:42
 * @route '/api/admin/testimonies/{testimony}'
 */
update.patch = (args: { testimony: string | number } | [testimony: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\TestimonyController::update
 * @see app/Http/Controllers/Api/TestimonyController.php:42
 * @route '/api/admin/testimonies/{testimony}'
 */
    const updateForm = (args: { testimony: string | number } | [testimony: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\TestimonyController::update
 * @see app/Http/Controllers/Api/TestimonyController.php:42
 * @route '/api/admin/testimonies/{testimony}'
 */
        updateForm.put = (args: { testimony: string | number } | [testimony: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Api\TestimonyController::update
 * @see app/Http/Controllers/Api/TestimonyController.php:42
 * @route '/api/admin/testimonies/{testimony}'
 */
        updateForm.patch = (args: { testimony: string | number } | [testimony: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\TestimonyController::destroy
 * @see app/Http/Controllers/Api/TestimonyController.php:50
 * @route '/api/admin/testimonies/{testimony}'
 */
export const destroy = (args: { testimony: string | number } | [testimony: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/testimonies/{testimony}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\TestimonyController::destroy
 * @see app/Http/Controllers/Api/TestimonyController.php:50
 * @route '/api/admin/testimonies/{testimony}'
 */
destroy.url = (args: { testimony: string | number } | [testimony: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { testimony: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    testimony: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        testimony: args.testimony,
                }

    return destroy.definition.url
            .replace('{testimony}', parsedArgs.testimony.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\TestimonyController::destroy
 * @see app/Http/Controllers/Api/TestimonyController.php:50
 * @route '/api/admin/testimonies/{testimony}'
 */
destroy.delete = (args: { testimony: string | number } | [testimony: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\TestimonyController::destroy
 * @see app/Http/Controllers/Api/TestimonyController.php:50
 * @route '/api/admin/testimonies/{testimony}'
 */
    const destroyForm = (args: { testimony: string | number } | [testimony: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\TestimonyController::destroy
 * @see app/Http/Controllers/Api/TestimonyController.php:50
 * @route '/api/admin/testimonies/{testimony}'
 */
        destroyForm.delete = (args: { testimony: string | number } | [testimony: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const testimonies = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default testimonies