import http from './http';

export const redirect = (url: string) => {
    window.location.href = url;
};

export const fetcher = (url: string) => http.get(url).then((res) => res.data);

export enum BookmarkType {
    course ="course",
    exam = "exam",
    post = "post"
}