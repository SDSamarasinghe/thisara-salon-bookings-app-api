import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService],
    }).compile();
    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have send and sendBulk methods', () => {
    expect(typeof service.send).toBe('function');
    expect(typeof service.sendBulk).toBe('function');
  });

  // You can add more advanced tests here by mocking nodemailer
});
