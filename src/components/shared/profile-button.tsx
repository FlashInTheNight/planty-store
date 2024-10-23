import { useSession } from 'next-auth/react';
import React from 'react';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';
import { CustomButton } from './custom-buttom';

interface Props {
  onClickSignIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn }) => {
  const { data: session } = useSession();

  return (
    <div className={className}>
      {!session ? (
        <CustomButton onClick={onClickSignIn} variant="outline" className="flex items-center gap-1">
          <User size={16} />
          Войти
        </CustomButton>
      ) : (
        <Link href="/profile">
          <CustomButton variant="secondary" className="flex items-center gap-2">
            <CircleUser size={18} />
            Профиль
          </CustomButton>
        </Link>
      )}
    </div>
  );
};
