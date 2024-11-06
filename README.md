# Berbershop aplikacija
Mojata zadaca za ovoj proekt shto go rabotev so kolegata Ognen Bozinov beshe da go napravam FrontEndot(layout) i delot so zakazuvanje rezervacii(reservation-add).
Layout delot sodrži logo, meni za navigacija i dve kopčinja za rezervacii i administrativen pristap. Logoto ima link do početnata stranica.
Menito za navigacija vklučuva linkovi za Doma, Meni, Časovi, Lokacija i Kontakt , dve kopčinja za pravenje rezervacii i navigacija do administratorskiot del.
Toa e klasa na Angular komponent narečena HeaderComponent.
Gi zema potrebnite moduli od Angular. Klasata ima konstruktor koj ja injektira uslugata Angular Router. Definirani se dva metodi: navigateToReservations i navigateToAdmin. navigateToReservations go koristi ruterot za navigacija do rutata „/rezervacii/dodaj“. navigateToAdmin go koristi ruterot za navigacija do rutata „/admin“.
Reservation-add HTML-ot pokažuva formular za pravenje onlajn rezervacija so polinja za ime, prezime, datum, vreme i izbor na berber. Komponentata TypeScript se spravuva so logikata, prezemajki dostapni berberi pri inicijalizacija, podnesuvanje rezervacii i spravuvanje so odgovorite. Komponentata koristi dvonasočno vrzuvanje za podatoci na Angular ([(ngModel)]) za da gi povrze polinjata na formularot so svojstvata na objektot za rezervacija. Isto taka, koristi uslugi kako ReservationService i ToastService za da komunicira so zadninata i da prikažuva izvestuvanja.


## Berbershop

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
