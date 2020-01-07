import { TestBed } from '@angular/core/testing';

import { SCCSkillsService } from './scc-skills.service';

describe('SCCSkillsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SCCSkillsService = TestBed.get(SCCSkillsService);
    expect(service).toBeTruthy();
  });
});
