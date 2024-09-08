import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { from, Observable } from 'rxjs';
import { ChatContainer } from '../types';
import { getChannels, getGroups } from '../data';

@Injectable({ providedIn: 'root' })
export class ChatScreenProvider implements Resolve<ChatContainer[]> {

	resolve(route: ActivatedRouteSnapshot): Observable<ChatContainer[]> {
		const path = route?.routeConfig?.path;

		// from() converts the promise to an observable, allowing use of async functions here
		if(path === 'groups') {
			return from(getGroups());
		}
		else if(path === 'channels') {
			return from(getChannels());
		}

		return from([]);
	}
}
