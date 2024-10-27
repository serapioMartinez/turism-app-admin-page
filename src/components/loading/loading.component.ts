import { Component } from '@angular/core';

@Component({
  selector: 'turism-loading',
  standalone: true,
  imports: [],
  template: `
  <div class="d-flex flex-wrap justify-content-center align-items-center w-100 p-2">
    <div class="spinner-grow text-primary" role="status"></div>
    <div class="spinner-grow text-secondary" role="status"></div>
    <div class="spinner-grow text-success" role="status"></div>
    <div class="spinner-grow text-danger" role="status"></div>
    <div class="spinner-grow text-warning" role="status"></div>
    <div class="spinner-grow text-info" role="status"></div>
    <div class="spinner-grow text-light" role="status"></div>
    <div class="spinner-grow text-dark" role="status"></div>
    <h1 class="card-title blinker w-100 text-center">Loading...</h1>
</div>
  `,
  styles: ``
})
export class LoadingComponent {

}
