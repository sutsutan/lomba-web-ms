import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Api\AlumniController::store
 * @see app/Http/Controllers/Api/AlumniController.php:36
 * @route '/api/admin/alumni'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/admin/alumni',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AlumniController::store
 * @see app/Http/Controllers/Api/AlumniController.php:36
 * @route '/api/admin/alumni'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AlumniController::store
 * @see app/Http/Controllers/Api/AlumniController.php:36
 * @route '/api/admin/alumni'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\AlumniController::store
 * @see app/Http/Controllers/Api/AlumniController.php:36
 * @route '/api/admin/alumni'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\AlumniController::store
 * @see app/Http/Controllers/Api/AlumniController.php:36
 * @route '/api/admin/alumni'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\AlumniController::update
 * @see app/Http/Controllers/Api/AlumniController.php:42
 * @route '/api/admin/alumni/{alumnus}'
 */
export const update = (args: { alumnus: string | number } | [alumnus: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/admin/alumni/{alumnus}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\AlumniController::update
 * @see app/Http/Controllers/Api/AlumniController.php:42
 * @route '/api/admin/alumni/{alumnus}'
 */
update.url = (args: { alumnus: string | number } | [alumnus: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { alumnus: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    alumnus: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        alumnus: args.alumnus,
                }

    return update.definition.url
            .replace('{alumnus}', parsedArgs.alumnus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AlumniController::update
 * @see app/Http/Controllers/Api/AlumniController.php:42
 * @route '/api/admin/alumni/{alumnus}'
 */
update.put = (args: { alumnus: string | number } | [alumnus: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\AlumniController::update
 * @see app/Http/Controllers/Api/AlumniController.php:42
 * @route '/api/admin/alumni/{alumnus}'
 */
update.patch = (args: { alumnus: string | number } | [alumnus: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\AlumniController::update
 * @see app/Http/Controllers/Api/AlumniController.php:42
 * @route '/api/admin/alumni/{alumnus}'
 */
    const updateForm = (args: { alumnus: string | number } | [alumnus: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\AlumniController::update
 * @see app/Http/Controllers/Api/AlumniController.php:42
 * @route '/api/admin/alumni/{alumnus}'
 */
        updateForm.put = (args: { alumnus: string | number } | [alumnus: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Api\AlumniController::update
 * @see app/Http/Controllers/Api/AlumniController.php:42
 * @route '/api/admin/alumni/{alumnus}'
 */
        updateForm.patch = (args: { alumnus: string | number } | [alumnus: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\AlumniController::destroy
 * @see app/Http/Controllers/Api/AlumniController.php:50
 * @route '/api/admin/alumni/{alumnus}'
 */
export const destroy = (args: { alumnus: string | number } | [alumnus: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/alumni/{alumnus}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\AlumniController::destroy
 * @see app/Http/Controllers/Api/AlumniController.php:50
 * @route '/api/admin/alumni/{alumnus}'
 */
destroy.url = (args: { alumnus: string | number } | [alumnus: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { alumnus: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    alumnus: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        alumnus: args.alumnus,
                }

    return destroy.definition.url
            .replace('{alumnus}', parsedArgs.alumnus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AlumniController::destroy
 * @see app/Http/Controllers/Api/AlumniController.php:50
 * @route '/api/admin/alumni/{alumnus}'
 */
destroy.delete = (args: { alumnus: string | number } | [alumnus: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\AlumniController::destroy
 * @see app/Http/Controllers/Api/AlumniController.php:50
 * @route '/api/admin/alumni/{alumnus}'
 */
    const destroyForm = (args: { alumnus: string | number } | [alumnus: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\AlumniController::destroy
 * @see app/Http/Controllers/Api/AlumniController.php:50
 * @route '/api/admin/alumni/{alumnus}'
 */
        destroyForm.delete = (args: { alumnus: string | number } | [alumnus: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const alumni = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default alumni