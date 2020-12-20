import { Component, OnInit } from '@angular/core';
import { concat, forkJoin } from 'rxjs';
import { MusicService } from './service/app.service';
import { IMusic } from '../app/model/musicBase.model';
import { LazyLoadEvent } from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'music-app';
  outputList: IMusic[] = [];
  loading: boolean;
  pageLength: number = 10;
  albumList: any = [];
  artistList: any = [];
  songList: any = [];
  constructor(
    private apiService: MusicService
  ) { }

  ngOnInit() {
    // By default fetch first 10 
    //this.loadData(0, this.pageLength);
  }

  loadData(pageIndex, pageLength, sortField, sortDirection) {
    this.loading = true;
    this.outputList = [];
    switch (sortField) {
      case 'songName':
        this.apiService.getSongs(pageIndex, pageLength, 'name', sortDirection).subscribe(response => {
          this.songList = response;
          this.songList.forEach(element => {
            this.outputList.push({
              id: element['id'],
              albumName: this.albumList[element['id']] ? this.albumList[element['id']]['name'] : '',
              artistName: this.artistList[element['id']] ? this.artistList[element['id']]['name'] : '',
              songName: element['name'],
              songTrackNumber: element['track'],
              yearReleased: this.albumList[element['id']] ? this.albumList[element['id']]['year_released'] : ''
            });
          });
          this.loading = false;
        });
        break;
      case 'artistName':
        this.apiService.getArtists(pageIndex, pageLength, 'name', sortDirection).subscribe(response => {
          this.artistList = response;
          // this.loadSongs();
          this.artistList.forEach(element => {
            this.outputList.push({
              id: element['id'],
              albumName: element['name'],
              artistName: this.albumList[element['id']] ? this.albumList[element['id']]['name'] : '',
              songName: this.songList[element['id']] ? this.songList[element['id']]['name'] : '',
              songTrackNumber: this.songList[element['id']] ? this.songList[element['id']]['track'] : null,
              yearReleased: this.albumList[element['id']] ? this.albumList[element['id']]['year_released'] : ''
            });
          });
          this.loading = false;
        });
        break;
      case 'albumName':
        this.apiService.getAlbums(pageIndex, pageLength, 'name', sortDirection).subscribe(response => {
          this.albumList = response;
          this.albumList.forEach(element => {
            this.outputList.push({
              id: element['id'],
              albumName: element['name'],
              artistName: this.albumList[element['id']] ? this.albumList[element['id']]['name'] : '',
              songName: this.songList[element['id']] ? this.songList[element['id']]['name'] : '',
              songTrackNumber: this.songList[element['id']] ? this.songList[element['id']]['track'] : null,
              yearReleased: element['year_released']
            });
          });
          this.loading = false;
        });
        break;
      case 'yearReleased':
        this.apiService.getAlbums(pageIndex, pageLength, 'year_released', sortDirection).subscribe(response => {
          this.albumList = response;
          this.albumList.forEach(element => {
            this.outputList.push({
              id: element['id'],
              albumName: this.albumList[element['id']] ? this.albumList[element['id']]['name'] : '',
              artistName: this.artistList[element['id']] ? this.artistList[element['id']]['name'] : '',
              songName: element['name'],
              songTrackNumber: this.songList[element['id']] ? this.songList[element['id']]['track'] : null,
              yearReleased: element['year_released']
            });
          });
          this.loading = false;
          //this.loadSongs();
        });
        break;
      default:
        forkJoin([this.apiService.getSongs(pageIndex, pageLength, 'id', sortDirection), this.apiService.getArtists(pageIndex, pageLength, '', sortDirection), this.apiService.getAlbums(pageIndex, pageLength, '', sortDirection)]).subscribe(([songList, artistList, albumList]) => {
          this.songList = songList;
          this.artistList = artistList;
          this.albumList = albumList;
          this.loadSongs();
        });
    }
  }

  loadSongs() {
    this.songList.forEach(element => {
      this.outputList.push({
        id: element['id'],
        albumName: this.albumList[element['id']] ? this.albumList[element['id']]['name'] : '',
        artistName: this.artistList[element['id']] ? this.artistList[element['id']]['name'] : '',
        songName: element['name'] || '',
        songTrackNumber: element['track'],
        yearReleased: this.albumList[element['id']] ? this.albumList[element['id']]['year_released'] : ''
      });
    });
    console.log(this.outputList);
    this.loading = false;
  }

  handlePaginatorEvent(event: LazyLoadEvent) {
    this.loadData((event.first / this.pageLength) + 1, this.pageLength, event.sortField, event.sortOrder === 1 ? 'asc' : 'desc');
  }

}
