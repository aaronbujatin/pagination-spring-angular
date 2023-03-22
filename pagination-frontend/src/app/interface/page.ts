import { User } from './user'
 
export interface Page {
    content: User[],
    pageable: {
        sort: {
            empty: boolean,
            sorted: boolean,
            unsorted: boolean
        },
        offset: number,
        pageNumber: number,
        pageSize: number,
        paged: boolean,
        unpaged: boolean
    },
    totalPages: number,
    totalElements: number,
    last: boolean,
    size: number,
    number: number,
    sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
    },
    first: boolean,
    numberOfElements: number,
    empty: boolean

}