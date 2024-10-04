import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
// @ts-ignore
import JasmineDOM from '@testing-library/jasmine-dom';

getTestBed().initTestEnvironment(
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting(),
);

beforeAll(() => {
	jasmine.addMatchers(JasmineDOM);
});