"use client";
import { useState, useEffect } from "react";
import { apiClient, fetchWithCancel, handleApiError } from "@/lib/apiClient";

export interface PaginatedResponse<T> {
    // Adapt these fields to match your API response.
    data: T[];
    total: number;
}

export interface UsePaginatedGetOptions {
    initialPage?: number;
    initialLimit?: number;
    initialQueryParams?: Record<string, any>;
    autoFetch?: boolean;
}

export interface PaginatedGetParams {
    page: number;
    limit: number;
    queryParams?: Record<string, any>;
}

/**
 * Hook for paginated GET requests.
 * @param apiPathBuilder - A function that returns the URL based on current pagination and query parameters.
 * @param options - Optional initial values.
 */

function usePaginatedGet<T>(
    apiPathBuilder: (params: PaginatedGetParams) => string,
    options?: UsePaginatedGetOptions
) {
    const {
        initialPage = 1,
        initialLimit = 10,
        initialQueryParams = {},
        autoFetch = true,
    } = options || {};

    const [data, setData] = useState<T[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(initialPage);
    const [page, setPage] = useState<number>(initialPage);
    const [limit, setLimit] = useState<number>(initialLimit);
    const [queryParams, setQueryParams] = useState<Record<string, any>>(initialQueryParams);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [firstFetch, setFirstFetch] = useState<boolean>(true);
    const [hydrated, setHydrated] = useState<boolean>(false)

    /**
     * refresh: Fetches the paginated data based on the current page, limit, and query parameters.
     */
    const refresh = async () => {
        setLoading(true);
        setError(null);
        const url = apiPathBuilder({ page, limit, queryParams });
        try {
            let responseData: PaginatedResponse<T>;
            // Use a different client on first fetch if necessary.
            if (firstFetch) {
                const res = await apiClient.get(url);
                responseData = res.data;
            } else {
                responseData = await fetchWithCancel("paginatedGet", url);
            }
            // console.log('response', responseData);
            if (responseData && responseData.data) {
                // data found 
                setData(responseData.data);
                setTotal(responseData.total);
                setTotalPage(Math.ceil(responseData.total / limit));
            } else {
                setData([]);
                setTotal(0);
            }
            setFirstFetch(false);
        } catch (err: any) {
            handleApiError(err);
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };


    // Automatically refresh data when page, limit, or query parameters change.
    useEffect(() => {

        if (autoFetch && hydrated) {
            refresh();
        } else
            setHydrated(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, limit, queryParams, hydrated]);

    return {
        data,
        total,
        page,
        limit,
        totalPage,
        loading,
        error,
        setPage,
        setLimit,
        setQueryParams,
        refresh,
        hydrated,
        setHydrated
    };
}

export default usePaginatedGet;
