import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MusicService {
    constructor(private httpClient: HttpClient) { }

    getAlbums(pageIndex, pageLength, sortField, sortDirection) {
        return this.httpClient.get(`http://localhost:5000/albums?_page=${pageIndex}&_limit=${pageLength}&_sort=${sortField}&_order=${sortDirection}`).pipe(
            map((response) => response)
        );
    }

    getSongs(pageIndex, pageLength, sortField, sortDirection) {
        return this.httpClient.get(`http://localhost:5000/songs?_page=${pageIndex}&_limit=${pageLength}&_sort=${sortField}&_order=${sortDirection}`).pipe(
            map((response) => response)
        );
    }

    getArtists(pageIndex, pageLength, sortField, sortDirection) {
        return this.httpClient.get(`http://localhost:5000/artists?_page=${pageIndex}&_limit=${pageLength}&_sort=${sortField}&_order=${sortDirection}`).pipe(
            map((response) => response)
        );
    }
    
}
