import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\NewsController::index
 * @see app/Http/Controllers/Api/NewsController.php:12
 * @route '/api/news'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/news',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\NewsController::index
 * @see app/Http/Controllers/Api/NewsController.php:12
 * @route '/api/news'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\NewsController::index
 * @see app/Http/Controllers/Api/NewsController.php:12
 * @route '/api/news'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\NewsController::index
 * @see app/Http/Controllers/Api/NewsController.php:12
 * @route '/api/news'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\NewsController::index
 * @see app/Http/Controllers/Api/NewsController.php:12
 * @route '/api/news'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\NewsController::index
 * @see app/Http/Controllers/Api/NewsController.php:12
 * @route '/api/news'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\NewsController::index
 * @see app/Http/Controllers/Api/NewsController.php:12
 * @route '/api/news'
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
* @see \App\Http\Controllers\Api\NewsController::show
 * @see app/Http/Controllers/Api/NewsController.php:25
 * @route '/api/news/{slug}'
 */
export const show = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/news/{slug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\NewsController::show
 * @see app/Http/Controllers/Api/NewsController.php:25
 * @route '/api/news/{slug}'
 */
show.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        slug: args.slug,
                }

    return show.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\NewsController::show
 * @see app/Http/Controllers/Api/NewsController.php:25
 * @route '/api/news/{slug}'
 */
show.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\NewsController::show
 * @see app/Http/Controllers/Api/NewsController.php:25
 * @route '/api/news/{slug}'
 */
show.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\NewsController::show
 * @see app/Http/Controllers/Api/NewsController.php:25
 * @route '/api/news/{slug}'
 */
    const showForm = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\NewsController::show
 * @see app/Http/Controllers/Api/NewsController.php:25
 * @route '/api/news/{slug}'
 */
        showForm.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\NewsController::show
 * @see app/Http/Controllers/Api/NewsController.php:25
 * @route '/api/news/{slug}'
 */
        showForm.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Api\NewsController::store
 * @see app/Http/Controllers/Api/NewsController.php:19
 * @route '/api/admin/news'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/admin/news',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\NewsController::store
 * @see app/Http/Controllers/Api/NewsController.php:19
 * @route '/api/admin/news'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\NewsController::store
 * @see app/Http/Controllers/Api/NewsController.php:19
 * @route '/api/admin/news'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\NewsController::store
 * @see app/Http/Controllers/Api/NewsController.php:19
 * @route '/api/admin/news'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\NewsController::store
 * @see app/Http/Controllers/Api/NewsController.php:19
 * @route '/api/admin/news'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\NewsController::update
 * @see app/Http/Controllers/Api/NewsController.php:42
 * @route '/api/admin/news/{news}'
 */
export const update = (args: { news: string | number } | [news: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/admin/news/{news}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\NewsController::update
 * @see app/Http/Controllers/Api/NewsController.php:42
 * @route '/api/admin/news/{news}'
 */
update.url = (args: { news: string | number } | [news: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { news: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    news: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        news: args.news,
                }

    return update.definition.url
            .replace('{news}', parsedArgs.news.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\NewsController::update
 * @see app/Http/Controllers/Api/NewsController.php:42
 * @route '/api/admin/news/{news}'
 */
update.put = (args: { news: string | number } | [news: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\NewsController::update
 * @see app/Http/Controllers/Api/NewsController.php:42
 * @route '/api/admin/news/{news}'
 */
update.patch = (args: { news: string | number } | [news: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\NewsController::update
 * @see app/Http/Controllers/Api/NewsController.php:42
 * @route '/api/admin/news/{news}'
 */
    const updateForm = (args: { news: string | number } | [news: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\NewsController::update
 * @see app/Http/Controllers/Api/NewsController.php:42
 * @route '/api/admin/news/{news}'
 */
        updateForm.put = (args: { news: string | number } | [news: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Api\NewsController::update
 * @see app/Http/Controllers/Api/NewsController.php:42
 * @route '/api/admin/news/{news}'
 */
        updateForm.patch = (args: { news: string | number } | [news: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\NewsController::destroy
 * @see app/Http/Controllers/Api/NewsController.php:50
 * @route '/api/admin/news/{news}'
 */
export const destroy = (args: { news: string | number } | [news: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/news/{news}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\NewsController::destroy
 * @see app/Http/Controllers/Api/NewsController.php:50
 * @route '/api/admin/news/{news}'
 */
destroy.url = (args: { news: string | number } | [news: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { news: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    news: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        news: args.news,
                }

    return destroy.definition.url
            .replace('{news}', parsedArgs.news.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\NewsController::destroy
 * @see app/Http/Controllers/Api/NewsController.php:50
 * @route '/api/admin/news/{news}'
 */
destroy.delete = (args: { news: string | number } | [news: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\NewsController::destroy
 * @see app/Http/Controllers/Api/NewsController.php:50
 * @route '/api/admin/news/{news}'
 */
    const destroyForm = (args: { news: string | number } | [news: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\NewsController::destroy
 * @see app/Http/Controllers/Api/NewsController.php:50
 * @route '/api/admin/news/{news}'
 */
        destroyForm.delete = (args: { news: string | number } | [news: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const NewsController = { index, show, store, update, destroy }

export default NewsController