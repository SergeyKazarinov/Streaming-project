import { Heading, Section, Text } from '@react-email/components';
import React from 'react';

import type { SessionMetadata } from '@/shared/types/session-metadata.types';

interface MetadataProps {
  metadata: SessionMetadata;
}

export const Metadata = ({ metadata }: MetadataProps) => {
  return (
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
  );
};

export default Metadata;
