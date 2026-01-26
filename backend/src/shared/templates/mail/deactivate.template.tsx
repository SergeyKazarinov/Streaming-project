import { Body, Head, Heading, Html, Preview, Section, Tailwind, Text } from '@react-email/components';
import React from 'react';

import type { SessionMetadata } from '@/shared/types/session-metadata.types';

import Footer from './components/footer.template';
import Metadata from './components/metadata.template';

interface DeactivateTemplateProps {
  token: string;
  metadata: SessionMetadata;
}

export const DeactivateTemplate = ({ token, metadata }: DeactivateTemplateProps) => {
  return (
    <Html lang="ru" dir="ltr">
      <Head />
      <Preview>Деактивация аккаунта</Preview>
      <Tailwind>
        <Body className="max-w-2xl mx-auto p-6 bg-slate-50">
          <Section className="text-center mb-8">
            <Heading className="text-4xl text-black font-bold">Запрос на деактивацию аккаунта</Heading>
            <Text className="text-base text-black">
              Вы инициировали процесс деактивации вашего аккаунта на платформе <b>Streaming</b>.
            </Text>

            <Section className="bg-gray-100 rounded-lg text-center p-6  mb-6">
              <Heading className="text-2xl font-semibold text-black">Код подтверждения:</Heading>
              <Heading className="text-3xl font-semibold text-black">{token}</Heading>

              <Text className="text-black">Этот код действителен в течение 5 минут.</Text>
            </Section>

            <Metadata metadata={metadata} />

            <Footer />
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default DeactivateTemplate;
