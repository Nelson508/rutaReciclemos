import { TestBed } from '@angular/core/testing';

import { WatcherGuard } from './watcher.guard';

describe('WatcherGuard', () => {
  let guard: WatcherGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WatcherGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
