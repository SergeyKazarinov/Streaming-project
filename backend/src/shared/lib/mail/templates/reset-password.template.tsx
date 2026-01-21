import { Body, Head, Heading, Html, Link, Preview, Section, Tailwind, Text } from '@react-email/components';
import React from 'react';

import type { SessionMetadata } from '@/shared/types/session-metadata.types';

interface ResetPasswordTemplateProps {
  domain: string;
  token: string;
  metadata: SessionMetadata;
}

export const ResetPasswordTemplate = ({ domain, token, metadata }: ResetPasswordTemplateProps) => {
  const resetLink = `${domain}/account/reset-password?token=${token}`;

  return (
    <Html lang="ru" dir="ltr">
      <Head />
      <Preview>Сброс пароля</Preview>
      <Tailwind>
        <Body className="max-w-2xl mx-auto p-6 bg-slate-50">
          <Section className="text-center mb-8">
            <Heading className="text-4xl text-black font-bold">Сбросить пароль</Heading>
            <Text className="text-base text-black">Вы запросили сброс пароля для вашей учетной записи.</Text>
            <Text className="text-base text-black">Чтобы создать новый пароль, нажмите на ссылку ниже:</Text>
            <Link
              href={resetLink}
              className="inline-flex justify-center items-center rounded-full text-sm font-medium text-white bg-[#18b9ae] px-5 py-2 mb-6"
            >
              Сбросить пароль
            </Link>

            <Section className="bg-gray-100 rounded-lg p-6 mb-6">
              <Heading className="text-xl font-semibold text-[#18b9ae]">Информация о запросе:</Heading>
              <ul className="list-dist list-inside text mt-2 grid-cols-1 px-0">
                <li>Расположение: {metadata?.location?.country || 'Неизвестно'}</li>
                <li>Операционная система: {metadata?.device?.os || 'Неизвестно'}</li>
                <li>Браузер: {metadata?.device?.browser || 'Неизвестно'}</li>
                <li>IP-адрес: {metadata?.ip || 'Неизвестно'}</li>
              </ul>
              <Text className="text-gray-600 mt-2">
                Если вы не инициировали этот запрос, пожалуйста, игнорируйте это сообщение.
              </Text>
            </Section>

            <Section className="text-center mt-8">
              <Text className="text-gray-600">
                Если у вас есть вопросы или вы столкнулись с трудностями, не стеняйтесь обращаться в нашу службу
                поддержки по адресу{' '}
                <Link href={`mailto:kazarinov092@gmail.com`} className="text-[#18b9ae] underline">
                  kazarinov092@gmail.com
                </Link>
              </Text>
            </Section>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPasswordTemplate;
