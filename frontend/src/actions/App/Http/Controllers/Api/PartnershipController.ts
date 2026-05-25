import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\PartnershipController::index
 * @see app/Http/Controllers/Api/PartnershipController.php:12
 * @route '/api/partnerships'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/partnerships',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\PartnershipController::index
 * @see app/Http/Controllers/Api/PartnershipController.php:12
 * @route '/api/partnerships'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PartnershipController::index
 * @see app/Http/Controllers/Api/PartnershipController.php:12
 * @route '/api/partnerships'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\PartnershipController::index
 * @see app/Http/Controllers/Api/PartnershipController.php:12
 * @route '/api/partnerships'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\PartnershipController::index
 * @see app/Http/Controllers/Api/PartnershipController.php:12
 * @route '/api/partnerships'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\PartnershipController::index
 * @see app/Http/Controllers/Api/PartnershipController.php:12
 * @route '/api/partnerships'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\PartnershipController::index
 * @see app/Http/Controllers/Api/PartnershipController.php:12
 * @route '/api/partnerships'
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
* @see \App\Http\Controllers\Api\PartnershipController::store
 * @see app/Http/Controllers/Api/PartnershipController.php:36
 * @route '/api/admin/partnerships'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/admin/partnerships',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\PartnershipController::store
 * @see app/Http/Controllers/Api/PartnershipController.php:36
 * @route '/api/admin/partnerships'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PartnershipController::store
 * @see app/Http/Controllers/Api/PartnershipController.php:36
 * @route '/api/admin/partnerships'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\PartnershipController::store
 * @see app/Http/Controllers/Api/PartnershipController.php:36
 * @route '/api/admin/partnerships'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\PartnershipController::store
 * @see app/Http/Controllers/Api/PartnershipController.php:36
 * @route '/api/admin/partnerships'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\PartnershipController::update
 * @see app/Http/Controllers/Api/PartnershipController.php:42
 * @route '/api/admin/partnerships/{partnership}'
 */
export const update = (args: { partnership: string | number } | [partnership: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/admin/partnerships/{partnership}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\PartnershipController::update
 * @see app/Http/Controllers/Api/PartnershipController.php:42
 * @route '/api/admin/partnerships/{partnership}'
 */
update.url = (args: { partnership: string | number } | [partnership: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { partnership: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    partnership: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        partnership: args.partnership,
                }

    return update.definition.url
            .replace('{partnership}', parsedArgs.partnership.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PartnershipController::update
 * @see app/Http/Controllers/Api/PartnershipController.php:42
 * @route '/api/admin/partnerships/{partnership}'
 */
update.put = (args: { partnership: string | number } | [partnership: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\PartnershipController::update
 * @see app/Http/Controllers/Api/PartnershipController.php:42
 * @route '/api/admin/partnerships/{partnership}'
 */
update.patch = (args: { partnership: string | number } | [partnership: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\PartnershipController::update
 * @see app/Http/Controllers/Api/PartnershipController.php:42
 * @route '/api/admin/partnerships/{partnership}'
 */
    const updateForm = (args: { partnership: string | number } | [partnership: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\PartnershipController::update
 * @see app/Http/Controllers/Api/PartnershipController.php:42
 * @route '/api/admin/partnerships/{partnership}'
 */
        updateForm.put = (args: { partnership: string | number } | [partnership: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Api\PartnershipController::update
 * @see app/Http/Controllers/Api/PartnershipController.php:42
 * @route '/api/admin/partnerships/{partnership}'
 */
        updateForm.patch = (args: { partnership: string | number } | [partnership: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\PartnershipController::destroy
 * @see app/Http/Controllers/Api/PartnershipController.php:50
 * @route '/api/admin/partnerships/{partnership}'
 */
export const destroy = (args: { partnership: string | number } | [partnership: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/partnerships/{partnership}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\PartnershipController::destroy
 * @see app/Http/Controllers/Api/PartnershipController.php:50
 * @route '/api/admin/partnerships/{partnership}'
 */
destroy.url = (args: { partnership: string | number } | [partnership: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { partnership: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    partnership: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        partnership: args.partnership,
                }

    return destroy.definition.url
            .replace('{partnership}', parsedArgs.partnership.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PartnershipController::destroy
 * @see app/Http/Controllers/Api/PartnershipController.php:50
 * @route '/api/admin/partnerships/{partnership}'
 */
destroy.delete = (args: { partnership: string | number } | [partnership: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\PartnershipController::destroy
 * @see app/Http/Controllers/Api/PartnershipController.php:50
 * @route '/api/admin/partnerships/{partnership}'
 */
    const destroyForm = (args: { partnership: string | number } | [partnership: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\PartnershipController::destroy
 * @see app/Http/Controllers/Api/PartnershipController.php:50
 * @route '/api/admin/partnerships/{partnership}'
 */
        destroyForm.delete = (args: { partnership: string | number } | [partnership: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const PartnershipController = { index, store, update, destroy }

export default PartnershipController