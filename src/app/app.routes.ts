import { Routes } from '@angular/router';
import { TopStoriesComponent } from './top-stories/top-stories.component';

export const routes: Routes = [
    { path: '', redirectTo: '/new-posts', pathMatch:'full'},
    { path : 'new-posts', component:TopStoriesComponent},
];
