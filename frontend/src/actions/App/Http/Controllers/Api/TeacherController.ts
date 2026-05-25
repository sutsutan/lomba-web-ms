import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\TeacherController::index
 * @see app/Http/Controllers/Api/TeacherController.php:12
 * @route '/api/teachers'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/teachers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\TeacherController::index
 * @see app/Http/Controllers/Api/TeacherController.php:12
 * @route '/api/teachers'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\TeacherController::index
 * @see app/Http/Controllers/Api/TeacherController.php:12
 * @route '/api/teachers'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\TeacherController::index
 * @see app/Http/Controllers/Api/TeacherController.php:12
 * @route '/api/teachers'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\TeacherController::index
 * @see app/Http/Controllers/Api/TeacherController.php:12
 * @route '/api/teachers'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\TeacherController::index
 * @see app/Http/Controllers/Api/TeacherController.php:12
 * @route '/api/teachers'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\TeacherController::index
 * @see app/Http/Controllers/Api/TeacherController.php:12
 * @route '/api/teachers'
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
* @see \App\Http\Controllers\Api\TeacherController::store
 * @see app/Http/Controllers/Api/TeacherController.php:36
 * @route '/api/admin/teachers'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/admin/teachers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\TeacherController::store
 * @see app/Http/Controllers/Api/TeacherController.php:36
 * @route '/api/admin/teachers'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\TeacherController::store
 * @see app/Http/Controllers/Api/TeacherController.php:36
 * @route '/api/admin/teachers'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\TeacherController::store
 * @see app/Http/Controllers/Api/TeacherController.php:36
 * @route '/api/admin/teachers'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\TeacherController::store
 * @see app/Http/Controllers/Api/TeacherController.php:36
 * @route '/api/admin/teachers'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\TeacherController::update
 * @see app/Http/Controllers/Api/TeacherController.php:42
 * @route '/api/admin/teachers/{teacher}'
 */
export const update = (args: { teacher: string | number } | [teacher: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/admin/teachers/{teacher}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\TeacherController::update
 * @see app/Http/Controllers/Api/TeacherController.php:42
 * @route '/api/admin/teachers/{teacher}'
 */
update.url = (args: { teacher: string | number } | [teacher: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { teacher: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    teacher: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        teacher: args.teacher,
                }

    return update.definition.url
            .replace('{teacher}', parsedArgs.teacher.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\TeacherController::update
 * @see app/Http/Controllers/Api/TeacherController.php:42
 * @route '/api/admin/teachers/{teacher}'
 */
update.put = (args: { teacher: string | number } | [teacher: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\TeacherController::update
 * @see app/Http/Controllers/Api/TeacherController.php:42
 * @route '/api/admin/teachers/{teacher}'
 */
update.patch = (args: { teacher: string | number } | [teacher: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\TeacherController::update
 * @see app/Http/Controllers/Api/TeacherController.php:42
 * @route '/api/admin/teachers/{teacher}'
 */
    const updateForm = (args: { teacher: string | number } | [teacher: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\TeacherController::update
 * @see app/Http/Controllers/Api/TeacherController.php:42
 * @route '/api/admin/teachers/{teacher}'
 */
        updateForm.put = (args: { teacher: string | number } | [teacher: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Api\TeacherController::update
 * @see app/Http/Controllers/Api/TeacherController.php:42
 * @route '/api/admin/teachers/{teacher}'
 */
        updateForm.patch = (args: { teacher: string | number } | [teacher: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\TeacherController::destroy
 * @see app/Http/Controllers/Api/TeacherController.php:50
 * @route '/api/admin/teachers/{teacher}'
 */
export const destroy = (args: { teacher: string | number } | [teacher: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/teachers/{teacher}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\TeacherController::destroy
 * @see app/Http/Controllers/Api/TeacherController.php:50
 * @route '/api/admin/teachers/{teacher}'
 */
destroy.url = (args: { teacher: string | number } | [teacher: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { teacher: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    teacher: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        teacher: args.teacher,
                }

    return destroy.definition.url
            .replace('{teacher}', parsedArgs.teacher.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\TeacherController::destroy
 * @see app/Http/Controllers/Api/TeacherController.php:50
 * @route '/api/admin/teachers/{teacher}'
 */
destroy.delete = (args: { teacher: string | number } | [teacher: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\TeacherController::destroy
 * @see app/Http/Controllers/Api/TeacherController.php:50
 * @route '/api/admin/teachers/{teacher}'
 */
    const destroyForm = (args: { teacher: string | number } | [teacher: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\TeacherController::destroy
 * @see app/Http/Controllers/Api/TeacherController.php:50
 * @route '/api/admin/teachers/{teacher}'
 */
        destroyForm.delete = (args: { teacher: string | number } | [teacher: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const TeacherController = { index, store, update, destroy }

export default TeacherController