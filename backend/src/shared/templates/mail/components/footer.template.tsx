import { Link, Section, Text } from '@react-email/components';
import React from 'react';

export const Footer = () => {
  return (
    <Section className="text-center mt-8">
      <Text className="text-gray-600">
        Если у вас есть вопросы или вы столкнулись с трудностями, не стеняйтесь обращаться в нашу службу поддержки по
        адресу{' '}
        <Link href={`mailto:kazarinov092@gmail.com`} className="text-[#18b9ae] underline">
          kazarinov092@gmail.com
        </Link>
      </Text>
    </Section>
  );
};

export default Footer;
