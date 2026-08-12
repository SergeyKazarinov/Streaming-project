import { Ctx, On, Start, Update } from 'nestjs-telegraf';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenType } from 'prisma/generated/prisma/enums';
import { type Context, Telegraf } from 'telegraf';

import { TELEGRAM_MESSAGE } from '@/shared/consts/message.const';
import { checkToken } from '@/shared/lib/check-token.util';

import { TokenRepository } from '../repositories/token/token.repository';
import { UserRepository } from '../repositories/user/user.repository';

import { TelegramCallbackRegistry } from './strategies/telegram-callback.registry';
import { TContext } from './types/common';
import { TELEGRAM_BUTTONS } from './telegram.buttons';

@Update()
@Injectable()
export class TelegramService extends Telegraf {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly TelegramCallbackRegistry: TelegramCallbackRegistry,
    private readonly configService: ConfigService,
  ) {
    super(configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN'));
  }
  // TODO доработать логику отправки уведомлений пользователю
  @Start()
  async onStart(@Ctx() ctx: TContext) {
    const token = ctx.payload;

    const telegramChatId = ctx.chat?.id?.toString();

    if (!telegramChatId) {
      await ctx.reply(TELEGRAM_MESSAGE.ERROR.NOT_FOUND_CHAT);
      return;
    }

    const user = await this.userRepository.findUserByTelegramChatId(telegramChatId);

    if (user) {
      await ctx.replyWithHTML(TELEGRAM_MESSAGE.INFO.ALREADY_CONNECTED, TELEGRAM_BUTTONS.SuccessConnection);
      return;
    }

    if (!token) {
      await ctx.reply('Для начала работы с ботом необходимо зарегистрироваться на сайте');
      return;
    }
    try {
      const existingToken = await checkToken(token, TokenType.TELEGRAM_VERIFY);

      const user = await this.userRepository.findUniqueUserById(existingToken.userId);

      if (!user) {
        await ctx.reply('Пользователь не найден, попробуйте еще раз');
        return;
      }

      await this.userRepository.updateUser(user.id, { telegramChatId });

      await this.tokenRepository.delete({
        id: existingToken.id,
        type: TokenType.TELEGRAM_VERIFY,
      });

      await ctx.reply('Вы успешно подключили ваш аккаунт к боту');
    } catch (error) {
      if (error instanceof NotFoundException) {
        await ctx.reply('Неверный токен, попробуйте еще раз');
      } else {
        await ctx.reply('Произошла ошибка, попробуйте позже');
      }
    }
  }

  @On('message')
  async message(@Ctx() ctx: Context) {
    console.log(ctx.chat);
    await ctx.replyWithHTML('test', TELEGRAM_BUTTONS.SuccessConnection);
  }

  @On('callback_query')
  async callbackQuery(@Ctx() ctx: TContext) {
    const dataType = ctx.update.callback_query.data;

    const strategy = this.TelegramCallbackRegistry.findStrategy(dataType);

    await strategy?.execute(ctx);
  }

  async sendNotification(chatId: string) {
    await this.telegram.sendMessage(chatId, 'test follow');
  }
}
