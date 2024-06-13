import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { SkyService } from './app/stage/sky/sky.service';
import { GroundService } from './app/stage/ground/ground.service';

const initializeApp = (skyService: SkyService, groundService: GroundService) => {
  return () =>
    Promise.all([skyService.loadSkyAssets(), groundService.loadGroundAssets()]).then(() =>
      console.log('Textures loaded')
    );
};

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(MatDialogModule),
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [SkyService, GroundService],
      multi: true
    }
  ]
});
