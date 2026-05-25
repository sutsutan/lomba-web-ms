import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Api\OrganizationController::store
 * @see app/Http/Controllers/Api/OrganizationController.php:36
 * @route '/api/admin/organizations'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/admin/organizations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\OrganizationController::store
 * @see app/Http/Controllers/Api/OrganizationController.php:36
 * @route '/api/admin/organizations'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\OrganizationController::store
 * @see app/Http/Controllers/Api/OrganizationController.php:36
 * @route '/api/admin/organizations'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\OrganizationController::store
 * @see app/Http/Controllers/Api/OrganizationController.php:36
 * @route '/api/admin/organizations'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\OrganizationController::store
 * @see app/Http/Controllers/Api/OrganizationController.php:36
 * @route '/api/admin/organizations'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\OrganizationController::update
 * @see app/Http/Controllers/Api/OrganizationController.php:42
 * @route '/api/admin/organizations/{organization}'
 */
export const update = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/admin/organizations/{organization}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\OrganizationController::update
 * @see app/Http/Controllers/Api/OrganizationController.php:42
 * @route '/api/admin/organizations/{organization}'
 */
update.url = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { organization: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    organization: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        organization: args.organization,
                }

    return update.definition.url
            .replace('{organization}', parsedArgs.organization.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\OrganizationController::update
 * @see app/Http/Controllers/Api/OrganizationController.php:42
 * @route '/api/admin/organizations/{organization}'
 */
update.put = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\OrganizationController::update
 * @see app/Http/Controllers/Api/OrganizationController.php:42
 * @route '/api/admin/organizations/{organization}'
 */
update.patch = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\OrganizationController::update
 * @see app/Http/Controllers/Api/OrganizationController.php:42
 * @route '/api/admin/organizations/{organization}'
 */
    const updateForm = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\OrganizationController::update
 * @see app/Http/Controllers/Api/OrganizationController.php:42
 * @route '/api/admin/organizations/{organization}'
 */
        updateForm.put = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Api\OrganizationController::update
 * @see app/Http/Controllers/Api/OrganizationController.php:42
 * @route '/api/admin/organizations/{organization}'
 */
        updateForm.patch = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\OrganizationController::destroy
 * @see app/Http/Controllers/Api/OrganizationController.php:50
 * @route '/api/admin/organizations/{organization}'
 */
export const destroy = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/organizations/{organization}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\OrganizationController::destroy
 * @see app/Http/Controllers/Api/OrganizationController.php:50
 * @route '/api/admin/organizations/{organization}'
 */
destroy.url = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { organization: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    organization: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        organization: args.organization,
                }

    return destroy.definition.url
            .replace('{organization}', parsedArgs.organization.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\OrganizationController::destroy
 * @see app/Http/Controllers/Api/OrganizationController.php:50
 * @route '/api/admin/organizations/{organization}'
 */
destroy.delete = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\OrganizationController::destroy
 * @see app/Http/Controllers/Api/OrganizationController.php:50
 * @route '/api/admin/organizations/{organization}'
 */
    const destroyForm = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\OrganizationController::destroy
 * @see app/Http/Controllers/Api/OrganizationController.php:50
 * @route '/api/admin/organizations/{organization}'
 */
        destroyForm.delete = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const organizations = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default organizations