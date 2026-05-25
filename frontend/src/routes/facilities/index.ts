import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Api\FacilityController::store
 * @see app/Http/Controllers/Api/FacilityController.php:36
 * @route '/api/admin/facilities'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/admin/facilities',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\FacilityController::store
 * @see app/Http/Controllers/Api/FacilityController.php:36
 * @route '/api/admin/facilities'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FacilityController::store
 * @see app/Http/Controllers/Api/FacilityController.php:36
 * @route '/api/admin/facilities'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\FacilityController::store
 * @see app/Http/Controllers/Api/FacilityController.php:36
 * @route '/api/admin/facilities'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\FacilityController::store
 * @see app/Http/Controllers/Api/FacilityController.php:36
 * @route '/api/admin/facilities'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\FacilityController::update
 * @see app/Http/Controllers/Api/FacilityController.php:42
 * @route '/api/admin/facilities/{facility}'
 */
export const update = (args: { facility: string | number } | [facility: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/admin/facilities/{facility}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\FacilityController::update
 * @see app/Http/Controllers/Api/FacilityController.php:42
 * @route '/api/admin/facilities/{facility}'
 */
update.url = (args: { facility: string | number } | [facility: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { facility: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    facility: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        facility: args.facility,
                }

    return update.definition.url
            .replace('{facility}', parsedArgs.facility.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FacilityController::update
 * @see app/Http/Controllers/Api/FacilityController.php:42
 * @route '/api/admin/facilities/{facility}'
 */
update.put = (args: { facility: string | number } | [facility: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\FacilityController::update
 * @see app/Http/Controllers/Api/FacilityController.php:42
 * @route '/api/admin/facilities/{facility}'
 */
update.patch = (args: { facility: string | number } | [facility: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\FacilityController::update
 * @see app/Http/Controllers/Api/FacilityController.php:42
 * @route '/api/admin/facilities/{facility}'
 */
    const updateForm = (args: { facility: string | number } | [facility: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\FacilityController::update
 * @see app/Http/Controllers/Api/FacilityController.php:42
 * @route '/api/admin/facilities/{facility}'
 */
        updateForm.put = (args: { facility: string | number } | [facility: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Api\FacilityController::update
 * @see app/Http/Controllers/Api/FacilityController.php:42
 * @route '/api/admin/facilities/{facility}'
 */
        updateForm.patch = (args: { facility: string | number } | [facility: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\FacilityController::destroy
 * @see app/Http/Controllers/Api/FacilityController.php:50
 * @route '/api/admin/facilities/{facility}'
 */
export const destroy = (args: { facility: string | number } | [facility: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/facilities/{facility}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\FacilityController::destroy
 * @see app/Http/Controllers/Api/FacilityController.php:50
 * @route '/api/admin/facilities/{facility}'
 */
destroy.url = (args: { facility: string | number } | [facility: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { facility: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    facility: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        facility: args.facility,
                }

    return destroy.definition.url
            .replace('{facility}', parsedArgs.facility.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FacilityController::destroy
 * @see app/Http/Controllers/Api/FacilityController.php:50
 * @route '/api/admin/facilities/{facility}'
 */
destroy.delete = (args: { facility: string | number } | [facility: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\FacilityController::destroy
 * @see app/Http/Controllers/Api/FacilityController.php:50
 * @route '/api/admin/facilities/{facility}'
 */
    const destroyForm = (args: { facility: string | number } | [facility: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\FacilityController::destroy
 * @see app/Http/Controllers/Api/FacilityController.php:50
 * @route '/api/admin/facilities/{facility}'
 */
        destroyForm.delete = (args: { facility: string | number } | [facility: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const facilities = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default facilities