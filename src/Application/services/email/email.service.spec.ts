import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { EmailOptions } from './emailOptions';
import * as nodemailer from 'nodemailer';

describe('EmailService', () => {
  let emailService: EmailService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [EmailService],
    }).compile();

    emailService = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(emailService).toBeDefined();
  });
  describe('sendEmail', () => {
    it('sucess', async () => {
      const emailoptions = new EmailOptions();
      emailoptions.to = 'teste@teste.com';
      emailoptions.text = 'User create with sucess';
      emailService.sendEmail(emailoptions);
    });
  });
});
