import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::index
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/'
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
* @see \App\Http\Controllers\DashboardController::getStats
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/dashboard/stats'
 */
export const getStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStats.url(options),
    method: 'get',
})

getStats.definition = {
    methods: ["get","head"],
    url: '/dashboard/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::getStats
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/dashboard/stats'
 */
getStats.url = (options?: RouteQueryOptions) => {
    return getStats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::getStats
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/dashboard/stats'
 */
getStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStats.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::getStats
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/dashboard/stats'
 */
getStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStats.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::getStats
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/dashboard/stats'
 */
    const getStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getStats.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::getStats
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/dashboard/stats'
 */
        getStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getStats.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::getStats
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/dashboard/stats'
 */
        getStatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getStats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getStats.form = getStatsForm
/**
* @see \App\Http\Controllers\DashboardController::exportData
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/dashboard/export'
 */
export const exportData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportData.url(options),
    method: 'get',
})

exportData.definition = {
    methods: ["get","head"],
    url: '/dashboard/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::exportData
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/dashboard/export'
 */
exportData.url = (options?: RouteQueryOptions) => {
    return exportData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::exportData
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/dashboard/export'
 */
exportData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportData.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::exportData
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/dashboard/export'
 */
exportData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportData.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::exportData
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/dashboard/export'
 */
    const exportDataForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportData.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::exportData
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/dashboard/export'
 */
        exportDataForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportData.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::exportData
 * @see app/Http/Controllers/DashboardController.php:0
 * @route '/dashboard/export'
 */
        exportDataForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportData.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportData.form = exportDataForm
const DashboardController = { index, getStats, exportData }

export default DashboardController