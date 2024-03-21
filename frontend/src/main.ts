
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { MatDialogModule } from "@angular/material/dialog";
import { importProvidersFrom } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";


bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(MatDialogModule), provideAnimations()]
})
