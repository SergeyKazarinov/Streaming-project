import { Body, Head, Heading, Html, Link, Preview, Section, Tailwind, Text } from '@react-email/components';
import React from 'react';

import Footer from './components/footer.template';

interface WarnDeletedAccountTemplateProps {
  domain: string;
}

export const WarnDeletedAccountTemplate = ({ domain }: WarnDeletedAccountTemplateProps) => {
  const link = `${domain}/account/login`;

  return (
    <Html lang="ru" dir="ltr">
      <Head />
      <Preview>Предупреждение о удалении аккаунта</Preview>
      <Tailwind>
        <Body className="max-w-2xl mx-auto p-6 bg-slate-50">
          <Section className="text-center mb-8">
            <Heading className="text-3xl text-black font-bold">Ваш аккаунт будет удален</Heading>
            <Text className="text-base text-black mt-2">
              Ваш аккаунт будет удален из базы данных Streaming. Все ваши данные и информация будут удалены
              безвозвратно.
            </Text>

            <Section className="bg-white text-black rounded-lg text-center rounded-lgp-6  mb-6">
              <Text>
                Если вы хотите остановить процесс удаления аккаунта, пожалуйста, авторизуйтесь по следующей ссылке
              </Text>
              <Link
                href={link}
                className="inline-flex justify-center items-center rounded-full text-sm font-medium text-white bg-[#18b9ae] px-5 py-2"
              >
                Авторизоваться
              </Link>
            </Section>

            <Footer />
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WarnDeletedAccountTemplate;
