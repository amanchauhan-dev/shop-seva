import { z } from "zod";

export const getPaginated = (url: URL): { offset: number, page: number, limit: number } => {
    // pagination code
    const { page, limit } = Object.fromEntries(url.searchParams.entries());
    let newPage = 1;
    let newLimit = 10;
    if (page && z.number().safeParse(page)) {
        newPage = parseInt(page);
        if (newPage < 1) newPage = 1; {
        }
    }
    if (limit && z.number().safeParse(limit)) {
        newLimit = parseInt(limit);
    }
    if (newLimit > 100) newLimit = 100; // avoid more than 100 data at a time

   

    const offset = (newPage - 1) * newLimit;
    return {
        offset,
        limit: newLimit,
        page: newPage
    }
}