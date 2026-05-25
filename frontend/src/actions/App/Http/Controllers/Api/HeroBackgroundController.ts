import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\HeroBackgroundController::index
 * @see app/Http/Controllers/Api/HeroBackgroundController.php:12
 * @route '/api/hero-backgrounds'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/hero-backgrounds',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\HeroBackgroundController::index
 * @see app/Http/Controllers/Api/HeroBackgroundController.php:12
 * @route '/api/hero-backgrounds'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\HeroBackgroundController::index
 * @see app/Http/Controllers/Api/HeroBackgroundController.php:12
 * @route '/api/hero-backgrounds'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\HeroBackgroundController::index
 * @see app/Http/Controllers/Api/HeroBackgroundController.php:12
 * @route '/api/hero-backgrounds'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\HeroBackgroundController::index
 * @see app/Http/Controllers/Api/HeroBackgroundController.php:12
 * @route '/api/hero-backgrounds'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\HeroBackgroundController::index
 * @see app/Http/Controllers/Api/HeroBackgroundController.php:12
 * @route '/api/hero-backgrounds'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\HeroBackgroundController::index
 * @see app/Http/Controllers/Api/HeroBackgroundController.php:12
 * @route '/api/hero-backgrounds'
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
* @see \App\Http\Controllers\Api\HeroBackgroundController::store
 * @see app/Http/Controllers/Api/HeroBackgroundController.php:36
 * @route '/api/admin/hero-backgrounds'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/admin/hero-backgrounds',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\HeroBackgroundController::store
 * @see app/Http/Controllers/Api/HeroBackgroundController.php:36
 * @route '/api/admin/hero-backgrounds'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\HeroBackgroundController::store
 * @see app/Http/Controllers/Api/HeroBackgroundController.php:36
 * @route '/api/admin/hero-backgrounds'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\HeroBackgroundController::store
 * @see app/Http/Controllers/Api/HeroBackgroundController.php:36
 * @route '/api/admin/hero-backgrounds'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\HeroBackgroundController::store
 * @see app/Http/Controllers/Api/HeroBackgroundController.php:36
 * @route '/api/admin/hero-backgrounds'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\HeroBackgroundController::update
 * @see app/Http/Controllers/Api/HeroBackgroundController.php:42
 * @route '/api/admin/hero-backgrounds/{hero_background}'
 */
export const update = (args: { hero_background: string | number } | [hero_background: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/admin/hero-backgrounds/{hero_background}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\HeroBackgroundController::update
 * @see app/Http/Controllers/Api/HeroBackgroundController.php:42
 * @route '/api/admin/hero-backgrounds/{hero_background}'
 */
update.url = (args: { hero_background: string | number } | [hero_background: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { hero_background: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    hero_background: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        hero_background: args.hero_background,
                }

    return update.definition.url
            .replace('{hero_background}', parsedArgs.hero_background.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\HeroBackgroundController::update
 * @see app/Http/Controllers/Api/HeroBackgroundController.php:42
 * @route '/api/admin/hero-backgrounds/{hero_background}'
 */
update.put = (args: { hero_background: string | number } | [hero_background: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\HeroBackgroundController::update
 * @see app/Http/Controllers/Api/HeroBackgroundController.php:42
 * @route '/api/admin/hero-backgrounds/{hero_background}'
 */
update.patch = (args: { hero_background: string | number } | [hero_background: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\HeroBackgroundController::update
 * @see app/Http/Controllers/Api/HeroBackgroundController.php:42
 * @route '/api/admin/hero-backgrounds/{hero_background}'
 */
    const updateForm = (args: { hero_background: string | number } | [hero_background: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\HeroBackgroundController::update
 * @see app/Http/Controllers/Api/HeroBackgroundController.php:42
 * @route '/api/admin/hero-backgrounds/{hero_background}'
 */
        updateForm.put = (args: { hero_background: string | number } | [hero_background: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Api\HeroBackgroundController::update
 * @see app/Http/Controllers/Api/HeroBackgroundController.php:42
 * @route '/api/admin/hero-backgrounds/{hero_background}'
 */
        updateForm.patch = (args: { hero_background: string | number } | [hero_background: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\HeroBackgroundController::destroy
 * @see app/Http/Controllers/Api/HeroBackgroundController.php:50
 * @route '/api/admin/hero-backgrounds/{hero_background}'
 */
export const destroy = (args: { hero_background: string | number } | [hero_background: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/hero-backgrounds/{hero_background}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\HeroBackgroundController::destroy
 * @see app/Http/Controllers/Api/HeroBackgroundController.php:50
 * @route '/api/admin/hero-backgrounds/{hero_background}'
 */
destroy.url = (args: { hero_background: string | number } | [hero_background: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { hero_background: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    hero_background: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        hero_background: args.hero_background,
                }

    return destroy.definition.url
            .replace('{hero_background}', parsedArgs.hero_background.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\HeroBackgroundController::destroy
 * @see app/Http/Controllers/Api/HeroBackgroundController.php:50
 * @route '/api/admin/hero-backgrounds/{hero_background}'
 */
destroy.delete = (args: { hero_background: string | number } | [hero_background: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\HeroBackgroundController::destroy
 * @see app/Http/Controllers/Api/HeroBackgroundController.php:50
 * @route '/api/admin/hero-backgrounds/{hero_background}'
 */
    const destroyForm = (args: { hero_background: string | number } | [hero_background: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\HeroBackgroundController::destroy
 * @see app/Http/Controllers/Api/HeroBackgroundController.php:50
 * @route '/api/admin/hero-backgrounds/{hero_background}'
 */
        destroyForm.delete = (args: { hero_background: string | number } | [hero_background: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const HeroBackgroundController = { index, store, update, destroy }

export default HeroBackgroundController