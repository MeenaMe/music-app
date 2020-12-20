export interface IMusicBase {
    id: number;
    created: Date;
    LastModified: Date;
    Songs: ISong[];
    artist: IArtist;
    album: Album[];
}

export interface IArtist {
    id: number;
    track: number;
    name: string;
}

export interface Album {
    year_released: number;
    name: string;
    artist_id: number;
    id: number;
}

export interface ISong {
    id: number;
    track: number;
    name: string;
    album_id: number;
}

export interface IMusic {
    id: number;
    artistName: string;
    albumName: string;
    yearReleased: string;
    songTrackNumber: number;
    songName: string;
}