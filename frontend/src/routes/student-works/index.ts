import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Api\StudentWorkController::store
 * @see app/Http/Controllers/Api/StudentWorkController.php:36
 * @route '/api/admin/student-works'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/admin/student-works',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\StudentWorkController::store
 * @see app/Http/Controllers/Api/StudentWorkController.php:36
 * @route '/api/admin/student-works'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\StudentWorkController::store
 * @see app/Http/Controllers/Api/StudentWorkController.php:36
 * @route '/api/admin/student-works'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\StudentWorkController::store
 * @see app/Http/Controllers/Api/StudentWorkController.php:36
 * @route '/api/admin/student-works'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\StudentWorkController::store
 * @see app/Http/Controllers/Api/StudentWorkController.php:36
 * @route '/api/admin/student-works'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\StudentWorkController::update
 * @see app/Http/Controllers/Api/StudentWorkController.php:42
 * @route '/api/admin/student-works/{student_work}'
 */
export const update = (args: { student_work: string | number } | [student_work: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/admin/student-works/{student_work}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\StudentWorkController::update
 * @see app/Http/Controllers/Api/StudentWorkController.php:42
 * @route '/api/admin/student-works/{student_work}'
 */
update.url = (args: { student_work: string | number } | [student_work: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student_work: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    student_work: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        student_work: args.student_work,
                }

    return update.definition.url
            .replace('{student_work}', parsedArgs.student_work.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\StudentWorkController::update
 * @see app/Http/Controllers/Api/StudentWorkController.php:42
 * @route '/api/admin/student-works/{student_work}'
 */
update.put = (args: { student_work: string | number } | [student_work: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\StudentWorkController::update
 * @see app/Http/Controllers/Api/StudentWorkController.php:42
 * @route '/api/admin/student-works/{student_work}'
 */
update.patch = (args: { student_work: string | number } | [student_work: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\StudentWorkController::update
 * @see app/Http/Controllers/Api/StudentWorkController.php:42
 * @route '/api/admin/student-works/{student_work}'
 */
    const updateForm = (args: { student_work: string | number } | [student_work: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\StudentWorkController::update
 * @see app/Http/Controllers/Api/StudentWorkController.php:42
 * @route '/api/admin/student-works/{student_work}'
 */
        updateForm.put = (args: { student_work: string | number } | [student_work: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Api\StudentWorkController::update
 * @see app/Http/Controllers/Api/StudentWorkController.php:42
 * @route '/api/admin/student-works/{student_work}'
 */
        updateForm.patch = (args: { student_work: string | number } | [student_work: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\StudentWorkController::destroy
 * @see app/Http/Controllers/Api/StudentWorkController.php:50
 * @route '/api/admin/student-works/{student_work}'
 */
export const destroy = (args: { student_work: string | number } | [student_work: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/student-works/{student_work}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\StudentWorkController::destroy
 * @see app/Http/Controllers/Api/StudentWorkController.php:50
 * @route '/api/admin/student-works/{student_work}'
 */
destroy.url = (args: { student_work: string | number } | [student_work: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student_work: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    student_work: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        student_work: args.student_work,
                }

    return destroy.definition.url
            .replace('{student_work}', parsedArgs.student_work.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\StudentWorkController::destroy
 * @see app/Http/Controllers/Api/StudentWorkController.php:50
 * @route '/api/admin/student-works/{student_work}'
 */
destroy.delete = (args: { student_work: string | number } | [student_work: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\StudentWorkController::destroy
 * @see app/Http/Controllers/Api/StudentWorkController.php:50
 * @route '/api/admin/student-works/{student_work}'
 */
    const destroyForm = (args: { student_work: string | number } | [student_work: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\StudentWorkController::destroy
 * @see app/Http/Controllers/Api/StudentWorkController.php:50
 * @route '/api/admin/student-works/{student_work}'
 */
        destroyForm.delete = (args: { student_work: string | number } | [student_work: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const studentWorks = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default studentWorks