import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\AchievementController::index
 * @see app/Http/Controllers/Api/AchievementController.php:12
 * @route '/api/achievements'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/achievements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AchievementController::index
 * @see app/Http/Controllers/Api/AchievementController.php:12
 * @route '/api/achievements'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AchievementController::index
 * @see app/Http/Controllers/Api/AchievementController.php:12
 * @route '/api/achievements'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\AchievementController::index
 * @see app/Http/Controllers/Api/AchievementController.php:12
 * @route '/api/achievements'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\AchievementController::index
 * @see app/Http/Controllers/Api/AchievementController.php:12
 * @route '/api/achievements'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\AchievementController::index
 * @see app/Http/Controllers/Api/AchievementController.php:12
 * @route '/api/achievements'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\AchievementController::index
 * @see app/Http/Controllers/Api/AchievementController.php:12
 * @route '/api/achievements'
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
* @see \App\Http\Controllers\Api\AchievementController::store
 * @see app/Http/Controllers/Api/AchievementController.php:36
 * @route '/api/admin/achievements'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/admin/achievements',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AchievementController::store
 * @see app/Http/Controllers/Api/AchievementController.php:36
 * @route '/api/admin/achievements'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AchievementController::store
 * @see app/Http/Controllers/Api/AchievementController.php:36
 * @route '/api/admin/achievements'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\AchievementController::store
 * @see app/Http/Controllers/Api/AchievementController.php:36
 * @route '/api/admin/achievements'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\AchievementController::store
 * @see app/Http/Controllers/Api/AchievementController.php:36
 * @route '/api/admin/achievements'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\AchievementController::update
 * @see app/Http/Controllers/Api/AchievementController.php:42
 * @route '/api/admin/achievements/{achievement}'
 */
export const update = (args: { achievement: string | number } | [achievement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/admin/achievements/{achievement}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\AchievementController::update
 * @see app/Http/Controllers/Api/AchievementController.php:42
 * @route '/api/admin/achievements/{achievement}'
 */
update.url = (args: { achievement: string | number } | [achievement: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { achievement: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    achievement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        achievement: args.achievement,
                }

    return update.definition.url
            .replace('{achievement}', parsedArgs.achievement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AchievementController::update
 * @see app/Http/Controllers/Api/AchievementController.php:42
 * @route '/api/admin/achievements/{achievement}'
 */
update.put = (args: { achievement: string | number } | [achievement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\AchievementController::update
 * @see app/Http/Controllers/Api/AchievementController.php:42
 * @route '/api/admin/achievements/{achievement}'
 */
update.patch = (args: { achievement: string | number } | [achievement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\AchievementController::update
 * @see app/Http/Controllers/Api/AchievementController.php:42
 * @route '/api/admin/achievements/{achievement}'
 */
    const updateForm = (args: { achievement: string | number } | [achievement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\AchievementController::update
 * @see app/Http/Controllers/Api/AchievementController.php:42
 * @route '/api/admin/achievements/{achievement}'
 */
        updateForm.put = (args: { achievement: string | number } | [achievement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Api\AchievementController::update
 * @see app/Http/Controllers/Api/AchievementController.php:42
 * @route '/api/admin/achievements/{achievement}'
 */
        updateForm.patch = (args: { achievement: string | number } | [achievement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\AchievementController::destroy
 * @see app/Http/Controllers/Api/AchievementController.php:50
 * @route '/api/admin/achievements/{achievement}'
 */
export const destroy = (args: { achievement: string | number } | [achievement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/achievements/{achievement}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\AchievementController::destroy
 * @see app/Http/Controllers/Api/AchievementController.php:50
 * @route '/api/admin/achievements/{achievement}'
 */
destroy.url = (args: { achievement: string | number } | [achievement: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { achievement: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    achievement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        achievement: args.achievement,
                }

    return destroy.definition.url
            .replace('{achievement}', parsedArgs.achievement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AchievementController::destroy
 * @see app/Http/Controllers/Api/AchievementController.php:50
 * @route '/api/admin/achievements/{achievement}'
 */
destroy.delete = (args: { achievement: string | number } | [achievement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\AchievementController::destroy
 * @see app/Http/Controllers/Api/AchievementController.php:50
 * @route '/api/admin/achievements/{achievement}'
 */
    const destroyForm = (args: { achievement: string | number } | [achievement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\AchievementController::destroy
 * @see app/Http/Controllers/Api/AchievementController.php:50
 * @route '/api/admin/achievements/{achievement}'
 */
        destroyForm.delete = (args: { achievement: string | number } | [achievement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const AchievementController = { index, store, update, destroy }

export default AchievementController