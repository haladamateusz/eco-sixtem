
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { MatDialogModule } from "@angular/material/dialog";
import { importProvidersFrom } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient } from "@angular/common/http";


bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(),importProvidersFrom(MatDialogModule), provideAnimations()]
})
