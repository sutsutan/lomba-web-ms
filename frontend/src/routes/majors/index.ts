import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Api\MajorController::store
 * @see app/Http/Controllers/Api/MajorController.php:36
 * @route '/api/admin/majors'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/admin/majors',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\MajorController::store
 * @see app/Http/Controllers/Api/MajorController.php:36
 * @route '/api/admin/majors'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\MajorController::store
 * @see app/Http/Controllers/Api/MajorController.php:36
 * @route '/api/admin/majors'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\MajorController::store
 * @see app/Http/Controllers/Api/MajorController.php:36
 * @route '/api/admin/majors'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\MajorController::store
 * @see app/Http/Controllers/Api/MajorController.php:36
 * @route '/api/admin/majors'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\MajorController::update
 * @see app/Http/Controllers/Api/MajorController.php:42
 * @route '/api/admin/majors/{major}'
 */
export const update = (args: { major: string | number } | [major: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/admin/majors/{major}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\MajorController::update
 * @see app/Http/Controllers/Api/MajorController.php:42
 * @route '/api/admin/majors/{major}'
 */
update.url = (args: { major: string | number } | [major: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { major: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    major: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        major: args.major,
                }

    return update.definition.url
            .replace('{major}', parsedArgs.major.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\MajorController::update
 * @see app/Http/Controllers/Api/MajorController.php:42
 * @route '/api/admin/majors/{major}'
 */
update.put = (args: { major: string | number } | [major: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\MajorController::update
 * @see app/Http/Controllers/Api/MajorController.php:42
 * @route '/api/admin/majors/{major}'
 */
update.patch = (args: { major: string | number } | [major: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\MajorController::update
 * @see app/Http/Controllers/Api/MajorController.php:42
 * @route '/api/admin/majors/{major}'
 */
    const updateForm = (args: { major: string | number } | [major: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\MajorController::update
 * @see app/Http/Controllers/Api/MajorController.php:42
 * @route '/api/admin/majors/{major}'
 */
        updateForm.put = (args: { major: string | number } | [major: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Api\MajorController::update
 * @see app/Http/Controllers/Api/MajorController.php:42
 * @route '/api/admin/majors/{major}'
 */
        updateForm.patch = (args: { major: string | number } | [major: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\MajorController::destroy
 * @see app/Http/Controllers/Api/MajorController.php:50
 * @route '/api/admin/majors/{major}'
 */
export const destroy = (args: { major: string | number } | [major: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/majors/{major}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\MajorController::destroy
 * @see app/Http/Controllers/Api/MajorController.php:50
 * @route '/api/admin/majors/{major}'
 */
destroy.url = (args: { major: string | number } | [major: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { major: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    major: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        major: args.major,
                }

    return destroy.definition.url
            .replace('{major}', parsedArgs.major.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\MajorController::destroy
 * @see app/Http/Controllers/Api/MajorController.php:50
 * @route '/api/admin/majors/{major}'
 */
destroy.delete = (args: { major: string | number } | [major: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\MajorController::destroy
 * @see app/Http/Controllers/Api/MajorController.php:50
 * @route '/api/admin/majors/{major}'
 */
    const destroyForm = (args: { major: string | number } | [major: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\MajorController::destroy
 * @see app/Http/Controllers/Api/MajorController.php:50
 * @route '/api/admin/majors/{major}'
 */
        destroyForm.delete = (args: { major: string | number } | [major: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const majors = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default majors