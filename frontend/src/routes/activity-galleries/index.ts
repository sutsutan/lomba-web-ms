import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Api\ActivityGalleryController::store
 * @see app/Http/Controllers/Api/ActivityGalleryController.php:36
 * @route '/api/admin/activity-galleries'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/admin/activity-galleries',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ActivityGalleryController::store
 * @see app/Http/Controllers/Api/ActivityGalleryController.php:36
 * @route '/api/admin/activity-galleries'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ActivityGalleryController::store
 * @see app/Http/Controllers/Api/ActivityGalleryController.php:36
 * @route '/api/admin/activity-galleries'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\ActivityGalleryController::store
 * @see app/Http/Controllers/Api/ActivityGalleryController.php:36
 * @route '/api/admin/activity-galleries'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ActivityGalleryController::store
 * @see app/Http/Controllers/Api/ActivityGalleryController.php:36
 * @route '/api/admin/activity-galleries'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\ActivityGalleryController::update
 * @see app/Http/Controllers/Api/ActivityGalleryController.php:42
 * @route '/api/admin/activity-galleries/{activity_gallery}'
 */
export const update = (args: { activity_gallery: string | number } | [activity_gallery: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/admin/activity-galleries/{activity_gallery}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\ActivityGalleryController::update
 * @see app/Http/Controllers/Api/ActivityGalleryController.php:42
 * @route '/api/admin/activity-galleries/{activity_gallery}'
 */
update.url = (args: { activity_gallery: string | number } | [activity_gallery: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activity_gallery: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    activity_gallery: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activity_gallery: args.activity_gallery,
                }

    return update.definition.url
            .replace('{activity_gallery}', parsedArgs.activity_gallery.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ActivityGalleryController::update
 * @see app/Http/Controllers/Api/ActivityGalleryController.php:42
 * @route '/api/admin/activity-galleries/{activity_gallery}'
 */
update.put = (args: { activity_gallery: string | number } | [activity_gallery: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\ActivityGalleryController::update
 * @see app/Http/Controllers/Api/ActivityGalleryController.php:42
 * @route '/api/admin/activity-galleries/{activity_gallery}'
 */
update.patch = (args: { activity_gallery: string | number } | [activity_gallery: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\ActivityGalleryController::update
 * @see app/Http/Controllers/Api/ActivityGalleryController.php:42
 * @route '/api/admin/activity-galleries/{activity_gallery}'
 */
    const updateForm = (args: { activity_gallery: string | number } | [activity_gallery: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ActivityGalleryController::update
 * @see app/Http/Controllers/Api/ActivityGalleryController.php:42
 * @route '/api/admin/activity-galleries/{activity_gallery}'
 */
        updateForm.put = (args: { activity_gallery: string | number } | [activity_gallery: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Api\ActivityGalleryController::update
 * @see app/Http/Controllers/Api/ActivityGalleryController.php:42
 * @route '/api/admin/activity-galleries/{activity_gallery}'
 */
        updateForm.patch = (args: { activity_gallery: string | number } | [activity_gallery: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\ActivityGalleryController::destroy
 * @see app/Http/Controllers/Api/ActivityGalleryController.php:50
 * @route '/api/admin/activity-galleries/{activity_gallery}'
 */
export const destroy = (args: { activity_gallery: string | number } | [activity_gallery: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/activity-galleries/{activity_gallery}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\ActivityGalleryController::destroy
 * @see app/Http/Controllers/Api/ActivityGalleryController.php:50
 * @route '/api/admin/activity-galleries/{activity_gallery}'
 */
destroy.url = (args: { activity_gallery: string | number } | [activity_gallery: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activity_gallery: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    activity_gallery: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activity_gallery: args.activity_gallery,
                }

    return destroy.definition.url
            .replace('{activity_gallery}', parsedArgs.activity_gallery.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ActivityGalleryController::destroy
 * @see app/Http/Controllers/Api/ActivityGalleryController.php:50
 * @route '/api/admin/activity-galleries/{activity_gallery}'
 */
destroy.delete = (args: { activity_gallery: string | number } | [activity_gallery: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\ActivityGalleryController::destroy
 * @see app/Http/Controllers/Api/ActivityGalleryController.php:50
 * @route '/api/admin/activity-galleries/{activity_gallery}'
 */
    const destroyForm = (args: { activity_gallery: string | number } | [activity_gallery: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ActivityGalleryController::destroy
 * @see app/Http/Controllers/Api/ActivityGalleryController.php:50
 * @route '/api/admin/activity-galleries/{activity_gallery}'
 */
        destroyForm.delete = (args: { activity_gallery: string | number } | [activity_gallery: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const activityGalleries = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default activityGalleries