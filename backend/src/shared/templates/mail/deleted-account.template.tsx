import { Body, Head, Heading, Html, Link, Preview, Section, Tailwind, Text } from '@react-email/components';
import React from 'react';

import Footer from './components/footer.template';

interface DeletedAccountTemplateProps {
  domain: string;
}

export const DeletedAccountTemplate = ({ domain }: DeletedAccountTemplateProps) => {
  const verificationLink = `${domain}/account/create`;

  return (
    <Html lang="ru" dir="ltr">
      <Head />
      <Preview>Аккаунт удален</Preview>
      <Tailwind>
        <Body className="max-w-2xl mx-auto p-6 bg-slate-50">
          <Section className="text-center mb-8">
            <Heading className="text-3xl text-black font-bold">Ваш аккаунт был удален</Heading>
            <Text className="text-base text-black mt-2">
              Ваш аккаунт полностью стерт из базы данных Streaming. Все ваши данные и информация были удалены
              безвозвратно.
            </Text>

            <Section className="bg-white text-black rounded-lg text-center rounded-lgp-6  mb-6">
              <Text>Вы больше не будете получать уведомления в Telegram и на почту.</Text>
              <Text>Если вы захотите вернуться на платформу, вы можете зарегистрироваться по следующей ссылке: </Text>
              <Link
                href={verificationLink}
                className="inline-flex justify-center items-center rounded-full text-sm font-medium text-white bg-[#18b9ae] px-5 py-2"
              >
                Зарегистрироваться
              </Link>
            </Section>

            <Footer />
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default DeletedAccountTemplate;
