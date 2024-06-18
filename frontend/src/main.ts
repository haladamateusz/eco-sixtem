import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { TextureService } from './app/stage/services/texture/texture.service';

const initializeApp = (assetsService: TextureService) => {
  return () => assetsService.loadAssets().then(() => console.log('Textures loaded'));
};

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(MatDialogModule),
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [TextureService],
      multi: true
    }
  ]
});
