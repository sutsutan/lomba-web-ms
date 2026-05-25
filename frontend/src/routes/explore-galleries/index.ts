import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Api\ExploreGalleryController::store
 * @see app/Http/Controllers/Api/ExploreGalleryController.php:36
 * @route '/api/admin/explore-galleries'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/admin/explore-galleries',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ExploreGalleryController::store
 * @see app/Http/Controllers/Api/ExploreGalleryController.php:36
 * @route '/api/admin/explore-galleries'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ExploreGalleryController::store
 * @see app/Http/Controllers/Api/ExploreGalleryController.php:36
 * @route '/api/admin/explore-galleries'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\ExploreGalleryController::store
 * @see app/Http/Controllers/Api/ExploreGalleryController.php:36
 * @route '/api/admin/explore-galleries'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ExploreGalleryController::store
 * @see app/Http/Controllers/Api/ExploreGalleryController.php:36
 * @route '/api/admin/explore-galleries'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\ExploreGalleryController::update
 * @see app/Http/Controllers/Api/ExploreGalleryController.php:42
 * @route '/api/admin/explore-galleries/{explore_gallery}'
 */
export const update = (args: { explore_gallery: string | number } | [explore_gallery: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/admin/explore-galleries/{explore_gallery}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\ExploreGalleryController::update
 * @see app/Http/Controllers/Api/ExploreGalleryController.php:42
 * @route '/api/admin/explore-galleries/{explore_gallery}'
 */
update.url = (args: { explore_gallery: string | number } | [explore_gallery: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { explore_gallery: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    explore_gallery: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        explore_gallery: args.explore_gallery,
                }

    return update.definition.url
            .replace('{explore_gallery}', parsedArgs.explore_gallery.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ExploreGalleryController::update
 * @see app/Http/Controllers/Api/ExploreGalleryController.php:42
 * @route '/api/admin/explore-galleries/{explore_gallery}'
 */
update.put = (args: { explore_gallery: string | number } | [explore_gallery: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\ExploreGalleryController::update
 * @see app/Http/Controllers/Api/ExploreGalleryController.php:42
 * @route '/api/admin/explore-galleries/{explore_gallery}'
 */
update.patch = (args: { explore_gallery: string | number } | [explore_gallery: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\ExploreGalleryController::update
 * @see app/Http/Controllers/Api/ExploreGalleryController.php:42
 * @route '/api/admin/explore-galleries/{explore_gallery}'
 */
    const updateForm = (args: { explore_gallery: string | number } | [explore_gallery: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ExploreGalleryController::update
 * @see app/Http/Controllers/Api/ExploreGalleryController.php:42
 * @route '/api/admin/explore-galleries/{explore_gallery}'
 */
        updateForm.put = (args: { explore_gallery: string | number } | [explore_gallery: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Api\ExploreGalleryController::update
 * @see app/Http/Controllers/Api/ExploreGalleryController.php:42
 * @route '/api/admin/explore-galleries/{explore_gallery}'
 */
        updateForm.patch = (args: { explore_gallery: string | number } | [explore_gallery: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\ExploreGalleryController::destroy
 * @see app/Http/Controllers/Api/ExploreGalleryController.php:50
 * @route '/api/admin/explore-galleries/{explore_gallery}'
 */
export const destroy = (args: { explore_gallery: string | number } | [explore_gallery: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/explore-galleries/{explore_gallery}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\ExploreGalleryController::destroy
 * @see app/Http/Controllers/Api/ExploreGalleryController.php:50
 * @route '/api/admin/explore-galleries/{explore_gallery}'
 */
destroy.url = (args: { explore_gallery: string | number } | [explore_gallery: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { explore_gallery: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    explore_gallery: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        explore_gallery: args.explore_gallery,
                }

    return destroy.definition.url
            .replace('{explore_gallery}', parsedArgs.explore_gallery.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ExploreGalleryController::destroy
 * @see app/Http/Controllers/Api/ExploreGalleryController.php:50
 * @route '/api/admin/explore-galleries/{explore_gallery}'
 */
destroy.delete = (args: { explore_gallery: string | number } | [explore_gallery: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\ExploreGalleryController::destroy
 * @see app/Http/Controllers/Api/ExploreGalleryController.php:50
 * @route '/api/admin/explore-galleries/{explore_gallery}'
 */
    const destroyForm = (args: { explore_gallery: string | number } | [explore_gallery: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ExploreGalleryController::destroy
 * @see app/Http/Controllers/Api/ExploreGalleryController.php:50
 * @route '/api/admin/explore-galleries/{explore_gallery}'
 */
        destroyForm.delete = (args: { explore_gallery: string | number } | [explore_gallery: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const exploreGalleries = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default exploreGalleries