import { Body, Head, Heading, Html, Link, Preview, Section, Tailwind, Text } from '@react-email/components';
import React from 'react';

interface VerificationTemplateProps {
  domain: string;
  token: string;
}

export const VerificationTemplate = ({ domain, token }: VerificationTemplateProps) => {
  const verificationLink = `${domain}/account/verify?token=${token}`;

  return (
    <Html lang="ru" dir="ltr">
      <Head />
      <Preview>Верификация аккаунта</Preview>
      <Tailwind>
        <Body className="max-w-2xl mx-auto p-6 bg-slate-50">
          <Section className="text-center mb-8">
            <Heading className="text-4xl text-black font-bold">Подтверждение вашей почты</Heading>
            <Text className="text-base text-black">
              Спасибо за регистрацию в Streaming! Чтобы подтвердить свой адрес электронной почты, пожалуйста, перейдите
              по следующей ссылке:
            </Text>
            <Link
              href={verificationLink}
              className="inline-flex justify-center items-center rounded-full text-sm font-medium text-white bg-[#18b9ae] px-5 py-2"
            >
              Подтвердить почту
            </Link>

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
