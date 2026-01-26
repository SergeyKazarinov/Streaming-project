import { Body, Head, Heading, Html, Link, Preview, Section, Tailwind, Text } from '@react-email/components';
import React from 'react';

import type { SessionMetadata } from '@/shared/types/session-metadata.types';

import Footer from './components/footer.template';
import Metadata from './components/metadata.template';

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

            <Metadata metadata={metadata} />

            <Footer />
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPasswordTemplate;
