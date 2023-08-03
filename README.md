# Comparador de APIs

This project is a tool to compare in a visual way the official APIs from Open Finance Brazil and Open Insurance. With this, it is possible to skip some steps of browsing ecosystem repositories to get the APIs and place side by side.



This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


`Attention`: This project uses the GitHub REST API which has the issue of a limited rate limit for non authenticated requests. The script makes some requests to get the APIs links, but in some cases it may exhaust the rate limit quota. A possible workaround for this is to implement some caching strategy or maybe use a GitHub token to make the requests

