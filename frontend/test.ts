import 'zone.js';
import 'zone.js/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import {
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
// @ts-ignore
import JasmineDOM from '@testing-library/jasmine-dom';
import { toHaveNoViolations } from 'jasmine-axe';

getTestBed().initTestEnvironment(
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting(),
);

beforeAll(() => {
	jasmine.addMatchers(JasmineDOM);
	jasmine.addMatchers(toHaveNoViolations);
});